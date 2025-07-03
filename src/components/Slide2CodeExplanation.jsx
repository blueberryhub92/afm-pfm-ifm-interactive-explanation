import React from 'react';
import { Code, Zap, ArrowRight, Target, RefreshCw, CheckCircle } from 'lucide-react';

export const Slide2CodeExplanation = ({ scroll }) => {
  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center py-8 px-4 md:px-10 text-black font-['IBM_Plex_Mono',monospace]">
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-8">
        
        

        {/* Step by Step Explanation */}
        <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg">
          <div className="flex items-center gap-2 mb-6 font-semibold text-2xl text-black">
            <Target className="w-8 h-8 text-blue-700" />
            STEP BY STEP EXECUTION
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Left Column - Steps */}
            <div className="space-y-4">
              
              {/* Step 1 */}
              <div className="border-4 border-blue-400 rounded-xl p-4 bg-blue-50">
                <div className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  VARIABLE ASSIGNMENT
                </div>
                <p className="font-mono text-black">word = "nohtyp"</p>
                <p className="text-sm text-blue-700 mt-1">String stored in memory</p>
              </div>

              {/* Step 2 */}
              <div className="border-4 border-purple-400 rounded-xl p-4 bg-purple-50">
                <div className="font-bold text-purple-800 mb-2 flex items-center gap-2">
                  <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  SLICE OPERATION
                </div>
                <p className="font-mono text-black">word[::-1]</p>
                <p className="text-sm text-purple-700 mt-1">Reverse the string using slice notation</p>
              </div>

              {/* Step 3 */}
              <div className="border-4 border-green-400 rounded-xl p-4 bg-green-50">
                <div className="font-bold text-green-800 mb-2 flex items-center gap-2">
                  <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  OUTPUT
                </div>
                <p className="font-mono text-black">print(reversed_word)</p>
                <p className="text-sm text-green-700 mt-1">Display the result</p>
              </div>

              {/* Final Answer */}
              <div className="border-4 border-green-600 rounded-xl p-4 bg-green-50 relative">
                <div className="absolute -top-6 left-4 px-3 py-1 bg-green-600 text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2 border-2 border-black">
                  <CheckCircle className="w-4 h-4" />
                  FINAL ANSWER
                </div>
                <div className="text-center mt-2">
                  <div className="bg-black text-green-400 p-4 rounded-xl font-mono text-2xl font-bold border-4 border-green-600">
                    python
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Detailed Explanation */}
            <div className="border-4 border-orange-400 rounded-xl p-6 bg-orange-50 relative">
              <div className="absolute -top-6 left-4 px-3 py-1 bg-orange-400 text-black font-semibold rounded-md text-xs tracking-wider flex items-center gap-2 border-2 border-black">
                <Zap className="w-4 h-4" />
                THE MAGIC
              </div>
              <div className="space-y-4 text-black">
                <div>
                  <p className="font-bold text-lg mb-2">[::-1] SLICE NOTATION:</p>
                  <ul className="list-disc ml-5 space-y-1 text-sm">
                    <li>Start: Empty (beginning)</li>
                    <li>End: Empty (end)</li>
                    <li>Step: -1 (backwards)</li>
                  </ul>
                </div>
                <div className="bg-white border-2 border-black p-3 rounded font-mono text-center">
                  <div className="text-orange-600">"nohtyp"</div>
                  <div className="my-2">
                    <RefreshCw className="w-6 h-6 mx-auto text-black" />
                  </div>
                  <div className="text-green-600 font-bold">"python"</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <button
            onClick={() => scroll(3)}
            className="px-12 py-4 bg-black text-white border-4 border-black rounded-xl font-semibold uppercase tracking-wide hover:bg-white hover:text-black transition-all text-xl flex items-center gap-3 mx-auto shadow-lg"
          >
            Continue Journey
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};