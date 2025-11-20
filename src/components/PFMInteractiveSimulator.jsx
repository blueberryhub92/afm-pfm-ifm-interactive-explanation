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
  CheckCircle,
  XCircle,
  Clock,
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
  gammaSuccess: 0.16,
  gammaFailure: -0.06,
};

function calcProb(
  theta,
  beta,
  gammaSuccess,
  gammaFailure,
  successes,
  failures
) {
  const logit =
    theta + beta + gammaSuccess * successes + gammaFailure * failures;
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
  const [responseLog, setResponseLog] = useState([]);
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
    pathData.push(
      calcProb(
        params.theta,
        params.beta,
        params.gammaSuccess,
        params.gammaFailure,
        0,
        0
      ) * 100
    );
    pathLabels.push("Start");

    // Add each response opportunity
    responseLog.forEach((response, index) => {
      if (response.correct) currentSuccesses++;
      else currentFailures++;

      const prob =
        calcProb(
          params.theta,
          params.beta,
          params.gammaSuccess,
          params.gammaFailure,
          currentSuccesses,
          currentFailures
        ) * 100;
      pathData.push(prob);
      pathLabels.push(`Opportunity ${index + 1}`);
    });

    if (chartInstance.current) {
      chartInstance.current.data.labels = pathLabels;
      chartInstance.current.data.datasets[0].data = pathData;

      // Highlight the current position (last point)
      chartInstance.current.data.datasets[0].pointRadius = pathData.map(
        (_, i) => (i === pathData.length - 1 ? 12 : 6)
      );
      chartInstance.current.data.datasets[0].pointBackgroundColor =
        pathData.map((_, i) => {
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
              label: "Learning Path",
              data: pathData,
              borderColor: "#3b82f6",
              backgroundColor: "rgba(59, 130, 246, 0.1)",
              borderWidth: 4,
              fill: false,
              tension: 0.3,
              pointRadius: pathData.map((_, i) =>
                i === pathData.length - 1 ? 12 : 6
              ),
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
            mode: "index",
          },
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
            legend: {
              display: true,
              position: "top",
              labels: {
                font: { weight: "bold", size: 12 },
                color: "#111",
              },
            },
            tooltip: {
              backgroundColor: "white",
              titleColor: "#111",
              bodyColor: "#111",
              borderColor: "#000",
              borderWidth: 2,
              cornerRadius: 8,
              displayColors: true,
              callbacks: {
                title: (context) => context[0].label,
                label: (context) =>
                  `Probability: ${context.parsed.y.toFixed(1)}%`,
                afterLabel: (context) => {
                  if (context.dataIndex === 0) return "Starting point";
                  const response = responseLog[context.dataIndex - 1];
                  return response
                    ? `Response: ${
                        response.correct ? "Correct ✓" : "Incorrect ✗"
                      }`
                    : "";
                },
              },
            },
          },
        },
      });
    }
    // eslint-disable-next-line
  }, [
    responseLog,
    params.theta,
    params.beta,
    params.gammaSuccess,
    params.gammaFailure,
  ]);

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
    trackCustomEvent("pfm_dynamic_simulator_entered", {
      initialParams: params,
      slideContext: "PFM Dynamic Simulator",
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
  const currentSuccesses = responseLog.filter((r) => r.correct).length;
  const currentFailures = responseLog.filter((r) => !r.correct).length;
  const currentProb = calcProb(
    params.theta,
    params.beta,
    params.gammaSuccess,
    params.gammaFailure,
    currentSuccesses,
    currentFailures
  );

  // Handlers
  function setParam(p, v) {
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
      slideContext: "PFM Dynamic Simulator",
    });
  }

  function simulateResponse(isCorrect) {
    const newSuccesses = isCorrect ? currentSuccesses + 1 : currentSuccesses;
    const newFailures = isCorrect ? currentFailures : currentFailures + 1;
    const newProb = calcProb(
      params.theta,
      params.beta,
      params.gammaSuccess,
      params.gammaFailure,
      newSuccesses,
      newFailures
    );

    const entry = {
      opportunity: responseLog.length + 1,
      correct: isCorrect,
      probability: newProb,
      successes: newSuccesses,
      failures: newFailures,
      timestamp: Date.now(),
    };

    setResponseLog((prev) => [...prev, entry]);

    trackButtonClick("pfm_dynamic_simulate_response", {
      isCorrect,
      opportunityNumber: entry.opportunity,
      newProbability: newProb,
      slideContext: "PFM Dynamic Simulator",
    });
  }

  function resetAll() {
    setParams(paramDefaults);
    setResponseLog([]);
    setLastChangedParam(null);

    trackButtonClick("pfm_dynamic_reset_all", {
      slideContext: "PFM Dynamic Simulator",
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
            {["gammaSuccess", "gammaFailure"].includes(showTooltip)
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
        <div className="w-full space-y-8">
          {/* Introduction */}
          <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg">
            <p className="text-lg text-black leading-relaxed text-center">
              Watch a <strong>PFM learning path</strong> unfold in real-time!
              <br />
              See how each success or failure immediately affects your
              probability trajectory.
              <br />
              <span className="relative group inline-block cursor-help">
                <span className="border-b-2 border-dashed border-gray-400">
                  Disclaimer: For the student simulation only the practice
                  opportunities change during practice.
                </span>

                {/* Hover Box */}
                <div className="absolute left-1/2 transform -translate-x-1/2 top-full mt-4 w-[600px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="border-4 border-black rounded-xl p-6 bg-gradient-to-r from-blue-100 to-purple-100 shadow-2xl">
                    <div className="flex items-center gap-3 mb-4">
                      <Lightbulb className="w-6 h-6 text-purple-700" />
                      <h3 className="text-xl font-bold text-black uppercase tracking-wide">
                        PFM: What Happens During Simulation?
                      </h3>
                    </div>

                    <div className="border-4 border-blue-600 rounded-xl p-4 bg-blue-50">
                      <h4 className="font-bold text-blue-800 mb-3 text-lg uppercase tracking-wide">
                        During Simulation
                      </h4>
                      <ul className="space-y-2 text-black font-bold text-sm">
                        <li>• θ, β, γs, γf stay constant (no tuning!)</li>
                        <li>
                          • Each response updates success/failure counts
                        </li>
                        <li>• Success probability updates in real-time</li>
                        <li>
                          • You can adjust parameters manually anytime
                        </li>
                        <li>
                          • More realistic than AFM's single learning rate
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
                        .map((entry) => (
                          <div
                            key={entry.opportunity}
                            className={`${
                              entry.correct
                                ? "bg-green-200 border-l-4 border-green-700 text-green-900"
                                : "bg-red-200 border-l-4 border-red-700 text-red-900"
                            } rounded-r-lg font-mono px-3 py-2`}
                          >
                            <div className="font-bold">
                              Opportunity {entry.opportunity}:{" "}
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
                          {["gammaSuccess", "gammaFailure"].includes(key)
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
                    {(currentProb * 100).toFixed(1)}%
                  </div>
                  <div className="w-full bg-gray-300 border-4 border-black rounded-full h-4">
                    <div
                      className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full transition-all duration-300"
                      style={{ width: `${(currentProb * 100).toFixed(0)}%` }}
                    ></div>
                  </div>
                </div>

                {/* Current Status */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="bg-green-200 border-2 border-green-600 rounded-lg p-4 text-center">
                    <div className="font-bold text-green-800 text-xs">
                      SUCCESSES
                    </div>
                    <div className="text-2xl font-bold text-green-600">
                      {currentSuccesses}
                    </div>
                  </div>
                  <div className="bg-red-200 border-2 border-red-600 rounded-lg p-4 text-center">
                    <div className="font-bold text-red-800 text-xs">
                      FAILURES
                    </div>
                    <div className="text-2xl font-bold text-red-600">
                      {currentFailures}
                    </div>
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
                  <div className="font-bold text-green-800 text-sm mb-2">
                    Journey Progress: {responseLog.length} opportunities
                    completed
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
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
            </div>

            {/* Right Side: Formula Box */}
            <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <Calculator className="w-6 h-6 text-purple-700" />
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
                    <strong>1.</strong> P(success) = 1 / (1 + e<sup>-logit</sup>
                    )
                  </div>

                  {/* Step 2: Logit formula */}
                  <div className="text-base font-mono mb-2">
                    <strong>2.</strong> logit = θ + β + γs × S + γf × F
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
                        "gammaSuccess"
                      )}`}
                    >
                      {params.gammaSuccess.toFixed(2)}
                    </span>
                    ×
                    <span className="mx-1 px-2 py-1 rounded font-bold bg-green-200 text-green-800">
                      {currentSuccesses}
                    </span>
                    +
                    <span
                      className={`mx-1 px-2 py-1 rounded font-bold transition-all duration-500 ${getParamColor(
                        "gammaFailure"
                      )}`}
                    >
                      ({params.gammaFailure.toFixed(2)})
                    </span>
                    ×
                    <span className="mx-1 px-2 py-1 rounded font-bold bg-red-200 text-red-800">
                      {currentFailures}
                    </span>
                  </div>

                  {/* Step 4: Calculate logit */}
                  <div className="text-base font-mono mb-2">
                    <strong>4.</strong> logit ={" "}
                    {(
                      params.theta -
                      params.beta +
                      params.gammaSuccess * currentSuccesses +
                      params.gammaFailure * currentFailures
                    ).toFixed(3)}
                  </div>

                  {/* Step 5: Final probability */}
                  <div className="text-lg font-bold text-blue-600 border-t-2 border-blue-300 pt-2">
                    <strong>5.</strong> P(success) ={" "}
                    {(currentProb * 100).toFixed(1)}%
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
                    γs = Success Rate
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-200 border-2 border-red-700 rounded"></div>
                  <span className="font-bold text-red-700">
                    γf = Failure Rate
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center">
            <button
              onClick={() => {
                trackButtonClick("pfm_dynamic_continue", {
                  finalJourney: responseLog,
                  totalOpportunities: responseLog.length,
                  finalProbability: currentProb,
                  slideContext: "PFM Dynamic Simulator",
                });
                navigate(20);
              }}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105 flex items-center gap-3"
            >
              <span>What happens if we add hints?</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <ParameterTooltip />
    </div>
  );
};
