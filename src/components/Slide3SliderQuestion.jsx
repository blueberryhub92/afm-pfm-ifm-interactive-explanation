import { useState } from "react";

export const Slide3SliderQuestion = ({ scroll }) => {
    const [sliderValue, setSliderValue] = useState(50);

    return(
        <div className="max-w-2xl w-full text-center space-y-8">
          <p className="text-lg text-gray-700 leading-relaxed">
            Don't worry if you got it wrong, though. What do you think the chances are that someone who doesn't know Python would have guessed the answer correctly by chance?
          </p>
          
          <div className="space-y-6">
            <p className="text-gray-600 italic">Drag the slider!</p>
            
            <div className="relative">
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>Pretty Small</span>
                <span>Pretty Big</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={sliderValue}
                onChange={(e) => setSliderValue(e.target.value)}
                className="w-full h-2 bg-gradient-to-r from-pink-200 via-orange-200 to-orange-300 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="text-center mt-2 text-lg font-semibold">
                {sliderValue}%
              </div>
            </div>
            
            <button
              onClick={() => scroll(4)}
              className="px-8 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Done
            </button>
          </div>
        </div>
    )}
