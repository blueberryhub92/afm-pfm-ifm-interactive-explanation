import { useState, useEffect, useRef } from 'react';
import {
    trackQuizAnswer,
    trackButtonClick,
    trackTimeSpent,
    trackSliderInteraction
} from '../utils/analytics';

export const ExampleTrackedComponent = ({ scroll }) => {
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [sliderValue, setSliderValue] = useState(50);
    const [showFeedback, setShowFeedback] = useState(false);
    const startTimeRef = useRef(Date.now());

    // Track time spent on component when it unmounts or user leaves
    useEffect(() => {
        const startTime = Date.now();

        return () => {
            const timeSpent = Date.now() - startTime;
            trackTimeSpent('ExampleComponent', timeSpent);
        };
    }, []);

    // Track quiz answer submission
    const handleQuizSubmit = (answer) => {
        const timeSpent = Date.now() - startTimeRef.current;
        const isCorrect = answer === 'correct_answer';

        trackQuizAnswer('example_quiz', answer, isCorrect, timeSpent);

        setSelectedAnswer(answer);
        setShowFeedback(true);

        // Track additional context
        trackButtonClick('quiz_submit', {
            answer,
            isCorrect,
            timeSpent,
            attempts: 1 // You could track multiple attempts
        });
    };

    // Track slider interactions
    const handleSliderChange = (value) => {
        setSliderValue(value);
        trackSliderInteraction('example_slider', value, {
            previousValue: sliderValue,
            context: 'learning_adjustment'
        });
    };

    // Track navigation with context
    const handleContinue = () => {
        const timeSpent = Date.now() - startTimeRef.current;

        trackButtonClick('continue_button', {
            componentTimeSpent: timeSpent,
            selectedAnswer,
            sliderValue,
            showedFeedback: showFeedback
        });

        scroll(5); // Continue to next slide
    };

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-6">Example Tracked Component</h2>

            {/* Quiz Section */}
            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Quiz Question</h3>
                <p className="mb-4">What is the main limitation of AFM?</p>

                <div className="space-y-2">
                    {[
                        { id: 'a', text: 'It is too complex', value: 'wrong_a' },
                        { id: 'b', text: 'It uses binary assessment', value: 'correct_answer' },
                        { id: 'c', text: 'It is too simple', value: 'wrong_c' }
                    ].map((option) => (
                        <button
                            key={option.id}
                            onClick={() => handleQuizSubmit(option.value)}
                            disabled={showFeedback}
                            className={`w-full p-3 text-left border rounded ${selectedAnswer === option.value
                                    ? 'bg-blue-100 border-blue-500'
                                    : 'border-gray-300 hover:bg-gray-50'
                                }`}
                        >
                            {option.text}
                        </button>
                    ))}
                </div>

                {showFeedback && (
                    <div className="mt-4 p-4 bg-green-100 border border-green-400 rounded">
                        <p>
                            {selectedAnswer === 'correct_answer'
                                ? 'Correct! AFM uses binary assessment which loses nuanced information.'
                                : 'Not quite. The main limitation is binary assessment.'
                            }
                        </p>
                    </div>
                )}
            </div>

            {/* Slider Section */}
            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Confidence Level</h3>
                <p className="mb-4">How confident are you in your understanding? ({sliderValue}%)</p>

                <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderValue}
                    onChange={(e) => handleSliderChange(parseInt(e.target.value))}
                    className="w-full"
                />
            </div>

            {/* Continue Button */}
            <button
                onClick={handleContinue}
                className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Continue to Next Section
            </button>
        </div>
    );
}; 