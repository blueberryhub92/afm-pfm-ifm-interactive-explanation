import { CheckCircle, XCircle, TrendingUp, Calculator, ArrowRight, BarChart3, HelpCircle, Lightbulb, BookOpen, Brain, Target, Zap, Users, Clock, AlertTriangle } from 'lucide-react';
import { useState, useRef } from 'react';

const Layout = ({ children }) => (
  <div className="bg-white min-h-screen font-mono relative">
    {/* Grid background */}
    <div 
      className="absolute inset-0 opacity-60"
      style={{
        backgroundImage: 'linear-gradient(to right, #d1d5db 1px, transparent 1px), linear-gradient(to bottom, #d1d5db 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }}
    />
    
    <div className="relative flex-1 px-8 py-6">{children}</div>
  </div>
);

const TechnicalCard = ({ title, children, icon: Icon, config, variant = "default" }) => {
  const variants = {
    default: "bg-white text-black border-2 border-black",
    primary: "bg-black text-white border-2 border-black",
    accent: "bg-gray-100 text-black border-2 border-black"
  };

  return (
    <div className={`${variants[variant]} p-6 relative`}>
      {/* Technical corner marker */}
      <div className={`absolute top-2 right-2 w-2 h-2 border ${variant === 'primary' ? 'border-white bg-black' : 'border-black bg-white'}`} />
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 border ${variant === 'primary' ? 'border-white' : 'border-black'} flex items-center justify-center ${variant === 'primary' ? 'bg-black' : 'bg-white'}`}>
            <Icon className={`w-4 h-4 ${variant === 'primary' ? 'text-white' : 'text-black'}`} />
          </div>
          <div>
            <h3 className={`text-lg font-bold ${variant === 'primary' ? 'text-white' : 'text-black'} tracking-wider uppercase`}>
              {title}
            </h3>
            {config && (
              <span className={`text-xs font-mono ${variant === 'primary' ? 'text-gray-300' : 'text-gray-600'}`}>
                {config}
              </span>
            )}
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};

const SpecificationBox = ({ label, value, unit, variant = "default" }) => {
  const variants = {
    default: "border-black bg-white text-black",
    success: "border-green-600 bg-green-50 text-green-800",
    warning: "border-orange-600 bg-orange-50 text-orange-800",
    info: "border-blue-600 bg-blue-50 text-blue-800"
  };

  return (
    <div className={`${variants[variant]} border-2 p-3 relative`}>
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-current"></div>
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-current"></div>
      <div className="text-xs font-mono tracking-wider uppercase mb-1">{label}</div>
      <div className="font-bold text-sm">{value}</div>
      {unit && <div className="text-xs font-mono opacity-70">{unit}</div>}
    </div>
  );
};

const FormulaDisplay = ({ formula, description }) => (
  <div className="bg-black text-white p-4 border-2 border-black relative">
    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white"></div>
    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white"></div>
    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white"></div>
    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white"></div>
    
    <div className="text-center">
      <div className="text-xs font-mono tracking-wider uppercase mb-2 text-gray-300">{description}</div>
      <div className="text-lg font-mono text-white">{formula}</div>
    </div>
  </div>
);

const TooltipCard = ({ title, formula, parameters, example, variant = "default" }) => {
  const variants = {
    default: "bg-white text-black border-2 border-black",
    primary: "bg-black text-white border-2 border-black"
  };

  return (
    <div className={`${variants[variant]} p-4 w-80 shadow-lg font-mono`}>
      <div className="absolute top-2 right-2 w-2 h-2 border border-current bg-current opacity-50" />
      
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-6 h-6 border border-current flex items-center justify-center ${variant === 'primary' ? 'bg-black' : 'bg-white'}`}>
          <Brain className="w-3 h-3" />
        </div>
        <span className="font-bold text-sm uppercase tracking-wider">{title}</span>
      </div>
      
      {formula && (
        <div className="mb-3">
          <FormulaDisplay formula={formula} description="FORMULA" />
        </div>
      )}
      
      {parameters && (
        <div className="space-y-2 mb-3">
          {parameters.map((param, index) => (
            <div key={index} className="border-l-2 border-current px-2 py-1">
              <span className="font-bold text-xs">{param.symbol}:</span>
              <span className="text-xs ml-2">{param.description}</span>
            </div>
          ))}
        </div>
      )}
      
      {example && (
        <div className="border-2 border-current p-2 mt-3">
          <div className="text-xs font-bold uppercase tracking-wider mb-1">Example:</div>
          <div className="text-xs">{example}</div>
        </div>
      )}
    </div>
  );
};

export const Slide26IFM = ({ scroll }) => {
  const [hoveredTerm, setHoveredTerm] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [currentStep, setCurrentStep] = useState(0);
  
  const pfmRef = useRef(null);
  const afmRef = useRef(null);
  const ifmRef = useRef(null);
  const instructionalRef = useRef(null);

  const calculateTooltipPosition = () => {
    const margin = 16;
    return { x: margin, y: margin };
  };

  const handleMouseEnter = (term, ref) => {
    setHoveredTerm(term);
    const position = calculateTooltipPosition();
    setTooltipPosition(position);
  };

  const steps = [
    {
      title: "INSTRUCTIONAL FACTOR MODEL INTRODUCTION",
      config: "IFM-001",
      content: (
        <div className="space-y-6">
          <TechnicalCard title="Core Innovation" icon={Brain} config="INNOVATION-001" variant="primary">
            <div className="space-y-3">
              <p className="text-white text-sm font-mono leading-relaxed">
                THE INSTRUCTIONAL FACTOR MODEL (IFM) REPRESENTS THE MOST SOPHISTICATED APPROACH TO 
                MODELING LEARNING INTERACTIONS. WHILE PFM SEPARATED SUCCESSES AND FAILURES, 
                IFM GOES FURTHER BY RECOGNIZING THREE DISTINCT TYPES OF LEARNING INTERACTIONS.
              </p>
              
              <FormulaDisplay 
                formula="log(p/(1-p)) = θᵢ + Σₖ Qₖⱼ[βₖ + μₖSᵢₖ + ρₖFᵢₖ + νₖTᵢₖ]"
                description="IFM COMPLETE FORMULA"
              />
            </div>
          </TechnicalCard>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SpecificationBox 
              label="μₖ (MU)"
              value="Success learning rate"
              unit="Learning from correct answers"
              variant="success"
            />
            <SpecificationBox 
              label="ρₖ (RHO)"
              value="Failure learning rate"
              unit="Learning from incorrect answers"
              variant="warning"
            />
            <SpecificationBox 
              label="νₖ (NU)"
              value="Hint learning rate"
              unit="Learning from scaffolds/hints"
              variant="info"
            />
          </div>

          <TechnicalCard title="Theoretical Foundation" icon={Target} config="THEORY-001">
            <div className="space-y-3">
              <p className="text-black text-sm font-mono leading-relaxed">
                IFM BUILDS ON THE SAME MATHEMATICAL FOUNDATION AS AFM AND PFM BUT ADDS 
                NUANCED INSTRUCTIONAL TERMS THAT CAPTURE DIFFERENT LEARNING PATHWAYS.
              </p>
              <SpecificationBox 
                label="KEY INSIGHT"
                value="Different interaction types yield different learning gains"
                unit="Hints ≠ Failures ≠ Successes in terms of learning impact"
                variant="info"
              />
            </div>
          </TechnicalCard>
        </div>
      )
    },
    {
      title: "MODEL COMPARISON ANALYSIS",
      config: "IFM-002",
      content: (
        <div className="space-y-6">
          <TechnicalCard title="Evolution of Sophistication" icon={TrendingUp} config="EVOLUTION-001" variant="primary">
            <div className="space-y-3">
              <p className="text-white text-sm font-mono leading-relaxed">
                THE PROGRESSION FROM AFM TO PFM TO IFM REPRESENTS INCREASING SOPHISTICATION 
                IN MODELING HUMAN LEARNING PROCESSES.
              </p>
            </div>
          </TechnicalCard>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* AFM Card */}
            <TechnicalCard title="AFM" icon={Calculator} config="AFM-SIMPLE" variant="accent">
              <div className="space-y-3">
                <SpecificationBox 
                  label="APPROACH"
                  value="Equal practice"
                  unit="One γ parameter for all learning"
                  variant="default"
                />
                <p className="text-black font-mono text-xs leading-relaxed">
                  TREATS ALL PRACTICE OPPORTUNITIES AS EQUIVALENT LEARNING EVENTS.
                </p>
              </div>
            </TechnicalCard>

            {/* PFM Card */}
            <TechnicalCard title="PFM" icon={Users} config="PFM-ADVANCED" variant="accent">
              <div className="space-y-3">
                <SpecificationBox 
                  label="APPROACH"
                  value="Success vs failure"
                  unit="Different learning from correct/incorrect"
                  variant="warning"
                />
                <p className="text-black font-mono text-xs leading-relaxed">
                  SEPARATES LEARNING FROM SUCCESSFUL AND FAILED ATTEMPTS.
                </p>
              </div>
            </TechnicalCard>

            {/* IFM Card */}
            <TechnicalCard title="IFM" icon={Lightbulb} config="IFM-SOPHISTICATED" variant="primary">
              <div className="space-y-3">
                <SpecificationBox 
                  label="APPROACH"
                  value="Instructional types"
                  unit="Three distinct learning pathways"
                  variant="success"
                />
                <p className="text-white font-mono text-xs leading-relaxed">
                  RECOGNIZES SUCCESS, FAILURE, AND HINT LEARNING AS SEPARATE PROCESSES.
                </p>
              </div>
            </TechnicalCard>
          </div>

          <TechnicalCard title="Mathematical Progression" icon={BarChart3} config="MATH-001">
            <div className="space-y-3">
              <FormulaDisplay 
                formula="AFM: γₖ·Tᵢₖ → PFM: γₖ·(S-F) → IFM: μₖS + ρₖF + νₖT"
                description="COMPLEXITY EVOLUTION"
              />
              <p className="text-black text-sm font-mono leading-relaxed">
                EACH MODEL ADDS LAYERS OF SOPHISTICATION TO BETTER CAPTURE LEARNING DYNAMICS.
              </p>
            </div>
          </TechnicalCard>
        </div>
      )
    },
    {
      title: "REAL-WORLD APPLICATIONS",
      config: "IFM-003",
      content: (
        <div className="space-y-6">
          <TechnicalCard title="Intelligent Tutoring Systems" icon={Brain} config="ITS-001" variant="primary">
            <div className="space-y-3">
              <p className="text-white text-sm font-mono leading-relaxed">
                IN INTELLIGENT TUTORING SYSTEMS, STUDENTS EXPERIENCE THREE DISTINCT LEARNING 
                PATHWAYS THAT EACH CONTRIBUTE DIFFERENTLY TO SKILL ACQUISITION.
              </p>
            </div>
          </TechnicalCard>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TechnicalCard title="Success Learning" icon={CheckCircle} config="SUCCESS-001" variant="accent">
              <div className="space-y-3">
                <SpecificationBox 
                  label="MECHANISM"
                  value="Reinforcement"
                  unit="Builds confidence and solidifies understanding"
                  variant="success"
                />
                <p className="text-black font-mono text-xs leading-relaxed">
                  CORRECT ANSWERS PROVIDE POSITIVE REINFORCEMENT AND PATTERN CONFIRMATION.
                </p>
              </div>
            </TechnicalCard>

            <TechnicalCard title="Failure Learning" icon={XCircle} config="FAILURE-001" variant="accent">
              <div className="space-y-3">
                <SpecificationBox 
                  label="MECHANISM"
                  value="Misconception revelation"
                  unit="Forces deeper cognitive processing"
                  variant="warning"
                />
                <p className="text-black font-mono text-xs leading-relaxed">
                  MISTAKES REVEAL GAPS IN UNDERSTANDING AND TRIGGER REFLECTIVE LEARNING.
                </p>
              </div>
            </TechnicalCard>

            <TechnicalCard title="Hint Learning" icon={HelpCircle} config="HINT-001" variant="accent">
              <div className="space-y-3">
                <SpecificationBox 
                  label="MECHANISM"
                  value="Scaffolded guidance"
                  unit="Just-in-time support for skill development"
                  variant="info"
                />
                <p className="text-black font-mono text-xs leading-relaxed">
                  HINTS PROVIDE STRUCTURED SUPPORT WITHOUT GIVING AWAY COMPLETE SOLUTIONS.
                </p>
              </div>
            </TechnicalCard>
          </div>

          <TechnicalCard title="Adaptive Learning Impact" icon={Target} config="ADAPTIVE-001">
            <div className="space-y-3">
              <p className="text-black text-sm font-mono leading-relaxed">
                THIS SEPARATION ALLOWS IFM TO MAKE MORE PRECISE PREDICTIONS ABOUT LEARNING 
                OUTCOMES AND ENABLES MORE SOPHISTICATED ADAPTIVE TUTORING STRATEGIES.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <SpecificationBox 
                  label="PREDICTION ACCURACY"
                  value="Enhanced modeling precision"
                  unit="Better forecasting of student performance"
                  variant="success"
                />
                <SpecificationBox 
                  label="INTERVENTION STRATEGIES"
                  value="Targeted support mechanisms"
                  unit="Customized hint timing and difficulty"
                  variant="info"
                />
              </div>
            </div>
          </TechnicalCard>

          <TechnicalCard title="Example Implementation" icon={Zap} config="EXAMPLE-001" variant="primary">
            <div className="space-y-3">
              <p className="text-white text-sm font-mono leading-relaxed">
                MATHEMATICS TUTORING SYSTEM: μ=0.2, ρ=-0.1, ν=0.15
              </p>
              <SpecificationBox 
                label="INTERPRETATION"
                value="Hints more effective than failures"
                unit="Scaffolded learning outperforms trial-and-error"
                variant="success"
              />
            </div>
          </TechnicalCard>
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

  const tooltipData = {
    ifm: {
      title: "Instructional Factor Model",
      formula: "log(p/(1-p)) = θᵢ + Σₖ Qₖⱼ[βₖ + μₖSᵢₖ + ρₖFᵢₖ + νₖTᵢₖ]",
      parameters: [
        { symbol: "θᵢ", description: "Student i's baseline proficiency" },
        { symbol: "βₖ", description: "Difficulty of skill k" },
        { symbol: "μₖ", description: "Learning rate from successes" },
        { symbol: "ρₖ", description: "Learning rate from failures" },
        { symbol: "νₖ", description: "Learning rate from hints/scaffolds" }
      ],
      example: "Recognizes three distinct learning pathways"
    },
    afm: {
      title: "Additive Factor Model",
      formula: "log(p/(1-p)) = θᵢ + Σₖ qⱼₖ(βₖ + γₖ·Tᵢₖ)",
      parameters: [
        { symbol: "θᵢ", description: "Student i's baseline proficiency" },
        { symbol: "βₖ", description: "Difficulty of skill k" },
        { symbol: "γₖ", description: "Learning rate for skill k" },
        { symbol: "Tᵢₖ", description: "Practice opportunities count" }
      ],
      example: "Treats all practice opportunities equally"
    },
    pfm: {
      title: "Performance Factor Model",
      formula: "log(p/(1-p)) = Σₖ qⱼₖ[βₖ + θᵢₖ + γₖ × (S - F)]",
      parameters: [
        { symbol: "θᵢₖ", description: "Student i's proficiency in skill k" },
        { symbol: "βₖ", description: "Difficulty of skill k" },
        { symbol: "γₖ", description: "Learning rate for skill k" },
        { symbol: "S - F", description: "Successes minus failures" }
      ],
      example: "Separates learning from successes and failures"
    },
    instructional: {
      title: "Three Learning Types",
      parameters: [
        { symbol: "μₖ", description: "Learning from getting answers right" },
        { symbol: "ρₖ", description: "Learning from getting answers wrong" },
        { symbol: "νₖ", description: "Learning from hints and scaffolds" }
      ],
      example: "Math tutoring: μ=0.2, ρ=-0.1, ν=0.15"
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="border-2 border-black p-4 bg-white mb-6 relative">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-black"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-black"></div>
          
          <div className="text-center space-y-2">
            <div className="inline-block border border-black px-3 py-1 mb-2">
              <span className="text-xs tracking-wider font-mono">ADVANCED MODELING</span>
            </div>
            <h1 className="text-2xl font-bold uppercase tracking-wider text-black">
              {steps[currentStep].title}
            </h1>
            <p className="text-xs font-mono text-gray-600">
              {steps[currentStep].config}
            </p>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center space-x-2">
            {steps.map((_, index) => (
              <div key={index} className="flex items-center">
                <div
                  className={`w-3 h-3 border-2 border-black ${
                    index <= currentStep ? 'bg-black' : 'bg-white'
                  }`}
                />
                {index < steps.length - 1 && (
                  <div className={`w-8 h-px border-t-2 border-black ${
                    index < currentStep ? 'bg-black' : 'bg-white'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="mb-6">
          {steps[currentStep].content}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="px-4 py-2 bg-white text-black border-2 border-black font-bold uppercase tracking-wide hover:bg-black hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← PREVIOUS
          </button>

          <div className="px-4 py-2 bg-white border-2 border-black font-bold text-black uppercase tracking-wide">
            {currentStep + 1} / {steps.length}
          </div>

          {currentStep < steps.length - 1 ? (
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-black text-white border-2 border-black font-bold uppercase tracking-wide hover:bg-white hover:text-black transition-all"
            >
              NEXT →
            </button>
          ) : (
            <button
              onClick={() => scroll(22)}
              className="px-6 py-3 bg-black text-white border-2 border-black font-bold uppercase tracking-wide hover:bg-white hover:text-black transition-all flex items-center gap-2"
            >
              <span>CONTINUE TO SUMMARY</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Tooltips */}
        {hoveredTerm && tooltipData[hoveredTerm] && (
          <div 
            className="fixed z-50"
            style={{ 
              left: `${tooltipPosition.x}px`, 
              top: `${tooltipPosition.y}px`
            }}
          >
            <TooltipCard 
              title={tooltipData[hoveredTerm].title}
              formula={tooltipData[hoveredTerm].formula}
              parameters={tooltipData[hoveredTerm].parameters}
              example={tooltipData[hoveredTerm].example}
              variant={hoveredTerm === 'ifm' ? 'primary' : 'default'}
            />
          </div>
        )}
      </div>
    </Layout>
  );
};