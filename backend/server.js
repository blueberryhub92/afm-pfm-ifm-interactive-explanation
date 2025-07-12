const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_DIR = path.join(__dirname, 'data');

// Middleware
const corsOptions = {
  origin: [
    'http://localhost:5173', // Local development
    'http://localhost:3000', // Alternative local port
    'https://blueberryhub92.github.io/afm-pfm-ifm-interactive-explanation/',
    // Add your Railway backend URL here when you know it
    // Example: 'https://your-service-name.up.railway.app'
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));

// Ensure data directory exists
const ensureDataDir = async () => {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
};

// Helper function to append data to JSON file
const appendToJSONFile = async (filename, data) => {
  const filePath = path.join(DATA_DIR, filename);
  
  try {
    // Try to read existing file
    const existingData = await fs.readFile(filePath, 'utf8');
    const jsonData = JSON.parse(existingData);
    
    // Append new data
    if (Array.isArray(data)) {
      jsonData.push(...data);
    } else {
      jsonData.push(data);
    }
    
    // Write back to file
    await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2));
  } catch (error) {
    // File doesn't exist or is corrupted, create new one
    const newData = Array.isArray(data) ? data : [data];
    await fs.writeFile(filePath, JSON.stringify(newData, null, 2));
  }
};

// POST /api/analytics/events - Store single event
app.post('/api/analytics/events', async (req, res) => {
  try {
    const event = req.body;
    
    // Add server timestamp
    event.serverTimestamp = Date.now();
    
    // Store in general events file
    await appendToJSONFile('events.json', event);
    
    // Also store in user-specific file for easier querying
    const userFile = `user_${event.userId}.json`;
    await appendToJSONFile(userFile, event);
    
    res.status(200).json({ success: true, message: 'Event stored successfully' });
  } catch (error) {
    console.error('Error storing event:', error);
    res.status(500).json({ success: false, error: 'Failed to store event' });
  }
});

// POST /api/analytics/events/bulk - Store multiple events
app.post('/api/analytics/events/bulk', async (req, res) => {
  try {
    const events = req.body;
    
    if (!Array.isArray(events)) {
      return res.status(400).json({ success: false, error: 'Events must be an array' });
    }
    
    // Add server timestamp to all events
    const timestampedEvents = events.map(event => ({
      ...event,
      serverTimestamp: Date.now()
    }));
    
    // Store in general events file
    await appendToJSONFile('events.json', timestampedEvents);
    
    // Group by user and store in user-specific files
    const userGroups = {};
    timestampedEvents.forEach(event => {
      if (!userGroups[event.userId]) {
        userGroups[event.userId] = [];
      }
      userGroups[event.userId].push(event);
    });
    
    // Store each user's events
    for (const [userId, userEvents] of Object.entries(userGroups)) {
      const userFile = `user_${userId}.json`;
      await appendToJSONFile(userFile, userEvents);
    }
    
    res.status(200).json({ 
      success: true, 
      message: `${timestampedEvents.length} events stored successfully` 
    });
  } catch (error) {
    console.error('Error storing bulk events:', error);
    res.status(500).json({ success: false, error: 'Failed to store events' });
  }
});

// GET /api/analytics/users - Get list of all users
app.get('/api/analytics/users', async (req, res) => {
  try {
    const files = await fs.readdir(DATA_DIR);
    const userFiles = files.filter(file => file.startsWith('user_') && file.endsWith('.json'));
    
    const users = await Promise.all(
      userFiles.map(async (file) => {
        const userId = file.replace('user_', '').replace('.json', '');
        const filePath = path.join(DATA_DIR, file);
        const data = await fs.readFile(filePath, 'utf8');
        const events = JSON.parse(data);
        
        return {
          userId,
          eventCount: events.length,
          firstEvent: events[0]?.timestamp || null,
          lastEvent: events[events.length - 1]?.timestamp || null,
          sessions: [...new Set(events.map(e => e.sessionId))].length
        };
      })
    );
    
    res.json({ success: true, users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch users' });
  }
});

// GET /api/analytics/users/:userId - Get events for specific user
app.get('/api/analytics/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const userFile = `user_${userId}.json`;
    const filePath = path.join(DATA_DIR, userFile);
    
    try {
      const data = await fs.readFile(filePath, 'utf8');
      const events = JSON.parse(data);
      
      res.json({ success: true, userId, events });
    } catch (error) {
      res.status(404).json({ success: false, error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user events:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch user events' });
  }
});

// GET /api/analytics/stats - Get analytics statistics
app.get('/api/analytics/stats', async (req, res) => {
  try {
    const eventsFile = path.join(DATA_DIR, 'events.json');
    
    try {
      const data = await fs.readFile(eventsFile, 'utf8');
      const events = JSON.parse(data);
      
      const stats = {
        totalEvents: events.length,
        uniqueUsers: [...new Set(events.map(e => e.userId))].length,
        uniqueSessions: [...new Set(events.map(e => e.sessionId))].length,
        eventTypes: events.reduce((acc, event) => {
          acc[event.eventName] = (acc[event.eventName] || 0) + 1;
          return acc;
        }, {}),
        dateRange: {
          start: Math.min(...events.map(e => e.timestamp)),
          end: Math.max(...events.map(e => e.timestamp))
        }
      };
      
      res.json({ success: true, stats });
    } catch (error) {
      res.json({ 
        success: true, 
        stats: { 
          totalEvents: 0, 
          uniqueUsers: 0, 
          uniqueSessions: 0, 
          eventTypes: {}, 
          dateRange: null 
        } 
      });
    }
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch stats' });
  }
});

// GET /api/analytics/export - Export all data as CSV
app.get('/api/analytics/export', async (req, res) => {
  try {
    const eventsFile = path.join(DATA_DIR, 'events.json');
    const data = await fs.readFile(eventsFile, 'utf8');
    const events = JSON.parse(data);
    
    // Convert to CSV
    const headers = [
      'userId', 'sessionId', 'eventName', 'timestamp', 'serverTimestamp',
      'url', 'userAgent', 'screenResolution', 'viewportSize', 'timeFromStart'
    ];
    
    const csvRows = [
      headers.join(','),
      ...events.map(event => {
        return headers.map(header => {
          let value = event[header] || '';
          if (header === 'eventData') {
            value = JSON.stringify(event.eventData || {});
          }
          // Escape quotes and wrap in quotes if contains comma
          if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
            value = `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        }).join(',');
      })
    ];
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="analytics_export.csv"');
    res.send(csvRows.join('\n'));
  } catch (error) {
    console.error('Error exporting data:', error);
    res.status(500).json({ success: false, error: 'Failed to export data' });
  }
});

// Initialize server
const startServer = async () => {
  await ensureDataDir();
  
  app.listen(PORT, () => {
    console.log(`Analytics server running on port ${PORT}`);
    console.log(`Data directory: ${DATA_DIR}`);
  });
};

startServer().catch(console.error); 