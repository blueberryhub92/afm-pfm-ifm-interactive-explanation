import { API_CONFIG } from '../config/api';

// Anonymous user tracking system
class Analytics {
  constructor() {
    this.userId = this.getOrCreateUserId();
    this.sessionId = this.generateSessionId();
    this.events = [];
    this.startTime = Date.now();
  }

  // Generate or retrieve anonymous user ID from localStorage
  getOrCreateUserId() {
    let userId = localStorage.getItem('anonymous_user_id');
    if (!userId) {
      userId = this.generateUniqueId('user');
      localStorage.setItem('anonymous_user_id', userId);
    }
    return userId;
  }

  // Generate session ID for current browser session
  generateSessionId() {
    let sessionId = sessionStorage.getItem('session_id');
    if (!sessionId) {
      sessionId = this.generateUniqueId('session');
      sessionStorage.setItem('session_id', sessionId);
    }
    return sessionId;
  }

  // Generate unique ID with timestamp and random component
  generateUniqueId(prefix) {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    return `${prefix}_${timestamp}_${random}`;
  }

  // Track any event with custom data
  track(eventName, eventData = {}) {
    const event = {
      userId: this.userId,
      sessionId: this.sessionId,
      eventName,
      eventData,
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      screenResolution: `${screen.width}x${screen.height}`,
      viewportSize: `${window.innerWidth}x${window.innerHeight}`,
      timeFromStart: Date.now() - this.startTime
    };

    this.events.push(event);
    this.persistEvent(event);
    
    // Optional: Send to backend immediately
    this.sendToBackend(event);
  }

  // Persist event to localStorage as backup
  persistEvent(event) {
    try {
      const storedEvents = JSON.parse(localStorage.getItem('user_events') || '[]');
      storedEvents.push(event);
      
      // Keep only last 1000 events to prevent localStorage overflow
      if (storedEvents.length > 1000) {
        storedEvents.splice(0, storedEvents.length - 1000);
      }
      
      localStorage.setItem('user_events', JSON.stringify(storedEvents));
    } catch (error) {
      console.warn('Failed to persist event to localStorage:', error);
    }
  }

  // Send event to backend (implement your backend endpoint)
  async sendToBackend(event) {
    try {
      // Backend endpoint with environment-aware URL
      const response = await fetch(API_CONFIG.getFullUrl(API_CONFIG.ENDPOINTS.EVENTS), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.warn('Failed to send event to backend:', error);
      // Event is still persisted locally, so can be retried later
    }
  }

  // Bulk send all stored events (useful for retry mechanism)
  async syncStoredEvents() {
    try {
      const storedEvents = JSON.parse(localStorage.getItem('user_events') || '[]');
      if (storedEvents.length === 0) return;

      const response = await fetch(API_CONFIG.getFullUrl(API_CONFIG.ENDPOINTS.EVENTS_BULK), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(storedEvents)
      });

      if (response.ok) {
        // Clear stored events after successful sync
        localStorage.removeItem('user_events');
      }
    } catch (error) {
      console.warn('Failed to sync stored events:', error);
    }
  }

  // Get all events for current user
  getStoredEvents() {
    return JSON.parse(localStorage.getItem('user_events') || '[]');
  }

  // Export all user data (useful for data portability)
  exportUserData() {
    return {
      userId: this.userId,
      sessionId: this.sessionId,
      events: this.events,
      storedEvents: this.getStoredEvents()
    };
  }
}

// Create global analytics instance
const analytics = new Analytics();

// Predefined tracking functions for common events
export const trackSlideChange = (slideNumber, slideName) => {
  analytics.track('slide_change', {
    slideNumber,
    slideName,
    direction: 'forward' // could be enhanced to track direction
  });
};

export const trackButtonClick = (buttonName, context = {}) => {
  analytics.track('button_click', {
    buttonName,
    ...context
  });
};

export const trackQuizAnswer = (questionId, answer, isCorrect, timeSpent) => {
  analytics.track('quiz_answer', {
    questionId,
    answer,
    isCorrect,
    timeSpent
  });
};

export const trackSliderInteraction = (sliderId, value, context = {}) => {
  analytics.track('slider_interaction', {
    sliderId,
    value,
    ...context
  });
};

export const trackTimeSpent = (location, timeSpent) => {
  analytics.track('time_spent', {
    location,
    timeSpent
  });
};

export const trackScenarioComplete = (scenarioId, completion, score) => {
  analytics.track('scenario_complete', {
    scenarioId,
    completion,
    score
  });
};

export const trackError = (errorType, errorMessage, context = {}) => {
  analytics.track('error', {
    errorType,
    errorMessage,
    ...context
  });
};

// Custom event tracking
export const trackCustomEvent = (eventName, eventData = {}) => {
  analytics.track(eventName, eventData);
};

// Sync stored events on page load
export const syncEvents = () => {
  analytics.syncStoredEvents();
};

// Export user data
export const exportUserData = () => {
  return analytics.exportUserData();
};

// Get anonymous user ID (useful for linking data later)
export const getUserId = () => {
  return analytics.userId;
};

export default analytics; 