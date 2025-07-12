import React, { useState } from 'react';
import {
  Code,
  Play,
  Target,
  FileText,
  RotateCcw,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";

// Mock hook for demonstration - replace with your actual hook
const useProbability = () => ({
  updateProbability: (prob) => console.log(`Probability updated to: ${prob}`)
});

export const Slide10TwoPythonTasks = ({ scroll = (n) => console.log(`Scroll to: ${n}`) }) => {
  const { updateProbability } = useProbability();

  const [selectedTask, setSelectedTask] = useState(null);
  const [taskAnswer, setTaskAnswer] = useState("");
  const [showSolution, setShowSolution] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [completedTasks, setCompletedTasks] = useState([]);

  const tasks = {
    1: {
      title: "Variable Declaration Task",
      description: "Create three variables to store personal information:",
      color: 'green',
      icon: FileText,
      requirements: [
        'Create a variable called "name" and store the string "Alice"',
        'Create a variable called "age" and store the number 25',
        'Create a variable called "city" and store the string "New York"'
      ],
      solution: `name = "Alice"
age = 25
city = "New York"`,
      checkFunction: (answer) => {
        const normalizedInput = answer.trim().toLowerCase();
        const lines = normalizedInput.split('\n')
          .map(line => line.trim())
          .filter(line => line.length > 0);

        if (lines.length !== 3) {
          return { valid: false, error: "Please provide exactly 3 lines of code" };
        }

        const expectedLines = [
          'name = "alice"',
          'age = 25',
          'city = "new york"'
        ];

        const isCorrect = lines.every((line, index) => {
          const cleanLine = line.replace(/\s*=\s*/, ' = ');
          return cleanLine === expectedLines[index];
        });

        if (!isCorrect) {
          return { valid: false, error: "Make sure you assign the exact values as shown in the requirements" };
        }

        return { valid: true };
      }
    },
    2: {
      title: "For Loop Task",
      description: "Calculate the sum of numbers from 1 to 10 using a for loop:",
      color: 'orange',
      icon: RotateCcw,
      requirements: [
        'Initialize a variable to store the running total (start with 0)',
        'Create a for loop that iterates through numbers 1 to 10',
        'Add each number to your running total inside the loop',
        'Print the final sum (the result should be 55)'
      ],
      solution: `total = 0
for number in range(1, 11):
    total += number
print(total)
# Output: 55`,
      checkFunction: (answer) => {
        const code = answer.toLowerCase();

        if (!code.trim()) {
          return { valid: false, error: "Please enter some code first!" };
        }

        const hasForLoop = code.includes('for') &&
          code.includes('in') &&
          code.includes('range') &&
          (code.includes('range(1,11)') ||
            code.includes('range(1, 11)') ||
            code.includes('range( 1, 11 )') ||
            code.includes('range( 1,11 )'));

        const hasSum = code.includes('+=') ||
          code.includes('total') ||
          code.includes('sum');

        const hasPrint = code.includes('print');

        const hasInit = code.includes('total = 0') ||
          code.includes('sum = 0') ||
          /\w+\s*=\s*0/.test(code);

        if (!hasForLoop) {
          return { valid: false, error: "Missing: for loop with range(1, 11)" };
        }

        if (!hasInit) {
          return { valid: false, error: "Missing: Initialize a variable to 0 (e.g., total = 0)" };
        }

        if (!hasSum) {
          return { valid: false, error: "Missing: Add numbers together (use += or similar)" };
        }

        if (!hasPrint) {
          return { valid: false, error: "Missing: print() statement to display the result" };
        }

        return { valid: true };
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.target;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      const newValue = taskAnswer.substring(0, start) + '    ' + taskAnswer.substring(end);
      setTaskAnswer(newValue);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    }
  };

  const handleTaskClick = (taskId) => {
    updateProbability(0.30);
    setSelectedTask(taskId);
    setTaskAnswer("");
    setShowSolution(false);
    setShowError(false);
    setErrorMessage("");
  };

  const handleCheckAnswer = () => {
    const task = tasks[selectedTask];
    const result = task.checkFunction(taskAnswer);

    if (result.valid) {
      setShowSolution(true);
      setShowError(false);
      if (!completedTasks.includes(selectedTask)) {
        setCompletedTasks([...completedTasks, selectedTask]);
      }
    } else {
      setErrorMessage(result.error);
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
    }
  };

  const resetTask = () => {
    setSelectedTask(null);
    setTaskAnswer("");
    setShowSolution(false);
    setShowError(false);
    setErrorMessage("");
  };

  // Color classes matching AFMLimitations style
  const colorClasses = {
    green: "bg-green-100 border-green-600 text-green-700",
    orange: "bg-orange-100 border-orange-600 text-orange-700",
  };

  // Task Detail View
  if (selectedTask) {
    const task = tasks[selectedTask];
    const IconComponent = task.icon;

    return (
      <div className="bg-white min-h-screen flex flex-col text-black font-['IBM_Plex_Mono',monospace] py-8 px-4 md:px-10">
        <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">

          {/* Header */}
          <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative">
            <div className={`absolute -top-6 left-4 px-3 py-1 font-semibold rounded-md text-xs tracking-wider flex items-center gap-2 border-4 border-black ${colorClasses[task.color]}`}>
              <Target className="w-4 h-4" />
              TASK {selectedTask} OF 2
            </div>
            <div className="text-2xl md:text-3xl font-bold tracking-tight text-black text-center">
              {task.title}
            </div>
          </div>

          {/* Task Description */}
          <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg">
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center gap-2 mb-4">
                <IconComponent className="w-6 h-6 text-black" />
                <h3 className="text-xl font-bold text-black uppercase tracking-tight">
                  Instructions
                </h3>
              </div>

              <p className="text-black font-bold text-lg mb-6">
                {task.description}
              </p>

              <div className="text-left space-y-3">
                {task.requirements.map((req, index) => (
                  <div key={index} className="border-4 border-black rounded-xl p-4 bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-black text-white border-2 border-black rounded-full flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </div>
                      <div className="text-black font-bold">{req}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Code Input */}
          <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <Code className="w-5 h-5 text-black" />
              <label className="font-bold text-lg text-black uppercase tracking-wide">
                Your Python Code:
              </label>
            </div>

            <div className="border-4 border-black rounded-xl overflow-hidden mb-6">
              <div className="bg-black text-white px-4 py-2 font-bold text-sm">
                task_{selectedTask}.py
              </div>
              <textarea
                value={taskAnswer}
                onChange={(e) => setTaskAnswer(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full h-40 p-4 bg-black text-white font-mono text-sm border-none resize-none focus:outline-none"
                placeholder="# Write your Python code here..."
              />
            </div>

            <button
              onClick={handleCheckAnswer}
              className="w-full px-8 py-4 bg-purple-600 text-white border-4 border-black rounded-xl font-bold text-xl uppercase tracking-wide hover:bg-white hover:text-purple-600 transition-all transform hover:scale-105 flex items-center justify-center gap-3"
            >
              <Play className="w-6 h-6" />
              RUN CODE
            </button>
          </div>

          {/* Error Message */}
          {showError && (
            <div className="border-4 border-red-600 rounded-xl p-8 bg-red-100 shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <AlertTriangle className="w-6 h-6 text-red-700" />
                <h4 className="font-bold text-red-700 text-lg uppercase tracking-wide">
                  Error
                </h4>
              </div>
              <p className="text-red-700 font-bold">
                {errorMessage}
              </p>
            </div>
          )}

          {/* Success Message */}
          {showSolution && (
            <div className={`border-4 border-black rounded-xl p-8 bg-white shadow-lg`}>
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <h4 className="font-bold text-green-700 text-xl uppercase tracking-wide">
                  Task Complete!
                </h4>
              </div>

              <div className="border-4 border-green-600 rounded-xl p-6 bg-green-100 mb-6">
                <div className="font-bold text-green-700 mb-3 uppercase tracking-wide">
                  Solution:
                </div>
                <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm">
                  <pre>{task.solution}</pre>
                </div>
              </div>
            </div>
          )}

          {/* Back Button */}
          <div className="flex justify-center">
            <button
              onClick={resetTask}
              className="px-8 py-4 bg-black text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-black transition-all transform hover:scale-105"
            >
              ← Back to Tasks
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main Task Selection View
  return (
    <div className="bg-white min-h-screen flex flex-col text-black font-['IBM_Plex_Mono',monospace] py-8 px-4 md:px-10">
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-8">

        {/* Header */}
        <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative">
          <div className="absolute -top-6 left-4 px-3 py-1 bg-black text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
            <Code className="w-4 h-4" />
            PYTHON TASKS
          </div>
          <div className="text-2xl md:text-3xl font-bold tracking-tight text-black text-center">
            Which task is more difficult?
          </div>
          <p className="text-lg text-black text-center mt-4 font-bold">
            These tasks are optional - you can skip them and continue to the next section anytime.
          </p>
          <p className="text-md text-black text-center mt-2 font-bold">
            The difference between the tasks is the task difficulty.
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="border-4 border-black rounded-xl p-4 bg-yellow-400 text-center">
          <span className="text-black font-bold text-xl uppercase tracking-wide">
            {completedTasks.length} / 2 TASKS COMPLETE
          </span>
        </div>

        {/* Task Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {Object.entries(tasks).map(([taskId, task]) => {
            const isCompleted = completedTasks.includes(parseInt(taskId));
            const IconComponent = task.icon;

            return (
              <div
                key={taskId}
                className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl hover:-translate-y-2"
                onClick={() => handleTaskClick(parseInt(taskId))}
              >
                <div
                  className={`absolute -top-6 left-4 px-3 py-1 font-semibold rounded-md text-xs tracking-wider flex items-center gap-2 border-4 border-black ${colorClasses[task.color]}`}
                >
                  <IconComponent className="w-4 h-4" />
                  TASK
                </div>

                <div className="text-center space-y-6">
                  <div className="flex items-center justify-center space-x-4">
                    <h3 className="text-2xl font-bold text-black uppercase tracking-tight">
                      {task.title}
                    </h3>
                    {isCompleted && (
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    )}
                  </div>

                  {/* Task Description */}
                  <div className="text-left space-y-4">
                    <p className="text-black font-bold text-md">
                      {task.description}
                    </p>

                    <div className="border-4 border-black rounded-xl p-4 bg-gray-50">
                      <div className="text-black font-bold text-sm uppercase tracking-wide mb-2">
                        What you'll practice:
                      </div>
                      <div className="space-y-1">
                        {task.requirements.map((req, index) => (
                          <div key={index} className="text-black font-bold text-sm">
                            • {req}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center mt-12">
        <button
          className="px-12 py-4 bg-green-600 text-white border-4 border-black rounded-xl font-bold text-xl uppercase tracking-wide hover:bg-white hover:text-green-600 hover:border-green-600 transition-all transform hover:scale-105 flex items-center gap-3"
          onClick={() => scroll(9)}
        >
          <span>Continue to Next Section</span>
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};