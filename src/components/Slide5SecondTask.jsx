import React from 'react';
import { Code, ArrowRight, Terminal } from 'lucide-react';

export const Slide5SecondTask = ({ scroll }) => {
  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center py-8 px-4 md:px-10 text-black font-['IBM_Plex_Mono',monospace]">
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">
        {/* Task Description */}
        <div className="border-4 border-black rounded-xl p-6 bg-white relative shadow-lg">
          <div className="absolute -top-6 left-4 px-3 py-1 bg-black text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
            <Code className="w-4 h-4" />
            PYTHON TASK
          </div>
          <div className="text-center mb-6">
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-black mb-2">
              Let's tackle another task on the same skill
            </h3>
          </div>

          {/* Code Block - Updated to match Slide0 style */}
          <div className="border-4 border-black rounded-xl p-6 bg-gray-900 mb-8 relative shadow-lg">
            
            <div className="text-green-400 font-mono text-lg md:text-xl leading-relaxed">
              <div className="mb-2">message = "dlokgm"</div>
              <div className="mb-2">result = message[::2]</div>
              <div>print(result)</div>
            </div>
          </div>

          
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <button
            onClick={() => scroll(6)}
            className="px-8 py-4 bg-purple-600 text-white border-4 border-black rounded-lg font-semibold uppercase tracking-wide hover:bg-white hover:text-purple-600 hover:border-purple-600 transition-all shadow-lg flex items-center gap-3 mx-auto text-xl"
          >
            Continue
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};