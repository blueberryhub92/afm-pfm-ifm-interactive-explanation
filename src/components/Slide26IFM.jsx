import { CheckCircle, XCircle, TrendingUp, Calculator, ArrowRight, BarChart3, HelpCircle, Lightbulb, BookOpen, Brain, Target, Zap } from 'lucide-react';
import { useState, useRef } from 'react';

// Slide 26: IFM Introduction and Comparison with AFM (Adapted to match Slide22 styling)
export const Slide26IFM = ({ scroll }) => {
  const [hoveredTerm, setHoveredTerm] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0, side: 'right' });
  const [currentStep, setCurrentStep] = useState(0);
  
  const ifmRef = useRef(null);
  const afmRef = useRef(null);
  const hintsRef = useRef(null);

  // Simple tooltip position calculation
  const calculateTooltipPosition = () => {
    const margin = 16;
    return { x: margin, y: margin, side: 'top-left' };
  };

  const handleMouseEnter = (term, ref) => {
    setHoveredTerm(term);
    const position = calculateTooltipPosition();
    setTooltipPosition(position);
  };

  const steps = [
    {
      title: "Introducing the Input Factor Model",
      content: (
        <div className="space-y-6">
          <div className="border-l-8 border-orange-600 bg-orange-100 p-6 rounded-r-xl">
            <p className="text-black text-xl font-bold leading-relaxed">
              Now let's explore another important learning model: the{' '}
              <span 
                ref={ifmRef}
                className="cursor-help bg-orange-200 px-2 py-1 border-2 border-orange-600 rounded text-orange-800 font-bold hover:bg-orange-300 transition-all"
                onMouseEnter={() => handleMouseEnter('ifm', ifmRef)}
                onMouseLeave={() => setHoveredTerm(null)}
              >
                Input Factor Model (IFM)
              </span>
              . This model takes a different approach by focusing specifically on how hints and guided assistance affect learning.
            </p>
          </div>
          
          <div className="border-4 border-gray-600 rounded-xl p-6 bg-gray-50">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="w-8 h-8 text-gray-600" />
              <h3 className="text-xl font-bold text-gray-700 uppercase tracking-wide">Basic Structure</h3>
            </div>
            <p className="text-black text-lg font-bold leading-relaxed mb-4">
              Both models use the same basic structure:
            </p>
            <div className="bg-black text-green-400 p-4 rounded-lg border-2 border-gray-600 font-mono text-sm text-center">
              <div className="text-white">log(p/(1-p)) = θᵢ + Σₖ qⱼₖ(βₖ + <span className="bg-orange-600 px-2 py-1 rounded text-white font-bold">hint learning terms</span>)</div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Key Differences Between AFM and IFM",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* AFM Card */}
            <div className="border-4 border-green-600 rounded-xl p-6 bg-green-50">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-8 h-8 text-green-600" />
                <h3 className="text-xl font-bold text-green-700 uppercase tracking-wide">AFM Approach</h3>
              </div>
              <p className="text-black font-bold text-lg leading-relaxed">
                The{' '}
                <span 
                  ref={afmRef}
                  className="cursor-help bg-green-200 px-2 py-1 border-2 border-green-600 rounded text-green-800 font-bold hover:bg-green-300 transition-all"
                  onMouseEnter={() => handleMouseEnter('afm', afmRef)}
                  onMouseLeave={() => setHoveredTerm(null)}
                >
                  AFM treats all practice equally
                </span>
                {' '}– whether you receive hints or work independently, it counts as ONE learning opportunity.
              </p>
            </div>

            {/* IFM Card */}
            <div className="border-4 border-orange-600 rounded-xl p-6 bg-orange-50">
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="w-8 h-8 text-orange-600" />
                <h3 className="text-xl font-bold text-orange-700 uppercase tracking-wide">IFM Innovation</h3>
              </div>
              <p className="text-black font-bold text-lg leading-relaxed">
                IFM recognizes: <em>scaffolded learning through hints creates different knowledge patterns</em>. Uses dedicated{' '}
                <span 
                  ref={hintsRef}
                  className="cursor-help bg-orange-200 px-2 py-1 border-2 border-orange-600 rounded text-orange-800 font-bold hover:bg-orange-300 transition-all"
                  onMouseEnter={() => handleMouseEnter('hints', hintsRef)}
                  onMouseLeave={() => setHoveredTerm(null)}
                >
                  hint learning parameters
                </span>
                {' '}(γₖʰⁱⁿᵗ and Hᵢₖ).
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Real-World Impact and Applications",
      content: (
        <div className="space-y-6">
          <div className="border-4 border-purple-600 rounded-xl p-6 bg-purple-50">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="w-8 h-8 text-purple-600" />
              <h3 className="text-xl font-bold text-purple-700 uppercase tracking-wide">Real-World Insight</h3>
            </div>
            <p className="text-black text-lg font-bold leading-relaxed">
              Hints provide scaffolding that can accelerate learning by guiding students toward correct reasoning paths, but this guided learning may have different long-term effects than independent discovery.
            </p>
          </div>

          <div className="border-4 border-blue-600 rounded-xl p-6 bg-blue-50">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-8 h-8 text-blue-600" />
              <h3 className="text-xl font-bold text-blue-700 uppercase tracking-wide">Practical Application</h3>
            </div>
            <p className="text-black text-lg font-bold leading-relaxed">
              This focus on hints makes IFM particularly valuable for intelligent tutoring systems where hint-giving is a primary instructional strategy. The model can distinguish between scaffolded and independent learning patterns.
            </p>
          </div>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const IFMTooltip = () => (
    <div 
      className="fixed z-50 bg-white border-4 border-black rounded-xl shadow-lg p-6 w-96 font-['IBM_Plex_Mono',monospace]"
      style={{ 
        left: `${tooltipPosition.x}px`, 
        top: `${tooltipPosition.y}px`,
        maxWidth: '384px'
      }}
    >
      <div className="border-4 border-orange-600 rounded-xl p-4 bg-orange-50 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Target className="w-5 h-5 text-orange-700" />
          <span className="font-bold text-orange-700 uppercase tracking-wide">Input Factor Model</span>
        </div>
        
        <div className="bg-black text-orange-400 p-3 rounded-lg border-2 border-orange-600 font-mono text-xs">
          <div className="text-orange-300 mb-2">IFM FORMULA:</div>
          <div className="text-white">log(p/(1-p)) = θᵢ + Σₖ qⱼₖ(βₖ + γₖʰⁱⁿᵗ·Hᵢₖ)</div>
        </div>
      </div>
      
      <div className="space-y-2 text-sm text-black">
        <div className="border-l-4 border-blue-600 bg-blue-100 px-3 py-1 rounded-r-lg">
          <strong>θᵢ:</strong> Student i's baseline proficiency
        </div>
        <div className="border-l-4 border-purple-600 bg-purple-100 px-3 py-1 rounded-r-lg">
          <strong>βₖ:</strong> Difficulty of skill k
        </div>
        <div className="border-l-4 border-orange-600 bg-orange-100 px-3 py-1 rounded-r-lg">
          <strong>γₖʰⁱⁿᵗ:</strong> Learning rate from hints
        </div>
        <div className="border-l-4 border-yellow-600 bg-yellow-100 px-3 py-1 rounded-r-lg">
          <strong>Hᵢₖ:</strong> Hints received count
        </div>
      </div>
      
      <div className="border-4 border-green-600 rounded-xl p-4 bg-green-50 mt-4">
        <div className="flex items-center gap-2 mb-2">
          <Brain className="w-5 h-5 text-green-700" />
          <span className="font-bold text-green-700 uppercase tracking-wide">Key Innovation</span>
        </div>
        <p className="text-green-800 text-sm font-mono">
          IFM focuses specifically on hint-assisted learning!
        </p>
      </div>
    </div>
  );

  const AFMTooltip = () => (
    <div 
      className="fixed z-50 bg-white border-4 border-black rounded-xl shadow-lg p-6 w-96 font-['IBM_Plex_Mono',monospace]"
      style={{ 
        left: `${tooltipPosition.x}px`, 
        top: `${tooltipPosition.y}px`,
        maxWidth: '384px'
      }}
    >
      <div className="border-4 border-green-600 rounded-xl p-4 bg-green-50 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-5 h-5 text-green-700" />
          <span className="font-bold text-green-700 uppercase tracking-wide">Additive Factor Model</span>
        </div>
        
        <div className="bg-black text-green-400 p-3 rounded-lg border-2 border-green-600 font-mono text-xs">
          <div className="text-green-300 mb-2">AFM FORMULA:</div>
          <div className="text-white">log(p/(1-p)) = θᵢ + Σₖ qⱼₖ(βₖ + γₖ·Tᵢₖ)</div>
        </div>
      </div>
      
      <div className="space-y-2 text-sm text-black">
        <div className="border-l-4 border-blue-600 bg-blue-100 px-3 py-1 rounded-r-lg">
          <strong>θᵢ:</strong> Student i's baseline proficiency
        </div>
        <div className="border-l-4 border-purple-600 bg-purple-100 px-3 py-1 rounded-r-lg">
          <strong>βₖ:</strong> Difficulty of skill k
        </div>
        <div className="border-l-4 border-orange-600 bg-orange-100 px-3 py-1 rounded-r-lg">
          <strong>γₖ:</strong> Learning rate for skill k
        </div>
        <div className="border-l-4 border-gray-600 bg-gray-100 px-3 py-1 rounded-r-lg">
          <strong>Tᵢₖ:</strong> Practice opportunities count
        </div>
      </div>
      
      <div className="border-4 border-blue-600 rounded-xl p-4 bg-blue-50 mt-4">
        <div className="flex items-center gap-2 mb-2">
          <Target className="w-5 h-5 text-blue-700" />
          <span className="font-bold text-blue-700 uppercase tracking-wide">Limitation</span>
        </div>
        <p className="text-blue-800 text-sm font-mono">
          AFM doesn't distinguish hint-assisted vs independent learning!
        </p>
      </div>
    </div>
  );

  const HintsTooltip = () => (
    <div 
      className="fixed z-50 bg-white border-4 border-black rounded-xl shadow-lg p-6 w-80 font-['IBM_Plex_Mono',monospace]"
      style={{ 
        left: `${tooltipPosition.x}px`, 
        top: `${tooltipPosition.y}px`,
        maxWidth: '320px'
      }}
    >
      <div className="border-4 border-purple-600 rounded-xl p-4 bg-purple-50 mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="w-5 h-5 text-purple-700" />
          <span className="font-bold text-purple-700 uppercase tracking-wide text-sm">Hint-Based Learning</span>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="border-4 border-orange-600 rounded-xl p-3 bg-orange-50">
          <div className="font-bold text-orange-800 text-sm">γₖʰⁱⁿᵗ (HINT RATE)</div>
          <div className="text-xs text-orange-700 font-mono">Learning from receiving hints</div>
        </div>
        
        <div className="border-4 border-yellow-600 rounded-xl p-3 bg-yellow-50">
          <div className="font-bold text-yellow-800 text-sm">Hᵢₖ (HINT COUNT)</div>
          <div className="text-xs text-yellow-700 font-mono">Number of hints received</div>
        </div>
      </div>
      
      <div className="border-4 border-green-600 rounded-xl p-3 bg-green-50 mt-4">
        <div className="font-bold text-green-800 text-xs mb-1">EXAMPLE:</div>
        <div className="text-xs text-green-700 font-mono">
          Algebra: γʰⁱⁿᵗ = 0.15 means hints provide substantial scaffolding benefit
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white min-h-screen flex flex-col text-black font-['IBM_Plex_Mono',monospace]">
      {/* Header */}
      <div className="border-b-8 border-black bg-orange-400 px-8 py-6 shadow-lg">
        <div className="flex items-center justify-center">
          <span className="text-black font-bold text-2xl uppercase tracking-wider">
            AFM vs Input Factor Model (IFM)
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Indicator */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              {steps.map((_, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className={`w-4 h-4 rounded-full border-2 border-black ${
                      index <= currentStep ? 'bg-orange-600' : 'bg-gray-200'
                    }`}
                  />
                  {index < steps.length - 1 && (
                    <div className={`w-12 h-1 border-t-2 border-black ${
                      index < currentStep ? 'bg-orange-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg mb-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-black uppercase tracking-tight">
              {steps[currentStep].title}
            </h2>
            
            {steps[currentStep].content}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="px-6 py-3 bg-gray-600 text-white border-4 border-black rounded-xl font-bold uppercase tracking-wide hover:bg-white hover:text-gray-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Previous
            </button>

            <div className="px-6 py-3 bg-white border-4 border-black rounded-xl font-bold text-black uppercase tracking-wide">
              Step {currentStep + 1} of {steps.length}
            </div>

            {currentStep < steps.length - 1 ? (
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-orange-600 text-white border-4 border-black rounded-xl font-bold uppercase tracking-wide hover:bg-white hover:text-orange-600 transition-all"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={() => scroll(27)}
                className="px-8 py-4 bg-green-600 text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-green-600 transition-all transform hover:scale-105 flex items-center gap-3"
              >
                <span>Continue to Next Slide</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tooltips */}
      {hoveredTerm === 'ifm' && <IFMTooltip />}
      {hoveredTerm === 'afm' && <AFMTooltip />}
      {hoveredTerm === 'hints' && <HintsTooltip />}
    </div>
  );
};