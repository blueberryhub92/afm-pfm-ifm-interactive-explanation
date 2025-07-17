import React, { useState, useEffect, useRef } from 'react';
import { Mountain, TrendingUp, Users, Target, Play, Pause, RotateCcw, Zap, AlertTriangle, HelpCircle, CheckCircle, XCircle } from 'lucide-react';
import { trackCustomEvent } from '../utils/analytics';

export const MetaphoricalLearningVisualization = ({ model = 'all', onClose }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [climberPositions, setClimberPositions] = useState({
        afm: { height: 20, confidence: 50 },
        pfm: { height: 20, confidence: 50 },
        ifm: { height: 20, confidence: 50 }
    });
    const [currentWeather, setCurrentWeather] = useState('clear');
    const intervalRef = useRef(null);

    // Learning journey: Climbing the "Python Skills" mountain
    const climbingJourney = [
        {
            outcome: 'success',
            hints: 0,
            description: "Perfect first step - climber confidently moves up the basic syntax trail",
            weather: 'sunny',
            difficulty: 'easy'
        },
        {
            outcome: 'failure',
            hints: 2,
            description: "Stumbled on a loop concept - needed guide help, weather getting cloudy",
            weather: 'cloudy',
            difficulty: 'medium'
        },
        {
            outcome: 'success',
            hints: 1,
            description: "Found footing with functions - one quick tip from guide helped",
            weather: 'partly_cloudy',
            difficulty: 'medium'
        },
        {
            outcome: 'failure',
            hints: 3,
            description: "Major slip on recursion cliff - heavy guide assistance needed, storm clouds",
            weather: 'stormy',
            difficulty: 'hard'
        },
        {
            outcome: 'success',
            hints: 0,
            description: "Amazing breakthrough - climbed the data structures ridge independently!",
            weather: 'sunny',
            difficulty: 'hard'
        },
        {
            outcome: 'success',
            hints: 1,
            description: "Steady progress on algorithms path - minimal guide support",
            weather: 'clear',
            difficulty: 'medium'
        },
        {
            outcome: 'failure',
            hints: 2,
            description: "Confused by object-oriented concepts - guides helped navigate",
            weather: 'foggy',
            difficulty: 'hard'
        },
        {
            outcome: 'success',
            hints: 0,
            description: "Reached advanced programming summit - completely independent!",
            weather: 'perfect',
            difficulty: 'expert'
        }
    ];

    const calculateClimberPositions = (step) => {
        if (step === 0) {
            return {
                afm: { height: 20, confidence: 50 },
                pfm: { height: 20, confidence: 50 },
                ifm: { height: 20, confidence: 50 }
            };
        }

        let successes = 0;
        let failures = 0;
        let totalHints = 0;

        for (let i = 0; i < Math.min(step, climbingJourney.length); i++) {
            const attempt = climbingJourney[i];
            totalHints += attempt.hints;
            if (attempt.outcome === 'success') successes++;
            else failures++;
        }

        // AFM: "Every step up counts" - always optimistic
        const afmHeight = 20 + (step * 8); // Steady progress up the mountain
        const afmConfidence = Math.min(95, 50 + (step * 5)); // Growing confidence

        // PFM: "Good steps help, slips hurt" - balanced
        const pfmHeight = 20 + (successes * 10) - (failures * 3);
        const pfmConfidence = Math.min(95, Math.max(10, 50 + (successes * 8) - (failures * 5)));

        // IFM: "Very cautious climbing" - conservative about progress
        const ifmHeight = 20 + (successes * 7) - (failures * 6) - (totalHints * 2);
        const ifmConfidence = Math.min(95, Math.max(5, 50 + (successes * 6) - (failures * 8) - (totalHints * 3)));

        return {
            afm: {
                height: Math.max(10, Math.min(90, afmHeight)),
                confidence: afmConfidence
            },
            pfm: {
                height: Math.max(10, Math.min(90, pfmHeight)),
                confidence: pfmConfidence
            },
            ifm: {
                height: Math.max(10, Math.min(90, ifmHeight)),
                confidence: ifmConfidence
            }
        };
    };

    useEffect(() => {
        if (isPlaying) {
            intervalRef.current = setInterval(() => {
                setCurrentStep(prev => {
                    const nextStep = prev + 1;
                    if (nextStep > climbingJourney.length) {
                        setIsPlaying(false);
                        return 0;
                    }

                    const newPositions = calculateClimberPositions(nextStep);
                    setClimberPositions(newPositions);

                    if (nextStep <= climbingJourney.length) {
                        setCurrentWeather(climbingJourney[nextStep - 1]?.weather || 'clear');
                    }

                    return nextStep;
                });
            }, 2500);
        } else {
            clearInterval(intervalRef.current);
        }

        return () => clearInterval(intervalRef.current);
    }, [isPlaying]);

    const resetSimulation = () => {
        setCurrentStep(0);
        setClimberPositions({
            afm: { height: 20, confidence: 50 },
            pfm: { height: 20, confidence: 50 },
            ifm: { height: 20, confidence: 50 }
        });
        setCurrentWeather('clear');
        setIsPlaying(false);
    };

    const getCurrentAttempt = () => {
        if (currentStep === 0 || currentStep > climbingJourney.length) return null;
        return climbingJourney[currentStep - 1];
    };

    const getWeatherIcon = (weather) => {
        switch (weather) {
            case 'sunny': case 'perfect': return '☀️';
            case 'clear': return '🌤️';
            case 'partly_cloudy': return '⛅';
            case 'cloudy': return '☁️';
            case 'foggy': return '🌫️';
            case 'stormy': return '⛈️';
            default: return '🌤️';
        }
    };

    const ClimberIcon = ({ model, position }) => {
        const colors = {
            afm: 'text-green-600',
            pfm: 'text-blue-600',
            ifm: 'text-orange-600'
        };

        const icons = {
            afm: '🧗‍♂️', // Confident climber
            pfm: '🧗‍♀️', // Balanced climber
            ifm: '🧗‍♂️' // Cautious climber
        };

        return (
            <div
                className={`absolute transition-all duration-1000 ${colors[model]}`}
                style={{
                    bottom: `${position.height}%`,
                    left: model === 'afm' ? '20%' : model === 'pfm' ? '50%' : '80%',
                    transform: 'translateX(-50%)'
                }}
            >
                <div className="text-2xl">{icons[model]}</div>
                <div className="text-xs font-bold text-center mt-1 bg-white rounded px-1 border border-black">
                    {position.confidence.toFixed(0)}%
                </div>
            </div>
        );
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 font-['IBM_Plex_Mono',monospace]">
            <div className="bg-white border-8 border-black rounded-xl shadow-2xl max-w-6xl max-h-[90vh] overflow-y-auto m-4">

                {/* Header */}
                <div className="border-b-8 border-black bg-gradient-to-r from-blue-400 to-purple-400 p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Mountain className="w-8 h-8 text-black" />
                            <h2 className="text-2xl font-bold text-black uppercase tracking-wider">
                                The Learning Mountain: A Metaphorical Journey
                            </h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-black hover:bg-white hover:text-black px-4 py-2 rounded-lg border-4 border-black font-bold transition-all"
                        >
                            ✕ CLOSE
                        </button>
                    </div>
                </div>

                <div className="p-8 space-y-8">

                    {/* Metaphor Explanation */}
                    <div className="border-4 border-black rounded-xl p-6 bg-gradient-to-r from-indigo-100 to-blue-100">
                        <h3 className="text-xl font-bold text-black mb-4 uppercase tracking-wide">🏔️ The Mountain Metaphor:</h3>
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                            <div className="bg-green-100 border-l-4 border-green-600 p-3">
                                <strong className="text-green-800">🟢 AFM Climber (Optimistic Guide):</strong>
                                <p className="mt-2">"Every step up the mountain counts! No matter if you stumble, you're still making progress toward the summit."</p>
                            </div>
                            <div className="bg-blue-100 border-l-4 border-blue-600 p-3">
                                <strong className="text-blue-800">🔵 PFM Climber (Balanced Guide):</strong>
                                <p className="mt-2">"Good steps help you climb higher, but slips make you slide back. Progress depends on your success rate."</p>
                            </div>
                            <div className="bg-orange-100 border-l-4 border-orange-600 p-3">
                                <strong className="text-orange-800">🟠 IFM Climber (Cautious Guide):</strong>
                                <p className="mt-2">"I'm very careful about judging progress. Slips are serious, and needing help from guides shows you're not ready."</p>
                            </div>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="border-4 border-black rounded-xl p-6 bg-gray-50">
                        <div className="flex items-center justify-center space-x-4">
                            <button
                                onClick={() => {
                                    setIsPlaying(!isPlaying);
                                    trackCustomEvent('metaphor_simulation_control', {
                                        action: !isPlaying ? 'play' : 'pause',
                                        currentStep: currentStep,
                                        component: 'mountain_metaphor'
                                    });
                                }}
                                className={`flex items-center space-x-2 px-6 py-3 border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide transition-all transform hover:scale-105 ${isPlaying
                                    ? 'bg-red-600 text-white hover:bg-white hover:text-red-600'
                                    : 'bg-green-600 text-white hover:bg-white hover:text-green-600'
                                    }`}
                            >
                                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                                <span>{isPlaying ? 'PAUSE CLIMB' : 'START CLIMB'}</span>
                            </button>

                            <button
                                onClick={() => {
                                    resetSimulation();
                                    trackCustomEvent('metaphor_simulation_reset', {
                                        previousStep: currentStep,
                                        component: 'mountain_metaphor'
                                    });
                                }}
                                className="flex items-center space-x-2 px-6 py-3 bg-gray-600 text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-gray-600 transition-all transform hover:scale-105"
                            >
                                <RotateCcw size={20} />
                                <span>RESET CLIMB</span>
                            </button>
                        </div>
                    </div>

                    {/* Mountain Visualization */}
                    <div className="border-4 border-black rounded-xl p-8 bg-gradient-to-t from-green-200 via-yellow-100 to-blue-200">
                        <div className="relative">

                            {/* Mountain Background */}
                            <div className="relative h-96 bg-gradient-to-t from-green-400 via-yellow-300 to-blue-200 rounded-xl border-4 border-gray-600 overflow-hidden">

                                {/* Weather Effects */}
                                <div className="absolute top-0 left-0 right-0 h-20 flex items-center justify-center text-4xl">
                                    {getWeatherIcon(currentWeather)}
                                </div>

                                {/* Summit */}
                                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-white font-bold text-sm bg-black px-2 py-1 rounded">
                                    🏔️ PYTHON MASTERY SUMMIT
                                </div>

                                {/* Confidence Levels (Base Camps) */}
                                <div className="absolute bottom-20 left-2 text-xs font-bold bg-white px-2 py-1 rounded border border-black">
                                    📍 Base Camp (50%)
                                </div>
                                <div className="absolute bottom-40 left-2 text-xs font-bold bg-white px-2 py-1 rounded border border-black">
                                    🏕️ Camp 1 (70%)
                                </div>
                                <div className="absolute bottom-60 left-2 text-xs font-bold bg-white px-2 py-1 rounded border border-black">
                                    ⛺ Camp 2 (85%)
                                </div>
                                <div className="absolute top-16 left-2 text-xs font-bold bg-white px-2 py-1 rounded border border-black">
                                    🎯 Summit (95%)
                                </div>

                                {/* Climbers */}
                                <ClimberIcon model="afm" position={climberPositions.afm} />
                                <ClimberIcon model="pfm" position={climberPositions.pfm} />
                                <ClimberIcon model="ifm" position={climberPositions.ifm} />

                                {/* Trail markers */}
                                <div className="absolute bottom-0 left-0 right-0 h-4 bg-yellow-800 rounded-b-xl"></div>
                            </div>

                            {/* Legend */}
                            <div className="mt-4 grid md:grid-cols-3 gap-4">
                                <div className="flex items-center gap-2 text-green-600 font-bold">
                                    <span className="text-xl">🧗‍♂️</span>
                                    <span>AFM: {climberPositions.afm.height.toFixed(0)}% up • {climberPositions.afm.confidence.toFixed(0)}% confident</span>
                                </div>
                                <div className="flex items-center gap-2 text-blue-600 font-bold">
                                    <span className="text-xl">🧗‍♀️</span>
                                    <span>PFM: {climberPositions.pfm.height.toFixed(0)}% up • {climberPositions.pfm.confidence.toFixed(0)}% confident</span>
                                </div>
                                <div className="flex items-center gap-2 text-orange-600 font-bold">
                                    <span className="text-xl">🧗‍♂️</span>
                                    <span>IFM: {climberPositions.ifm.height.toFixed(0)}% up • {climberPositions.ifm.confidence.toFixed(0)}% confident</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Current Attempt Status */}
                    {getCurrentAttempt() && (
                        <div className="border-4 border-black rounded-xl p-6 bg-white">
                            <h3 className="text-xl font-bold text-black mb-4 uppercase tracking-wide">
                                Step {currentStep}: Current Climbing Challenge
                            </h3>

                            <div className={`border-4 rounded-xl p-4 ${getCurrentAttempt().outcome === 'success'
                                ? 'bg-green-100 border-green-600'
                                : 'bg-red-100 border-red-600'
                                }`}>
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        {getCurrentAttempt().outcome === 'success' ? (
                                            <CheckCircle className="w-6 h-6 text-green-600" />
                                        ) : (
                                            <XCircle className="w-6 h-6 text-red-600" />
                                        )}
                                        <span className={`font-bold text-lg uppercase ${getCurrentAttempt().outcome === 'success' ? 'text-green-800' : 'text-red-800'
                                            }`}>
                                            {getCurrentAttempt().outcome === 'success' ? 'SUCCESSFUL CLIMB' : 'STUMBLED/SLIPPED'}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl">{getWeatherIcon(getCurrentAttempt().weather)}</span>
                                            <span className="font-bold text-sm uppercase">{getCurrentAttempt().weather.replace('_', ' ')}</span>
                                        </div>
                                        {getCurrentAttempt().hints > 0 && (
                                            <div className="bg-yellow-100 border-2 border-yellow-600 px-3 py-1 rounded-lg flex items-center gap-2">
                                                <HelpCircle className="w-4 h-4 text-yellow-600" />
                                                <span className="font-bold text-yellow-800">{getCurrentAttempt().hints} Guide Help</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <p className="text-black font-bold">
                                    {getCurrentAttempt().description}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Guide Philosophy Differences */}
                    <div className="border-4 border-black rounded-xl p-6 bg-gradient-to-r from-purple-100 to-pink-100">
                        <h3 className="text-xl font-bold text-black mb-4 uppercase tracking-wide">
                            🧭 How Each Guide Judges Progress:
                        </h3>

                        <div className="space-y-4">
                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="bg-green-100 border-4 border-green-600 rounded-lg p-4">
                                    <h4 className="font-bold text-green-800 mb-2">🟢 AFM Guide Philosophy:</h4>
                                    <ul className="text-sm space-y-1">
                                        <li>✅ "Every attempt teaches you something"</li>
                                        <li>📈 "Keep climbing, you're always improving"</li>
                                        <li>🌟 "I believe in your potential"</li>
                                        <li>⬆️ Always estimates higher progress</li>
                                    </ul>
                                </div>

                                <div className="bg-blue-100 border-4 border-blue-600 rounded-lg p-4">
                                    <h4 className="font-bold text-blue-800 mb-2">🔵 PFM Guide Philosophy:</h4>
                                    <ul className="text-sm space-y-1">
                                        <li>✅ "Good climbs help you advance"</li>
                                        <li>⚠️ "But slips set you back"</li>
                                        <li>⚖️ "I judge based on your track record"</li>
                                        <li>📊 Balances successes vs failures</li>
                                    </ul>
                                </div>

                                <div className="bg-orange-100 border-4 border-orange-600 rounded-lg p-4">
                                    <h4 className="font-bold text-orange-800 mb-2">🟠 IFM Guide Philosophy:</h4>
                                    <ul className="text-sm space-y-1">
                                        <li>⚠️ "Slips are serious setbacks"</li>
                                        <li>🆘 "Needing help shows you're struggling"</li>
                                        <li>🔍 "I'm very cautious about overestimating"</li>
                                        <li>⬇️ Most conservative progress estimates</li>
                                    </ul>
                                </div>
                            </div>

                            {currentStep > 0 && (
                                <div className="bg-white border-4 border-purple-600 rounded-lg p-4">
                                    <h4 className="font-bold text-purple-800 mb-2">📊 Current Guide Assessments:</h4>
                                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                                        <div>
                                            <strong className="text-green-600">AFM Guide says:</strong>
                                            <br />"You've made {currentStep} attempts - you're {climberPositions.afm.confidence.toFixed(0)}% ready for the summit!"
                                        </div>
                                        <div>
                                            <strong className="text-blue-600">PFM Guide says:</strong>
                                            <br />"Considering your successes and setbacks, you're {climberPositions.pfm.confidence.toFixed(0)}% ready."
                                        </div>
                                        <div>
                                            <strong className="text-orange-600">IFM Guide says:</strong>
                                            <br />"Being cautious about failures and help needed, you're {climberPositions.ifm.confidence.toFixed(0)}% ready."
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}; 