import React, { useState } from 'react';
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

// Technical Layout Component
const TechnicalLayout = ({ title, children }) => (
  <div className="bg-white min-h-screen font-mono relative">
    {/* Grid background */}
    <div 
      className="absolute inset-0 opacity-60"
      style={{
        backgroundImage: 'linear-gradient(to right, #d1d5db 1px, transparent 1px), linear-gradient(to bottom, #d1d5db 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }}
    />
    
    <div className="relative flex-1 px-8 py-6">{children}</div>
  </div>
);

// Technical Card Component
const TechnicalCard = ({ title, description, icon: Icon, config, onClick, size = "normal", isMain = false, children }) => {
  const sizeClasses = {
    normal: "col-span-1 row-span-1",
    wide: "col-span-2 row-span-1", 
    tall: "col-span-1 row-span-2",
    large: "col-span-2 row-span-2"
  };

  const cardClass = isMain 
    ? "bg-black text-white border-3 border-black" 
    : "bg-white text-black border-2 border-black";

  return (
    <div
      onClick={onClick}
      className={`${sizeClasses[size]} ${cardClass} p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 relative group`}
    >
      {/* Technical drawing corner marker */}
      <div 
        className={`absolute top-2 right-2 w-2 h-2 border ${isMain ? 'border-white bg-black' : 'border-black bg-white'}`}
      />
      
      {/* Dimension lines for main card */}
      {isMain && (
        <>
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <span className="bg-black text-white px-3 py-1 text-xs font-mono tracking-wider border border-white">
              FEATURED TASK
            </span>
          </div>
          <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 rotate-90">
            <div className="w-4 h-px bg-black"></div>
          </div>
        </>
      )}
      
      <div className="h-full flex flex-col justify-between">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-8 h-8 border ${isMain ? 'border-white' : 'border-black'} flex items-center justify-center ${isMain ? 'bg-black' : 'bg-white'}`}>
            <Icon className={`w-4 h-4 ${isMain ? 'text-white' : 'text-black'}`} />
          </div>
          <ArrowRight className={`w-4 h-4 ${isMain ? 'text-white' : 'text-black'} opacity-0 group-hover:opacity-100 transition-opacity`} />
        </div>
        
        <div>
          <div className="flex items-center mb-3">
            <div>
              <h3 className={`text-lg font-bold ${isMain ? 'text-white' : 'text-black'} tracking-wider uppercase`}>
                {title}
              </h3>
              <span className={`text-xs font-mono ${isMain ? 'text-gray-300' : 'text-gray-600'}`}>
                {config}
              </span>
            </div>
          </div>
          
          <p className={`${isMain ? 'text-white' : 'text-black'} text-sm font-mono leading-relaxed`}>
            {description}
          </p>
          
          {children}
        </div>
      </div>
    </div>
  );
};

// Technical Panel Component
const TechnicalPanel = ({ title, children, isMain = false }) => (
  <div className={`border-2 border-black p-6 relative ${isMain ? 'bg-black text-white' : 'bg-white text-black'}`}>
    {/* Technical corner brackets */}
    <div className={`absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 ${isMain ? 'border-white' : 'border-black'}`}></div>
    <div className={`absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 ${isMain ? 'border-white' : 'border-black'}`}></div>
    <div className={`absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 ${isMain ? 'border-white' : 'border-black'}`}></div>
    <div className={`absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 ${isMain ? 'border-white' : 'border-black'}`}></div>
    
    <div className="text-center space-y-3">
      <div className={`inline-block border px-3 py-1 mb-2 ${isMain ? 'border-white' : 'border-black'}`}>
        <span className="text-xs tracking-wider font-mono">{title}</span>
      </div>
      {children}
    </div>
  </div>
);

// Overview Component
const TaskOverview = ({ onNavigate, scroll }) => {
  return (
    <TechnicalLayout title="Python Challenge Tasks">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <TechnicalPanel title="INSTRUCTIONAL FACTOR MODEL">
          <h1 className="text-3xl font-bold uppercase tracking-wider text-black">
            PYTHON CHALLENGE TASKS
          </h1>
          <p className="text-sm font-mono leading-relaxed max-w-3xl mx-auto text-black">
            INTERACTIVE LEARNING ALGORITHM CHALLENGES • MULTIPLE CHOICE ASSESSMENTS
            <br />
            SKILL VALIDATION & KNOWLEDGE VERIFICATION PROTOCOLS
          </p>
        </TechnicalPanel>

        <div className="mt-8">
          {/* Technical Grid */}
          <div className="relative">
            <div className="absolute -top-4 left-0 right-0 h-3 border-l-2 border-r-2 border-t-2 border-black"></div>
            
            <div className="grid grid-cols-4 grid-rows-2 gap-6 h-[500px]">
              {/* Task A - Large featured card */}
              <TechnicalCard
                title="List Comprehension"
                description="FILTERING & TRANSFORMATION • PYTHON SYNTAX • BEGINNER LEVEL • HINT SYSTEM ENABLED"
                icon={Code}
                config="TASK-001"
                size="large"
                isMain={true}
                onClick={() => onNavigate('taskA')}
              >
                <div className="mt-4 p-2 border border-white">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="w-3 h-3 text-white" />
                    <span className="text-xs font-mono text-white">HINTS AVAILABLE</span>
                  </div>
                  <div className="text-xs font-mono text-gray-300">
                    GUIDED LEARNING PROTOCOL
                  </div>
                </div>
              </TechnicalCard>

              {/* Task B - Normal card */}
              <TechnicalCard
                title="Decorator Pattern"
                description="FUNCTION WRAPPING • ADVANCED PYTHON • INDEPENDENT CHALLENGE"
                icon={Brain}
                config="TASK-002"
                size="normal"
                onClick={() => onNavigate('taskB')}
              >
                <div className="mt-4 p-2 border border-black">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-3 h-3 text-black" />
                    <span className="text-xs font-mono text-black">ADVANCED LEVEL</span>
                  </div>
                  <div className="text-xs font-mono text-gray-600">
                    NO ASSISTANCE MODE
                  </div>
                </div>
              </TechnicalCard>

              {/* Navigation card */}
              <TechnicalCard
                title="System Navigation"
                description="RETURN TO MAIN FRAMEWORK • EDUCATIONAL MODULES • LEARNING PATHWAYS"
                icon={ArrowRight}
                config="NAV-001"
                size="normal"
                onClick={() => scroll(21)}
              />
            </div>
          </div>
        </div>
      </div>
    </TechnicalLayout>
  );
};

// Multiple Choice Task Component
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
      <TechnicalLayout title="Task Result">
        <div className="max-w-6xl mx-auto">
          <TechnicalPanel title={`${task.id.toUpperCase()} - ${isCorrect ? 'CORRECT RESPONSE' : 'INCORRECT RESPONSE'}`} isMain={isCorrect}>
            <div className="text-center">
              {isCorrect ? (
                <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              ) : (
                <AlertTriangle className="w-16 h-16 text-red-600 mx-auto mb-4" />
              )}
              <h2 className="text-2xl font-bold uppercase tracking-wider mb-4">
                {isCorrect ? 'TASK COMPLETED' : 'TASK INCOMPLETE'}
              </h2>
              <p className="text-sm font-mono mb-6 leading-relaxed">
                {task.problem.explanation}
              </p>
            </div>
          </TechnicalPanel>
          
          <div className="mt-8 border-2 border-black p-6 bg-white">
            <div className="mb-4">
              <span className="text-xs font-mono tracking-wider">CORRECT SOLUTION:</span>
            </div>
            <div className="bg-black text-green-400 p-4 border-2 border-gray-600 font-mono text-sm">
              <pre className="text-white whitespace-pre-wrap">
                {task.problem.options.find(opt => opt.isCorrect)?.text}
              </pre>
            </div>
          </div>
          
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => onNavigate('overview')}
              className="px-8 py-3 bg-black text-white border-2 border-black font-mono text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-all flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              RETURN TO OVERVIEW
            </button>
          </div>
        </div>
      </TechnicalLayout>
    );
  }

  return (
    <TechnicalLayout title="Task Execution">
      <div className="max-w-7xl mx-auto">
        {/* Task Title */}
        <TechnicalPanel title={`${task.id.toUpperCase()} - MULTIPLE CHOICE PROTOCOL`}>
          <h1 className="text-2xl font-bold uppercase tracking-wider text-black">
            {task.problem.title}
          </h1>
        </TechnicalPanel>

        <div className="mt-8 grid lg:grid-cols-2 gap-8">
          {/* Question Panel */}
          <div className="space-y-6">
            <div className="border-2 border-black p-6 bg-white">
              <div className="mb-4">
                <span className="text-xs font-mono tracking-wider">ALGORITHM CHALLENGE:</span>
              </div>
              <p className="text-sm font-mono leading-relaxed mb-6">
                {task.problem.description}
              </p>
              <div className="bg-black text-green-400 p-4 border-2 border-gray-600 font-mono text-sm">
                <div className="text-green-300 text-xs mb-2">CODE SEQUENCE:</div>
                <pre className="text-white whitespace-pre-wrap">{task.problem.code}</pre>
              </div>
            </div>

            {/* Options Panel */}
            <div className="border-2 border-black p-6 bg-white">
              <div className="mb-4">
                <span className="text-xs font-mono tracking-wider">SELECT RESPONSE:</span>
              </div>
              <div className="space-y-3">
                {task.problem.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setSelectedAnswer(option.id)}
                    className={`w-full p-3 text-left border-2 font-mono transition-all text-sm ${
                      selectedAnswer === option.id
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300 bg-gray-50 text-black hover:border-gray-400'
                    }`}
                  >
                    <span className="font-bold mr-3">{option.id})</span>
                    <pre className="whitespace-pre-wrap inline">{option.text}</pre>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Hints Panel */}
          <div className="space-y-6">
            {task.hasHints ? (
              <div className="border-2 border-black p-6 bg-white">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono tracking-wider">ASSISTANCE PROTOCOL:</span>
                  <button
                    onClick={() => setShowHints(!showHints)}
                    className="flex items-center gap-2 px-3 py-1 bg-black text-white border-2 border-black font-mono text-xs hover:bg-white hover:text-black transition-all"
                  >
                    {showHints ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    {showHints ? 'HIDE' : 'SHOW'}
                  </button>
                </div>
                
                {showHints && (
                  <div className="space-y-3">
                    {task.hints.map((hint, index) => (
                      <div key={index} className="border-2 border-gray-300">
                        <button
                          onClick={() => toggleHint(index)}
                          className="w-full p-3 text-left bg-gray-50 hover:bg-gray-100 transition-all flex items-center justify-between"
                        >
                          <span className="font-mono text-xs">HINT {index + 1}: {hint.title}</span>
                          <HelpCircle className="w-3 h-3" />
                        </button>
                        {visibleHints.includes(index) && (
                          <div className="p-3 bg-white border-t-2 border-gray-300">
                            <p className="font-mono text-xs">{hint.content}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="border-2 border-black p-6 bg-gray-50">
                <div className="text-center">
                  <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <span className="text-xs font-mono tracking-wider text-gray-600">
                    NO ASSISTANCE AVAILABLE
                  </span>
                  <p className="text-gray-600 font-mono text-xs mt-2">
                    ADVANCED LEVEL CHALLENGE
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="mt-8 flex justify-between items-center">
          <button
            onClick={() => onNavigate('overview')}
            className="px-6 py-3 bg-white text-black border-2 border-black font-mono text-xs uppercase tracking-wider hover:bg-black hover:text-white transition-all flex items-center gap-2"
          >
            <ArrowLeft className="w-3 h-3" />
            RETURN
          </button>
          
          <button
            onClick={handleSubmit}
            disabled={!selectedAnswer}
            className={`px-8 py-3 border-2 border-black font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
              selectedAnswer
                ? 'bg-black text-white hover:bg-white hover:text-black'
                : 'bg-gray-300 text-gray-600 cursor-not-allowed border-gray-300'
            }`}
          >
            SUBMIT RESPONSE
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </TechnicalLayout>
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
      return <MultipleChoiceTask task={TASKS.taskA} onNavigate={handleNavigate} />;
    case 'taskB':
      return <MultipleChoiceTask task={TASKS.taskB} onNavigate={handleNavigate} />;
    case 'overview':
    default:
      return <TaskOverview onNavigate={handleNavigate} scroll={scroll} />;
  }
};