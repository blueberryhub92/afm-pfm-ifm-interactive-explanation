import { useState } from "react";
import { Calculator } from "lucide-react";

export const AFMFormulaTooltip = ({ stage }) => {
  const [isVisible, setIsVisible] = useState(false);

  const renderStage1 = () => (
    // Stage 1: Just θ (appears on slide 4)
    <div className="flex items-center justify-center space-x-2">
      <span className="font-bold text-lg text-green-600">P(success)</span>

      <span className="mx-2 font-bold text-xl">=</span>

      <span className="italic text-lg font-bold text-blue-700">θ</span>
      <sub className="text-sm font-bold">i</sub>
      
      <span className="mx-2 font-bold text-xl text-gray-400">+ ? + ? x ?</span>
    </div>
  );

  const renderStage2 = () => (
    // Stage 2: θ + T part - simplified without sum and q
    <div className="flex items-center justify-center space-x-1">
      <span className="font-bold text-lg text-green-600">P(success)</span>

      <span className="mx-2 font-bold text-xl">=</span>
      
      <span className="italic text-lg font-bold text-blue-700">θ</span>
      <sub className="text-sm font-bold">i</sub>
      
      <span className="mx-2 font-bold text-xl">+</span>

      <span className="mx-2 font-bold text-xl text-gray-400">? +</span>

      
      <div className="mx-1 font-mono">
        <span className="mx-1 font-bold text-xl text-gray-400">? x </span>
        <span className="italic font-bold text-orange-700">T</span>
        <sub className="text-sm font-bold">ik</sub>
      </div>
      
    </div>
  );

  const renderStage3 = () => (
    // Stage 3: Add task difficulty (β part) - simplified
    <div className="flex items-center justify-center space-x-1">
      <span className="font-bold text-lg text-green-600">P(success)</span>

      <span className="mx-2 font-bold text-xl">=</span>

      <span className="italic text-lg font-bold text-blue-700">θ</span>
      <sub className="text-sm font-bold">i</sub>
      
      <span className="mx-2 font-bold text-xl">+</span>
      
      <div className="mx-1 font-mono">
        <span className="italic font-bold text-purple-700">β</span>
        <sub className="text-sm font-bold">k</sub>
      </div>
      
      <span className="mx-2 font-bold text-xl">+</span>
      
      <div className="mx-1 font-mono">
        <span className="mx-1 font-bold text-xl text-gray-400">? x </span>
        <span className="italic font-bold text-orange-700">T</span>
        <sub className="text-sm font-bold">ik</sub>
      </div>
      
    </div>
  );

  const renderStage4 = () => (
    // Stage 4: Add learning rate (γ part with T) - removed α and L
    <div className="flex items-center justify-center space-x-1">
      <span className="font-bold text-lg text-green-600">P(success)</span>

      <span className="mx-2 font-bold text-xl">=</span>
      
      <span className="italic text-lg font-bold text-blue-700">θ</span>
      <sub className="text-sm font-bold">i</sub>
      
      <span className="mx-2 font-bold text-xl">+</span>
      
      <div className="mx-1 font-mono">
        <span className="italic font-bold text-purple-700">β</span>
        <sub className="text-sm font-bold">k</sub>
      </div>
      
      <span className="mx-2 font-bold text-xl">+</span>
      
      <div className="mx-1 font-mono">
        <span className="italic font-bold text-green-700">γ</span>
        <sub className="text-sm font-bold">k</sub>
        <span className="italic font-bold text-orange-700">T</span>
        <sub className="text-sm font-bold">ik</sub>
      </div>
    </div>
  );

  const renderStage5 = () => (
    // Stage 5: Full formula with log and probability
    <div className="flex items-center justify-center space-x-1">
      <span className="font-bold text-lg">log</span>
      
      <span className="text-xl font-bold">(</span>
      <div className="flex flex-col items-center mx-1">
        <div className="text-sm border-b-2 border-black pb-0.5 mb-0.5 px-1 font-mono">
          <span className="italic font-bold">p</span>
          <sub className="text-xs font-bold">ij</sub>
        </div>
        <div className="text-sm pt-0.5 font-mono">
          <span className="font-bold">1 - </span>
          <span className="italic font-bold">p</span>
          <sub className="text-xs font-bold">ij</sub>
        </div>
      </div>
      <span className="text-xl font-bold">)</span>

      <span className="mx-2 font-bold text-xl">=</span>
      
      <span className="italic text-lg font-bold text-blue-700">θ</span>
      <sub className="text-sm font-bold">i</sub>
      
      <span className="mx-2 font-bold text-xl">+</span>
      
      <div className="flex flex-col items-center mx-1">
        <div className="text-sm mb-1 font-bold">
          <span className="italic">K</span>
        </div>
        <div className="text-xl font-bold">∑</div>
        <div className="text-sm mt-1 font-bold">
          <span className="italic">k</span>=1
        </div>
      </div>
      
      <div className="mx-1 font-mono">
        <span className="italic font-bold">q</span>
        <sub className="text-sm font-bold">ijk</sub>
        <span className="italic font-bold text-purple-700">β</span>
        <sub className="text-sm font-bold">k</sub>
      </div>
      
      <span className="mx-2 font-bold text-xl">+</span>
      
      <div className="flex flex-col items-center mx-1">
        <div className="text-sm mb-1 font-bold">
          <span className="italic">K</span>
        </div>
        <div className="text-xl font-bold">∑</div>
        <div className="text-sm mt-1 font-bold">
          <span className="italic">k</span>=1
        </div>
      </div>
      
      <div className="mx-1 font-mono">
        <span className="italic font-bold">q</span>
        <sub className="text-sm font-bold">ijk</sub>
        <span className="italic font-bold text-green-700">γ</span>
        <sub className="text-sm font-bold">k</sub>
        <span className="italic font-bold text-orange-700">T</span>
        <sub className="text-sm font-bold">ik</sub>
      </div>
    </div>
  );

  const renderExamples = () => {
    const examples = [];
    
    if (stage >= 1) {
      examples.push(
        <div key="theta" className="flex items-center gap-2">
          <span className="italic font-bold text-blue-700">θ</span>
          <sub className="text-xs font-bold">i</sub>
          <span className="text-gray-600">=</span>
          <span className="font-mono text-sm bg-blue-50 px-2 py-1 rounded border">1.2</span>
          <span className="text-xs text-gray-500">(student ability)</span>
        </div>
      );
    }
    
    if (stage >= 2) {
      examples.push(
        <div key="T" className="flex items-center gap-2">
          <span className="italic font-bold text-orange-700">T</span>
          <sub className="text-xs font-bold">ik</sub>
          <span className="text-gray-600">=</span>
          <span className="font-mono text-sm bg-orange-50 px-2 py-1 rounded border">2</span>
          <span className="text-xs text-gray-500">(practice opportunities)</span>
        </div>
      );
    }
    
    if (stage >= 3) {
      examples.push(
        <div key="beta" className="flex items-center gap-2">
          <span className="italic font-bold text-purple-700">β</span>
          <sub className="text-xs font-bold">k</sub>
          <span className="text-gray-600">=</span>
          <span className="font-mono text-sm bg-purple-50 px-2 py-1 rounded border">-0.8</span>
          <span className="text-xs text-gray-500">(task difficulty)</span>
        </div>
      );
    }
    
    if (stage >= 4) {
      examples.push(
        <div key="gamma" className="flex items-center gap-2">
          <span className="italic font-bold text-green-700">γ</span>
          <sub className="text-xs font-bold">k</sub>
          <span className="text-gray-600">=</span>
          <span className="font-mono text-sm bg-green-50 px-2 py-1 rounded border">0.3</span>
          <span className="text-xs text-gray-500">(learning rate)</span>
        </div>
      );
    }

    if (stage >= 5) {
      examples.push(
        <div key="q" className="flex items-center gap-2">
          <span className="italic font-bold">q</span>
          <sub className="text-xs font-bold">ijk</sub>
          <span className="text-gray-600">=</span>
          <span className="font-mono text-sm bg-gray-50 px-2 py-1 rounded border">1</span>
          <span className="text-xs text-gray-500">(Q-matrix indicator)</span>
        </div>
      );
    }

    return examples;
  };

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
      {/* Tooltip trigger - brutalist button */}
      <button
        className="w-16 h-16 bg-black text-white border-4 border-black rounded-xl shadow-lg flex items-center justify-center transition-all duration-200 hover:bg-white hover:text-black hover:scale-105 font-bold uppercase tracking-wider"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
        aria-label="Show AFM Formula"
      >
        <Calculator className="w-6 h-6" />
      </button>

      {/* Tooltip content */}
      {isVisible && (
        <div className="absolute bottom-full right-0 mb-4 bg-white border-4 border-black rounded-xl shadow-xl p-6 min-w-max transform transition-all duration-200">
          {/* Arrow pointing down - brutalist style */}
          <div className="absolute top-full right-6 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-black"></div>
          
          {/* Header */}
          <div className="absolute -top-6 left-4 px-3 py-1 bg-black text-white font-bold rounded-md text-xs tracking-wider flex items-center gap-2 uppercase">
            <Calculator className="w-4 h-4" />
            {stage === 1 && "Base Ability (θ)"}
            {stage === 2 && "+ Practice Opportunities (T)"}
            {stage === 3 && "+ Task Difficulty (β)"}
            {stage === 4 && "+ Learning Rate (y)"}
            {stage === 5 && "Complete Formula"}
          </div>
          
          {/* Formula content */}
          <div className="text-black font-['IBM_Plex_Mono',monospace] select-none pt-2">
            {renderFormula()}
          </div>

          {/* Example parameters */}
          <div className="mt-4 p-3 bg-neutral-50 border-2 border-black rounded-lg">
            <div className="text-xs font-bold text-black uppercase tracking-wide mb-2">
              Example Parameters:
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {renderExamples()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};