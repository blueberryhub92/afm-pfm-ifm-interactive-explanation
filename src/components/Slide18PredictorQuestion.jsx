import { useState, useRef } from "react";
import { 
  Brain, 
  Target, 
  TrendingUp, 
  Play, 
  CheckCircle, 
  XCircle, 
  ArrowRight,
  Lightbulb,
  Calculator,
  RefreshCw,
  Clock
} from "lucide-react";

export const Slide18PredictorQuestion = ({ scroll }) => {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [hoveredTerm, setHoveredTerm] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0, side: 'right' });

  const learningSessionRef = useRef(null);
  const practiceOpportunitiesRef = useRef(null);
  const parametersRef = useRef(null);
  const afmModelRef = useRef(null);

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

  const options = [
    { value: "student ability", label: "Student Ability", icon: <Brain className="w-5 h-5" />, color: "blue" },
    { value: "task difficulty", label: "Task Difficulty", icon: <Target className="w-5 h-5" />, color: "purple" },
    { value: "practice opportunities", label: "Practice Opportunities", icon: <Play className="w-5 h-5" />, color: "green" },
    { value: "learning rate", label: "Learning Rate", icon: <TrendingUp className="w-5 h-5" />, color: "orange" }
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

  const steps = [
    {
      title: "The Question",
      content: (
        <div className="space-y-6">
          <div className="border-l-8 border-red-600 bg-red-100 p-6 rounded-r-xl">
            <p className="text-black text-xl font-bold leading-relaxed">
              Which of the following <span className="text-red-600 font-black">changes throughout a learning session</span>?
            </p>
          </div>
          
          <div className="border-4 border-blue-600 rounded-xl p-6 bg-blue-50">
            <div className="flex items-center gap-3 mb-4">
              <Calculator className="w-8 h-8 text-blue-600" />
              <h3 className="text-xl font-bold text-blue-700 uppercase tracking-wide">Key Insight</h3>
            </div>
            <p className="text-black text-lg font-bold leading-relaxed">
              This question is asking about dynamic vs. static parameters during a{' '}
              <span 
                ref={learningSessionRef}
                className="cursor-help bg-blue-200 px-2 py-1 border-2 border-blue-600 rounded text-blue-800 font-bold hover:bg-blue-300 transition-all"
                onMouseEnter={() => handleMouseEnter('learning-session', learningSessionRef)}
                onMouseLeave={() => setHoveredTerm(null)}
              >
                single learning session
              </span>
              .
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {options.map((option) => (
              <label
                key={option.value}
                className={`border-4 rounded-xl p-6 cursor-pointer transition-all font-bold text-lg uppercase tracking-wider shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-4 ${
                  selectedAnswer === option.value
                    ? `bg-${option.color}-500 text-white border-${option.color}-700`
                    : `bg-white text-black border-black hover:bg-${option.color}-50`
                }`}
              >
                <input
                  type="radio"
                  name="predictor"
                  value={option.value}
                  checked={selectedAnswer === option.value}
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                  className="sr-only"
                />
                <div className={`p-2 rounded-lg border-2 ${
                  selectedAnswer === option.value 
                    ? 'bg-white text-black border-white' 
                    : `bg-${option.color}-100 border-${option.color}-600`
                }`}>
                  {option.icon}
                </div>
                <span className="flex-1">{option.label}</span>
                {selectedAnswer === option.value && (
                  <CheckCircle className="w-6 h-6" />
                )}
              </label>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "Answer & Explanation",
      content: (
        <div className="space-y-6">
          {/* Result Header */}
          <div className={`border-4 rounded-xl p-8 shadow-lg relative ${
            selectedAnswer === "practice opportunities" 
              ? "border-green-600 bg-gradient-to-r from-green-100 to-green-200" 
              : "border-red-600 bg-gradient-to-r from-red-100 to-red-200"
          }`}>
            <div className={`absolute -top-6 left-4 px-3 py-1 text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2 ${
              selectedAnswer === "practice opportunities" ? "bg-green-600" : "bg-red-600"
            }`}>
              {selectedAnswer === "practice opportunities" ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <XCircle className="w-4 h-4" />
              )}
              Result
            </div>
            
            <div className="text-center">
              {selectedAnswer === "practice opportunities" ? (
                <div className="text-4xl font-black text-green-800 uppercase tracking-wider">
                  Correct!
                </div>
              ) : (
                <div className="text-4xl font-black text-red-800 uppercase tracking-wider">
                  Not Quite!
                </div>
              )}
            </div>
          </div>

          {/* Correct Answer Explanation */}
          <div className="border-4 border-green-600 rounded-xl p-6 bg-green-50">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <h3 className="text-xl font-bold text-green-700 uppercase tracking-wide">Correct Answer</h3>
            </div>
            <p className="text-black text-lg font-bold leading-relaxed mb-4">
              <span 
                ref={practiceOpportunitiesRef}
                className="cursor-help bg-green-200 px-2 py-1 border-2 border-green-600 rounded text-green-800 font-bold hover:bg-green-300 transition-all"
                onMouseEnter={() => handleMouseEnter('practice-opportunities', practiceOpportunitiesRef)}
                onMouseLeave={() => setHoveredTerm(null)}
              >
                Practice Opportunities (T)
              </span>
              {' '}is the only parameter that changes during a learning session.
            </p>
            
            <div className="bg-white border-2 border-green-600 rounded-lg p-4">
              <div className="font-bold text-green-800 mb-2">Why Practice Opportunities?</div>
              <div className="text-green-900 text-sm space-y-1">
                <div>• Every time you attempt a problem, T increases by 1</div>
                <div>• This accumulates your practice experience</div>
                <div>• More practice = higher success probability</div>
              </div>
            </div>
          </div>

          {/* Mathematical Impact */}
          <div className="border-4 border-blue-600 rounded-xl p-6 bg-blue-50">
            <div className="flex items-center gap-3 mb-4">
              <Lightbulb className="w-8 h-8 text-blue-600" />
              <h3 className="text-xl font-bold text-blue-700 uppercase tracking-wide">Mathematical Impact</h3>
            </div>
            
            <div className="bg-black text-blue-400 p-4 rounded-lg border-2 border-blue-600 font-mono text-sm text-center mb-4">
              <div className="text-blue-300 mb-2">DYNAMIC COMPONENT:</div>
              <div className="text-white">γₖ × Tᵢₖ</div>
              <div className="text-blue-300 text-xs mt-2">Only T changes during session</div>
            </div>
            
            <p className="text-black text-lg font-bold leading-relaxed mb-4">
              In the{' '}
              <span 
                ref={afmModelRef}
                className="cursor-help bg-blue-200 px-2 py-1 border-2 border-blue-600 rounded text-blue-800 font-bold hover:bg-blue-300 transition-all"
                onMouseEnter={() => handleMouseEnter('afm-model', afmModelRef)}
                onMouseLeave={() => setHoveredTerm(null)}
              >
                AFM model
              </span>
              , success probability increases through practice accumulation, not ability growth during the session.
            </p>
            
            <div className="space-y-2">
              <div className="bg-white border-2 border-blue-600 rounded-lg p-3">
                <div className="font-mono text-blue-900 text-sm">
                  T₀ = 0: γ × 0 = 0 (no practice benefit yet)
                </div>
              </div>
              <div className="bg-white border-2 border-blue-600 rounded-lg p-3">
                <div className="font-mono text-blue-900 text-sm">
                  T₁ = 1: γ × 1 = γ (first practice benefit kicks in)
                </div>
              </div>
              <div className="bg-white border-2 border-blue-600 rounded-lg p-3">
                <div className="font-mono text-blue-900 text-sm">
                  T₂ = 2: γ × 2 = 2γ (accumulated practice benefit grows)
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  // Tooltips
  const LearningSessionTooltip = () => (
    <div 
      className="fixed z-50 bg-white border-4 border-black rounded-xl shadow-lg p-6 w-96 font-['IBM_Plex_Mono',monospace]"
      style={{ 
        left: `${tooltipPosition.x}px`, 
        top: `${tooltipPosition.y}px`,
        maxWidth: '384px'
      }}
    >
      <div className="border-4 border-blue-600 rounded-xl p-4 bg-blue-50 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-5 h-5 text-blue-700" />
          <span className="font-bold text-blue-700 uppercase tracking-wide">Learning Session</span>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="border-4 border-green-600 rounded-xl p-3 bg-green-50">
          <div className="font-bold text-green-800 text-sm mb-2">During Session:</div>
          <ul className="text-xs text-green-700 font-mono space-y-1">
            <li>• Student is actively working on problems</li>
            <li>• Each attempt happens in real-time</li>
            <li>• Continuous progression through tasks</li>
          </ul>
        </div>
        
        <div className="border-4 border-purple-600 rounded-xl p-3 bg-purple-50">
          <div className="font-bold text-purple-800 text-sm mb-2">Between Sessions:</div>
          <ul className="text-xs text-purple-700 font-mono space-y-1">
            <li>• Time gap between learning periods</li>
            <li>• New session starts fresh (after model was retrained)</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const ParametersTooltip = () => (
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
          <Calculator className="w-5 h-5 text-orange-700" />
          <span className="font-bold text-orange-700 uppercase tracking-wide">AFM Parameters</span>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="border-l-4 border-blue-600 bg-blue-100 px-3 py-2 rounded-r-lg">
          <div className="font-bold text-blue-800 text-sm">θ (theta)</div>
          <div className="text-blue-700 text-xs font-mono">Student ability - fixed during session</div>
        </div>
        <div className="border-l-4 border-purple-600 bg-purple-100 px-3 py-2 rounded-r-lg">
          <div className="font-bold text-purple-800 text-sm">β (beta)</div>
          <div className="text-purple-700 text-xs font-mono">Task difficulty - fixed during session</div>
        </div>
        <div className="border-l-4 border-orange-600 bg-orange-100 px-3 py-2 rounded-r-lg">
          <div className="font-bold text-orange-800 text-sm">γ (gamma)</div>
          <div className="text-orange-700 text-xs font-mono">Learning rate - fixed during session</div>
        </div>
        <div className="border-l-4 border-green-600 bg-green-100 px-3 py-2 rounded-r-lg">
          <div className="font-bold text-green-800 text-sm">T</div>
          <div className="text-green-700 text-xs font-mono">Practice opportunities - CHANGES during session</div>
        </div>
      </div>
    </div>
  );

  const PracticeOpportunitiesTooltip = () => (
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
          <Play className="w-5 h-5 text-green-700" />
          <span className="font-bold text-green-700 uppercase tracking-wide">Practice Opportunities (T)</span>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="border-4 border-green-600 rounded-xl p-3 bg-green-50">
          <div className="font-bold text-green-800 text-sm mb-2">How it Changes:</div>
          <div className="text-xs text-green-700 font-mono">
            T₀ = 0 → T₁ = 1 → T₂ = 2 → T₃ = 3...
          </div>
        </div>
        
        <div className="border-4 border-blue-600 rounded-xl p-3 bg-blue-50">
          <div className="font-bold text-blue-800 text-sm mb-2">Mathematical Impact:</div>
          <div className="text-xs text-blue-700 font-mono">
            γ × T grows as T increases, boosting success probability
          </div>
        </div>
      </div>
    </div>
  );

  const AFMModelTooltip = () => (
    <div 
      className="fixed z-50 bg-white border-4 border-black rounded-xl shadow-lg p-6 w-96 font-['IBM_Plex_Mono',monospace]"
      style={{ 
        left: `${tooltipPosition.x}px`, 
        top: `${tooltipPosition.y}px`,
        maxWidth: '384px'
      }}
    >
      <div className="border-4 border-blue-600 rounded-xl p-4 bg-blue-50 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Calculator className="w-5 h-5 text-blue-700" />
          <span className="font-bold text-blue-700 uppercase tracking-wide">AFM Model Assumption</span>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="border-4 border-green-600 rounded-xl p-3 bg-green-50">
          <div className="font-bold text-green-800 text-sm mb-2">Key Assumption:</div>
          <div className="text-xs text-green-700 font-mono">
            Underlying ability doesn't change mid-session - only practice accumulates
          </div>
        </div>
        
        <div className="border-4 border-purple-600 rounded-xl p-3 bg-purple-50">
          <div className="font-bold text-purple-800 text-sm mb-2">Implication:</div>
          <div className="text-xs text-purple-700 font-mono">
            Success probability increases through practice, not ability growth
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white min-h-screen flex flex-col text-black font-['IBM_Plex_Mono',monospace]">
      {/* Header */}
      <div className="border-b-8 border-black bg-red-400 px-8 py-6 shadow-lg">
        <div className="flex items-center justify-center">
          <span className="text-black font-bold text-2xl uppercase tracking-wider">
            Which Parameter Changes During Learning?
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
                      index <= currentStep ? 'bg-red-600' : 'bg-gray-200'
                    }`}
                  />
                  {index < steps.length - 1 && (
                    <div className={`w-12 h-1 border-t-2 border-black ${
                      index < currentStep ? 'bg-red-600' : 'bg-gray-200'
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
                disabled={currentStep === 0 && !selectedAnswer}
                className="px-6 py-3 bg-red-600 text-white border-4 border-black rounded-xl font-bold uppercase tracking-wide hover:bg-white hover:text-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={() => scroll(19)}
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
      {hoveredTerm === 'learning-session' && <LearningSessionTooltip />}
      {hoveredTerm === 'parameters' && <ParametersTooltip />}
      {hoveredTerm === 'practice-opportunities' && <PracticeOpportunitiesTooltip />}
      {hoveredTerm === 'afm-model' && <AFMModelTooltip />}
    </div>
  );
};