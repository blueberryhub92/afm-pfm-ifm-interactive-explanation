import React, { useState, useEffect } from 'react';
import { Brain, Terminal, Zap, ArrowRight, Target, Code } from 'lucide-react';
import { trackButtonClick, trackInputChange, trackCustomEvent } from '../utils/analytics';

export const ConceptUnderstandingQuiz = ({ guess2, setGuess2, navigate }) => {
  const [startTime] = useState(Date.now());
  const [interactionHistory, setInteractionHistory] = useState([]);
  const [lastInputValue, setLastInputValue] = useState('');

  // Track quiz entry
  useEffect(() => {
    trackCustomEvent('concept_quiz_started', {
      componentName: 'ConceptUnderstandingQuiz',
      elementType: 'quiz',
      quizContext: {
        quizType: 'python_slicing',
        questionType: 'code_output',
        timestamp: startTime
      }
    });

    return () => {
      // Track quiz exit
      trackCustomEvent('concept_quiz_exited', {
        componentName: 'ConceptUnderstandingQuiz',
        elementType: 'quiz',
        quizMetrics: {
          timeSpent: Date.now() - startTime,
          interactionCount: interactionHistory.length,
          finalAnswer: guess2,
          interactionPattern: summarizeInteractions(interactionHistory)
        }
      });
    };
  }, [interactionHistory, guess2]);

  const summarizeInteractions = (interactions) => {
    return {
      totalEdits: interactions.filter(i => i.type === 'edit').length,
      totalSubmitAttempts: interactions.filter(i => i.type === 'submit').length,
      averageEditLength: interactions
        .filter(i => i.type === 'edit')
        .reduce((sum, i) => sum + i.value.length, 0) / Math.max(1, interactions.filter(i => i.type === 'edit').length),
      editPattern: interactions
        .filter(i => i.type === 'edit')
        .map(i => i.value.length)
    };
  };

  const handleSubmitGuess2 = () => {
    if (!guess2.trim()) return;

    // Track submission attempt
    trackButtonClick('concept_quiz_submit', {
      componentName: 'ConceptUnderstandingQuiz',
      elementType: 'button',
      elementLocation: 'quiz_submission',
      submissionContext: {
        answer: guess2,
        timeToSubmit: Date.now() - startTime,
        answerLength: guess2.length,
        previousInteractions: summarizeInteractions(interactionHistory)
      }
    });

    setInteractionHistory(prev => [...prev, {
      type: 'submit',
      value: guess2,
      timestamp: Date.now()
    }]);

    navigate(6);
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setGuess2(newValue);

    // Track detailed input changes
    trackInputChange('concept_quiz_answer', 'quiz_input', newValue, lastInputValue, {
      componentName: 'ConceptUnderstandingQuiz',
      elementType: 'text_input',
      elementLocation: 'quiz_answer',
      changeContext: {
        previousLength: lastInputValue.length,
        newLength: newValue.length,
        changeType: newValue.length > lastInputValue.length ? 'addition' : 'deletion',
        timestamp: Date.now()
      }
    });

    setLastInputValue(newValue);
    setInteractionHistory(prev => [...prev, {
      type: 'edit',
      value: newValue,
      timestamp: Date.now()
    }]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmitGuess2();
    }
  };

  return (
    <div className="bg-white min-h-screen grid place-items-center py-8 px-4 md:px-10 text-black font-['IBM_Plex_Mono',monospace]">
      <div className="w-full max-w-4xl mx-auto space-y-8">
        {/* Quiz Section */}
        <div className="border-4 border-black rounded-xl p-6 bg-white relative shadow-lg">
          <div className="absolute -top-6 left-4 px-3 py-1 bg-purple-600 text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
            <Brain className="w-4 h-4" />
            QUIZ MODE
          </div>

          <div className="text-center mb-6">
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-black mb-4">
              Let's tackle another task on the same skill
            </h3>
            <div className="inline-flex items-center gap-2 bg-yellow-100 border-4 border-yellow-400 px-4 py-2 rounded-lg">
              <Target className="w-5 h-5 text-yellow-700" />
              <span className="text-lg font-semibold text-yellow-900 italic">
                What will this code output?
              </span>
            </div>
          </div>

          {/* Code Block */}
          <div className="border-4 border-black rounded-xl p-6 bg-gray-900 mb-8 relative shadow-lg">
            <div className="absolute -top-6 left-4 px-3 py-1 bg-black text-white font-semibold text-xs tracking-wider flex items-center gap-2">
              <Code className="w-4 h-4" />
              PYTHON CODE
            </div>
            <div className="text-green-400 font-mono text-lg md:text-xl leading-relaxed">
              <div className="mb-2">message = "dlokgm"</div>
              <div className="mb-2">result = message[::2]</div>
              <div>print(result)</div>
            </div>
          </div>

          {/* Hint */}
          <div className="bg-orange-100 border-l-8 border-orange-500 p-4 rounded-lg mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-orange-600" />
              <span className="font-bold text-orange-800 uppercase tracking-wide">Hint</span>
            </div>
            <p className="text-sm font-semibold text-orange-900">
              This uses a different <span className="bg-orange-300 px-2 py-1 rounded font-mono">step value</span> than our first example!
            </p>
          </div>
        </div>

        {/* Input Section */}
        <div className="border-4 border-black rounded-xl p-6 bg-white shadow-lg">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-lg font-bold text-black mb-2 uppercase tracking-wide">
                Your Guess:
              </label>
              <input
                type="text"
                placeholder="TYPE YOUR GUESS HERE..."
                value={guess2}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-3 border-4 border-black rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-300 bg-white text-black font-mono text-lg font-semibold placeholder-gray-400 tracking-wide"
                style={{ textTransform: 'none' }}
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleSubmitGuess2}
                disabled={!guess2.trim()}
                className={`px-6 py-3 border-4 border-black rounded-lg font-semibold uppercase tracking-wide transition-all shadow-lg flex items-center gap-3 text-lg ${guess2.trim()
                  ? 'bg-purple-600 text-white hover:bg-white hover:text-purple-600 hover:border-purple-600'
                  : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                  }`}
              >
                Submit Guess!
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};