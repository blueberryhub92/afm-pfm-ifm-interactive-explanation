// API Configuration
const isDevelopment = window.location.hostname === 'localhost' || 
                     window.location.hostname === '127.0.0.1' ||
                     window.location.hostname.includes('localhost.run') ||
                     window.location.hostname.includes('lhr.life');

// Helper to get the backend URL
const getBackendUrl = () => {
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:3001';
  }
  
  // For tunnel services, use the same protocol and hostname but different port
  if (window.location.hostname.includes('lhr.life') || window.location.hostname.includes('localhost.run')) {
    return `${window.location.protocol}//${window.location.hostname}:3001`;
  }
  
  // Production
  return `${window.location.origin}/modelingo`;
};

export const API_CONFIG = {
  // Backend URL based on environment
  BASE_URL: getBackendUrl(),
  
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
  detectedPlatform: isDevelopment ? 'development' : 'production'
};

console.log('API Configuration:', {
  baseUrl: API_CONFIG.BASE_URL,
  platform: ENV_INFO.detectedPlatform,
  host: window.location.hostname
}); 