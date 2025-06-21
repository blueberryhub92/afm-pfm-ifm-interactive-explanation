import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, XCircle, TrendingUp, Calculator, ArrowRight, BarChart3, HelpCircle, Lightbulb, BookOpen } from 'lucide-react';

export const Slide24IFMSimulation = ({ scroll }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [ifmProbability, setIfmProbability] = useState(0.5);
  const [afmProbability, setAfmProbability] = useState(0.5);
  const [hoveredTerm, setHoveredTerm] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  
  const simulationRef = useRef(null);
  const parameterRef = useRef(null);
  const intervalRef = useRef(null);

  // Learning scenario: Quadratic equation solving skill
  const answerSequence = [
    { correct: true, hints: 0, description: "Solved x² - 5x + 6 = 0 independently → (x-2)(x-3)" },
    { correct: false, hints: 2, description: "Struggled with x² + 4x - 5 = 0, needed hints about factoring" },
    { correct: true, hints: 1, description: "Used quadratic formula with one hint about discriminant" },
    { correct: false, hints: 3, description: "Complex roots problem, required multiple hints about i notation" },
    { correct: true, hints: 0, description: "Successfully completed x² - 7x + 12 = 0 without help" },
    { correct: true, hints: 1, description: "Solved word problem with hint about setting up equation" },
    { correct: false, hints: 2, description: "Made arithmetic error, hints helped identify mistake" },
    { correct: true, hints: 0, description: "Mastered completing the square method independently" }
  ];

  // IFM parameters (focuses on hint learning)
  const ifmParams = {
    baseline: 0.4,
    skillDifficulty: -0.3,  // Quadratics are quite difficult
    gammaHint: 0.2          // Strong learning benefit from hints
  };

  // AFM parameters (unified learning rate)
  const afmParams = {
    baseline: 0.4,
    skillDifficulty: -0.3,
    gammaUnified: 0.1       // Moderate learning from all attempts
  };

  const calculateProbabilities = (step) => {
    if (step === 0) {
      return { ifm: 0.4, afm: 0.4 };
    }

    let totalHints = 0;
    let totalAttempts = 0;

    // Count up to current step
    for (let i = 0; i < Math.min(step, answerSequence.length); i++) {
      totalHints += answerSequence[i].hints;
      totalAttempts++;
    }

    // IFM calculation: log-odds = baseline + difficulty + (gamma_hint * total_hints)
    const ifmLogOdds = ifmParams.baseline + ifmParams.skillDifficulty + 
                       (ifmParams.gammaHint * totalHints);
    const ifmProb = 1 / (1 + Math.exp(-ifmLogOdds));

    // AFM calculation: log-odds = baseline + difficulty + (gamma * total_attempts)
    const afmLogOdds = afmParams.baseline + afmParams.skillDifficulty + 
                       (afmParams.gammaUnified * totalAttempts);
    const afmProb = 1 / (1 + Math.exp(-afmLogOdds));

    return {
      ifm: Math.max(0.05, Math.min(0.95, ifmProb)),
      afm: Math.max(0.05, Math.min(0.95, afmProb))
    };
  };

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentStep(prev => {
          const nextStep = prev + 1;
          if (nextStep > answerSequence.length) {
            setIsPlaying(false);
            return 0; // Reset
          }
          
          const probabilities = calculateProbabilities(nextStep);
          setIfmProbability(probabilities.ifm);
          setAfmProbability(probabilities.afm);
          
          return nextStep;
        });
      }, 2000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPlaying]);

  const resetSimulation = () => {
    setCurrentStep(0);
    setIfmProbability(0.4);
    setAfmProbability(0.4);
    setIsPlaying(false);
  };

  const calculateTooltipPosition = () => {
    const margin = 16;
    return { x: margin, y: margin };
  };

  const handleMouseEnter = (term) => {
    setHoveredTerm(term);
    const position = calculateTooltipPosition();
    setTooltipPosition(position);
  };

  const SimulationTooltip = () => (
    <div 
      className="fixed z-50 bg-white border border-gray-200 rounded-lg shadow-xl p-4 w-96"
      style={{ 
        left: `${tooltipPosition.x}px`, 
        top: `${tooltipPosition.y}px`,
        maxWidth: '384px'
      }}
    >
      <h4 className="font-semibold text-gray-800 mb-2">Understanding the Simulation</h4>
      
      <p className="text-gray-700 text-sm leading-relaxed mb-3">
        This simulation shows a student learning to solve quadratic equations. Each step represents a problem attempt, and we track both correctness and hint usage.
      </p>
      
      <div className="bg-orange-50 p-3 rounded-lg mb-3">
        <h5 className="font-medium text-orange-800 mb-2">Key Observations:</h5>
        <ul className="text-sm text-orange-700 space-y-1">
          <li>• IFM values scaffolded learning through hints</li>
          <li>• AFM treats all practice attempts equally</li>
          <li>• Hint-heavy problems boost IFM predictions more</li>
          <li>• Independent successes affect both models similarly</li>
        </ul>
      </div>
      
      <p className="text-gray-600 text-xs">
        Notice how IFM rises faster when students receive and benefit from multiple hints, even on incorrect attempts.
      </p>
    </div>
  );

  const ParameterTooltip = () => (
    <div 
      className="fixed z-50 bg-white border border-gray-200 rounded-lg shadow-xl p-4 w-96"
      style={{ 
        left: `${tooltipPosition.x}px`, 
        top: `${tooltipPosition.y}px`,
        maxWidth: '384px'
      }}
    >
      <h4 className="font-semibold text-gray-800 mb-2">Simulation Parameters</h4>
      
      <div className="space-y-3">
        <div className="bg-orange-50 p-3 rounded-lg">
          <h5 className="font-medium text-orange-800 mb-2">IFM Parameters:</h5>
          <div className="text-sm text-orange-700 space-y-1 font-mono">
            <div>θ (baseline) = 0.4</div>
            <div>β (difficulty) = -0.3</div>
            <div>γʰⁱⁿᵗ = +0.2</div>
          </div>
        </div>
        
        <div className="bg-green-50 p-3 rounded-lg">
          <h5 className="font-medium text-green-800 mb-2">AFM Parameters:</h5>
          <div className="text-sm text-green-700 space-y-1 font-mono">
            <div>θ (baseline) = 0.4</div>
            <div>β (difficulty) = -0.3</div>
            <div>γ (unified) = +0.1</div>
          </div>
        </div>
      </div>
      
      <p className="text-gray-600 text-xs mt-3">
        IFM's hint parameter (0.2) is twice AFM's general learning rate (0.1), reflecting the belief that guided learning through hints is particularly effective.
      </p>
    </div>
  );

  const getCurrentAnswer = () => {
    if (currentStep === 0 || currentStep > answerSequence.length) return null;
    return answerSequence[currentStep - 1];
  };

  const getHintStats = () => {
    let totalHints = 0;
    let hintsOnCorrect = 0;
    let hintsOnIncorrect = 0;
    for (let i = 0; i < Math.min(currentStep, answerSequence.length); i++) {
      const answer = answerSequence[i];
      totalHints += answer.hints;
      if (answer.correct) {
        hintsOnCorrect += answer.hints;
      } else {
        hintsOnIncorrect += answer.hints;
      }
    }
    return { totalHints, hintsOnCorrect, hintsOnIncorrect };
  };

  return (
    <div className="relative max-w-2xl w-full space-y-8">
      <p className="text-lg text-gray-700 leading-relaxed">
        Let's see how IFM's hint-focused approach works! This{' '}
        <span 
          ref={simulationRef}
          className="relative cursor-help border-b-2 border-dotted border-orange-500 text-orange-600 font-semibold"
          onMouseEnter={() => handleMouseEnter('simulation', simulationRef)}
          onMouseLeave={() => setHoveredTerm(null)}
        >
          interactive simulation
        </span>
        {' '}shows how IFM and AFM make different predictions as a student learns quadratic equations with varying levels of hint assistance.
      </p>

      {/* Controls */}
      <div className="flex items-center justify-center space-x-4">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            isPlaying ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
        >
          {isPlaying ? <XCircle size={16} /> : <CheckCircle size={16} />}
          <span>{isPlaying ? 'Pause' : 'Play'}</span>
        </button>
        
        <button
          onClick={resetSimulation}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
        >
          <ArrowRight size={16} className="rotate-180" />
          <span>Reset</span>
        </button>
      </div>

      {/* Current Status */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Step {currentStep} of {answerSequence.length}
          </h3>
          <div className="text-sm text-gray-600 flex items-center space-x-4">
            <span>✓ {answerSequence.slice(0, currentStep).filter(a => a.correct).length} correct</span>
            <span>✗ {answerSequence.slice(0, currentStep).filter(a => !a.correct).length} incorrect</span>
            <span className="flex items-center">
              <Lightbulb size={14} className="mr-1 text-yellow-600" />
              {getHintStats().totalHints} hints
            </span>
          </div>
        </div>
        
        {getCurrentAnswer() && (
          <div className={`p-3 rounded-lg border-l-4 ${
            getCurrentAnswer().correct ? 'bg-green-50 border-green-400' : 'bg-red-50 border-red-400'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                {getCurrentAnswer().correct ? (
                  <CheckCircle size={20} className="text-green-600" />
                ) : (
                  <XCircle size={20} className="text-red-600" />
                )}
                <span className={`font-medium ${
                  getCurrentAnswer().correct ? 'text-green-800' : 'text-red-800'
                }`}>
                  {getCurrentAnswer().correct ? 'Correct Answer' : 'Incorrect Answer'}
                </span>
              </div>
              <div className="flex items-center space-x-1 text-yellow-600">
                <Lightbulb size={16} />
                <span className="font-medium">{getCurrentAnswer().hints} hint{getCurrentAnswer().hints !== 1 ? 's' : ''}</span>
              </div>
            </div>
            <p className="text-sm text-gray-700">
              {getCurrentAnswer().description}
            </p>
          </div>
        )}
      </div>

      {/* Model Predictions */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-orange-50 p-4 rounded-lg border-2 border-orange-200">
          <div className="flex items-center space-x-2 mb-3">
            <HelpCircle size={18} className="text-orange-600" />
            <h4 className="font-semibold text-orange-800">IFM Prediction</h4>
          </div>
          
          <div className="text-3xl font-bold text-orange-600 mb-2">
            {(ifmProbability * 100).toFixed(1)}%
          </div>
          
          <div className="w-full bg-orange-200 rounded-full h-3 mb-3">
            <div 
              className="h-3 bg-orange-500 rounded-full transition-all duration-1000"
              style={{ width: `${ifmProbability * 100}%` }}
            ></div>
          </div>
          
          <div className="text-xs text-orange-700">
            Values scaffolded hint learning
          </div>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
          <div className="flex items-center space-x-2 mb-3">
            <TrendingUp size={18} className="text-green-600" />
            <h4 className="font-semibold text-green-800">AFM Prediction</h4>
          </div>
          
          <div className="text-3xl font-bold text-green-600 mb-2">
            {(afmProbability * 100).toFixed(1)}%
          </div>
          
          <div className="w-full bg-green-200 rounded-full h-3 mb-3">
            <div 
              className="h-3 bg-green-500 rounded-full transition-all duration-1000"
              style={{ width: `${afmProbability * 100}%` }}
            ></div>
          </div>
          
          <div className="text-xs text-green-700">
            Unified learning from all attempts
          </div>
        </div>
      </div>

      {/* Difference Indicator */}
      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
        <div className="flex items-center justify-between">
          <span className="font-medium text-purple-800">Prediction Difference:</span>
          <span className="text-lg font-bold text-purple-600">
            {Math.abs(ifmProbability - afmProbability) > 0.001 ? 
              `${Math.abs((ifmProbability - afmProbability) * 100).toFixed(1)} percentage points` :
              'Models agree'
            }
          </span>
        </div>
        {Math.abs(ifmProbability - afmProbability) > 0.05 && (
          <div className="mt-2 text-sm text-purple-700">
            {ifmProbability > afmProbability ? 
              "IFM is more optimistic - values the scaffolding provided by hints" :
              "AFM is more optimistic - treats all practice opportunities equally"
            }
          </div>
        )}
      </div>

      <p className="text-lg text-gray-700 leading-relaxed">
        Notice how IFM responds strongly to hint usage, even when students get problems wrong. The{' '}
        <span 
          ref={parameterRef}
          className="relative cursor-help border-b-2 border-dotted border-orange-500 text-orange-600 font-semibold"
          onMouseEnter={() => handleMouseEnter('parameters', parameterRef)}
          onMouseLeave={() => setHoveredTerm(null)}
        >
          parameter settings
        </span>
        {' '}reflect the belief that guided learning through hints provides substantial educational value, creating different trajectories for students who use scaffolding effectively!
      </p>
      
      <div className="text-center">
        <button
          onClick={() => scroll(25)}
          className="px-8 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          Next →
        </button>
      </div>

      {hoveredTerm === 'simulation' && <SimulationTooltip />}
      {hoveredTerm === 'parameters' && <ParameterTooltip />}
    </div>
  );
};