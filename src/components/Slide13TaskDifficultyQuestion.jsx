import { useState } from "react";

export const Slide13TaskDifficultyQuestion = ({
  taskChoice,
  setTaskChoice,
  scroll,
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
    <div className="max-w-2xl w-full text-center space-y-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">
        Which task was more difficult?
      </h2>

      <div className="space-y-4">
        <button
          onClick={() => handleTaskChoice1("1")}
          className={`w-full py-3 px-6 rounded-lg border-2 transition-all ${
            taskChoice === "1"
              ? "bg-gray-500 text-white border-gray-500"
              : "bg-white text-gray-700 border-gray-300 hover:border-gray-500"
          }`}
        >
          Task 1 (Variable Declaration)
        </button>
        <button
          onClick={() => handleTaskChoice1("2")}
          className={`w-full py-3 px-6 rounded-lg border-2 transition-all ${
            taskChoice === "2"
              ? "bg-gray-500 text-white border-gray-500"
              : "bg-white text-gray-700 border-gray-300 hover:border-gray-500"
          }`}
        >
          Task 2 (For Loop)
        </button>
      </div>

      {showTaskResult1 && (
        <div className="space-y-6">
          <p className="text-lg text-gray-700">
            Actually, <strong>Task 2 (For Loop)</strong> is more challenging in
            this case. Can you think of a reason why?
          </p>

          <button
            onClick={handleTellMe2}
            className="underline text-blue-600 hover:text-blue-800 font-semibold"
          >
            Tell me!
          </button>
        </div>
      )}

      {showTellMe2 && (
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 text-left transition-all duration-500">
          <p className="text-gray-700 leading-relaxed">
            The for loop task is more challenging because it requires
            understanding multiple concepts working together: loop syntax, the
            range() function, variable accumulation, and logical flow control.
            Variable declaration is more straightforward - it's just assigning
            values to names. For loops require understanding how iteration works
            and how to maintain state across multiple iterations, making it
            cognitively more demanding.
          </p>
        </div>
      )}

      {showTellMe2 && (
        <div className="text-center">
          <button
            onClick={() => scroll(14)}
            className="px-8 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
};
