import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, XCircle, Play, Pause, RotateCcw, TrendingUp, TrendingDown, Calculator } from 'lucide-react';

export const Slide22PFMSimulation = ({ scroll }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [pfmProbability, setPfmProbability] = useState(0.5);
  const [afmProbability, setAfmProbability] = useState(0.5);
  const [hoveredTerm, setHoveredTerm] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  
  const simulationRef = useRef(null);
  const parameterRef = useRef(null);
  const intervalRef = useRef(null);

  // Learning scenario: String slicing skill
  const answerSequence = [
    { correct: true, description: "Correctly sliced 'hello'[1:4] → 'ell'" },
    { correct: false, description: "Incorrectly tried 'hello'[1,4] (comma instead of colon)" },
    { correct: false, description: "Got confused with negative indexing 'hello'[-1:2]" },
    { correct: true, description: "Successfully used 'hello'[::-1] for reversal" },
    { correct: true, description: "Correctly extracted substring 'python'[2:5] → 'tho'" },
    { correct: false, description: "Made off-by-one error with 'hello'[0:6]" },
    { correct: true, description: "Mastered step slicing 'hello'[::2] → 'hlo'" },
    { correct: true, description: "Applied slicing to solve reverse palindrome check" }
  ];

  // PFM parameters (different learning rates for success/failure)
  const pfmParams = {
    baseline: 0.5,
    skillDifficulty: -0.2, // String slicing is moderately difficult
    gammaSuccess: 0.12,    // Modest learning from correct answers
    gammaFailure: -0.18    // Stronger impact from mistakes (but negative)
  };

  // AFM parameters (unified learning rate)
  const afmParams = {
    baseline: 0.5,
    skillDifficulty: -0.2,
    gammaUnified: 0.08     // Single learning rate for all attempts
  };

  const calculateProbabilities = (step) => {
    if (step === 0) {
      return { pfm: 0.5, afm: 0.5 };
    }

    let successes = 0;
    let failures = 0;
    let totalAttempts = 0;

    // Count up to current step
    for (let i = 0; i < Math.min(step, answerSequence.length); i++) {
      if (answerSequence[i].correct) {
        successes++;
      } else {
        failures++;
      }
      totalAttempts++;
    }

    // PFM calculation: log-odds = baseline + difficulty + (gamma_succ * successes) + (gamma_fail * failures)
    const pfmLogOdds = pfmParams.baseline + pfmParams.skillDifficulty + 
                       (pfmParams.gammaSuccess * successes) + 
                       (pfmParams.gammaFailure * failures);
    const pfmProb = 1 / (1 + Math.exp(-pfmLogOdds));

    // AFM calculation: log-odds = baseline + difficulty + (gamma * total_attempts)
    const afmLogOdds = afmParams.baseline + afmParams.skillDifficulty + 
                       (afmParams.gammaUnified * totalAttempts);
    const afmProb = 1 / (1 + Math.exp(-afmLogOdds));

    return {
      pfm: Math.max(0.05, Math.min(0.95, pfmProb)),
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
          setPfmProbability(probabilities.pfm);
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
    setPfmProbability(0.5);
    setAfmProbability(0.5);
    setIsPlaying(false);
  };

  const calculateTooltipPosition = () => {
    const margin = 16;
    return { x: margin, y: margin };
  };

  const handleMouseEnter = (term, ref) => {
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
        This simulation shows a student learning string slicing in Python. Each step represents answering a question, and we can see how PFM and AFM make different predictions.
      </p>
      
      <div className="bg-blue-50 p-3 rounded-lg mb-3">
        <h5 className="font-medium text-blue-800 mb-2">Key Observations:</h5>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• PFM is more sensitive to the pattern of successes vs. failures</li>
          <li>• AFM focuses on total practice opportunities</li>
          <li>• Early mistakes have different impacts in each model</li>
          <li>• The models diverge more as learning history grows</li>
        </ul>
      </div>
      
      <p className="text-gray-600 text-xs">
        Notice how the prediction gap between models widens when there are consecutive successes or failures.
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
        <div className="bg-blue-50 p-3 rounded-lg">
          <h5 className="font-medium text-blue-800 mb-2">PFM Parameters:</h5>
          <div className="text-sm text-blue-700 space-y-1 font-mono">
            <div>θ (baseline) = 0.5</div>
            <div>β (difficulty) = -0.2</div>
            <div>γˢᵘᶜᶜ = +0.12</div>
            <div>γᶠᵃⁱˡ = -0.18</div>
          </div>
        </div>
        
        <div className="bg-green-50 p-3 rounded-lg">
          <h5 className="font-medium text-green-800 mb-2">AFM Parameters:</h5>
          <div className="text-sm text-green-700 space-y-1 font-mono">
            <div>θ (baseline) = 0.5</div>
            <div>β (difficulty) = -0.2</div>
            <div>γ (unified) = +0.08</div>
          </div>
        </div>
      </div>
      
      <p className="text-gray-600 text-xs mt-3">
        Notice how PFM's failure parameter is more negative than success is positive - this means mistakes hurt more than successes help for this particular skill.
      </p>
    </div>
  );

  const getCurrentAnswer = () => {
    if (currentStep === 0 || currentStep > answerSequence.length) return null;
    return answerSequence[currentStep - 1];
  };

  const getSuccessFailureCounts = () => {
    let successes = 0;
    let failures = 0;
    for (let i = 0; i < Math.min(currentStep, answerSequence.length); i++) {
      if (answerSequence[i].correct) successes++;
      else failures++;
    }
    return { successes, failures };
  };

  return (
    <div className="relative max-w-2xl w-full space-y-8">
      <p className="text-lg text-gray-700 leading-relaxed">
        Let's see this difference in action! This{' '}
        <span 
          ref={simulationRef}
          className="relative cursor-help border-b-2 border-dotted border-blue-500 text-blue-600 font-semibold"
          onMouseEnter={() => handleMouseEnter('simulation', simulationRef)}
          onMouseLeave={() => setHoveredTerm(null)}
        >
          interactive simulation
        </span>
        {' '}shows how PFM and AFM make different predictions as a student learns string slicing in Python.
      </p>

      {/* Controls */}
      <div className="flex items-center justify-center space-x-4">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            isPlaying ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          <span>{isPlaying ? 'Pause' : 'Play'}</span>
        </button>
        
        <button
          onClick={resetSimulation}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
        >
          <RotateCcw size={16} />
          <span>Reset</span>
        </button>
      </div>

      {/* Current Status */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Step {currentStep} of {answerSequence.length}
          </h3>
          <div className="text-sm text-gray-600">
            ✓ {getSuccessFailureCounts().successes} correct | ✗ {getSuccessFailureCounts().failures} incorrect
          </div>
        </div>
        
        {getCurrentAnswer() && (
          <div className={`p-3 rounded-lg border-l-4 ${
            getCurrentAnswer().correct ? 'bg-green-50 border-green-400' : 'bg-red-50 border-red-400'
          }`}>
            <div className="flex items-center space-x-2 mb-2">
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
            <p className="text-sm text-gray-700">
              {getCurrentAnswer().description}
            </p>
          </div>
        )}
      </div>

      {/* Model Predictions */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
          <div className="flex items-center space-x-2 mb-3">
            <Calculator size={18} className="text-blue-600" />
            <h4 className="font-semibold text-blue-800">PFM Prediction</h4>
          </div>
          
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {(pfmProbability * 100).toFixed(1)}%
          </div>
          
          <div className="w-full bg-blue-200 rounded-full h-3 mb-3">
            <div 
              className="h-3 bg-blue-500 rounded-full transition-all duration-1000"
              style={{ width: `${pfmProbability * 100}%` }}
            ></div>
          </div>
          
          <div className="text-xs text-blue-700">
            Separates success/failure learning
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
            {Math.abs(pfmProbability - afmProbability) > 0.001 ? 
              `${Math.abs((pfmProbability - afmProbability) * 100).toFixed(1)} percentage points` :
              'Models agree'
            }
          </span>
        </div>
        {Math.abs(pfmProbability - afmProbability) > 0.05 && (
          <div className="mt-2 text-sm text-purple-700">
            {pfmProbability > afmProbability ? 
              "PFM is more optimistic - recent successes outweigh early failures" :
              "AFM is more optimistic - treats all practice as beneficial"
            }
          </div>
        )}
      </div>

      <p className="text-lg text-gray-700 leading-relaxed">
        Notice how the models diverge based on the sequence of answers. The{' '}
        <span 
          ref={parameterRef}
          className="relative cursor-help border-b-2 border-dotted border-purple-500 text-purple-600 font-semibold"
          onMouseEnter={() => handleMouseEnter('parameters', parameterRef)}
          onMouseLeave={() => setHoveredTerm(null)}
        >
          parameter values
        </span>
        {' '}determine how sensitive each model is to successes versus failures, creating different learning trajectories for the same student!
      </p>
      
      <div className="text-center">
        <button
          onClick={() => scroll(23)}
          className="px-8 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
        >
          Next →
        </button>
      </div>

      {hoveredTerm === 'simulation' && <SimulationTooltip />}
      {hoveredTerm === 'parameters' && <ParameterTooltip />}
    </div>
  );
};