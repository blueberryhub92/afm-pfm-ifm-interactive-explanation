import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';

export const Slide4AFMIntroduction = ({ scroll }) => {
  const [hoveredTerm, setHoveredTerm] = useState(null);
  const [probability, setProbability] = useState(0.25);
  const [taskRecommendation, setTaskRecommendation] = useState('');
  const [difficultyLevel, setDifficultyLevel] = useState('Medium');
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0, side: 'right' });
  
  const skillRef = useRef(null);
  const baselineRef = useRef(null);
  const successRef = useRef(null);

  // Simulate probability changes and adaptive recommendations
  useEffect(() => {
    const interval = setInterval(() => {
      setProbability(prev => {
        const change = (Math.random() - 0.5) * 0.15;
        const newValue = prev + change;
        return Math.max(0.1, Math.min(0.95, newValue));
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Update task recommendations based on probability
  useEffect(() => {
    if (probability < 0.3) {
      setTaskRecommendation('Review basic concepts');
      setDifficultyLevel('Easy');
    } else if (probability < 0.6) {
      setTaskRecommendation('Practice similar problems');
      setDifficultyLevel('Medium');
    } else if (probability < 0.8) {
      setTaskRecommendation('Try advanced variations');
      setDifficultyLevel('Hard');
    } else {
      setTaskRecommendation('Challenge with complex tasks');
      setDifficultyLevel('Expert');
    }
  }, [probability]);

  // Simple tooltip position calculation - always in top-left corner
  const calculateTooltipPosition = (element, tooltipWidth = 384, tooltipHeight = 300) => {
    const margin = 16; // Margin from screen edges
    
    return { 
      x: margin, 
      y: margin, 
      side: 'top-left' 
    };
  };

  const handleMouseEnter = (term, ref, tooltipWidth = 384, tooltipHeight = 300) => {
    setHoveredTerm(term);
    if (ref.current) {
      const position = calculateTooltipPosition(ref.current, tooltipWidth, tooltipHeight);
      setTooltipPosition(position);
    }
  };

  const SkillTooltip = () => (
    <div 
      className="fixed z-50 bg-white border border-gray-200 rounded-lg shadow-xl p-4 w-96"
      style={{ 
        left: `${tooltipPosition.x}px`, 
        top: `${tooltipPosition.y}px`,
        maxWidth: '384px'
      }}
    >
      <h4 className="font-semibold text-gray-800 mb-2">What is a "Skill" in AFM?</h4>
      
      <p className="text-gray-700 text-sm leading-relaxed mb-3">
        In AFM, a "skill" is a specific concept or technique that can be learned and practiced independently. Each skill represents a distinct cognitive ability.
      </p>
      
      <div className="bg-gray-100 p-3 rounded-lg font-mono text-sm mb-3">
        <div className="text-green-600 mb-1"># Current Example - String Slicing:</div>
        <div>word = "nohtyp"</div>
        <div>reversed_word = word[::-1]</div>
        <div>print(reversed_word)</div>
        <div className="text-blue-600 mt-1"># Output: python</div>
      </div>
      
      <div>
        <h5 className="font-medium text-gray-800 mb-2">Other Python Skills in AFM:</h5>
        <div className="space-y-2 text-sm">
          <div>
            <strong className="text-blue-600">Functions:</strong> Defining and calling functions, parameters, return values
          </div>
          <div>
            <strong className="text-green-600">Object-Oriented Programming:</strong> Classes, objects, inheritance, encapsulation
          </div>
          <div>
            <strong className="text-purple-600">Recursion:</strong> Base cases, recursive calls, stack understanding
          </div>
          <div>
            <strong className="text-orange-600">Data Structures:</strong> Lists, dictionaries, sets, tuples manipulation
          </div>
          <div>
            <strong className="text-red-600">Control Flow:</strong> If/else statements, loops, conditional logic
          </div>
          <div>
            <strong className="text-teal-600">Exception Handling:</strong> Try/except blocks, error management
          </div>
        </div>
      </div>
      
      <p className="text-gray-600 text-xs mt-3">
        Each skill is tracked separately, allowing personalized learning paths for different programming concepts.
      </p>
    </div>
  );

  const BaselineProficiencyTooltip = () => (
    <div 
      className="fixed z-50 bg-white border border-gray-200 rounded-lg shadow-xl p-4 w-96"
      style={{ 
        left: `${tooltipPosition.x}px`, 
        top: `${tooltipPosition.y}px`,
        maxWidth: '384px'
      }}
    >
      <h4 className="font-semibold text-gray-800 mb-2">How AFM Determines Baseline Proficiency (θ)</h4>
      
      <p className="text-gray-700 text-sm leading-relaxed mb-3">
        Before you attempt any tasks, AFM estimates your baseline proficiency using several methods:
      </p>
      
      <ul className="text-gray-700 text-sm space-y-2">
        <li>• <strong>Prior assessments:</strong> Previous performance on similar skills</li>
        <li>• <strong>Self-reported experience:</strong> Your stated familiarity with Python</li>
        <li>• <strong>Demographic factors:</strong> Education level, programming background</li>
        <li>• <strong>Initial diagnostic questions:</strong> Quick skills assessment</li>
        <li>• <strong>Time spent on similar topics:</strong> Learning engagement patterns</li>
      </ul>
    </div>
  );

  const SuccessProbabilitySimulation = () => (
    <div 
      className="fixed z-50 bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-lg shadow-xl p-4 w-80"
      style={{ 
        left: `${tooltipPosition.x}px`, 
        top: `${tooltipPosition.y}px`,
        maxWidth: '320px'
      }}
    >
      <div className="text-sm font-semibold text-blue-800 mb-2 flex items-center">
        <span>Live Success Probability</span>
        {probability >= 0.7 ? <TrendingUp size={16} className="ml-1 text-green-600" /> : 
         probability <= 0.4 ? <TrendingDown size={16} className="ml-1 text-red-600" /> : 
         <ArrowRight size={16} className="ml-1 text-yellow-600" />}
      </div>
      
      <div className="text-2xl font-bold text-blue-600 mb-1">
        {(probability * 100).toFixed(1)}%
      </div>
      
      <div className="text-xs text-blue-600 mb-3">
        String Slicing Skill
      </div>
      
      <div className="w-full bg-blue-200 rounded-full h-2 mb-3">
        <div 
          className={`h-2 rounded-full transition-all duration-1000 ${
            probability >= 0.7 ? 'bg-green-500' : 
            probability <= 0.4 ? 'bg-red-500' : 'bg-yellow-500'
          }`}
          style={{ width: `${probability * 100}%` }}
        ></div>
      </div>
      
      <div className="border-t border-blue-200 pt-2">
        <div className="text-xs font-semibold text-gray-700 mb-1">
          Adaptive Recommendation:
        </div>
        <div className={`text-sm font-medium px-2 py-1 rounded text-center ${
          difficultyLevel === 'Easy' ? 'bg-green-100 text-green-800' :
          difficultyLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
          difficultyLevel === 'Hard' ? 'bg-orange-100 text-orange-800' :
          'bg-red-100 text-red-800'
        }`}>
          {difficultyLevel}: {taskRecommendation}
        </div>
      </div>
      
      <p className="text-xs text-gray-600 mt-2">
        Watch how recommendations change based on predicted success probability!
      </p>
    </div>
  );

  return (
    <div className="relative max-w-2xl w-full space-y-8">
      <p className="text-lg text-gray-700 leading-relaxed">
        If you said pretty small, you'd be right.
      </p>
      
      <p className="text-lg text-gray-700 leading-relaxed">
        So what does this have to do with <strong>Additive Factor Models</strong>? Well, AFM is an artificial intelligence algorithm that helps us predict what people know – often students, since AFM is typically used in educational contexts (e.g., Khan Academy and other online learning sites).
      </p>
      
      <p className="text-lg text-gray-700 leading-relaxed">
        Like many other algorithms, AFM relies on parameters to compute its output, which in this case is the success probability
        {' '}that a student answers the next question on a specific{' '}
        <span 
          ref={skillRef}
          className="relative cursor-help border-b-2 border-dotted border-green-500 text-green-600 font-semibold"
          onMouseEnter={() => handleMouseEnter('skill', skillRef, 384, 400)}
          onMouseLeave={() => setHoveredTerm(null)}
        >
          skill
        </span>
        {' '}correctly.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        But why is knowing this success probability so valuable? It enables <strong>adaptive learning</strong> – the system can automatically adjust the difficulty and type of questions based on your predicted performance. If your success probability is very low (say, below 30%), the next task should be easier to build confidence and fill knowledge gaps. If it's very high (above 80%), you're ready for more challenging problems to accelerate your learning. Check out this {' '}
        <span 
          ref={successRef}
          className="relative cursor-help border-b-2 border-dotted border-blue-500 text-blue-600 font-semibold"
          onMouseEnter={() => handleMouseEnter('success-probability', successRef, 320, 280)}
          onMouseLeave={() => setHoveredTerm(null)}
        >
          simulation 
        </span>
        {' '}to see how reccomendations change depending on success probability
      </p>
      
      <p className="text-lg text-gray-700 leading-relaxed">
        And <em>guess what?</em> You already know about the first parameter, <strong>θ</strong>, which is the{' '}
        <span 
          ref={baselineRef}
          className="relative cursor-help border-b-2 border-dotted border-purple-500 text-purple-600 font-semibold"
          onMouseEnter={() => handleMouseEnter('baseline-proficiency', baselineRef, 384, 280)}
          onMouseLeave={() => setHoveredTerm(null)}
        >
          baseline proficiency
        </span>
        . This is what the model estimates about your ability before seeing you work on specific skills.
      </p>
      
      <div className="text-center">
        <button
          onClick={() => scroll(5)}
          className="px-8 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
        >
          Next →
        </button>
      </div>

      {hoveredTerm === 'skill' && <SkillTooltip />}
      {hoveredTerm === 'baseline-proficiency' && <BaselineProficiencyTooltip />}
      {hoveredTerm === 'success-probability' && <SuccessProbabilitySimulation />}
    </div>
  );
};