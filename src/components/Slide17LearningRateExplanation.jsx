import { Zap, Clock, Lightbulb, ArrowRight, Target, Brain, TrendingUp, List, Users } from "lucide-react";
import { useState } from 'react';

export const Slide17LearningRateExplanation = ({ scroll }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Understanding Different Learning Rates",
      content: (
        <div className="space-y-6">
          <div className="border-l-8 border-blue-600 bg-blue-100 p-6 rounded-r-xl">
            <p className="text-black text-xl font-bold leading-relaxed">
              Not all concepts are learned at the same speed. Let's explore why some skills have{' '}
              <span className="bg-green-200 px-2 py-1 border-2 border-green-600 rounded text-green-800 font-bold">
                fast learning rates
              </span>
              {' '}while others have{' '}
              <span className="bg-purple-200 px-2 py-1 border-2 border-purple-600 rounded text-purple-800 font-bold">
                slow learning rates
              </span>
              .
            </p>
          </div>

          <div className="border-4 border-yellow-600 rounded-xl p-6 bg-yellow-50">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-8 h-8 text-yellow-600" />
              <h3 className="text-xl font-bold text-yellow-700 uppercase tracking-wide">Critical Distinction</h3>
            </div>
            <p className="text-black text-lg font-bold leading-relaxed">
              <span className="bg-yellow-200 px-2 py-1 border-2 border-yellow-600 rounded text-yellow-800 font-bold">
                Learning Rate ≠ Task Difficulty
              </span>
              . A task can have fast learning rate but still be highly difficult overall.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-green-100 border-2 border-green-600 rounded-lg p-3">
                <div className="font-bold text-green-800 text-sm flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Learning Rate
                </div>
                <div className="text-green-900 text-xs mt-1">Speed of progress per practice session - how quickly you improve with each attempt</div>
              </div>
              <div className="bg-red-100 border-2 border-red-600 rounded-lg p-3">
                <div className="font-bold text-red-800 text-sm flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Task Difficulty
                </div>
                <div className="text-red-900 text-xs mt-1">Inherent conceptual difficulty - how hard the skill is to learn in the first place</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Fast Learning Rate - Task A */}
            <div className="border-4 border-green-600 rounded-xl p-6 bg-green-50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-600 text-white rounded-lg flex items-center justify-center text-2xl font-black border-2 border-black">
                  A
                </div>
                <div>
                  <h3 className="text-xl font-bold text-green-700 uppercase tracking-wide">Fast Learning</h3>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-green-100 border-2 border-green-600 rounded-lg p-3">
                  <div className="font-bold text-green-800 text-sm flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Immediate Feedback Loops
                  </div>
                  <div className="text-green-900 text-xs mt-1">Each function either works or doesn't - clear success/failure indicators with concrete, testable results</div>
                </div>
                <div className="bg-green-100 border-2 border-green-600 rounded-lg p-3">
                  <div className="font-bold text-green-800 text-sm flex items-center gap-2">
                    <Lightbulb className="w-4 h-4" />
                    Clear Patterns & Incremental Building
                  </div>
                  <div className="text-green-900 text-xs mt-1">Syntax and logic become recognizable quickly through incremental skill building</div>
                </div>
              </div>
            </div>

            {/* Slow Learning Rate - Task B */}
            <div className="border-4 border-purple-600 rounded-xl p-6 bg-purple-50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-purple-600 text-white rounded-lg flex items-center justify-center text-2xl font-black border-2 border-black">
                  B
                </div>
                <div>
                  <h3 className="text-xl font-bold text-purple-700 uppercase tracking-wide">Slow Learning</h3>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-purple-100 border-2 border-purple-600 rounded-lg p-3">
                  <div className="font-bold text-purple-800 text-sm flex items-center gap-2">
                    <Brain className="w-4 h-4" />
                    Abstract Mental Models Required
                  </div>
                  <div className="text-purple-900 text-xs mt-1">Requires developing mental models where multiple concepts must integrate</div>
                </div>
                <div className="bg-purple-100 border-2 border-purple-600 rounded-lg p-3">
                  <div className="font-bold text-purple-800 text-sm flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Delayed Understanding & Pattern Recognition
                  </div>
                  <div className="text-purple-900 text-xs mt-1">Pattern recognition takes time - "Aha!" moments come after extended practice</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "The Mathematical Connection: AFM Model",
      content: (
        <div className="space-y-6">
          <div className="border-4 border-orange-600 rounded-xl p-6 bg-orange-50">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-8 h-8 text-orange-600" />
              <h3 className="text-xl font-bold text-orange-700 uppercase tracking-wide">AFM Mathematical Relationship</h3>
            </div>
            <p className="text-black text-lg font-bold leading-relaxed mb-4">
              In the{' '}
              <span className="bg-orange-200 px-2 py-1 border-2 border-orange-600 rounded text-orange-800 font-bold">
                Additive Factor Model
              </span>
              , learning rate (γ) and opportunities (T) are mathematically connected and inversely related.
            </p>

            <div className="bg-black text-orange-400 p-4 rounded-lg border-2 border-orange-600 font-mono text-sm text-center mb-4">
              <div className="text-orange-300 mb-2">AFM FORMULA:</div>
              <div className="text-white">P(success) = θᵢ + βₖ + γₖ·Tᵢₖ</div>
              <div className="text-orange-300 text-xs mt-2">INVERSE RELATIONSHIP: γ ∝ 1/T</div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="border-l-4 border-blue-600 bg-blue-100 px-3 py-2 rounded-r-lg">
                <strong className="text-blue-800">γ (gamma):</strong> <span className="text-blue-700">Learning rate parameter</span>
              </div>
              <div className="border-l-4 border-purple-600 bg-purple-100 px-3 py-2 rounded-r-lg">
                <strong className="text-purple-800">T:</strong> <span className="text-purple-700">Number of practice opportunities</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-100 border-2 border-green-600 rounded-lg p-4">
                <div className="font-bold text-green-800 mb-2">When T is High (Many Opportunities)</div>
                <div className="text-green-900 font-mono text-sm">γ can be lower - small increments add up</div>
              </div>
              <div className="bg-red-100 border-2 border-red-600 rounded-lg p-4">
                <div className="font-bold text-red-800 mb-2">When T is Low (Few Opportunities)</div>
                <div className="text-red-900 font-mono text-sm">γ must be higher - each event more impactful</div>
              </div>
            </div>

            <div className="border-4 border-green-600 rounded-xl p-4 bg-green-50 mt-4">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="w-5 h-5 text-green-700" />
                <span className="font-bold text-green-700 uppercase tracking-wide">Key Insight</span>
              </div>
              <p className="text-green-800 text-sm font-mono">
                Learning rate is bound to opportunities - they're mathematically connected in AFM!
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Key Insights and Takeaways",
      content: (
        <div className="space-y-6">
          <div className="border-4 border-purple-600 rounded-xl p-6 bg-purple-50">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="w-8 h-8 text-purple-600" />
              <h3 className="text-xl font-bold text-purple-700 uppercase tracking-wide">Example: Chess</h3>
            </div>
            <p className="text-black text-lg font-bold leading-relaxed">
              Chess moves are initially confusing (high difficulty - low success on first try), but once you start learning, you pick up patterns quickly (fast learning rate). High difficulty + Fast learning rate can coexist!
            </p>
          </div>

          <div className="border-4 border-orange-600 rounded-xl p-6 bg-orange-50">
            <div className="flex items-center gap-3 mb-4">
              <Lightbulb className="w-8 h-8 text-orange-600" />
              <h3 className="text-xl font-bold text-orange-700 uppercase tracking-wide">Practical Implications</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-100 border-2 border-green-600 rounded-lg p-4">
                <div className="font-bold text-green-800 mb-2">Fast Learning Rate Skills</div>
                <div className="text-green-900 text-sm">Practice frequently with shorter sessions - you'll see rapid improvement</div>
              </div>
              <div className="bg-purple-100 border-2 border-purple-600 rounded-lg p-4">
                <div className="font-bold text-purple-800 mb-2">Slow Learning Rate Skills</div>
                <div className="text-purple-900 text-sm">Be patient - consistent practice over time leads to gradual mastery</div>
              </div>
            </div>
          </div>

          <div className="border-4 border-blue-600 rounded-xl p-6 bg-blue-50">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-8 h-8 text-blue-600" />
              <h3 className="text-xl font-bold text-blue-700 uppercase tracking-wide">Individual Differences</h3>
            </div>
            <p className="text-black text-lg font-bold leading-relaxed">
              Remember: learning rates can vary between individuals based on prior knowledge, cognitive abilities, and learning strategies. The AFM model accounts for these individual differences through the θᵢ (student ability) parameter.
            </p>
          </div>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col text-black font-['IBM_Plex_Mono',monospace]">
      {/* Header */}
      <div className="border-b-8 border-black bg-blue-400 px-8 py-6 shadow-lg">
        <div className="flex items-center justify-center">
          <span className="text-black font-bold text-2xl uppercase tracking-wider">
            Why Learning Rates Differ
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-8 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Progress Indicator */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              {steps.map((_, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className={`w-4 h-4 rounded-full border-2 border-black ${index <= currentStep ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                  />
                  {index < steps.length - 1 && (
                    <div className={`w-12 h-1 border-t-2 border-black ${index < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                      }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg mb-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-black uppercase tracking-tight">
              {steps[currentStep].title}
            </h2>

            {steps[currentStep].content}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="px-6 py-3 bg-gray-600 text-white border-4 border-black rounded-xl font-bold uppercase tracking-wide hover:bg-white hover:text-gray-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Previous
            </button>

            <div className="px-6 py-3 bg-white border-4 border-black rounded-xl font-bold text-black uppercase tracking-wide">
              Step {currentStep + 1} of {steps.length}
            </div>

            {currentStep < steps.length - 1 ? (
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-blue-600 text-white border-4 border-black rounded-xl font-bold uppercase tracking-wide hover:bg-white hover:text-blue-600 transition-all"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={() => scroll(15)}
                className="px-8 py-4 bg-green-600 text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-green-600 transition-all transform hover:scale-105 flex items-center gap-3"
              >
                <span>Continue</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}