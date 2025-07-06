import { Code, Target, Zap, ArrowRight, List, Brain, Users, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";

export const Slide15TwoMorePythonTasks = ({ scroll }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const tasks = {
    A: {
      title: "List Manipulation",
      description: "Given a list of student grades [85, 92, 78, 96, 88, 73, 91], write a function that returns only the grades above 90, then calculate their average.",
      code: `def filter_and_average(grades):
    # Return high grades and their average
    pass
# Expected output: ([92, 96, 91], 93.0)`,
      question: "What would be the correct implementation?",
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
      color: 'green'
    },
    B: {
      title: "Class Design",
      description: "Create a Student class that stores name, grades, and calculates GPA. Include methods to add grades, get average, and determine if the student is on honor roll (GPA ≥ 3.5).",
      code: `class Student:
    def __init__(self, name):
        # Initialize with name and empty grades
    def add_grade(self, grade):
        # Add grade to student's record
    def get_gpa(self):
        # Calculate and return GPA
    def honor_roll(self):
        # Return True if GPA >= 3.5`,
      question: "What would be the correct __init__ method?",
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
      color: 'orange'
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
        bg: 'bg-green-50',
        border: 'border-green-600',
        text: 'text-green-700',
        accent: 'bg-green-100',
        button: 'bg-green-600 hover:bg-green-700'
      },
      orange: {
        bg: 'bg-orange-50',
        border: 'border-orange-600',
        text: 'text-orange-700',
        accent: 'bg-orange-100',
        button: 'bg-orange-600 hover:bg-orange-700'
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
      <div className="bg-white min-h-screen flex flex-col items-center py-8 px-4 md:px-10 text-black font-['IBM_Plex_Mono',monospace]">
        <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">
          
          {/* Header */}
          <div className="border-4 border-black rounded-xl p-6 bg-white shadow-lg relative">
            <div className={`absolute -top-6 left-4 px-3 py-1 ${colors.button} text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2`}>
              <Code className="w-4 h-4" />
              TASK {selectedTask}
            </div>
            <div className="text-2xl md:text-3xl font-bold tracking-tight text-black text-center">
              {task.title}
            </div>
          </div>

          {/* Task Description */}
          <div className={`border-4 ${colors.border} rounded-xl p-6 ${colors.bg}`}>
            <p className="text-black mb-4 leading-relaxed">
              {task.description}
            </p>
            
            <div className={`bg-black text-green-400 p-4 rounded-lg border-2 ${colors.border} font-mono text-sm`}>
              <pre className="text-white whitespace-pre-wrap">{task.code}</pre>
            </div>
          </div>

          {/* Question */}
          <div className="border-4 border-black rounded-xl p-6 bg-white shadow-lg">
            <h3 className="text-xl font-bold mb-6 text-black">{task.question}</h3>
            
            <div className="space-y-4">
              {task.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleAnswerSelect(option.id)}
                  disabled={showResult}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    showResult 
                      ? option.correct 
                        ? 'border-green-500 bg-green-50' 
                        : option.id === selectedAnswer 
                          ? 'border-red-500 bg-red-50' 
                          : 'border-gray-300 bg-gray-50'
                      : selectedAnswer === option.id
                        ? `${colors.border} ${colors.bg}`
                        : 'border-gray-300 bg-gray-50 hover:border-gray-400'
                  } ${!showResult ? 'cursor-pointer' : 'cursor-default'}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      showResult 
                        ? option.correct 
                          ? 'bg-green-500 text-white' 
                          : option.id === selectedAnswer 
                            ? 'bg-red-500 text-white' 
                            : 'bg-gray-300 text-gray-600'
                        : 'bg-gray-300 text-gray-600'
                    }`}>
                      {option.id.toUpperCase()}
                    </div>
                    <pre className="text-sm font-mono text-gray-800 whitespace-pre-wrap flex-1">
                      {option.text}
                    </pre>
                    {showResult && option.correct && (
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    )}
                    {showResult && !option.correct && option.id === selectedAnswer && (
                      <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Result */}
            {showResult && (
              <div className={`mt-6 p-4 rounded-lg border-2 ${
                selectedOption?.correct 
                  ? 'border-green-500 bg-green-50' 
                  : 'border-red-500 bg-red-50'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  {selectedOption?.correct ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                  <span className={`font-bold ${selectedOption?.correct ? 'text-green-700' : 'text-red-700'}`}>
                    {selectedOption?.correct ? 'Correct!' : 'Incorrect'}
                  </span>
                </div>
                {!selectedOption?.correct && (
                  <p className="text-sm text-gray-700">
                    The correct answer is option {correctAnswer.id.toUpperCase()}. 
                    {selectedTask === 'A' && " List comprehension with proper average calculation is the most efficient approach."}
                    {selectedTask === 'B' && " The __init__ method must include 'self' as the first parameter and use 'self.' to create instance variables."}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Back Button */}
          <div className="flex justify-center">
            <button
              onClick={resetTask}
              className="px-6 py-3 bg-gray-600 text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-gray-600 hover:border-gray-600 transition-all transform hover:scale-105 flex items-center gap-3"
            >
              <span>← Back to Tasks</span>
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
          <div className="absolute -top-6 left-4 px-3 py-1 bg-black text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
            <Brain className="w-4 h-4" />
            Learning Rate Question
          </div>
          <div className="text-2xl md:text-3xl font-bold tracking-tight text-black text-center mb-4">
            Which task has a faster learning rate?
          </div>
          <div className="bg-neutral-100 border-2 border-black rounded p-4 text-center font-mono text-neutral-700">
            (Shows quicker improvement with practice)
          </div>
        </div>

        {/* Tasks Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Task A */}
          <div 
            className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative cursor-pointer hover:shadow-xl transition-all transform hover:scale-105"
            onClick={() => handleTaskClick('A')}
          >
            <div className="absolute -top-6 left-4 px-3 py-1 bg-green-600 text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
              <List className="w-4 h-4" />
              TASK A
            </div>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-green-100 border-4 border-green-600 rounded-xl flex items-center justify-center text-green-700 font-bold text-2xl">
                A
              </div>
              <div className="text-2xl font-bold text-black">
                List Manipulation
              </div>
            </div>
            
            <div className="border-4 border-green-600 rounded-xl p-6 bg-green-50">
              <p className="text-black mb-4 leading-relaxed">
                Given a list of student grades [85, 92, 78, 96, 88, 73, 91], write a function that returns only the grades above 90, then calculate their average.
              </p>
              
              <div className="bg-black text-green-400 p-4 rounded-lg border-2 border-green-600 font-mono text-sm">
                <div className="text-green-300"># Your task:</div>
                <div className="text-white">def filter_and_average(grades):</div>
                <div className="ml-4 text-gray-400"># Return high grades and their average</div>
                <div className="ml-4 text-yellow-400">pass</div>
                <div className="mt-2 text-green-300"># Expected output: ([92, 96, 91], 93.0)</div>
              </div>
              
              <div className="mt-4 text-center">
                <span className="inline-block px-4 py-2 bg-green-600 text-white rounded-lg font-semibold">
                  Click to Practice
                </span>
              </div>
            </div>
          </div>

          {/* Task B */}
          <div 
            className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative cursor-pointer hover:shadow-xl transition-all transform hover:scale-105"
            onClick={() => handleTaskClick('B')}
          >
            <div className="absolute -top-6 left-4 px-3 py-1 bg-orange-600 text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
              <Users className="w-4 h-4" />
              TASK B
            </div>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-orange-100 border-4 border-orange-600 rounded-xl flex items-center justify-center text-orange-700 font-bold text-2xl">
                B
              </div>
              <div className="text-2xl font-bold text-black">
                Class Design
              </div>
            </div>
            
            <div className="border-4 border-orange-600 rounded-xl p-6 bg-orange-50">
              <p className="text-black mb-4 leading-relaxed">
                Create a Student class that stores name, grades, and calculates GPA. Include methods to add grades, get average, and determine if the student is on honor roll (GPA ≥ 3.5).
              </p>
              
              <div className="bg-black text-green-400 p-4 rounded-lg border-2 border-orange-600 font-mono text-sm">
                <div className="text-green-300"># Your task:</div>
                <div className="text-white">class Student:</div>
                <div className="ml-4 text-white">def __init__(self, name):</div>
                <div className="ml-8 text-gray-400"># Initialize with name and empty grades</div>
                <div className="ml-4 text-white">def add_grade(self, grade):</div>
                <div className="ml-8 text-gray-400"># Add grade to student's record</div>
                <div className="ml-4 text-white">def get_gpa(self):</div>
                <div className="ml-8 text-gray-400"># Calculate and return GPA</div>
                <div className="ml-4 text-white">def honor_roll(self):</div>
                <div className="ml-8 text-gray-400"># Return True if GPA {'>='} 3.5</div>
                <div className="mt-2 text-green-300"># Usage: student.add_grade(3.8)</div>
              </div>
              
              <div className="mt-4 text-center">
                <span className="inline-block px-4 py-2 bg-orange-600 text-white rounded-lg font-semibold">
                  Click to Practice
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="flex justify-center">
          <button
            onClick={() => scroll(13)}
            className="px-8 py-4 bg-purple-600 text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-purple-600 hover:border-purple-600 transition-all transform hover:scale-105 flex items-center gap-3"
          >
            <span>Continue</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};