import { useState } from "react";
import { Target, Eye, ArrowRight, BarChart3 } from 'lucide-react';

export const Slide9SuccessProbabilityProgress = ({ scroll }) => {
  const [gotItClicked, setGotItClicked] = useState(false);
  
  return (
    <div className="bg-white min-h-screen flex flex-col items-center py-8 px-4 md:px-10 text-black font-['IBM_Plex_Mono',monospace]">
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">
        {/* Main Content */}
        <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative">
          <div className="absolute -top-6 left-4 px-3 py-1 bg-orange-600 text-white font-bold rounded-md text-xs tracking-wider flex items-center gap-2">
            <Target className="w-4 h-4" />
            SUCCESS PROBABILITY
          </div>
          
          <div className="space-y-6 text-center">
            <div className="bg-orange-50 border-2 border-black rounded-lg p-4">
              <p className="text-lg font-semibold text-black leading-relaxed">
                AFM estimates the probability that a student answers the next task
                on a specific skill correctly. As it will turn out,{" "}
                <span className="bg-purple-200 px-2 py-1 rounded border-2 border-black font-bold">T</span>
                {" "}helps to update the success probability over time.
              </p>
            </div>
            
            <div className="bg-blue-50 border-2 border-black rounded-lg p-4">
              <p className="text-lg font-semibold text-black leading-relaxed">
                Let's track your own journey to mastery! You can see your current
                success probability within the{" "}
                <span className="bg-yellow-200 px-2 py-1 rounded border-2 border-black font-bold">
                  bar at the top of the page
                </span>.{" "}
                <span className="bg-green-200 px-2 py-1 rounded border-2 border-black font-italic">
                  Hover over the bar to see probabilities.
                </span>
              </p>
            </div>
            
            {!gotItClicked && (
              <button
                onClick={() => setGotItClicked(true)}
                className="px-6 py-3 bg-green-600 text-white border-4 border-black rounded-lg font-bold uppercase hover:bg-white hover:text-green-700 hover:border-green-800 transition-all shadow-lg flex items-center gap-2 mx-auto text-lg"
              >
                <Eye className="w-5 h-5" />
                Got it!
              </button>
            )}
          </div>
        </div>
        
        {/* Next Section */}
        {gotItClicked && (
          <div className="border-l-8 border-blue-600 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 shadow-lg animate-fadeIn">
            <div className="flex items-center gap-2 mb-4 font-bold text-xl text-blue-800">
              <BarChart3 className="w-6 h-6" />
              Ready to Continue
            </div>
            
            <div className="bg-white border-2 border-black rounded-lg p-4 mb-4">
              <p className="text-lg font-semibold text-black">
                Alright, let's continue learning about more parameters!
              </p>
            </div>
            
            <div className="text-center">
              <button
                onClick={() => scroll(10)}
                className="px-8 py-4 bg-blue-600 text-white border-4 border-black rounded-lg font-bold uppercase hover:bg-white hover:text-blue-700 hover:border-blue-800 transition-all shadow-lg flex items-center gap-2 mx-auto text-lg"
              >
                Next
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};