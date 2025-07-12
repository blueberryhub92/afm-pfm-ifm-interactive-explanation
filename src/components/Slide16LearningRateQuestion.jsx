import { useState } from "react";
import { Brain, Target, CheckCircle, ArrowRight, X, Code, RotateCcw } from "lucide-react";

export const Slide16LearningRateQuestion = ({
  taskChoice,
  setTaskChoice,
  scroll
}) => {
  const [showTaskResult2, setShowTaskResult2] = useState(false);

  const handleTaskChoice2 = (choice) => {
    setTaskChoice(choice);
    setShowTaskResult2(true);
  };

  const isCorrect = taskChoice === "A";

  return (
    <div className="bg-white min-h-screen flex flex-col items-center py-8 px-4 md:px-10 text-black font-['IBM_Plex_Mono',monospace]">
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

        {/* Result Display */}
        {showTaskResult2 && (
          <div className={`border-4 rounded-xl p-8 shadow-lg animate-pulse relative ${isCorrect
            ? "border-green-600 bg-gradient-to-r from-green-100 to-green-200"
            : "border-red-600 bg-gradient-to-r from-red-100 to-red-200"
            }`}>
            <div className={`absolute -top-6 left-4 px-3 py-1 font-semibold rounded-md text-xs tracking-wider flex items-center gap-2 text-white ${isCorrect ? "bg-green-600" : "bg-red-600"
              }`}>
              {isCorrect ? <CheckCircle className="w-4 h-4" /> : <X className="w-4 h-4" />}
              Result
            </div>

            <div className="text-center mb-6">
              <div className={`text-3xl font-black mb-4 uppercase tracking-wider ${isCorrect ? "text-green-800" : "text-red-800"
                }`}>
                {isCorrect ? "Correct!" : "Not Quite!"}
              </div>

              {isCorrect ? (
                <>
                  <div className="text-xl font-bold text-black mb-4">
                    **Task A (String Formatting)** typically has a much faster learning rate.
                  </div>
                  <div className="text-lg text-green-900 font-semibold">
                    Can you think of why this might be?
                  </div>
                </>
              ) : (
                <>
                  <div className="text-xl font-bold text-black mb-4">
                    **Task A (String Formatting)** actually has the faster learning rate.
                  </div>
                  <div className="text-lg text-red-900 font-semibold">
                    Can you think of why this might be?
                  </div>
                </>
              )}
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => scroll(13)}
                className="px-8 py-4 border-4 border-black bg-blue-600 text-white font-bold text-lg uppercase tracking-wider rounded-xl hover:bg-white hover:text-blue-600 hover:border-blue-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-3"
              >
                Tell me why!
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};