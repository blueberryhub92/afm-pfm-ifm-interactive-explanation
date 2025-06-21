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
      className={`bg-gradient-to-r from-pink-200 to-pink-300 px-6 py-4 w-full shadow-md ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-center justify-between text-lg">
        <div className="flex items-center space-x-2">
          <span className="w-6 h-6 bg-pink-400 rounded flex items-center justify-center text-white font-bold text-sm">
            0
          </span>
          {showCurrentValue && (
            <span className="text-pink-800">← You ({currentProbability})</span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-pink-800">Success Probability (1.0) →</span>
          <span className="w-6 h-6 bg-pink-400 rounded flex items-center justify-center text-white font-bold text-sm">
            1
          </span>
        </div>
      </div>
    </div>
  );
};