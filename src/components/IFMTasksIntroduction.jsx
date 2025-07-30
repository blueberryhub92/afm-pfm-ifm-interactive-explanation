import React, { useState, useRef, useEffect } from 'react';
import { Code, Brain, Target, ArrowRight, CheckCircle, AlertTriangle, Lightbulb, ArrowLeft, HelpCircle, Eye, EyeOff } from 'lucide-react';
import { startConfetti } from '../utils/confetti';

// Task data
const TASKS = {
  taskA: {
    id: 'taskA',
    title: 'List Comprehension Challenge',
    type: 'multiple-choice',
    difficulty: 'beginner',
    color: 'green',
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
const TaskOverview = ({ onNavigate, navigate, completedTasks }) => {
  // Color classes matching Slide10 and Slide15 style
  const colorClasses = {
    green: "bg-green-100 border-green-600 text-green-700",
    orange: "bg-orange-100 border-orange-600 text-orange-700",
  };

  return (
    <div className="bg-white min-h-screen flex flex-col text-black font-['IBM_Plex_Mono',monospace] py-8 px-4 md:px-10">
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-8">

        {/* Header */}
        <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative">
          <div className="absolute -top-6 left-4 px-3 py-1 bg-black text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
            <Code className="w-4 h-4" />
            PYTHON CHALLENGE TASKS
          </div>
          <div className="text-2xl md:text-3xl font-bold tracking-tight text-black text-center">
            Test your Python skills with these challenges
          </div>
          <p className="text-lg text-black text-center mt-4 font-bold">
            These tasks will help us understand different learning patterns.
          </p>
          <p className="text-md text-black text-center mt-2 font-bold">
            Notice how some tasks include hints while others don't.
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="border-4 border-black rounded-xl p-4 bg-yellow-400 text-center">
          <span className="text-black font-bold text-xl uppercase tracking-wide">
            {completedTasks.length} / 2 TASKS COMPLETE
          </span>
          {completedTasks.length === 2 && (
            <div className="mt-2 text-black font-bold text-lg">
              ALL TASKS COMPLETED!
            </div>
          )}
        </div>

        {/* Task Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {Object.values(TASKS).map((task) => {
            const isCompleted = completedTasks.includes(task.id);

            return (
              <div
                key={task.id}
                className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl hover:-translate-y-2"
                onClick={() => onNavigate(task.id)}
              >
                <div
                  className={`absolute -top-6 left-4 px-3 py-1 font-semibold rounded-md text-xs tracking-wider flex items-center gap-2 border-4 border-black ${colorClasses[task.color]}`}
                >
                  <Brain className="w-4 h-4" />
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
                        Task Details:
                      </div>
                      <div className="space-y-1">
                        <div className="text-black font-bold text-sm">
                          • Type: {task.type}
                        </div>
                        <div className="text-black font-bold text-sm">
                          • Difficulty: {task.difficulty}
                        </div>
                        <div className="text-black font-bold text-sm">
                          • Hints: {task.hasHints ? 'Available' : 'Not available'}
                        </div>
                      </div>
                    </div>

                    {task.hasHints && (
                      <div className="border-4 border-green-600 rounded-xl p-4 bg-green-50">
                        <div className="flex items-center gap-2 mb-2">
                          <Lightbulb className="w-5 h-5 text-green-700" />
                          <span className="font-bold text-green-700 uppercase tracking-wide text-sm">
                            Hints Available
                          </span>
                        </div>
                        <p className="text-green-800 text-sm font-bold">
                          This task includes helpful hints to guide your thinking!
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex justify-center">
          <button
            onClick={() => navigate(21)}
            className="px-12 py-4 bg-green-600 text-white border-4 border-black rounded-xl font-bold text-xl uppercase tracking-wide hover:bg-white hover:text-green-600 hover:border-green-600 transition-all transform hover:scale-105 flex items-center gap-3"
          >
            <span>Continue to Next Section</span>
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Multiple Choice Task Component (with optional hints)
const MultipleChoiceTask = ({ task, onNavigate, onTaskComplete }) => {
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [visibleHints, setVisibleHints] = useState([]);

  // Color classes matching Slide10 and Slide15 style
  const colorClasses = {
    green: "bg-green-100 border-green-600 text-green-700",
    orange: "bg-orange-100 border-orange-600 text-orange-700",
  };

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

    // Mark task as completed if answer is correct
    if (correct) {
      onTaskComplete(task.id);
      // Trigger confetti for individual task completion
      startConfetti(3000);
    }
  };

  if (showResult) {
    return (
      <div className="bg-white min-h-screen flex flex-col text-black font-['IBM_Plex_Mono',monospace] py-8 px-4 md:px-10">
        <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">

          {/* Header */}
          <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative">
            <div className={`absolute -top-6 left-4 px-3 py-1 font-semibold rounded-md text-xs tracking-wider flex items-center gap-2 border-4 border-black ${colorClasses[task.color]}`}>
              <Target className="w-4 h-4" />
              TASK {task.id.toUpperCase()} RESULT
            </div>
            <div className="text-2xl md:text-3xl font-bold tracking-tight text-black text-center">
              {isCorrect ? 'Excellent Work!' : 'Not Quite Right'}
            </div>
          </div>

          {/* Result */}
          <div className={`border-4 ${isCorrect ? 'border-green-600' : 'border-red-600'} rounded-xl p-8 ${isCorrect ? 'bg-green-50' : 'bg-red-50'} shadow-lg`}>
            <div className="text-center">
              {isCorrect ? (
                <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              ) : (
                <AlertTriangle className="w-16 h-16 text-red-600 mx-auto mb-4" />
              )}
              <h2 className={`text-2xl font-bold ${isCorrect ? 'text-green-800' : 'text-red-800'} mb-4 uppercase tracking-wide`}>
                {isCorrect ? 'Correct Answer!' : 'Incorrect Answer'}
              </h2>
              <p className={`${isCorrect ? 'text-green-700' : 'text-red-700'} font-bold mb-6 text-lg`}>
                {task.problem.explanation}
              </p>
              <div className="bg-black text-green-400 p-6 rounded-lg border-4 border-gray-600 font-mono text-sm mb-6 shadow-lg">
                <div className="flex items-center gap-2 mb-3 text-gray-400">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="ml-2 text-xs">result.txt</span>
                </div>
                <div className="text-green-300 text-xs mb-2">CORRECT ANSWER:</div>
                <pre className="text-white whitespace-pre-wrap">
                  {task.problem.options.find(opt => opt.isCorrect)?.text}
                </pre>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="flex justify-center">
            <button
              onClick={() => onNavigate('overview')}
              className="px-8 py-4 bg-black text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-black transition-all transform hover:scale-105 flex items-center gap-3"
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
    <div className="bg-white min-h-screen flex flex-col text-black font-['IBM_Plex_Mono',monospace] py-8 px-4 md:px-10">
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-8">

        {/* Header */}
        <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative">
          <div className={`absolute -top-6 left-4 px-3 py-1 font-semibold rounded-md text-xs tracking-wider flex items-center gap-2 border-4 border-black ${colorClasses[task.color]}`}>
            <Target className="w-4 h-4" />
            TASK {task.id.toUpperCase()}
          </div>
          <div className="text-2xl md:text-3xl font-bold tracking-tight text-black text-center">
            {task.problem.title}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Question and Options */}
          <div className="space-y-6">
            {/* Question */}
            <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 uppercase tracking-tight">
                <Target className="w-6 h-6" />
                Question
              </h3>
              <p className="text-lg text-black leading-relaxed font-bold mb-6">
                {task.problem.description}
              </p>
              <div className="bg-black text-green-400 p-6 rounded-lg border-4 border-gray-600 font-mono text-sm shadow-lg">
                <div className="flex items-center gap-2 mb-3 text-gray-400">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="ml-2 text-xs">code_challenge.py</span>
                </div>
                <div className="text-green-300 text-xs mb-2">CODE:</div>
                <pre className="text-white whitespace-pre-wrap leading-relaxed">{task.problem.code}</pre>
              </div>
            </div>

            {/* Options */}
            <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 uppercase tracking-tight">
                <Brain className="w-6 h-6" />
                Choose the correct answer:
              </h3>
              <div className="space-y-4">
                {task.problem.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setSelectedAnswer(option.id)}
                    className={`w-full text-left p-4 rounded-lg border-4 border-black transition-all ${selectedAnswer === option.id
                      ? colorClasses[task.color]
                      : 'bg-gray-50 hover:bg-gray-100'
                      } cursor-pointer hover:scale-105 transition-transform`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 border-black bg-black text-white">
                        {option.id}
                      </div>
                      <pre className="text-sm font-mono text-black whitespace-pre-wrap flex-1 font-bold">
                        {option.text}
                      </pre>
                    </div>
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
                  <h3 className="text-lg font-bold flex items-center gap-2 uppercase tracking-tight">
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
                            <p className="text-black font-bold text-sm">{hint.content}</p>
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
                  <p className="text-gray-600 font-bold">
                    This advanced task challenges you to solve it independently.
                    Use your knowledge of Python decorators!
                  </p>
                </div>
              </div>
            )}
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
            className={`px-8 py-3 border-4 border-black rounded-xl font-bold uppercase tracking-wide transition-all flex items-center gap-2 ${selectedAnswer
              ? `bg-${task.color === 'green' ? 'green' : 'orange'}-600 text-white hover:bg-white hover:text-${task.color === 'green' ? 'green' : 'orange'}-600 hover:border-${task.color === 'green' ? 'green' : 'orange'}-600`
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
export const IFMTasksIntroduction = ({ navigate }) => {
  const [currentPage, setCurrentPage] = useState('overview');
  const [completedTasks, setCompletedTasks] = useState([]);

  // Check if all tasks are completed and trigger confetti
  useEffect(() => {
    if (completedTasks.length === 2 && completedTasks.length > 0) {
      // Trigger confetti for completing all tasks
      startConfetti(3000);
    }
  }, [completedTasks]);

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const handleTaskComplete = (taskId) => {
    if (!completedTasks.includes(taskId)) {
      setCompletedTasks([...completedTasks, taskId]);
    }
  };

  switch (currentPage) {
    case 'taskA':
      return <MultipleChoiceTask task={TASKS.taskA} onNavigate={handleNavigate} onTaskComplete={handleTaskComplete} />;
    case 'taskB':
      return <MultipleChoiceTask task={TASKS.taskB} onNavigate={handleNavigate} onTaskComplete={handleTaskComplete} />;
    case 'overview':
    default:
      return <TaskOverview onNavigate={handleNavigate} navigate={navigate} completedTasks={completedTasks} />;
  }
};