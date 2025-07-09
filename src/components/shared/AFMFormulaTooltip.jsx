import { Calculator, Code } from "lucide-react";

export const AFMFormulaTooltip = ({ stage }) => {

  const renderSkillDefinition = () => (
    // Stage 1: Formula with placeholders and brief skill explanation
    <div className="space-y-4">
      <div className="flex items-center justify-center space-x-2 flex-wrap mb-4">
        <span className="font-bold text-lg text-black">P(success)</span>
        <span className="mx-2 font-bold text-xl">=</span>
        <span className="mx-2 font-bold text-xl text-gray-600">? + ? + ? x ?</span>
      </div>
      
      <div className="border-2 border-black p-4 bg-white relative">
        {/* Technical corner brackets */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-black"></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-black"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-black"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-black"></div>
        
        <div className="text-center mb-2">
          <div className="inline-block border border-black px-2 py-1">
            <span className="text-xs tracking-wider font-mono">SKILL DEFINITION</span>
          </div>
        </div>
        
        <h4 className="font-bold text-black mb-4 text-lg uppercase tracking-wide text-center">What is a "Skill" in AFM?</h4>
        <p className="text-black text-sm leading-relaxed mb-4 font-mono text-center">
          In AFM, a "skill" is a specific concept or technique that can be learned and practiced independently. Each skill represents a distinct cognitive ability.
        </p>
      </div>
      
      <div className="border-2 border-black p-4 bg-white">
        <div className="text-center mb-3">
          <div className="inline-block border border-black px-2 py-1">
            <span className="text-xs tracking-wider font-mono">PYTHON EXAMPLES</span>
          </div>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="border-l-4 border-black pl-3 py-2 bg-gray-50">
            <strong className="text-black uppercase font-mono">FUNCTIONS:</strong> 
            <span className="text-black ml-2 font-mono">Defining, calling, parameters, returns</span>
          </div>
          <div className="border-l-4 border-black pl-3 py-2 bg-gray-50">
            <strong className="text-black uppercase font-mono">OOP:</strong> 
            <span className="text-black ml-2 font-mono">Classes, objects, inheritance</span>
          </div>
          <div className="border-l-4 border-black pl-3 py-2 bg-gray-50">
            <strong className="text-black uppercase font-mono">RECURSION:</strong> 
            <span className="text-black ml-2 font-mono">Base cases, recursive calls</span>
          </div>
          <div className="border-l-4 border-black pl-3 py-2 bg-gray-50">
            <strong className="text-black uppercase font-mono">DATA STRUCTURES:</strong> 
            <span className="text-black ml-2 font-mono">Lists, dicts, sets, tuples</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStage1 = () => (
    // Stage 1: Just θ (appears on slide 4)
    <div className="flex items-center justify-center space-x-2 flex-wrap">
      <span className="font-bold text-lg text-black">P(success)</span>
      <span className="mx-2 font-bold text-xl">=</span>
      <span className="italic text-lg font-bold text-black">θ</span>
      <sub className="text-sm font-bold">i</sub>
      <span className="mx-2 font-bold text-xl text-gray-600">+ ? + ? x ?</span>
    </div>
  );

  const renderStage2 = () => (
    // Stage 2: θ + T part - simplified without sum and q
    <div className="flex items-center justify-center space-x-1 flex-wrap">
      <span className="font-bold text-lg text-black">P(success)</span>
      <span className="mx-2 font-bold text-xl">=</span>
      <span className="italic text-lg font-bold text-black">θ</span>
      <sub className="text-sm font-bold">i</sub>
      <span className="mx-2 font-bold text-xl">+</span>
      <span className="mx-2 font-bold text-xl text-gray-600">? +</span>
      <div className="mx-1 font-mono">
        <span className="mx-1 font-bold text-xl text-gray-600">? x </span>
        <span className="italic font-bold text-black">T</span>
        <sub className="text-sm font-bold">ik</sub>
      </div>
    </div>
  );

  const renderStage3 = () => (
    // Stage 3: Add task difficulty (β part) - simplified
    <div className="flex items-center justify-center space-x-1 flex-wrap">
      <span className="font-bold text-lg text-black">P(success)</span>
      <span className="mx-2 font-bold text-xl">=</span>
      <span className="italic text-lg font-bold text-black">θ</span>
      <sub className="text-sm font-bold">i</sub>
      <span className="mx-2 font-bold text-xl">+</span>
      <div className="mx-1 font-mono">
        <span className="italic font-bold text-black">β</span>
        <sub className="text-sm font-bold">k</sub>
      </div>
      <span className="mx-2 font-bold text-xl">+</span>
      <div className="mx-1 font-mono">
        <span className="mx-1 font-bold text-xl text-gray-600">? x </span>
        <span className="italic font-bold text-black">T</span>
        <sub className="text-sm font-bold">ik</sub>
      </div>
    </div>
  );

  const renderStage4 = () => (
    // Stage 4: Add learning rate (γ part with T) - removed α and L
    <div className="flex items-center justify-center space-x-1 flex-wrap">
      <span className="font-bold text-lg text-black">P(success)</span>
      <span className="mx-2 font-bold text-xl">=</span>
      <span className="italic text-lg font-bold text-black">θ</span>
      <sub className="text-sm font-bold">i</sub>
      <span className="mx-2 font-bold text-xl">+</span>
      <div className="mx-1 font-mono">
        <span className="italic font-bold text-black">β</span>
        <sub className="text-sm font-bold">k</sub>
      </div>
      <span className="mx-2 font-bold text-xl">+</span>
      <div className="mx-1 font-mono">
        <span className="italic font-bold text-black">γ</span>
        <sub className="text-sm font-bold">k</sub>
        <span className="italic font-bold text-black">T</span>
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
      <span className="italic text-lg font-bold text-black">θ</span>
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
        <span className="italic font-bold text-black">β</span>
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
        <span className="italic font-bold text-black">γ</span>
        <sub className="text-sm font-bold">k</sub>
        <span className="italic font-bold text-black">T</span>
        <sub className="text-sm font-bold">ik</sub>
      </div>
    </div>
  );

  const renderExamples = () => {
    const examples = [];
    
    if (stage >= 2) {
      examples.push(
        <div key="theta" className="flex items-center justify-between border border-black p-2 bg-gray-50">
          <div className="flex items-center gap-2">
            <span className="italic font-bold text-black">θ</span>
            <sub className="text-xs font-bold">i</sub>
          </div>
          <span className="font-mono text-sm bg-white px-2 py-1 border border-black">1.2</span>
          <span className="text-xs font-mono uppercase">(STUDENT ABILITY)</span>
        </div>
      );
    }
    
    if (stage >= 3) {
      examples.push(
        <div key="T" className="flex items-center justify-between border border-black p-2 bg-gray-50">
          <div className="flex items-center gap-2">
            <span className="italic font-bold text-black">T</span>
            <sub className="text-xs font-bold">ik</sub>
          </div>
          <span className="font-mono text-sm bg-white px-2 py-1 border border-black">2</span>
          <span className="text-xs font-mono uppercase">(PRACTICE OPP.)</span>
        </div>
      );
    }
    
    if (stage >= 4) {
      examples.push(
        <div key="beta" className="flex items-center justify-between border border-black p-2 bg-gray-50">
          <div className="flex items-center gap-2">
            <span className="italic font-bold text-black">β</span>
            <sub className="text-xs font-bold">k</sub>
          </div>
          <span className="font-mono text-sm bg-white px-2 py-1 border border-black">-0.8</span>
          <span className="text-xs font-mono uppercase">(TASK DIFFICULTY)</span>
        </div>
      );
    }
    
    if (stage >= 5) {
      examples.push(
        <div key="gamma" className="flex items-center justify-between border border-black p-2 bg-gray-50">
          <div className="flex items-center gap-2">
            <span className="italic font-bold text-black">γ</span>
            <sub className="text-xs font-bold">k</sub>
          </div>
          <span className="font-mono text-sm bg-white px-2 py-1 border border-black">0.3</span>
          <span className="text-xs font-mono uppercase">(LEARNING RATE)</span>
        </div>
      );
    }

    if (stage >= 6) {
      examples.push(
        <div key="q" className="flex items-center justify-between border border-black p-2 bg-gray-50">
          <div className="flex items-center gap-2">
            <span className="italic font-bold">q</span>
            <sub className="text-xs font-bold">ijk</sub>
          </div>
          <span className="font-mono text-sm bg-white px-2 py-1 border border-black">1</span>
          <span className="text-xs font-mono uppercase">(Q-MATRIX)</span>
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
        return "ADDITIVE FACTOR MODEL";
      case 2:
        return "BASE ABILITY (θ)";
      case 3:
        return "+ PRACTICE OPPORTUNITIES (T)";
      case 4:
        return "+ TASK DIFFICULTY (β)";
      case 5:
        return "+ LEARNING RATE (γ)";
      case 6:
        return "COMPLETE FORMULA";
      default:
        return "AFM FORMULA";
    }
  };

  const getStageConfig = () => {
    return `AFM-${String(stage).padStart(3, '0')}`;
  };

  const getStageIcon = () => {
    return stage === 1 ? Code : Calculator;
  };

  if (!stage) return null;

  const StageIcon = getStageIcon();

  return (
    <div className="fixed bottom-4 right-4 z-50 group">
      {/* Trigger button for narrow screens */}
      <div className="lg:hidden">
        <button className="bg-black text-white p-3 border-2 border-black hover:bg-gray-800 transition-colors">
          <div className="w-6 h-6 border border-white flex items-center justify-center bg-black">
            <StageIcon className="w-4 h-4 text-white" />
          </div>
        </button>
        
        {/* Tooltip content for narrow screens */}
        <div className="absolute bottom-full right-0 mb-2 w-80 max-w-[90vw] bg-white border-2 border-black shadow-xl p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
          {/* Technical corner brackets */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-black"></div>
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-black"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-black"></div>
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-black"></div>
          
          {/* Header */}
          <div className="text-center mb-3">
            <div className="inline-block border border-black px-2 py-1 mb-2">
              <span className="text-xs tracking-wider font-mono">{getStageConfig()}</span>
            </div>
            <div className="bg-black text-white px-3 py-1 font-bold text-xs tracking-wider flex items-center justify-center gap-1 uppercase">
              <div className="w-3 h-3 border border-white flex items-center justify-center bg-black">
                <StageIcon className="w-2 h-2 text-white" />
              </div>
              {getStageTitle()}
            </div>
          </div>
          
          {/* Formula content */}
          <div className="text-black font-mono select-none mb-3 overflow-x-auto">
            <div className="min-w-fit text-sm">
              {renderFormula()}
            </div>
          </div>

          {/* Example parameters */}
          {stage > 1 && (
            <div className="border-2 border-black p-3 bg-gray-50">
              <div className="text-center mb-2">
                <div className="inline-block border border-black px-2 py-1">
                  <span className="text-xs tracking-wider font-mono">PARAMETERS</span>
                </div>
              </div>
              <div className="space-y-2">
                {renderExamples()}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Always visible for large screens */}
      <div className="hidden lg:block max-w-sm w-auto">
        {/* Formula container */}
        <div className="bg-white border-2 border-black shadow-xl p-4 relative">
          {/* Technical corner brackets */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-black"></div>
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-black"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-black"></div>
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-black"></div>
          
          {/* Header */}
          <div className="text-center mb-3">
            <div className="inline-block border border-black px-2 py-1 mb-2">
              <span className="text-xs tracking-wider font-mono">{getStageConfig()}</span>
            </div>
            <div className="bg-black text-white px-3 py-1 font-bold text-xs tracking-wider flex items-center justify-center gap-1 uppercase">
              <div className="w-3 h-3 border border-white flex items-center justify-center bg-black">
                <StageIcon className="w-2 h-2 text-white" />
              </div>
              {getStageTitle()}
            </div>
          </div>
          
          {/* Formula content */}
          <div className="text-black font-mono select-none mb-3 overflow-x-auto">
            <div className="min-w-fit text-sm">
              {renderFormula()}
            </div>
          </div>

          {/* Example parameters */}
          {stage > 1 && (
            <div className="border-2 border-black p-3 bg-gray-50">
              <div className="text-center mb-2">
                <div className="inline-block border border-black px-2 py-1">
                  <span className="text-xs tracking-wider font-mono">PARAMETERS</span>
                </div>
              </div>
              <div className="space-y-2">
                {renderExamples()}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Demo component to show different stages
export const AFMDemo = () => {
  const [currentStage, setCurrentStage] = React.useState(1);

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
      
      <div className="relative flex-1 px-8 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="border-2 border-black p-6 bg-white mb-8 relative">
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-black"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-black"></div>
            
            <div className="text-center space-y-3">
              <div className="inline-block border border-black px-3 py-1 mb-2">
                <span className="text-xs tracking-wider font-mono">AFM FORMULA DEMO</span>
              </div>
              <h1 className="text-2xl font-bold uppercase tracking-wider text-black">
                ADDITIVE FACTOR MODEL TOOLTIP
              </h1>
              <p className="text-sm font-mono leading-relaxed">
                INTERACTIVE FORMULA VISUALIZATION • STAGE-BY-STAGE BREAKDOWN
              </p>
            </div>
          </div>

          <div className="text-center mb-8">
            <div className="inline-block border-2 border-black p-4 bg-white">
              <div className="flex items-center justify-center gap-4 mb-4">
                <button 
                  onClick={() => setCurrentStage(Math.max(1, currentStage - 1))}
                  className="bg-black text-white px-4 py-2 border-2 border-black hover:bg-gray-800 font-mono uppercase tracking-wider disabled:opacity-50"
                  disabled={currentStage === 1}
                >
                  ← PREV
                </button>
                <div className="font-mono text-lg">
                  STAGE {currentStage} / 6
                </div>
                <button 
                  onClick={() => setCurrentStage(Math.min(6, currentStage + 1))}
                  className="bg-black text-white px-4 py-2 border-2 border-black hover:bg-gray-800 font-mono uppercase tracking-wider disabled:opacity-50"
                  disabled={currentStage === 6}
                >
                  NEXT →
                </button>
              </div>
            </div>
          </div>

          <div className="text-center text-sm font-mono mb-4">
            TOOLTIP APPEARS IN BOTTOM-RIGHT CORNER
          </div>
        </div>
      </div>

      <AFMFormulaTooltip stage={currentStage} />
    </div>
  );
};