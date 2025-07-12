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
import { trackButtonClick, trackSliderInteraction, trackCustomEvent } from "../utils/analytics";

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
    label: "β: Task Difficulty",
    min: -2,
    max: 2,
    step: 0.1,
    color: "purple",
    icon: <Target className="w-5 h-5" />,
    tooltip: {
      color: "purple",
      title: "Task Difficulty (β)",
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

export const Slide20AFMSimulator = ({ scroll }) => {
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
    trackCustomEvent('afm_simulator_entered', {
      initialParams: params,
      slideContext: 'AFM Simulator'
    });
  }, []);

  // Keyboard: Escape closes tooltip
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape" && showTooltip) {
        trackButtonClick('afm_tooltip_close_escape', {
          parameter: showTooltip,
          slideContext: 'AFM Simulator'
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

    // Track parameter change
    trackSliderInteraction(`afm_param_${p}`, newValue, {
      oldValue,
      newValue,
      parameterName: p,
      sessionActive,
      slideContext: 'AFM Simulator'
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

    // Track response simulation
    trackButtonClick('afm_simulate_response', {
      isCorrect,
      practiceAttempt: params.practice,
      currentProbability: prob,
      currentParams: params,
      logit: logit,
      slideContext: 'AFM Simulator'
    });
  }

  function retrainModel() {
    if (!retrainingData.length) return;

    // Track retrain attempt
    const preRetrainParams = { ...params };
    const retrainDataSnapshot = [...retrainingData];
    let recent = retrainingData.slice(-10);
    let correct = recent.filter((r) => r.correct).length;
    let total = recent.length;
    let acc = correct / total;
    let avgErr =
      recent.reduce(
        (sum, r) => sum + Math.abs((r.correct ? 1 : 0) - r.probability),
        0
      ) / total;
    let { theta, beta, gamma } = params;

    // ability adjustment
    if (acc >= 0.5) theta = Math.min(3, theta + 0.3);
    else if (acc < 0.2) theta = Math.max(-3, theta - 0.1);

    // difficulty adjustment - make β change faster
    if (acc > 0.8) {
      // Very high accuracy = tasks too easy, make harder (decrease beta)
      beta = Math.max(-2, beta - 0.4);
    } else if (acc > 0.6) {
      // Good accuracy = slightly harder tasks (decrease beta)
      beta = Math.max(-2, beta - 0.2);
    } else if (acc < 0.3) {
      // Low accuracy = tasks too hard, make easier (increase beta)
      beta = Math.min(2, beta + 0.4);
    } else if (acc < 0.5) {
      // Below average accuracy = make tasks easier (increase beta)
      beta = Math.min(2, beta + 0.2);
    }

    // Additional β adjustment based on prediction error
    if (avgErr > 0.3) {
      // High prediction error suggests difficulty mismatch
      if (acc < 0.5) {
        beta = Math.min(2, beta + 0.3); // Make easier if struggling
      } else {
        beta = Math.max(-2, beta - 0.2); // Make harder if too accurate
      }
    }

    // More responsive learning rate
    let early = recent.slice(0, Math.floor(total / 2)),
      late = recent.slice(Math.floor(total / 2));
    if (early.length && late.length) {
      let eAcc = early.filter((r) => r.correct).length / early.length;
      let lAcc = late.filter((r) => r.correct).length / late.length;
      let imp = lAcc - eAcc;
      if (imp >= 0) gamma = Math.min(1, gamma + 0.15);
      else if (imp < -0.2) gamma = Math.max(0, gamma - 0.05);
    }

    const newParams = {
      theta: parseFloat(theta.toFixed(1)),
      beta: parseFloat(beta.toFixed(1)),
      gamma: parseFloat(gamma.toFixed(2)),
      practice: 0,
    };

    setParams(newParams);
    setRetrainingData([]);
    setSessionActive(true);
    setLastChangedParam(null); // Clear highlight after retrain

    // Track retrain completion
    trackButtonClick('afm_retrain_model', {
      preRetrainParams,
      postRetrainParams: newParams,
      trainingDataCount: retrainDataSnapshot.length,
      recentAccuracy: recent.length ? recent.filter(r => r.correct).length / recent.length : 0,
      slideContext: 'AFM Simulator'
    });
  }

  function resetAll() {
    const preResetState = {
      params: { ...params },
      responseLogCount: responseLog.length,
      retrainingDataCount: retrainingData.length,
      sessionActive
    };

    setParams(paramDefaults);
    setSessionActive(true);
    setResponseLog([]);
    setRetrainingData([]);
    setLastChangedParam(null);

    // Track reset action
    trackButtonClick('afm_reset_all', {
      preResetState,
      slideContext: 'AFM Simulator'
    });
  }

  function endSession() {
    const sessionStats = {
      finalParams: { ...params },
      totalResponses: responseLog.length,
      correctResponses: responseLog.filter(r => r.correct).length,
      finalProbability: prob,
      sessionDuration: responseLog.length ? responseLog[responseLog.length - 1].timestamp - responseLog[0].timestamp : 0
    };

    setSessionActive(false);

    // Track session end
    trackButtonClick('afm_end_session', {
      sessionStats,
      slideContext: 'AFM Simulator'
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
    trackButtonClick('afm_tooltip_open', {
      parameter: param,
      currentValue: params[param],
      slideContext: 'AFM Simulator'
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
            trackButtonClick('afm_tooltip_close', {
              parameter: showTooltip,
              slideContext: 'AFM Simulator'
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
      practice: "text-orange-700"
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
              Experience the AFM in action! Adjust parameters, simulate student
              responses, and watch how the model learns and adapts.
              <br />
              Disclaimer: For this simulation only the practice opportunities change during practice.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Formula & Parameters */}
            <div className="space-y-8">
              {/* Formula */}
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
                      <span className={`mx-1 px-2 py-1 rounded font-bold transition-all duration-500 ${getParamColor('theta')}`}>
                        {params.theta.toFixed(1)}
                      </span>
                      -
                      <span className={`mx-1 px-2 py-1 rounded font-bold transition-all duration-500 ${getParamColor('beta')}`}>
                        ({params.beta.toFixed(1)})
                      </span>
                      +
                      <span className={`mx-1 px-2 py-1 rounded font-bold transition-all duration-500 ${getParamColor('gamma')}`}>
                        {params.gamma.toFixed(2)}
                      </span>
                      ×
                      <span className={`mx-1 px-2 py-1 rounded font-bold transition-all duration-500 ${getParamColor('practice')}`}>
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
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-blue-200 border-2 border-blue-700 rounded"></div>
                      <span className="font-bold text-blue-700">θ = Student Ability</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-purple-200 border-2 border-purple-700 rounded"></div>
                      <span className="font-bold text-purple-700">β = Task Difficulty</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-200 border-2 border-green-700 rounded"></div>
                      <span className="font-bold text-green-700">γ = Learning Rate</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-orange-200 border-2 border-orange-700 rounded"></div>
                      <span className="font-bold text-orange-700">T = Practice</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Parameters */}
              <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <Brain className="w-6 h-6 text-blue-700" />
                  <h3 className="text-xl font-bold text-black uppercase tracking-wide">
                    Model Parameters
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
                          disabled={!sessionActive && key !== "practice"}
                          onChange={(e) => setParam(key, e.target.value)}
                          className={`flex-1 h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer border-2 border-black ${!sessionActive && key !== "practice"
                            ? "opacity-50"
                            : ""
                            }`}
                        />
                        <span
                          className={`font-mono w-16 text-center font-bold text-lg border-2 border-black rounded px-2 py-1 bg-gray-50 transition-all duration-500 ${lastChangedParam === key
                            ? "bg-yellow-300 text-yellow-900 border-yellow-500 scale-110"
                            : `text-${meta.color}-800`
                            }`}
                        >
                          {key === "gamma"
                            ? params[key].toFixed(2)
                            : params[key]}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Success Probability Display */}
                <div className="mt-8 p-6 border-4 border-blue-600 rounded-xl bg-blue-50">
                  <div className="text-center mb-4">
                    <span className="text-black font-bold text-lg">
                      SUCCESS PROBABILITY
                    </span>
                  </div>
                  <div className="text-4xl font-bold text-blue-600 text-center mb-4">
                    {(prob * 100).toFixed(1)}%
                  </div>
                  <div className="w-full bg-gray-300 border-4 border-black rounded-full h-6">
                    <div
                      className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full transition-all duration-300"
                      style={{ width: `${(prob * 100).toFixed(0)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Chart & Controls */}
            <div className="space-y-8">
              {/* Chart */}
              <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <LineChart className="w-6 h-6 text-green-700" />
                  <h3 className="text-xl font-bold text-black uppercase tracking-wide">
                    Learning Curve
                  </h3>
                </div>

                <div className="h-80 w-full bg-gray-50 border-4 border-black rounded-lg p-4">
                  <canvas ref={chartRef} />
                </div>

                <div className="mt-4 p-4 border-4 border-green-600 rounded-lg bg-green-50 text-center">
                  <div className="font-bold text-green-800">
                    CURRENT: Practice {params.practice} | Probability{" "}
                    {(prob * 100).toFixed(1)}%
                  </div>
                </div>
              </div>

              {/* Session Controls */}
              <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`w-4 h-4 rounded-full border-2 border-black ${sessionActive
                      ? "bg-green-500 animate-pulse"
                      : "bg-gray-400"
                      }`}
                  ></div>
                  <h3 className="text-xl font-bold text-black uppercase tracking-wide">
                    {sessionActive
                      ? "Learning Session Active"
                      : "Session Ended"}
                  </h3>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <button
                    onClick={() => simulateResponse(true)}
                    disabled={!sessionActive}
                    className={`px-4 py-3 bg-green-600 text-white border-4 border-black rounded-xl font-bold uppercase tracking-wide transition-all transform hover:scale-105 ${!sessionActive
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-white hover:text-green-600"
                      }`}
                  >
                    ✓ Correct
                  </button>

                  <button
                    onClick={() => simulateResponse(false)}
                    disabled={!sessionActive}
                    className={`px-4 py-3 bg-red-600 text-white border-4 border-black rounded-xl font-bold uppercase tracking-wide transition-all transform hover:scale-105 ${!sessionActive
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-white hover:text-red-600"
                      }`}
                  >
                    ✗ Incorrect
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
                      {retrainingData.length} responses collected. Ready to
                      update model parameters.
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
                            className={`${entry.correct
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
                trackButtonClick('afm_continue_next_slide', {
                  finalState: {
                    params: params,
                    sessionActive,
                    totalResponses: responseLog.length,
                    correctResponses: responseLog.filter(r => r.correct).length,
                    currentProbability: prob
                  },
                  slideContext: 'AFM Simulator'
                });
                scroll(16);
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
