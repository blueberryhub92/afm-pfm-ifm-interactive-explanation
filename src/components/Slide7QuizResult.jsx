import { useState } from 'react';
import { Brain, Target, HelpCircle, ArrowRight, CheckCircle, XCircle } from 'lucide-react';

export const Slide7QuizResult = ({ guess2, scroll, showTellMe, setShowTellMe }) => {
  
  const handleTellMe = () => {
    setShowTellMe(true);
  };

  const isCorrect = guess2?.toLowerCase() === 'dog';

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
        <div className="max-w-6xl mx-auto">

          {/* Results Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            
            {/* Your Guess Section */}
            <div className="border-2 border-black p-6 bg-white relative">
              {/* Technical corner marker */}
              <div className="absolute top-2 right-2 w-2 h-2 border border-black bg-white" />
              
              {/* Module label */}
              <div className="absolute -top-4 left-4">
                <span className="bg-black text-white px-3 py-1 text-xs font-mono tracking-wider border border-black">
                  USER INPUT
                </span>
              </div>
              
              <div className="mt-4 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 border border-black flex items-center justify-center bg-white">
                    <Brain className="w-4 h-4 text-black" />
                  </div>
                  <span className="text-sm font-mono text-black">YOUR GUESS</span>
                </div>
                
                <div className="text-center">
                  <div className="inline-block border-2 border-black px-6 py-3 bg-white">
                    <span className="text-2xl font-bold tracking-wider uppercase text-black">
                      {guess2 || 'NO INPUT'}
                    </span>
                  </div>
                </div>
                
                {/* Status indicator */}
                <div className="text-center">
                  <div className={`inline-flex items-center gap-2 px-3 py-1 border ${isCorrect ? 'border-green-600 bg-green-50' : 'border-red-600 bg-red-50'}`}>
                    {isCorrect ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-600" />
                    )}
                    <span className={`text-xs font-mono tracking-wider ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                      {isCorrect ? 'CORRECT' : 'INCORRECT'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Answer Section */}
            <div className="border-2 border-black p-6 bg-black text-white relative">
              {/* Technical corner marker */}
              <div className="absolute top-2 right-2 w-2 h-2 border border-white bg-black" />
              
              {/* Module label */}
              <div className="absolute -top-4 left-4">
                <span className="bg-white text-black px-3 py-1 text-xs font-mono tracking-wider border border-black">
                  SOLUTION
                </span>
              </div>
              
              <div className="mt-4 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 border border-white flex items-center justify-center bg-black">
                    <Target className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-mono text-white">CORRECT ANSWER</span>
                </div>
                
                <div className="text-center">
                  <div className="inline-block border-2 border-white px-6 py-3 bg-black">
                    <span className="text-2xl font-bold tracking-wider uppercase text-white">
                      DOG
                    </span>
                  </div>
                </div>
                
                {/* Image display */}
                <div className="text-center">
                  <div className="inline-block border-2 border-white p-2 bg-black">
                    <img
                      src="dog.jpg"
                      alt="dog"
                      className="w-24 h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Question Section */}
          <div className="border-2 border-black p-6 bg-white mb-6 relative">
            {/* Technical corner brackets */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black"></div>
            
            <div className="text-center space-y-4">
              <div className="inline-block border border-black px-3 py-1 mb-2">
                <span className="text-xs tracking-wider font-mono">ANALYSIS QUERY</span>
              </div>
              
              <p className="text-lg font-mono leading-relaxed text-black max-w-3xl mx-auto">
                Did you get it right? Hopefully, that question was easier than the first one.
                <br />
                <span className="font-bold uppercase tracking-wider">So what do you think happened?</span>
              </p>
              
              {!showTellMe && (
                <div className="mt-6">
                  <button
                    onClick={handleTellMe}
                    className="bg-black text-white px-6 py-3 border-2 border-black font-mono tracking-wider uppercase hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-2 mx-auto"
                  >
                    <HelpCircle className="w-4 h-4" />
                    Tell me!
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Explanation Section */}
          {showTellMe && (
            <div className="border-2 border-black p-6 bg-white mb-6 relative">
              {/* Technical corner marker */}
              <div className="absolute top-2 right-2 w-2 h-2 border border-black bg-white" />
              
              {/* Module label */}
              <div className="absolute -top-4 left-4">
                <span className="bg-black text-white px-3 py-1 text-xs font-mono tracking-wider border border-black">
                  AFM CONNECTION
                </span>
              </div>
              
              <div className="mt-4 space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 border border-black flex items-center justify-center bg-white">
                    <Brain className="w-4 h-4 text-black" />
                  </div>
                  <span className="text-lg font-mono font-bold text-black tracking-wider uppercase">
                    The AFM Connection
                  </span>
                </div>
                
                <div className="border border-black p-4 bg-gray-50">
                  <p className="text-black leading-relaxed font-mono text-sm">
                    Well, this is connected to our next AFM parameter:{" "}
                    <span className="border border-black px-2 py-1 bg-white font-bold">T</span>. 
                    {" "}T<sub>ik</sub> represents how many times a student{" "}
                    <em className="border border-black px-1 bg-white">i</em> has practiced skill{" "}
                    <em className="border border-black px-1 bg-white">k</em>. 
                    This is a key input to the AFM model. Look at the tooltip at the bottom right and see how the AFM formula expands.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Continue Button */}
          {showTellMe && (
            <div className="text-center">
              <button
                onClick={() => scroll(7)}
                className="bg-black text-white px-8 py-4 border-2 border-black font-mono tracking-wider uppercase hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-2 mx-auto text-lg"
              >
                Continue
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};