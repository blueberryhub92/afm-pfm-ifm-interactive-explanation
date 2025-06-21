import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, XCircle, TrendingUp, Calculator, ArrowRight, BarChart3 } from 'lucide-react';

export const Slide21PFM = ({ scroll }) => {
  const [hoveredTerm, setHoveredTerm] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0, side: 'right' });
  
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

  const PFMTooltip = () => (
    <div 
      className="fixed z-50 bg-white border border-gray-200 rounded-lg shadow-xl p-4 w-96"
      style={{ 
        left: `${tooltipPosition.x}px`, 
        top: `${tooltipPosition.y}px`,
        maxWidth: '384px'
      }}
    >
      <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
        <Calculator size={18} className="mr-2 text-blue-600" />
        Performance Factor Model (PFM)
      </h4>
      
      <div className="bg-blue-50 p-3 rounded-lg mb-3 font-mono text-sm">
        <div className="text-blue-800 font-semibold mb-2">PFM Formula:</div>
        <div className="bg-white p-2 rounded border">
          log(p/(1-p)) = θᵢ + Σₖ qⱼₖ(βₖ + γₖˢᵘᶜᶜ·Sᵢₖ + γₖᶠᵃⁱˡ·Fᵢₖ)
        </div>
      </div>
      
      <div className="space-y-2 text-sm text-gray-700">
        <div><strong>θᵢ:</strong> Student i's baseline proficiency</div>
        <div><strong>βₖ:</strong> Difficulty of skill k</div>
        <div><strong>γₖˢᵘᶜᶜ:</strong> Learning rate from successes on skill k</div>
        <div><strong>γₖᶠᵃⁱˡ:</strong> Learning rate from failures on skill k</div>
        <div><strong>Sᵢₖ:</strong> # of successes for student i on skill k</div>
        <div><strong>Fᵢₖ:</strong> # of failures for student i on skill k</div>
      </div>
      
      <div className="bg-green-50 p-3 rounded-lg mt-3">
        <p className="text-green-800 text-sm font-medium">
          <strong>Key Innovation:</strong> PFM separates the learning effects of correct vs incorrect attempts, recognizing that we might learn differently from success than from failure.
        </p>
      </div>
    </div>
  );

  const AFMTooltip = () => (
    <div 
      className="fixed z-50 bg-white border border-gray-200 rounded-lg shadow-xl p-4 w-96"
      style={{ 
        left: `${tooltipPosition.x}px`, 
        top: `${tooltipPosition.y}px`,
        maxWidth: '384px'
      }}
    >
      <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
        <TrendingUp size={18} className="mr-2 text-green-600" />
        Additive Factor Model (AFM)
      </h4>
      
      <div className="bg-green-50 p-3 rounded-lg mb-3 font-mono text-sm">
        <div className="text-green-800 font-semibold mb-2">AFM Formula:</div>
        <div className="bg-white p-2 rounded border">
          log(p/(1-p)) = θᵢ + Σₖ qⱼₖ(βₖ + γₖ·Tᵢₖ)
        </div>
      </div>
      
      <div className="space-y-2 text-sm text-gray-700">
        <div><strong>θᵢ:</strong> Student i's baseline proficiency</div>
        <div><strong>βₖ:</strong> Difficulty of skill k</div>
        <div><strong>γₖ:</strong> Learning rate for skill k</div>
        <div><strong>Tᵢₖ:</strong> # of practice opportunities for student i on skill k</div>
      </div>
      
      <div className="bg-blue-50 p-3 rounded-lg mt-3">
        <p className="text-blue-800 text-sm font-medium">
          <strong>Simplicity:</strong> AFM treats all practice opportunities equally, assuming learning occurs from any attempt regardless of outcome.
        </p>
      </div>
    </div>
  );

  const GammaTooltip = () => (
    <div 
      className="fixed z-50 bg-gradient-to-br from-purple-50 to-orange-50 border border-purple-200 rounded-lg shadow-xl p-4 w-80"
      style={{ 
        left: `${tooltipPosition.x}px`, 
        top: `${tooltipPosition.y}px`,
        maxWidth: '320px'
      }}
    >
      <h4 className="font-semibold text-purple-800 mb-3">The Power of Separate Gamma Values</h4>
      
      <div className="space-y-3">
        <div className="bg-green-100 p-2 rounded">
          <div className="font-medium text-green-800">γₖˢᵘᶜᶜ (Success Learning Rate)</div>
          <div className="text-sm text-green-700">How much you learn from getting answers right</div>
        </div>
        
        <div className="bg-red-100 p-2 rounded">
          <div className="font-medium text-red-800">γₖᶠᵃⁱˡ (Failure Learning Rate)</div>
          <div className="text-sm text-red-700">How much you learn from getting answers wrong</div>
        </div>
      </div>
      
      <div className="mt-3 p-2 bg-gray-100 rounded text-xs">
        <strong>Example:</strong> For debugging code, you might learn more from failures (γᶠᵃⁱˡ = -0.3) than successes (γˢᵘᶜᶜ = 0.1) because errors reveal misconceptions.
      </div>
      
      <p className="text-xs text-gray-600 mt-2">
        This separation allows PFM to model different learning patterns for different types of skills.
      </p>
    </div>
  );

  const ComparisonTooltip = () => (
    <div 
      className="fixed z-50 bg-gradient-to-br from-blue-50 to-green-50 border border-blue-200 rounded-lg shadow-xl p-4 w-80"
      style={{ 
        left: `${tooltipPosition.x}px`, 
        top: `${tooltipPosition.y}px`,
        maxWidth: '320px'
      }}
    >
      <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
        <BarChart3 size={18} className="mr-2" />
        Model Comparison (String Slicing)
      </h4>
      
      <div className="space-y-3">
        <div className="text-center text-sm text-gray-600">
          Successes: {studentData.successes} | Failures: {studentData.failures}
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-blue-600">PFM Prediction</span>
            <span className="text-lg font-bold text-blue-600">
              {(studentData.pfmProbability * 100).toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div 
              className="h-2 bg-blue-500 rounded-full transition-all duration-1000"
              style={{ width: `${studentData.pfmProbability * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-green-600">AFM Prediction</span>
            <span className="text-lg font-bold text-green-600">
              {(studentData.afmProbability * 100).toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-green-200 rounded-full h-2">
            <div 
              className="h-2 bg-green-500 rounded-full transition-all duration-1000"
              style={{ width: `${studentData.afmProbability * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      <p className="text-xs text-gray-600 mt-3">
        Watch how PFM's separate treatment of successes and failures creates different learning curves compared to AFM's unified approach.
      </p>
    </div>
  );

  return (
    <div className="relative max-w-2xl w-full space-y-8">
      <p className="text-lg text-gray-700 leading-relaxed">
        Now let's compare AFM to another sophisticated model: the{' '}
        <span 
          ref={pfmRef}
          className="relative cursor-help border-b-2 border-dotted border-blue-500 text-blue-600 font-semibold"
          onMouseEnter={() => handleMouseEnter('pfm', pfmRef)}
          onMouseLeave={() => setHoveredTerm(null)}
        >
          Performance Factor Model (PFM)
        </span>
        . While they look similar at first glance, PFM has a crucial innovation.
      </p>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          Both models use the same basic structure:
        </p>
        <div className="font-mono text-sm bg-white p-3 rounded border text-center">
          log(p/(1-p)) = θᵢ + Σₖ qⱼₖ(βₖ + <span className="text-purple-600 font-bold">learning terms</span>)
        </div>
      </div>

      <p className="text-lg text-gray-700 leading-relaxed">
        The key difference lies in how they model learning. The{' '}
        <span 
          ref={afmRef}
          className="relative cursor-help border-b-2 border-dotted border-green-500 text-green-600 font-semibold"
          onMouseEnter={() => handleMouseEnter('afm', afmRef)}
          onMouseLeave={() => setHoveredTerm(null)}
        >
          AFM treats all practice equally
        </span>
        {' '}– whether you get a question right or wrong, it counts as one learning opportunity.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        But PFM recognizes something important: <em>we might learn differently from our successes than from our failures</em>. That's why PFM uses separate{' '}
        <span 
          ref={gammaRef}
          className="relative cursor-help border-b-2 border-dotted border-purple-500 text-purple-600 font-semibold"
          onMouseEnter={() => handleMouseEnter('gamma', gammaRef)}
          onMouseLeave={() => setHoveredTerm(null)}
        >
          gamma parameters
        </span>
        {' '}for correct answers (γₖˢᵘᶜᶜ) and incorrect answers (γₖᶠᵃⁱˡ).
      </p>

      <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
        <p className="text-blue-800 font-medium">
          <strong>Real-world insight:</strong> For some skills, you might learn more from mistakes (like debugging code), while for others, you learn more from successful repetition (like multiplication tables).
        </p>
      </div>

      <p className="text-lg text-gray-700 leading-relaxed">
        This separation allows PFM to capture more nuanced learning patterns. Watch this live comparison to see how the models make different predictions based on the same learning history.
      </p>
      
      <div className="text-center">
        <button
          onClick={() => scroll(22)}
          className="px-8 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
        >
          Next →
        </button>
      </div>

      {hoveredTerm === 'pfm' && <PFMTooltip />}
      {hoveredTerm === 'afm' && <AFMTooltip />}
      {hoveredTerm === 'gamma' && <GammaTooltip />}
      {hoveredTerm === 'comparison' && <ComparisonTooltip />}
    </div>
  );
};