import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
    trackSlideEntry,
    trackSlideExit,
    trackMouseClick,
    trackMouseMove,
    trackScroll,
    trackHover,
    trackInputChange,
    trackInputFocus,
    trackInputBlur,
    trackButtonClick,
    trackKeyboardNavigation,
    trackFocusChange,
    trackEngagementLevel,
    trackTimeSpent,
    trackError,
    trackSliderInteraction
} from '../../utils/analytics';

// Universal tracking wrapper for slides
export const SlideTracker = ({
    children,
    slideNumber,
    slideName,
    trackInteractions = true,
    trackScrolling = true,
    trackMouse = true,
    trackKeyboard = true,
    trackFocus = true,
    trackEngagement = true,
    className = ''
}) => {
    const slideRef = useRef(null);
    const [slideStartTime] = useState(Date.now());
    const [lastScrollTime, setLastScrollTime] = useState(Date.now());
    const [mouseMovements, setMouseMovements] = useState([]);
    const [focusedElement, setFocusedElement] = useState(null);
    const [engagementScore, setEngagementScore] = useState(0);
    const [hoverStart, setHoverStart] = useState(null);
    const [inputStates, setInputStates] = useState(new Map());

    // Track slide entry
    useEffect(() => {
        trackSlideEntry(slideNumber, slideName, 'component_mount');

        return () => {
            const timeSpent = Date.now() - slideStartTime;
            trackSlideExit(slideNumber, slideName, timeSpent, 'component_unmount');
            trackTimeSpent(`slide_${slideNumber}`, timeSpent, 'interactive');
        };
    }, [slideNumber, slideName, slideStartTime]);

    // Calculate engagement score based on interactions
    const updateEngagementScore = useCallback((interactionType, value = 1) => {
        setEngagementScore(prev => {
            const weights = {
                mouse_move: 0.1,
                mouse_click: 2,
                keyboard: 3,
                scroll: 0.5,
                input_change: 5,
                button_click: 10,
                hover: 1
            };

            const increment = (weights[interactionType] || 1) * value;
            const newScore = Math.min(100, prev + increment);

            // Track engagement periodically
            if (trackEngagement && newScore > prev + 5) {
                const indicators = {
                    mouse_movements: mouseMovements.length,
                    time_spent: Date.now() - slideStartTime,
                    interactions_count: Math.floor(newScore / 2)
                };
                trackEngagementLevel(slideNumber, newScore, indicators);
            }

            return newScore;
        });
    }, [slideNumber, mouseMovements.length, slideStartTime, trackEngagement]);

    // Mouse tracking
    const handleMouseMove = useCallback((e) => {
        if (!trackMouse) return;

        const now = Date.now();
        const lastMovement = mouseMovements[mouseMovements.length - 1];

        if (!lastMovement || now - lastMovement.timestamp > 100) {
            const movement = {
                x: e.clientX,
                y: e.clientY,
                timestamp: now
            };

            setMouseMovements(prev => {
                const newMovements = [...prev, movement];
                if (newMovements.length > 50) newMovements.shift(); // Keep last 50 movements
                return newMovements;
            });

            if (lastMovement) {
                const distance = Math.sqrt(
                    Math.pow(e.clientX - lastMovement.x, 2) +
                    Math.pow(e.clientY - lastMovement.y, 2)
                );

                if (distance > 10) { // Only track significant movements
                    trackMouseMove('slide', `slide_${slideNumber}`, {
                        startX: lastMovement.x,
                        startY: lastMovement.y,
                        endX: e.clientX,
                        endY: e.clientY,
                        distance,
                        duration: now - lastMovement.timestamp
                    });
                    updateEngagementScore('mouse_move');
                }
            }
        }
    }, [trackMouse, mouseMovements, slideNumber, updateEngagementScore]);

    // Mouse click tracking
    const handleMouseClick = useCallback((e) => {
        if (!trackMouse) return;

        const element = e.target;
        const elementType = element.tagName.toLowerCase();
        const elementId = element.id || element.className || 'unknown';

        trackMouseClick(elementType, elementId, {
            x: e.clientX,
            y: e.clientY,
            pageX: e.pageX,
            pageY: e.pageY
        });

        updateEngagementScore('mouse_click');
    }, [trackMouse, updateEngagementScore]);

    // Scroll tracking
    const handleScroll = useCallback((e) => {
        if (!trackScrolling) return;

        const now = Date.now();
        if (now - lastScrollTime > 150) { // Throttle scroll events
            const element = e.target === document ? document.documentElement : e.target;
            const scrollPosition = {
                scrollTop: element.scrollTop,
                scrollHeight: element.scrollHeight,
                clientHeight: element.clientHeight
            };

            const direction = element.scrollTop > (element.lastScrollTop || 0) ? 'down' : 'up';
            element.lastScrollTop = element.scrollTop;

            trackScroll(scrollPosition, direction, slideNumber);
            updateEngagementScore('scroll');
            setLastScrollTime(now);
        }
    }, [trackScrolling, lastScrollTime, slideNumber, updateEngagementScore]);

    // Hover tracking
    const handleMouseEnter = useCallback((e) => {
        if (!trackMouse) return;
        setHoverStart(Date.now());
    }, [trackMouse]);

    const handleMouseLeave = useCallback((e) => {
        if (!trackMouse || !hoverStart) return;

        const duration = Date.now() - hoverStart;
        if (duration > 500) { // Only track meaningful hovers
            const element = e.target;
            const elementType = element.tagName.toLowerCase();
            const elementId = element.id || element.className || 'unknown';

            trackHover(elementType, elementId, duration);
            updateEngagementScore('hover', duration / 1000);
        }
        setHoverStart(null);
    }, [trackMouse, hoverStart, updateEngagementScore]);

    // Keyboard tracking
    const handleKeyDown = useCallback((e) => {
        if (!trackKeyboard) return;

        const element = e.target;
        const elementType = element.tagName.toLowerCase();

        trackKeyboardNavigation(e.key, 'press', elementType);
        updateEngagementScore('keyboard');
    }, [trackKeyboard, updateEngagementScore]);

    // Focus tracking
    const handleFocus = useCallback((e) => {
        if (!trackFocus) return;

        const element = e.target;
        const elementType = element.tagName.toLowerCase();
        const elementId = element.id || element.className || 'unknown';

        if (focusedElement) {
            trackFocusChange(focusedElement, elementId, 'unknown');
        }

        setFocusedElement(elementId);

        if (['input', 'textarea', 'select'].includes(elementType)) {
            trackInputFocus(elementType, elementId);
            setInputStates(prev => new Map(prev.set(elementId, {
                startTime: Date.now(),
                initialValue: element.value
            })));
        }
    }, [trackFocus, focusedElement]);

    const handleBlur = useCallback((e) => {
        if (!trackFocus) return;

        const element = e.target;
        const elementType = element.tagName.toLowerCase();
        const elementId = element.id || element.className || 'unknown';

        if (['input', 'textarea', 'select'].includes(elementType)) {
            const inputState = inputStates.get(elementId);
            if (inputState) {
                const timeSpent = Date.now() - inputState.startTime;
                trackInputBlur(elementType, elementId, timeSpent, element.value);
                setInputStates(prev => {
                    const newStates = new Map(prev);
                    newStates.delete(elementId);
                    return newStates;
                });
            }
        }
    }, [trackFocus, inputStates]);

    // Input change tracking
    const handleInputChange = useCallback((e) => {
        if (!trackInteractions) return;

        const element = e.target;
        const elementType = element.tagName.toLowerCase();
        const elementId = element.id || element.className || 'unknown';

        if (['input', 'textarea', 'select'].includes(elementType)) {
            const inputState = inputStates.get(elementId);
            const previousValue = inputState ? inputState.initialValue : '';

            trackInputChange(elementType, elementId, element.value, previousValue);
            updateEngagementScore('input_change');

            // Update the initial value for next comparison
            if (inputState) {
                setInputStates(prev => new Map(prev.set(elementId, {
                    ...inputState,
                    initialValue: element.value
                })));
            }
        }
    }, [trackInteractions, inputStates, updateEngagementScore]);

    // Button click tracking (enhanced)
    const handleButtonClick = useCallback((e) => {
        if (!trackInteractions) return;

        const element = e.target;
        const elementType = element.tagName.toLowerCase();

        if (['button', 'a'].includes(elementType) || element.role === 'button') {
            const buttonName = element.textContent?.trim() ||
                element.getAttribute('aria-label') ||
                element.className ||
                'unknown_button';

            trackButtonClick(buttonName, {
                elementType,
                elementId: element.id,
                slideNumber,
                href: element.href
            });
            updateEngagementScore('button_click');
        }
    }, [trackInteractions, slideNumber, updateEngagementScore]);

    // Error boundary for tracking
    const handleError = useCallback((error, errorInfo) => {
        trackError('slide_error', error.message, {
            slideNumber,
            slideName,
            stack: error.stack,
            componentStack: errorInfo?.componentStack
        });
    }, [slideNumber, slideName]);

    // Setup event listeners
    useEffect(() => {
        const element = slideRef.current;
        if (!element) return;

        // Add event listeners
        if (trackMouse) {
            element.addEventListener('mousemove', handleMouseMove, { passive: true });
            element.addEventListener('click', handleMouseClick);
            element.addEventListener('mouseenter', handleMouseEnter);
            element.addEventListener('mouseleave', handleMouseLeave);
        }

        if (trackScrolling) {
            element.addEventListener('scroll', handleScroll, { passive: true });
            window.addEventListener('scroll', handleScroll, { passive: true });
        }

        if (trackKeyboard) {
            element.addEventListener('keydown', handleKeyDown);
        }

        if (trackFocus) {
            element.addEventListener('focus', handleFocus, { capture: true });
            element.addEventListener('blur', handleBlur, { capture: true });
        }

        if (trackInteractions) {
            element.addEventListener('change', handleInputChange);
            element.addEventListener('click', handleButtonClick);
        }

        return () => {
            if (trackMouse) {
                element.removeEventListener('mousemove', handleMouseMove);
                element.removeEventListener('click', handleMouseClick);
                element.removeEventListener('mouseenter', handleMouseEnter);
                element.removeEventListener('mouseleave', handleMouseLeave);
            }

            if (trackScrolling) {
                element.removeEventListener('scroll', handleScroll);
                window.removeEventListener('scroll', handleScroll);
            }

            if (trackKeyboard) {
                element.removeEventListener('keydown', handleKeyDown);
            }

            if (trackFocus) {
                element.removeEventListener('focus', handleFocus, { capture: true });
                element.removeEventListener('blur', handleBlur, { capture: true });
            }

            if (trackInteractions) {
                element.removeEventListener('change', handleInputChange);
                element.removeEventListener('click', handleButtonClick);
            }
        };
    }, [
        trackMouse, trackScrolling, trackKeyboard, trackFocus, trackInteractions,
        handleMouseMove, handleMouseClick, handleMouseEnter, handleMouseLeave,
        handleScroll, handleKeyDown, handleFocus, handleBlur,
        handleInputChange, handleButtonClick
    ]);

    return (
        <div
            ref={slideRef}
            className={`slide-tracker ${className}`}
            data-slide-number={slideNumber}
            data-slide-name={slideName}
            data-engagement-score={engagementScore}
        >
            {children}
        </div>
    );
};

// Enhanced tracking hooks for specific components
export const useSlideTracker = (slideNumber, slideName) => {
    const [slideStartTime] = useState(Date.now());

    useEffect(() => {
        trackSlideEntry(slideNumber, slideName);

        return () => {
            const timeSpent = Date.now() - slideStartTime;
            trackSlideExit(slideNumber, slideName, timeSpent);
        };
    }, [slideNumber, slideName, slideStartTime]);

    return {
        trackTimeSpent: (location) => {
            const timeSpent = Date.now() - slideStartTime;
            trackTimeSpent(location, timeSpent);
        }
    };
};

// Specific tracking components for common UI elements
export const TrackedButton = ({
    children,
    onClick,
    trackingName,
    trackingContext = {},
    ...props
}) => {
    const handleClick = (e) => {
        trackButtonClick(trackingName || children, trackingContext);
        if (onClick) onClick(e);
    };

    return (
        <button {...props} onClick={handleClick}>
            {children}
        </button>
    );
};

export const TrackedInput = ({
    type = 'text',
    trackingId,
    trackingContext = {},
    onChange,
    onFocus,
    onBlur,
    ...props
}) => {
    const [focusTime, setFocusTime] = useState(null);
    const [previousValue, setPreviousValue] = useState(props.value || '');

    const handleFocus = (e) => {
        setFocusTime(Date.now());
        trackInputFocus(type, trackingId || e.target.id);
        if (onFocus) onFocus(e);
    };

    const handleBlur = (e) => {
        if (focusTime) {
            const timeSpent = Date.now() - focusTime;
            trackInputBlur(type, trackingId || e.target.id, timeSpent, e.target.value);
        }
        if (onBlur) onBlur(e);
    };

    const handleChange = (e) => {
        trackInputChange(type, trackingId || e.target.id, e.target.value, previousValue);
        setPreviousValue(e.target.value);
        if (onChange) onChange(e);
    };

    return (
        <input
            type={type}
            {...props}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
        />
    );
};

export const TrackedSlider = ({
    value,
    onChange,
    trackingId,
    trackingContext = {},
    ...props
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [previousValue, setPreviousValue] = useState(value);

    const handleChange = (newValue) => {
        trackSliderInteraction(trackingId, newValue, {
            previousValue,
            isDragging,
            ...trackingContext
        });
        setPreviousValue(newValue);
        if (onChange) onChange(newValue);
    };

    const handleMouseDown = () => setIsDragging(true);
    const handleMouseUp = () => setIsDragging(false);

    return (
        <input
            type="range"
            value={value}
            onChange={(e) => handleChange(Number(e.target.value))}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            {...props}
        />
    );
};

export default SlideTracker; 