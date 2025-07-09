import { useState } from "react";
import { Brain, Target, CheckCircle, ArrowRight, X, List, Users, Code } from "lucide-react";

export const Slide16LearningRateQuestion = ({ 
  taskChoice, 
  setTaskChoice, 
  scroll 
}) => {
  const [showTaskResult2, setShowTaskResult2] = useState(false);

  const handleTaskChoice2 = (choice) => {
    setTaskChoice(choice);
    setShowTaskResult2(true);
  };

  const isCorrect = taskChoice === "A";

  return (
    <div className="bg-white min-h-screen font-mono relative">
      {/* Grid background */}
      <div 
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: 'linear-gradient(to right, #d1d5db 1px, transparent 1px), linear-gradient(to bottom, #d1d5db 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />
      
      <div className="relative flex-1 px-8 py-6">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Question Header - Technical style */}
          <div className="border-2 border-black p-6 bg-white relative">
            {/* Technical corner brackets */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-black"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-black"></div>
            
            {/* Module identifier */}
            <div className="absolute -top-4 left-4">
              <span className="bg-black text-white px-3 py-1 text-xs font-mono tracking-wider border border-black">
                LEARNING-RATE-ANALYSIS
              </span>
            </div>
            
            <div className="text-center space-y-4">
              <div className="inline-block border border-black px-3 py-1 mb-2">
                <span className="text-xs tracking-wider font-mono flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  COMPARATIVE ANALYSIS
                </span>
              </div>
              <h1 className="text-2xl font-bold uppercase tracking-wider text-black">
                LEARNING RATE EVALUATION
              </h1>
              <div className="border border-black p-3 bg-gray-50">
                <p className="text-sm font-mono text-black">
                  DETERMINE WHICH TASK DEMONSTRATES FASTER LEARNING RATE
                  <br />
                  <span className="text-xs text-gray-600">(SHOWS QUICKER IMPROVEMENT WITH PRACTICE)</span>
                </p>
              </div>
            </div>
          </div>

          {/* Task Options Grid */}
          <div className="relative">
            {/* Dimension bracket */}
            <div className="absolute -top-4 left-0 right-0 h-3 border-l-2 border-r-2 border-t-2 border-black"></div>
            
            <div className="grid grid-cols-2 gap-8">
              
              {/* Task A */}
              <div
                onClick={() => handleTaskChoice2("A")}
                className={`border-2 border-black p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 relative group ${
                  taskChoice === "A"
                    ? "bg-black text-white"
                    : "bg-white text-black hover:bg-gray-50"
                }`}
              >
                {/* Technical corner marker */}
                <div 
                  className={`absolute top-2 right-2 w-2 h-2 border ${
                    taskChoice === "A" ? 'border-white bg-black' : 'border-black bg-white'
                  }`}
                />
                
                {/* Module identifier */}
                <div className="absolute -top-4 left-4">
                  <span className={`px-3 py-1 text-xs font-mono tracking-wider border ${
                    taskChoice === "A" 
                      ? "bg-green-600 text-white border-green-600" 
                      : "bg-white text-black border-black"
                  }`}>
                    TASK-A
                  </span>
                </div>
                
                <div className="h-full flex flex-col justify-between">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-8 h-8 border ${
                      taskChoice === "A" ? 'border-white' : 'border-black'
                    } flex items-center justify-center ${
                      taskChoice === "A" ? 'bg-black' : 'bg-white'
                    }`}>
                      <List className={`w-4 h-4 ${
                        taskChoice === "A" ? 'text-white' : 'text-black'
                      }`} />
                    </div>
                    <ArrowRight className={`w-4 h-4 ${
                      taskChoice === "A" ? 'text-white' : 'text-black'
                    } opacity-0 group-hover:opacity-100 transition-opacity`} />
                  </div>
                  
                  <div>
                    <h3 className={`text-lg font-bold ${
                      taskChoice === "A" ? 'text-white' : 'text-black'
                    } tracking-wider uppercase mb-2`}>
                      LIST MANIPULATION
                    </h3>
                    <span className={`text-xs font-mono ${
                      taskChoice === "A" ? 'text-gray-300' : 'text-gray-600'
                    } block mb-3`}>
                      FILTER-GRADES-ABOVE-90
                    </span>
                    <p className={`${
                      taskChoice === "A" ? 'text-white' : 'text-black'
                    } text-sm font-mono leading-relaxed`}>
                      FILTER GRADES ABOVE 90 • CALCULATE AVERAGE • DATA PROCESSING
                    </p>
                    
                    {taskChoice === "A" && (
                      <div className="mt-4 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="font-mono text-xs text-green-400 tracking-wider">
                          SELECTED
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Task B */}
              <div
                onClick={() => handleTaskChoice2("B")}
                className={`border-2 border-black p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 relative group ${
                  taskChoice === "B"
                    ? "bg-black text-white"
                    : "bg-white text-black hover:bg-gray-50"
                }`}
              >
                {/* Technical corner marker */}
                <div 
                  className={`absolute top-2 right-2 w-2 h-2 border ${
                    taskChoice === "B" ? 'border-white bg-black' : 'border-black bg-white'
                  }`}
                />
                
                {/* Module identifier */}
                <div className="absolute -top-4 left-4">
                  <span className={`px-3 py-1 text-xs font-mono tracking-wider border ${
                    taskChoice === "B" 
                      ? "bg-red-600 text-white border-red-600" 
                      : "bg-white text-black border-black"
                  }`}>
                    TASK-B
                  </span>
                </div>
                
                <div className="h-full flex flex-col justify-between">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-8 h-8 border ${
                      taskChoice === "B" ? 'border-white' : 'border-black'
                    } flex items-center justify-center ${
                      taskChoice === "B" ? 'bg-black' : 'bg-white'
                    }`}>
                      <Users className={`w-4 h-4 ${
                        taskChoice === "B" ? 'text-white' : 'text-black'
                      }`} />
                    </div>
                    <ArrowRight className={`w-4 h-4 ${
                      taskChoice === "B" ? 'text-white' : 'text-black'
                    } opacity-0 group-hover:opacity-100 transition-opacity`} />
                  </div>
                  
                  <div>
                    <h3 className={`text-lg font-bold ${
                      taskChoice === "B" ? 'text-white' : 'text-black'
                    } tracking-wider uppercase mb-2`}>
                      CLASS DESIGN
                    </h3>
                    <span className={`text-xs font-mono ${
                      taskChoice === "B" ? 'text-gray-300' : 'text-gray-600'
                    } block mb-3`}>
                      STUDENT-CLASS-METHODS
                    </span>
                    <p className={`${
                      taskChoice === "B" ? 'text-white' : 'text-black'
                    } text-sm font-mono leading-relaxed`}>
                      CREATE STUDENT CLASS • IMPLEMENT METHODS • OBJECT-ORIENTED PROGRAMMING
                    </p>
                    
                    {taskChoice === "B" && (
                      <div className="mt-4 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="font-mono text-xs text-green-400 tracking-wider">
                          SELECTED
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Result Display */}
          {showTaskResult2 && (
            <div className={`border-2 border-black p-6 relative ${
              isCorrect 
                ? "bg-green-50"
                : "bg-red-50"
            }`}>
              {/* Technical corner brackets */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-black"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-black"></div>
              
              {/* Result identifier */}
              <div className="absolute -top-4 left-4">
                <span className={`px-3 py-1 text-xs font-mono tracking-wider border text-white ${
                  isCorrect 
                    ? "bg-green-600 border-green-600" 
                    : "bg-red-600 border-red-600"
                }`}>
                  {isCorrect ? "ANALYSIS-CORRECT" : "ANALYSIS-INCORRECT"}
                </span>
              </div>
              
              <div className="text-center space-y-6">
                <div className="inline-block border border-black px-3 py-1 mb-2">
                  <span className="text-xs tracking-wider font-mono flex items-center gap-2">
                    {isCorrect ? <CheckCircle className="w-4 h-4" /> : <X className="w-4 h-4" />}
                    EVALUATION RESULT
                  </span>
                </div>
                
                <div className={`text-2xl font-bold uppercase tracking-wider ${
                  isCorrect ? "text-green-800" : "text-red-800"
                }`}>
                  {isCorrect ? "ANALYSIS CORRECT" : "ANALYSIS INCORRECT"}
                </div>
                
                <div className="border border-black p-4 bg-white">
                  <p className="text-sm font-mono text-black leading-relaxed">
                    {isCorrect ? (
                      <>
                        <strong>TASK A (LIST MANIPULATION)</strong> DEMONSTRATES FASTER LEARNING RATE
                        <br />
                        <span className="text-xs text-gray-600">
                          SYSTEMATIC ANALYSIS: COMPUTATIONAL COMPLEXITY EVALUATION
                        </span>
                      </>
                    ) : (
                      <>
                        <strong>TASK A (LIST MANIPULATION)</strong> ACTUALLY DEMONSTRATES FASTER LEARNING RATE
                        <br />
                        <span className="text-xs text-gray-600">
                          SYSTEMATIC ANALYSIS: COMPUTATIONAL COMPLEXITY EVALUATION
                        </span>
                      </>
                    )}
                  </p>
                </div>
                
                <div className="text-sm font-mono text-black">
                  CAN YOU DETERMINE THE UNDERLYING FACTORS?
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={() => scroll(13)}
                    className="border-2 border-black bg-black text-white px-6 py-3 font-mono text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-all transform hover:scale-105 flex items-center gap-3"
                  >
                    <Code className="w-4 h-4" />
                    ANALYZE FACTORS
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};