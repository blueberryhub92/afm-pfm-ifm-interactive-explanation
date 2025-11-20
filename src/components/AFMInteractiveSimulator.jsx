import React, { useState, useRef, useEffect } from "react";
import {
  Calculator,
  Brain,
  Target,
  TrendingUp,
  Play,
  RotateCcw,
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
  const logit = theta + beta + gamma * practice;
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
  const [responseLog, setResponseLog] = useState([]);
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
  const logit = params.theta + params.beta + params.gamma * params.practice;
  const prob = calcProb(
    params.theta,
    params.beta,
    params.gamma,
    params.practice
  );

  // Handlers
  function setParam(p, v) {
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
      slideNumber: 20,
      slideName: "AFM Simulator",
      elementType: "slider",
      elementLocation: "model_parameters_section",
      interactionPurpose:
        p === "practice" ? "adjust_practice_count" : "adjust_model_parameter",
    });
  }

  function simulateResponse(isCorrect) {
    const entry = {
      practice: params.practice,
      correct: isCorrect,
      probability: prob,
      timestamp: Date.now(),
    };
    setResponseLog((prev) => [...prev, entry]);
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
      totalResponses: responseLog.length + 1,
    });
  }

  function resetAll() {
    const preResetState = {
      params: { ...params },
      responseLogCount: responseLog.length,
    };

    setParams(paramDefaults);
    setResponseLog([]);
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
        hadResponses: responseLog.length > 0,
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
        <div className="w-full space-y-8">
          {/* Introduction */}
          <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg">
            <p className="text-lg text-black leading-relaxed text-center">
              Experience the AFM in action! Simulate student responses, or
              adjust parameters manually and watch how the model learns and
              adapts.
              <br />
              <span className="relative group inline-block cursor-help">
                <span className="border-b-2 border-dashed border-gray-400">
                  Disclaimer: For the student simulation only the practice
                  opportunities change during practice.
                </span>

                {/* Hover Box */}
                <div className="absolute left-1/2 transform -translate-x-1/2 top-full mt-4 w-[600px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="border-4 border-black rounded-xl p-6 bg-gradient-to-r from-yellow-100 to-orange-100 shadow-2xl">
                    <div className="flex items-center gap-3 mb-4">
                      <Lightbulb className="w-6 h-6 text-orange-700" />
                      <h3 className="text-xl font-bold text-black uppercase tracking-wide">
                        AFM: What Happens During Simulation?
                      </h3>
                    </div>

                    <div className="border-4 border-blue-600 rounded-xl p-4 bg-blue-50">
                      <h4 className="font-bold text-blue-800 mb-3 text-lg uppercase tracking-wide">
                        During Simulation
                      </h4>
                      <ul className="space-y-2 text-black font-bold text-sm">
                        <li>• θ, β, γ stay constant (no tuning!)</li>
                        <li>• Only Practice (T) increments per attempt</li>
                        <li>• Success probability updates live</li>
                        <li>
                          • You can adjust parameters manually anytime
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </span>
            </p>
          </div>

          {/* Main Layout: Left side (3 grids) + Right side (formula) */}
          <div className="grid grid-cols-1 xl:grid-cols-[3fr_1fr] gap-6">
            {/* Left Side: 3 Grid Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1.5fr] gap-6">
              {/* Left Column - Session Controls */}
              <div className="border-4 border-black rounded-xl p-6 bg-white shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-4 h-4 rounded-full border-2 border-black bg-green-500 animate-pulse"></div>
                  <h3 className="text-xl font-bold text-black uppercase tracking-wide">
                    Simulate Student Responses
                  </h3>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 gap-4 mb-6">
                  <button
                    onClick={() => simulateResponse(true)}
                    className="px-4 py-3 bg-green-600 text-white border-4 border-black rounded-xl font-bold uppercase tracking-wide transition-all transform hover:scale-105 hover:bg-white hover:text-green-600"
                  >
                    ✓ Correct Response
                  </button>

                  <button
                    onClick={() => simulateResponse(false)}
                    className="px-4 py-3 bg-red-600 text-white border-4 border-black rounded-xl font-bold uppercase tracking-wide transition-all transform hover:scale-105 hover:bg-white hover:text-red-600"
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
                          onChange={(e) => setParam(key, e.target.value)}
                          className="flex-1 h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer border-2 border-black"
                        />
                        <span
                          className={`font-mono w-14 text-center font-bold text-sm border-2 border-black rounded px-1 py-1 bg-gray-50 transition-all duration-500 ${
                            lastChangedParam === key
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

            {/* Right Side: Formula Box */}
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
                    <strong>1.</strong> P(success) = 1 / (1 + e<sup>-logit</sup>
                    )
                  </div>

                  {/* Step 2: Logit formula */}
                  <div className="text-base font-mono mb-2">
                    <strong>2.</strong> logit = θ + β + γ × T
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
                    +
                    <span
                      className={`mx-1 px-2 py-1 rounded font-bold transition-all duration-500 ${getParamColor(
                        "beta"
                      )}`}
                    >
                      {params.beta.toFixed(1)}
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
                  <span className="font-bold text-orange-700">
                    T = Practice
                  </span>
                </div>
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
