import { Code, Target, Zap, ArrowRight, List, Brain, Users, CheckCircle, XCircle, Play } from "lucide-react";
import { useState } from "react";

const Layout = ({ children }) => (
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

const TechnicalCard = ({ title, description, code, icon: Icon, config, onClick, color = "green" }) => {
  const colorConfig = {
    green: {
      accent: "bg-green-600",
      border: "border-green-600",
      bg: "bg-green-50"
    },
    orange: {
      accent: "bg-orange-600", 
      border: "border-orange-600",
      bg: "bg-orange-50"
    }
  };

  const colors = colorConfig[color];

  return (
    <div
      onClick={onClick}
      className="bg-white border-2 border-black p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 relative group"
    >
      {/* Technical drawing corner marker */}
      <div className="absolute top-2 right-2 w-2 h-2 border border-black bg-white" />
      
      {/* Module identifier */}
      <div className="absolute -top-4 left-4">
        <span className={`${colors.accent} text-white px-3 py-1 text-xs font-mono tracking-wider border border-black`}>
          {config}
        </span>
      </div>
      
      <div className="h-full flex flex-col justify-between">
        <div className="flex items-start justify-between mb-4">
          <div className="w-8 h-8 border border-black flex items-center justify-center bg-white">
            <Icon className="w-4 h-4 text-black" />
          </div>
          <ArrowRight className="w-4 h-4 text-black opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        
        <div>
          <h3 className="text-lg font-bold text-black tracking-wider uppercase mb-2">
            {title}
          </h3>
          
          <p className="text-black text-sm font-mono leading-relaxed mb-4">
            {description}
          </p>
          
          {/* Code preview */}
          <div className="bg-black text-green-400 p-3 border border-black font-mono text-xs">
            <pre className="text-white whitespace-pre-wrap overflow-hidden">{code}</pre>
          </div>
          
          <div className="mt-3 text-center">
            <span className={`inline-block px-3 py-1 ${colors.accent} text-white text-xs font-mono tracking-wider border border-black`}>
              INITIALIZE PRACTICE
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Slide15TwoMorePythonTasks = ({ scroll }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const tasks = {
    A: {
      title: "List Manipulation",
      description: "FILTER ALGORITHM • STATISTICAL COMPUTATION • ARRAY PROCESSING • CONDITIONAL LOGIC",
      code: `def filter_and_average(grades):
    # Return high grades and their average
    pass
# Expected: ([92, 96, 91], 93.0)`,
      question: "SELECT OPTIMAL IMPLEMENTATION PATTERN:",
      options: [
        {
          id: 'a',
          text: `high_grades = [g for g in grades if g > 90]
return high_grades, sum(high_grades) / len(high_grades)`,
          correct: true
        },
        {
          id: 'b',
          text: `high_grades = filter(lambda x: x >= 90, grades)
return high_grades, sum(high_grades) / len(high_grades)`,
          correct: false
        },
        {
          id: 'c',
          text: `high_grades = []
for grade in grades:
    if grade > 90:
        high_grades.append(grade)
return high_grades`,
          correct: false
        },
        {
          id: 'd',
          text: `return [g for g in grades if g > 90], 93.0`,
          correct: false
        }
      ],
      color: 'green',
      config: 'TASK-A'
    },
    B: {
      title: "Class Design",
      description: "OBJECT-ORIENTED ARCHITECTURE • ENCAPSULATION • METHOD IMPLEMENTATION • DATA STRUCTURES",
      code: `class Student:
    def __init__(self, name):
        # Initialize with name and empty grades
    def add_grade(self, grade):
        # Add grade to student's record
    def get_gpa(self):
        # Calculate and return GPA
    def honor_roll(self):
        # Return True if GPA >= 3.5`,
      question: "SELECT CORRECT CONSTRUCTOR IMPLEMENTATION:",
      options: [
        {
          id: 'a',
          text: `def __init__(self, name):
    self.name = name
    self.grades = []`,
          correct: true
        },
        {
          id: 'b',
          text: `def __init__(name):
    self.name = name
    self.grades = []`,
          correct: false
        },
        {
          id: 'c',
          text: `def __init__(self, name):
    name = name
    grades = []`,
          correct: false
        },
        {
          id: 'd',
          text: `def __init__(self, name, grades):
    self.name = name
    self.grades = grades`,
          correct: false
        }
      ],
      color: 'orange',
      config: 'TASK-B'
    }
  };

  const handleTaskClick = (taskId) => {
    setSelectedTask(taskId);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handleAnswerSelect = (answerId) => {
    setSelectedAnswer(answerId);
    setShowResult(true);
  };

  const resetTask = () => {
    setSelectedTask(null);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const getColorClasses = (color) => {
    const colors = {
      green: {
        accent: 'bg-green-600',
        border: 'border-green-600',
        bg: 'bg-green-50'
      },
      orange: {
        accent: 'bg-orange-600',
        border: 'border-orange-600', 
        bg: 'bg-orange-50'
      }
    };
    return colors[color];
  };

  if (selectedTask) {
    const task = tasks[selectedTask];
    const colors = getColorClasses(task.color);
    const correctAnswer = task.options.find(opt => opt.correct);
    const selectedOption = task.options.find(opt => opt.id === selectedAnswer);

    return (
      <Layout>
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Header */}
          <div className="border-2 border-black p-6 bg-white relative">
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-black"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-black"></div>
            
            <div className="absolute -top-4 left-4">
              <span className={`${colors.accent} text-white px-3 py-1 text-xs font-mono tracking-wider border border-black`}>
                {task.config}
              </span>
            </div>
            
            <div className="text-center">
              <h1 className="text-2xl font-bold uppercase tracking-wider text-black">
                {task.title}
              </h1>
              <p className="text-xs font-mono text-gray-600 mt-2">
                INTERACTIVE PROGRAMMING EXERCISE
              </p>
            </div>
          </div>

          {/* Task Description */}
          <div className="border-2 border-black p-6 bg-white">
            <div className="mb-4">
              <h3 className="text-sm font-mono tracking-wider uppercase text-black mb-2">
                SYSTEM REQUIREMENTS:
              </h3>
              <p className="text-black font-mono text-sm leading-relaxed">
                {task.description}
              </p>
            </div>
            
            <div className="bg-black text-green-400 p-4 border border-black font-mono text-sm">
              <div className="text-green-300 mb-2"># IMPLEMENTATION TEMPLATE:</div>
              <pre className="text-white whitespace-pre-wrap">{task.code}</pre>
            </div>
          </div>

          {/* Question */}
          <div className="border-2 border-black p-6 bg-white">
            <h3 className="text-sm font-mono tracking-wider uppercase text-black mb-6">
              {task.question}
            </h3>
            
            <div className="space-y-3">
              {task.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleAnswerSelect(option.id)}
                  disabled={showResult}
                  className={`w-full text-left p-4 border-2 transition-all ${
                    showResult 
                      ? option.correct 
                        ? 'border-green-600 bg-green-50' 
                        : option.id === selectedAnswer 
                          ? 'border-red-600 bg-red-50' 
                          : 'border-gray-300 bg-gray-50'
                      : selectedAnswer === option.id
                        ? `${colors.border} ${colors.bg}`
                        : 'border-black bg-white hover:border-gray-600'
                  } ${!showResult ? 'cursor-pointer' : 'cursor-default'}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-6 h-6 border flex items-center justify-center text-xs font-bold ${
                      showResult 
                        ? option.correct 
                          ? 'bg-green-600 text-white border-green-600' 
                          : option.id === selectedAnswer 
                            ? 'bg-red-600 text-white border-red-600' 
                            : 'bg-gray-300 text-gray-600 border-gray-300'
                        : 'bg-white text-black border-black'
                    }`}>
                      {option.id.toUpperCase()}
                    </div>
                    <pre className="text-sm font-mono text-black whitespace-pre-wrap flex-1">
                      {option.text}
                    </pre>
                    {showResult && option.correct && (
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    )}
                    {showResult && !option.correct && option.id === selectedAnswer && (
                      <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Result */}
            {showResult && (
              <div className={`mt-6 p-4 border-2 ${
                selectedOption?.correct 
                  ? 'border-green-600 bg-green-50' 
                  : 'border-red-600 bg-red-50'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  {selectedOption?.correct ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                  <span className={`font-mono text-sm tracking-wider uppercase ${selectedOption?.correct ? 'text-green-700' : 'text-red-700'}`}>
                    {selectedOption?.correct ? 'EXECUTION SUCCESSFUL' : 'EXECUTION FAILED'}
                  </span>
                </div>
                {!selectedOption?.correct && (
                  <p className="text-sm font-mono text-gray-700">
                    CORRECT IMPLEMENTATION: OPTION {correctAnswer.id.toUpperCase()} • 
                    {selectedTask === 'A' && " LIST COMPREHENSION WITH PROPER AVERAGE CALCULATION IS OPTIMAL"}
                    {selectedTask === 'B' && " CONSTRUCTOR MUST INCLUDE 'SELF' PARAMETER AND INSTANCE VARIABLES"}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Back Button */}
          <div className="text-center">
            <button
              onClick={resetTask}
              className="px-6 py-3 bg-black text-white border-2 border-black font-mono text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-all transform hover:scale-105"
            >
              ← RETURN TO TASK SELECTION
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="border-2 border-black p-6 bg-white mb-6 relative">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-black"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-black"></div>
          
          <div className="absolute -top-4 left-4">
            <span className="bg-black text-white px-3 py-1 text-xs font-mono tracking-wider border border-black">
              LEARNING RATE ANALYSIS
            </span>
          </div>
          
          <div className="text-center space-y-3">
            <h1 className="text-2xl font-bold uppercase tracking-wider text-black">
              COMPARATIVE TASK ANALYSIS
            </h1>
            <p className="text-xs font-mono text-gray-600">
              DETERMINE OPTIMAL LEARNING PROGRESSION RATE
            </p>
            <div className="bg-gray-100 border border-black p-2 inline-block font-mono text-xs">
              METRIC: IMPROVEMENT VELOCITY PER PRACTICE ITERATION
            </div>
          </div>
        </div>

        {/* Tasks Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <TechnicalCard
            title="List Manipulation"
            description="FILTER ALGORITHM • STATISTICAL COMPUTATION • ARRAY PROCESSING • CONDITIONAL LOGIC"
            code={`def filter_and_average(grades):
    # Return high grades and their average
    pass
# Expected: ([92, 96, 91], 93.0)`}
            icon={List}
            config="TASK-A"
            color="green"
            onClick={() => handleTaskClick('A')}
          />

          <TechnicalCard
            title="Class Design"
            description="OBJECT-ORIENTED ARCHITECTURE • ENCAPSULATION • METHOD IMPLEMENTATION • DATA STRUCTURES"
            code={`class Student:
    def __init__(self, name):
        # Initialize with name and empty grades
    def add_grade(self, grade):
        # Add grade to student's record
    def get_gpa(self):
        # Calculate and return GPA`}
            icon={Users}
            config="TASK-B"
            color="orange"
            onClick={() => handleTaskClick('B')}
          />
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <button
            onClick={() => scroll(12)}
            className="px-8 py-4 bg-black text-white border-2 border-black font-mono text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-all transform hover:scale-105 flex items-center gap-3 mx-auto"
          >
            <span>CONTINUE SEQUENCE</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Layout>
  );
};