import React from 'react';
import { Brain, Terminal, Zap, ArrowRight, Target, Code } from 'lucide-react';

export const Slide6Quiz = ({ guess2, setGuess2, scroll }) => {
  const handleSubmitGuess2 = () => guess2.trim() && scroll(6);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmitGuess2();
    }
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
        <div className="max-w-5xl mx-auto flex flex-col gap-8">
          
          {/* Quiz Section */}
          <div className="border-2 border-black p-6 bg-white relative">
            {/* Technical corner brackets */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-black"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-black"></div>
            
            {/* Module identifier */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-black text-white px-3 py-1 text-xs font-mono tracking-wider border border-white flex items-center gap-2">
                <Brain className="w-3 h-3" />
                QUIZ MODULE
              </span>
            </div>
            
            <div className="text-center mb-6">
              <h3 className="text-2xl md:text-3xl font-bold tracking-wider uppercase text-black mb-4">
                LET'S TACKLE ANOTHER TASK ON THE SAME SKILL
              </h3>
              <div className="inline-flex items-center gap-2 bg-white border-2 border-black px-4 py-2">
                <Target className="w-5 h-5 text-black" />
                <span className="text-lg font-bold text-black tracking-wide uppercase">
                  What will this code output?
                </span>
              </div>
            </div>

            {/* Code Block */}
            <div className="border-2 border-black p-6 bg-black mb-8 relative">
              {/* Technical corner marker */}
              <div className="absolute top-2 right-2 w-2 h-2 border border-white bg-black" />
              
              {/* Module label */}
              <div className="absolute -top-4 left-4">
                <span className="bg-white text-black px-3 py-1 text-xs font-mono tracking-wider border border-black flex items-center gap-2">
                  <Code className="w-3 h-3" />
                  PYTHON CODE
                </span>
              </div>
              
              <div className="text-green-400 font-mono text-lg md:text-xl leading-relaxed">
                <div className="mb-2">message = "dlokgm"</div>
                <div className="mb-2">result = message[::2]</div>
                <div>print(result)</div>
              </div>
            </div>

            {/* Hint */}
            <div className="bg-white border-2 border-black p-4 mb-6 relative">
              {/* Technical corner brackets */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-black"></div>
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-black"></div>
              
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 border border-black flex items-center justify-center bg-white">
                  <Zap className="w-4 h-4 text-black" />
                </div>
                <span className="font-bold text-black uppercase tracking-wide">Hint</span>
              </div>
              <p className="text-sm font-mono text-black leading-relaxed">
                This uses a different <span className="bg-black text-white px-2 py-1 font-mono">step value</span> than our first example!
              </p>
            </div>
          </div>

          {/* Input Section */}
          <div className="border-2 border-black p-6 bg-white relative">
            {/* Technical corner brackets */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-black"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-black"></div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-lg font-bold text-black mb-2 uppercase tracking-wide">
                  Your Guess:
                </label>
                <input
                  type="text"
                  placeholder="TYPE YOUR GUESS HERE..."
                  value={guess2}
                  onChange={(e) => setGuess2(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black bg-white text-black font-mono text-lg font-semibold placeholder-gray-400 tracking-wide"
                  style={{ textTransform: 'none' }}
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={handleSubmitGuess2}
                  disabled={!guess2.trim()}
                  className={`px-6 py-3 border-2 border-black font-semibold uppercase tracking-wide transition-all flex items-center gap-3 text-lg transform hover:scale-105 ${
                    guess2.trim() 
                      ? 'bg-black text-white hover:bg-white hover:text-black' 
                      : 'bg-white text-gray-400 cursor-not-allowed border-gray-400'
                  }`}
                >
                  Submit Guess!
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};