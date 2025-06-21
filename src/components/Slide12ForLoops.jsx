import { useState } from "react";

export const Slide12ForLoops = ({ scroll }) => {
  const [task2Answer, setTask2Answer] = useState("");
  const [showTask2Solution, setShowTask2Solution] = useState(false);

const checkTask2Answer = () => {
    const hasLoop =
      task2Answer.includes("for") &&
      task2Answer.includes("in") &&
      task2Answer.includes("range");
    const hasSum = task2Answer.includes("sum") || task2Answer.includes("+");
    if (hasLoop && hasSum) {
      setShowTask2Solution(true);
    } else {
      alert(
        "Make sure you use a for loop with range() and calculate the sum of numbers. total = 0\nfor i in range(1,11):\n    total += i \nprint(total)"
      );
    }
  };

  return (
    <div className="max-w-3xl w-full space-y-8">
      <div className="text-center">
        <div className="w-16 h-16 bg-orange-100 border-2 border-orange-400 rounded-full flex items-center justify-center text-orange-600 font-bold text-xl mb-4 mx-auto">
          2
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Task 2: For Loop
        </h2>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Instructions:
        </h3>
        <p className="text-gray-700 mb-4">Write a Python program that:</p>
        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
          <li>Uses a for loop to iterate through numbers from 1 to 10</li>
          <li>Calculates the sum of all these numbers</li>
          <li>Prints the final sum</li>
        </ul>

        <div className="bg-blue-50 p-4 rounded-md mb-4">
          <p className="text-sm text-blue-800">
            <strong>Hint:</strong> You'll need to use{" "}
            <code className="bg-blue-100 px-1 rounded">range(1, 11)</code> and
            keep track of a running total.
          </p>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Your Python code:
          </label>
          <textarea
            value={task2Answer}
            onChange={(e) => setTask2Answer(e.target.value)}
            className="w-full h-40 p-3 border border-gray-300 rounded-md font-mono text-sm"
            placeholder="# Write your Python code here..."
          />
          <button
            onClick={checkTask2Answer}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Check Answer
          </button>
        </div>

        {showTask2Solution && (
          <div className="mt-6 bg-orange-50 border-l-4 border-orange-400 p-4">
            <h4 className="font-semibold text-orange-800 mb-2">
              ✓ Correct! Solution:
            </h4>
            <pre className="bg-gray-100 p-3 rounded text-sm font-mono">
              {`total = 0
                                      for number in range(1, 11):
                                          total += number
                                      print(total)
    
                                      # Output: 55`}
            </pre>
            <button
              onClick={() => scroll(13)}
              className="mt-4 px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              Compare Tasks
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
