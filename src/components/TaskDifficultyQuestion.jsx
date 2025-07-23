import { useState } from "react";
import { Target, Brain, ArrowRight, Lightbulb, Code, Zap } from "lucide-react";

export const TaskDifficultyQuestion = ({
  taskChoice,
  setTaskChoice,
  navigate
}) => {
  const [showTaskResult1, setShowTaskResult1] = useState(false);
  const [showTellMe2, setShowTellMe2] = useState(false);

  const handleTaskChoice1 = (choice) => {
    setTaskChoice(choice);
    setShowTaskResult1(true);
  };

  const handleTellMe2 = () => {
    setShowTellMe2(true);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center py-8 px-4 md:px-10 text-black font-['IBM_Plex_Mono',monospace]">
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">

        {/* Main Question */}
        <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative">
          <div className="absolute -top-6 left-4 px-3 py-1 bg-black text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
            <Code className="w-4 h-4" />
            PYTHON TASKS
          </div>
          <div className="text-2xl md:text-3xl font-bold tracking-tight text-black text-center mb-8">
            Which task was more difficult?
          </div>

          {/* Task Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              onClick={() => handleTaskChoice1("1")}
              className={`border-4 border-black rounded-xl p-6 font-bold text-lg uppercase tracking-wide transition-all transform hover:scale-105 ${taskChoice === "1"
                ? "bg-black text-white shadow-lg"
                : "bg-white text-black hover:bg-gray-100"
                }`}
            >
              <div className="flex items-center justify-center gap-3 mb-2">
                <Code className="w-6 h-6" />
                <span>Task 1</span>
              </div>
              <div className="text-sm font-mono normal-case">
                Variable Declaration
              </div>
            </button>

            <button
              onClick={() => handleTaskChoice1("2")}
              className={`border-4 border-black rounded-xl p-6 font-bold text-lg uppercase tracking-wide transition-all transform hover:scale-105 ${taskChoice === "2"
                ? "bg-black text-white shadow-lg"
                : "bg-white text-black hover:bg-gray-100"
                }`}
            >
              <div className="flex items-center justify-center gap-3 mb-2">
                <Zap className="w-6 h-6" />
                <span>Task 2</span>
              </div>
              <div className="text-sm font-mono normal-case">
                For Loop
              </div>
            </button>
          </div>
        </div>

        {/* Task Result */}
        {showTaskResult1 && (
          <div className="border-4 border-black rounded-xl p-6 bg-gradient-to-r from-yellow-100 to-orange-100 shadow-lg">
            <div className="absolute -top-6 left-4 px-3 py-1 bg-orange-600 text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
              <Brain className="w-4 h-4" />
              ANALYSIS
            </div>
            <div className="text-xl font-bold text-black mb-4">
              Actually, <span className="bg-black text-white px-2 py-1 rounded">Task 2 (For Loop)</span> is more challenging in this case.
            </div>
            <div className="text-lg text-black mb-6">
              Can you think of a reason why?
            </div>
            <button
              onClick={handleTellMe2}
              className="px-6 py-3 bg-black text-white border-4 border-black rounded-xl font-bold uppercase tracking-wide hover:bg-white hover:text-black transition-all transform hover:scale-105"
            >
              Tell me!
            </button>
          </div>
        )}

        {/* Explanation */}
        {showTellMe2 && (
          <div className="border-4 border-black rounded-xl p-6 bg-white shadow-lg">
            <div className="absolute -top-6 left-4 px-3 py-1 bg-purple-600 text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              EXPLANATION
            </div>
            <div className="text-lg leading-relaxed text-black">
              The for loop task is more challenging because it requires understanding
              <span className="font-bold bg-yellow-200 px-1 rounded ml-1">multiple concepts or skills working together</span>:
              loop syntax, the range() function, variable accumulation, and logical flow control. All of these skills have their own inherent difficulty in AFM and add up to make the task more difficult.
            </div>
            <div className="mt-4 text-lg leading-relaxed text-black">
              Variable declaration is more straightforward - it's just
              <span className="font-bold bg-green-200 px-1 rounded ml-1">assigning values to names</span>.
              For loops require understanding how iteration works and how to maintain state
              across multiple iterations, making it
              <span className="font-bold bg-red-200 px-1 rounded ml-1">cognitively more demanding</span>.
            </div>
          </div>
        )}

        {/* Continue Button */}
        {showTellMe2 && (
          <div className="flex justify-center">
            <button
              onClick={() => navigate(10)}
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