// API Configuration
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const isVercel = window.location.hostname.includes('vercel.app');
const isNetlify = window.location.hostname.includes('netlify.app');
const isRailway = window.location.hostname.includes('railway.app');

export const API_CONFIG = {
  // Backend URL based on environment
  BASE_URL: isDevelopment 
    ? 'http://localhost:3001'  // Local development
    : isVercel || isNetlify
      ? window.location.origin  // Vercel/Netlify: Same domain (serverless functions)
      : 'https://afm-analytics-backend-production.up.railway.app', // Replace with your deployed backend URL
  
  // API Endpoints
  ENDPOINTS: {
    EVENTS: '/api/analytics/events',
    EVENTS_BULK: '/api/analytics/events/bulk', 
    STATS: '/api/analytics/stats',
    USERS: '/api/analytics/users',
    USER_EVENTS: (userId) => `/api/analytics/users/${userId}`,
    EXPORT: '/api/analytics/export'
  },

  // Get full URL for endpoint
  getFullUrl: (endpoint) => {
    return `${API_CONFIG.BASE_URL}${endpoint}`;
  }
};

// Environment info
export const ENV_INFO = {
  isDevelopment,
  currentHost: window.location.hostname,
  currentOrigin: window.location.origin,
  detectedPlatform: isDevelopment 
    ? 'development' 
    : isVercel 
      ? 'vercel' 
      : isNetlify 
        ? 'netlify' 
        : isRailway 
          ? 'railway' 
          : 'custom'
};

console.log('API Configuration:', {
  baseUrl: API_CONFIG.BASE_URL,
  platform: ENV_INFO.detectedPlatform,
  host: window.location.hostname
}); 