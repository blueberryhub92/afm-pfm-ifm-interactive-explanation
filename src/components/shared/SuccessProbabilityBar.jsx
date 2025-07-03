import { useState } from 'react';
import { TrendingUp, Target, Eye, ArrowRight, BarChart3, ArrowUp } from 'lucide-react';

// Updated SuccessProbabilityBar with fixed positioning
export const SuccessProbabilityBar = ({
  currentProbability = 0.25,
  showCurrentValue = true,
  className = "",
  onHover = null
}) => {
  const handleMouseEnter = () => {
    if (onHover) onHover(true);
  };

  const handleMouseLeave = () => {
    if (onHover) onHover(false);
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 bg-white border-b-4 border-black px-4 md:px-10 py-4 w-full shadow-lg font-['IBM_Plex_Mono',monospace] ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between text-black font-semibold mb-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-black text-white rounded border-2 border-black flex items-center justify-center font-bold text-sm">
              0
            </div>
            <span className="text-sm uppercase tracking-wide">Low Success</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm uppercase tracking-wide">High Success</span>
            <div className="w-6 h-6 bg-black text-white rounded border-2 border-black flex items-center justify-center font-bold text-sm">
              1
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="relative">
          <div className="w-full h-8 bg-neutral-200 rounded-lg overflow-hidden border-4 border-black">
            <div
              className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 transition-all duration-300"
              style={{ width: `${(currentProbability * 100).toFixed(0)}%` }}
            ></div>
          </div>
          
          {/* Current Value Indicator */}
          {showCurrentValue && (
            <div
              className="absolute top-0 h-8 flex items-center"
              style={{ left: `${(currentProbability * 100).toFixed(0)}%` }}
            >
              <div className="relative">
                <div className="w-1 h-8 bg-black"></div>
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-xs font-bold border-2 border-black">
                  {currentProbability.toFixed(2)}
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Bottom Labels */}
        <div className="flex justify-between mt-2 text-xs font-bold text-black uppercase tracking-wide">
          <span>0% Probability</span>
          <span>100% Probability</span>
        </div>
      </div>
    </div>
  );
};