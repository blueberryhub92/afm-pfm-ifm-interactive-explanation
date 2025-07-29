import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, FileText } from 'lucide-react';
import { getUserId, trackButtonClick } from '../utils/analytics';

export const QuestionnaireNotification = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [isDismissed, setIsDismissed] = useState(false);
    const notificationRef = useRef(null);
    const userId = getUserId();

    // Check if user previously dismissed the notification
    useEffect(() => {
        const dismissed = localStorage.getItem('questionnaire-notification-dismissed');
        if (dismissed === 'true') {
            setIsDismissed(true);
            setIsVisible(false);
        }
    }, []);

    // Handle click outside to close notification
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isExpanded && notificationRef.current && !notificationRef.current.contains(event.target)) {
                setIsExpanded(false);
            }
        };

        if (isExpanded) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }
    }, [isExpanded]);

    const handleDismiss = () => {
        setIsDismissed(true);
        setIsVisible(false);
        localStorage.setItem('questionnaire-notification-dismissed', 'true');

        // Track dismissal
        trackButtonClick('questionnaire_notification_dismiss', {
            userId,
            action: 'dismiss'
        });
    };

    const handleQuestionnaireClick = () => {
        // Track questionnaire click
        trackButtonClick('questionnaire_start', {
            userId,
            action: 'start_questionnaire'
        });

        // Base URL of your LimeSurvey questionnaire
        const baseUrl = 'https://limesurvey.uni-due.de/index.php/847825?lang=en';

        // LimeSurvey parameters:
        // - token: if you're using token-based access
        // - sid: survey ID (usually part of the base URL)
        // - newtest: start a new response
        // - lang: language code
        // You can also add custom parameters that you can access in LimeSurvey using ExpressionScript:
        // {PARAMETER:studyid}
        const questionnaireUrl = `${baseUrl}&studyid=${encodeURIComponent(userId)}`;

        // Open questionnaire in new tab
        window.open(questionnaireUrl, '_blank');
    };

    const handleExpand = () => {
        setIsExpanded(true);

        // Track expansion
        trackButtonClick('questionnaire_notification_expand', {
            userId,
            action: 'expand'
        });
    };

    const handleCollapse = () => {
        setIsExpanded(false);

        // Track collapse
        trackButtonClick('questionnaire_notification_collapse', {
            userId,
            action: 'collapse'
        });
    };

    if (isDismissed || !isVisible) {
        return null;
    }

    return (
        <div className="fixed bottom-6 left-6 z-30 font-mono">
            {/* Collapsed state - small floating button */}
            {!isExpanded && (
                <div
                    className="bg-blue-600 text-white p-4 rounded-lg shadow-lg border-4 border-black cursor-pointer hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
                    onClick={handleExpand}
                >
                    <div className="flex items-center gap-2">
                        <MessageCircle className="w-5 h-5" />
                        <span className="font-bold text-sm">Questionnaire</span>
                    </div>
                </div>
            )}

            {/* Expanded state - full notification */}
            {isExpanded && (
                <div ref={notificationRef} className="bg-white border-4 border-black rounded-xl shadow-2xl p-6 max-w-sm animate-in slide-in-from-bottom-2 duration-300">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <FileText className="w-6 h-6 text-blue-600" />
                            <span className="font-bold text-blue-600 uppercase tracking-wide">Master Thesis Research</span>
                        </div>
                        <button
                            onClick={handleCollapse}
                            className="p-1 hover:bg-gray-100 rounded border-2 border-black transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                        <div className="bg-blue-50 border-2 border-blue-600 rounded-lg p-4">
                            <p className="text-black font-bold text-sm leading-relaxed">
                                <strong>Your help is greatly appreciated!</strong> This questionnaire is an essential part of my master thesis research. After using the app, please take a few minutes to share your experience.
                            </p>
                        </div>

                        <div className="bg-green-50 border-2 border-green-600 rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-green-600 font-bold text-xs uppercase tracking-wide">Why Your Participation Matters</span>
                            </div>
                            <ul className="text-black font-bold text-xs space-y-1">
                                <li>• Supports academic research</li>
                                <li>• Helps improve educational tools</li>
                                <li>• Only takes 5-10 minutes</li>
                                <li>• Your insights are valuable!</li>
                            </ul>
                        </div>

                        {/* Study ID Display */}
                        <div className="bg-purple-50 border-2 border-purple-600 rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-purple-600 font-bold text-xs uppercase tracking-wide">Your Study ID</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <code className="bg-white px-3 py-1 rounded text-sm font-mono text-purple-800 border-2 border-purple-300 flex-1">
                                    {userId}
                                </code>
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(userId);
                                        trackButtonClick('copy_study_id', { userId });
                                    }}
                                    className="text-purple-600 hover:text-purple-800 text-xs underline"
                                >
                                    Copy
                                </button>
                            </div>
                            <p className="text-xs text-purple-700 mt-2">
                                This ID will be automatically included in your questionnaire responses.
                            </p>
                        </div>

                        {/* Action buttons */}
                        <div className="flex flex-col gap-2">
                            <button
                                onClick={handleQuestionnaireClick}
                                className="w-full bg-blue-600 text-white border-4 border-black rounded-lg px-4 py-3 font-bold uppercase tracking-wide hover:bg-white hover:text-blue-600 transition-all flex items-center justify-center gap-2"
                            >
                                <FileText className="w-4 h-4" />
                                Take Questionnaire
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}; 