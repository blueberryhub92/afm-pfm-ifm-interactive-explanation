import React, { useState } from "react";
import {
  FileText,
  CheckCircle,
  Code,
  Play,
  ArrowRight,
  AlertCircle,
  Target,
  Lightbulb
} from "lucide-react";

export const Slide11VariableDeclaration = ({ scroll }) => {
  const [task1Answer, setTask1Answer] = useState("");
  const [showTask1Solution, setShowTask1Solution] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.target;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      // Insert 4 spaces at cursor position
      const newValue = task1Answer.substring(0, start) + '    ' + task1Answer.substring(end);
      setTask1Answer(newValue);

      // Move cursor to after the inserted spaces
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    }
  };

  const checkTask1Answer = () => {
    // Remove all whitespace and normalize the input
    const normalizedInput = task1Answer.trim().toLowerCase();

    // Split by lines and clean each line
    const lines = normalizedInput.split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0); // Remove empty lines

    // Check if we have exactly 3 lines
    if (lines.length !== 3) {
      setShowError(true);
      setTimeout(() => setShowError(false), 4000);
      return;
    }

    // Check each line for exact match (allowing for minor spacing variations)
    const expectedLines = [
      'name = "alice"',
      'age = 25',
      'city = "new york"'
    ];

    const isCorrect = lines.every((line, index) => {
      // Remove extra spaces around the equals sign
      const cleanLine = line.replace(/\s*=\s*/, ' = ');
      return cleanLine === expectedLines[index];
    });

    if (isCorrect) {
      setShowTask1Solution(true);
      setShowError(false);
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 4000);
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center py-8 px-4 text-black font-['IBM_Plex_Mono',monospace]">
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">

        {/* Instructions Section */}
        <div className="border-4 border-black rounded-xl p-6 bg-white shadow-lg relative">
          <div className="absolute -top-6 left-4 px-3 py-1 bg-green-600 text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
            <Target className="w-4 h-4" />
            TASK 1 OF 2
          </div>

          <div className="bg-blue-50 border-2 border-blue-700 rounded-lg p-4 mb-6">
            <p className="text-blue-900 font-semibold mb-4">
              Create three variables with the following information:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white border-2 border-black rounded-lg p-3">
                <div className="font-bold text-green-700 mb-1">Variable 1:</div>
                <code className="bg-black text-green-400 px-2 py-1 rounded font-mono text-sm">
                  name = "Alice"
                </code>
              </div>
              <div className="bg-white border-2 border-black rounded-lg p-3">
                <div className="font-bold text-orange-700 mb-1">Variable 2:</div>
                <code className="bg-black text-orange-400 px-2 py-1 rounded font-mono text-sm">
                  age = 25
                </code>
              </div>
              <div className="bg-white border-2 border-black rounded-lg p-3">
                <div className="font-bold text-purple-700 mb-1">Variable 3:</div>
                <code className="bg-black text-purple-400 px-2 py-1 rounded font-mono text-sm">
                  city = "New York"
                </code>
              </div>
            </div>
          </div>

          {/* Code Input Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Code className="w-5 h-5 text-black" />
              <label className="font-bold text-lg text-black">
                Your Python Code:
              </label>
            </div>

            <div className="border-4 border-black rounded-xl overflow-hidden">
              <div className="bg-black text-white px-4 py-2 flex items-center gap-2 font-bold text-sm">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="ml-2">python_task.py</span>
              </div>
              <div style={{ backgroundColor: '#000000' }}>
                <textarea
                  value={task1Answer}
                  onChange={(e) => setTask1Answer(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full h-40 p-4 text-white font-mono text-sm border-none resize-none focus:outline-none"
                  style={{
                    backgroundColor: '#000000',
                    background: '#000000'
                  }}
                  placeholder="# Write your Python code here..."
                />
              </div>
            </div>

            <button
              onClick={checkTask1Answer}
              className="w-full px-8 py-4 bg-green-600 text-white border-4 border-black rounded-xl font-bold text-xl uppercase tracking-wider hover:bg-white hover:text-green-700 hover:border-green-800 transition-all duration-300 shadow-lg hover:shadow-2xl flex items-center justify-center gap-3"
            >
              <Play className="w-6 h-6" />
              RUN & CHECK CODE
            </button>
          </div>
        </div>

        {/* Error Message */}
        {showError && (
          <div className="border-4 border-red-700 rounded-xl p-6 bg-red-50 shadow-lg animate-pulse">
            <div className="flex items-center gap-3 mb-3">
              <AlertCircle className="w-6 h-6 text-red-700" />
              <h4 className="font-bold text-red-800 text-lg">
                ✗ Not Quite Right!
              </h4>
            </div>
            <div className="bg-red-100 border-2 border-red-700 rounded-lg p-4 font-mono text-sm text-red-900">
              <div className="font-bold mb-2">ERROR DETAILS:</div>
              <div>Make sure you assign the exact values:</div>
              <div className="mt-2 space-y-1">
                <div>• name = "Alice"</div>
                <div>• age = 25</div>
                <div>• city = "New York"</div>
              </div>
            </div>
          </div>
        )}

        {/* Success Message */}
        {showTask1Solution && (
          <div className="border-4 border-green-700 rounded-xl p-6 bg-green-50 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-8 h-8 text-green-700" />
              <h4 className="font-bold text-green-800 text-2xl">
                ✓ PERFECT! Task Complete
              </h4>
            </div>

            <div className="bg-white border-2 border-green-700 rounded-lg p-4 mb-6">
              <div className="font-bold text-green-800 mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                Correct Solution:
              </div>
              <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm border-2 border-green-700">
                <pre>{`name = "Alice"
age = 25
city = "New York"`}</pre>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-green-100 border-2 border-green-700 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-green-500 border-2 border-black rounded-full"></div>
                <span className="font-mono text-sm text-green-800">Task 1: Complete</span>
              </div>
              <button
                onClick={() => scroll(13)}
                className="px-8 py-3 bg-black text-white border-4 border-black rounded-xl font-bold uppercase tracking-wider hover:bg-green-600 hover:border-green-800 transition-all duration-300 shadow-lg flex items-center gap-3"
              >
                Continue to Task
                <div className="w-6 h-6 bg-orange-500 border-2 border-white rounded-full flex items-center justify-center text-white font-bold text-sm">
                  2
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};