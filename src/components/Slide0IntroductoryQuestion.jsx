import React from 'react';
import { Code, ArrowRight, Lightbulb } from 'lucide-react';

export const Slide0IntroductoryQuestion = ({ guess1, setGuess1, scroll }) => {
  const handleSubmitGuess1 = () => guess1.trim() && scroll(2);
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmitGuess1();
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
        <div className="max-w-4xl mx-auto">
          {/* Main Title Section */}
          <div className="border-2 border-black p-4 bg-white mb-6 relative">
            {/* Technical corner brackets */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-black"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-black"></div>
            
            <div className="text-center space-y-3">
              <div className="inline-block border border-black px-3 py-1 mb-2">
                <span className="text-xs tracking-wider font-mono">CHALLENGE-001</span>
              </div>
              <h1 className="text-3xl font-bold uppercase tracking-wider text-black">
                Code Challenge
              </h1>
              <p className="text-sm font-mono leading-relaxed text-black">
                ANALYZE THE FOLLOWING CODE SEQUENCE AND PREDICT OUTPUT
              </p>
            </div>
          </div>

          {/* Main Content Card */}
          <div className="border-2 border-black bg-white p-6 relative">
            {/* Technical drawing corner marker */}
            <div className="absolute top-2 right-2 w-2 h-2 border border-black bg-white" />
            
            {/* Dimension lines */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-white border border-black px-3 py-1 text-xs font-mono tracking-wider">
                INTERACTIVE MODULE
              </span>
            </div>

            {/* Hint Section */}
            <div className="border-2 border-black p-4 bg-yellow-50 mb-6 relative">
              <div className="absolute top-2 left-2 w-2 h-2 border border-black bg-yellow-50" />
              <div className="absolute -top-3 left-4 px-2 py-1 bg-yellow-50 border border-black text-black font-mono text-xs tracking-wider flex items-center gap-2">
                <Lightbulb className="w-3 h-3" />
                HINT
              </div>
              <p className="text-sm font-mono text-black text-center uppercase tracking-wide">
                It's what we're going to be learning about today!
              </p>
            </div>

            {/* Code Block */}
            <div className="border-2 border-black p-4 bg-black mb-6 relative">
              <div className="absolute top-2 left-2 w-2 h-2 border border-white bg-black" />
              <div className="absolute -top-3 left-4 px-2 py-1 bg-black border border-white text-white font-mono text-xs tracking-wider flex items-center gap-2">
                <Code className="w-3 h-3" />
                PYTHON CODE
              </div>
              <div className="text-green-400 font-mono text-lg leading-relaxed">
                <div className="mb-2">word = "nohtyp"</div>
                <div className="mb-2">manipulated_word = word[::-1]</div>
                <div>print(manipulated_word)</div>
              </div>
            </div>

            {/* Input Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <div className="border border-black px-2 py-1 mb-2 inline-block">
                  <span className="text-xs tracking-wider font-mono">INPUT FIELD</span>
                </div>
                <input
                  type="text"
                  placeholder="TYPE GUESS HERE..."
                  value={guess1}
                  onChange={(e) => setGuess1(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full px-4 py-3 border-2 border-black bg-white text-black font-mono text-lg font-semibold placeholder-gray-400 tracking-wide focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={handleSubmitGuess1}
                  disabled={!guess1.trim()}
                  className="w-full px-6 py-3 bg-black text-white border-2 border-black font-mono font-semibold uppercase tracking-wide hover:bg-white hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm group"
                >
                  Submit Guess
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};