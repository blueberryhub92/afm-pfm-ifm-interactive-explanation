import React from 'react';
import { Code, Play, Target, FileText } from "lucide-react";

// Mock hook for demonstration - replace with your actual hook
const useProbability = () => ({
  updateProbability: (prob) => console.log(`Probability updated to: ${prob}`)
});

export const Slide10TwoPythonTasks = ({ scroll = (n) => console.log(`Scroll to: ${n}`) }) => {
  const { updateProbability } = useProbability();
  
  const handleStartTask = () => {
    updateProbability(0.30);
    scroll(11);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center py-8 px-4 md:px-10 text-black font-['IBM_Plex_Mono',monospace]">
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">
        
        {/* Main Header */}
        <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg">
          <div className="absolute -top-6 left-4 px-3 py-1 bg-black text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
            <Code className="w-4 h-4" />
            PYTHON CHALLENGE
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-black text-center tracking-tight mb-2">
            Try the following two Python tasks:
          </h1>
        </div>

        {/* Task Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Task 1 */}
          <div className="border-4 border-black rounded-xl p-6 bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-green-500 border-4 border-black rounded-full flex items-center justify-center text-white font-bold text-3xl mb-4 shadow-lg">
                1
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
          <div className="border-4 border-black rounded-xl p-6 bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-orange-500 border-4 border-black rounded-full flex items-center justify-center text-white font-bold text-3xl mb-4 shadow-lg">
                2
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

        {/* Action Button */}
        <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg text-center">
          <div className="mb-4">
            <div className="text-lg font-semibold text-neutral-600 mb-2">
              Ready to begin your Python journey?
            </div>
            <div className="text-sm text-neutral-500 font-mono">
              Click below to start with Task 1: Variable Declaration
            </div>
          </div>
          
          <button
            onClick={handleStartTask}
            className="px-12 py-4 bg-black text-white border-4 border-black rounded-xl font-bold text-xl uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300 shadow-lg hover:shadow-2xl flex items-center gap-3 mx-auto group"
          >
            <Play className="w-6 h-6 group-hover:animate-pulse" />
            START TASK
            <div className="w-6 h-6 bg-green-500 border-2 border-white rounded-full flex items-center justify-center text-white font-bold text-sm">
              1
            </div>
          </button>
        </div>

        
      </div>
    </div>
  );
};