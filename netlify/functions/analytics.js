// Netlify Function wrapper for Express backend
const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');

// Import your existing Express app
// You'd need to refactor server.js to export the app
const app = express();

// CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://blueberryhub92.github.io',
    'https://blueberryhub92.netlify.app', // Netlify domain
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));

// Your existing routes would go here
app.get('/api/analytics/stats', (req, res) => {
  // Implement your stats logic
  res.json({ success: true, stats: { totalEvents: 0 } });
});

app.post('/api/analytics/events', (req, res) => {
  // Implement your event storage logic
  res.json({ success: true, message: 'Event stored' });
});

// Export as serverless function
exports.handler = serverless(app); 