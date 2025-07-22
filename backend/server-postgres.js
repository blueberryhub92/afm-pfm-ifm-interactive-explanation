const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Database connection
const pool = new Pool({
  host: process.env.DB_HOST || 'postgres',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'afm_analytics',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
});

// Test database connection
pool.query('SELECT NOW()', (err, result) => {
  if (err) {
    console.error('❌ Database connection failed:', err);
    process.exit(1);
  } else {
    console.log('✅ Database connected successfully at:', result.rows[0].now);
  }
});

// Middleware
const corsOptions = {
  origin: [
    'http://localhost:5173', // Local development
    'http://localhost:3000', // Alternative local port
    'http://localhost:8080', // Docker frontend
    'https://blueberryhub92.github.io', // GitHub Pages base domain
    'https://blueberryhub92.github.io/afm-pfm-ifm-interactive-explanation/', // GitHub Pages full path
    'https://blueberryhub92.github.io/afm-pfm-ifm-interactive-explanation', // GitHub Pages full path without trailing slash
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ 
      status: 'healthy', 
      timestamp: result.rows[0].now,
      database: 'connected'
    });
  } catch (error) {
    res.status(503).json({ 
      status: 'unhealthy', 
      error: error.message,
      database: 'disconnected'
    });
  }
});

// Helper function to update user statistics
const updateUserStats = async (userId) => {
  try {
    // Get user event statistics
    const statsResult = await pool.query(`
      SELECT 
        COUNT(*) as event_count,
        MIN(timestamp) as first_event,
        MAX(timestamp) as last_event,
        COUNT(DISTINCT session_id) as session_count
      FROM events 
      WHERE user_id = $1
    `, [userId]);

    const stats = statsResult.rows[0];

    // Upsert user record
    await pool.query(`
      INSERT INTO users (user_id, event_count, first_event, last_event, session_count, updated_at)
      VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)
      ON CONFLICT (user_id) 
      DO UPDATE SET 
        event_count = $2,
        first_event = $3,
        last_event = $4,
        session_count = $5,
        updated_at = CURRENT_TIMESTAMP
    `, [userId, stats.event_count, stats.first_event, stats.last_event, stats.session_count]);

  } catch (error) {
    console.error('Error updating user stats:', error);
  }
};

// POST /api/analytics/events/bulk - Store multiple events
app.post('/api/analytics/events/bulk', async (req, res) => {
  const client = await pool.connect();
  
  try {
    const events = req.body;
    
    if (!Array.isArray(events)) {
      return res.status(400).json({ success: false, error: 'Events must be an array' });
    }

    await client.query('BEGIN');

    // Insert all events
    for (const event of events) {
      const serverTimestamp = Date.now();
      
      await client.query(`
        INSERT INTO events (user_id, session_id, event_type, event_data, timestamp, server_timestamp)
        VALUES ($1, $2, $3, $4, $5, $6)
      `, [
        event.userId,
        event.sessionId,
        event.type,
        JSON.stringify(event.data || {}),
        event.timestamp,
        serverTimestamp
      ]);
    }

    await client.query('COMMIT');

    // Update user statistics for all affected users
    const userIds = [...new Set(events.map(e => e.userId))];
    for (const userId of userIds) {
      await updateUserStats(userId);
    }

    res.status(200).json({ 
      success: true, 
      message: `${events.length} events stored successfully` 
    });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error storing bulk events:', error);
    res.status(500).json({ success: false, error: 'Failed to store events' });
  } finally {
    client.release();
  }
});

// GET /api/analytics/users - Get list of all users
app.get('/api/analytics/users', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        user_id,
        event_count,
        first_event,
        last_event,
        session_count as sessions,
        created_at,
        updated_at
      FROM users 
      ORDER BY last_event DESC
    `);

    res.json({ 
      success: true, 
      users: result.rows.map(user => ({
        userId: user.user_id,
        eventCount: parseInt(user.event_count),
        firstEvent: user.first_event ? parseInt(user.first_event) : null,
        lastEvent: user.last_event ? parseInt(user.last_event) : null,
        sessions: parseInt(user.sessions),
        createdAt: user.created_at,
        updatedAt: user.updated_at
      }))
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch users' });
  }
});

// GET /api/analytics/users/:userId - Get specific user data
app.get('/api/analytics/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const eventsResult = await pool.query(`
      SELECT 
        event_type,
        event_data,
        timestamp,
        server_timestamp,
        session_id,
        created_at
      FROM events 
      WHERE user_id = $1 
      ORDER BY timestamp ASC
    `, [userId]);

    const userResult = await pool.query(`
      SELECT * FROM users WHERE user_id = $1
    `, [userId]);

    if (eventsResult.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    const events = eventsResult.rows.map(row => ({
      type: row.event_type,
      data: row.event_data,
      timestamp: parseInt(row.timestamp),
      serverTimestamp: parseInt(row.server_timestamp),
      sessionId: row.session_id,
      createdAt: row.created_at
    }));

    const userStats = userResult.rows[0] || {};

    res.json({ 
      success: true, 
      user: {
        userId,
        events,
        stats: {
          eventCount: parseInt(userStats.event_count || 0),
          firstEvent: userStats.first_event ? parseInt(userStats.first_event) : null,
          lastEvent: userStats.last_event ? parseInt(userStats.last_event) : null,
          sessions: parseInt(userStats.session_count || 0),
          createdAt: userStats.created_at,
          updatedAt: userStats.updated_at
        }
      }
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch user data' });
  }
});

// GET /api/analytics/events - Get all events with optional filtering
app.get('/api/analytics/events', async (req, res) => {
  try {
    const { userId, eventType, sessionId, limit = 1000, offset = 0 } = req.query;
    
    let query = `
      SELECT 
        id,
        user_id,
        session_id,
        event_type,
        event_data,
        timestamp,
        server_timestamp,
        created_at
      FROM events 
      WHERE 1=1
    `;
    const queryParams = [];
    let paramIndex = 1;

    if (userId) {
      query += ` AND user_id = $${paramIndex}`;
      queryParams.push(userId);
      paramIndex++;
    }

    if (eventType) {
      query += ` AND event_type = $${paramIndex}`;
      queryParams.push(eventType);
      paramIndex++;
    }

    if (sessionId) {
      query += ` AND session_id = $${paramIndex}`;
      queryParams.push(sessionId);
      paramIndex++;
    }

    query += ` ORDER BY timestamp DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    queryParams.push(parseInt(limit), parseInt(offset));

    const result = await pool.query(query, queryParams);

    const events = result.rows.map(row => ({
      id: row.id,
      userId: row.user_id,
      sessionId: row.session_id,
      type: row.event_type,
      data: row.event_data,
      timestamp: parseInt(row.timestamp),
      serverTimestamp: parseInt(row.server_timestamp),
      createdAt: row.created_at
    }));

    res.json({ 
      success: true, 
      events,
      pagination: {
        limit: parseInt(limit),
        offset: parseInt(offset),
        total: events.length
      }
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch events' });
  }
});

// GET /api/analytics/stats - Get aggregated statistics
app.get('/api/analytics/stats', async (req, res) => {
  try {
    const statsResult = await pool.query(`
      SELECT 
        COUNT(DISTINCT user_id) as total_users,
        COUNT(*) as total_events,
        COUNT(DISTINCT session_id) as total_sessions,
        COUNT(DISTINCT event_type) as event_types,
        MIN(timestamp) as first_event_timestamp,
        MAX(timestamp) as last_event_timestamp
      FROM events
    `);

    const eventTypesResult = await pool.query(`
      SELECT 
        event_type,
        COUNT(*) as count
      FROM events 
      GROUP BY event_type 
      ORDER BY count DESC
    `);

    const stats = statsResult.rows[0];
    const eventTypes = eventTypesResult.rows;

    res.json({ 
      success: true, 
      stats: {
        totalUsers: parseInt(stats.total_users || 0),
        totalEvents: parseInt(stats.total_events || 0),
        totalSessions: parseInt(stats.total_sessions || 0),
        eventTypes: parseInt(stats.event_types || 0),
        firstEventTimestamp: stats.first_event_timestamp ? parseInt(stats.first_event_timestamp) : null,
        lastEventTimestamp: stats.last_event_timestamp ? parseInt(stats.last_event_timestamp) : null,
        eventTypeBreakdown: eventTypes.map(et => ({
          type: et.event_type,
          count: parseInt(et.count)
        }))
      }
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch statistics' });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({ success: false, error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Endpoint not found' });
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Received SIGINT, shutting down gracefully...');
  await pool.end();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Received SIGTERM, shutting down gracefully...');
  await pool.end();
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Analytics API available at http://localhost:${PORT}/api/analytics`);
  console.log(`🏥 Health check at http://localhost:${PORT}/health`);
}); 