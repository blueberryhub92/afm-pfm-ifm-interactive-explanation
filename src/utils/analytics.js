import { API_CONFIG } from '../config/api';

// Anonymous user tracking system
class Analytics {
  constructor() {
    this.userId = this.getOrCreateUserId();
    this.sessionId = this.generateSessionId();
    this.events = [];
    this.startTime = Date.now();
    this.slideStartTime = Date.now();
    this.currentSlide = null;
    this.interactionBuffer = [];
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
      timeFromStart: Date.now() - this.startTime,
      timeFromSlideStart: this.currentSlide ? Date.now() - this.slideStartTime : 0
    };

    this.events.push(event);
    this.persistEvent(event);
    
    // Optional: Send to backend immediately
    this.sendToBackend(event);
  }

  // Set current slide for timing calculations
  setCurrentSlide(slideNumber, slideName) {
    this.currentSlide = { number: slideNumber, name: slideName };
    this.slideStartTime = Date.now();
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
      const backendUrl = API_CONFIG.getFullUrl(API_CONFIG.ENDPOINTS.EVENTS);
      console.log('📡 Sending event to backend:', {
        url: backendUrl,
        eventName: event.eventName,
        userId: event.userId
      });
      
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event)
      });
      
      if (!response.ok) {
        console.error('❌ Backend response error:', {
          status: response.status,
          statusText: response.statusText,
          url: response.url
        });
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('✅ Event sent successfully:', result);
    } catch (error) {
      console.error('❌ Failed to send event to backend:', {
        error: error.message,
        url: API_CONFIG.getFullUrl(API_CONFIG.ENDPOINTS.EVENTS),
        eventName: event.eventName
      });
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

// Enhanced tracking functions for comprehensive data collection

// === SLIDE TRACKING ===
export const trackSlideChange = (slideNumber, slideName, direction = 'forward') => {
  analytics.setCurrentSlide(slideNumber, slideName);
  analytics.track('slide_change', {
    slideNumber,
    slideName,
    direction,
    method: 'navigation'
  });
};

export const trackSlideEntry = (slideNumber, slideName, entryMethod = 'navigation') => {
  analytics.track('slide_entry', {
    slideNumber,
    slideName,
    entryMethod // navigation, direct_link, back_button
  });
};

export const trackSlideExit = (slideNumber, slideName, timeSpent, exitMethod = 'navigation') => {
  analytics.track('slide_exit', {
    slideNumber,
    slideName,
    timeSpent,
    exitMethod // navigation, back_button, direct_link, page_close
  });
};

// === INTERACTION TRACKING ===
export const trackButtonClick = (buttonName, context = {}) => {
  analytics.track('button_click', {
    buttonName,
    ...context
  });
};

export const trackMouseClick = (elementType, elementId, position) => {
  analytics.track('mouse_click', {
    elementType,
    elementId,
    x: position.x,
    y: position.y,
    pageX: position.pageX,
    pageY: position.pageY
  });
};

export const trackMouseMove = (elementType, elementId, movement) => {
  analytics.track('mouse_movement', {
    elementType,
    elementId,
    startX: movement.startX,
    startY: movement.startY,
    endX: movement.endX,
    endY: movement.endY,
    distance: movement.distance,
    duration: movement.duration
  });
};

export const trackScroll = (scrollPosition, direction, slideNumber) => {
  analytics.track('scroll_event', {
    scrollPosition,
    direction, // up, down
    scrollTop: scrollPosition.scrollTop,
    scrollHeight: scrollPosition.scrollHeight,
    clientHeight: scrollPosition.clientHeight,
    slideNumber
  });
};

export const trackHover = (elementType, elementId, duration) => {
  analytics.track('element_hover', {
    elementType,
    elementId,
    duration
  });
};

// === FORM & INPUT TRACKING ===
export const trackInputChange = (inputType, inputId, value, previousValue) => {
  analytics.track('input_change', {
    inputType,
    inputId,
    value: typeof value === 'string' && value.length > 50 ? value.substring(0, 50) + '...' : value,
    previousValue: typeof previousValue === 'string' && previousValue.length > 50 ? previousValue.substring(0, 50) + '...' : previousValue,
    valueLength: typeof value === 'string' ? value.length : null
  });
};

export const trackInputFocus = (inputType, inputId) => {
  analytics.track('input_focus', {
    inputType,
    inputId
  });
};

export const trackInputBlur = (inputType, inputId, timeSpent, finalValue) => {
  analytics.track('input_blur', {
    inputType,
    inputId,
    timeSpent,
    finalValue: typeof finalValue === 'string' && finalValue.length > 50 ? finalValue.substring(0, 50) + '...' : finalValue
  });
};

export const trackSliderInteraction = (sliderId, value, context = {}) => {
  analytics.track('slider_interaction', {
    sliderId,
    value,
    previousValue: context.previousValue,
    isDragging: context.isDragging,
    ...context
  });
};

// === QUIZ & ASSESSMENT TRACKING ===
export const trackQuizAnswer = (questionId, answer, isCorrect, timeSpent, attempts = 1) => {
  analytics.track('quiz_answer', {
    questionId,
    answer,
    isCorrect,
    timeSpent,
    attempts
  });
};

export const trackQuizStart = (quizId, questionCount) => {
  analytics.track('quiz_start', {
    quizId,
    questionCount
  });
};

export const trackQuizComplete = (quizId, score, totalQuestions, timeSpent) => {
  analytics.track('quiz_complete', {
    quizId,
    score,
    totalQuestions,
    percentage: (score / totalQuestions) * 100,
    timeSpent
  });
};

export const trackQuestionView = (questionId, questionType, timeViewed) => {
  analytics.track('question_view', {
    questionId,
    questionType,
    timeViewed
  });
};

// === CONTENT INTERACTION ===
export const trackContentExpand = (contentId, contentType, expanded) => {
  analytics.track('content_expand', {
    contentId,
    contentType,
    expanded, // true/false
    action: expanded ? 'expand' : 'collapse'
  });
};

export const trackTooltipView = (tooltipId, tooltipType, duration) => {
  analytics.track('tooltip_view', {
    tooltipId,
    tooltipType,
    duration
  });
};

export const trackModalOpen = (modalId, modalType, trigger) => {
  analytics.track('modal_open', {
    modalId,
    modalType,
    trigger // button_click, auto, link
  });
};

export const trackModalClose = (modalId, modalType, timeSpent, closeMethod) => {
  analytics.track('modal_close', {
    modalId,
    modalType,
    timeSpent,
    closeMethod // button, overlay, escape, auto
  });
};

// === SIMULATION & INTERACTIVE ELEMENTS ===
export const trackSimulationStart = (simulationId, simulationType, initialSettings) => {
  analytics.track('simulation_start', {
    simulationId,
    simulationType,
    initialSettings
  });
};

export const trackSimulationInteraction = (simulationId, interactionType, parameters) => {
  analytics.track('simulation_interaction', {
    simulationId,
    interactionType, // parameter_change, play, pause, reset, step
    parameters
  });
};

export const trackSimulationEnd = (simulationId, duration, finalState, completionStatus) => {
  analytics.track('simulation_end', {
    simulationId,
    duration,
    finalState,
    completionStatus // completed, abandoned, error
  });
};

export const trackVisualizationInteraction = (visualizationId, interactionType, data) => {
  analytics.track('visualization_interaction', {
    visualizationId,
    interactionType, // zoom, pan, filter, select
    data
  });
};

// === LEARNING & PROGRESS TRACKING ===
export const trackTimeSpent = (location, timeSpent, activityType = 'passive') => {
  analytics.track('time_spent', {
    location,
    timeSpent,
    activityType // passive, active, interactive
  });
};

export const trackLearningProgress = (topic, progressPercentage, milestones) => {
  analytics.track('learning_progress', {
    topic,
    progressPercentage,
    milestones // array of completed milestones
  });
};

export const trackConceptUnderstanding = (concept, understandingLevel, evidence) => {
  analytics.track('concept_understanding', {
    concept,
    understandingLevel, // beginner, intermediate, advanced
    evidence // quiz_score, time_spent, interactions
  });
};

export const trackMistake = (errorType, context, correctionAttempts) => {
  analytics.track('learning_mistake', {
    errorType,
    context,
    correctionAttempts,
    timestamp: Date.now()
  });
};

// === ACCESSIBILITY & ENGAGEMENT ===
export const trackKeyboardNavigation = (key, action, element) => {
  analytics.track('keyboard_navigation', {
    key,
    action, // press, hold, release
    element,
    isAccessibilityUser: true
  });
};

export const trackFocusChange = (fromElement, toElement, method) => {
  analytics.track('focus_change', {
    fromElement,
    toElement,
    method // mouse, keyboard, programmatic
  });
};

export const trackEngagementLevel = (slideNumber, engagementScore, indicators) => {
  analytics.track('engagement_level', {
    slideNumber,
    engagementScore, // 0-100
    indicators // array of engagement indicators
  });
};

// === ERROR & PERFORMANCE TRACKING ===
export const trackError = (errorType, errorMessage, context = {}) => {
  analytics.track('error', {
    errorType,
    errorMessage,
    stack: context.stack,
    userAgent: navigator.userAgent,
    url: window.location.href,
    ...context
  });
};

export const trackPerformance = (metric, value, context = {}) => {
  analytics.track('performance_metric', {
    metric, // load_time, render_time, interaction_delay
    value,
    ...context
  });
};

// === SCENARIO & TASK TRACKING ===
export const trackScenarioStart = (scenarioId, scenarioType, difficulty) => {
  analytics.track('scenario_start', {
    scenarioId,
    scenarioType,
    difficulty
  });
};

export const trackScenarioComplete = (scenarioId, completion, score, strategies) => {
  analytics.track('scenario_complete', {
    scenarioId,
    completion,
    score,
    strategies, // array of strategies used
    timeToComplete: Date.now() - analytics.slideStartTime
  });
};

export const trackTaskAttempt = (taskId, attempt, success, timeSpent) => {
  analytics.track('task_attempt', {
    taskId,
    attempt,
    success,
    timeSpent
  });
};

// === CUSTOM & GENERAL TRACKING ===
export const trackCustomEvent = (eventName, eventData = {}) => {
  analytics.track(eventName, eventData);
};

export const trackPageVisibility = (isVisible, timeHidden) => {
  analytics.track('page_visibility', {
    isVisible,
    timeHidden,
    timestamp: Date.now()
  });
};

export const trackWindowResize = (newSize, oldSize) => {
  analytics.track('window_resize', {
    newWidth: newSize.width,
    newHeight: newSize.height,
    oldWidth: oldSize.width,
    oldHeight: oldSize.height
  });
};

// === DATA EXPORT & SYNC ===
export const syncEvents = () => {
  analytics.syncStoredEvents();
};

export const exportUserData = () => {
  return analytics.exportUserData();
};

export const getUserId = () => {
  return analytics.userId;
};

export const getSessionId = () => {
  return analytics.sessionId;
};

export const clearAnalyticsData = () => {
  localStorage.removeItem('user_events');
  analytics.events = [];
};

// Auto-setup page visibility tracking
if (typeof document !== 'undefined') {
  let hiddenTime = null;
  
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      hiddenTime = Date.now();
    } else if (hiddenTime) {
      trackPageVisibility(true, Date.now() - hiddenTime);
      hiddenTime = null;
    }
  });

  // Track window resize
  let resizeTimeout;
  let oldSize = { width: window.innerWidth, height: window.innerHeight };
  
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const newSize = { width: window.innerWidth, height: window.innerHeight };
      trackWindowResize(newSize, oldSize);
      oldSize = newSize;
    }, 250);
  });
}

export default analytics; 