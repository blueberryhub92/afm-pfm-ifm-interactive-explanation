import { useState } from "react";

export const Slide11VariableDeclaration = ({ scroll }) => {
  const [task1Answer, setTask1Answer] = useState("");
  const [showTask1Solution, setShowTask1Solution] = useState(false);

  const checkTask1Answer = () => {
    const correct =
      task1Answer.trim().toLowerCase().includes('name = "alice"') &&
      task1Answer.trim().toLowerCase().includes("age = 25") &&
      task1Answer.trim().toLowerCase().includes('city = "new york"');
    if (correct) {
      setShowTask1Solution(true);
    } else {
      alert(
        'Not quite right. Make sure you assign the exact values: name = "Alice", age = 25, city = "New York"'
      );
    }
  };

  return (
    <div className="max-w-3xl w-full space-y-8">
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 border-2 border-green-400 rounded-full flex items-center justify-center text-green-600 font-bold text-xl mb-4 mx-auto">
          1
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Task 1: Variable Declaration</h2>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Instructions:</h3>
        <p className="text-gray-700 mb-4">
          Create three variables with the following information:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
          <li>A variable called <code className="bg-gray-100 px-2 py-1 rounded">name</code> with the value "Alice"</li>
          <li>A variable called <code className="bg-gray-100 px-2 py-1 rounded">age</code> with the value 25</li>
          <li>A variable called <code className="bg-gray-100 px-2 py-1 rounded">city</code> with the value "New York"</li>
        </ul>
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Your Python code:</label>
          <textarea
            value={task1Answer}
            onChange={(e) => setTask1Answer(e.target.value)}
            className="w-full h-32 p-3 border border-gray-300 rounded-md font-mono text-sm"
            placeholder="# Write your Python code here..."
          />
          <button
            onClick={checkTask1Answer}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Check Answer
          </button>
        </div>
        {showTask1Solution && (
          <div className="mt-6 bg-green-50 border-l-4 border-green-400 p-4">
            <h4 className="font-semibold text-green-800 mb-2">✓ Correct! Solution:</h4>
            <pre className="bg-gray-100 p-3 rounded text-sm font-mono">
{`name = "Alice"
age = 25
city = "New York"`}
            </pre>
            <button
              onClick={() => scroll(12)}
              className="mt-4 px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              Continue to Task 2
            </button>
          </div>
        )}
      </div>
    </div>
  );
};