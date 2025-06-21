import { useState } from "react";

export const Slide16LearningRateQuestion = ({
  taskChoice,
  setTaskChoice,
  scroll,
}) => {
  const [showTaskResult2, setShowTaskResult2] = useState(false);

  const handleTaskChoice2 = (choice) => {
    setTaskChoice(choice);
    setShowTaskResult2(true);
  };

  return (
    <div className="max-w-2xl w-full text-center space-y-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">
        Which task has a faster learning rate? <br />
        <span className="text-lg font-normal text-gray-600">
          (Shows quicker improvement with practice)
        </span>
      </h2>

      <div className="space-y-4">
        <button
          onClick={() => handleTaskChoice2("A")}
          className={`w-full py-4 px-6 rounded-lg border-2 transition-all text-lg ${
            taskChoice === "A"
              ? "bg-green-500 text-white border-green-500"
              : "bg-white text-gray-700 border-gray-300 hover:border-green-400"
          }`}
        >
          Task A - List Manipulation
        </button>
        <button
          onClick={() => handleTaskChoice2("B")}
          className={`w-full py-4 px-6 rounded-lg border-2 transition-all text-lg ${
            taskChoice === "B"
              ? "bg-purple-500 text-white border-purple-500"
              : "bg-white text-gray-700 border-gray-300 hover:border-purple-400"
          }`}
        >
          Task B - Algorithm Design
        </button>
      </div>

      {showTaskResult2 && (
        <div className="space-y-6 mt-8">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
            <p className="text-lg text-gray-700">
              Correct! <strong>Task A (List Manipulation)</strong> typically has
              a much faster learning rate. Can you think of why this might be?
            </p>
          </div>

          <button
            onClick={() => scroll(17)}
            className="underline text-blue-600 hover:text-blue-800 font-semibold text-lg"
          >
            Tell me why!
          </button>
        </div>
      )}
    </div>
  );
};
