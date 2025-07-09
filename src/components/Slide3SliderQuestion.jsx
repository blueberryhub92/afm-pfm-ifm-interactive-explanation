import { useState } from "react";
import { Target, TrendingUp, Lightbulb, Code, ArrowRight, Zap } from "lucide-react";

export const Slide3SliderQuestion = ({ scroll, onDoneClick }) => {
  const [sliderValue, setSliderValue] = useState(50);
  const [showAfmSection, setShowAfmSection] = useState(false);
  const [hoveredTerm, setHoveredTerm] = useState(null);

  const handleDoneClick = () => {
    setShowAfmSection(true);
    // Notify parent component that Done was clicked
    if (onDoneClick) {
      onDoneClick();
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
      
      <div className="relative flex flex-col items-center justify-center py-8 px-4 md:px-10 text-white">
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-8">
          
          {/* Main Question Block with Slider */}
          <div className="border-4 border-cyan-400 p-8 bg-gray-800 w-full max-w-3xl relative pixel-shadow">
            {/* Pixel corner brackets */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-cyan-400"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-cyan-400"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-cyan-400"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-cyan-400"></div>
            
            {/* Technical header label */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div className="bg-yellow-400 text-black px-4 py-2 text-xs font-bold tracking-wider border-2 border-yellow-300 pixel-shadow flex items-center gap-2">
                <Target className="w-3 h-3" />
                PROBABILITY ESTIMATION
              </div>
            </div>
            
            {/* Retro scan lines effect */}
            <div 
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
              }}
            />
            
            <div className="text-xl md:text-2xl font-bold tracking-wider text-cyan-400 text-center mb-8 leading-relaxed uppercase pixel-text relative z-10">
              Don't worry if you got it wrong, though. What do you think the chances are that someone who doesn't know Python would have guessed the answer correctly by chance?
            </div>
            
            {/* Slider Container Box */}
            <div className="border-4 border-blue-400 p-6 bg-gray-700 space-y-6 relative pixel-shadow">
              {/* Pixel corner decoration */}
              <div className="absolute top-2 right-2 w-4 h-4 bg-yellow-400 pixel-shadow" />

              <div className="text-center mb-4">
                <div className="inline-block bg-purple-600 border-2 border-purple-400 px-3 py-1 mb-2 pixel-shadow">
                  <span className="text-xs tracking-wider font-bold text-white">INTERACTIVE CONTROL</span>
                </div>
                <p className="text-lg font-bold text-green-400 uppercase tracking-wide pixel-text">
                  <Zap className="w-5 h-5 inline-block mr-2" />
                  Drag the slider!
                </p>
              </div>

              {/* Slider Labels */}
              <div className="flex justify-between text-base font-bold text-white border-4 border-gray-600 p-3 bg-gray-800 pixel-shadow">
                <span className="uppercase tracking-wider font-mono pixel-text text-red-400">Pretty Small</span>
                <span className="uppercase tracking-wider font-mono pixel-text text-orange-400">Pretty Big</span>
              </div>

              {/* Slider */}
              <div className="relative">
                <div className="bg-gray-600 border-2 border-gray-500 p-2 pixel-shadow">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderValue}
                    onChange={(e) => setSliderValue(e.target.value)}
                    className="w-full h-6 bg-gradient-to-r from-red-500 via-yellow-500 to-orange-500 appearance-none cursor-pointer border-2 border-gray-800 pixel-shadow"
                    style={{
                      background: `linear-gradient(to right, #ef4444 0%, #eab308 50%, #f97316 100%)`,
                      imageRendering: 'pixelated'
                    }}
                  />
                </div>
                
                {/* Slider value display */}
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gray-800 border-2 border-cyan-400 px-3 py-1 pixel-shadow">
                    <span className="text-cyan-400 font-bold text-sm pixel-text">{sliderValue}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleDoneClick}
            className="px-12 py-4 bg-blue-600 text-white border-4 border-blue-400 font-bold text-xl uppercase tracking-wider hover:bg-blue-500 hover:border-blue-300 transition-all duration-200 group relative pixel-shadow transform hover:scale-105"
          >
            <div className="absolute top-1 right-1 w-3 h-3 bg-white opacity-60" />
            <ArrowRight className="w-5 h-5 inline-block ml-2 opacity-0 group-hover:opacity-100 transition-opacity animate-bounce" />
            Done
          </button>

          {/* AFM Introduction Section - Appears after clicking Done */}
          {showAfmSection && (
            <>
              <div className="border-4 border-green-400 p-8 bg-gray-800 w-full max-w-3xl relative pixel-shadow">
                {/* Pixel corner brackets */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-green-400"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-green-400"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-green-400"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-green-400"></div>
                
                {/* Technical header label */}
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="bg-green-400 text-black px-4 py-2 text-xs font-bold tracking-wider border-2 border-green-300 pixel-shadow flex items-center gap-2">
                    <Lightbulb className="w-3 h-3" />
                    AFM INTRODUCTION
                  </div>
                </div>
                
                {/* Retro scan lines effect */}
                <div 
                  className="absolute inset-0 opacity-10 pointer-events-none"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
                  }}
                />
                
                <div className="space-y-6 text-lg font-mono leading-relaxed relative z-10">
                  <div className="border-4 border-green-500 bg-green-900 p-4 pixel-shadow">
                    <span className="font-bold uppercase tracking-wider text-green-400 pixel-text">RESULT:</span>
                    <span className="text-white pixel-text"> If you said pretty small, you'd be right.</span>
                  </div>
                  
                  <p className="text-gray-300 pixel-text">
                    So what does this have to do with{' '}
                    <span className="bg-yellow-500 text-black px-2 py-1 border-2 border-yellow-400 font-bold uppercase tracking-wider pixel-shadow">
                      Additive Factor Models
                    </span>
                    ? Well, AFM is an artificial intelligence algorithm that helps us predict what people know – often students, since AFM is typically used in educational contexts (e.g., Khan Academy and other online learning sites).
                  </p>
                  
                  <p className="text-gray-300 relative pixel-text">
                    Like many other algorithms, AFM relies on parameters to compute its output, which in this case is the success probability that a student answers the next question on a specific{' '}
                    <span 
                      className="relative border-2 border-cyan-400 bg-cyan-900 px-2 py-1 font-bold text-cyan-400 uppercase tracking-wider hover:bg-cyan-800 transition-colors cursor-help pixel-shadow"
                      onMouseEnter={() => setHoveredTerm('skill')}
                      onMouseLeave={() => setHoveredTerm(null)}
                    >
                      skill
                      {/* Tooltip */}
                      {hoveredTerm === 'skill' && (
                        <div className="absolute z-50 bg-gray-800 text-white text-sm font-mono p-4 border-4 border-cyan-400 pixel-shadow w-64 -top-2 left-full ml-2 transform -translate-y-full">
                          <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-cyan-400"></div>
                          <div className="font-bold text-xs uppercase tracking-wider mb-2 text-cyan-400 pixel-text">DEFINITION:</div>
                          <div className="text-xs leading-relaxed text-gray-300 pixel-text">
                            A skill represents a specific knowledge component or learning objective that students need to master, such as "solving linear equations" or "identifying metaphors in poetry."
                          </div>
                        </div>
                      )}
                    </span>
                    {' '}correctly.
                  </p>
                </div>
              </div>

              {/* Next Button */}
              <button
                onClick={() => scroll(4)}
                className="px-12 py-4 bg-red-600 text-white border-4 border-red-400 font-bold text-xl uppercase tracking-wider hover:bg-red-500 hover:border-red-300 transition-all duration-200 group relative pixel-shadow transform hover:scale-105"
              >
                <div className="absolute top-1 right-1 w-3 h-3 bg-white opacity-60" />
                <ArrowRight className="w-5 h-5 inline-block ml-2 opacity-0 group-hover:opacity-100 transition-opacity animate-bounce" />
                Next
              </button>
            </>
          )}
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
        
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 32px;
          height: 32px;
          background: #1f2937;
          border: 3px solid #22d3ee;
          border-radius: 0;
          cursor: pointer;
          box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.8);
        }
        
        input[type="range"]::-moz-range-thumb {
          width: 32px;
          height: 32px;
          background: #1f2937;
          border: 3px solid #22d3ee;
          border-radius: 0;
          cursor: pointer;
          box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.8);
        }
        
        input[type="range"]:focus {
          outline: none;
        }
      `}</style>
    </div>
  );
};