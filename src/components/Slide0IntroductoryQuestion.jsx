import React from 'react';
import { Code, ArrowRight, Lightbulb } from 'lucide-react';

export const Slide0IntroductoryQuestion = ({ guess1, setGuess1, scroll }) => {
  const handleSubmitGuess1 = () => guess1.trim() && scroll(1);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmitGuess1();
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center py-8 px-4 md:px-10 text-black font-['IBM_Plex_Mono',monospace]">
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">
        
        {/* Main Title */}
        <div className="text-center border-b-8 border-black pb-6 mb-2">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight uppercase leading-tight mb-4" style={{ letterSpacing: "-0.04em" }}>
            Code Challenge
          </h1>
          <p className="text-xl md:text-2xl font-medium tracking-tight text-gray-600">
            What is the output of the following code?
          </p>
        </div>

        {/* Main Content Card */}
        <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg">
          
          {/* Hint Section */}
          <div className="border-4 border-yellow-400 rounded-xl p-6 bg-yellow-50 mb-8 relative">
            <div className="absolute -top-6 left-4 px-3 py-1 bg-yellow-400 text-black font-semibold rounded-md text-xs tracking-wider flex items-center gap-2 border-2 border-black">
              <Lightbulb className="w-4 h-4" />
              HINT
            </div>
            <p className="text-lg font-semibold text-center text-black uppercase tracking-wide">
              It's what we're going to be learning about today!
            </p>
          </div>

          {/* Code Block */}
          <div className="border-4 border-black rounded-xl p-6 bg-gray-900 mb-8 relative shadow-lg">
            <div className="absolute -top-6 left-4 px-3 py-1 bg-black text-white font-semibold text-xs tracking-wider flex items-center gap-2">
              <Code className="w-4 h-4" />
              PYTHON CODE
            </div>
            <div className="text-green-400 font-mono text-lg md:text-xl leading-relaxed">
              <div className="mb-2">word = "nohtyp"</div>
              <div className="mb-2">manipulated_word = word[::-1]</div>
              <div>print(manipulated_word)</div>
            </div>
          </div>

          {/* Input Section */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block font-semibold text-lg mb-2 uppercase tracking-wide">
                Your Guess:
              </label>
              <input
                type="text"
                placeholder="TYPE GUESS HERE..."
                value={guess1}
                onChange={(e) => setGuess1(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-4 border-4 border-black rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 bg-white text-black font-mono text-lg font-semibold placeholder-gray-400 tracking-wide"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleSubmitGuess1}
                disabled={!guess1.trim()}
                className="px-8 py-4 bg-black text-white border-4 border-black rounded-lg font-semibold uppercase tracking-wide hover:bg-white hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-lg"
              >
                Submit Guess
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};