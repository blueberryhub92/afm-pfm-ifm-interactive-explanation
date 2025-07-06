import React, { useState } from 'react';
import { 
  Code, 
  Play, 
  Target, 
  FileText, 
  RotateCcw, 
  CheckCircle, 
  AlertCircle,
  Lightbulb,
  Calculator,
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
      description: "Create three variables with the following information:",
      color: 'green',
      icon: FileText,
      requirements: [
        { label: 'Variable 1', code: 'name = "Alice"', color: 'green' },
        { label: 'Variable 2', code: 'age = 25', color: 'orange' },
        { label: 'Variable 3', code: 'city = "New York"', color: 'purple' }
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
      description: "Write a Python program that accomplishes the following:",
      color: 'orange',
      icon: RotateCcw,
      requirements: [
        { label: 'Use a for loop', code: 'for i in range(1, 11):', color: 'blue' },
        { label: 'Calculate sum', code: 'total += i', color: 'green' },
        { label: 'Print result', code: 'print(total)', color: 'purple' }
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

        // Check for for loop with range
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

  const getColorClasses = (color) => {
    const colors = {
      green: {
        bg: 'bg-green-50',
        border: 'border-green-600',
        text: 'text-green-700',
        accent: 'bg-green-100',
        button: 'bg-green-600 hover:bg-green-700',
        tag: 'bg-green-600'
      },
      orange: {
        bg: 'bg-orange-50',
        border: 'border-orange-600',
        text: 'text-orange-700',
        accent: 'bg-orange-100',
        button: 'bg-orange-600 hover:bg-orange-700',
        tag: 'bg-orange-600'
      }
    };
    return colors[color];
  };

  // Task Detail View
  if (selectedTask) {
    const task = tasks[selectedTask];
    const colors = getColorClasses(task.color);
    const IconComponent = task.icon;

    return (
      <div className="bg-white min-h-screen flex flex-col items-center py-8 px-4 text-black font-['IBM_Plex_Mono',monospace]">
        <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">

          {/* Header */}
          <div className="border-4 border-black rounded-xl p-6 bg-white shadow-lg relative">
            <div className={`absolute -top-6 left-4 px-3 py-1 ${colors.tag} text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2`}>
              <Target className="w-4 h-4" />
              TASK {selectedTask} OF 2
            </div>
            <div className="text-2xl md:text-3xl font-bold tracking-tight text-black text-center">
              {task.title}
            </div>
          </div>

          {/* Instructions */}
          <div className={`border-4 ${colors.border} rounded-xl p-6 ${colors.bg}`}>
            <div className="flex items-center gap-2 mb-4">
              <IconComponent className="w-6 h-6 text-blue-700" />
              <h3 className="text-xl font-bold text-black tracking-tight">
                Mission Instructions
              </h3>
            </div>
            
            <p className="text-black font-semibold mb-4">
              {task.description}
            </p>
            
            <div className="space-y-3">
              {task.requirements.map((req, index) => (
                <div key={index} className="bg-white border-2 border-black rounded-lg p-4 flex items-center gap-3">
                  <div className={`w-8 h-8 bg-${req.color}-500 border-2 border-black rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className={`font-bold text-${req.color}-700`}>{req.label}</div>
                    {selectedTask === 2 && index === 0 && (
                      <div className="text-sm text-blue-600">Iterate through numbers from 1 to 10</div>
                    )}
                    {selectedTask === 2 && index === 1 && (
                      <div className="text-sm text-green-600">Add all numbers together</div>
                    )}
                    {selectedTask === 2 && index === 2 && (
                      <div className="text-sm text-purple-600">Display the final sum</div>
                    )}
                  </div>
                  <code className={`bg-black text-${req.color}-400 px-2 py-1 rounded font-mono text-xs`}>
                    {req.code}
                  </code>
                </div>
              ))}
            </div>
          </div>

          {/* Code Input */}
          <div className="border-4 border-black rounded-xl p-6 bg-white shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <Code className="w-5 h-5 text-black" />
              <label className="font-bold text-lg text-black">
                Your Python Code:
              </label>
            </div>
            
            <div className="border-4 border-black rounded-xl overflow-hidden mb-4">
              <div className="bg-black text-white px-4 py-2 flex items-center gap-2 font-bold text-sm">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="ml-2">task_{selectedTask}.py</span>
              </div>
              <div style={{ backgroundColor: '#000000' }}>
                <textarea
                  value={taskAnswer}
                  onChange={(e) => setTaskAnswer(e.target.value)}
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
              onClick={handleCheckAnswer}
              className={`w-full px-8 py-4 ${colors.button} text-white border-4 border-black rounded-xl font-bold text-xl uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300 shadow-lg hover:shadow-2xl flex items-center justify-center gap-3`}
            >
              <Play className="w-6 h-6" />
              RUN & CHECK CODE
            </button>
          </div>

          {/* Error Message */}
          {showError && (
            <div className="border-4 border-red-700 rounded-xl p-6 bg-red-50 shadow-lg animate-pulse">
              <div className="flex items-center gap-3 mb-3">
                <AlertCircle className="w-6 h-6 text-red-700" />
                <h4 className="font-bold text-red-800 text-lg">
                  ✗ Code Error Detected!
                </h4>
              </div>
              <div className="bg-red-100 border-2 border-red-700 rounded-lg p-4 font-mono text-sm">
                <div className="font-bold mb-2 text-red-900">ERROR:</div>
                <div className="text-red-800 mb-4 p-2 bg-red-50 rounded">
                  {errorMessage}
                </div>
              </div>
            </div>
          )}

          {/* Success Message */}
          {showSolution && (
            <div className={`border-4 ${colors.border} rounded-xl p-6 ${colors.bg} shadow-lg`}>
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className={`w-8 h-8 ${colors.text}`} />
                <h4 className={`font-bold text-2xl ${colors.text}`}>
                  ✓ {selectedTask === 1 ? 'PERFECT! Task Complete' : 'EXCELLENT! Loop Mastery Achieved'}
                </h4>
              </div>
              
              <div className={`bg-white border-2 ${colors.border} rounded-lg p-4 mb-6`}>
                <div className={`font-bold ${colors.text} mb-3 flex items-center gap-2`}>
                  {selectedTask === 1 ? <Lightbulb className="w-5 h-5" /> : <Calculator className="w-5 h-5" />}
                  {selectedTask === 1 ? 'Correct Solution:' : 'Perfect Solution:'}
                </div>
                <div className={`bg-black text-${task.color}-400 p-4 rounded-lg font-mono text-sm border-2 ${colors.border}`}>
                  <pre>{task.solution}</pre>
                </div>
                {selectedTask === 2 && (
                  <div className={`mt-3 p-3 ${colors.accent} border-2 ${colors.border} rounded-lg`}>
                    <div className={`font-bold ${colors.text} mb-1`}>How it works:</div>
                    <div className="text-sm text-orange-700 font-mono">
                      1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10 = <span className="font-bold text-orange-900">55</span>
                    </div>
                  </div>
                )}
              </div>
              
             
            </div>
          )}

          {/* Action Buttons at Bottom */}
          <div className="border-4 border-gray-300 rounded-xl p-6 bg-gray-50 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ArrowRight className="w-6 h-6 text-gray-600" />
                <div>
                  <div className="font-bold text-gray-800">Want to skip this task?</div>
                  <div className="text-sm text-gray-600">You can always come back to it later</div>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={resetTask}
                  className="px-6 py-2 bg-gray-600 text-white border-2 border-black rounded-lg font-bold text-sm uppercase tracking-wide hover:bg-white hover:text-gray-600 transition-all"
                >
                  ← Back to Tasks
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Task Selection View
  return (
    <div className="bg-white min-h-screen flex flex-col items-center py-8 px-4 md:px-10 text-black font-['IBM_Plex_Mono',monospace]">
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">
        
        {/* Main Header */}
        <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative">
          <div className="absolute -top-6 left-4 px-3 py-1 bg-black text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
            <Code className="w-4 h-4" />
            PYTHON CHALLENGE
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-black text-center tracking-tight mb-2">
            Try the following two Python tasks:
          </h1>
          <p className="text-center text-gray-600 font-mono text-sm">
            These tasks are optional - you can skip them and continue to the next section anytime
          </p>
        </div>

        {/* Task Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Task 1 */}
          <div 
            className="border-4 border-black rounded-xl p-6 bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            onClick={() => handleTaskClick(1)}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-green-500 border-4 border-black rounded-full flex items-center justify-center text-white font-bold text-3xl mb-4 shadow-lg relative">
                1
                {completedTasks.includes(1) && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-600 border-2 border-white rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-6 h-6 text-green-700" />
                <h3 className="text-xl font-bold text-black tracking-tight">
                  Variable Declaration Task
                </h3>
              </div>
              <div className="bg-green-50 border-2 border-green-700 rounded-lg p-4 font-mono text-sm text-green-900 w-full">
                <div className="font-bold mb-2">TASK OVERVIEW:</div>
                <div>• Declare variables</div>
                <div>• Assign values</div>
                <div>• Basic data types</div>
              </div>
            </div>
          </div>

          {/* Task 2 */}
          <div 
            className="border-4 border-black rounded-xl p-6 bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            onClick={() => handleTaskClick(2)}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-orange-500 border-4 border-black rounded-full flex items-center justify-center text-white font-bold text-3xl mb-4 shadow-lg relative">
                2
                {completedTasks.includes(2) && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-600 border-2 border-white rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-6 h-6 text-orange-700" />
                <h3 className="text-xl font-bold text-black tracking-tight">
                  For Loop Task
                </h3>
              </div>
              <div className="bg-orange-50 border-2 border-orange-700 rounded-lg p-4 font-mono text-sm text-orange-900 w-full">
                <div className="font-bold mb-2">TASK OVERVIEW:</div>
                <div>• Iterate through data</div>
                <div>• Control flow logic</div>
                <div>• Loop operations</div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg text-center">
          <div className="mb-4">
            <div className="text-lg font-semibold text-neutral-600 mb-2">
              {completedTasks.length === 0 && "Ready to begin your Python journey?"}
              {completedTasks.length === 1 && "Great progress! One more task to go."}
              {completedTasks.length === 2 && "Excellent! All tasks completed!"}
            </div>
            <div className="text-sm text-neutral-500 font-mono">
              {completedTasks.length === 0 && "Click on any task above to start coding, or skip to continue"}
              {completedTasks.length === 1 && "Click on the remaining task to continue, or skip ahead"}
              {completedTasks.length === 2 && "You've mastered both Python concepts!"}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-4 mb-4 border-2 border-black">
            <div 
              className="bg-gradient-to-r from-green-500 to-orange-500 h-full rounded-full transition-all duration-500 border-r-2 border-black"
              style={{ width: `${(completedTasks.length / 2) * 100}%` }}
            ></div>
          </div>
          
          <div className="text-sm font-mono text-gray-600 mb-4">
            Progress: {completedTasks.length}/2 tasks completed
          </div>
          
          {/* Always show continue button */}
          <div className="flex justify-center gap-4">
            <button
              onClick={() => scroll(10)}
              className="px-8 py-3 bg-purple-600 text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-purple-600 hover:border-purple-600 transition-all transform hover:scale-105 flex items-center gap-3"
            >
              <span>Continue to Next Section</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          
          {completedTasks.length < 2 && (
            <div className="mt-4 text-xs text-gray-500 font-mono">
              Tasks are optional - you can always come back to complete them later
            </div>
          )}
        </div>
      </div>
    </div>
  );
};