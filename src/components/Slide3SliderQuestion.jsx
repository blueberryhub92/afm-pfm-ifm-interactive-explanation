import { useState } from "react";
import { Target, TrendingUp, Lightbulb, Code, ArrowRight } from "lucide-react";

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
    <div className="bg-white min-h-screen font-mono relative">
      {/* Grid background */}
      <div 
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: 'linear-gradient(to right, #d1d5db 1px, transparent 1px), linear-gradient(to bottom, #d1d5db 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />
      
      <div className="relative flex flex-col items-center justify-center py-8 px-4 md:px-10 text-black">
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-8">
          
          {/* Main Question Block with Slider */}
          <div className="border-2 border-black p-8 bg-white w-full max-w-3xl relative">
            {/* Technical corner brackets */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-black"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-black"></div>
            
            {/* Technical header label */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-black text-white px-3 py-1 text-xs font-mono tracking-wider border border-white flex items-center gap-2">
                <Target className="w-3 h-3" />
                PROBABILITY ESTIMATION
              </span>
            </div>
            
            <div className="text-xl md:text-2xl font-bold tracking-wider text-black text-center mb-8 leading-relaxed uppercase">
              Don't worry if you got it wrong, though. What do you think the chances are that someone who doesn't know Python would have guessed the answer correctly by chance?
            </div>
            
            {/* Slider Container Box */}
            <div className="border-2 border-black p-6 bg-white space-y-6 relative">
              {/* Corner marker */}
              <div className="absolute top-2 right-2 w-2 h-2 border border-black bg-white" />

              <div className="text-center mb-4">
                <div className="inline-block border border-black px-3 py-1 mb-2">
                  <span className="text-xs tracking-wider font-mono">INTERACTIVE CONTROL</span>
                </div>
                <p className="text-lg font-bold text-black uppercase tracking-wide">
                  Drag the slider!
                </p>
              </div>

              {/* Slider Labels */}
              <div className="flex justify-between text-base font-bold text-black border-2 border-black p-3 bg-white">
                <span className="uppercase tracking-wider font-mono">Pretty Small</span>
                <span className="uppercase tracking-wider font-mono">Pretty Big</span>
              </div>

              {/* Slider */}
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderValue}
                  onChange={(e) => setSliderValue(e.target.value)}
                  className="w-full h-4 bg-gradient-to-r from-red-400 via-yellow-400 to-orange-500 appearance-none cursor-pointer border-2 border-black"
                  style={{
                    background: `linear-gradient(to right, #f87171 0%, #fbbf24 50%, #fb923c 100%)`,
                  }}
                />
                <style jsx>{`
                  input[type="range"]::-webkit-slider-thumb {
                    appearance: none;
                    width: 24px;
                    height: 24px;
                    background: black;
                    border: 2px solid white;
                    border-radius: 0;
                    cursor: pointer;
                  }
                  input[type="range"]::-moz-range-thumb {
                    width: 24px;
                    height: 24px;
                    background: black;
                    border: 2px solid white;
                    border-radius: 0;
                    cursor: pointer;
                  }
                  input[type="range"]:focus {
                    outline: none;
                  }
                `}</style>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleDoneClick}
            className="px-12 py-4 bg-black text-white border-2 border-black font-bold text-xl uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-200 group relative"
          >
            <ArrowRight className="w-4 h-4 inline-block ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
            Done
          </button>

          {/* AFM Introduction Section - Appears after clicking Done */}
          {showAfmSection && (
            <>
              <div className="border-2 border-black p-8 bg-white w-full max-w-3xl relative">
                {/* Technical corner brackets */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-black"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-black"></div>
                
                {/* Technical header label */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-black text-white px-3 py-1 text-xs font-mono tracking-wider border border-white flex items-center gap-2">
                    <Lightbulb className="w-3 h-3" />
                    AFM INTRODUCTION
                  </span>
                </div>
                
                <div className="space-y-6 text-lg font-mono leading-relaxed">
                  <p className="text-black border-l-4 border-black pl-4 bg-green-50">
                    <span className="font-bold uppercase tracking-wider">RESULT:</span> If you said pretty small, you'd be right.
                  </p>
                  <p className="text-black">
                    So what does this have to do with <span className="bg-yellow-200 px-2 py-1 border-2 border-black font-bold uppercase tracking-wider">Additive Factor Models</span>? Well, AFM is an artificial intelligence algorithm that helps us predict what people know – often students, since AFM is typically used in educational contexts (e.g., Khan Academy and other online learning sites).
                  </p>
                  <p className="text-black relative">
                    Like many other algorithms, AFM relies on parameters to compute its output, which in this case is the success probability that a student answers the next question on a specific{' '}
                    <span 
                      className="relative border-2 border-black bg-green-100 px-2 py-1 font-bold text-black uppercase tracking-wider hover:bg-green-200 transition-colors cursor-help"
                      onMouseEnter={() => setHoveredTerm('skill')}
                      onMouseLeave={() => setHoveredTerm(null)}
                    >
                      skill
                      {/* Tooltip */}
                      {hoveredTerm === 'skill' && (
                        <div className="absolute z-50 bg-black text-white text-sm font-mono p-3 border-2 border-white shadow-lg w-64 -top-2 left-full ml-2 transform -translate-y-full">
                          <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
                          <div className="font-bold text-xs uppercase tracking-wider mb-1 text-green-300">DEFINITION:</div>
                          <div className="text-xs leading-relaxed">
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
                className="px-12 py-4 bg-black text-white border-2 border-black font-bold text-xl uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-200 group relative"
              >
                <ArrowRight className="w-4 h-4 inline-block ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                Next
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};