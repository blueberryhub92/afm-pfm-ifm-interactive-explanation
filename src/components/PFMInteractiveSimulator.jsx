import React, { useState, useRef, useEffect } from "react";
import {
    Calculator,
    Brain,
    Target,
    TrendingUp,
    Play,
    RotateCcw,
    Database,
    RefreshCw,
    LineChart,
    Lightbulb,
    ArrowRight,
    CheckCircle,
    XCircle,
    Clock,
} from "lucide-react";
import Chart from "chart.js/auto";
import { trackButtonClick, trackSliderInteraction, trackCustomEvent } from "../utils/analytics";

const paramDefaults = {
    theta: 0.0,
    beta: 0.0,
    gammaSuccess: 0.16,
    gammaFailure: -0.06,
};

function calcProb(theta, beta, gammaSuccess, gammaFailure, successes, failures) {
    const logit = theta - beta + gammaSuccess * successes + gammaFailure * failures;
    return 1 / (1 + Math.exp(-logit));
}

const paramMeta = {
    theta: {
        label: "θ: Student Ability",
        min: -3,
        max: 3,
        step: 0.1,
        color: "blue",
        icon: <Brain className="w-5 h-5" />,
        tooltip: {
            color: "blue",
            title: "Student Ability (θ)",
            desc: "Range: -3 (low) to +3 (high). Higher θ = higher skill. 0 = average.",
        },
    },
    beta: {
        label: "β: Skill Difficulty",
        min: -2,
        max: 2,
        step: 0.1,
        color: "purple",
        icon: <Target className="w-5 h-5" />,
        tooltip: {
            color: "purple",
            title: "Skill Difficulty (β)",
            desc: "Range: -2 (hard) to +2 (easy). Higher β = easier tasks. 0 = average.",
        },
    },
    gammaSuccess: {
        label: "γs: Success Learning Rate",
        min: 0,
        max: 0.3,
        step: 0.01,
        color: "green",
        icon: <CheckCircle className="w-5 h-5" />,
        tooltip: {
            color: "green",
            title: "Success Learning Rate (γs)",
            desc: "Range: 0 (slow) to 0.3 (fast). How much successes boost learning in PFM.",
        },
    },
    gammaFailure: {
        label: "γf: Failure Learning Rate",
        min: -0.2,
        max: 0,
        step: 0.01,
        color: "red",
        icon: <XCircle className="w-5 h-5" />,
        tooltip: {
            color: "red",
            title: "Failure Learning Rate (γf)",
            desc: "Range: -0.2 to 0. How much failures hurt learning in PFM. Negative values mean failures hurt.",
        },
    },
};

export const PFMInteractiveSimulator = ({ navigate }) => {
    // State
    const [params, setParams] = useState(paramDefaults);
    const [sessionActive, setSessionActive] = useState(true);
    const [responseLog, setResponseLog] = useState([]);
    const [retrainingData, setRetrainingData] = useState([]);
    const [showTooltip, setShowTooltip] = useState(null);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const [lastChangedParam, setLastChangedParam] = useState(null);

    // Chart.js
    const chartRef = useRef();
    const chartInstance = useRef();

    // Update Chart - only shows actual path taken
    useEffect(() => {
        // Build the actual path based on response history
        const pathData = [];
        const pathLabels = [];
        let currentSuccesses = 0;
        let currentFailures = 0;

        // Starting point
        pathData.push(calcProb(params.theta, params.beta, params.gammaSuccess, params.gammaFailure, 0, 0) * 100);
        pathLabels.push("Start");

        // Add each response opportunity
        responseLog.forEach((response, index) => {
            if (response.correct) currentSuccesses++;
            else currentFailures++;

            const prob = calcProb(params.theta, params.beta, params.gammaSuccess, params.gammaFailure, currentSuccesses, currentFailures) * 100;
            pathData.push(prob);
            pathLabels.push(`Opportunity ${index + 1}`);
        });

        if (chartInstance.current) {
            chartInstance.current.data.labels = pathLabels;
            chartInstance.current.data.datasets[0].data = pathData;

            // Highlight the current position (last point)
            chartInstance.current.data.datasets[0].pointRadius = pathData.map((_, i) =>
                i === pathData.length - 1 ? 12 : 6
            );
            chartInstance.current.data.datasets[0].pointBackgroundColor = pathData.map((_, i) => {
                if (i === 0) return "#6b7280"; // Start point - gray
                if (i === pathData.length - 1) return "#ef4444"; // Current position - red
                return responseLog[i - 1]?.correct ? "#16a34a" : "#dc2626"; // Green for success, red for failure
            });

            chartInstance.current.update();
        } else if (chartRef.current) {
            chartInstance.current = new Chart(chartRef.current, {
                type: "line",
                data: {
                    labels: pathLabels,
                    datasets: [
                        {
                            label: "Your Actual Learning Path",
                            data: pathData,
                            borderColor: "#3b82f6",
                            backgroundColor: "rgba(59, 130, 246, 0.1)",
                            borderWidth: 4,
                            fill: false,
                            tension: 0.3,
                            pointRadius: pathData.map((_, i) => i === pathData.length - 1 ? 12 : 6),
                            pointBackgroundColor: pathData.map((_, i) => {
                                if (i === 0) return "#6b7280"; // Start point
                                if (i === pathData.length - 1) return "#ef4444"; // Current position
                                return responseLog[i - 1]?.correct ? "#16a34a" : "#dc2626";
                            }),
                            pointBorderColor: "#1e40af",
                            pointBorderWidth: 2,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    interaction: {
                        intersect: false,
                        mode: 'index',
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: "Learning Opportunities",
                                color: "#111",
                                font: { weight: 600, size: 14 },
                            },
                        },
                        y: {
                            title: {
                                display: true,
                                text: "Success Probability (%)",
                                color: "#111",
                                font: { weight: 600, size: 14 },
                            },
                            min: 0,
                            max: 100,
                            ticks: { stepSize: 20 },
                        },
                    },
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top',
                            labels: {
                                font: { weight: 'bold', size: 12 },
                                color: "#111",
                            },
                        },
                        tooltip: {
                            backgroundColor: 'white',
                            titleColor: '#111',
                            bodyColor: '#111',
                            borderColor: '#000',
                            borderWidth: 2,
                            cornerRadius: 8,
                            displayColors: true,
                            callbacks: {
                                title: (context) => context[0].label,
                                label: (context) => `Probability: ${context.parsed.y.toFixed(1)}%`,
                                afterLabel: (context) => {
                                    if (context.dataIndex === 0) return "Starting point";
                                    const response = responseLog[context.dataIndex - 1];
                                    return response ? `Response: ${response.correct ? "Correct ✓" : "Incorrect ✗"}` : "";
                                }
                            },
                        },
                    },
                },
            });
        }
        // eslint-disable-next-line
    }, [responseLog, params.theta, params.beta, params.gammaSuccess, params.gammaFailure]);

    // Clear highlight after 3 seconds
    useEffect(() => {
        if (lastChangedParam) {
            const timer = setTimeout(() => {
                setLastChangedParam(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [lastChangedParam]);

    // Track slide entry
    useEffect(() => {
        trackCustomEvent('pfm_dynamic_simulator_entered', {
            initialParams: params,
            slideContext: 'PFM Dynamic Simulator'
        });
    }, []);

    // Keyboard: Escape closes tooltip
    useEffect(() => {
        const handler = (e) => {
            if (e.key === "Escape" && showTooltip) {
                setShowTooltip(null);
            }
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [showTooltip]);

    // Derived
    const currentSuccesses = responseLog.filter(r => r.correct).length;
    const currentFailures = responseLog.filter(r => !r.correct).length;
    const currentProb = calcProb(params.theta, params.beta, params.gammaSuccess, params.gammaFailure, currentSuccesses, currentFailures);

    // Handlers
    function setParam(p, v) {
        if (!sessionActive) return;
        const oldValue = params[p];
        const newValue = parseFloat(v);

        setParams((prev) => ({
            ...prev,
            [p]: newValue,
        }));
        setLastChangedParam(p);

        trackSliderInteraction(`pfm_dynamic_param_${p}`, newValue, {
            oldValue,
            newValue,
            parameterName: p,
            slideContext: 'PFM Dynamic Simulator'
        });
    }

    function simulateResponse(isCorrect) {
        if (!sessionActive) return;

        const newSuccesses = isCorrect ? currentSuccesses + 1 : currentSuccesses;
        const newFailures = isCorrect ? currentFailures : currentFailures + 1;
        const newProb = calcProb(params.theta, params.beta, params.gammaSuccess, params.gammaFailure, newSuccesses, newFailures);

        const entry = {
            opportunity: responseLog.length + 1,
            correct: isCorrect,
            probability: newProb,
            successes: newSuccesses,
            failures: newFailures,
            timestamp: Date.now(),
        };

        setResponseLog((prev) => [...prev, entry]);
        setRetrainingData((prev) => [...prev, entry]);

        trackButtonClick('pfm_dynamic_simulate_response', {
            isCorrect,
            opportunityNumber: entry.opportunity,
            newProbability: newProb,
            slideContext: 'PFM Dynamic Simulator'
        });
    }

    function endSession() {
        const sessionStats = {
            finalParams: { ...params },
            totalResponses: responseLog.length,
            correctResponses: responseLog.filter(r => r.correct).length,
            finalProbability: currentProb,
            sessionDuration: responseLog.length ? responseLog[responseLog.length - 1].timestamp - responseLog[0].timestamp : 0
        };

        setSessionActive(false);

        trackButtonClick('pfm_dynamic_end_session', {
            sessionStats,
            slideContext: 'PFM Dynamic Simulator'
        });
    }

    function retrainModel() {
        if (!retrainingData.length) return;

        const preRetrainParams = { ...params };
        const retrainDataSnapshot = [...retrainingData];
        let recent = retrainingData.slice(-10);
        let correct = recent.filter((r) => r.correct).length;
        let total = recent.length;
        let acc = correct / total;
        let avgErr = recent.reduce(
            (sum, r) => sum + Math.abs((r.correct ? 1 : 0) - r.probability),
            0
        ) / total;

        let { theta, beta, gammaSuccess, gammaFailure } = params;

        // Ability adjustment based on overall performance
        if (acc >= 0.7) theta = Math.min(3, theta + 0.3);
        else if (acc >= 0.5) theta = Math.min(3, theta + 0.1);
        else if (acc < 0.3) theta = Math.max(-3, theta - 0.2);
        else if (acc < 0.5) theta = Math.max(-3, theta - 0.1);

        // Difficulty adjustment based on prediction accuracy
        if (acc > 0.8) {
            beta = Math.max(-2, beta - 0.4); // Make harder
        } else if (acc > 0.6) {
            beta = Math.max(-2, beta - 0.2);
        } else if (acc < 0.3) {
            beta = Math.min(2, beta + 0.4); // Make easier
        } else if (acc < 0.5) {
            beta = Math.min(2, beta + 0.2);
        }

        // Additional β adjustment based on prediction error
        if (avgErr > 0.3) {
            if (acc < 0.5) {
                beta = Math.min(2, beta + 0.3);
            } else {
                beta = Math.max(-2, beta - 0.2);
            }
        }

        // PFM-specific: Adjust success/failure learning rates based on performance patterns
        let early = recent.slice(0, Math.floor(total / 2));
        let late = recent.slice(Math.floor(total / 2));

        if (early.length && late.length) {
            let eAcc = early.filter((r) => r.correct).length / early.length;
            let lAcc = late.filter((r) => r.correct).length / late.length;
            let improvement = lAcc - eAcc;

            // If performance improved, increase success learning rate
            if (improvement >= 0.2) {
                gammaSuccess = Math.min(0.3, gammaSuccess + 0.03);
                gammaFailure = Math.max(-0.2, gammaFailure - 0.02);
            } else if (improvement < -0.2) {
                // If performance declined, failures might be hurting more
                gammaSuccess = Math.max(0, gammaSuccess - 0.02);
                gammaFailure = Math.min(0, gammaFailure + 0.02);
            }
        }

        // Analyze success vs failure impact
        let successEntries = recent.filter(r => r.correct);
        let failureEntries = recent.filter(r => !r.correct);

        if (successEntries.length >= 3 && failureEntries.length >= 3) {
            // Check if successes are having expected impact
            let successImpact = successEntries.reduce((sum, entry, idx) => {
                if (idx > 0) {
                    let prevEntry = successEntries[idx - 1];
                    return sum + (entry.probability - prevEntry.probability);
                }
                return sum;
            }, 0) / Math.max(1, successEntries.length - 1);

            // Check if failures are having expected impact  
            let failureImpact = failureEntries.reduce((sum, entry, idx) => {
                if (idx > 0) {
                    let prevEntry = failureEntries[idx - 1];
                    return sum + (entry.probability - prevEntry.probability);
                }
                return sum;
            }, 0) / Math.max(1, failureEntries.length - 1);

            // Adjust learning rates based on observed impact
            if (successImpact < 0.05) { // Successes not helping enough
                gammaSuccess = Math.min(0.3, gammaSuccess + 0.02);
            }
            if (failureImpact > -0.05) { // Failures not hurting enough
                gammaFailure = Math.max(-0.2, gammaFailure - 0.02);
            }
        }

        const newParams = {
            theta: parseFloat(theta.toFixed(1)),
            beta: parseFloat(beta.toFixed(1)),
            gammaSuccess: parseFloat(gammaSuccess.toFixed(2)),
            gammaFailure: parseFloat(gammaFailure.toFixed(2)),
        };

        setParams(newParams);
        setRetrainingData([]);
        setSessionActive(true);
        setResponseLog([]);
        setLastChangedParam(null);

        trackButtonClick('pfm_dynamic_retrain_model', {
            preRetrainParams,
            postRetrainParams: newParams,
            trainingDataCount: retrainDataSnapshot.length,
            recentAccuracy: acc,
            slideContext: 'PFM Dynamic Simulator'
        });
    }

    function resetAll() {
        setParams(paramDefaults);
        setSessionActive(true);
        setResponseLog([]);
        setRetrainingData([]);
        setLastChangedParam(null);

        trackButtonClick('pfm_dynamic_reset_all', {
            slideContext: 'PFM Dynamic Simulator'
        });
    }

    const calculateTooltipPosition = () => {
        const margin = 16;
        return { x: margin, y: margin };
    };

    const handleTooltipShow = (param) => {
        setShowTooltip(param);
        const position = calculateTooltipPosition();
        setTooltipPosition(position);
    };

    const ParameterTooltip = () => {
        if (!showTooltip) return null;
        const meta = paramMeta[showTooltip];

        return (
            <div
                className="fixed z-50 bg-white border-4 border-black rounded-xl shadow-lg p-6 w-96 font-['IBM_Plex_Mono',monospace]"
                style={{
                    left: `${tooltipPosition.x}px`,
                    top: `${tooltipPosition.y}px`,
                    maxWidth: "384px",
                }}
            >
                <div className="flex items-center gap-2 mb-4">
                    {meta.icon}
                    <h4 className="font-bold text-black text-lg tracking-wide">
                        {meta.tooltip.title}
                    </h4>
                </div>

                <div className="border-4 border-black rounded-lg p-4 bg-gray-50 mb-4">
                    <p className="text-black font-mono text-sm leading-relaxed">
                        {meta.tooltip.desc}
                    </p>
                </div>

                <div className="border-l-8 border-blue-600 bg-blue-100 p-3 rounded-r-lg">
                    <div className="text-blue-800 font-bold text-sm tracking-wide">
                        CURRENT VALUE:{" "}
                        {['gammaSuccess', 'gammaFailure'].includes(showTooltip)
                            ? params[showTooltip].toFixed(2)
                            : params[showTooltip]}
                    </div>
                </div>

                <button
                    onClick={() => setShowTooltip(null)}
                    className="absolute top-2 right-2 px-2 py-1 rounded border-2 border-black bg-red-600 text-white font-bold hover:bg-white hover:text-red-600 transition-all"
                >
                    ×
                </button>
            </div>
        );
    };

    // Helper function to get parameter color based on highlight state
    const getParamColor = (param) => {
        if (lastChangedParam === param) {
            return "bg-yellow-300 text-yellow-900 border-yellow-500";
        }
        const colors = {
            theta: "text-blue-700",
            beta: "text-purple-700",
            gammaSuccess: "text-green-700",
            gammaFailure: "text-red-700",
        };
        return colors[param] || "text-black";
    };

    return (
        <div className="bg-white min-h-screen flex flex-col text-black font-['IBM_Plex_Mono',monospace]">
            {/* Header */}
            <div className="border-b-8 border-black bg-gradient-to-r from-blue-400 to-purple-400 px-8 py-6 shadow-lg">
                <div className="flex items-center justify-center">
                    <span className="text-black font-bold text-2xl uppercase tracking-wider">
                        PFM: Real-Time Learning Path
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 px-8 py-8">
                <div className="max-w-6xl mx-auto space-y-8">
                    {/* Introduction */}
                    <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg">
                        <p className="text-lg text-black leading-relaxed text-center">
                            Watch your <strong>actual PFM learning path</strong> unfold in real-time! No predictions, no assumptions -
                            just your genuine learning journey based on your responses.
                            <br />
                            <strong>Real-Time Insight:</strong> See how each success or failure immediately affects your probability trajectory.
                        </p>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left Column - Parameters */}
                        <div className="space-y-8">
                            {/* Formula */}
                            <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg">
                                <div className="flex items-center gap-3 mb-6">
                                    <Calculator className="w-6 h-6 text-blue-700" />
                                    <h3 className="text-xl font-bold text-black uppercase tracking-wide">
                                        PFM Formula
                                    </h3>
                                </div>

                                {/* Live Formula Display */}
                                <div className="text-center mb-6 p-6 bg-gray-50 border-4 border-black rounded-lg space-y-4">
                                    <div className="text-2xl font-bold text-black mb-4">
                                        P(success) = {(currentProb * 100).toFixed(1)}%
                                    </div>

                                    <div className="border-t-2 border-gray-300 pt-4">
                                        <div className="text-lg font-bold mb-2">Step-by-step:</div>

                                        {/* Step 1: Formula */}
                                        <div className="text-base font-mono mb-2">
                                            <strong>1.</strong> P(success) = 1 / (1 + e<sup>-logit</sup>)
                                        </div>

                                        {/* Step 2: Logit formula */}
                                        <div className="text-base font-mono mb-2">
                                            <strong>2.</strong> logit = θ - β + γs × S + γf × F
                                        </div>

                                        {/* Step 3: Substitute values */}
                                        <div className="text-base font-mono mb-2">
                                            <strong>3.</strong> logit =
                                            <span className={`mx-1 px-2 py-1 rounded font-bold transition-all duration-500 ${getParamColor('theta')}`}>
                                                {params.theta.toFixed(1)}
                                            </span>
                                            -
                                            <span className={`mx-1 px-2 py-1 rounded font-bold transition-all duration-500 ${getParamColor('beta')}`}>
                                                ({params.beta.toFixed(1)})
                                            </span>
                                            +
                                            <span className={`mx-1 px-2 py-1 rounded font-bold transition-all duration-500 ${getParamColor('gammaSuccess')}`}>
                                                {params.gammaSuccess.toFixed(2)}
                                            </span>
                                            ×
                                            <span className="mx-1 px-2 py-1 rounded font-bold bg-green-200 text-green-800">
                                                {currentSuccesses}
                                            </span>
                                            +
                                            <span className={`mx-1 px-2 py-1 rounded font-bold transition-all duration-500 ${getParamColor('gammaFailure')}`}>
                                                ({params.gammaFailure.toFixed(2)})
                                            </span>
                                            ×
                                            <span className="mx-1 px-2 py-1 rounded font-bold bg-red-200 text-red-800">
                                                {currentFailures}
                                            </span>
                                        </div>

                                        {/* Step 4: Calculate logit */}
                                        <div className="text-base font-mono mb-2">
                                            <strong>4.</strong> logit = {(params.theta - params.beta + params.gammaSuccess * currentSuccesses + params.gammaFailure * currentFailures).toFixed(3)}
                                        </div>

                                        {/* Step 5: Final probability */}
                                        <div className="text-lg font-bold text-blue-600 border-t-2 border-blue-300 pt-2">
                                            <strong>5.</strong> P(success) = {(currentProb * 100).toFixed(1)}%
                                        </div>
                                    </div>
                                </div>

                                {/* Parameter Legend */}
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 bg-blue-200 border-2 border-blue-700 rounded"></div>
                                            <span className="font-bold text-blue-700">θ = Student Ability</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 bg-purple-200 border-2 border-purple-700 rounded"></div>
                                            <span className="font-bold text-purple-700">β = Skill Difficulty</span>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 bg-green-200 border-2 border-green-700 rounded"></div>
                                            <span className="font-bold text-green-700">γs = Success Rate</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 bg-red-200 border-2 border-red-700 rounded"></div>
                                            <span className="font-bold text-red-700">γf = Failure Rate</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Current Status */}
                            <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg">
                                <div className="flex items-center gap-3 mb-6">
                                    <Clock className="w-6 h-6 text-purple-700" />
                                    <h3 className="text-xl font-bold text-black uppercase tracking-wide">
                                        Current Status
                                    </h3>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="bg-green-200 border-2 border-green-600 rounded-lg p-4 text-center">
                                        <div className="font-bold text-green-800">SUCCESSES</div>
                                        <div className="text-3xl font-bold text-green-600">{currentSuccesses}</div>
                                    </div>
                                    <div className="bg-red-200 border-2 border-red-600 rounded-lg p-4 text-center">
                                        <div className="font-bold text-red-800">FAILURES</div>
                                        <div className="text-3xl font-bold text-red-600">{currentFailures}</div>
                                    </div>
                                </div>

                                <div className="p-6 border-4 border-blue-600 rounded-xl bg-blue-50 text-center">
                                    <div className="text-blue-800 font-bold text-lg mb-2">CURRENT PROBABILITY</div>
                                    <div className="text-4xl font-bold text-blue-600 mb-4">
                                        {(currentProb * 100).toFixed(1)}%
                                    </div>
                                    <div className="w-full bg-gray-300 border-4 border-black rounded-full h-6">
                                        <div
                                            className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full transition-all duration-300"
                                            style={{ width: `${(currentProb * 100).toFixed(0)}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>

                            {/* Parameters */}
                            <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg">
                                <div className="flex items-center gap-3 mb-6">
                                    <Brain className="w-6 h-6 text-blue-700" />
                                    <h3 className="text-xl font-bold text-black uppercase tracking-wide">
                                        PFM Parameters
                                    </h3>
                                </div>

                                <div className="space-y-6">
                                    {Object.entries(paramMeta).map(([key, meta]) => (
                                        <div key={key} className="space-y-3">
                                            <label
                                                className={`font-bold text-${meta.color}-700 flex items-center gap-2 cursor-pointer hover:text-${meta.color}-800 transition-colors`}
                                                onClick={() => handleTooltipShow(key)}
                                            >
                                                {meta.icon}
                                                {meta.label}
                                                <span className="text-sm font-normal text-gray-600">
                                                    (click for info)
                                                </span>
                                            </label>

                                            <div className="flex items-center gap-4">
                                                <input
                                                    type="range"
                                                    min={meta.min}
                                                    max={meta.max}
                                                    step={meta.step}
                                                    value={params[key]}
                                                    disabled={!sessionActive}
                                                    onChange={(e) => setParam(key, e.target.value)}
                                                    className={`flex-1 h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer border-2 border-black ${!sessionActive ? "opacity-50" : ""}`}
                                                />
                                                <span
                                                    className={`font-mono w-16 text-center font-bold text-lg border-2 border-black rounded px-2 py-1 bg-gray-50 transition-all duration-500 ${lastChangedParam === key
                                                        ? "bg-yellow-300 text-yellow-900 border-yellow-500 scale-110"
                                                        : `text-${meta.color}-800`
                                                        }`}
                                                >
                                                    {['gammaSuccess', 'gammaFailure'].includes(key)
                                                        ? params[key].toFixed(2)
                                                        : params[key]}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Chart & Controls */}
                        <div className="space-y-8">
                            {/* Chart */}
                            <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg">
                                <div className="flex items-center gap-3 mb-6">
                                    <LineChart className="w-6 h-6 text-blue-700" />
                                    <h3 className="text-xl font-bold text-black uppercase tracking-wide">
                                        Your Real Learning Journey
                                    </h3>
                                </div>

                                <div className="h-80 w-full bg-gray-50 border-4 border-black rounded-lg p-4">
                                    <canvas ref={chartRef} />
                                </div>

                                <div className="mt-4 p-4 border-4 border-blue-600 rounded-lg bg-blue-50">
                                    <div className="text-center font-bold text-blue-800 mb-2">
                                        Journey Progress: {responseLog.length} opportunities completed
                                    </div>
                                    <div className="grid grid-cols-4 gap-2 text-sm">
                                        <div className="flex items-center gap-1">
                                            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                                            <span>Start</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                            <span>Success</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                                            <span>Failure</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-blue-800"></div>
                                            <span>Current</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Controls */}
                            <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg">
                                <div className="flex items-center gap-3 mb-6">
                                    <div
                                        className={`w-4 h-4 rounded-full border-2 border-black ${sessionActive
                                            ? "bg-green-500 animate-pulse"
                                            : "bg-gray-400"
                                            }`}
                                    ></div>
                                    <h3 className="text-xl font-bold text-black uppercase tracking-wide">
                                        {sessionActive ? "Learning Session Active" : "Session Ended"}
                                    </h3>
                                </div>

                                {/* Response Buttons */}
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <button
                                        onClick={() => simulateResponse(true)}
                                        disabled={!sessionActive}
                                        className={`px-6 py-4 bg-green-600 text-white border-4 border-black rounded-xl font-bold uppercase tracking-wide transition-all transform hover:scale-105 ${!sessionActive
                                            ? "opacity-50 cursor-not-allowed"
                                            : "hover:bg-white hover:text-green-600"
                                            }`}
                                    >
                                        ✓ I Got It Right
                                    </button>

                                    <button
                                        onClick={() => simulateResponse(false)}
                                        disabled={!sessionActive}
                                        className={`px-6 py-4 bg-red-600 text-white border-4 border-black rounded-xl font-bold uppercase tracking-wide transition-all transform hover:scale-105 ${!sessionActive
                                            ? "opacity-50 cursor-not-allowed"
                                            : "hover:bg-white hover:text-red-600"
                                            }`}
                                    >
                                        ✗ I Got It Wrong
                                    </button>
                                </div>

                                {/* Session Management Buttons */}
                                <div className="grid grid-cols-1 gap-4 mb-6">
                                    {sessionActive && (
                                        <button
                                            onClick={endSession}
                                            className="px-4 py-3 bg-orange-600 text-white border-4 border-black rounded-xl font-bold uppercase tracking-wide hover:bg-white hover:text-orange-600 transition-all transform hover:scale-105"
                                        >
                                            End Session
                                        </button>
                                    )}

                                    <button
                                        onClick={resetAll}
                                        className="px-4 py-3 bg-gray-600 text-white border-4 border-black rounded-xl font-bold uppercase tracking-wide hover:bg-white hover:text-gray-600 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                                    >
                                        <RotateCcw className="w-5 h-5" />
                                        Start New Journey
                                    </button>
                                </div>

                                {/* Retrain Section */}
                                {!sessionActive && retrainingData.length > 0 && (
                                    <div className="border-4 border-yellow-600 rounded-xl p-6 bg-yellow-100 mb-6">
                                        <div className="flex items-center gap-3 mb-4">
                                            <Database className="w-6 h-6 text-yellow-700" />
                                            <h4 className="font-bold text-yellow-800 text-lg uppercase">
                                                PFM Retraining Ready
                                            </h4>
                                        </div>
                                        <p className="text-yellow-800 font-bold mb-4">
                                            {retrainingData.length} responses collected. Ready to update PFM parameters
                                            based on your success/failure patterns.
                                        </p>
                                        <button
                                            onClick={retrainModel}
                                            className="w-full px-4 py-3 bg-yellow-600 text-white border-4 border-black rounded-xl font-bold uppercase tracking-wide hover:bg-white hover:text-yellow-600 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                                        >
                                            <RefreshCw className="w-5 h-5" />
                                            Retrain PFM Model
                                        </button>
                                    </div>
                                )}

                                {/* Response History */}
                                <div className="mt-6 border-l-8 border-blue-600 bg-blue-100 rounded-r-xl p-4">
                                    <h4 className="font-bold text-blue-800 mb-3 text-lg uppercase">
                                        Your Journey So Far
                                    </h4>
                                    <div className="space-y-2 max-h-32 overflow-y-auto">
                                        {responseLog.length === 0 ? (
                                            <div className="text-blue-700 text-center py-2 font-bold">
                                                Your learning journey starts here!
                                            </div>
                                        ) : (
                                            responseLog
                                                .slice(-5)
                                                .reverse()
                                                .map((entry, i) => (
                                                    <div
                                                        key={entry.opportunity}
                                                        className={`${entry.correct
                                                            ? "bg-green-200 border-l-4 border-green-700 text-green-900"
                                                            : "bg-red-200 border-l-4 border-red-700 text-red-900"
                                                            } rounded-r-lg font-mono px-3 py-2`}
                                                    >
                                                        <div className="font-bold">
                                                            Opportunity {entry.opportunity}: {entry.correct ? "✓ Success" : "✗ Failure"}
                                                        </div>
                                                        <div className="text-sm">
                                                            New Probability: {(entry.probability * 100).toFixed(1)}%
                                                        </div>
                                                    </div>
                                                ))
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Key Insights */}
                    <div className="border-4 border-black rounded-xl p-8 bg-gradient-to-r from-blue-100 to-purple-100 shadow-lg">
                        <div className="flex items-center gap-3 mb-6">
                            <Lightbulb className="w-6 h-6 text-purple-700" />
                            <h3 className="text-2xl font-bold text-black uppercase tracking-wide">
                                PFM: Real-Time Learning and Retraining
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="border-4 border-blue-600 rounded-xl p-6 bg-blue-50">
                                <h4 className="font-bold text-blue-800 mb-4 text-xl uppercase tracking-wide">
                                    During Session
                                </h4>
                                <ul className="space-y-2 text-black font-bold">
                                    <li>• θ, β, γs, γf stay constant (no tuning!)</li>
                                    <li>• Each response updates success/failure counts</li>
                                    <li>• Success probability updates in real-time</li>
                                    <li>• Model tracks performance patterns for retraining</li>
                                </ul>
                            </div>

                            <div className="border-4 border-purple-600 rounded-xl p-6 bg-purple-50">
                                <h4 className="font-bold text-purple-800 mb-4 text-xl uppercase tracking-wide">
                                    During Retrain
                                </h4>
                                <ul className="space-y-2 text-black font-bold">
                                    <li>• θ, β updated based on overall performance</li>
                                    <li>• γs, γf adjusted based on success/failure patterns</li>
                                    <li>• Model learns from collected response data</li>
                                    <li>• More realistic than AFM's single learning rate</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-center">
                        <button
                            onClick={() => {
                                trackButtonClick('pfm_dynamic_continue', {
                                    finalJourney: responseLog,
                                    totalOpportunities: responseLog.length,
                                    finalProbability: currentProb,
                                    slideContext: 'PFM Dynamic Simulator'
                                });
                                navigate(20);
                            }}
                            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105 flex items-center gap-3"
                        >
                            <span>Continue</span>
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            <ParameterTooltip />
        </div>
    );
}; 