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
    <div className="bg-gray-900 min-h-screen font-mono relative overflow-hidden">
      {/* Pixel grid background */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'linear-gradient(to right, #1f2937 1px, transparent 1px), linear-gradient(to bottom, #1f2937 1px, transparent 1px)',
          backgroundSize: '8px 8px'
        }}
      />
      
      {/* Animated pixel stars */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      <div className="relative flex-1 px-8 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Main Title Section */}
          <div className="border-4 border-cyan-400 p-6 bg-gray-800 mb-8 relative pixel-shadow">
            {/* Pixel corner brackets */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-cyan-400"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-cyan-400"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-cyan-400"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-cyan-400"></div>
            
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="w-full h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-pulse" />
            </div>
            
            <div className="text-center space-y-4 relative z-10">
              <div className="inline-block border-2 border-yellow-400 bg-yellow-400 px-4 py-2 mb-3 pixel-shadow">
                <span className="text-xs tracking-wider font-bold text-black">CHALLENGE-001</span>
              </div>
              <h1 className="text-4xl font-bold uppercase tracking-wider text-white pixel-text mb-4">
                <span className="text-cyan-400">Code</span>
                <span className="text-yellow-400"> Challenge</span>
              </h1>
              <div className="bg-gray-700 border-2 border-gray-600 p-4 max-w-4xl mx-auto pixel-shadow">
                <p className="text-sm font-mono leading-relaxed text-green-400 pixel-text">
                  &gt; ANALYZE THE FOLLOWING CODE SEQUENCE
                  <br />
                  &gt; PREDICT OUTPUT BEHAVIOR
                  <br />
                  &gt; INTERACTIVE LEARNING MODULE
                </p>
              </div>
            </div>
          </div>

          {/* Main Content Card */}
          <div className="border-4 border-blue-400 bg-gray-800 p-6 relative pixel-shadow">
            {/* Pixel corner decorations */}
            <div className="absolute top-1 right-1 w-3 h-3 bg-white opacity-60" />
            <div className="absolute bottom-1 left-1 w-3 h-3 bg-white opacity-60" />
            
            {/* Retro scan lines effect */}
            <div 
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
              }}
            />
            
            {/* Module header */}
            <div className="flex items-center justify-center mb-6">
              <div className="bg-purple-600 border-2 border-purple-400 px-6 py-3 pixel-shadow">
                <span className="text-white font-bold text-sm tracking-wider">INTERACTIVE MODULE</span>
              </div>
            </div>

            {/* Hint Section */}
            <div className="border-4 border-yellow-400 p-4 bg-yellow-600 mb-6 relative pixel-shadow">
              <div className="absolute top-1 left-1 w-3 h-3 bg-white opacity-60" />
              <div className="absolute -top-4 left-4 px-3 py-2 bg-yellow-400 border-2 border-yellow-300 text-black font-bold text-xs tracking-wider flex items-center gap-2 pixel-shadow">
                <Lightbulb className="w-4 h-4" />
                HINT
              </div>
              <p className="text-sm font-mono text-black text-center uppercase tracking-wide font-bold pixel-text">
                It's what we're going to be learning about today!
              </p>
            </div>

            {/* Code Block */}
            <div className="border-4 border-green-400 p-4 bg-black mb-6 relative pixel-shadow">
              <div className="absolute top-1 left-1 w-3 h-3 bg-green-400 opacity-60" />
              <div className="absolute -top-4 left-4 px-3 py-2 bg-green-400 border-2 border-green-300 text-black font-bold text-xs tracking-wider flex items-center gap-2 pixel-shadow">
                <Code className="w-4 h-4" />
                PYTHON CODE
              </div>
              <div className="text-green-400 font-mono text-lg leading-relaxed relative z-10">
                <div className="mb-2">word = "nohtyp"</div>
                <div className="mb-2">manipulated_word = word[::-1]</div>
                <div>print(manipulated_word)</div>
              </div>
            </div>

            {/* Input Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <div className="border-2 border-cyan-400 bg-cyan-400 px-3 py-2 mb-3 inline-block pixel-shadow">
                  <span className="text-xs tracking-wider font-bold text-black">INPUT FIELD</span>
                </div>
                <input
                  type="text"
                  placeholder="TYPE GUESS HERE..."
                  value={guess1}
                  onChange={(e) => setGuess1(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full px-4 py-3 border-4 border-cyan-400 bg-gray-800 text-white font-mono text-lg font-bold placeholder-gray-400 tracking-wide focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900 pixel-shadow"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={handleSubmitGuess1}
                  disabled={!guess1.trim()}
                  className="w-full px-6 py-3 bg-red-600 text-white border-4 border-red-400 font-mono font-bold uppercase tracking-wide hover:bg-red-700 hover:border-red-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm group pixel-shadow transform hover:scale-105"
                >
                  Submit Guess
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform animate-bounce" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .pixel-shadow {
          box-shadow: 
            4px 4px 0px rgba(0, 0, 0, 0.8),
            8px 8px 0px rgba(0, 0, 0, 0.4);
        }
        
        .pixel-text {
          text-shadow: 
            2px 2px 0px rgba(0, 0, 0, 0.8),
            4px 4px 0px rgba(0, 0, 0, 0.4);
        }
      `}</style>
    </div>
  );
};