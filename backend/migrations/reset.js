const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST || 'postgres',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'afm_analytics',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
});

const resetDatabase = async () => {
  try {
    console.log('🗑️  Resetting database...');
    
    // Drop tables if they exist
    await pool.query('DROP TABLE IF EXISTS events CASCADE');
    await pool.query('DROP TABLE IF EXISTS users CASCADE');
    
    console.log('✅ Database reset completed!');
    console.log('💡 Run "npm run migrate" to recreate the tables.');
    
  } catch (error) {
    console.error('❌ Error resetting database:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
};

// Run reset if called directly
if (require.main === module) {
  resetDatabase();
}

module.exports = { resetDatabase }; 