import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, XCircle, Play, Pause, RotateCcw, TrendingUp, Calculator, ArrowRight, Brain, Zap, Target } from 'lucide-react';

export const Slide24PFMSimulation = ({ scroll }) => {
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
      className="fixed z-50 bg-white border-4 border-black rounded-xl shadow-lg p-6 w-96 font-['IBM_Plex_Mono',monospace]"
      style={{ 
        left: `${tooltipPosition.x}px`, 
        top: `${tooltipPosition.y}px`,
        maxWidth: '384px'
      }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Brain className="w-5 h-5 text-black" />
        <h4 className="font-bold text-black text-lg tracking-wide">SIMULATION DETAILS</h4>
      </div>
      
      <div className="border-4 border-black rounded-lg p-4 bg-gray-50 mb-4">
        <p className="text-black font-mono text-sm leading-relaxed mb-3">
          This simulation shows a student learning string slicing in Python. Each step represents answering a question, and we can see how PFM and AFM make different predictions.
        </p>
      </div>
      
      <div className="border-l-8 border-blue-600 bg-blue-100 p-3 rounded-r-lg">
        <h5 className="font-bold text-blue-800 mb-2 text-sm tracking-wide">KEY OBSERVATIONS:</h5>
        <ul className="text-sm text-black font-mono space-y-1">
          <li>• PFM is more sensitive to the pattern of successes vs. failures</li>
          <li>• AFM focuses on total practice opportunities</li>
          <li>• Early mistakes have different impacts in each model</li>
          <li>• The models diverge more as learning history grows</li>
        </ul>
      </div>
    </div>
  );

  const ParameterTooltip = () => (
    <div 
      className="fixed z-50 bg-white border-4 border-black rounded-xl shadow-lg p-6 w-96 font-['IBM_Plex_Mono',monospace]"
      style={{ 
        left: `${tooltipPosition.x}px`, 
        top: `${tooltipPosition.y}px`,
        maxWidth: '384px'
      }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="w-5 h-5 text-black" />
        <h4 className="font-bold text-black text-lg tracking-wide">PARAMETER VALUES</h4>
      </div>
      
      <div className="space-y-4">
        <div className="border-4 border-blue-600 rounded-lg p-4 bg-blue-50">
          <h5 className="font-bold text-blue-800 mb-2 text-sm tracking-wide">PFM PARAMETERS:</h5>
          <div className="text-sm text-black font-mono space-y-1">
            <div>θ (baseline) = 0.5</div>
            <div>β (difficulty) = -0.2</div>
            <div>γˢᵘᶜᶜ = +0.12</div>
            <div>γᶠᵃⁱˡ = -0.18</div>
          </div>
        </div>
        
        <div className="border-4 border-green-600 rounded-lg p-4 bg-green-50">
          <h5 className="font-bold text-green-800 mb-2 text-sm tracking-wide">AFM PARAMETERS:</h5>
          <div className="text-sm text-black font-mono space-y-1">
            <div>θ (baseline) = 0.5</div>
            <div>β (difficulty) = -0.2</div>
            <div>γ (unified) = +0.08</div>
          </div>
        </div>
      </div>
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
    <div className="bg-white min-h-screen flex flex-col text-black font-['IBM_Plex_Mono',monospace]">
      {/* Header - matching Slide22 pattern */}
      <div className="border-b-8 border-black bg-purple-400 px-8 py-6 shadow-lg">
        <div className="flex items-center justify-center">
          <span className="text-black font-bold text-2xl uppercase tracking-wider">
            PFM vs AFM: Live Model Comparison
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-8 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Introduction */}
          <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg">
            <p className="text-lg text-black leading-relaxed text-center">
              Watch how different models make predictions as a student learns{' '}
              <span 
                ref={simulationRef}
                className="relative cursor-help border-b-4 border-dotted border-blue-600 text-blue-600 font-bold"
                onMouseEnter={() => handleMouseEnter('simulation', simulationRef)}
                onMouseLeave={() => setHoveredTerm(null)}
              >
                string slicing in Python
              </span>
            </p>
          </div>

          {/* Controls */}
          <div className="border-4 border-black rounded-xl p-6 bg-gray-50 shadow-lg">
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`flex items-center space-x-2 px-6 py-3 border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide transition-all transform hover:scale-105 ${
                  isPlaying 
                    ? 'bg-red-600 text-white hover:bg-white hover:text-red-600' 
                    : 'bg-green-600 text-white hover:bg-white hover:text-green-600'
                }`}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
              </button>
              
              <button
                onClick={resetSimulation}
                className="flex items-center space-x-2 px-6 py-3 bg-gray-600 text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-gray-600 transition-all transform hover:scale-105"
              >
                <RotateCcw size={20} />
                <span>RESET</span>
              </button>
            </div>
          </div>

          {/* Current Status */}
          <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-black uppercase tracking-wide">
                STEP {currentStep} OF {answerSequence.length}
              </h3>
              <div className="flex items-center gap-6 text-lg font-bold">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-green-600">{getSuccessFailureCounts().successes} CORRECT</span>
                </div>
                <div className="flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-600" />
                  <span className="text-red-600">{getSuccessFailureCounts().failures} INCORRECT</span>
                </div>
              </div>
            </div>
            
            {getCurrentAnswer() && (
              <div className={`border-4 rounded-xl p-6 ${
                getCurrentAnswer().correct 
                  ? 'bg-green-100 border-green-600' 
                  : 'bg-red-100 border-red-600'
              }`}>
                <div className="flex items-center space-x-3 mb-3">
                  {getCurrentAnswer().correct ? (
                    <CheckCircle size={24} className="text-green-600" />
                  ) : (
                    <XCircle size={24} className="text-red-600" />
                  )}
                  <span className={`font-bold text-lg tracking-wide uppercase ${
                    getCurrentAnswer().correct ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {getCurrentAnswer().correct ? 'CORRECT ANSWER' : 'INCORRECT ANSWER'}
                  </span>
                </div>
                <p className="text-black font-bold text-base">
                  {getCurrentAnswer().description}
                </p>
              </div>
            )}
          </div>

          {/* Model Predictions */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-blue-100 border-4 border-blue-600 rounded-xl flex items-center justify-center text-blue-700 font-bold text-2xl">
                  P
                </div>
                <div className="text-xl font-bold text-black uppercase tracking-wide">
                  PFM PREDICTION
                </div>
              </div>
              
              <div className="text-4xl font-bold text-blue-600 mb-4 text-center">
                {(pfmProbability * 100).toFixed(1)}%
              </div>
              
              <div className="w-full bg-gray-300 border-4 border-black rounded-full h-6 mb-4">
                <div 
                  className="h-full bg-blue-600 rounded-full transition-all duration-1000"
                  style={{ width: `${pfmProbability * 100}%` }}
                ></div>
              </div>
              
              <div className="border-l-4 border-blue-600 bg-blue-100 p-4 rounded-r-lg">
                <div className="text-sm text-black font-bold uppercase">
                  SEPARATES SUCCESS/FAILURE LEARNING
                </div>
              </div>
            </div>
            
            <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-green-100 border-4 border-green-600 rounded-xl flex items-center justify-center text-green-700 font-bold text-2xl">
                  A
                </div>
                <div className="text-xl font-bold text-black uppercase tracking-wide">
                  AFM PREDICTION
                </div>
              </div>
              
              <div className="text-4xl font-bold text-green-600 mb-4 text-center">
                {(afmProbability * 100).toFixed(1)}%
              </div>
              
              <div className="w-full bg-gray-300 border-4 border-black rounded-full h-6 mb-4">
                <div 
                  className="h-full bg-green-600 rounded-full transition-all duration-1000"
                  style={{ width: `${afmProbability * 100}%` }}
                ></div>
              </div>
              
              <div className="border-l-4 border-green-600 bg-green-100 p-4 rounded-r-lg">
                <div className="text-sm text-black font-bold uppercase">
                  UNIFIED LEARNING FROM ALL ATTEMPTS
                </div>
              </div>
            </div>
          </div>

          {/* Difference Indicator */}
          <div className="border-4 border-black rounded-xl p-8 bg-gradient-to-r from-yellow-100 to-orange-100 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <span className="font-bold text-black text-xl tracking-wide uppercase">PREDICTION DIFFERENCE:</span>
              <span className="text-2xl font-bold text-orange-600">
                {Math.abs(pfmProbability - afmProbability) > 0.001 ? 
                  `${Math.abs((pfmProbability - afmProbability) * 100).toFixed(1)} PERCENTAGE POINTS` :
                  'MODELS AGREE'
                }
              </span>
            </div>
            
            {Math.abs(pfmProbability - afmProbability) > 0.05 && (
              <div className="border-l-4 border-orange-600 bg-orange-200 p-4 rounded-r-lg">
                <div className="text-black font-bold text-lg uppercase">
                  {pfmProbability > afmProbability ? 
                    "PFM IS MORE OPTIMISTIC - RECENT SUCCESSES OUTWEIGH EARLY FAILURES" :
                    "AFM IS MORE OPTIMISTIC - TREATS ALL PRACTICE AS BENEFICIAL"
                  }
                </div>
              </div>
            )}
          </div>

          {/* Bottom Insight */}
          <div className="border-4 border-black rounded-xl p-8 bg-gradient-to-r from-purple-100 to-pink-100 shadow-lg">
            <div className="flex items-center gap-3 mb-4 font-bold text-xl text-black uppercase tracking-wide">
              <Brain className="w-6 h-6 text-purple-700" />
              Key Insight: Different Models, Different Learning Trajectories
            </div>
            <p className="text-black font-bold text-lg leading-relaxed">
              Notice how the models diverge based on the sequence of answers. The{' '}
              <span 
                ref={parameterRef}
                className="relative cursor-help border-b-4 border-dotted border-purple-600 text-purple-600 font-bold"
                onMouseEnter={() => handleMouseEnter('parameters', parameterRef)}
                onMouseLeave={() => setHoveredTerm(null)}
              >
                parameter values
              </span>
              {' '}determine how sensitive each model is to successes versus failures, creating different learning trajectories for the same student!
            </p>
          </div>
          
          {/* Navigation - matching Slide22 pattern */}
          <div className="flex justify-center">
            <button
              onClick={() => scroll(25)}
              className="px-8 py-4 bg-purple-600 text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-purple-600 transition-all transform hover:scale-105 flex items-center gap-3"
            >
              <span>Continue</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {hoveredTerm === 'simulation' && <SimulationTooltip />}
      {hoveredTerm === 'parameters' && <ParameterTooltip />}
    </div>
  );
};