import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, XCircle, TrendingUp, Calculator, ArrowRight, BarChart3, Brain, Zap, Target } from 'lucide-react';

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

export const Slide23PFM = ({ scroll }) => {
  const [hoveredTerm, setHoveredTerm] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0, side: 'right' });
  const [currentStep, setCurrentStep] = useState(0);
  
  const pfmRef = useRef(null);
  const afmRef = useRef(null);
  const gammaRef = useRef(null);

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
      title: "PERFORMANCE FACTOR MODEL",
      config: "SECTION-001",
      content: (
        <div className="space-y-6">
          <TechnicalCard title="Comparative Analysis" icon={Brain} config="AFM-PFM-001" variant="primary">
            <div className="space-y-3">
              <p className="text-white text-sm font-mono leading-relaxed">
                COMPARING AFM TO{' '}
                <span 
                  ref={pfmRef}
                  className="cursor-help border border-white px-2 py-1 bg-gray-800 font-mono hover:bg-gray-700 transition-all"
                  onMouseEnter={() => handleMouseEnter('pfm', pfmRef)}
                  onMouseLeave={() => setHoveredTerm(null)}
                >
                  PERFORMANCE FACTOR MODEL (PFM)
                </span>
                . STRUCTURAL SIMILARITIES WITH CRITICAL INNOVATION.
              </p>
            </div>
          </TechnicalCard>

          <TechnicalCard title="Shared Foundation" icon={Target} config="STRUCTURE-001" variant="accent">
            <div className="space-y-3">
              <p className="text-black text-sm font-mono leading-relaxed">
                BOTH MODELS UTILIZE IDENTICAL STRUCTURAL FRAMEWORK:
              </p>
              <FormulaDisplay 
                formula="log(p/(1-p)) = θᵢ + Σₖ qⱼₖ(βₖ + LEARNING TERMS)"
                description="SHARED MATHEMATICAL FOUNDATION"
              />
            </div>
          </TechnicalCard>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SpecificationBox 
              label="θᵢ (THETA)"
              value="Student baseline proficiency"
              unit="Individual ability parameter"
              variant="info"
            />
            <SpecificationBox 
              label="βₖ (BETA)"
              value="Skill difficulty coefficient"
              unit="Task complexity measure"
              variant="info"
            />
            <SpecificationBox 
              label="qⱼₖ (Q-MATRIX)"
              value="Skill-item mapping"
              unit="Knowledge component connection"
              variant="info"
            />
          </div>
        </div>
      )
    },
    {
      title: "DIFFERENTIAL ANALYSIS",
      config: "SECTION-002",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TechnicalCard title="AFM Protocol" icon={TrendingUp} config="AFM-001" variant="accent">
              <div className="space-y-3">
                <p className="text-black text-sm font-mono leading-relaxed">
                  THE{' '}
                  <span 
                    ref={afmRef}
                    className="cursor-help border border-black px-2 py-1 bg-white font-mono hover:bg-gray-100 transition-all"
                    onMouseEnter={() => handleMouseEnter('afm', afmRef)}
                    onMouseLeave={() => setHoveredTerm(null)}
                  >
                    AFM TREATS ALL PRACTICE UNIFORMLY
                  </span>
                  {' '}– CORRECT/INCORRECT RESPONSES = SINGLE LEARNING UNIT.
                </p>
                
                <FormulaDisplay 
                  formula="log(p/(1-p)) = θᵢ + Σₖ qⱼₖ(βₖ + γₖ·Tᵢₖ)"
                  description="AFM FORMULA"
                />
                
                <SpecificationBox 
                  label="LEARNING APPROACH"
                  value="Uniform treatment"
                  unit="Single learning rate per skill"
                  variant="success"
                />
              </div>
            </TechnicalCard>

            <TechnicalCard title="PFM Innovation" icon={Zap} config="PFM-001" variant="primary">
              <div className="space-y-3">
                <p className="text-white text-sm font-mono leading-relaxed">
                  PFM RECOGNIZES: <em>LEARNING VARIES BY OUTCOME TYPE</em>. IMPLEMENTS{' '}
                  <span 
                    ref={gammaRef}
                    className="cursor-help border border-white px-2 py-1 bg-gray-800 font-mono hover:bg-gray-700 transition-all"
                    onMouseEnter={() => handleMouseEnter('gamma', gammaRef)}
                    onMouseLeave={() => setHoveredTerm(null)}
                  >
                    DUAL GAMMA PARAMETERS
                  </span>
                  {' '}FOR SUCCESS (γₖˢᵘᶜᶜ) AND FAILURE (γₖᶠᵃⁱˡ) STATES.
                </p>
                
                <div className="bg-gray-800 text-white p-4 border border-white relative">
                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white"></div>
                  <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white"></div>
                  <div className="text-xs font-mono tracking-wider uppercase mb-2 text-gray-300">PFM FORMULA</div>
                  <div className="text-sm font-mono text-white">log(p/(1-p)) = θᵢ + Σₖ qⱼₖ(βₖ + γₖˢᵘᶜᶜ·Sᵢₖ + γₖᶠᵃⁱˡ·Fᵢₖ)</div>
                </div>
                
                <SpecificationBox 
                  label="LEARNING APPROACH"
                  value="Differential learning"
                  unit="Separate rates for success/failure"
                  variant="warning"
                />
              </div>
            </TechnicalCard>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SpecificationBox 
              label="SUCCESS LEARNING (γₖˢᵘᶜᶜ)"
              value="Learning from correct responses"
              unit="Reinforcement coefficient"
              variant="success"
            />
            <SpecificationBox 
              label="FAILURE LEARNING (γₖᶠᵃⁱˡ)"
              value="Learning from incorrect responses"
              unit="Error correction coefficient"
              variant="warning"
            />
          </div>
        </div>
      )
    },
    {
      title: "PRACTICAL APPLICATIONS",
      config: "SECTION-003",
      content: (
        <div className="space-y-6">
          <TechnicalCard title="Domain-Specific Learning" icon={Brain} config="DOMAIN-001" variant="primary">
            <div className="space-y-3">
              <p className="text-white text-sm font-mono leading-relaxed">
                SKILL-DEPENDENT LEARNING PATTERNS: DEBUGGING CODE → ENHANCED LEARNING FROM ERRORS // 
                MULTIPLICATION TABLES → ENHANCED LEARNING FROM REPETITION
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-white p-3">
                  <div className="text-xs font-mono tracking-wider uppercase mb-2 text-gray-300">DEBUGGING EXAMPLE</div>
                  <div className="text-white font-mono text-sm">γᶠᵃⁱˡ = -0.3 {'>'} γˢᵘᶜᶜ = 0.1</div>
                </div>
                <div className="border border-white p-3">
                  <div className="text-xs font-mono tracking-wider uppercase mb-2 text-gray-300">DRILL PRACTICE</div>
                  <div className="text-white font-mono text-sm">γˢᵘᶜᶜ = 0.2 {'>'} γᶠᵃⁱˡ = 0.05</div>
                </div>
              </div>
            </div>
          </TechnicalCard>

          <TechnicalCard title="Enhanced Predictive Capacity" icon={Target} config="PREDICT-001" variant="accent">
            <div className="space-y-3">
              <p className="text-black text-sm font-mono leading-relaxed">
                SEPARATION ENABLES NUANCED LEARNING PATTERN CAPTURE. MODEL GENERATES 
                DIFFERENTIATED PREDICTIONS BASED ON SUCCESS/FAILURE LEARNING COEFFICIENTS.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <SpecificationBox 
                  label="MODEL FLEXIBILITY"
                  value="Captures learning asymmetry"
                  unit="Success vs failure learning rates"
                  variant="info"
                />
                <SpecificationBox 
                  label="PREDICTION ACCURACY"
                  value="Improved performance modeling"
                  unit="Better fit to learning data"
                  variant="success"
                />
                <SpecificationBox 
                  label="EDUCATIONAL INSIGHT"
                  value="Optimized practice sequencing"
                  unit="Tailored learning experiences"
                  variant="warning"
                />
              </div>
            </div>
          </TechnicalCard>

          <TechnicalCard title="Implementation Considerations" icon={Calculator} config="IMPLEMENT-001">
            <div className="space-y-3">
              <p className="text-black text-sm font-mono leading-relaxed">
                PFM REQUIRES CAREFUL PARAMETER ESTIMATION AND VALIDATION. COMPUTATIONAL 
                COMPLEXITY INCREASES WITH DUAL GAMMA IMPLEMENTATION.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SpecificationBox 
                  label="COMPUTATIONAL COST"
                  value="Increased parameter space"
                  unit="2x gamma parameters per skill"
                  variant="warning"
                />
                <SpecificationBox 
                  label="DATA REQUIREMENTS"
                  value="Success/failure tracking"
                  unit="Detailed response history needed"
                  variant="info"
                />
              </div>
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

  const PFMTooltip = () => (
    <div 
      className="fixed z-50 bg-white border-2 border-black shadow-lg p-6 w-96 font-mono"
      style={{ 
        left: `${tooltipPosition.x}px`, 
        top: `${tooltipPosition.y}px`,
        maxWidth: '384px'
      }}
    >
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black"></div>
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-black"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-black"></div>
      
      <div className="border border-black px-3 py-1 mb-4 inline-block">
        <span className="text-xs tracking-wider font-mono">PERFORMANCE FACTOR MODEL</span>
      </div>
      
      <div className="flex items-center gap-3 mb-4">
        <div className="w-6 h-6 border border-black flex items-center justify-center bg-white">
          <Calculator className="w-3 h-3 text-black" />
        </div>
        <span className="font-mono font-bold text-black uppercase tracking-wider text-sm">PFM SPECIFICATION</span>
      </div>
      
      <FormulaDisplay 
        formula="log(p/(1-p)) = θᵢ + Σₖ qⱼₖ(βₖ + γₖˢᵘᶜᶜ·Sᵢₖ + γₖᶠᵃⁱˡ·Fᵢₖ)"
        description="PFM FORMULA"
      />
      
      <div className="space-y-2 text-xs text-black mt-4">
        <div className="border-l-2 border-black bg-gray-50 px-3 py-2">
          <strong className="text-black font-mono">θᵢ:</strong> <span className="font-mono">STUDENT BASELINE PROFICIENCY</span>
        </div>
        <div className="border-l-2 border-black bg-gray-50 px-3 py-2">
          <strong className="text-black font-mono">βₖ:</strong> <span className="font-mono">SKILL DIFFICULTY COEFFICIENT</span>
        </div>
        <div className="border-l-2 border-black bg-gray-50 px-3 py-2">
          <strong className="text-black font-mono">γₖˢᵘᶜᶜ:</strong> <span className="font-mono">SUCCESS LEARNING RATE</span>
        </div>
        <div className="border-l-2 border-black bg-gray-50 px-3 py-2">
          <strong className="text-black font-mono">γₖᶠᵃⁱˡ:</strong> <span className="font-mono">FAILURE LEARNING RATE</span>
        </div>
      </div>
    </div>
  );

  const AFMTooltip = () => (
    <div 
      className="fixed z-50 bg-white border-2 border-black shadow-lg p-6 w-96 font-mono"
      style={{ 
        left: `${tooltipPosition.x}px`, 
        top: `${tooltipPosition.y}px`,
        maxWidth: '384px'
      }}
    >
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black"></div>
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-black"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-black"></div>
      
      <div className="border border-black px-3 py-1 mb-4 inline-block">
        <span className="text-xs tracking-wider font-mono">ADDITIVE FACTOR MODEL</span>
      </div>
      
      <div className="flex items-center gap-3 mb-4">
        <div className="w-6 h-6 border border-black flex items-center justify-center bg-white">
          <TrendingUp className="w-3 h-3 text-black" />
        </div>
        <span className="font-mono font-bold text-black uppercase tracking-wider text-sm">AFM SPECIFICATION</span>
      </div>
      
      <FormulaDisplay 
        formula="log(p/(1-p)) = θᵢ + Σₖ qⱼₖ(βₖ + γₖ·Tᵢₖ)"
        description="AFM FORMULA"
      />
      
      <div className="space-y-2 text-xs text-black mt-4">
        <div className="border-l-2 border-black bg-gray-50 px-3 py-2">
          <strong className="text-black font-mono">θᵢ:</strong> <span className="font-mono">STUDENT BASELINE PROFICIENCY</span>
        </div>
        <div className="border-l-2 border-black bg-gray-50 px-3 py-2">
          <strong className="text-black font-mono">βₖ:</strong> <span className="font-mono">SKILL DIFFICULTY COEFFICIENT</span>
        </div>
        <div className="border-l-2 border-black bg-gray-50 px-3 py-2">
          <strong className="text-black font-mono">γₖ:</strong> <span className="font-mono">UNIFORM LEARNING RATE</span>
        </div>
        <div className="border-l-2 border-black bg-gray-50 px-3 py-2">
          <strong className="text-black font-mono">Tᵢₖ:</strong> <span className="font-mono">PRACTICE OPPORTUNITY COUNT</span>
        </div>
      </div>
    </div>
  );

  const GammaTooltip = () => (
    <div 
      className="fixed z-50 bg-white border-2 border-black shadow-lg p-6 w-80 font-mono"
      style={{ 
        left: `${tooltipPosition.x}px`, 
        top: `${tooltipPosition.y}px`,
        maxWidth: '320px'
      }}
    >
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black"></div>
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-black"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-black"></div>
      
      <div className="border border-black px-3 py-1 mb-4 inline-block">
        <span className="text-xs tracking-wider font-mono">DUAL GAMMA PARAMETERS</span>
      </div>
      
      <div className="flex items-center gap-3 mb-4">
        <div className="w-6 h-6 border border-black flex items-center justify-center bg-black">
          <Zap className="w-3 h-3 text-white" />
        </div>
        <span className="font-mono font-bold text-black uppercase tracking-wider text-sm">PARAMETER SET</span>
      </div>
      
      <div className="space-y-4">
        <SpecificationBox 
          label="γₖˢᵘᶜᶜ (SUCCESS)"
          value="Learning from correct responses"
          unit="Reinforcement coefficient"
          variant="success"
        />
        
        <SpecificationBox 
          label="γₖᶠᵃⁱˡ (FAILURE)"
          value="Learning from incorrect responses"
          unit="Error correction coefficient"
          variant="warning"
        />
      </div>
      
      <div className="border-2 border-black bg-gray-50 p-4 mt-4 relative">
        <div className="absolute top-2 right-2 w-2 h-2 border border-black bg-gray-50"></div>
        <div className="font-mono font-bold text-black text-xs mb-2 uppercase tracking-wider">EXAMPLE:</div>
        <div className="text-black font-mono text-xs">
          DEBUGGING: γᶠᵃⁱˡ = -0.3 {'>'} γˢᵘᶜᶜ = 0.1
        </div>
      </div>
    </div>
  );

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
              <span className="text-xs tracking-wider font-mono">COMPARATIVE ANALYSIS</span>
            </div>
            <h1 className="text-2xl font-bold uppercase tracking-wider text-black">
              AFM VS {steps[currentStep].title}
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
              onClick={() => scroll && scroll(19)}
              className="px-6 py-3 bg-black text-white border-2 border-black font-bold uppercase tracking-wide hover:bg-white hover:text-black transition-all flex items-center gap-2"
            >
              <span>DISCOVER COMPARISON</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Tooltips */}
      {hoveredTerm === 'pfm' && <PFMTooltip />}
      {hoveredTerm === 'afm' && <AFMTooltip />}
      {hoveredTerm === 'gamma' && <GammaTooltip />}
    </Layout>
  );
};