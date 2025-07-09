import React from 'react';
import { Eye, CheckCircle, ArrowRight, Brain } from 'lucide-react';

export const Slide1GuessResult = ({ guess1, scroll }) => {
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
        <div className="max-w-4xl mx-auto flex flex-col gap-8 py-8">
          
          {/* Guess Display - Technical Card Style */}
          <div className="bg-white text-black border-3 border-black p-6 relative transform transition-all duration-300">
            {/* Technical drawing corner marker */}
            <div className="absolute top-2 right-2 w-2 h-2 border border-black bg-white" />
            
            {/* Module label */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-black text-white px-3 py-1 text-xs font-mono tracking-wider border border-white flex items-center gap-2">
                <Eye className="w-3 h-3" />
                USER INPUT
              </span>
            </div>
            
            {/* Technical corner brackets */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-black"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-black"></div>
            
            <div className="text-center pt-4">
              <p className="text-2xl md:text-3xl font-bold text-black uppercase tracking-wider font-mono">
                "{guess1}"
              </p>
            </div>
          </div>

          {/* Main Content Container */}
          <div className="bg-white text-black border-2 border-black p-8 relative">
            {/* Technical drawing corner marker */}
            <div className="absolute top-2 right-2 w-2 h-2 border border-black bg-white" />
            
            {/* Python Recognition Analysis */}
            <div className="bg-black text-white border-3 border-black p-6 mb-8 relative transform transition-all duration-300">
              {/* Technical drawing corner marker */}
              <div className="absolute top-2 right-2 w-2 h-2 border border-white bg-black" />
              
              {/* Module label */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-white text-black px-3 py-1 text-xs font-mono tracking-wider border border-black flex items-center gap-2">
                  <Brain className="w-3 h-3" />
                  COGNITIVE ANALYSIS
                </span>
              </div>
              
              {/* Dimension lines */}
              <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 rotate-90">
                <div className="w-4 h-px bg-black"></div>
              </div>
              
              <div className="pt-4">
                <p className="text-lg font-mono leading-relaxed text-center text-white">
                  YOU MAY HAVE RECOGNIZED THE PROGRAMMING LANGUAGE ABOVE AS{" "}
                  <span className="bg-white text-black px-2 py-1 font-mono uppercase tracking-wider border border-white">
                    PYTHON
                  </span>
                  , BUT CHANCES ARE, YOU PROBABLY DIDN'T KNOW HOW TO SOLVE THE TASK.
                </p>
              </div>
            </div>

            {/* Ready for Answer Section */}
            <div className="text-center border-2 border-black p-6 bg-white relative">
              {/* Technical corner brackets */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-black"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-black"></div>
              
              <div className="inline-block border border-black px-3 py-1 mb-4">
                <span className="text-xs tracking-wider font-mono">SYSTEM READY</span>
              </div>
              
              <p className="text-2xl font-bold text-black mb-6 uppercase tracking-wider font-mono">
                READY FOR THE ANSWER?
              </p>
              
              <button
                onClick={() => scroll(3)}
                className="px-8 py-4 bg-black text-white border-2 border-black font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-all text-lg flex items-center gap-3 mx-auto transform hover:scale-105 duration-300 cursor-pointer"
              >
                <div className="w-6 h-6 border border-current flex items-center justify-center bg-current">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                YES! SHOW ME
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};