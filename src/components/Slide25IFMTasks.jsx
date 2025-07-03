import React, { useState, useRef } from 'react';
import { Code, Play, Target, ArrowRight, Brain, Zap, CheckCircle, AlertTriangle, Lightbulb, ArrowLeft, HelpCircle, Eye, EyeOff } from 'lucide-react';

// Task data
const TASKS = {
  taskA: {
    id: 'taskA',
    title: 'List Comprehension Challenge',
    type: 'coding',
    difficulty: 'beginner',
    color: 'blue',
    description: 'Write a function that filters and transforms a list using list comprehension.',
    hasHints: true,
    problem: {
      title: 'Filter Even Numbers and Square Them',
      description: 'Write a function called `process_numbers` that takes a list of integers and returns a new list containing only the even numbers, squared.',
      example: 'process_numbers([1, 2, 3, 4, 5, 6]) should return [4, 16, 36]',
      starterCode: 'def process_numbers(numbers):\n    # Your code here\n    pass',
      solution: 'def process_numbers(numbers):\n    return [num ** 2 for num in numbers if num % 2 == 0]',
      testCases: [
        { input: '[1, 2, 3, 4, 5, 6]', expected: '[4, 16, 36]' },
        { input: '[10, 15, 20, 25]', expected: '[100, 400]' },
        { input: '[1, 3, 5, 7]', expected: '[]' }
      ]
    },
    hints: [
      {
        title: 'Understanding the Problem',
        content: 'You need to: 1) Filter for even numbers (divisible by 2), 2) Square each even number, 3) Return as a new list'
      },
      {
        title: 'List Comprehension Syntax',
        content: 'List comprehension format: [expression for item in iterable if condition]'
      },
      {
        title: 'Checking Even Numbers',
        content: 'Use the modulo operator: num % 2 == 0 checks if a number is even'
      },
      {
        title: 'Squaring Numbers',
        content: 'Use ** for exponentiation: num ** 2 squares a number'
      }
    ]
  },
  taskB: {
    id: 'taskB',
    title: 'Decorator Pattern Challenge',
    type: 'multiple-choice',
    difficulty: 'advanced',
    color: 'orange',
    description: 'Test your understanding of Python decorators and function wrapping.',
    hasHints: false,
    problem: {
      title: 'Decorator Behavior',
      description: 'What will be printed when this code is executed?',
      code: `def timing_decorator(func):
    def wrapper(*args, **kwargs):
        print("Before function call")
        result = func(*args, **kwargs)
        print("After function call")
        return result
    return wrapper

@timing_decorator
def greet(name):
    print(f"Hello, {name}!")
    return f"Greeting for {name}"

output = greet("Alice")
print(output)`,
      options: [
        { 
          id: 'A', 
          text: 'Hello, Alice!\nGreeting for Alice',
          isCorrect: false
        },
        { 
          id: 'B', 
          text: 'Before function call\nHello, Alice!\nAfter function call\nGreeting for Alice',
          isCorrect: true
        },
        { 
          id: 'C', 
          text: 'Before function call\nAfter function call\nHello, Alice!\nGreeting for Alice',
          isCorrect: false
        },
        { 
          id: 'D', 
          text: 'Error: decorator syntax is incorrect',
          isCorrect: false
        }
      ],
      explanation: 'The decorator wraps the function call. First "Before function call" is printed, then the original function executes (printing "Hello, Alice!"), then "After function call" is printed, and finally the return value "Greeting for Alice" is printed.'
    }
  }
};

// Overview Component
const TaskOverview = ({ onNavigate, scroll }) => {
  const [hoveredTask, setHoveredTask] = useState(null);

  const TaskTooltip = ({ task }) => (
    <div className="fixed z-50 bg-white border-4 border-black rounded-xl shadow-lg p-6 w-96 font-['IBM_Plex_Mono',monospace] top-4 left-4">
      <div className={`border-4 border-${task.color}-600 rounded-xl p-4 bg-${task.color}-50 mb-4`}>
        <div className="flex items-center gap-2 mb-3">
          {task.type === 'coding' ? <Code className="w-5 h-5" /> : <Brain className="w-5 h-5" />}
          <span className={`font-bold text-${task.color}-700 uppercase tracking-wide`}>
            {task.type === 'coding' ? 'Coding Challenge' : 'Multiple Choice'}
          </span>
        </div>
        
        <div className={`bg-black text-green-400 p-3 rounded-lg border-2 border-${task.color}-600 font-mono text-xs`}>
          <div className="text-green-300 mb-2">{task.type.toUpperCase()}:</div>
          <div className="text-white">{task.problem.title}</div>
        </div>
      </div>
      
      <div className="space-y-2 text-sm text-black">
        <div className={`border-l-4 border-${task.color}-600 bg-${task.color}-100 px-3 py-1 rounded-r-lg`}>
          <strong>Type:</strong> {task.type === 'coding' ? 'Write Python code' : 'Choose correct answer'}
        </div>
        <div className={`border-l-4 border-green-600 bg-green-100 px-3 py-1 rounded-r-lg`}>
          <strong>Difficulty:</strong> {task.difficulty}
        </div>
        <div className={`border-l-4 border-purple-600 bg-purple-100 px-3 py-1 rounded-r-lg`}>
          <strong>Hints:</strong> {task.hasHints ? 'Available' : 'Not available'}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white min-h-screen flex flex-col items-center py-8 px-4 md:px-10 text-black font-['IBM_Plex_Mono',monospace]">
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-8">
        
        {/* Header */}
        <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative">
          <div className="absolute -top-6 left-4 px-3 py-1 bg-purple-600 text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
            <Brain className="w-4 h-4" />
            PYTHON CHALLENGE
          </div>
          <div className="text-2xl md:text-3xl font-bold tracking-tight text-black text-center">
            Let's solve some python function tasks
          </div>
        </div>

        {/* Task Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {Object.values(TASKS).map((task) => (
            <div 
              key={task.id}
              className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`absolute -top-6 left-4 px-3 py-1 bg-${task.color}-600 text-white font-semibold rounded-md text-xs tracking-wider`}>
                {task.id.toUpperCase()}
              </div>
              
              <div className={`border-4 border-${task.color}-600 rounded-xl p-6 bg-${task.color}-50`}>
                <div className="flex items-center gap-2 mb-4">
                  {task.type === 'coding' ? <Code className="w-8 h-8" /> : <Brain className="w-8 h-8" />}
                  <span className={`font-bold text-${task.color}-700 text-xl uppercase tracking-wide`}>
                    {task.title}
                  </span>
                </div>
                
                <div className="mb-6">
                  <p className="text-black font-mono leading-relaxed mb-4">
                    {task.description}
                  </p>
                </div>
                
                <button
                  onClick={() => onNavigate(task.id)}
                  className={`w-full px-6 py-3 bg-${task.color}-600 text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-${task.color}-600 hover:border-${task.color}-600 transition-all flex items-center justify-center gap-3`}
                >
                  <Play className="w-5 h-5" />
                  Start Task
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-center">
          <button
            onClick={() => scroll(26)}
            className="px-8 py-4 bg-purple-600 text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-purple-600 hover:border-purple-600 transition-all transform hover:scale-105 flex items-center gap-3"
          >
            <span>What is this all about?</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Tooltips */}
        {hoveredTask && <TaskTooltip task={TASKS[hoveredTask]} />}
      </div>
    </div>
  );
};

// Coding Task Component (with hints)
const CodingTask = ({ task, onNavigate }) => {
  const [code, setCode] = useState(task.problem.starterCode);
  const [showHints, setShowHints] = useState(false);
  const [visibleHints, setVisibleHints] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const toggleHint = (index) => {
    setVisibleHints(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const handleSubmit = () => {
    // Simple check - in a real app, you'd run the code
    const isCodeCorrect = code.includes('for num in numbers if num % 2 == 0') && 
                         code.includes('num ** 2');
    setIsCorrect(isCodeCorrect);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white min-h-screen flex flex-col items-center py-8 px-4 md:px-10 text-black font-['IBM_Plex_Mono',monospace]">
        <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">
          <div className={`border-4 ${isCorrect ? 'border-green-600' : 'border-red-600'} rounded-xl p-8 ${isCorrect ? 'bg-green-50' : 'bg-red-50'} shadow-lg relative`}>
            <div className={`absolute -top-6 left-4 px-3 py-1 ${isCorrect ? 'bg-green-600' : 'bg-red-600'} text-white font-semibold rounded-md text-xs tracking-wider`}>
              {isCorrect ? 'SUCCESS!' : 'TRY AGAIN'}
            </div>
            <div className="text-center">
              {isCorrect ? (
                <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              ) : (
                <AlertTriangle className="w-16 h-16 text-red-600 mx-auto mb-4" />
              )}
              <h2 className={`text-2xl font-bold ${isCorrect ? 'text-green-800' : 'text-red-800'} mb-4`}>
                {isCorrect ? 'Well Done!' : 'Not Quite Right'}
              </h2>
              <p className={`${isCorrect ? 'text-green-700' : 'text-red-700'} font-mono mb-6`}>
                {isCorrect 
                  ? 'Your solution correctly uses list comprehension to filter even numbers and square them!'
                  : 'Your solution needs some adjustments. Try using the hints to guide your approach.'
                }
              </p>
              {!isCorrect && (
                <div className="bg-black text-green-400 p-4 rounded-lg border-2 border-gray-600 font-mono text-sm mb-6">
                  <div className="text-green-300 text-xs mb-2">SOLUTION:</div>
                  <pre className="text-white whitespace-pre-wrap">{task.problem.solution}</pre>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-center gap-4">
            {!isCorrect && (
              <button
                onClick={() => setSubmitted(false)}
                className="px-8 py-4 bg-blue-600 text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-blue-600 hover:border-blue-600 transition-all flex items-center gap-3"
              >
                Try Again
              </button>
            )}
            <button
              onClick={() => onNavigate('overview')}
              className="px-8 py-4 bg-gray-600 text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-gray-600 hover:border-gray-600 transition-all flex items-center gap-3"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Tasks
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen flex flex-col items-center py-8 px-4 md:px-10 text-black font-['IBM_Plex_Mono',monospace]">
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-8">
        
        {/* Header */}
        <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative">
          <div className="absolute -top-6 left-4 px-3 py-1 bg-blue-600 text-white font-semibold rounded-md text-xs tracking-wider">
            TASK A - CODING CHALLENGE
          </div>
          <div className="text-2xl md:text-3xl font-bold tracking-tight text-black text-center">
            {task.problem.title}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Problem Description */}
          <div className="space-y-6">
            <div className="border-4 border-black rounded-xl p-8 bg-blue-50 shadow-lg">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Target className="w-6 h-6" />
                Problem Description
              </h3>
              <p className="text-black font-mono leading-relaxed mb-4">
                {task.problem.description}
              </p>
              <div className="bg-black text-green-400 p-4 rounded-lg border-2 border-blue-600 font-mono text-sm">
                <div className="text-green-300 text-xs mb-2">EXAMPLE:</div>
                <div className="text-white">{task.problem.example}</div>
              </div>
            </div>

            {/* Test Cases */}
            <div className="border-4 border-black rounded-xl p-6 bg-white shadow-lg">
              <h3 className="text-lg font-bold mb-4">Test Cases</h3>
              <div className="space-y-3">
                {task.problem.testCases.map((testCase, index) => (
                  <div key={index} className="bg-gray-100 p-3 rounded-lg border-2 border-gray-300 font-mono text-sm">
                    <div className="text-gray-600">Input: {testCase.input}</div>
                    <div className="text-gray-800">Expected: {testCase.expected}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hints Section */}
            {task.hasHints && (
              <div className="border-4 border-black rounded-xl p-6 bg-white shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <Lightbulb className="w-5 h-5" />
                    Hints
                  </h3>
                  <button
                    onClick={() => setShowHints(!showHints)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-all"
                  >
                    {showHints ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    {showHints ? 'Hide' : 'Show'} Hints
                  </button>
                </div>
                
                {showHints && (
                  <div className="space-y-3">
                    {task.hints.map((hint, index) => (
                      <div key={index} className="border-2 border-green-300 rounded-lg">
                        <button
                          onClick={() => toggleHint(index)}
                          className="w-full p-3 text-left bg-green-50 hover:bg-green-100 transition-all flex items-center justify-between"
                        >
                          <span className="font-bold text-green-800">Hint {index + 1}: {hint.title}</span>
                          <HelpCircle className="w-4 h-4 text-green-600" />
                        </button>
                        {visibleHints.includes(index) && (
                          <div className="p-4 bg-white border-t-2 border-green-300">
                            <p className="text-black font-mono text-sm">{hint.content}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Code Editor */}
          <div className="space-y-6">
            <div className="border-4 border-black rounded-xl p-6 bg-white shadow-lg">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Code className="w-5 h-5" />
                Your Solution
              </h3>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-64 p-4 border-2 border-gray-300 rounded-lg font-mono text-sm bg-gray-50 focus:border-blue-600 focus:outline-none"
                placeholder="Write your Python code here..."
              />
            </div>

            {/* Controls */}
            <div className="flex justify-between items-center">
              <button
                onClick={() => onNavigate('overview')}
                className="px-6 py-3 bg-gray-600 text-white border-4 border-black rounded-xl font-bold uppercase tracking-wide hover:bg-white hover:text-gray-600 hover:border-gray-600 transition-all flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              
              <button
                onClick={handleSubmit}
                disabled={!code.trim() || code === task.problem.starterCode}
                className={`px-8 py-3 border-4 border-black rounded-xl font-bold uppercase tracking-wide transition-all flex items-center gap-2 ${
                  code.trim() && code !== task.problem.starterCode
                    ? 'bg-blue-600 text-white hover:bg-white hover:text-blue-600 hover:border-blue-600'
                    : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                }`}
              >
                Submit Solution
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Multiple Choice Task Component (no hints)
const MultipleChoiceTask = ({ task, onNavigate }) => {
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = () => {
    const correct = task.problem.options.find(opt => opt.id === selectedAnswer)?.isCorrect;
    setIsCorrect(correct);
    setShowResult(true);
  };

  if (showResult) {
    return (
      <div className="bg-white min-h-screen flex flex-col items-center py-8 px-4 md:px-10 text-black font-['IBM_Plex_Mono',monospace]">
        <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">
          <div className={`border-4 ${isCorrect ? 'border-green-600' : 'border-red-600'} rounded-xl p-8 ${isCorrect ? 'bg-green-50' : 'bg-red-50'} shadow-lg relative`}>
            <div className={`absolute -top-6 left-4 px-3 py-1 ${isCorrect ? 'bg-green-600' : 'bg-red-600'} text-white font-semibold rounded-md text-xs tracking-wider`}>
              {isCorrect ? 'CORRECT!' : 'INCORRECT'}
            </div>
            <div className="text-center">
              {isCorrect ? (
                <Brain className="w-16 h-16 text-green-600 mx-auto mb-4" />
              ) : (
                <AlertTriangle className="w-16 h-16 text-red-600 mx-auto mb-4" />
              )}
              <h2 className={`text-2xl font-bold ${isCorrect ? 'text-green-800' : 'text-red-800'} mb-4`}>
                {isCorrect ? 'Excellent!' : 'Not Quite Right'}
              </h2>
              <p className={`${isCorrect ? 'text-green-700' : 'text-red-700'} font-mono mb-6`}>
                {task.problem.explanation}
              </p>
              <div className="bg-black text-green-400 p-4 rounded-lg border-2 border-gray-600 font-mono text-sm mb-6">
                <div className="text-green-300 text-xs mb-2">CORRECT ANSWER:</div>
                <pre className="text-white whitespace-pre-wrap">
                  {task.problem.options.find(opt => opt.isCorrect)?.text}
                </pre>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <button
              onClick={() => onNavigate('overview')}
              className="px-8 py-4 bg-orange-600 text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-orange-600 hover:border-orange-600 transition-all flex items-center gap-3"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Tasks
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen flex flex-col items-center py-8 px-4 md:px-10 text-black font-['IBM_Plex_Mono',monospace]">
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-8">
        
        {/* Header */}
        <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative">
          <div className="absolute -top-6 left-4 px-3 py-1 bg-orange-600 text-white font-semibold rounded-md text-xs tracking-wider">
            TASK B - MULTIPLE CHOICE
          </div>
          <div className="text-2xl md:text-3xl font-bold tracking-tight text-black text-center">
            {task.problem.title}
          </div>
        </div>

        {/* Question */}
        <div className="border-4 border-black rounded-xl p-8 bg-orange-50 shadow-lg">
          <p className="text-lg text-black leading-relaxed font-mono mb-6">
            {task.problem.description}
          </p>
          <div className="bg-black text-green-400 p-4 rounded-lg border-2 border-orange-600 font-mono text-sm">
            <div className="text-green-300 text-xs mb-2">CODE:</div>
            <pre className="text-white whitespace-pre-wrap">{task.problem.code}</pre>
          </div>
        </div>

        {/* Options */}
        <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Target className="w-6 h-6" />
            Choose the correct answer:
          </h3>
          <div className="space-y-4">
            {task.problem.options.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedAnswer(option.id)}
                className={`w-full p-4 text-left border-4 rounded-xl font-mono transition-all ${
                  selectedAnswer === option.id
                    ? 'border-orange-600 bg-orange-100 text-orange-800'
                    : 'border-gray-300 bg-gray-50 text-black hover:border-orange-400 hover:bg-orange-50'
                }`}
              >
                <span className="font-bold mr-3">{option.id})</span>
                <pre className="whitespace-pre-wrap inline">{option.text}</pre>
              </button>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => onNavigate('overview')}
            className="px-6 py-3 bg-gray-600 text-white border-4 border-black rounded-xl font-bold uppercase tracking-wide hover:bg-white hover:text-gray-600 hover:border-gray-600 transition-all flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          
          <button
            onClick={handleSubmit}
            disabled={!selectedAnswer}
            className={`px-8 py-3 border-4 border-black rounded-xl font-bold uppercase tracking-wide transition-all flex items-center gap-2 ${
              selectedAnswer
                ? 'bg-orange-600 text-white hover:bg-white hover:text-orange-600 hover:border-orange-600'
                : 'bg-gray-300 text-gray-600 cursor-not-allowed'
            }`}
          >
            Submit Answer
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Main App Component
export const Slide25IFMTasks = ({scroll}) => {
  const [currentPage, setCurrentPage] = useState('overview');

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  switch (currentPage) {
    case 'taskA':
      return <CodingTask task={TASKS.taskA} onNavigate={handleNavigate} />;
    case 'taskB':
      return <MultipleChoiceTask task={TASKS.taskB} onNavigate={handleNavigate} />;
    case 'skip':
      return (
        <div className="bg-white min-h-screen flex flex-col items-center py-8 px-4 md:px-10 text-black font-['IBM_Plex_Mono',monospace]">
          <div className="w-full max-w-6xl mx-auto flex flex-col gap-8">
            <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative">
              <div className="absolute -top-6 left-4 px-3 py-1 bg-orange-600 text-white font-semibold rounded-md text-xs tracking-wider">
                TASK BETA - MULTIPLE CHOICE
              </div>
              <div className="text-2xl md:text-3xl font-bold tracking-tight text-black text-center">
                TASK BETA - MULTIPLE CHOICE
              </div>
            </div>
            <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg">
              <div className="text-2xl md:text-3xl font-bold tracking-tight text-black text-center">
                TASK BETA - MULTIPLE CHOICE
              </div>
            </div>
          </div>
        </div>
      );
    case 'overview':
    default:
      return <TaskOverview onNavigate={handleNavigate} scroll={scroll} />;
  }
};