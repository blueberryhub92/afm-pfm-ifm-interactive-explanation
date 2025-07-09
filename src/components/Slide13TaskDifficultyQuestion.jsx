import { useState } from "react";
import { Target, Brain, ArrowRight, Lightbulb, Code, Zap } from "lucide-react";

export const Slide13TaskDifficultyQuestion = ({ 
  taskChoice, 
  setTaskChoice, 
  scroll 
}) => {
  const [showTaskResult1, setShowTaskResult1] = useState(false);
  const [showTellMe2, setShowTellMe2] = useState(false);

  const handleTaskChoice1 = (choice) => {
    setTaskChoice(choice);
    setShowTaskResult1(true);
  };

  const handleTellMe2 = () => {
    setShowTellMe2(true);
  };

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
        <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">
          
          {/* Main Question */}
          <div className="border-2 border-black p-8 bg-white relative">
            {/* Technical corner brackets */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-black"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-black"></div>
            
            {/* Module label */}
            <div className="inline-block border border-black px-3 py-1 mb-6">
              <span className="text-xs tracking-wider font-mono flex items-center gap-2">
                <Target className="w-3 h-3" />
                DIFFICULTY ASSESSMENT
              </span>
            </div>
            
            <div className="text-2xl md:text-3xl font-bold tracking-wider text-black text-center mb-8 uppercase">
              Which task was more difficult?
            </div>
            
            {/* Task Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                onClick={() => handleTaskChoice1("1")}
                className={`border-2 border-black p-6 font-bold text-lg uppercase tracking-wider transition-all transform hover:scale-105 relative group ${
                  taskChoice === "1"
                    ? "bg-black text-white"
                    : "bg-white text-black hover:bg-gray-100"
                }`}
              >
                {/* Technical corner marker */}
                <div className={`absolute top-2 right-2 w-2 h-2 border ${
                  taskChoice === "1" ? 'border-white bg-black' : 'border-black bg-white'
                }`} />
                
                <div className="flex items-center justify-center gap-3 mb-2">
                  <div className={`w-8 h-8 border ${taskChoice === "1" ? 'border-white' : 'border-black'} flex items-center justify-center`}>
                    <Code className="w-4 h-4" />
                  </div>
                  <span>Task 1</span>
                </div>
                <div className="text-sm font-mono normal-case tracking-wider">
                  VARIABLE DECLARATION
                </div>
              </button>
              
              <button
                onClick={() => handleTaskChoice1("2")}
                className={`border-2 border-black p-6 font-bold text-lg uppercase tracking-wider transition-all transform hover:scale-105 relative group ${
                  taskChoice === "2"
                    ? "bg-black text-white"
                    : "bg-white text-black hover:bg-gray-100"
                }`}
              >
                {/* Technical corner marker */}
                <div className={`absolute top-2 right-2 w-2 h-2 border ${
                  taskChoice === "2" ? 'border-white bg-black' : 'border-black bg-white'
                }`} />
                
                <div className="flex items-center justify-center gap-3 mb-2">
                  <div className={`w-8 h-8 border ${taskChoice === "2" ? 'border-white' : 'border-black'} flex items-center justify-center`}>
                    <Zap className="w-4 h-4" />
                  </div>
                  <span>Task 2</span>
                </div>
                <div className="text-sm font-mono normal-case tracking-wider">
                  FOR LOOP
                </div>
              </button>
            </div>
          </div>

          {/* Task Result */}
          {showTaskResult1 && (
            <div className="border-2 border-black p-6 bg-white relative">
              {/* Technical corner brackets */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-black"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-black"></div>
              
              <div className="inline-block border border-black px-3 py-1 mb-6">
                <span className="text-xs tracking-wider font-mono flex items-center gap-2">
                  <Brain className="w-3 h-3" />
                  ANALYSIS
                </span>
              </div>
              
              <div className="text-xl font-bold text-black mb-4 font-mono tracking-wider">
                ACTUALLY, <span className="bg-black text-white px-2 py-1">TASK 2 (FOR LOOP)</span> IS MORE CHALLENGING IN THIS CASE.
              </div>
              <div className="text-lg text-black mb-6 font-mono tracking-wider uppercase">
                Can you think of a reason why?
              </div>
              <button
                onClick={handleTellMe2}
                className="px-6 py-3 bg-black text-white border-2 border-black font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-all transform hover:scale-105 font-mono"
              >
                TELL ME!
              </button>
            </div>
          )}

          {/* Explanation - styled like Slide8 analysis result */}
          {showTellMe2 && (
            <div className="border-2 border-black bg-white p-6 relative animate-fadeIn">
              {/* Technical corner brackets */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-black"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-black"></div>
              
              {/* Technical header label */}
              <div className="absolute -top-4 left-4">
                <span className="bg-black text-white px-3 py-1 text-xs font-mono tracking-wider border border-white flex items-center gap-2">
                  <Lightbulb className="w-3 h-3" />
                  EXPLANATION RESULT
                </span>
              </div>
              
              <div className="space-y-4">
                <div className="border border-black p-1 inline-block">
                  <h3 className="font-bold text-lg text-black tracking-wider uppercase px-2">
                    Task 2 (For Loop) is more challenging!
                  </h3>
                </div>
                
                <div className="border border-black p-4 bg-gray-50">
                  <p className="text-black leading-relaxed font-mono text-sm">
                    The <span className="bg-blue-200 px-1 border border-black font-bold">FOR LOOP TASK</span> is more challenging because it requires understanding <span className="bg-yellow-200 px-1 border border-black font-bold">MULTIPLE CONCEPTS</span> working together: <span className="bg-green-200 px-1 border border-black font-bold">LOOP SYNTAX</span>, the <span className="bg-purple-200 px-1 border border-black font-bold">RANGE() FUNCTION</span>, <span className="bg-red-200 px-1 border border-black font-bold">VARIABLE ACCUMULATION</span>, and <span className="bg-orange-200 px-1 border border-black font-bold">LOGICAL FLOW CONTROL</span>.
                    <br /><br />
                    <span className="bg-green-200 px-1 border border-black font-bold">VARIABLE DECLARATION</span> is more straightforward - it's just <span className="bg-yellow-200 px-1 border border-black font-bold">ASSIGNING VALUES TO NAMES</span>. For loops require understanding how <span className="bg-purple-200 px-1 border border-black font-bold">ITERATION</span> works and how to maintain <span className="bg-blue-200 px-1 border border-black font-bold">STATE</span> across multiple iterations, making it <span className="bg-red-200 px-1 border border-black font-bold">COGNITIVELY MORE DEMANDING</span>.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Continue Button */}
          {showTellMe2 && (
            <div className="flex justify-center">
              <button
                onClick={() => scroll(10)}
                className="px-8 py-4 bg-black text-white border-2 border-black font-bold text-lg uppercase tracking-wider hover:bg-white hover:text-black transition-all transform hover:scale-105 flex items-center gap-3 font-mono relative group"
              >
                <span>CONTINUE</span>
                <div className="w-6 h-6 border border-white group-hover:border-black flex items-center justify-center">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};