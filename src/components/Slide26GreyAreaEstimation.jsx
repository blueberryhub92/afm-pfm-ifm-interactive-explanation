import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, XCircle, TrendingUp, Calculator, ArrowRight, BarChart3, Brain, Target, HelpCircle, Lightbulb, RotateCcw, Play, Eye, EyeOff } from 'lucide-react';

export const Slide26GreyAreaEstimation = () => {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [userGuess, setUserGuess] = useState(null);
  const [showActual, setShowActual] = useState(false);
  const [results, setResults] = useState([]);
  const [dragPosition, setDragPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);
  
  const barRef = useRef(null);

  // Simulated user profile based on learning history
  const userProfile = {
    overallProficiency: 0.45, // θᵢ - student proficiency parameter
    practiceHistory: {
      'variables': 15,
      'strings': 8,
      'loops': 12,
      'functions': 5,
      'lists': 10,
      'dictionaries': 3,
      'conditionals': 18,
      'file_io': 2,
      'classes': 1,
      'error_handling': 4
    }
  };

  // Task database with realistic Python programming tasks
  const pythonTasks = [
    {
      id: 1,
      title: "Variable Assignment",
      description: "Create a variable 'age' and assign your age to it, then print it.",
      code: "age = 25\nprint(age)",
      difficulty: -0.8, // βₖ - Very easy
      knowledgeComponents: ['variables'],
      learningRate: 0.12 // γₖ
    },
    {
      id: 2,
      title: "String Concatenation",
      description: "Combine two strings 'Hello' and 'World' with a space between them.",
      code: "greeting = 'Hello' + ' ' + 'World'\nprint(greeting)",
      difficulty: -0.4,
      knowledgeComponents: ['strings', 'variables'],
      learningRate: 0.10
    },
    {
      id: 3,
      title: "Simple For Loop",
      description: "Write a for loop that prints numbers from 1 to 5.",
      code: "for i in range(1, 6):\n    print(i)",
      difficulty: 0.1,
      knowledgeComponents: ['loops'],
      learningRate: 0.08
    },
    {
      id: 4,
      title: "List Comprehension",
      description: "Create a list of squares for numbers 1 to 10 using list comprehension.",
      code: "squares = [x**2 for x in range(1, 11)]",
      difficulty: 0.6,
      knowledgeComponents: ['lists', 'loops'],
      learningRate: 0.06
    },
    {
      id: 5,
      title: "Function with Parameters",
      description: "Write a function that takes two numbers and returns their sum.",
      code: "def add_numbers(a, b):\n    return a + b",
      difficulty: 0.2,
      knowledgeComponents: ['functions'],
      learningRate: 0.09
    },
    {
      id: 6,
      title: "Dictionary Operations",
      description: "Create a dictionary of student grades and add a new student.",
      code: "grades = {'Alice': 85, 'Bob': 92}\ngrades['Charlie'] = 88",
      difficulty: 0.4,
      knowledgeComponents: ['dictionaries'],
      learningRate: 0.07
    },
    {
      id: 7,
      title: "Nested Conditionals",
      description: "Write nested if-else statements to categorize ages (child, teen, adult).",
      code: "if age < 13:\n    category = 'child'\nelif age < 20:\n    category = 'teen'\nelse:\n    category = 'adult'",
      difficulty: 0.3,
      knowledgeComponents: ['conditionals'],
      learningRate: 0.08
    },
    {
      id: 8,
      title: "File Reading",
      description: "Open and read the contents of a text file safely.",
      code: "with open('file.txt', 'r') as f:\n    content = f.read()",
      difficulty: 0.8,
      knowledgeComponents: ['file_io'],
      learningRate: 0.05
    },
    {
      id: 9,
      title: "Class Definition",
      description: "Define a simple class 'Person' with name and age attributes.",
      code: "class Person:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age",
      difficulty: 1.2,
      knowledgeComponents: ['classes'],
      learningRate: 0.04
    },
    {
      id: 10,
      title: "Exception Handling",
      description: "Use try-except to handle division by zero error.",
      code: "try:\n    result = 10 / 0\nexcept ZeroDivisionError:\n    print('Cannot divide by zero')",
      difficulty: 0.9,
      knowledgeComponents: ['error_handling'],
      learningRate: 0.05
    },
    {
      id: 11,
      title: "String Slicing",
      description: "Extract the first 3 characters from a string variable.",
      code: "text = 'Python'\nfirst_three = text[:3]",
      difficulty: 0.0,
      knowledgeComponents: ['strings'],
      learningRate: 0.10
    },
    {
      id: 12,
      title: "While Loop with Condition",
      description: "Use a while loop to count down from 5 to 1.",
      code: "count = 5\nwhile count > 0:\n    print(count)\n    count -= 1",
      difficulty: 0.25,
      knowledgeComponents: ['loops'],
      learningRate: 0.08
    }
  ];

  // Calculate AFM prediction for a given task
  const calculateAFMPrediction = (task) => {
    const theta = userProfile.overallProficiency;
    
    // Calculate average difficulty and practice for this task's knowledge components
    let totalDifficulty = 0;
    let totalPractice = 0;
    let totalLearningRate = 0;
    
    task.knowledgeComponents.forEach(kc => {
      totalDifficulty += task.difficulty;
      totalPractice += userProfile.practiceHistory[kc] || 0;
      totalLearningRate += task.learningRate;
    });
    
    const avgDifficulty = totalDifficulty / task.knowledgeComponents.length;
    const avgPractice = totalPractice / task.knowledgeComponents.length;
    const avgLearningRate = totalLearningRate / task.knowledgeComponents.length;
    
    // AFM formula: log(p/(1-p)) = θᵢ + βₖ + γₖ * Tᵢₖ
    const logOdds = theta + avgDifficulty + (avgLearningRate * avgPractice);
    const probability = Math.exp(logOdds) / (1 + Math.exp(logOdds));
    
    // Clamp between 5% and 95% for realistic bounds
    return Math.max(0.05, Math.min(0.95, probability));
  };

  // Grey Area boundaries (from the paper)
  const optimalThreshold = 0.5;
  const upperBoundary = optimalThreshold + ((1 - optimalThreshold) / 2); // 0.75
  const lowerBoundary = optimalThreshold - (optimalThreshold / 2); // 0.25

  const currentTask = pythonTasks[currentTaskIndex];
  const actualProbability = calculateAFMPrediction(currentTask);
  const actualPosition = actualProbability * 100;

  const getZone = (probability) => {
    if (probability >= lowerBoundary && probability <= upperBoundary) {
      return { name: 'Grey Area (ZPD)', color: 'yellow', bgColor: 'bg-yellow-100', borderColor: 'border-yellow-400' };
    } else if (probability > upperBoundary) {
      return { name: 'Above ZPD', color: 'green', bgColor: 'bg-green-100', borderColor: 'border-green-400' };
    } else {
      return { name: 'Below ZPD', color: 'red', bgColor: 'bg-red-100', borderColor: 'border-red-400' };
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    handleMouseMove(e);
  };

  const handleMouseMove = (e) => {
    if (!isDragging && e.type === 'mousemove') return;
    
    const rect = barRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setDragPosition(percentage);
    setUserGuess(percentage);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  const submitGuess = () => {
    if (userGuess === null) return;
    
    const difference = Math.abs(userGuess - actualPosition);
    const result = {
      taskId: currentTask.id,
      taskTitle: currentTask.title,
      userGuess,
      actualPosition,
      difference,
      userZone: getZone(userGuess / 100),
      actualZone: getZone(actualProbability)
    };
    
    setResults([...results, result]);
    setShowActual(true);
  };

  const nextTask = () => {
    setCurrentTaskIndex((currentTaskIndex + 1) % pythonTasks.length);
    setUserGuess(null);
    setShowActual(false);
    setDragPosition(50);
  };

  const resetSession = () => {
    setCurrentTaskIndex(0);
    setUserGuess(null);
    setShowActual(false);
    setResults([]);
    setDragPosition(50);
    setSessionStarted(false);
  };

  const calculateAccuracy = () => {
    if (results.length === 0) return 0;
    const totalError = results.reduce((sum, result) => sum + result.difference, 0);
    const averageError = totalError / results.length;
    return Math.max(0, 100 - averageError); // Convert to accuracy percentage
  };

  if (!sessionStarted) {
    return (
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Grey Area Estimation Research Task</h2>
          <p className="text-lg text-gray-600 mb-6">
            Help us understand how well people can intuitively identify their Zone of Proximal Development
          </p>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-400">
          <h3 className="font-semibold text-blue-800 mb-3">Instructions</h3>
          <div className="space-y-3 text-blue-700">
            <p>1. You'll see Python programming tasks of varying difficulty</p>
            <p>2. For each task, estimate your probability of success by dragging the slider</p>
            <p>3. We'll compare your guess with our AI model's prediction</p>
            <p>4. The goal is to see how well you can identify tasks in your optimal learning zone</p>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-3">About the Grey Area</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-red-100 p-3 rounded">
              <strong>Below ZPD (0-25%):</strong> Too difficult - you'd struggle even with help
            </div>
            <div className="bg-yellow-100 p-3 rounded">
              <strong>Grey Area (25-75%):</strong> Perfect challenge - optimal learning zone
            </div>
            <div className="bg-green-100 p-3 rounded">
              <strong>Above ZPD (75-100%):</strong> Too easy - you can do it independently
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => setSessionStarted(true)}
            className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg flex items-center mx-auto"
          >
            <Play size={20} className="mr-2" />
            Start Research Task
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl w-full space-y-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Task {currentTaskIndex + 1} of {pythonTasks.length}
        </h2>
        <div className="text-sm text-gray-600">
          Completed: {results.length} | Accuracy: {calculateAccuracy().toFixed(1)}%
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Task Display */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border-2 border-gray-200 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">{currentTask.title}</h3>
            <p className="text-gray-700 mb-4">{currentTask.description}</p>
            
            <div className="bg-gray-900 p-4 rounded-lg">
              <div className="text-sm text-gray-400 mb-2">Expected Solution:</div>
              <pre className="text-green-400 font-mono text-sm overflow-x-auto">
                <code>{currentTask.code}</code>
              </pre>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {currentTask.knowledgeComponents.map(kc => (
                <span key={kc} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                  {kc.replace('_', ' ')}
                </span>
              ))}
            </div>
          </div>

          {/* User Profile Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">Your Learning Profile</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <div>Overall Proficiency: {(userProfile.overallProficiency * 100).toFixed(0)}%</div>
              <div>Practice History:</div>
              <div className="grid grid-cols-2 gap-1 text-xs">
                {Object.entries(userProfile.practiceHistory).map(([skill, count]) => (
                  <div key={skill}>{skill}: {count} attempts</div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Estimation Interface */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border-2 border-gray-200 shadow-lg">
            <h3 className="font-semibold text-gray-800 mb-4">
              How likely are you to solve this correctly on your first try?
            </h3>
            
            {/* Grey Area Visualization Bar */}
            <div className="relative mb-6">
              <div 
                ref={barRef}
                className="relative h-16 bg-gradient-to-r from-red-200 via-yellow-200 to-green-200 rounded-lg cursor-pointer border-2 border-gray-300"
                onMouseDown={handleMouseDown}
              >
                {/* Probability markers */}
                <div className="absolute inset-0 flex">
                  <div className="flex-1 border-r border-gray-400"></div>
                  <div className="flex-1 border-r border-gray-400"></div>
                  <div className="flex-1 border-r border-gray-400"></div>
                  <div className="flex-1"></div>
                </div>
                
                {/* Grey Area boundaries */}
                <div 
                  className="absolute top-0 bottom-0 bg-gray-600 bg-opacity-20 border-2 border-gray-600 border-dashed"
                  style={{
                    left: `${lowerBoundary * 100}%`,
                    width: `${(upperBoundary - lowerBoundary) * 100}%`
                  }}
                >
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-gray-700">
                    Grey Area
                  </div>
                </div>
                
                {/* User guess indicator */}
                {userGuess !== null && (
                  <div 
                    className="absolute top-0 bottom-0 w-2 bg-blue-600 border-2 border-blue-800 cursor-grab"
                    style={{ left: `${dragPosition}%`, transform: 'translateX(-50%)' }}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                      {dragPosition.toFixed(0)}%
                    </div>
                  </div>
                )}

                {/* Actual position (shown after submission) */}
                {showActual && (
                  <div 
                    className="absolute top-0 bottom-0 w-2 bg-red-600 border-2 border-red-800"
                    style={{ left: `${actualPosition}%`, transform: 'translateX(-50%)' }}
                  >
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                      Actual: {actualPosition.toFixed(0)}%
                    </div>
                  </div>
                )}
                
                {/* Labels */}
                <div className="absolute -bottom-6 left-0 text-xs text-gray-600">0%</div>
                <div className="absolute -bottom-6 left-1/4 text-xs text-gray-600">25%</div>
                <div className="absolute -bottom-6 left-1/2 text-xs text-gray-600">50%</div>
                <div className="absolute -bottom-6 left-3/4 text-xs text-gray-600">75%</div>
                <div className="absolute -bottom-6 right-0 text-xs text-gray-600">100%</div>
              </div>
            </div>

            <div className="text-center space-y-4">
              {!showActual ? (
                <button
                  onClick={submitGuess}
                  disabled={userGuess === null}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Submit Guess
                </button>
              ) : (
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Results</h4>
                    <div className="space-y-2 text-sm">
                      <div>Your Guess: {userGuess.toFixed(0)}% ({getZone(userGuess / 100).name})</div>
                      <div>AI Prediction: {actualPosition.toFixed(0)}% ({getZone(actualProbability).name})</div>
                      <div className="font-semibold">
                        Difference: {Math.abs(userGuess - actualPosition).toFixed(1)} percentage points
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={nextTask}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Next Task →
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Results Summary */}
          {results.length > 0 && (
            <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                <BarChart3 size={16} className="mr-2" />
                Session Summary
              </h4>
              <div className="space-y-2 text-sm">
                <div>Tasks Completed: {results.length}</div>
                <div>Average Error: {(results.reduce((sum, r) => sum + r.difference, 0) / results.length).toFixed(1)} points</div>
                <div>Estimation Accuracy: {calculateAccuracy().toFixed(1)}%</div>
              </div>
              
              <div className="mt-3 space-y-1">
                <div className="text-xs text-gray-600">Recent Results:</div>
                {results.slice(-3).map((result, index) => (
                  <div key={index} className="flex justify-between text-xs">
                    <span>{result.taskTitle}</span>
                    <span className={result.difference < 15 ? 'text-green-600' : result.difference < 30 ? 'text-yellow-600' : 'text-red-600'}>
                      ±{result.difference.toFixed(0)}pt
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={resetSession}
          className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center mx-auto"
        >
          <RotateCcw size={16} className="mr-2" />
          Reset Session
        </button>
      </div>

      {/* Scientific Evaluation Notes */}
      <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400 text-sm">
        <h4 className="font-semibold text-yellow-800 mb-2">Research Evaluation Metrics</h4>
        <div className="text-yellow-700 space-y-1">
          <div><strong>Absolute Error:</strong> |UserGuess - AFMPrediction| (lower is better)</div>
          <div><strong>Zone Accuracy:</strong> % of tasks where user correctly identified the zone</div>
          <div><strong>Correlation Analysis:</strong> Pearson correlation between guesses and predictions</div>
          <div><strong>Calibration:</strong> How well user confidence matches actual performance</div>
        </div>
      </div>
    </div>
  );
};