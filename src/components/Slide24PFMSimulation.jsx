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
    skillDifficulty: -0.2,
    gammaSuccess: 0.12,
    gammaFailure: -0.18
  };

  // AFM parameters (unified learning rate)
  const afmParams = {
    baseline: 0.5,
    skillDifficulty: -0.2,
    gammaUnified: 0.08
  };

  const calculateProbabilities = (step) => {
    if (step === 0) {
      return { pfm: 0.5, afm: 0.5 };
    }

    let successes = 0;
    let failures = 0;
    let totalAttempts = 0;

    for (let i = 0; i < Math.min(step, answerSequence.length); i++) {
      if (answerSequence[i].correct) {
        successes++;
      } else {
        failures++;
      }
      totalAttempts++;
    }

    const pfmLogOdds = pfmParams.baseline + pfmParams.skillDifficulty + 
                       (pfmParams.gammaSuccess * successes) + 
                       (pfmParams.gammaFailure * failures);
    const pfmProb = 1 / (1 + Math.exp(-pfmLogOdds));

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
            return 0;
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
      className="fixed z-50 bg-white border-2 border-black shadow-lg p-6 w-96 font-mono"
      style={{ 
        left: `${tooltipPosition.x}px`, 
        top: `${tooltipPosition.y}px`,
        maxWidth: '384px'
      }}
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 border border-black flex items-center justify-center bg-white">
          <Brain className="w-4 h-4 text-black" />
        </div>
        <h4 className="font-bold text-black text-lg tracking-wider uppercase">SIMULATION DETAILS</h4>
      </div>
      
      <div className="border-2 border-black p-4 bg-gray-50 mb-4">
        <p className="text-black font-mono text-sm leading-relaxed mb-3">
          This simulation shows a student learning string slicing in Python. Each step represents answering a question, and we can see how PFM and AFM make different predictions.
        </p>
      </div>
      
      <div className="border-l-4 border-black bg-gray-100 p-3">
        <h5 className="font-bold text-black mb-2 text-sm tracking-wider uppercase">KEY OBSERVATIONS:</h5>
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
      className="fixed z-50 bg-white border-2 border-black shadow-lg p-6 w-96 font-mono"
      style={{ 
        left: `${tooltipPosition.x}px`, 
        top: `${tooltipPosition.y}px`,
        maxWidth: '384px'
      }}
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 border border-black flex items-center justify-center bg-white">
          <Calculator className="w-4 h-4 text-black" />
        </div>
        <h4 className="font-bold text-black text-lg tracking-wider uppercase">PARAMETER VALUES</h4>
      </div>
      
      <div className="space-y-4">
        <div className="border-2 border-black p-4 bg-gray-50">
          <h5 className="font-bold text-black mb-2 text-sm tracking-wider uppercase">PFM PARAMETERS:</h5>
          <div className="text-sm text-black font-mono space-y-1">
            <div>θ (baseline) = 0.5</div>
            <div>β (difficulty) = -0.2</div>
            <div>γˢᵘᶜᶜ = +0.12</div>
            <div>γᶠᵃⁱˡ = -0.18</div>
          </div>
        </div>
        
        <div className="border-2 border-black p-4 bg-gray-50">
          <h5 className="font-bold text-black mb-2 text-sm tracking-wider uppercase">AFM PARAMETERS:</h5>
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
    <div className="bg-white min-h-screen font-mono relative">
      {/* Grid background */}
      <div 
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: 'linear-gradient(to right, #d1d5db 1px, transparent 1px), linear-gradient(to bottom, #d1d5db 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />

      {/* Header */}
      <div className="relative border-b-2 border-black bg-white px-8 py-6">
        <div className="flex items-center justify-center">
          <div className="inline-block border border-black px-3 py-1 mb-2">
            <span className="text-xs tracking-wider font-mono">COMPARATIVE ANALYSIS</span>
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold uppercase tracking-wider text-black">
            PFM vs AFM: LIVE MODEL COMPARISON
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="relative flex-1 px-8 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Introduction */}
          <div className="border-2 border-black p-6 bg-white relative">
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-black"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-black"></div>
            
            <p className="text-lg text-black leading-relaxed text-center font-mono">
              Watch how different models make predictions as a student learns{' '}
              <span 
                ref={simulationRef}
                className="relative cursor-help border-b-2 border-dotted border-black text-black font-bold"
                onMouseEnter={() => handleMouseEnter('simulation', simulationRef)}
                onMouseLeave={() => setHoveredTerm(null)}
              >
                string slicing in Python
              </span>
            </p>
          </div>

          {/* Controls */}
          <div className="border-2 border-black p-6 bg-white">
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`flex items-center space-x-2 px-6 py-3 border-2 border-black font-bold text-lg uppercase tracking-wider transition-all transform hover:scale-105 ${
                  isPlaying 
                    ? 'bg-black text-white hover:bg-white hover:text-black' 
                    : 'bg-white text-black hover:bg-black hover:text-white'
                }`}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
              </button>
              
              <button
                onClick={resetSimulation}
                className="flex items-center space-x-2 px-6 py-3 bg-white text-black border-2 border-black font-bold text-lg uppercase tracking-wider hover:bg-black hover:text-white transition-all transform hover:scale-105"
              >
                <RotateCcw size={20} />
                <span>RESET</span>
              </button>
            </div>
          </div>

          {/* Current Status */}
          <div className="border-2 border-black p-6 bg-white">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-black uppercase tracking-wider">
                STEP {currentStep} OF {answerSequence.length}
              </h3>
              <div className="flex items-center gap-6 text-lg font-bold font-mono">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border border-black bg-white flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 text-black" />
                  </div>
                  <span className="text-black">{getSuccessFailureCounts().successes} CORRECT</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border border-black bg-white flex items-center justify-center">
                    <XCircle className="w-3 h-3 text-black" />
                  </div>
                  <span className="text-black">{getSuccessFailureCounts().failures} INCORRECT</span>
                </div>
              </div>
            </div>
            
            {getCurrentAnswer() && (
              <div className={`border-2 border-black p-6 ${
                getCurrentAnswer().correct ? 'bg-gray-100' : 'bg-gray-200'
              }`}>
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-6 h-6 border border-black bg-white flex items-center justify-center">
                    {getCurrentAnswer().correct ? (
                      <CheckCircle size={16} className="text-black" />
                    ) : (
                      <XCircle size={16} className="text-black" />
                    )}
                  </div>
                  <span className="font-bold text-lg tracking-wider uppercase text-black">
                    {getCurrentAnswer().correct ? 'CORRECT ANSWER' : 'INCORRECT ANSWER'}
                  </span>
                </div>
                <p className="text-black font-mono text-base">
                  {getCurrentAnswer().description}
                </p>
              </div>
            )}
          </div>

          {/* Model Predictions */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border-2 border-black p-6 bg-white relative">
              <div className="absolute top-2 right-2 w-2 h-2 border border-black bg-white" />
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-white border-2 border-black flex items-center justify-center text-black font-bold text-lg">
                  PFM
                </div>
                <div className="text-xl font-bold text-black uppercase tracking-wider">
                  PREDICTION
                </div>
              </div>
              
              <div className="text-4xl font-bold text-black mb-4 text-center font-mono">
                {(pfmProbability * 100).toFixed(1)}%
              </div>
              
              <div className="w-full bg-gray-300 border-2 border-black h-6 mb-4 relative">
                <div 
                  className="h-full bg-black transition-all duration-1000"
                  style={{ width: `${pfmProbability * 100}%` }}
                ></div>
                <div className="absolute inset-0 bg-transparent border border-black" />
              </div>
              
              <div className="border-l-4 border-black bg-gray-100 p-4">
                <div className="text-sm text-black font-bold uppercase tracking-wider">
                  SEPARATES SUCCESS/FAILURE LEARNING
                </div>
              </div>
            </div>
            
            <div className="border-2 border-black p-6 bg-white relative">
              <div className="absolute top-2 right-2 w-2 h-2 border border-black bg-white" />
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-white border-2 border-black flex items-center justify-center text-black font-bold text-lg">
                  AFM
                </div>
                <div className="text-xl font-bold text-black uppercase tracking-wider">
                  PREDICTION
                </div>
              </div>
              
              <div className="text-4xl font-bold text-black mb-4 text-center font-mono">
                {(afmProbability * 100).toFixed(1)}%
              </div>
              
              <div className="w-full bg-gray-300 border-2 border-black h-6 mb-4 relative">
                <div 
                  className="h-full bg-black transition-all duration-1000"
                  style={{ width: `${afmProbability * 100}%` }}
                ></div>
                <div className="absolute inset-0 bg-transparent border border-black" />
              </div>
              
              <div className="border-l-4 border-black bg-gray-100 p-4">
                <div className="text-sm text-black font-bold uppercase tracking-wider">
                  UNIFIED LEARNING FROM ALL ATTEMPTS
                </div>
              </div>
            </div>
          </div>

          {/* Difference Indicator */}
          <div className="border-2 border-black p-6 bg-white">
            <div className="flex items-center justify-between mb-4">
              <span className="font-bold text-black text-xl tracking-wider uppercase">PREDICTION DIFFERENCE:</span>
              <span className="text-2xl font-bold text-black font-mono">
                {Math.abs(pfmProbability - afmProbability) > 0.001 ? 
                  `${Math.abs((pfmProbability - afmProbability) * 100).toFixed(1)}%` :
                  'MODELS AGREE'
                }
              </span>
            </div>
            
            {Math.abs(pfmProbability - afmProbability) > 0.05 && (
              <div className="border-l-4 border-black bg-gray-100 p-4">
                <div className="text-black font-bold text-lg uppercase tracking-wider">
                  {pfmProbability > afmProbability ? 
                    "PFM IS MORE OPTIMISTIC - RECENT SUCCESSES OUTWEIGH EARLY FAILURES" :
                    "AFM IS MORE OPTIMISTIC - TREATS ALL PRACTICE AS BENEFICIAL"
                  }
                </div>
              </div>
            )}
          </div>

          {/* Bottom Insight */}
          <div className="border-2 border-black p-6 bg-white">
            <div className="flex items-center gap-3 mb-4 font-bold text-xl text-black uppercase tracking-wider">
              <div className="w-6 h-6 border border-black bg-white flex items-center justify-center">
                <Brain className="w-4 h-4 text-black" />
              </div>
              Key Insight: Different Models, Different Learning Trajectories
            </div>
            <p className="text-black font-mono text-lg leading-relaxed">
              Notice how the models diverge based on the sequence of answers. The{' '}
              <span 
                ref={parameterRef}
                className="relative cursor-help border-b-2 border-dotted border-black text-black font-bold"
                onMouseEnter={() => handleMouseEnter('parameters', parameterRef)}
                onMouseLeave={() => setHoveredTerm(null)}
              >
                parameter values
              </span>
              {' '}determine how sensitive each model is to successes versus failures, creating different learning trajectories for the same student!
            </p>
          </div>
          
          {/* Navigation */}
          <div className="flex justify-center">
            <button
              onClick={() => scroll(20)}
              className="px-8 py-4 bg-black text-white border-2 border-black font-bold text-lg uppercase tracking-wider hover:bg-white hover:text-black transition-all transform hover:scale-105 flex items-center gap-3"
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