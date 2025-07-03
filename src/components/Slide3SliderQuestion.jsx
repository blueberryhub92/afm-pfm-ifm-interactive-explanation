import { useState } from "react";
import { Target, TrendingUp, Lightbulb, Code } from "lucide-react";

export const Slide3SliderQuestion = ({ scroll }) => {
  const [sliderValue, setSliderValue] = useState(50);
  const [showAfmSection, setShowAfmSection] = useState(false);
  const [hoveredTerm, setHoveredTerm] = useState(null);

  const SkillTooltip = () => (
    <div className="fixed z-50 top-4 left-4 bg-white border-4 border-green-700 rounded-xl shadow-lg p-6 w-96 font-['IBM_Plex_Mono',monospace]">
      <div className="absolute -top-6 left-4 px-3 py-1 bg-green-700 text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
        <Code className="w-4 h-4" />
        SKILL DEFINITION
      </div>
      <h4 className="font-bold text-green-800 mb-4 text-lg uppercase tracking-wide">What is a "Skill" in AFM?</h4>
      <p className="text-black text-sm leading-relaxed mb-4 font-semibold">
        In AFM, a "skill" is a specific concept or technique that can be learned and practiced independently. Each skill represents a distinct cognitive ability.
      </p>
      <div className="bg-neutral-100 border-2 border-black rounded p-4 font-mono text-sm mb-4">
        <div className="text-green-700 mb-2 font-bold"># Current Example - String Slicing:</div>
        <div className="text-black">word = "nohtyp"</div>
        <div className="text-black">manipulated_word = word[::-1]</div>
        <div className="text-black">print(manipulated_word)</div>
        <div className="text-blue-700 mt-2 font-bold"># Output: python</div>
      </div>
      <div>
        <h5 className="font-bold text-black mb-3 uppercase tracking-wide border-b-2 border-black pb-1">Other Python Skills:</h5>
        <div className="space-y-2 text-sm">
          <div className="border-l-4 border-blue-600 pl-3">
            <strong className="text-blue-600 uppercase">Functions:</strong> <span className="text-black">Defining, calling, parameters, returns</span>
          </div>
          <div className="border-l-4 border-green-600 pl-3">
            <strong className="text-green-600 uppercase">OOP:</strong> <span className="text-black">Classes, objects, inheritance</span>
          </div>
          <div className="border-l-4 border-purple-600 pl-3">
            <strong className="text-purple-600 uppercase">Recursion:</strong> <span className="text-black">Base cases, recursive calls</span>
          </div>
          <div className="border-l-4 border-orange-600 pl-3">
            <strong className="text-orange-600 uppercase">Data Structures:</strong> <span className="text-black">Lists, dicts, sets, tuples</span>
          </div>
        </div>
      </div>
      <button
        onClick={() => setHoveredTerm(null)}
        className="absolute top-2 right-2 px-2 py-1 rounded border-2 border-black bg-green-700 text-white font-bold hover:bg-white hover:text-green-700 transition-colors"
      >
        X
      </button>
    </div>
  );

  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center py-8 px-4 md:px-10 text-black font-['IBM_Plex_Mono',monospace]">
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-8">
        
        {/* Main Question Block with Slider */}
        <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg w-full max-w-3xl relative">
          <div className="absolute -top-6 left-6 px-4 py-2 bg-black text-white font-semibold rounded-md text-sm tracking-wider flex items-center gap-2">
            <Target className="w-4 h-4" />
            PROBABILITY ESTIMATION
          </div>
          
          <div className="text-xl md:text-2xl font-semibold tracking-tight text-black text-center mb-6 leading-relaxed">
            Don't worry if you got it wrong, though. What do you think the chances are that someone who doesn't know Python would have guessed the answer correctly by chance?
          </div>
          
          {/* Single Slider Container Box */}
          <div className="border-2 border-black rounded-xl p-6 bg-neutral-50 space-y-6">
            <div className="flex items-center gap-2 mb-4 justify-center">
              <TrendingUp className="w-6 h-6 text-orange-700" />
              <span className="font-semibold tracking-tight text-xl">
                Probability Assessment
              </span>
            </div>

            <div className="text-center mb-4">
              <p className="text-lg font-bold text-neutral-700 uppercase tracking-wide">
                Drag the slider!
              </p>
            </div>

            {/* Slider Labels */}
            <div className="flex justify-between text-base font-bold text-black border-2 border-black rounded p-3 bg-white">
              <span className="uppercase tracking-wide">Pretty Small</span>
              <span className="uppercase tracking-wide">Pretty Big</span>
            </div>

            {/* Slider */}
            <div className="relative">
              <input
                type="range"
                min="0"
                max="100"
                value={sliderValue}
                onChange={(e) => setSliderValue(e.target.value)}
                className="w-full h-4 bg-gradient-to-r from-red-400 via-yellow-400 to-orange-500 rounded-lg appearance-none cursor-pointer border-2 border-black shadow-lg"
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
                  border-radius: 50%;
                  cursor: pointer;
                  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
                input[type="range"]::-moz-range-thumb {
                  width: 24px;
                  height: 24px;
                  background: black;
                  border: 2px solid white;
                  border-radius: 50%;
                  cursor: pointer;
                  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
          onClick={() => setShowAfmSection(true)}
          className="px-12 py-4 bg-red-600 text-white border-4 border-black rounded-xl font-bold text-xl uppercase tracking-wide hover:bg-white hover:text-red-600 hover:border-red-600 transition-all duration-200 shadow-lg"
        >
          Done
        </button>

        {/* AFM Introduction Section - Appears after clicking Done */}
        {showAfmSection && (
          <>
            <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative w-full max-w-3xl">
              <div className="absolute -top-6 left-6 px-4 py-2 bg-black text-white font-semibold rounded-md text-sm tracking-wider flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                AFM INTRODUCTION
              </div>
              <div className="space-y-6 text-lg font-semibold leading-relaxed">
                <p className="text-black border-l-4 border-green-600 pl-4">
                  If you said pretty small, you'd be right.
                </p>
                <p className="text-black">
                  So what does this have to do with <span className="bg-yellow-200 px-2 py-1 border-2 border-black rounded font-bold uppercase">Additive Factor Models</span>? Well, AFM is an artificial intelligence algorithm that helps us predict what people know – often students, since AFM is typically used in educational contexts (e.g., Khan Academy and other online learning sites).
                </p>
                <p className="text-black">
                  Like many other algorithms, AFM relies on parameters to compute its output, which in this case is the success probability that a student answers the next question on a specific{' '}
                  <span 
                    className="relative cursor-pointer border-4 border-green-600 bg-green-100 px-2 py-1 rounded font-bold text-green-800 uppercase hover:bg-green-200 transition-colors"
                    onMouseEnter={() => setHoveredTerm('skill')}
                    onMouseLeave={() => setHoveredTerm(null)}
                  >
                    skill
                  </span>
                  {' '}correctly.
                </p>
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={() => scroll(4)}
              className="px-12 py-4 bg-blue-600 text-white border-4 border-black rounded-xl font-bold text-xl uppercase tracking-wide hover:bg-white hover:text-blue-600 hover:border-blue-600 transition-all duration-200 shadow-lg"
            >
              Next
            </button>
          </>
        )}
        
        {/* Skill Tooltip */}
        {hoveredTerm === 'skill' && <SkillTooltip />}
      </div>
    </div>
  );
};