import { Calculator, Code } from "lucide-react";

export const AFMFormulaTooltip = ({ stage }) => {

  const renderSkillDefinition = () => (
    // Stage 1: Formula with placeholders and brief skill explanation
    <div className="space-y-4">
      <div className="flex items-center justify-center space-x-2 flex-wrap mb-4">
        <span className="font-bold text-lg text-green-600">P(success)</span>
        <span className="mx-2 font-bold text-xl">=</span>
        <span className="mx-2 font-bold text-xl text-gray-400">? + ? + ? x ?</span>
      </div>
      <h4 className="font-bold text-green-800 mb-4 text-lg uppercase tracking-wide">What is a "Skill" in AFM?</h4>
      <p className="text-black text-sm leading-relaxed mb-4 font-semibold">
        In AFM, a "skill" is a specific concept or technique that can be learned and practiced independently. Each skill represents a distinct cognitive ability.
      </p>
      <div>
        <h5 className="font-bold text-black mb-3 uppercase tracking-wide border-b-2 border-black pb-1">Examplary Python Skills:</h5>
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
    </div>
  );

  const renderStage1 = () => (
    // Stage 1: Just θ (appears on slide 4)
    <div className="flex items-center justify-center space-x-2 flex-wrap">
      <span className="font-bold text-lg text-green-600">P(success)</span>
      <span className="mx-2 font-bold text-xl">=</span>
      <span className="italic text-lg font-bold text-blue-700">θ</span>
      <sub className="text-sm font-bold">i</sub>
      <span className="mx-2 font-bold text-xl text-gray-400">+ ? + ? x ?</span>
    </div>
  );

  const renderStage2 = () => (
    // Stage 2: θ + T part - simplified without sum and q
    <div className="flex items-center justify-center space-x-1 flex-wrap">
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
    <div className="flex items-center justify-center space-x-1 flex-wrap">
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
    <div className="flex items-center justify-center space-x-1 flex-wrap">
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
    <div className="flex items-center justify-center space-x-1 flex-wrap">
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
    
    if (stage >= 2) {
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
    
    if (stage >= 3) {
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
    
    if (stage >= 4) {
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
    
    if (stage >= 5) {
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

    if (stage >= 6) {
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
        return renderSkillDefinition();
      case 2:
        return renderStage1();
      case 3:
        return renderStage2();
      case 4:
        return renderStage3();
      case 5:
        return renderStage4();
      case 6:
        return renderStage5();
      default:
        return null;
    }
  };

  const getStageTitle = () => {
    switch (stage) {
      case 1:
        return "Additive Factor Model";
      case 2:
        return "Base Ability (θ)";
      case 3:
        return "+ Practice Opportunities (T)";
      case 4:
        return "+ Task Difficulty (β)";
      case 5:
        return "+ Learning Rate (γ)";
      case 6:
        return "Complete Formula";
      default:
        return "AFM Formula";
    }
  };

  const getStageIcon = () => {
    return stage === 0 ? Code : Calculator;
  };

  if (!stage) return null;

  const StageIcon = getStageIcon();

  return (
    <div className="fixed bottom-4 right-4 z-50 group">
      {/* Trigger button for narrow screens */}
      <div className="lg:hidden">
        <button className="bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-colors">
          <StageIcon className="w-5 h-5" />
        </button>
        
        {/* Tooltip content for narrow screens */}
        <div className="absolute bottom-full right-0 mb-2 w-80 max-w-[90vw] bg-white border-4 border-black rounded-xl shadow-xl p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
          {/* Header */}
          <div className="flex items-center justify-center mb-3">
            <div className={`px-3 py-1 ${stage === 0 ? 'bg-green-700' : 'bg-black'} text-white font-bold rounded-lg text-xs tracking-wider flex items-center gap-1 uppercase`}>
              <StageIcon className="w-3 h-3" />
              {getStageTitle()}
            </div>
          </div>
          
          {/* Formula content */}
          <div className="text-black font-['IBM_Plex_Mono',monospace] select-none mb-3 overflow-x-auto">
            <div className="min-w-fit text-sm">
              {renderFormula()}
            </div>
          </div>

          {/* Example parameters - only show for stages 1+ */}
          {stage > 0 && (
            <div className="p-3 bg-neutral-50 border-2 border-black rounded-lg">
              <div className="text-xs font-bold text-black uppercase tracking-wide mb-2 text-center">
                Example Parameters:
              </div>
              <div className="grid grid-cols-1 gap-2 text-xs">
                {renderExamples()}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Always visible for large screens */}
      <div className="hidden lg:block max-w-sm w-auto">
        {/* Formula container */}
        <div className="bg-white border-4 border-black rounded-xl shadow-xl p-4">
          {/* Header */}
          <div className="flex items-center justify-center mb-3">
            <div className={`px-3 py-1 ${stage === 0 ? 'bg-green-700' : 'bg-black'} text-white font-bold rounded-lg text-xs tracking-wider flex items-center gap-1 uppercase`}>
              <StageIcon className="w-3 h-3" />
              {getStageTitle()}
            </div>
          </div>
          
          {/* Formula content */}
          <div className="text-black font-['IBM_Plex_Mono',monospace] select-none mb-3 overflow-x-auto">
            <div className="min-w-fit text-sm">
              {renderFormula()}
            </div>
          </div>

          {/* Example parameters - only show for stages 1+ */}
          {stage > 1 && (
            <div className="p-3 bg-neutral-50 border-2 border-black rounded-lg">
              <div className="text-xs font-bold text-black uppercase tracking-wide mb-2 text-center">
                Example Parameters:
              </div>
              <div className="grid grid-cols-1 gap-2 text-xs">
                {renderExamples()}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};