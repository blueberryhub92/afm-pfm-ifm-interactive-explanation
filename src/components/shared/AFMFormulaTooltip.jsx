import { useState } from "react";

export const AFMFormulaTooltip = ({ stage }) => {
  const [isVisible, setIsVisible] = useState(false);

  const renderStage1 = () => (
    // Stage 1: Just θ (appears on slide 4)
    <div className="flex items-center justify-center space-x-2">
      <span className="font-medium text-lg">log</span>
      
      <span className="text-xl">(</span>
      <div className="flex flex-col items-center mx-1">
        <div className="text-sm border-b border-gray-600 pb-0.5 mb-0.5 px-1">
          <span className="italic">p</span>
          <sub className="text-xs">ij</sub>
        </div>
        <div className="text-sm pt-0.5">
          <span>1 - </span>
          <span className="italic">p</span>
          <sub className="text-xs">ij</sub>
        </div>
      </div>
      <span className="text-xl">)</span>

      <span className="mx-2">=</span>

      <span className="italic text-lg">θ</span>
      <sub className="text-sm">i</sub>
    </div>
  );

  const renderStage2 = () => (
    // Stage 2: θ + T part (appears on slide 7)
    <div className="flex items-center justify-center space-x-1">
      <span className="font-medium text-lg">log</span>
      
      <span className="text-xl">(</span>
      <div className="flex flex-col items-center mx-1">
        <div className="text-sm border-b border-gray-600 pb-0.5 mb-0.5 px-1">
          <span className="italic">p</span>
          <sub className="text-xs">ij</sub>
        </div>
        <div className="text-sm pt-0.5">
          <span>1 - </span>
          <span className="italic">p</span>
          <sub className="text-xs">ij</sub>
        </div>
      </div>
      <span className="text-xl">)</span>

      <span className="mx-2">=</span>
      
      <span className="italic text-lg">θ</span>
      <sub className="text-sm">i</sub>
      
      <span className="mx-2">+</span>
      
      <div className="flex flex-col items-center mx-1">
        <div className="text-sm mb-1">
          <span className="italic">K</span>
        </div>
        <div className="text-xl">∑</div>
        <div className="text-sm mt-1">
          <span className="italic">k</span>=1
        </div>
      </div>
      
      <div className="mx-1">
        <span className="italic">q</span>
        <sub className="text-sm">ijk</sub>
        <span className="italic">γ</span>
        <sub className="text-sm">k</sub>
        <span className="italic">T</span>
        <sub className="text-sm">ik</sub>
      </div>
    </div>
  );

  const renderStage3 = () => (
    // Stage 3: Add task difficulty (β part)
    <div className="flex items-center justify-center space-x-1">
      <span className="font-medium text-lg">log</span>
      
      <span className="text-xl">(</span>
      <div className="flex flex-col items-center mx-1">
        <div className="text-sm border-b border-gray-600 pb-0.5 mb-0.5 px-1">
          <span className="italic">p</span>
          <sub className="text-xs">ij</sub>
        </div>
        <div className="text-sm pt-0.5">
          <span>1 - </span>
          <span className="italic">p</span>
          <sub className="text-xs">ij</sub>
        </div>
      </div>
      <span className="text-xl">)</span>

      <span className="mx-2">=</span>

      <span className="italic text-lg">θ</span>
      <sub className="text-sm">i</sub>
      
      <span className="mx-2">+</span>
      
      <div className="flex flex-col items-center mx-1">
        <div className="text-sm mb-1">
          <span className="italic">K</span>
        </div>
        <div className="text-xl">∑</div>
        <div className="text-sm mt-1">
          <span className="italic">k</span>=1
        </div>
      </div>
      
      <div className="mx-1">
        <span className="italic">q</span>
        <sub className="text-sm">ijk</sub>
        <span className="italic">β</span>
        <sub className="text-sm">k</sub>
      </div>
      
      <span className="mx-2">+</span>
      
      <div className="flex flex-col items-center mx-1">
        <div className="text-sm mb-1">
          <span className="italic">K</span>
        </div>
        <div className="text-xl">∑</div>
        <div className="text-sm mt-1">
          <span className="italic">k</span>=1
        </div>
      </div>
      
      <div className="mx-1">
        <span className="italic">q</span>
        <sub className="text-sm">ijk</sub>
        <span className="italic">γ</span>
        <sub className="text-sm">k</sub>
        <span className="italic">T</span>
        <sub className="text-sm">ik</sub>
      </div>
    </div>
  );

  const renderStage4 = () => (
    // Stage 4: Add learning rate (α part)
    <div className="flex items-center justify-center space-x-1">
      <span className="font-medium text-lg">log</span>
      
      <span className="text-xl">(</span>
      <div className="flex flex-col items-center mx-1">
        <div className="text-sm border-b border-gray-600 pb-0.5 mb-0.5 px-1">
          <span className="italic">p</span>
          <sub className="text-xs">ij</sub>
        </div>
        <div className="text-sm pt-0.5">
          <span>1 - </span>
          <span className="italic">p</span>
          <sub className="text-xs">ij</sub>
        </div>
      </div>
      <span className="text-xl">)</span>

      <span className="mx-2">=</span>
      
      <span className="italic text-lg">θ</span>
      <sub className="text-sm">i</sub>
      
      <span className="mx-2">+</span>
      
      <div className="flex flex-col items-center mx-1">
        <div className="text-sm mb-1">
          <span className="italic">K</span>
        </div>
        <div className="text-xl">∑</div>
        <div className="text-sm mt-1">
          <span className="italic">k</span>=1
        </div>
      </div>
      
      <div className="mx-1">
        <span className="italic">q</span>
        <sub className="text-sm">ijk</sub>
        <span className="italic">β</span>
        <sub className="text-sm">k</sub>
      </div>
      
      <span className="mx-2">+</span>
      
      <div className="flex flex-col items-center mx-1">
        <div className="text-sm mb-1">
          <span className="italic">K</span>
        </div>
        <div className="text-xl">∑</div>
        <div className="text-sm mt-1">
          <span className="italic">k</span>=1
        </div>
      </div>
      
      <div className="mx-1">
        <span className="italic">q</span>
        <sub className="text-sm">ijk</sub>
        <span className="italic">α</span>
        <sub className="text-sm">k</sub>
        <span className="italic">L</span>
        <sub className="text-sm">ik</sub>
      </div>
      
      <span className="mx-2">+</span>
      
      <div className="flex flex-col items-center mx-1">
        <div className="text-sm mb-1">
          <span className="italic">K</span>
        </div>
        <div className="text-xl">∑</div>
        <div className="text-sm mt-1">
          <span className="italic">k</span>=1
        </div>
      </div>
      
      <div className="mx-1">
        <span className="italic">q</span>
        <sub className="text-sm">ijk</sub>
        <span className="italic">γ</span>
        <sub className="text-sm">k</sub>
        <span className="italic">T</span>
        <sub className="text-sm">ik</sub>
      </div>
    </div>
  );

  const renderStage5 = () => (
    // Stage 5: Full formula with log and probability
    <div className="flex items-center justify-center space-x-1">
      <span className="font-medium text-lg">log</span>
      
      <span className="text-xl">(</span>
      <div className="flex flex-col items-center mx-1">
        <div className="text-sm border-b border-gray-600 pb-0.5 mb-0.5 px-1">
          <span className="italic">p</span>
          <sub className="text-xs">ij</sub>
        </div>
        <div className="text-sm pt-0.5">
          <span>1 - </span>
          <span className="italic">p</span>
          <sub className="text-xs">ij</sub>
        </div>
      </div>
      <span className="text-xl">)</span>

      <span className="mx-2">=</span>
      
      <span className="font-medium text-lg">log</span>
      
      <span className="text-xl">(</span>
      <div className="flex flex-col items-center mx-1">
        <div className="text-sm border-b border-gray-600 pb-0.5 mb-0.5 px-1">
          <span className="italic">p</span>
          <sub className="text-xs">ij</sub>
        </div>
        <div className="text-sm pt-0.5">
          <span>1 - </span>
          <span className="italic">p</span>
          <sub className="text-xs">ij</sub>
        </div>
      </div>
      <span className="text-xl">)</span>
      
      <span className="mx-2">=</span>
      
      <span className="italic text-lg">θ</span>
      <sub className="text-sm">i</sub>
      
      <span className="mx-2">+</span>
      
      <div className="flex flex-col items-center mx-1">
        <div className="text-sm mb-1">
          <span className="italic">K</span>
        </div>
        <div className="text-xl">∑</div>
        <div className="text-sm mt-1">
          <span className="italic">k</span>=1
        </div>
      </div>
      
      <div className="mx-1">
        <span className="italic">q</span>
        <sub className="text-sm">ijk</sub>
        <span className="italic">β</span>
        <sub className="text-sm">k</sub>
      </div>
      
      <span className="mx-2">+</span>
      
      <div className="flex flex-col items-center mx-1">
        <div className="text-sm mb-1">
          <span className="italic">K</span>
        </div>
        <div className="text-xl">∑</div>
        <div className="text-sm mt-1">
          <span className="italic">k</span>=1
        </div>
      </div>
      
      <div className="mx-1">
        <span className="italic">q</span>
        <sub className="text-sm">ijk</sub>
        <span className="italic">α</span>
        <sub className="text-sm">k</sub>
        <span className="italic">L</span>
        <sub className="text-sm">ik</sub>
      </div>
      
      <span className="mx-2">+</span>
      
      <div className="flex flex-col items-center mx-1">
        <div className="text-sm mb-1">
          <span className="italic">K</span>
        </div>
        <div className="text-xl">∑</div>
        <div className="text-sm mt-1">
          <span className="italic">k</span>=1
        </div>
      </div>
      
      <div className="mx-1">
        <span className="italic">q</span>
        <sub className="text-sm">ijk</sub>
        <span className="italic">γ</span>
        <sub className="text-sm">k</sub>
        <span className="italic">T</span>
        <sub className="text-sm">ik</sub>
      </div>
    </div>
  );

  const renderFormula = () => {
    switch (stage) {
      case 1:
        return renderStage1();
      case 2:
        return renderStage2();
      case 3:
        return renderStage3();
      case 4:
        return renderStage4();
      case 5:
        return renderStage5();
      default:
        return null;
    }
  };

  if (!stage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Tooltip trigger - small icon */}
      <button
        className="w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
        aria-label="Show AFM Formula"
      >
        <span className="text-lg font-bold">∑</span>
      </button>

      {/* Tooltip content */}
      {isVisible && (
        <div className="absolute bottom-full right-0 mb-3 bg-white border border-gray-200 rounded-lg shadow-xl p-4 min-w-max transform transition-all duration-200 animate-in fade-in slide-in-from-bottom-2">
          {/* Arrow pointing down */}
          <div className="absolute top-full right-6 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
          
          {/* Formula content */}
          <div className="text-gray-800 font-serif select-none">
            <div className="text-xs text-gray-500 mb-2 text-center">AFM Formula</div>
            {renderFormula()}
          </div>
        </div>
      )}
    </div>
  );
};