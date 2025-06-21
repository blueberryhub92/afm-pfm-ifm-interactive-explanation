import { CheckCircle, XCircle, TrendingUp, Calculator, ArrowRight, BarChart3, HelpCircle, Lightbulb, BookOpen } from 'lucide-react';
import { useState, useRef } from 'react';

// Slide 1: IFM Introduction and Comparison with AFM
export const Slide23IFM = ({ scroll }) => {
  const [hoveredTerm, setHoveredTerm] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0, side: 'right' });
  
  const ifmRef = useRef(null);
  const afmRef = useRef(null);
  const hintsRef = useRef(null);

  // Simple tooltip position calculation
  const calculateTooltipPosition = () => {
    const margin = 16;
    return { x: margin, y: margin, side: 'top-left' };
  };

  const handleMouseEnter = (term) => {
    setHoveredTerm(term);
    const position = calculateTooltipPosition();
    setTooltipPosition(position);
  };

  const IFMTooltip = () => (
    <div 
      className="fixed z-50 bg-white border border-gray-200 rounded-lg shadow-xl p-4 w-96"
      style={{ 
        left: `${tooltipPosition.x}px`, 
        top: `${tooltipPosition.y}px`,
        maxWidth: '384px'
      }}
    >
      <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
        <HelpCircle size={18} className="mr-2 text-orange-600" />
        Input Factor Model (IFM)
      </h4>
      
      <div className="bg-orange-50 p-3 rounded-lg mb-3 font-mono text-sm">
        <div className="text-orange-800 font-semibold mb-2">IFM Formula:</div>
        <div className="bg-white p-2 rounded border">
          log(p/(1-p)) = θᵢ + Σₖ qⱼₖ(βₖ + γₖʰⁱⁿᵗ·Hᵢₖ)
        </div>
      </div>
      
      <div className="space-y-2 text-sm text-gray-700">
        <div><strong>θᵢ:</strong> Student i's baseline proficiency</div>
        <div><strong>βₖ:</strong> Difficulty of skill k</div>
        <div><strong>γₖʰⁱⁿᵗ:</strong> Learning rate from hints on skill k</div>
        <div><strong>Hᵢₖ:</strong> # of hints received by student i on skill k</div>
      </div>
      
      <div className="bg-blue-50 p-3 rounded-lg mt-3">
        <p className="text-blue-800 text-sm font-medium">
          <strong>Key Innovation:</strong> IFM focuses specifically on how hints affect learning, recognizing that guided assistance creates different learning patterns than unguided practice.
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
      
      <div className="bg-gray-50 p-3 rounded-lg mt-3">
        <p className="text-gray-800 text-sm font-medium">
          <strong>Limitation:</strong> AFM doesn't distinguish between different types of learning experiences - a hint-assisted answer counts the same as an independent solution.
        </p>
      </div>
    </div>
  );

  const HintsTooltip = () => (
    <div 
      className="fixed z-50 bg-gradient-to-br from-orange-50 to-yellow-50 border border-orange-200 rounded-lg shadow-xl p-4 w-80"
      style={{ 
        left: `${tooltipPosition.x}px`, 
        top: `${tooltipPosition.y}px`,
        maxWidth: '320px'
      }}
    >
      <h4 className="font-semibold text-orange-800 mb-3">The Power of Hint-Based Learning</h4>
      
      <div className="space-y-3">
        <div className="bg-yellow-100 p-2 rounded">
          <div className="font-medium text-yellow-800">γₖʰⁱⁿᵗ (Hint Learning Rate)</div>
          <div className="text-sm text-yellow-700">How much you learn from receiving hints</div>
        </div>
        
        <div className="bg-orange-100 p-2 rounded">
          <div className="font-medium text-orange-800">Hᵢₖ (Hint Count)</div>
          <div className="text-sm text-orange-700">Number of hints received on skill k</div>
        </div>
      </div>
      
      <div className="mt-3 p-2 bg-gray-100 rounded text-xs">
        <strong>Example:</strong> For algebra problems, hints might have γʰⁱⁿᵗ = 0.15, meaning each hint provides substantial learning benefit by scaffolding understanding.
      </div>
      
      <p className="text-xs text-gray-600 mt-2">
        This focus allows IFM to model how scaffolded learning differs from trial-and-error practice.
      </p>
    </div>
  );

  return (
    <div className="relative max-w-2xl w-full space-y-8">
      <p className="text-lg text-gray-700 leading-relaxed">
        Now let's explore another important learning model: the{' '}
        <span 
          ref={ifmRef}
          className="relative cursor-help border-b-2 border-dotted border-orange-500 text-orange-600 font-semibold"
          onMouseEnter={() => handleMouseEnter('ifm', ifmRef)}
          onMouseLeave={() => setHoveredTerm(null)}
        >
          Input Factor Model (IFM)
        </span>
        . This model takes a different approach by focusing specifically on how hints and guided assistance affect learning.
      </p>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          Like other models, IFM uses the familiar logistic structure:
        </p>
        <div className="font-mono text-sm bg-white p-3 rounded border text-center">
          log(p/(1-p)) = θᵢ + Σₖ qⱼₖ(βₖ + <span className="text-orange-600 font-bold">hint learning terms</span>)
        </div>
      </div>

      <p className="text-lg text-gray-700 leading-relaxed">
        The key insight behind IFM is that educational software often provides hints, and{' '}
        <span 
          ref={afmRef}
          className="relative cursor-help border-b-2 border-dotted border-green-500 text-green-600 font-semibold"
          onMouseEnter={() => handleMouseEnter('afm', afmRef)}
          onMouseLeave={() => setHoveredTerm(null)}
        >
          traditional models like AFM don't distinguish
        </span>
        {' '}between learning that happens with hints versus learning from independent problem-solving.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        IFM recognizes that <em>scaffolded learning through hints creates different knowledge acquisition patterns</em>. Instead of counting all practice opportunities equally, IFM specifically tracks and models the impact of{' '}
        <span 
          ref={hintsRef}
          className="relative cursor-help border-b-2 border-dotted border-orange-500 text-orange-600 font-semibold"
          onMouseEnter={() => handleMouseEnter('hints', hintsRef)}
          onMouseLeave={() => setHoveredTerm(null)}
        >
          hint-assisted learning
        </span>
        {' '}with its dedicated γₖʰⁱⁿᵗ parameter.
      </p>

      <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400">
        <p className="text-orange-800 font-medium">
          <strong>Educational insight:</strong> Hints provide scaffolding that can accelerate learning by guiding students toward correct reasoning paths, but this guided learning may have different long-term effects than independent discovery.
        </p>
      </div>

      <p className="text-lg text-gray-700 leading-relaxed">
        This focus on hints makes IFM particularly valuable for intelligent tutoring systems where hint-giving is a primary instructional strategy. Let's see how it compares to AFM in practice.
      </p>
      
      <div className="text-center">
        <button
          onClick={() => scroll(24)}
          className="px-8 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          Next →
        </button>
      </div>

      {hoveredTerm === 'ifm' && <IFMTooltip />}
      {hoveredTerm === 'afm' && <AFMTooltip />}
      {hoveredTerm === 'hints' && <HintsTooltip />}
    </div>
  );
};
