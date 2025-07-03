import { Zap, Clock, Lightbulb, ArrowRight, Target, Brain, TrendingUp } from "lucide-react";
import { useState, useRef } from 'react';

export const Slide17LearningRateExplanation = ({ scroll }) => {
  const [hoveredTerm, setHoveredTerm] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0, side: 'right' });
  const [currentStep, setCurrentStep] = useState(0);
  
  const fastLearningRef = useRef(null);
  const slowLearningRef = useRef(null);
  const afmConnectionRef = useRef(null);
  const difficultyRef = useRef(null);

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
      title: "Understanding Different Learning Rates",
      content: (
        <div className="space-y-6">
          <div className="border-l-8 border-blue-600 bg-blue-100 p-6 rounded-r-xl">
            <p className="text-black text-xl font-bold leading-relaxed">
              Not all tasks are learned at the same speed. Let's explore why some skills have{' '}
              <span 
                ref={fastLearningRef}
                className="cursor-help bg-green-200 px-2 py-1 border-2 border-green-600 rounded text-green-800 font-bold hover:bg-green-300 transition-all"
                onMouseEnter={() => handleMouseEnter('fast', fastLearningRef)}
                onMouseLeave={() => setHoveredTerm(null)}
              >
                fast learning rates
              </span>
              {' '}while others have{' '}
              <span 
                ref={slowLearningRef}
                className="cursor-help bg-purple-200 px-2 py-1 border-2 border-purple-600 rounded text-purple-800 font-bold hover:bg-purple-300 transition-all"
                onMouseEnter={() => handleMouseEnter('slow', slowLearningRef)}
                onMouseLeave={() => setHoveredTerm(null)}
              >
                slow learning rates
              </span>
              .
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Fast Learning Rate - Task A */}
            <div className="border-4 border-green-600 rounded-xl p-6 bg-green-50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-600 text-white rounded-lg flex items-center justify-center text-2xl font-black border-2 border-black">
                  A
                </div>
                <h3 className="text-xl font-bold text-green-700 uppercase tracking-wide">Fast Learning</h3>
              </div>
              <div className="space-y-3">
                <div className="bg-green-100 border-2 border-green-600 rounded-lg p-3">
                  <div className="font-bold text-green-800 text-sm flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Immediate Feedback
                  </div>
                  <div className="text-green-900 font-mono text-xs">Each function either works or doesn't</div>
                </div>
                <div className="bg-green-100 border-2 border-green-600 rounded-lg p-3">
                  <div className="font-bold text-green-800 text-sm flex items-center gap-2">
                    <Lightbulb className="w-4 h-4" />
                    Clear Patterns
                  </div>
                  <div className="text-green-900 font-mono text-xs">Syntax and logic become recognizable quickly</div>
                </div>
              </div>
            </div>

            {/* Slow Learning Rate - Task B */}
            <div className="border-4 border-purple-600 rounded-xl p-6 bg-purple-50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-purple-600 text-white rounded-lg flex items-center justify-center text-2xl font-black border-2 border-black">
                  B
                </div>
                <h3 className="text-xl font-bold text-purple-700 uppercase tracking-wide">Slow Learning</h3>
              </div>
              <div className="space-y-3">
                <div className="bg-purple-100 border-2 border-purple-600 rounded-lg p-3">
                  <div className="font-bold text-purple-800 text-sm flex items-center gap-2">
                    <Brain className="w-4 h-4" />
                    Abstract Thinking
                  </div>
                  <div className="text-purple-900 font-mono text-xs">Requires developing mental models</div>
                </div>
                <div className="bg-purple-100 border-2 border-purple-600 rounded-lg p-3">
                  <div className="font-bold text-purple-800 text-sm flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Delayed Understanding
                  </div>
                  <div className="text-purple-900 font-mono text-xs">"Aha!" moments come after extended practice</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "The Mathematical Connection: AFM Model",
      content: (
        <div className="space-y-6">
          <div className="border-4 border-orange-600 rounded-xl p-6 bg-orange-50">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-8 h-8 text-orange-600" />
              <h3 className="text-xl font-bold text-orange-700 uppercase tracking-wide">AFM Connection</h3>
            </div>
            <p className="text-black text-lg font-bold leading-relaxed mb-4">
              In the{' '}
              <span 
                ref={afmConnectionRef}
                className="cursor-help bg-orange-200 px-2 py-1 border-2 border-orange-600 rounded text-orange-800 font-bold hover:bg-orange-300 transition-all"
                onMouseEnter={() => handleMouseEnter('afm', afmConnectionRef)}
                onMouseLeave={() => setHoveredTerm(null)}
              >
                Additive Factor Model
              </span>
              , learning rate (γ) and opportunities (T) are mathematically connected and inversely related.
            </p>
            
            <div className="bg-black text-orange-400 p-4 rounded-lg border-2 border-orange-600 font-mono text-sm text-center mb-4">
              <div className="text-orange-300 mb-2">AFM FORMULA:</div>
              <div className="text-white">log(p/(1-p)) = θᵢ + Σₖ qⱼₖ(βₖ + γₖ·Tᵢₖ)</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-100 border-2 border-green-600 rounded-lg p-4">
                <div className="font-bold text-green-800 mb-2">When T is High (Many Opportunities)</div>
                <div className="text-green-900 font-mono text-sm">γ can be lower - small increments add up</div>
              </div>
              <div className="bg-red-100 border-2 border-red-600 rounded-lg p-4">
                <div className="font-bold text-red-800 mb-2">When T is Low (Few Opportunities)</div>
                <div className="text-red-900 font-mono text-sm">γ must be higher - each event more impactful</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Key Insights and Takeaways",
      content: (
        <div className="space-y-6">
          <div className="border-4 border-blue-600 rounded-xl p-6 bg-blue-50">
            <div className="flex items-center gap-3 mb-4">
              <Lightbulb className="w-8 h-8 text-blue-600" />
              <h3 className="text-xl font-bold text-blue-700 uppercase tracking-wide">Critical Distinction</h3>
            </div>
            <p className="text-black text-lg font-bold leading-relaxed">
              <span 
                ref={difficultyRef}
                className="cursor-help bg-yellow-200 px-2 py-1 border-2 border-yellow-600 rounded text-yellow-800 font-bold hover:bg-yellow-300 transition-all"
                onMouseEnter={() => handleMouseEnter('difficulty', difficultyRef)}
                onMouseLeave={() => setHoveredTerm(null)}
              >
                Learning Rate ≠ Task Difficulty
              </span>
              . A task can have fast learning rate but still be highly difficult overall.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-4 border-green-600 rounded-xl p-6 bg-green-50">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-6 h-6 text-green-600" />
                <h4 className="text-lg font-bold text-green-700 uppercase">Learning Rate</h4>
              </div>
              <p className="text-green-800 font-bold text-sm">
                How quickly you absorb new information and see progress in each practice session.
              </p>
            </div>

            <div className="border-4 border-red-600 rounded-xl p-6 bg-red-50">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-6 h-6 text-red-600" />
                <h4 className="text-lg font-bold text-red-700 uppercase">Task Difficulty</h4>
              </div>
              <p className="text-red-800 font-bold text-sm">
                How complex the final skill is to master completely.
              </p>
            </div>
          </div>

          <div className="border-4 border-purple-600 rounded-xl p-6 bg-purple-50">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="w-8 h-8 text-purple-600" />
              <h3 className="text-xl font-bold text-purple-700 uppercase tracking-wide">Example: Chess</h3>
            </div>
            <p className="text-black text-lg font-bold leading-relaxed">
              You learn the rules quickly (fast learning rate), but mastery takes years (high difficulty).
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

  const FastLearningTooltip = () => (
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
          <Zap className="w-5 h-5 text-green-700" />
          <span className="font-bold text-green-700 uppercase tracking-wide">Fast Learning Rate</span>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="border-4 border-green-600 rounded-xl p-3 bg-green-50">
          <div className="font-bold text-green-800 text-sm mb-2">Characteristics:</div>
          <ul className="text-xs text-green-700 font-mono space-y-1">
            <li>• Immediate feedback loops</li>
            <li>• Clear success/failure indicators</li>
            <li>• Incremental skill building</li>
            <li>• Concrete, testable results</li>
          </ul>
        </div>
        
        <div className="border-4 border-blue-600 rounded-xl p-3 bg-blue-50">
          <div className="font-bold text-blue-800 text-sm mb-1">Example:</div>
          <div className="text-xs text-blue-700 font-mono">
            Programming: Each function either compiles and works, or it doesn't. Quick feedback!
          </div>
        </div>
      </div>
    </div>
  );

  const SlowLearningTooltip = () => (
    <div 
      className="fixed z-50 bg-white border-4 border-black rounded-xl shadow-lg p-6 w-96 font-['IBM_Plex_Mono',monospace]"
      style={{ 
        left: `${tooltipPosition.x}px`, 
        top: `${tooltipPosition.y}px`,
        maxWidth: '384px'
      }}
    >
      <div className="border-4 border-purple-600 rounded-xl p-4 bg-purple-50 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-5 h-5 text-purple-700" />
          <span className="font-bold text-purple-700 uppercase tracking-wide">Slow Learning Rate</span>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="border-4 border-purple-600 rounded-xl p-3 bg-purple-50">
          <div className="font-bold text-purple-800 text-sm mb-2">Characteristics:</div>
          <ul className="text-xs text-purple-700 font-mono space-y-1">
            <li>• Abstract mental models required</li>
            <li>• Pattern recognition takes time</li>
            <li>• Multiple concepts must integrate</li>
            <li>• Delayed "aha!" moments</li>
          </ul>
        </div>
        
        <div className="border-4 border-orange-600 rounded-xl p-3 bg-orange-50">
          <div className="font-bold text-orange-800 text-sm mb-1">Example:</div>
          <div className="text-xs text-orange-700 font-mono">
            Mathematical proofs: Requires developing intuition for when to apply different approaches
          </div>
        </div>
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
      <div className="border-4 border-orange-600 rounded-xl p-4 bg-orange-50 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-5 h-5 text-orange-700" />
          <span className="font-bold text-orange-700 uppercase tracking-wide">AFM Mathematical Relationship</span>
        </div>
        
        <div className="bg-black text-orange-400 p-3 rounded-lg border-2 border-orange-600 font-mono text-xs">
          <div className="text-orange-300 mb-2">INVERSE RELATIONSHIP:</div>
          <div className="text-white">γ ∝ 1/T</div>
        </div>
      </div>
      
      <div className="space-y-2 text-sm text-black">
        <div className="border-l-4 border-blue-600 bg-blue-100 px-3 py-1 rounded-r-lg">
          <strong>γ (gamma):</strong> Learning rate parameter
        </div>
        <div className="border-l-4 border-purple-600 bg-purple-100 px-3 py-1 rounded-r-lg">
          <strong>T:</strong> Number of practice opportunities
        </div>
      </div>
      
      <div className="border-4 border-green-600 rounded-xl p-4 bg-green-50 mt-4">
        <div className="flex items-center gap-2 mb-2">
          <Brain className="w-5 h-5 text-green-700" />
          <span className="font-bold text-green-700 uppercase tracking-wide">Key Insight</span>
        </div>
        <p className="text-green-800 text-sm font-mono">
          Learning rate is bound to opportunities - they're mathematically connected in AFM!
        </p>
      </div>
    </div>
  );

  const DifficultyTooltip = () => (
    <div 
      className="fixed z-50 bg-white border-4 border-black rounded-xl shadow-lg p-6 w-80 font-['IBM_Plex_Mono',monospace]"
      style={{ 
        left: `${tooltipPosition.x}px`, 
        top: `${tooltipPosition.y}px`,
        maxWidth: '320px'
      }}
    >
      <div className="border-4 border-yellow-600 rounded-xl p-4 bg-yellow-50 mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Target className="w-5 h-5 text-yellow-700" />
          <span className="font-bold text-yellow-700 uppercase tracking-wide text-sm">Critical Distinction</span>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="border-4 border-green-600 rounded-xl p-3 bg-green-50">
          <div className="font-bold text-green-800 text-sm">LEARNING RATE</div>
          <div className="text-xs text-green-700 font-mono">Speed of progress per practice session</div>
        </div>
        
        <div className="border-4 border-red-600 rounded-xl p-3 bg-red-50">
          <div className="font-bold text-red-800 text-sm">TASK DIFFICULTY</div>
          <div className="text-xs text-red-700 font-mono">Overall complexity to achieve mastery</div>
        </div>
      </div>
      
      <div className="border-4 border-purple-600 rounded-xl p-3 bg-purple-50 mt-4">
        <div className="font-bold text-purple-800 text-xs mb-1">CHESS EXAMPLE:</div>
        <div className="text-xs text-purple-700 font-mono">
          Fast learning rate (rules learned quickly) + High difficulty (mastery takes years)
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white min-h-screen flex flex-col text-black font-['IBM_Plex_Mono',monospace]">
      {/* Header */}
      <div className="border-b-8 border-black bg-blue-400 px-8 py-6 shadow-lg">
        <div className="flex items-center justify-center">
          <span className="text-black font-bold text-2xl uppercase tracking-wider">
            Why Learning Rates Differ
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-8 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Progress Indicator */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              {steps.map((_, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className={`w-4 h-4 rounded-full border-2 border-black ${
                      index <= currentStep ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  />
                  {index < steps.length - 1 && (
                    <div className={`w-12 h-1 border-t-2 border-black ${
                      index < currentStep ? 'bg-blue-600' : 'bg-gray-200'
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
                className="px-6 py-3 bg-blue-600 text-white border-4 border-black rounded-xl font-bold uppercase tracking-wide hover:bg-white hover:text-blue-600 transition-all"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={() => scroll(18)}
                className="px-8 py-4 bg-green-600 text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-green-600 transition-all transform hover:scale-105 flex items-center gap-3"
              >
                <span>Continue</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tooltips */}
      {hoveredTerm === 'fast' && <FastLearningTooltip />}
      {hoveredTerm === 'slow' && <SlowLearningTooltip />}
      {hoveredTerm === 'afm' && <AFMTooltip />}
      {hoveredTerm === 'difficulty' && <DifficultyTooltip />}
    </div>
  );
};