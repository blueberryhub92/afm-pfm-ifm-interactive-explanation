const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST || 'postgres',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'afm_analytics',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
});

const initDatabase = async () => {
  try {
    console.log('🗄️  Initializing database...');
    
    // Create events table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        session_id VARCHAR(255) NOT NULL,
        event_type VARCHAR(100) NOT NULL,
        event_data JSONB,
        timestamp BIGINT NOT NULL,
        server_timestamp BIGINT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create users table for aggregated user data
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        user_id VARCHAR(255) PRIMARY KEY,
        event_count INTEGER DEFAULT 0,
        first_event BIGINT,
        last_event BIGINT,
        session_count INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create indexes for better performance
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_events_user_id ON events(user_id);
    `);
    
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_events_session_id ON events(session_id);
    `);
    
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_events_timestamp ON events(timestamp);
    `);

    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_events_event_type ON events(event_type);
    `);

    console.log('✅ Database initialized successfully!');
    console.log('📊 Tables created:');
    console.log('   - events (for storing all analytics events)');
    console.log('   - users (for aggregated user statistics)');
    
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
};

// Run migration if called directly
if (require.main === module) {
  initDatabase();
}

module.exports = { initDatabase }; 