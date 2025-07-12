import React, { useState, useRef } from 'react';
import { Code, Brain, Target, ArrowRight, CheckCircle, AlertTriangle, Lightbulb, ArrowLeft, HelpCircle, Eye, EyeOff } from 'lucide-react';

// Task data
const TASKS = {
  taskA: {
    id: 'taskA',
    title: 'List Comprehension Challenge',
    type: 'multiple-choice',
    difficulty: 'beginner',
    color: 'blue',
    description: 'Test your understanding of Python list comprehensions with filtering and transformation.',
    hasHints: true,
    problem: {
      title: 'Filter Even Numbers and Square Them',
      description: 'What will be the output of this list comprehension?',
      code: `numbers = [1, 2, 3, 4, 5, 6]
result = [num ** 2 for num in numbers if num % 2 == 0]
print(result)`,
      options: [
        {
          id: 'A',
          text: '[1, 4, 9, 16, 25, 36]',
          isCorrect: false
        },
        {
          id: 'B',
          text: '[4, 16, 36]',
          isCorrect: true
        },
        {
          id: 'C',
          text: '[2, 4, 6]',
          isCorrect: false
        },
        {
          id: 'D',
          text: '[1, 9, 25]',
          isCorrect: false
        }
      ],
      explanation: 'The list comprehension filters for even numbers (2, 4, 6) using "if num % 2 == 0", then squares each: 2² = 4, 4² = 16, 6² = 36. Result: [4, 16, 36].'
    },
    hints: [
      {
        title: 'Understanding List Comprehension Structure',
        content: 'List comprehension format: [expression for item in iterable if condition]. Here: [num ** 2 for num in numbers if num % 2 == 0]'
      },
      {
        title: 'The Filter Condition',
        content: 'The condition "if num % 2 == 0" filters for even numbers. From [1,2,3,4,5,6], only 2, 4, and 6 are even.'
      },
      {
        title: 'The Transformation',
        content: 'The expression "num ** 2" squares each filtered number: 2² = 4, 4² = 16, 6² = 36'
      },
      {
        title: 'Common Mistake',
        content: 'Don\'t confuse this with squaring ALL numbers first. The filter happens BEFORE the transformation.'
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
  const [tooltipPosition, setTooltipPosition] = useState({ x: 16, y: 16 });

  const TaskTooltip = ({ task }) => (
    <div
      className="fixed z-50 bg-white border-4 border-black rounded-xl shadow-lg p-6 w-96 font-['IBM_Plex_Mono',monospace]"
      style={{
        left: `${tooltipPosition.x}px`,
        top: `${tooltipPosition.y}px`,
        maxWidth: '384px'
      }}
    >
      <div className={`border-4 border-${task.color}-600 rounded-xl p-4 bg-${task.color}-50 mb-4`}>
        <div className="flex items-center gap-2 mb-3">
          <Brain className="w-5 h-5" />
          <span className={`font-bold text-${task.color}-700 uppercase tracking-wide`}>
            Multiple Choice Task
          </span>
        </div>

        <div className={`bg-black text-green-400 p-3 rounded-lg border-2 border-${task.color}-600 font-mono text-xs`}>
          <div className="text-green-300 mb-2">TASK:</div>
          <div className="text-white">{task.problem.title}</div>
        </div>
      </div>

      <div className="space-y-2 text-sm text-black">
        <div className={`border-l-4 border-${task.color}-600 bg-${task.color}-100 px-3 py-1 rounded-r-lg`}>
          <strong>Type:</strong> Choose the correct answer
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
    <div className="bg-white min-h-screen flex flex-col text-black font-['IBM_Plex_Mono',monospace]">
      {/* Header */}
      <div className="border-b-8 border-black bg-purple-400 px-8 py-6 shadow-lg">
        <div className="flex items-center justify-center">
          <span className="text-black font-bold text-2xl uppercase tracking-wider">
            Python Challenge Tasks
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-8 py-8">
        <div className="max-w-6xl mx-auto">

          {/* Introduction */}
          <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg mb-8">
            <div className="border-l-8 border-purple-600 bg-purple-100 p-6 rounded-r-xl">
              <div className="text-2xl md:text-3xl font-bold tracking-tight text-black text-center uppercase">
                Let's solve some Python function tasks
              </div>
              <p className="text-center text-black font-mono text-lg mt-4">
                Test your understanding with these multiple choice challenges
              </p>
            </div>
          </div>

          {/* Task Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {Object.values(TASKS).map((task) => (
              <div
                key={task.id}
                className="border-4 border-black rounded-xl p-8 bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                onMouseEnter={() => setHoveredTask(task.id)}
                onMouseLeave={() => setHoveredTask(null)}
              >
                <div className={`border-l-8 border-${task.color}-600 bg-${task.color}-100 p-6 rounded-r-xl mb-6`}>
                  <div className="flex items-center gap-2 mb-4">
                    <Brain className="w-8 h-8" />
                    <span className={`font-bold text-${task.color}-700 text-xl uppercase tracking-wide`}>
                      {task.title}
                    </span>
                  </div>

                  <div className="mb-4">
                    <p className="text-black font-mono leading-relaxed">
                      {task.description}
                    </p>
                  </div>

                  {task.hasHints && (
                    <div className="border-4 border-green-600 rounded-xl p-4 bg-green-50 mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Lightbulb className="w-5 h-5 text-green-700" />
                        <span className="font-bold text-green-700 uppercase tracking-wide text-sm">
                          Hints Available
                        </span>
                      </div>
                      <p className="text-green-800 text-sm font-mono">
                        This task includes helpful hints to guide your thinking!
                      </p>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => onNavigate(task.id)}
                  className={`w-full px-6 py-3 bg-${task.color}-600 text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-${task.color}-600 hover:border-${task.color}-600 transition-all flex items-center justify-center gap-3`}
                >
                  <Brain className="w-5 h-5" />
                  Start Task
                </button>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-center">
            <button
              onClick={() => scroll(21)}
              className="px-8 py-4 bg-purple-600 text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-purple-600 hover:border-purple-600 transition-all transform hover:scale-105 flex items-center gap-3"
            >
              <span>What is this all about?</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Tooltips */}
      {hoveredTask && <TaskTooltip task={TASKS[hoveredTask]} />}
    </div>
  );
};

// Multiple Choice Task Component (with optional hints)
const MultipleChoiceTask = ({ task, onNavigate }) => {
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [visibleHints, setVisibleHints] = useState([]);

  const toggleHint = (index) => {
    setVisibleHints(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const handleSubmit = () => {
    const correct = task.problem.options.find(opt => opt.id === selectedAnswer)?.isCorrect;
    setIsCorrect(correct);
    setShowResult(true);
  };

  if (showResult) {
    return (
      <div className="bg-white min-h-screen flex flex-col text-black font-['IBM_Plex_Mono',monospace]">
        {/* Header */}
        <div className={`border-b-8 border-black bg-${task.color}-400 px-8 py-6 shadow-lg`}>
          <div className="flex items-center justify-center">
            <span className="text-black font-bold text-2xl uppercase tracking-wider">
              {task.id.toUpperCase()} - {isCorrect ? 'Correct!' : 'Incorrect'}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 px-8 py-8">
          <div className="max-w-4xl mx-auto">
            <div className={`border-4 ${isCorrect ? 'border-green-600' : 'border-red-600'} rounded-xl p-8 ${isCorrect ? 'bg-green-50' : 'bg-red-50'} shadow-lg mb-8`}>
              <div className="text-center">
                {isCorrect ? (
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                ) : (
                  <AlertTriangle className="w-16 h-16 text-red-600 mx-auto mb-4" />
                )}
                <h2 className={`text-2xl font-bold ${isCorrect ? 'text-green-800' : 'text-red-800'} mb-4 uppercase tracking-wide`}>
                  {isCorrect ? 'Excellent!' : 'Not Quite Right'}
                </h2>
                <p className={`${isCorrect ? 'text-green-700' : 'text-red-700'} font-mono mb-6 text-lg`}>
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
                className={`px-8 py-4 bg-${task.color}-600 text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-${task.color}-600 hover:border-${task.color}-600 transition-all flex items-center gap-3`}
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Tasks
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen flex flex-col text-black font-['IBM_Plex_Mono',monospace]">
      {/* Header */}
      <div className={`border-b-8 border-black bg-${task.color}-400 px-8 py-6 shadow-lg`}>
        <div className="flex items-center justify-center">
          <span className="text-black font-bold text-2xl uppercase tracking-wider">
            {task.id.toUpperCase()} - Multiple Choice
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-8 py-8">
        <div className="max-w-6xl mx-auto">

          {/* Problem Title */}
          <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg mb-8">
            <div className="text-2xl md:text-3xl font-bold tracking-tight text-black text-center uppercase">
              {task.problem.title}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Question and Options */}
            <div className="space-y-6">
              {/* Question */}
              <div className={`border-4 border-black rounded-xl p-8 bg-${task.color}-50 shadow-lg`}>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Target className="w-6 h-6" />
                  Question
                </h3>
                <p className="text-lg text-black leading-relaxed font-mono mb-6">
                  {task.problem.description}
                </p>
                <div className={`bg-black text-green-400 p-4 rounded-lg border-2 border-${task.color}-600 font-mono text-sm`}>
                  <div className="text-green-300 text-xs mb-2">CODE:</div>
                  <pre className="text-white whitespace-pre-wrap">{task.problem.code}</pre>
                </div>
              </div>

              {/* Options */}
              <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Brain className="w-6 h-6" />
                  Choose the correct answer:
                </h3>
                <div className="space-y-4">
                  {task.problem.options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setSelectedAnswer(option.id)}
                      className={`w-full p-4 text-left border-4 rounded-xl font-mono transition-all ${selectedAnswer === option.id
                        ? `border-${task.color}-600 bg-${task.color}-100 text-${task.color}-800`
                        : 'border-gray-300 bg-gray-50 text-black hover:border-gray-400 hover:bg-gray-100'
                        }`}
                    >
                      <span className="font-bold mr-3">{option.id})</span>
                      <pre className="whitespace-pre-wrap inline">{option.text}</pre>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Hints Section (if available) */}
            <div className="space-y-6">
              {task.hasHints && (
                <div className="border-4 border-black rounded-xl p-6 bg-white shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      <Lightbulb className="w-5 h-5" />
                      Hints Available
                    </h3>
                    <button
                      onClick={() => setShowHints(!showHints)}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white border-4 border-black rounded-lg font-bold hover:bg-white hover:text-green-600 hover:border-green-600 transition-all"
                    >
                      {showHints ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      {showHints ? 'Hide' : 'Show'} Hints
                    </button>
                  </div>

                  {showHints && (
                    <div className="space-y-3">
                      {task.hints.map((hint, index) => (
                        <div key={index} className="border-4 border-green-600 rounded-xl">
                          <button
                            onClick={() => toggleHint(index)}
                            className="w-full p-3 text-left bg-green-50 hover:bg-green-100 transition-all flex items-center justify-between border-4 border-transparent hover:border-green-300 rounded-xl"
                          >
                            <span className="font-bold text-green-800">Hint {index + 1}: {hint.title}</span>
                            <HelpCircle className="w-4 h-4 text-green-600" />
                          </button>
                          {visibleHints.includes(index) && (
                            <div className="p-4 bg-white border-t-4 border-green-600 rounded-b-xl">
                              <p className="text-black font-mono text-sm">{hint.content}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Placeholder for non-hint tasks */}
              {!task.hasHints && (
                <div className="border-4 border-black rounded-xl p-8 bg-gray-50 shadow-lg">
                  <div className="text-center">
                    <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-600 mb-4 uppercase tracking-wide">
                      No Hints Available
                    </h3>
                    <p className="text-gray-600 font-mono">
                      This advanced task challenges you to solve it independently.
                      Use your knowledge of Python decorators!
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-between items-center mt-8">
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
              className={`px-8 py-3 border-4 border-black rounded-xl font-bold uppercase tracking-wide transition-all flex items-center gap-2 ${selectedAnswer
                ? `bg-${task.color}-600 text-white hover:bg-white hover:text-${task.color}-600 hover:border-${task.color}-600`
                : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                }`}
            >
              Submit Answer
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
export const Slide25IFMTasks = ({ scroll }) => {
  const [currentPage, setCurrentPage] = useState('overview');

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  switch (currentPage) {
    case 'taskA':
      return <MultipleChoiceTask task={TASKS.taskA} onNavigate={handleNavigate} />;
    case 'taskB':
      return <MultipleChoiceTask task={TASKS.taskB} onNavigate={handleNavigate} />;
    case 'overview':
    default:
      return <TaskOverview onNavigate={handleNavigate} scroll={scroll} />;
  }
};