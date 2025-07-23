import React from 'react';
import { Eye, CheckCircle, ArrowRight, Brain } from 'lucide-react';

export const ProbabilityGuessResult = ({ guess1, navigate }) => {
  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center py-8 px-4 md:px-10 text-black font-['IBM_Plex_Mono',monospace]">
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">

        {/* Guess Display */}
        <div className="border-4 border-orange-400 rounded-xl p-8 bg-orange-50 shadow-lg relative">
          <div className="absolute -top-6 left-4 px-3 py-1 bg-orange-400 text-black font-semibold rounded-md text-xs tracking-wider flex items-center gap-2 border-2 border-black">
            <Eye className="w-4 h-4" />
            YOUR ANSWER
          </div>
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-bold text-orange-800 uppercase tracking-wide font-mono">
              "{guess1}"
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg">

          {/* Python Recognition */}
          <div className="border-4 border-blue-400 rounded-xl p-6 bg-blue-50 mb-8 relative">
            <div className="absolute -top-6 left-4 px-3 py-1 bg-blue-400 text-black font-semibold rounded-md text-xs tracking-wider flex items-center gap-2 border-2 border-black">
              <Brain className="w-4 h-4" />
              ANALYSIS
            </div>
            <p className="text-lg font-semibold text-center text-black leading-relaxed">
              You may have recognized the programming language above as{" "}
              <span className="bg-black text-white px-2 py-1 rounded font-mono uppercase tracking-wide">
                Python
              </span>
              , but chances are, you probably didn't know how to solve the task.
            </p>
          </div>

          {/* Transition to Probability Estimation */}
          <div className="text-center">
            <p className="text-lg text-black mb-6 leading-relaxed">
              What do you think chances are that you answer the <span className="bg-yellow-200 px-2 py-1 border-2 border-black rounded font-bold uppercase">next programming task</span> correctly? Can you estimate your probability of success?
            </p>

            <button
              onClick={() => navigate(3)}
              className="px-12 py-4 bg-black text-white border-4 border-black rounded-xl font-semibold uppercase tracking-wide hover:bg-white hover:text-black transition-all text-xl flex items-center gap-3 mx-auto shadow-lg"
            >
              <Brain className="w-6 h-6" />
              Estimate my probability
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>

  );
};