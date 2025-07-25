import { useState, useEffect } from 'react';
import { Brain, Target, HelpCircle, ArrowRight } from 'lucide-react';
import { trackButtonClick, trackCustomEvent } from '../utils/analytics';
import dogImage from '../assets/dog.jpg';

export const QuizFeedback = ({ guess2, navigate, showTellMe, setShowTellMe }) => {
  const [startTime] = useState(Date.now());
  const [interactionHistory, setInteractionHistory] = useState([]);
  const correctAnswer = 'dog';
  const isCorrect = guess2.toLowerCase().trim() === correctAnswer;

  // Track feedback view
  useEffect(() => {
    trackCustomEvent('quiz_feedback_viewed', {
      componentName: 'QuizFeedback',
      elementType: 'feedback',
      feedbackContext: {
        userAnswer: guess2,
        correctAnswer,
        isCorrect,
        timestamp: startTime,
        quizType: 'python_slicing'
      }
    });

    return () => {
      // Track feedback exit
      trackCustomEvent('quiz_feedback_exited', {
        componentName: 'QuizFeedback',
        elementType: 'feedback',
        feedbackMetrics: {
          timeSpent: Date.now() - startTime,
          interactionCount: interactionHistory.length,
          viewedExplanation: showTellMe,
          interactionPattern: summarizeInteractions(interactionHistory)
        }
      });
    };
  }, [interactionHistory, showTellMe]);

  const summarizeInteractions = (interactions) => {
    return {
      totalInteractions: interactions.length,
      explanationViewed: interactions.some(i => i.type === 'view_explanation'),
      timeToExplanation: interactions.find(i => i.type === 'view_explanation')?.timestamp - startTime,
      interactionSequence: interactions.map(i => i.type)
    };
  };

  const handleTellMe = () => {
    trackButtonClick('quiz_feedback_show_explanation', {
      componentName: 'QuizFeedback',
      elementType: 'button',
      elementLocation: 'feedback_explanation',
      explanationContext: {
        timeToRequest: Date.now() - startTime,
        userAnswer: guess2,
        isCorrect,
        previousInteractions: summarizeInteractions(interactionHistory)
      }
    });

    setInteractionHistory(prev => [...prev, {
      type: 'view_explanation',
      timestamp: Date.now()
    }]);

    setShowTellMe(true);
  };

  const handleContinue = () => {
    trackButtonClick('quiz_feedback_continue', {
      componentName: 'QuizFeedback',
      elementType: 'button',
      elementLocation: 'feedback_navigation',
      navigationContext: {
        timeSpent: Date.now() - startTime,
        viewedExplanation: showTellMe,
        userPerformance: {
          answer: guess2,
          isCorrect,
          timeToExplanation: interactionHistory.find(i => i.type === 'view_explanation')?.timestamp - startTime
        }
      }
    });

    setInteractionHistory(prev => [...prev, {
      type: 'continue',
      timestamp: Date.now()
    }]);

    navigate(7);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center py-8 px-4 md:px-10 text-black font-['IBM_Plex_Mono',monospace]">
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">

        {/* Your Guess Section */}
        <div className="border-4 border-black rounded-xl p-6 bg-gradient-to-r from-orange-100 to-yellow-100 shadow-lg relative">
          <div className="absolute -top-6 left-4 px-3 py-1 bg-orange-600 text-white font-bold rounded-md text-xs tracking-wider flex items-center gap-2">
            <Brain className="w-4 h-4" />
            YOUR GUESS
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-800 tracking-tight">
              You guessed: <span className="bg-orange-200 px-3 py-1 rounded border-2 border-black">{guess2}</span>
            </p>
          </div>
        </div>

        {/* Answer Section */}
        <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative">
          <div className="absolute -top-6 left-4 px-3 py-1 bg-green-600 text-white font-bold rounded-md text-xs tracking-wider flex items-center gap-2">
            <Target className="w-4 h-4" />
            CORRECT ANSWER
          </div>
          <div className="text-center space-y-4">
            <p className="text-3xl font-bold text-green-800 tracking-tight">
              Answer: <span className="bg-green-200 px-4 py-2 rounded border-2 border-black">{correctAnswer}</span>
            </p>
            <div className="flex justify-center">
              <img
                src={dogImage}
                alt="dog"
                className="w-32 h-auto rounded border-2 border-black"
              />
            </div>
          </div>
        </div>

        {/* Question Section */}
        <div className="border-4 border-black rounded-xl p-6 bg-white shadow-lg">
          <div className="text-center space-y-4">
            <p className="text-xl font-semibold text-black leading-relaxed">
              Did you get it right? Hopefully, that question was easier than the first one.
              <br />
              <span className="text-blue-700 font-bold">So what do you think happened?</span>
            </p>

            {!showTellMe && (
              <button
                onClick={handleTellMe}
                className="px-6 py-3 bg-blue-600 text-white border-4 border-black rounded-lg font-bold uppercase hover:bg-white hover:text-blue-700 hover:border-blue-800 transition-all shadow-lg flex items-center gap-2 mx-auto"
              >
                <HelpCircle className="w-5 h-5" />
                Tell me!
              </button>
            )}
          </div>
        </div>

        {/* Explanation Section */}
        {showTellMe && (
          <div className="border-l-8 border-blue-600 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 shadow-lg animate-fadeIn">
            <div className="flex items-center gap-2 mb-4 font-bold text-lg text-blue-800">
              <Brain className="w-6 h-6" />
              The AFM Connection
            </div>
            <div className="bg-white border-2 border-black rounded-lg p-4">
              <p className="text-black leading-relaxed font-mono">
                Well, this is connected to our next AFM parameter:{" "}
                <span className="bg-purple-200 px-2 py-1 rounded border-2 border-black font-bold">T</span>.
                {" "}T<sub>ik</sub> represents how many times a student{" "}
                <em className="bg-yellow-200 px-1 rounded">i</em> has practiced skill{" "}
                <em className="bg-yellow-200 px-1 rounded">k</em>.
                This is a key input to the AFM model. Look at the tooltip at the bottom right and see how the AFM formula expands.
              </p>
            </div>
          </div>
        )}

        {/* Continue Button */}
        {showTellMe && (
          <div className="text-center">
            <button
              onClick={handleContinue}
              className="px-8 py-4 bg-purple-600 text-white border-4 border-black rounded-lg font-bold uppercase hover:bg-white hover:text-purple-700 hover:border-purple-800 transition-all shadow-lg flex items-center gap-2 mx-auto text-lg"
            >
              Continue
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};