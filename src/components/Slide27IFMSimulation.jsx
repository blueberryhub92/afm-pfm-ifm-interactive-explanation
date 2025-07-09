import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, XCircle, Play, Pause, RotateCcw, TrendingUp, Calculator, ArrowRight, Brain, Zap, Target, HelpCircle, Lightbulb } from 'lucide-react';

export const Slide27IFMSimulation = ({ scroll }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [ifmProbability, setIfmProbability] = useState(0.4);
  const [afmProbability, setAfmProbability] = useState(0.4);
  const [pfmProbability, setPfmProbability] = useState(0.4);
  const [hoveredTerm, setHoveredTerm] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  
  const simulationRef = useRef(null);
  const parameterRef = useRef(null);
  const intervalRef = useRef(null);

  // Learning scenario: For loops and while loops in Python
  const answerSequence = [
    { correct: true, hints: 0, description: "for i in range(5): print(i) - correctly printed 0-4" },
    { correct: false, hints: 2, description: "while loop condition error, hints about termination needed" },
    { correct: true, hints: 1, description: "nested for loop with hint about indentation" },
    { correct: false, hints: 3, description: "infinite loop bug, multiple hints about loop exit conditions" },
    { correct: true, hints: 0, description: "for loop with enumerate() - mastered independently" },
    { correct: true, hints: 1, description: "while loop with counter, one hint about initialization" },
    { correct: false, hints: 2, description: "list comprehension vs loop confusion, hints clarified syntax" },
    { correct: true, hints: 0, description: "complex nested loops for matrix iteration - solved independently" }
  ];

  // AFM parameters (MOST OPTIMISTIC - treats all practice as beneficial)
  const afmParams = {
    baseline: 0.4,
    skillDifficulty: -0.6,
    gammaUnified: 0.18      // High learning from all attempts (optimistic)
  };

  // PFM parameters (MODERATE - successes help, failures hurt)
  const pfmParams = {
    baseline: 0.4,
    skillDifficulty: -0.6,
    gammaSuccess: 0.16,     // Learning from correct responses
    gammaFailure: -0.06     // Penalty for incorrect responses
  };

  // IFM parameters (LEAST OPTIMISTIC - most conservative)
  const ifmParams = {
    baseline: 0.4,           // θ (student baseline)
    skillDifficulty: -0.6,   // β (KC difficulty)
    successEffect: 0.12,     // μ (effect of prior successes) - modest boost
    failureEffect: -0.15,    // ρ (effect of prior failures) - strong penalty
    hintEffect: -0.08        // ν (effect of prior hints/tells) - slight penalty
  };

  const calculateProbabilities = (step) => {
    if (step === 0) {
      return { ifm: 0.4, afm: 0.4, pfm: 0.4 };
    }

    let totalSuccesses = 0;
    let totalFailures = 0;
    let totalHints = 0;
    let totalAttempts = 0;

    // Count up to current step
    for (let i = 0; i < Math.min(step, answerSequence.length); i++) {
      const answer = answerSequence[i];
      totalHints += answer.hints;
      totalAttempts++;
      
      if (answer.correct) {
        totalSuccesses++;
      } else {
        totalFailures++;
      }
    }

    // AFM calculation (MOST OPTIMISTIC): log-odds = baseline + difficulty + (gamma * total_attempts)
    const afmLogOdds = afmParams.baseline + 
                       afmParams.skillDifficulty + 
                       (afmParams.gammaUnified * totalAttempts);
    const afmProb = 1 / (1 + Math.exp(-afmLogOdds));

    // PFM calculation (MODERATE): separate learning rates for successes/failures only
    const pfmLogOdds = pfmParams.baseline + 
                       pfmParams.skillDifficulty + 
                       (pfmParams.gammaSuccess * totalSuccesses) +
                       (pfmParams.gammaFailure * totalFailures);
    const pfmProb = 1 / (1 + Math.exp(-pfmLogOdds));

    // IFM calculation (LEAST OPTIMISTIC): log-odds = θ + β + μ*S + ρ*F + ν*T
    const ifmLogOdds = ifmParams.baseline + 
                       ifmParams.skillDifficulty + 
                       (ifmParams.successEffect * totalSuccesses) +
                       (ifmParams.failureEffect * totalFailures) +
                       (ifmParams.hintEffect * totalHints);
    const ifmProb = 1 / (1 + Math.exp(-ifmLogOdds));

    return {
      afm: Math.max(0.05, Math.min(0.95, afmProb)),
      pfm: Math.max(0.05, Math.min(0.95, pfmProb)),
      ifm: Math.max(0.05, Math.min(0.95, ifmProb))
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
          setAfmProbability(probabilities.afm);
          setPfmProbability(probabilities.pfm);
          setIfmProbability(probabilities.ifm);
          
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
    setAfmProbability(0.4);
    setPfmProbability(0.4);
    setIfmProbability(0.4);
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
      {/* Technical corner brackets */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black"></div>
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-black"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-black"></div>
      
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 border border-black flex items-center justify-center bg-white">
          <Brain className="w-4 h-4 text-black" />
        </div>
        <h4 className="font-bold text-black text-lg tracking-wider uppercase">SIMULATION SPEC</h4>
      </div>
      
      <div className="border-2 border-black p-4 bg-white mb-4">
        <p className="text-black font-mono text-sm leading-relaxed mb-3">
          STUDENT LEARNING PYTHON LOOPS (FOR/WHILE) • TRACKING CORRECTNESS + HINTS • COMPARATIVE MODEL ANALYSIS
        </p>
      </div>
      
      <div className="border-l-4 border-black bg-gray-100 p-3">
        <h5 className="font-bold text-black mb-2 text-sm tracking-wider">OPTIMISM RANKING:</h5>
        <ul className="text-sm text-black font-mono space-y-1">
          <li>• AFM: MOST OPTIMISTIC - ALL ATTEMPTS HELP</li>
          <li>• PFM: MODERATE - SUCCESSES HELP, FAILURES HURT</li>
          <li>• IFM: LEAST OPTIMISTIC - PENALIZES FAILURES & HINTS</li>
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
      {/* Technical corner brackets */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black"></div>
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-black"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-black"></div>
      
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 border border-black flex items-center justify-center bg-white">
          <Calculator className="w-4 h-4 text-black" />
        </div>
        <h4 className="font-bold text-black text-lg tracking-wider uppercase">PARAMETER VALUES</h4>
      </div>
      
      <div className="space-y-4">
        <div className="border-2 border-black p-4 bg-white">
          <h5 className="font-bold text-black mb-2 text-sm tracking-wider">AFM PARAMETERS (MOST OPTIMISTIC):</h5>
          <div className="text-sm text-black font-mono space-y-1">
            <div>θ (BASELINE) = 0.4</div>
            <div>β (DIFFICULTY) = -0.6</div>
            <div>γ (UNIFIED) = +0.18</div>
            <div className="text-black font-bold">ALL ATTEMPTS = PROGRESS</div>
          </div>
        </div>

        <div className="border-2 border-black p-4 bg-white">
          <h5 className="font-bold text-black mb-2 text-sm tracking-wider">PFM PARAMETERS (MODERATE):</h5>
          <div className="text-sm text-black font-mono space-y-1">
            <div>θ (BASELINE) = 0.4</div>
            <div>β (DIFFICULTY) = -0.6</div>
            <div>γ_s (SUCCESS) = +0.16</div>
            <div>γ_f (FAILURE) = -0.06</div>
            <div className="text-black font-bold">SUCCESS HELPS, FAILURE HURTS</div>
          </div>
        </div>
        
        <div className="border-2 border-black p-4 bg-white">
          <h5 className="font-bold text-black mb-2 text-sm tracking-wider">IFM PARAMETERS (LEAST OPTIMISTIC):</h5>
          <div className="text-sm text-black font-mono space-y-1">
            <div>θ (BASELINE) = 0.4</div>
            <div>β (DIFFICULTY) = -0.6</div>
            <div>μ (SUCCESS) = +0.12</div>
            <div>ρ (FAILURE) = -0.15</div>
            <div>ν (HINT) = -0.08</div>
            <div className="text-black font-bold">MOST CONSERVATIVE</div>
          </div>
        </div>
      </div>
    </div>
  );

  const getCurrentAnswer = () => {
    if (currentStep === 0 || currentStep > answerSequence.length) return null;
    return answerSequence[currentStep - 1];
  };

  const getDetailedStats = () => {
    let totalSuccesses = 0;
    let totalFailures = 0;
    let totalHints = 0;
    
    for (let i = 0; i < Math.min(currentStep, answerSequence.length); i++) {
      const answer = answerSequence[i];
      totalHints += answer.hints;
      if (answer.correct) {
        totalSuccesses++;
      } else {
        totalFailures++;
      }
    }
    return { totalSuccesses, totalFailures, totalHints };
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
      
      <div className="relative flex-1 px-8 py-6">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Header */}
          <div className="border-2 border-black p-4 bg-white relative">
            {/* Technical corner brackets */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-black"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-black"></div>
            
            <div className="text-center space-y-3">
              <div className="inline-block border border-black px-3 py-1 mb-2">
                <span className="text-xs tracking-wider font-mono">COMPARATIVE ANALYSIS</span>
              </div>
              <h1 className="text-3xl font-bold uppercase tracking-wider text-black">
                AFM vs PFM vs IFM: OPTIMISM COMPARISON
              </h1>
              <p className="text-sm font-mono leading-relaxed text-black">
                COMPARATIVE LEARNING MODEL ANALYSIS • PYTHON LOOP MASTERY TRACKING
              </p>
            </div>
          </div>

          {/* Introduction */}
          <div className="border-2 border-black p-6 bg-white relative">
            <div className="absolute top-2 right-2 w-2 h-2 border border-black bg-white" />
            <p className="text-lg text-black leading-relaxed text-center font-mono">
              COMPARE THREE CANONICAL LEARNING MODELS AS THEY TRACK STUDENT PROGRESS LEARNING{' '}
              <span 
                ref={simulationRef}
                className="relative cursor-help border-b-2 border-dotted border-black text-black font-bold"
                onMouseEnter={() => handleMouseEnter('simulation', simulationRef)}
                onMouseLeave={() => setHoveredTerm(null)}
              >
                PYTHON FOR/WHILE LOOPS
              </span>
            </p>
          </div>

          {/* Controls */}
          <div className="border-2 border-black p-6 bg-white relative">
            <div className="absolute top-2 right-2 w-2 h-2 border border-black bg-white" />
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
          <div className="border-2 border-black p-6 bg-white relative">
            <div className="absolute top-2 right-2 w-2 h-2 border border-black bg-white" />
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-black uppercase tracking-wider">
                STEP {currentStep} OF {answerSequence.length}
              </h3>
              <div className="flex items-center gap-4 text-lg font-bold font-mono">
                <div className="flex items-center gap-2 border border-black px-3 py-1">
                  <CheckCircle className="w-5 h-5 text-black" />
                  <span className="text-black">{getDetailedStats().totalSuccesses} SUCCESS</span>
                </div>
                <div className="flex items-center gap-2 border border-black px-3 py-1">
                  <XCircle className="w-5 h-5 text-black" />
                  <span className="text-black">{getDetailedStats().totalFailures} FAILURE</span>
                </div>
                <div className="flex items-center gap-2 border border-black px-3 py-1">
                  <Lightbulb className="w-5 h-5 text-black" />
                  <span className="text-black">{getDetailedStats().totalHints} HINT</span>
                </div>
              </div>
            </div>
            
            {getCurrentAnswer() && (
              <div className={`border-2 border-black p-6 bg-white`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 border border-black flex items-center justify-center bg-white">
                      {getCurrentAnswer().correct ? (
                        <CheckCircle size={16} className="text-black" />
                      ) : (
                        <XCircle size={16} className="text-black" />
                      )}
                    </div>
                    <span className="font-bold text-lg tracking-wider uppercase text-black">
                      {getCurrentAnswer().correct ? 'SUCCESS' : 'FAILURE'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-black border border-black px-3 py-1">
                    <Lightbulb size={16} />
                    <span className="font-bold font-mono">{getCurrentAnswer().hints} HINT{getCurrentAnswer().hints !== 1 ? 'S' : ''}</span>
                  </div>
                </div>
                <p className="text-black font-mono text-base">
                  {getCurrentAnswer().description}
                </p>
              </div>
            )}
          </div>

          {/* Model Predictions */}
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="border-2 border-black p-6 bg-white relative">
              <div className="absolute top-2 right-2 w-2 h-2 border border-black bg-white" />
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white border-2 border-black flex items-center justify-center text-black font-bold text-lg">
                  AFM
                </div>
                <div className="text-lg font-bold text-black uppercase tracking-wider">
                  MOST OPTIMISTIC
                </div>
              </div>
              
              <div className="text-3xl font-bold text-black mb-3 text-center font-mono">
                {(afmProbability * 100).toFixed(1)}%
              </div>
              
              <div className="w-full bg-gray-300 border-2 border-black h-4 mb-3">
                <div 
                  className="h-full bg-black transition-all duration-1000"
                  style={{ width: `${afmProbability * 100}%` }}
                ></div>
              </div>
              
              <div className="border-l-4 border-black bg-gray-100 p-3">
                <div className="text-xs text-black font-bold uppercase font-mono">
                  ALL ATTEMPTS = PROGRESS
                </div>
              </div>
            </div>
            
            <div className="border-2 border-black p-6 bg-white relative">
              <div className="absolute top-2 right-2 w-2 h-2 border border-black bg-white" />
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white border-2 border-black flex items-center justify-center text-black font-bold text-lg">
                  PFM
                </div>
                <div className="text-lg font-bold text-black uppercase tracking-wider">
                  MODERATE
                </div>
              </div>
              
              <div className="text-3xl font-bold text-black mb-3 text-center font-mono">
                {(pfmProbability * 100).toFixed(1)}%
              </div>
              
              <div className="w-full bg-gray-300 border-2 border-black h-4 mb-3">
                <div 
                  className="h-full bg-black transition-all duration-1000"
                  style={{ width: `${pfmProbability * 100}%` }}
                ></div>
              </div>
              
              <div className="border-l-4 border-black bg-gray-100 p-3">
                <div className="text-xs text-black font-bold uppercase font-mono">
                  SUCCESS HELPS, FAILURE HURTS
                </div>
              </div>
            </div>

            <div className="border-2 border-black p-6 bg-white relative">
              <div className="absolute top-2 right-2 w-2 h-2 border border-black bg-white" />
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white border-2 border-black flex items-center justify-center text-black font-bold text-lg">
                  IFM
                </div>
                <div className="text-lg font-bold text-black uppercase tracking-wider">
                  LEAST OPTIMISTIC
                </div>
              </div>
              
              <div className="text-3xl font-bold text-black mb-3 text-center font-mono">
                {(ifmProbability * 100).toFixed(1)}%
              </div>
              
              <div className="w-full bg-gray-300 border-2 border-black h-4 mb-3">
                <div 
                  className="h-full bg-black transition-all duration-1000"
                  style={{ width: `${ifmProbability * 100}%` }}
                ></div>
              </div>
              
              <div className="border-l-4 border-black bg-gray-100 p-3">
                <div className="text-xs text-black font-bold uppercase font-mono">
                  MOST CONSERVATIVE: HINTS & FAILURES PENALIZED
                </div>
              </div>
            </div>
          </div>

          {/* Model Comparison */}
          <div className="border-2 border-black p-6 bg-white relative">
            <div className="absolute top-2 right-2 w-2 h-2 border border-black bg-white" />
            <div className="flex items-center justify-between mb-6">
              <span className="font-bold text-black text-xl tracking-wider uppercase">OPTIMISM RANKING:</span>
              <div className="flex gap-4 text-lg font-bold font-mono">
                <span className="text-black">AFM: {(afmProbability * 100).toFixed(1)}%</span>
                <span className="text-black">PFM: {(pfmProbability * 100).toFixed(1)}%</span>
                <span className="text-black">IFM: {(ifmProbability * 100).toFixed(1)}%</span>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="border-2 border-black p-4 bg-white">
                <h4 className="font-bold text-black mb-2 text-sm tracking-wider">AFM - MOST OPTIMISTIC:</h4>
                <p className="text-black text-sm font-mono">
                  EVERY ATTEMPT IS PROGRESS - CAN OVERESTIMATE MASTERY WITH REPEATED ERRORS
                </p>
              </div>
              
              <div className="border-2 border-black p-4 bg-white">
                <h4 className="font-bold text-black mb-2 text-sm tracking-wider">PFM - MODERATE:</h4>
                <p className="text-black text-sm font-mono">
                  ONLY SUCCESSES HELP, FAILURES HURT - BALANCED PERSPECTIVE
                </p>
              </div>
              
              <div className="border-2 border-black p-4 bg-white">
                <h4 className="font-bold text-black mb-2 text-sm tracking-wider">IFM - LEAST OPTIMISTIC:</h4>
                <p className="text-black text-sm font-mono">
                  PENALIZES FAILURES AND HINTS - MOST CONSERVATIVE, LEAST LIKELY TO OVERESTIMATE
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Insight */}
          <div className="border-2 border-black p-6 bg-white relative">
            <div className="absolute top-2 right-2 w-2 h-2 border border-black bg-white" />
            <div className="flex items-center gap-3 mb-4 font-bold text-xl text-black uppercase tracking-wider">
              <div className="w-8 h-8 border border-black flex items-center justify-center bg-white">
                <Brain className="w-4 h-4 text-black" />
              </div>
              KEY INSIGHT: OPTIMISM VS REALISM IN LEARNING MODELS
            </div>
            <p className="text-black font-mono text-lg leading-relaxed">
              THE MODELS REPRESENT DIFFERENT PHILOSOPHIES ABOUT LEARNING PROGRESS:{' '}
              <span 
                ref={parameterRef}
                className="relative cursor-help border-b-2 border-dotted border-black text-black font-bold"
                onMouseEnter={() => handleMouseEnter('parameters', parameterRef)}
                onMouseLeave={() => setHoveredTerm(null)}
              >
                AFM IS MOST OPTIMISTIC (ALL PRACTICE HELPS)
              </span>
              , PFM IS MODERATE (SUCCESSES HELP, FAILURES HURT), AND IFM IS MOST CONSERVATIVE (PENALIZES FAILURES AND HINTS).
            </p>
          </div>
          
          {/* Navigation */}
          <div className="flex justify-center">
            <button
              onClick={console.log('Last Slide')}
              className="px-8 py-4 bg-black text-white border-2 border-black font-bold text-lg uppercase tracking-wider hover:bg-white hover:text-black transition-all transform hover:scale-105 flex items-center gap-3"
            >
              <span>CONTINUE</span>
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