import { useState } from "react";
import { Brain, Target, CheckCircle, ArrowRight, X, Code, RotateCcw, Lightbulb, TrendingUp, Zap, Clock } from "lucide-react";

export const LearningRateQuestion = ({
  taskChoice,
  setTaskChoice,
  navigate
}) => {
  const [showTaskResult2, setShowTaskResult2] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleTaskChoice2 = (choice) => {
    setTaskChoice(choice);
    setShowTaskResult2(true);
  };

  const handleShowExplanation = () => {
    setShowExplanation(true);
  };

  const isCorrect = taskChoice === "A";

  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center py-8 px-4 md:px-10 text-black font-['IBM_Plex_Mono',monospace]">
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">

        {/* Question Header */}
        <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative">
          <div className="absolute -top-6 left-4 px-3 py-1 bg-black text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
            <Brain className="w-4 h-4" />
            Learning Rate Question
          </div>
          <div className="text-2xl md:text-3xl font-bold tracking-tight text-black text-center mb-4">
            Which task had a faster learning rate?
          </div>
          <div className="bg-neutral-100 border-2 border-black rounded p-4 text-center font-mono text-neutral-700">
            (Shows quicker improvement with practice)
          </div>
        </div>

        {/* Task Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Task A */}
          <button
            onClick={() => handleTaskChoice2("A")}
            className={`border-4 border-black rounded-xl p-8 transition-all font-bold text-xl uppercase tracking-wider shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${taskChoice === "A"
              ? "bg-green-500 text-white border-green-700"
              : "bg-white text-black hover:bg-purple-50"
              }`}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Code className="w-8 h-8" />
              <span className="text-3xl font-black">A</span>
            </div>
            <div className="text-lg">Task A</div>
            <div className="text-base font-semibold mt-2">String Formatting</div>
            <div className="text-sm font-normal mt-1 text-gray-600">
              Format user data into readable string
            </div>
            {taskChoice === "A" && (
              <div className="mt-4 flex items-center justify-center gap-2">
                <CheckCircle className="w-6 h-6" />
                <span className="font-mono text-sm">SELECTED</span>
              </div>
            )}
          </button>

          {/* Task B */}
          <button
            onClick={() => handleTaskChoice2("B")}
            className={`border-4 border-black rounded-xl p-8 transition-all font-bold text-xl uppercase tracking-wider shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${taskChoice === "B"
              ? "bg-red-500 text-white border-red-700"
              : "bg-white text-black hover:bg-purple-50"
              }`}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <RotateCcw className="w-8 h-8" />
              <span className="text-3xl font-black">B</span>
            </div>
            <div className="text-lg">Task B</div>
            <div className="text-base font-semibold mt-2">Recursive Fibonacci</div>
            <div className="text-sm font-normal mt-1 text-gray-600">
              Calculate nth Fibonacci number recursively
            </div>
            {taskChoice === "B" && (
              <div className="mt-4 flex items-center justify-center gap-2">
                <CheckCircle className="w-6 h-6" />
                <span className="font-mono text-sm">SELECTED</span>
              </div>
            )}
          </button>
        </div>

        {/* Initial Result Display */}
        {showTaskResult2 && !showExplanation && (
          <div className="border-4 border-black rounded-xl p-6 bg-gradient-to-r from-yellow-100 to-orange-100 shadow-lg relative">
            <div className="absolute -top-6 left-4 px-3 py-1 bg-orange-600 text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              ANALYSIS
            </div>
            <div className="text-xl font-bold text-black mb-4">
              {isCorrect ? (
                <>
                  Correct! <span className="bg-black text-white px-2 py-1 rounded">Task A (String Formatting)</span> typically has a much faster learning rate.
                </>
              ) : (
                <>
                  Actually, <span className="bg-black text-white px-2 py-1 rounded">Task A (String Formatting)</span> has the faster learning rate.
                </>
              )}
            </div>
            <div className="text-lg text-black mb-6">
              Can you think of why this might be?
            </div>
            <button
              onClick={handleShowExplanation}
              className="px-6 py-3 bg-black text-white border-4 border-black rounded-xl font-bold uppercase tracking-wide hover:bg-white hover:text-black transition-all transform hover:scale-105"
            >
              Tell me!
            </button>
          </div>
        )}

        {/* Detailed Explanation */}
        {showExplanation && (
          <div className="space-y-6">
            <div className="border-l-8 border-blue-600 bg-blue-100 p-6 rounded-r-xl">
              <p className="text-black text-xl font-bold leading-relaxed">
                You correctly identified that <strong>Task A (String Formatting)</strong> has a much faster learning rate than <strong>Task B (Recursive Fibonacci)</strong>. Let's explore why based on these specific examples.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Fast Learning Rate - Task A */}
              <div className="border-4 border-green-600 rounded-xl p-6 bg-green-50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-600 text-white rounded-lg flex items-center justify-center text-2xl font-black border-2 border-black">
                    A
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-green-700 uppercase tracking-wide">String Formatting</h3>
                    <div className="text-sm text-green-600">FAST LEARNING RATE</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="bg-green-100 border-2 border-green-600 rounded-lg p-3">
                    <div className="font-bold text-green-800 text-sm flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Immediate Visual Feedback
                    </div>
                    <div className="text-green-900 text-xs mt-1">When you format strings, you can instantly see if your output matches the expected format - clear success/failure indicators</div>
                  </div>
                  <div className="bg-green-100 border-2 border-green-600 rounded-lg p-3">
                    <div className="font-bold text-green-800 text-sm flex items-center gap-2">
                      <Lightbulb className="w-4 h-4" />
                      Clear Patterns & Build-up
                    </div>
                    <div className="text-green-900 text-xs mt-1">F-string syntax follows predictable patterns - once you learn the basic format, you can quickly apply it to different scenarios</div>
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
                    <h3 className="text-xl font-bold text-purple-700 uppercase tracking-wide">Recursive Fibonacci</h3>
                    <div className="text-sm text-purple-600">SLOW LEARNING RATE</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="bg-purple-100 border-2 border-purple-600 rounded-lg p-3">
                    <div className="font-bold text-purple-800 text-sm flex items-center gap-2">
                      <Brain className="w-4 h-4" />
                      Abstract Mental Models
                    </div>
                    <div className="text-purple-900 text-xs mt-1">Understanding recursion requires grasping abstract concepts like function calls within functions and base cases</div>
                  </div>
                  <div className="bg-purple-100 border-2 border-purple-600 rounded-lg p-3">
                    <div className="font-bold text-purple-800 text-sm flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Delayed Understanding
                    </div>
                    <div className="text-purple-900 text-xs mt-1">The "aha!" moment comes slowly - you need to understand how recursion builds up and breaks down problems before mastery clicks</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-4 border-blue-600 rounded-xl p-6 bg-blue-50">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-8 h-8 text-blue-600" />
                <h3 className="text-xl font-bold text-blue-700 uppercase tracking-wide">Learning Rate Explained</h3>
              </div>
              <p className="text-black text-lg font-bold leading-relaxed mb-4">
                <span className="bg-blue-200 px-2 py-1 border-2 border-blue-600 rounded text-blue-800 font-bold">
                  Learning Rate
                </span>
                {' '}measures how quickly someone improves with practice. High learning rate = rapid improvement per practice session. Low learning rate = gradual, slow improvement even with practice.
              </p>
            </div>
          </div>
        )}

        {/* Continue Button */}
        {showExplanation && (
          <div className="flex justify-center">
            <button
              onClick={() => navigate(13)}
              className="px-8 py-4 bg-purple-600 text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-purple-600 hover:border-purple-600 transition-all transform hover:scale-105 flex items-center gap-3"
            >
              <span>Continue</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};