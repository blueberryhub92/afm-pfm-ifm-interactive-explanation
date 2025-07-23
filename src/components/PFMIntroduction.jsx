import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, XCircle, TrendingUp, Calculator, ArrowRight, BarChart3, Brain, Zap, Target } from 'lucide-react';

export const PFMIntroduction = ({ navigate }) => {
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
      title: "Introducing the Performance Factor Model",
      content: (
        <div className="space-y-6">
          <div className="border-l-8 border-purple-600 bg-purple-100 p-6 rounded-r-xl">
            <p className="text-black text-xl font-bold leading-relaxed">
              Let's compare AFM to PFM: the{' '}
              <span
                ref={pfmRef}
                className="cursor-help bg-purple-200 px-3 py-2 border-2 border-purple-600 rounded text-purple-800 font-bold hover:bg-purple-300 transition-all"
                onMouseEnter={() => handleMouseEnter('pfm', pfmRef)}
                onMouseLeave={() => setHoveredTerm(null)}
              >
                Performance Factor Model (PFM)
              </span>
              . While they look similar at first glance, PFM has a crucial innovation.
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
            <div className="bg-black text-green-400 p-6 rounded-lg border-4 border-gray-600 font-mono text-lg text-center">
              <div className="text-white font-bold">log(p/(1-p)) = θᵢ + Σₖ qⱼₖ(βₖ + <span className="bg-purple-600 px-3 py-2 rounded text-white font-bold">learning terms</span>)</div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Key Differences Between AFM and PFM",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* AFM Card */}
            <div className="border-4 border-green-600 rounded-xl p-6 bg-green-50">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-8 h-8 text-green-600" />
                <h3 className="text-xl font-bold text-green-700 uppercase tracking-wide">AFM Approach</h3>
              </div>
              <div className="border-4 border-green-600 rounded-xl p-4 bg-white">
                <h4 className="font-bold text-green-700 text-lg uppercase tracking-wide mb-3">Equal Treatment</h4>
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
                  {' '}– whether you get a question right or wrong, it counts as ONE learning opportunity.
                </p>
              </div>
            </div>

            {/* PFM Card */}
            <div className="border-4 border-purple-600 rounded-xl p-6 bg-purple-50">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-8 h-8 text-purple-600" />
                <h3 className="text-xl font-bold text-purple-700 uppercase tracking-wide">PFM Innovation</h3>
              </div>
              <div className="border-4 border-purple-600 rounded-xl p-4 bg-white">
                <h4 className="font-bold text-purple-700 text-lg uppercase tracking-wide mb-3">Separate Learning</h4>
                <p className="text-black font-bold text-lg leading-relaxed">
                  PFM recognizes: <em>we might learn differently from successes vs failures</em>. Uses separate{' '}
                  <span
                    ref={gammaRef}
                    className="cursor-help bg-purple-200 px-2 py-1 border-2 border-purple-600 rounded text-purple-800 font-bold hover:bg-purple-300 transition-all"
                    onMouseEnter={() => handleMouseEnter('gamma', gammaRef)}
                    onMouseLeave={() => setHoveredTerm(null)}
                  >
                    gamma parameters
                  </span>
                  {' '}for correct (γₖˢᵘᶜᶜ) and incorrect (γₖᶠᵃⁱˡ) answers.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Real-World Impact and Applications",
      content: (
        <div className="space-y-6">
          <div className="border-4 border-orange-600 rounded-xl p-6 bg-orange-50">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="w-8 h-8 text-orange-600" />
              <h3 className="text-xl font-bold text-orange-700 uppercase tracking-wide">Real-World Insight</h3>
            </div>
            <p className="text-black text-lg font-bold leading-relaxed">
              For some skills, you might learn MORE from mistakes (like debugging code), while for others, you learn more from successful repetition (like multiplication tables).
            </p>
          </div>

          <div className="border-4 border-blue-600 rounded-xl p-6 bg-blue-50">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-8 h-8 text-blue-600" />
              <h3 className="text-xl font-bold text-blue-700 uppercase tracking-wide">Why This Matters</h3>
            </div>
            <p className="text-black text-lg font-bold leading-relaxed">
              This separation allows PFM to capture more nuanced learning patterns. The model can make different predictions based on whether students learn more from their successes or their mistakes.
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

  const PFMTooltip = () => (
    <div
      className="fixed z-50 bg-white border-4 border-black rounded-xl shadow-lg p-6 w-96 font-['IBM_Plex_Mono',monospace]"
      style={{
        left: `${tooltipPosition.x}px`,
        top: `${tooltipPosition.y}px`,
        maxWidth: '384px'
      }}
    >
      <div className="border-4 border-blue-600 rounded-xl p-4 bg-blue-50 mb-4">
        <div className="flex items-center gap-3 mb-3">
          <Calculator className="w-6 h-6 text-blue-600" />
          <span className="font-bold text-blue-700 uppercase tracking-wide text-xl">Performance Factor Model</span>
        </div>

        <div className="bg-black text-green-400 p-4 rounded-lg border-2 border-blue-600 font-mono text-sm">
          <div className="text-green-300 mb-2 font-bold">PFM FORMULA:</div>
          <div className="text-white font-bold">log(p/(1-p)) = θᵢ + Σₖ qⱼₖ(βₖ + γₖˢᵘᶜᶜ·Sᵢₖ + γₖᶠᵃⁱˡ·Fᵢₖ)</div>
        </div>
      </div>

      <div className="space-y-3 text-sm text-black">
        <div className="border-l-4 border-blue-600 bg-blue-100 px-4 py-2 rounded-r-lg">
          <strong className="text-black font-bold">θᵢ:</strong> <span className="font-bold">Student i's baseline proficiency</span>
        </div>
        <div className="border-l-4 border-purple-600 bg-purple-100 px-4 py-2 rounded-r-lg">
          <strong className="text-black font-bold">βₖ:</strong> <span className="font-bold">Difficulty of skill k</span>
        </div>
        <div className="border-l-4 border-green-600 bg-green-100 px-4 py-2 rounded-r-lg">
          <strong className="text-black font-bold">γₖˢᵘᶜᶜ:</strong> <span className="font-bold">Learning rate from successes</span>
        </div>
        <div className="border-l-4 border-red-600 bg-red-100 px-4 py-2 rounded-r-lg">
          <strong className="text-black font-bold">γₖᶠᵃⁱˡ:</strong> <span className="font-bold">Learning rate from failures</span>
        </div>
      </div>

      <div className="border-4 border-green-600 rounded-xl p-4 bg-green-50 mt-4">
        <div className="flex items-center gap-3 mb-2">
          <Brain className="w-6 h-6 text-green-600" />
          <span className="font-bold text-green-700 uppercase tracking-wide text-lg">Key Innovation</span>
        </div>
        <p className="text-black text-sm font-bold">
          PFM separates learning effects of correct vs incorrect attempts!
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
        <div className="flex items-center gap-3 mb-3">
          <TrendingUp className="w-6 h-6 text-green-600" />
          <span className="font-bold text-green-700 uppercase tracking-wide text-xl">Additive Factor Model</span>
        </div>

        <div className="bg-black text-green-400 p-4 rounded-lg border-2 border-green-600 font-mono text-sm">
          <div className="text-green-300 mb-2 font-bold">AFM FORMULA:</div>
          <div className="text-white font-bold">log(p/(1-p)) = θᵢ + Σₖ qⱼₖ(βₖ + γₖ·Tᵢₖ)</div>
        </div>
      </div>

      <div className="space-y-3 text-sm text-black">
        <div className="border-l-4 border-blue-600 bg-blue-100 px-4 py-2 rounded-r-lg">
          <strong className="text-black font-bold">θᵢ:</strong> <span className="font-bold">Student i's baseline proficiency</span>
        </div>
        <div className="border-l-4 border-purple-600 bg-purple-100 px-4 py-2 rounded-r-lg">
          <strong className="text-black font-bold">βₖ:</strong> <span className="font-bold">Difficulty of skill k</span>
        </div>
        <div className="border-l-4 border-orange-600 bg-orange-100 px-4 py-2 rounded-r-lg">
          <strong className="text-black font-bold">γₖ:</strong> <span className="font-bold">Learning rate for skill k</span>
        </div>
        <div className="border-l-4 border-gray-600 bg-gray-100 px-4 py-2 rounded-r-lg">
          <strong className="text-black font-bold">Tᵢₖ:</strong> <span className="font-bold">Practice opportunities count</span>
        </div>
      </div>

      <div className="border-4 border-blue-600 rounded-xl p-4 bg-blue-50 mt-4">
        <div className="flex items-center gap-3 mb-2">
          <Target className="w-6 h-6 text-blue-600" />
          <span className="font-bold text-blue-700 uppercase tracking-wide text-lg">Simplicity</span>
        </div>
        <p className="text-black text-sm font-bold">
          AFM treats ALL practice opportunities equally!
        </p>
      </div>
    </div>
  );

  const GammaTooltip = () => (
    <div
      className="fixed z-50 bg-white border-4 border-black rounded-xl shadow-lg p-6 w-80 font-['IBM_Plex_Mono',monospace]"
      style={{
        left: `${tooltipPosition.x}px`,
        top: `${tooltipPosition.y}px`,
        maxWidth: '320px'
      }}
    >
      <div className="border-4 border-purple-600 rounded-xl p-4 bg-purple-50 mb-4">
        <div className="flex items-center gap-3 mb-2">
          <Zap className="w-6 h-6 text-purple-600" />
          <span className="font-bold text-purple-700 uppercase tracking-wide text-lg">Separate Gamma Values</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="border-4 border-green-600 rounded-xl p-4 bg-green-50">
          <div className="font-bold text-green-700 text-lg uppercase tracking-wide">yₖˢᵘᶜᶜ (SUCCESS RATE)</div>
          <div className="text-black font-bold">Learning from getting answers RIGHT</div>
        </div>

        <div className="border-4 border-red-600 rounded-xl p-4 bg-red-50">
          <div className="font-bold text-red-700 text-lg uppercase tracking-wide">yₖᶠᵃⁱˡ (FAILURE RATE)</div>
          <div className="text-black font-bold">Learning from getting answers WRONG</div>
        </div>
      </div>

      <div className="border-4 border-yellow-600 rounded-xl p-4 bg-yellow-50 mt-4">
        <div className="font-bold text-yellow-700 text-sm mb-2 uppercase tracking-wide">EXAMPLE:</div>
        <div className="text-black font-bold text-sm">
          Debugging: Learn MORE from failures (γᶠᵃⁱˡ = -0.3) than successes (γˢᵘᶜᶜ = 0.1)
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white min-h-screen flex flex-col text-black font-['IBM_Plex_Mono',monospace]">
      {/* Header */}
      <div className="border-b-8 border-black bg-purple-400 px-8 py-6 shadow-lg">
        <div className="flex items-center justify-center">
          <span className="text-black font-bold text-2xl uppercase tracking-wider">
            AFM vs Performance Factor Model (PFM)
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
                    className={`w-4 h-4 rounded-full border-2 border-black ${index <= currentStep ? 'bg-purple-600' : 'bg-gray-200'
                      }`}
                  />
                  {index < steps.length - 1 && (
                    <div className={`w-12 h-1 border-t-2 border-black ${index < currentStep ? 'bg-purple-600' : 'bg-gray-200'
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
                className="px-6 py-3 bg-purple-600 text-white border-4 border-black rounded-xl font-bold uppercase tracking-wide hover:bg-white hover:text-purple-600 transition-all"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={() => navigate(19)}
                className="px-8 py-4 bg-green-600 text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-green-600 transition-all transform hover:scale-105 flex items-center gap-3"
              >
                <span>Discover the Comparison</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tooltips */}
      {hoveredTerm === 'pfm' && <PFMTooltip />}
      {hoveredTerm === 'afm' && <AFMTooltip />}
      {hoveredTerm === 'gamma' && <GammaTooltip />}
    </div>
  );
};