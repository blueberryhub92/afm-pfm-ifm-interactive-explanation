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
} from "lucide-react";
import Chart from "chart.js/auto";
import {
  trackButtonClick,
  trackSliderInteraction,
  trackCustomEvent,
} from "../utils/analytics";

const paramDefaults = {
  theta: 0.0,
  beta: 0.0,
  gamma: 0.15,
  practice: 0,
};

function calcProb(theta, beta, gamma, practice) {
  const logit = theta - beta + gamma * practice;
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
  gamma: {
    label: "γ: Learning Rate",
    min: 0,
    max: 1,
    step: 0.01,
    color: "green",
    icon: <TrendingUp className="w-5 h-5" />,
    tooltip: {
      color: "green",
      title: "Learning Rate (γ)",
      desc: "Range: 0 (slow) to 1 (fast). Higher γ = faster learning.",
    },
  },
  practice: {
    label: "T: Practice",
    min: 0,
    max: 20,
    step: 1,
    color: "orange",
    icon: <Play className="w-5 h-5" />,
    tooltip: {
      color: "orange",
      title: "Practice Opportunities (T)",
      desc: "How many times practiced. Only increases in-session.",
    },
  },
};

export const AFMInteractiveSimulator = ({ navigate }) => {
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

  // Update Chart
  useEffect(() => {
    const labels = Array.from({ length: 21 }, (_, i) => i);
    const data = labels.map(
      (i) => calcProb(params.theta, params.beta, params.gamma, i) * 100
    );
    if (chartInstance.current) {
      chartInstance.current.data.labels = labels;
      chartInstance.current.data.datasets[0].data = data;
      chartInstance.current.data.datasets[0].pointRadius = labels.map((k) =>
        k === params.practice ? 8 : 0
      );
      chartInstance.current.data.datasets[0].pointBackgroundColor = labels.map(
        (k) => (k === params.practice ? "#ef4444" : "#3b82f6")
      );
      chartInstance.current.update();
    } else if (chartRef.current) {
      chartInstance.current = new Chart(chartRef.current, {
        type: "line",
        data: {
          labels,
          datasets: [
            {
              label: "Success Probability (%)",
              data,
              borderColor: "#3b82f6",
              borderWidth: 4,
              fill: false,
              tension: 0.3,
              pointRadius: labels.map((k) => (k === params.practice ? 8 : 0)),
              pointBackgroundColor: labels.map((k) =>
                k === params.practice ? "#ef4444" : "#3b82f6"
              ),
              pointBorderColor: labels.map((k) =>
                k === params.practice ? "#dc2626" : "#3b82f6"
              ),
              pointBorderWidth: labels.map((k) =>
                k === params.practice ? 4 : 0
              ),
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              title: {
                display: true,
                text: "Practice (T)",
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
            legend: { display: false },
          },
        },
      });
    }
    // eslint-disable-next-line
  }, [params.theta, params.beta, params.gamma, params.practice]);

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
    trackCustomEvent("afm_simulator_entered", {
      initialParams: params,
      slideContext: "AFM Simulator",
    });
  }, []);

  // Keyboard: Escape closes tooltip
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape" && showTooltip) {
        trackButtonClick("afm_tooltip_close_escape", {
          parameter: showTooltip,
          slideContext: "AFM Simulator",
        });
        setShowTooltip(null);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [showTooltip]);

  // Derived
  const logit = params.theta - params.beta + params.gamma * params.practice;
  const prob = calcProb(
    params.theta,
    params.beta,
    params.gamma,
    params.practice
  );

  // Handlers
  function setParam(p, v) {
    if (!sessionActive && p !== "practice") return;
    const oldValue = params[p];
    const newValue = p === "practice" ? parseInt(v, 10) : parseFloat(v);

    setParams((prev) => ({
      ...prev,
      [p]: newValue,
    }));
    setLastChangedParam(p);

    // Track parameter change with more specific context
    trackSliderInteraction(`slide20_afm_simulator_${p}_slider`, newValue, {
      oldValue,
      newValue,
      parameterName: p,
      parameterLabel: paramMeta[p].label,
      parameterContext: paramMeta[p].tooltip.desc,
      sessionActive,
      slideNumber: 20,
      slideName: "AFM Simulator",
      elementType: "slider",
      elementLocation: "model_parameters_section",
      interactionPurpose:
        p === "practice" ? "adjust_practice_count" : "adjust_model_parameter",
    });
  }

  function simulateResponse(isCorrect) {
    if (!sessionActive) return;
    const entry = {
      practice: params.practice,
      correct: isCorrect,
      probability: prob,
      timestamp: Date.now(),
    };
    setResponseLog((prev) => [...prev, entry]);
    setRetrainingData((prev) => [...prev, entry]);
    setParams((prev) => ({ ...prev, practice: prev.practice + 1 }));
    setLastChangedParam("practice");

    // Track response simulation with more context
    trackButtonClick("slide20_afm_simulator_response", {
      isCorrect,
      practiceAttempt: params.practice,
      currentProbability: prob,
      currentParams: params,
      logit,
      slideNumber: 20,
      slideName: "AFM Simulator",
      elementType: "button",
      elementLocation: "session_controls_section",
      buttonType: isCorrect ? "correct_response" : "incorrect_response",
      sessionActive,
      totalResponses: responseLog.length + 1,
    });
  }

  function retrainModel() {
    if (!retrainingData.length) return;

    // Track retrain attempt with more context
    const preRetrainParams = { ...params };
    const retrainDataSnapshot = [...retrainingData];

    // Use larger window with exponential weighting (K=20, fallback to available data)
    const K = Math.min(20, retrainingData.length);
    let recent = retrainingData.slice(-K);
    let total = recent.length;

    // Calculate exponentially weighted accuracy and prediction error
    let weightedAcc = 0;
    let weightedErr = 0;
    let totalWeight = 0;

    for (let i = 0; i < total; i++) {
      const weight = Math.exp(-0.1 * (total - 1 - i)); // More weight to recent observations
      const r = recent[i];
      weightedAcc += weight * (r.correct ? 1 : 0);
      weightedErr += weight * Math.abs((r.correct ? 1 : 0) - r.probability);
      totalWeight += weight;
    }

    weightedAcc /= totalWeight;
    weightedErr /= totalWeight;

    let { theta, beta, gamma } = params;

    // Hyperparameters for realistic updates
    const etaTheta = 0.01; // Learning rate for ability
    const etaBeta = 0.01; // Learning rate for difficulty
    const alphaGamma = 0.02; // EMA smoothing for gamma
    const lambda = 0.005; // L2 regularization strength
    const maxStepSize = 0.05; // Maximum parameter change per update
    const noiseStd = 0.03; // Process noise standard deviation

    // Prior means (regularization targets)
    const thetaPrior = 0.0;
    const betaPrior = 0.0;
    const gammaPrior = 0.15;

    // SGD-style updates with regularization
    // Theta update: gradient from prediction error + L2 regularization
    const thetaGradient = (weightedAcc - 0.5) * 2; // Simple gradient approximation
    const thetaUpdate =
      etaTheta * (thetaGradient - lambda * (theta - thetaPrior));
    theta += Math.max(-maxStepSize, Math.min(maxStepSize, thetaUpdate));
    theta = Math.max(-3, Math.min(3, theta)); // Enforce bounds

    // Beta update: based on prediction accuracy vs target (0.6-0.7 range)
    const targetAcc = 0.65;
    const betaGradient = (weightedAcc - targetAcc) * 2; // Positive if too easy, negative if too hard
    const betaUpdate = etaBeta * (-betaGradient - lambda * (beta - betaPrior)); // Negative because higher beta = easier
    beta += Math.max(-maxStepSize, Math.min(maxStepSize, betaUpdate));
    beta = Math.max(-2, Math.min(2, beta)); // Enforce bounds

    // Gamma update: EMA-based on learning improvement signal
    const windowSize = Math.max(8, Math.floor(total / 2));
    if (total >= windowSize * 2) {
      const early = recent.slice(0, windowSize);
      const late = recent.slice(-windowSize);

      const earlyAcc =
        early.reduce((sum, r) => sum + (r.correct ? 1 : 0), 0) / early.length;
      const lateAcc =
        late.reduce((sum, r) => sum + (r.correct ? 1 : 0), 0) / late.length;
      const improvement = lateAcc - earlyAcc;

      // Target gamma based on observed improvement
      const gammaSignal = gammaPrior + 0.02 * improvement;
      const gammaTarget = Math.max(0, Math.min(0.2, gammaSignal)); // Constrain to realistic range

      // EMA update
      const gammaUpdate = alphaGamma * (gammaTarget - gamma);
      gamma += Math.max(-maxStepSize, Math.min(maxStepSize, gammaUpdate));
      gamma = Math.max(0, Math.min(0.2, gamma)); // Enforce bounds
    }

    // Add small amount of process noise to prevent deterministic behavior
    const addNoise = (value, bounds) => {
      const noise = (Math.random() - 0.5) * 2 * noiseStd;
      return Math.max(bounds[0], Math.min(bounds[1], value + noise));
    };

    theta = addNoise(theta, [-3, 3]);
    beta = addNoise(beta, [-2, 2]);
    gamma = addNoise(gamma, [0, 0.2]);

    const newParams = {
      theta: parseFloat(theta.toFixed(2)),
      beta: parseFloat(beta.toFixed(2)),
      gamma: parseFloat(gamma.toFixed(3)),
      practice: 0,
    };

    setParams(newParams);
    setRetrainingData([]);
    setSessionActive(true);
    setLastChangedParam(null); // Clear highlight after retrain

    // Store parameter change information for transparency
    const parameterChanges = {
      theta: {
        before: preRetrainParams.theta,
        after: newParams.theta,
        change: newParams.theta - preRetrainParams.theta,
        reason: `Weighted accuracy: ${(weightedAcc * 100).toFixed(1)}%`,
      },
      beta: {
        before: preRetrainParams.beta,
        after: newParams.beta,
        change: newParams.beta - preRetrainParams.beta,
        reason: `Target accuracy: ${(targetAcc * 100).toFixed(1)}%`,
      },
      gamma: {
        before: preRetrainParams.gamma,
        after: newParams.gamma,
        change: newParams.gamma - preRetrainParams.gamma,
        reason:
          total >= windowSize * 2
            ? "Learning improvement detected"
            : "Insufficient data for gamma update",
      },
    };

    // Store for UI display
    setLastParameterChanges && setLastParameterChanges(parameterChanges);

    // Track retrain completion with more context
    trackButtonClick("slide20_afm_simulator_retrain", {
      preRetrainParams,
      postRetrainParams: newParams,
      trainingDataCount: retrainDataSnapshot.length,
      recentAccuracy: acc,
      avgPredictionError: avgErr,
      slideNumber: 20,
      slideName: "AFM Simulator",
      elementType: "button",
      elementLocation: "retrain_section",
      buttonType: "retrain_model",
      modelUpdates: {
        theta: {
          before: preRetrainParams.theta,
          after: newParams.theta,
          change: newParams.theta - preRetrainParams.theta,
        },
        beta: {
          before: preRetrainParams.beta,
          after: newParams.beta,
          change: newParams.beta - preRetrainParams.beta,
        },
        gamma: {
          before: preRetrainParams.gamma,
          after: newParams.gamma,
          change: newParams.gamma - preRetrainParams.gamma,
        },
      },
    });
  }

  function resetAll() {
    const preResetState = {
      params: { ...params },
      responseLogCount: responseLog.length,
      retrainingDataCount: retrainingData.length,
      sessionActive,
    };

    setParams(paramDefaults);
    setSessionActive(true);
    setResponseLog([]);
    setRetrainingData([]);
    setLastChangedParam(null);

    // Track reset action with more context
    trackButtonClick("slide20_afm_simulator_reset", {
      preResetState,
      slideNumber: 20,
      slideName: "AFM Simulator",
      elementType: "button",
      elementLocation: "session_controls_section",
      buttonType: "reset_all",
      sessionState: {
        wasActive: sessionActive,
        hadResponses: responseLog.length > 0,
        hadRetrainingData: retrainingData.length > 0,
      },
    });
  }

  function endSession() {
    const sessionStats = {
      finalParams: { ...params },
      totalResponses: responseLog.length,
      correctResponses: responseLog.filter((r) => r.correct).length,
      finalProbability: prob,
      sessionDuration: responseLog.length
        ? responseLog[responseLog.length - 1].timestamp -
          responseLog[0].timestamp
        : 0,
      learningProgress: {
        initialProb: responseLog[0]?.probability || prob,
        finalProb: prob,
        improvement: responseLog[0] ? prob - responseLog[0].probability : 0,
      },
    };

    setSessionActive(false);

    // Track session end with more context
    trackButtonClick("slide20_afm_simulator_end_session", {
      sessionStats,
      slideNumber: 20,
      slideName: "AFM Simulator",
      elementType: "button",
      elementLocation: "session_controls_section",
      buttonType: "end_session",
      performanceMetrics: {
        accuracy: sessionStats.correctResponses / sessionStats.totalResponses,
        averageProbability:
          responseLog.reduce((sum, r) => sum + r.probability, 0) /
          responseLog.length,
        probabilityTrend:
          responseLog.length > 1
            ? responseLog[responseLog.length - 1].probability -
              responseLog[0].probability
            : 0,
      },
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

    // Track tooltip interaction
    trackButtonClick("afm_tooltip_open", {
      parameter: param,
      currentValue: params[param],
      slideContext: "AFM Simulator",
    });
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
            {showTooltip === "gamma"
              ? params[showTooltip].toFixed(2)
              : params[showTooltip]}
          </div>
        </div>

        <button
          onClick={() => {
            trackButtonClick("afm_tooltip_close", {
              parameter: showTooltip,
              slideContext: "AFM Simulator",
            });
            setShowTooltip(null);
          }}
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
      gamma: "text-green-700",
      practice: "text-orange-700",
    };
    return colors[param] || "text-black";
  };

  // UI
  return (
    <div className="bg-white min-h-screen flex flex-col text-black font-['IBM_Plex_Mono',monospace]">
      {/* Header - matching Slide24 pattern */}
      <div className="border-b-8 border-black bg-purple-400 px-8 py-6 shadow-lg">
        <div className="flex items-center justify-center">
          <span className="text-black font-bold text-2xl uppercase tracking-wider">
            Interactive AFM Simulator
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-8 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Introduction */}
          <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg">
            <p className="text-lg text-black leading-relaxed text-center">
              Experience the AFM in action! Simulate student responses, or
              adjust parameters manually and watch how the model learns and
              adapts.
              <br />
              Disclaimer: For the student simulation only the practice
              opportunities change during practice.
            </p>
          </div>

          {/* Main Content Grid - 3 Columns */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Left Column - Session Controls */}
            <div className="border-4 border-black rounded-xl p-6 bg-white shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`w-4 h-4 rounded-full border-2 border-black ${
                    sessionActive ? "bg-green-500 animate-pulse" : "bg-gray-400"
                  }`}
                ></div>
                <h3 className="text-xl font-bold text-black uppercase tracking-wide">
                  {sessionActive
                    ? "Simulate Student Responses"
                    : "Session Ended"}
                </h3>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 gap-4 mb-6">
                <button
                  onClick={() => simulateResponse(true)}
                  disabled={!sessionActive}
                  className={`px-4 py-3 bg-green-600 text-white border-4 border-black rounded-xl font-bold uppercase tracking-wide transition-all transform hover:scale-105 ${
                    !sessionActive
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-white hover:text-green-600"
                  }`}
                >
                  ✓ Correct Response
                </button>

                <button
                  onClick={() => simulateResponse(false)}
                  disabled={!sessionActive}
                  className={`px-4 py-3 bg-red-600 text-white border-4 border-black rounded-xl font-bold uppercase tracking-wide transition-all transform hover:scale-105 ${
                    !sessionActive
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-white hover:text-red-600"
                  }`}
                >
                  ✗ Incorrect Response
                </button>

                <button
                  onClick={resetAll}
                  className="px-4 py-3 bg-gray-600 text-white border-4 border-black rounded-xl font-bold uppercase tracking-wide hover:bg-white hover:text-gray-600 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  Reset
                </button>
              </div>

              {/* End Session Button */}
              {sessionActive && (
                <div className="mb-6">
                  <button
                    onClick={endSession}
                    className="w-full px-4 py-3 bg-orange-600 text-white border-4 border-black rounded-xl font-bold uppercase tracking-wide hover:bg-white hover:text-orange-600 transition-all transform hover:scale-105"
                  >
                    End Session
                  </button>
                </div>
              )}

              {/* Retrain Section */}
              {!sessionActive && retrainingData.length > 0 && (
                <div className="border-4 border-yellow-600 rounded-xl p-6 bg-yellow-100 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Database className="w-6 h-6 text-yellow-700" />
                    <h4 className="font-bold text-yellow-800 text-lg uppercase">
                      Retraining Ready
                    </h4>
                  </div>
                  <p className="text-yellow-800 font-bold mb-4">
                    {retrainingData.length} responses collected. Ready to update
                    model parameters.
                  </p>
                  <button
                    onClick={retrainModel}
                    className="w-full px-4 py-3 bg-yellow-600 text-white border-4 border-black rounded-xl font-bold uppercase tracking-wide hover:bg-white hover:text-yellow-600 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-5 h-5" />
                    Retrain Model
                  </button>
                </div>
              )}

              {/* Response Log */}
              <div className="border-l-8 border-purple-600 bg-purple-100 rounded-r-xl p-4">
                <h4 className="font-bold text-purple-800 mb-3 text-lg uppercase">
                  Recent Responses
                </h4>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {responseLog.length === 0 ? (
                    <div className="text-purple-700 text-center py-2 font-bold">
                      No responses yet - simulate some answers!
                    </div>
                  ) : (
                    responseLog
                      .slice(-5)
                      .reverse()
                      .map((entry, i) => (
                        <div
                          key={i}
                          className={`${
                            entry.correct
                              ? "bg-green-200 border-l-4 border-green-700 text-green-900"
                              : "bg-red-200 border-l-4 border-red-700 text-red-900"
                          } rounded-r-lg font-mono px-3 py-2`}
                        >
                          <div className="font-bold">
                            Practice {entry.practice}:{" "}
                            {entry.correct ? "✓ Correct" : "✗ Incorrect"}
                          </div>
                          <div className="text-sm">
                            Predicted: {(entry.probability * 100).toFixed(1)}%
                          </div>
                        </div>
                      ))
                  )}
                </div>
              </div>
            </div>

            {/* Middle Column - Parameters */}
            <div className="border-4 border-black rounded-xl p-6 bg-white shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <Brain className="w-6 h-6 text-blue-700" />
                <h3 className="text-xl font-bold text-black uppercase tracking-wide">
                  Model Parameters
                </h3>
              </div>

              <div className="space-y-4">
                {Object.entries(paramMeta).map(([key, meta]) => (
                  <div key={key} className="space-y-2">
                    <label
                      className={`font-bold text-${meta.color}-700 flex items-center gap-2 cursor-pointer hover:text-${meta.color}-800 transition-colors text-sm`}
                      onClick={() => handleTooltipShow(key)}
                    >
                      {meta.icon}
                      {meta.label}
                      <span className="text-xs font-normal text-gray-600">
                        (click for info)
                      </span>
                    </label>

                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min={meta.min}
                        max={meta.max}
                        step={meta.step}
                        value={params[key]}
                        disabled={!sessionActive && key !== "practice"}
                        onChange={(e) => setParam(key, e.target.value)}
                        className={`flex-1 h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer border-2 border-black ${
                          !sessionActive && key !== "practice"
                            ? "opacity-50"
                            : ""
                        }`}
                      />
                      <span
                        className={`font-mono w-14 text-center font-bold text-sm border-2 border-black rounded px-1 py-1 bg-gray-50 transition-all duration-500 ${
                          lastChangedParam === key
                            ? "bg-yellow-300 text-yellow-900 border-yellow-500 scale-110"
                            : `text-${meta.color}-800`
                        }`}
                      >
                        {key === "gamma" ? params[key].toFixed(2) : params[key]}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Success Probability Display */}
              <div className="mt-6 p-4 border-4 border-blue-600 rounded-xl bg-blue-50">
                <div className="text-center mb-3">
                  <span className="text-black font-bold text-sm">
                    SUCCESS PROBABILITY
                  </span>
                </div>
                <div className="text-2xl font-bold text-blue-600 text-center mb-3">
                  {(prob * 100).toFixed(1)}%
                </div>
                <div className="w-full bg-gray-300 border-4 border-black rounded-full h-4">
                  <div
                    className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full transition-all duration-300"
                    style={{ width: `${(prob * 100).toFixed(0)}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Right Column - Chart */}
            <div className="border-4 border-black rounded-xl p-6 bg-white shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <LineChart className="w-6 h-6 text-green-700" />
                <h3 className="text-xl font-bold text-black uppercase tracking-wide">
                  Learning Curve
                </h3>
              </div>

              <div className="h-64 w-full bg-gray-50 border-4 border-black rounded-lg p-4">
                <canvas ref={chartRef} />
              </div>

              <div className="mt-4 p-3 border-4 border-green-600 rounded-lg bg-green-50 text-center">
                <div className="font-bold text-green-800 text-sm">
                  CURRENT: Practice {params.practice} | Probability{" "}
                  {(prob * 100).toFixed(1)}%
                </div>
              </div>
            </div>
          </div>

          {/* Formula Section - Full Width */}
          <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <Calculator className="w-6 h-6 text-purple-700" />
              <h3 className="text-xl font-bold text-black uppercase tracking-wide">
                AFM Formula
              </h3>
            </div>

            {/* Live Formula Display */}
            <div className="text-center mb-6 p-6 bg-gray-50 border-4 border-black rounded-lg space-y-4">
              <div className="text-2xl font-bold text-black mb-4">
                P(success) = {(prob * 100).toFixed(1)}%
              </div>

              <div className="border-t-2 border-gray-300 pt-4">
                <div className="text-lg font-bold mb-2">Step-by-step:</div>

                {/* Step 1: Formula */}
                <div className="text-base font-mono mb-2">
                  <strong>1.</strong> P(success) = 1 / (1 + e<sup>-logit</sup>)
                </div>

                {/* Step 2: Logit formula */}
                <div className="text-base font-mono mb-2">
                  <strong>2.</strong> logit = θ - β + γ × T
                </div>

                {/* Step 3: Substitute values */}
                <div className="text-base font-mono mb-2">
                  <strong>3.</strong> logit =
                  <span
                    className={`mx-1 px-2 py-1 rounded font-bold transition-all duration-500 ${getParamColor(
                      "theta"
                    )}`}
                  >
                    {params.theta.toFixed(1)}
                  </span>
                  -
                  <span
                    className={`mx-1 px-2 py-1 rounded font-bold transition-all duration-500 ${getParamColor(
                      "beta"
                    )}`}
                  >
                    ({params.beta.toFixed(1)})
                  </span>
                  +
                  <span
                    className={`mx-1 px-2 py-1 rounded font-bold transition-all duration-500 ${getParamColor(
                      "gamma"
                    )}`}
                  >
                    {params.gamma.toFixed(2)}
                  </span>
                  ×
                  <span
                    className={`mx-1 px-2 py-1 rounded font-bold transition-all duration-500 ${getParamColor(
                      "practice"
                    )}`}
                  >
                    {params.practice}
                  </span>
                </div>

                {/* Step 4: Calculate logit */}
                <div className="text-base font-mono mb-2">
                  <strong>4.</strong> logit = {logit.toFixed(3)}
                </div>

                {/* Step 5: Final probability */}
                <div className="text-lg font-bold text-blue-600 border-t-2 border-blue-300 pt-2">
                  <strong>5.</strong> P(success) = {(prob * 100).toFixed(1)}%
                </div>
              </div>
            </div>

            {/* Parameter Legend */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-200 border-2 border-blue-700 rounded"></div>
                <span className="font-bold text-blue-700">
                  θ = Student Ability
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-purple-200 border-2 border-purple-700 rounded"></div>
                <span className="font-bold text-purple-700">
                  β = Skill Difficulty
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-200 border-2 border-green-700 rounded"></div>
                <span className="font-bold text-green-700">
                  γ = Learning Rate
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-orange-200 border-2 border-orange-700 rounded"></div>
                <span className="font-bold text-orange-700">T = Practice</span>
              </div>
            </div>
          </div>

          {/* Key Insights */}
          <div className="border-4 border-black rounded-xl p-8 bg-gradient-to-r from-yellow-100 to-orange-100 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <Lightbulb className="w-6 h-6 text-orange-700" />
              <h3 className="text-2xl font-bold text-black uppercase tracking-wide">
                AFM: What Happens When?
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border-4 border-blue-600 rounded-xl p-6 bg-blue-50">
                <h4 className="font-bold text-blue-800 mb-4 text-xl uppercase tracking-wide">
                  During Session
                </h4>
                <ul className="space-y-2 text-black font-bold">
                  <li>• θ, β, γ stay constant (no tuning!)</li>
                  <li>• Only Practice (T) increments per attempt</li>
                  <li>• Success probability updates live</li>
                  <li>• Model tracks performance for later retraining</li>
                </ul>
              </div>

              <div className="border-4 border-purple-600 rounded-xl p-6 bg-purple-50">
                <h4 className="font-bold text-purple-800 mb-4 text-xl uppercase tracking-wide">
                  During Retrain
                </h4>
                <ul className="space-y-2 text-black font-bold">
                  <li>• θ, β, γ updated based on performance</li>
                  <li>• Past responses are used for tuning</li>
                  <li>• Model learns from collected data</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center">
            <button
              onClick={() => {
                trackButtonClick("afm_continue_next_slide", {
                  finalState: {
                    params: params,
                    sessionActive,
                    totalResponses: responseLog.length,
                    correctResponses: responseLog.filter((r) => r.correct)
                      .length,
                    currentProbability: prob,
                  },
                  slideContext: "AFM Simulator",
                });
                navigate(16);
              }}
              className="px-8 py-4 bg-purple-600 text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-purple-600 transition-all transform hover:scale-105 flex items-center gap-3"
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
