import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, XCircle, Play, Pause, RotateCcw, TrendingUp, Calculator, ArrowRight, Brain, Zap, Target, HelpCircle, Lightbulb } from 'lucide-react';

export const ModelComparison = ({ navigate }) => {
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
                    This simulation shows a student learning Python loops (for/while). Each step represents a coding problem, tracking correctness and hints needed.
                </p>
            </div>

            <div className="border-l-8 border-purple-600 bg-purple-100 p-3 rounded-r-lg">
                <h5 className="font-bold text-purple-800 mb-2 text-sm tracking-wide">OPTIMISM RANKING:</h5>
                <ul className="text-sm text-black font-mono space-y-1">
                    <li>• AFM: Most optimistic - all attempts help</li>
                    <li>• PFM: Moderate - successes help, failures hurt</li>
                    <li>• IFM: Least optimistic - penalizes failures & hints</li>
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
                <div className="border-4 border-green-600 rounded-lg p-4 bg-green-50">
                    <h5 className="font-bold text-green-800 mb-2 text-sm tracking-wide">AFM PARAMETERS (MOST OPTIMISTIC):</h5>
                    <div className="text-sm text-black font-mono space-y-1">
                        <div>θ (baseline) = 0.4</div>
                        <div>β (difficulty) = -0.6</div>
                        <div>γ (unified) = +0.18</div>
                        <div className="text-green-700 font-bold">All attempts = progress!</div>
                    </div>
                </div>

                <div className="border-4 border-blue-600 rounded-lg p-4 bg-blue-50">
                    <h5 className="font-bold text-blue-800 mb-2 text-sm tracking-wide">PFM PARAMETERS (MODERATE):</h5>
                    <div className="text-sm text-black font-mono space-y-1">
                        <div>θ (baseline) = 0.4</div>
                        <div>β (difficulty) = -0.6</div>
                        <div>γ_s (success) = +0.16</div>
                        <div>γ_f (failure) = -0.06</div>
                        <div className="text-blue-700 font-bold">Success helps, failure hurts</div>
                    </div>
                </div>

                <div className="border-4 border-orange-600 rounded-lg p-4 bg-orange-50">
                    <h5 className="font-bold text-orange-800 mb-2 text-sm tracking-wide">IFM PARAMETERS (LEAST OPTIMISTIC):</h5>
                    <div className="text-sm text-black font-mono space-y-1">
                        <div>θ (baseline) = 0.4</div>
                        <div>β (difficulty) = -0.6</div>
                        <div>μ (success) = +0.12</div>
                        <div>ρ (failure) = -0.15</div>
                        <div>ν (hint) = -0.08</div>
                        <div className="text-orange-700 font-bold">Most conservative!</div>
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
        <div className="bg-white min-h-screen flex flex-col text-black font-['IBM_Plex_Mono',monospace]">
            {/* Header */}
            <div className="border-b-8 border-black bg-gradient-to-r from-orange-400 to-purple-400 px-8 py-6 shadow-lg">
                <div className="flex items-center justify-center">
                    <span className="text-black font-bold text-2xl uppercase tracking-wider">
                        AFM vs PFM vs IFM: Optimism Comparison
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 px-8 py-8">
                <div className="max-w-7xl mx-auto space-y-8">

                    {/* Introduction */}
                    <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg">
                        <p className="text-lg text-black leading-relaxed text-center">
                            Compare how three canonical learning models track student progress as they learn{' '}
                            <span
                                ref={simulationRef}
                                className="relative cursor-help border-b-4 border-dotted border-purple-600 text-purple-600 font-bold"
                                onMouseEnter={() => handleMouseEnter('simulation', simulationRef)}
                                onMouseLeave={() => setHoveredTerm(null)}
                            >
                                Python for/while loops
                            </span>
                        </p>
                    </div>

                    {/* Controls and Current Status */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Controls */}
                        <div className="border-4 border-black rounded-xl p-6 bg-gray-50 shadow-lg">
                            <h3 className="text-xl font-bold text-black uppercase tracking-wide mb-4 text-center">
                                Simulation Controls
                            </h3>
                            <div className="flex items-center justify-center space-x-4">
                                <button
                                    onClick={() => setIsPlaying(!isPlaying)}
                                    className={`flex items-center space-x-2 px-6 py-3 border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide transition-all transform hover:scale-105 ${isPlaying
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
                        <div className="border-4 border-black rounded-xl p-6 bg-white shadow-lg">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold text-black uppercase tracking-wide">
                                    STEP {currentStep} OF {answerSequence.length}
                                </h3>
                            </div>
                            <div className="flex items-center gap-4 text-sm font-bold mb-4">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                    <span className="text-green-600">{getDetailedStats().totalSuccesses} SUCCESS</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <XCircle className="w-4 h-4 text-red-600" />
                                    <span className="text-red-600">{getDetailedStats().totalFailures} FAILURE</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Lightbulb className="w-4 h-4 text-yellow-600" />
                                    <span className="text-yellow-600">{getDetailedStats().totalHints} HINT</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Current Answer Details */}
                    {getCurrentAnswer() && (
                        <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg">
                            <div className={`border-4 rounded-xl p-6 ${getCurrentAnswer().correct
                                ? 'bg-green-100 border-green-600'
                                : 'bg-red-100 border-red-600'
                                }`}>
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center space-x-3">
                                        {getCurrentAnswer().correct ? (
                                            <CheckCircle size={24} className="text-green-600" />
                                        ) : (
                                            <XCircle size={24} className="text-red-600" />
                                        )}
                                        <span className={`font-bold text-lg tracking-wide uppercase ${getCurrentAnswer().correct ? 'text-green-800' : 'text-red-800'
                                            }`}>
                                            {getCurrentAnswer().correct ? 'SUCCESS' : 'FAILURE'}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-yellow-600 border-4 border-yellow-600 bg-yellow-100 px-3 py-1 rounded-lg">
                                        <Lightbulb size={16} />
                                        <span className="font-bold">{getCurrentAnswer().hints} HINT{getCurrentAnswer().hints !== 1 ? 'S' : ''}</span>
                                    </div>
                                </div>
                                <p className="text-black font-bold text-base">
                                    {getCurrentAnswer().description}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Model Predictions */}
                    <div className="grid lg:grid-cols-3 gap-6">
                        <div className="border-4 border-black rounded-xl p-6 bg-white shadow-lg">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-green-100 border-4 border-green-600 rounded-xl flex items-center justify-center text-green-700 font-bold text-lg">
                                    AFM
                                </div>
                                <div className="text-lg font-bold text-black uppercase tracking-wide">
                                    MOST OPTIMISTIC
                                </div>
                            </div>

                            <div className="text-3xl font-bold text-green-600 mb-3 text-center">
                                {(afmProbability * 100).toFixed(1)}%
                            </div>

                            <div className="w-full bg-gray-300 border-4 border-black rounded-full h-4 mb-3">
                                <div
                                    className="h-full bg-green-600 rounded-full transition-all duration-1000"
                                    style={{ width: `${afmProbability * 100}%` }}
                                ></div>
                            </div>

                            <div className="border-l-4 border-green-600 bg-green-100 p-3 rounded-r-lg">
                                <div className="text-xs text-black font-bold uppercase">
                                    ALL ATTEMPTS = PROGRESS
                                </div>
                            </div>
                        </div>

                        <div className="border-4 border-black rounded-xl p-6 bg-white shadow-lg">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-blue-100 border-4 border-blue-600 rounded-xl flex items-center justify-center text-blue-700 font-bold text-lg">
                                    PFM
                                </div>
                                <div className="text-lg font-bold text-black uppercase tracking-wide">
                                    MODERATE
                                </div>
                            </div>

                            <div className="text-3xl font-bold text-blue-600 mb-3 text-center">
                                {(pfmProbability * 100).toFixed(1)}%
                            </div>

                            <div className="w-full bg-gray-300 border-4 border-black rounded-full h-4 mb-3">
                                <div
                                    className="h-full bg-blue-600 rounded-full transition-all duration-1000"
                                    style={{ width: `${pfmProbability * 100}%` }}
                                ></div>
                            </div>

                            <div className="border-l-4 border-blue-600 bg-blue-100 p-3 rounded-r-lg">
                                <div className="text-xs text-black font-bold uppercase">
                                    SUCCESS HELPS, FAILURE HURTS
                                </div>
                            </div>
                        </div>

                        <div className="border-4 border-black rounded-xl p-6 bg-white shadow-lg">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-orange-100 border-4 border-orange-600 rounded-xl flex items-center justify-center text-orange-700 font-bold text-lg">
                                    IFM
                                </div>
                                <div className="text-lg font-bold text-black uppercase tracking-wide">
                                    LEAST OPTIMISTIC
                                </div>
                            </div>

                            <div className="text-3xl font-bold text-orange-600 mb-3 text-center">
                                {(ifmProbability * 100).toFixed(1)}%
                            </div>

                            <div className="w-full bg-gray-300 border-4 border-black rounded-full h-4 mb-3">
                                <div
                                    className="h-full bg-orange-600 rounded-full transition-all duration-1000"
                                    style={{ width: `${ifmProbability * 100}%` }}
                                ></div>
                            </div>

                            <div className="border-l-4 border-orange-600 bg-orange-100 p-3 rounded-r-lg">
                                <div className="text-xs text-black font-bold uppercase">
                                    MOST CONSERVATIVE: HINTS & FAILURES PENALIZED
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Model Comparison */}
                    <div className="border-4 border-black rounded-xl p-8 bg-gradient-to-r from-yellow-100 to-orange-100 shadow-lg">
                        <div className="flex items-center justify-between mb-6">
                            <span className="font-bold text-black text-xl tracking-wide uppercase">OPTIMISM RANKING:</span>
                            <div className="flex gap-4 text-lg font-bold">
                                <span className="text-green-600">AFM: {(afmProbability * 100).toFixed(1)}%</span>
                                <span className="text-blue-600">PFM: {(pfmProbability * 100).toFixed(1)}%</span>
                                <span className="text-orange-600">IFM: {(ifmProbability * 100).toFixed(1)}%</span>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="border-4 border-green-600 rounded-lg p-4 bg-green-50">
                                <h4 className="font-bold text-green-800 mb-2 text-sm tracking-wide">AFM - MOST OPTIMISTIC:</h4>
                                <p className="text-black text-sm font-mono">
                                    Every attempt is progress - can overestimate mastery with repeated errors
                                </p>
                            </div>

                            <div className="border-4 border-blue-600 rounded-lg p-4 bg-blue-50">
                                <h4 className="font-bold text-blue-800 mb-2 text-sm tracking-wide">PFM - MODERATE:</h4>
                                <p className="text-black text-sm font-mono">
                                    Only successes help, failures hurt - balanced perspective
                                </p>
                            </div>

                            <div className="border-4 border-orange-600 rounded-lg p-4 bg-orange-50">
                                <h4 className="font-bold text-orange-800 mb-2 text-sm tracking-wide">IFM - LEAST OPTIMISTIC:</h4>
                                <p className="text-black text-sm font-mono">
                                    Penalizes failures and hints - most conservative, least likely to overestimate
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Design Decision Callout */}
                    <div className="border-4 border-black rounded-xl p-8 bg-gradient-to-r from-yellow-100 to-red-100 shadow-lg">
                        <div className="flex items-center gap-3 mb-6">
                            <HelpCircle className="w-6 h-6 text-red-700" />
                            <h3 className="text-xl font-bold text-black uppercase tracking-wide">
                                Critical Design Decision: Hint Interpretation
                            </h3>
                        </div>

                        <div className="border-4 border-red-600 rounded-xl p-6 bg-red-50 mb-6">
                            <div className="text-red-800 font-bold text-lg mb-4 text-center">
                                IMPORTANT: This comparison shows hints as PENALIZED (ν = -0.08)
                            </div>
                            <p className="text-red-700 font-bold text-center mb-4">
                                But in the IFM simulator, hints are BENEFICIAL (ν = +0.12)!
                            </p>
                            <div className="border-l-4 border-red-700 bg-white p-4 rounded-r-lg">
                                <p className="text-black font-bold text-sm">
                                    <strong>Why the difference?</strong> This demonstrates a crucial design choice in educational modeling:
                                    Are instructional supports (hints) a sign of learning difficulty (penalty) or effective scaffolding (benefit)?
                                </p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="border-4 border-orange-600 rounded-xl p-4 bg-orange-50">
                                <h4 className="font-bold text-orange-800 mb-3 text-center">HINTS AS PENALTY (This Demo)</h4>
                                <ul className="text-black text-sm font-bold space-y-2">
                                    <li>• ν = -0.08 (negative effect)</li>
                                    <li>• Theory: Hints indicate struggle</li>
                                    <li>• More hints = lower confidence</li>
                                    <li>• Conservative assessment approach</li>
                                </ul>
                            </div>

                            <div className="border-4 border-green-600 rounded-xl p-4 bg-green-50">
                                <h4 className="font-bold text-green-800 mb-3 text-center">HINTS AS BENEFIT (IFM Simulator)</h4>
                                <ul className="text-black text-sm font-bold space-y-2">
                                    <li>• ν = +0.12 (positive effect)</li>
                                    <li>• Theory: Hints provide learning</li>
                                    <li>• More scaffolding = better outcomes</li>
                                    <li>• Supportive instruction approach</li>
                                </ul>
                            </div>
                        </div>
                    </div>


                    {/* Questionnaire Request */}
                    <div className="border-4 border-black rounded-xl p-8 bg-gradient-to-r from-blue-100 to-green-100 shadow-lg">
                        <div className="text-center mb-6">
                            <div className="flex items-center justify-center gap-3 mb-4">
                                <h3 className="text-2xl font-bold text-black uppercase tracking-wide">
                                    Help Support This Research!
                                </h3>
                            </div>
                        </div>

                        <div className="border-4 border-blue-600 rounded-xl p-6 bg-blue-50 mb-6">
                            <p className="text-black font-bold text-lg text-center mb-4">
                                <strong>Your experience matters!</strong> This interactive app is part of a master thesis research project.
                            </p>
                            <p className="text-black font-bold text-center mb-4">
                                Please take a few minutes to share your insights about the learning experience you just completed.
                            </p>
                            <div className="text-center">
                                <span className="bg-green-300 px-4 py-2 border-2 border-black rounded font-bold">
                                    Only takes 5-10 minutes
                                </span>
                            </div>
                        </div>

                        <div className="flex justify-center mb-6">
                            <button
                                onClick={() => {
                                    // TODO: Replace with your actual questionnaire URL
                                    const questionnaireUrl = 'https://your-questionnaire-link.com';
                                    window.open(questionnaireUrl, '_blank');
                                }}
                                className="px-8 py-4 bg-blue-600 text-white border-4 border-black rounded-xl font-bold text-xl uppercase tracking-wide hover:bg-white hover:text-blue-600 transition-all transform hover:scale-105 flex items-center gap-3"
                            >
                                <span>Take Questionnaire</span>
                                <ArrowRight className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="border-l-8 border-green-600 bg-green-100 p-4 rounded-r-lg">
                            <div className="text-center">
                                <p className="text-green-800 font-bold text-sm">
                                    Your feedback helps improve educational technology and supports academic research.
                                    Thank you for contributing to the advancement of learning science!
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* End of App Navigation */}
                    <div className="border-4 border-black rounded-xl p-8 bg-gradient-to-r from-gray-100 to-purple-100 shadow-lg">
                        <div className="text-center mb-8">
                            <div className="flex items-center justify-center gap-3 mb-4">
                                <div className="w-4 h-4 bg-purple-600 rounded-full animate-pulse"></div>
                                <h3 className="text-2xl font-bold text-black uppercase tracking-wide">
                                    Congratulations! You've completed the learning journey!
                                </h3>
                                <div className="w-4 h-4 bg-purple-600 rounded-full animate-pulse"></div>
                            </div>
                            <p className="text-lg text-black font-bold">
                                You've explored AFM, PFM, and IFM models. Choose where to go next:
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* Back to Welcome */}
                            <button
                                onClick={() => navigate(0)}
                                className="px-6 py-4 bg-gray-600 text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-gray-600 transition-all transform hover:scale-105 flex flex-col items-center gap-2"
                            >
                                <span>Home</span>
                            </button>

                            {/* AFM Simulator */}
                            <button
                                onClick={() => navigate(15)}
                                className="px-6 py-4 bg-green-600 text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-green-600 transition-all transform hover:scale-105 flex flex-col items-center gap-2"
                            >
                                <span>AFM Simulator</span>
                            </button>

                            {/* PFM Simulator */}
                            <button
                                onClick={() => navigate(19)}
                                className="px-6 py-4 bg-blue-600 text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-blue-600 transition-all transform hover:scale-105 flex flex-col items-center gap-2"
                            >
                                <span>PFM Simulator</span>
                            </button>

                            {/* IFM Simulator */}
                            <button
                                onClick={() => navigate(22)}
                                className="px-6 py-4 bg-orange-600 text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-orange-600 transition-all transform hover:scale-105 flex flex-col items-center gap-2"
                            >
                                <span>IFM Simulator</span>
                            </button>
                        </div>
                    </div>

                    {hoveredTerm === 'simulation' && <SimulationTooltip />}
                    {hoveredTerm === 'parameters' && <ParameterTooltip />}
                </div>
            </div>
        </div>
    );
}; 