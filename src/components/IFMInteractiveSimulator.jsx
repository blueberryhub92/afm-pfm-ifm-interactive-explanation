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
  HelpCircle,
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
  mu: 0.16,
  rho: -0.06,
  nu: 0.12,
};

function calcProb(theta, beta, mu, rho, nu, successes, failures, hints) {
  const logit = theta + beta + mu * successes + rho * failures + nu * hints;
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
  mu: {
    label: "μ: Success Learning Rate",
    min: 0,
    max: 0.3,
    step: 0.01,
    color: "green",
    icon: <CheckCircle className="w-5 h-5" />,
    tooltip: {
      color: "green",
      title: "Success Learning Rate (μ)",
      desc: "Range: 0 (slow) to 0.3 (fast). How much successes boost learning in IFM.",
    },
  },
  rho: {
    label: "ρ: Failure Learning Rate",
    min: -0.2,
    max: 0,
    step: 0.01,
    color: "red",
    icon: <XCircle className="w-5 h-5" />,
    tooltip: {
      color: "red",
      title: "Failure Learning Rate (ρ)",
      desc: "Range: -0.2 to 0. How much failures hurt learning in IFM. Negative values mean failures hurt.",
    },
  },
  nu: {
    label: "ν: Hint Learning Rate",
    min: 0,
    max: 0.25,
    step: 0.01,
    color: "orange",
    icon: <HelpCircle className="w-5 h-5" />,
    tooltip: {
      color: "orange",
      title: "Hint Learning Rate (ν)",
      desc: "Range: 0 to 0.25. How much hints/scaffolds boost learning within each opportunity. Hints accumulate with responses!",
    },
  },
};

export const IFMInteractiveSimulator = ({ navigate }) => {
  // State
  const [params, setParams] = useState(paramDefaults);
  const [sessionActive, setSessionActive] = useState(true);
  const [responseLog, setResponseLog] = useState([]);
  const [retrainingData, setRetrainingData] = useState([]);
  const [showTooltip, setShowTooltip] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [lastChangedParam, setLastChangedParam] = useState(null);
  const [pendingHints, setPendingHints] = useState(0); // Hints for the current opportunity

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
    let currentHints = 0;

    // Starting point
    pathData.push(
      calcProb(
        params.theta,
        params.beta,
        params.mu,
        params.rho,
        params.nu,
        0,
        0,
        0
      ) * 100
    );
    pathLabels.push("Start");

    // Add each response step (each represents one learning opportunity)
    responseLog.forEach((response, index) => {
      if (response.correct) currentSuccesses++;
      else currentFailures++;
      currentHints += response.hintsUsed; // Accumulate hints from this opportunity

      const prob =
        calcProb(
          params.theta,
          params.beta,
          params.mu,
          params.rho,
          params.nu,
          currentSuccesses,
          currentFailures,
          currentHints
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
          const response = responseLog[i - 1];
          // Color based on success/failure, with special border if hints were used
          return response?.correct ? "#16a34a" : "#dc2626";
        });

      // Add special border for opportunities that used hints
      chartInstance.current.data.datasets[0].pointBorderColor = pathData.map(
        (_, i) => {
          if (i === 0) return "#6b7280";
          if (i === pathData.length - 1) return "#dc2626";
          const response = responseLog[i - 1];
          return response?.hintsUsed > 0
            ? "#f59e0b"
            : response?.correct
            ? "#15803d"
            : "#b91c1c";
        }
      );

      chartInstance.current.data.datasets[0].pointBorderWidth = pathData.map(
        (_, i) => {
          if (i === 0) return 2;
          if (i === pathData.length - 1) return 4;
          const response = responseLog[i - 1];
          return response?.hintsUsed > 0 ? 4 : 2; // Thicker border for hint usage
        }
      );

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
              borderColor: "#f97316",
              backgroundColor: "rgba(249, 115, 22, 0.1)",
              borderWidth: 4,
              fill: false,
              tension: 0.3,
              pointRadius: pathData.map((_, i) =>
                i === pathData.length - 1 ? 12 : 6
              ),
              pointBackgroundColor: pathData.map((_, i) => {
                if (i === 0) return "#6b7280";
                if (i === pathData.length - 1) return "#ef4444";
                const response = responseLog[i - 1];
                return response?.correct ? "#16a34a" : "#dc2626";
              }),
              pointBorderColor: pathData.map((_, i) => {
                if (i === 0) return "#6b7280";
                if (i === pathData.length - 1) return "#dc2626";
                const response = responseLog[i - 1];
                return response?.hintsUsed > 0
                  ? "#f59e0b"
                  : response?.correct
                  ? "#15803d"
                  : "#b91c1c";
              }),
              pointBorderWidth: pathData.map((_, i) => {
                if (i === 0) return 2;
                if (i === pathData.length - 1) return 4;
                const response = responseLog[i - 1];
                return response?.hintsUsed > 0 ? 4 : 2;
              }),
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
                  if (!response) return "";
                  const result = response.correct ? "Correct ✓" : "Incorrect ✗";
                  const hints =
                    response.hintsUsed > 0
                      ? ` (${response.hintsUsed} hint${
                          response.hintsUsed > 1 ? "s" : ""
                        } used 💡)`
                      : "";
                  return `Response: ${result}${hints}`;
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
    params.mu,
    params.rho,
    params.nu,
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
    trackCustomEvent("ifm_dynamic_simulator_entered", {
      initialParams: params,
      slideContext: "IFM Dynamic Simulator",
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
  const currentTotalHints = responseLog.reduce(
    (sum, r) => sum + r.hintsUsed,
    0
  );
  const currentProb = calcProb(
    params.theta,
    params.beta,
    params.mu,
    params.rho,
    params.nu,
    currentSuccesses,
    currentFailures,
    currentTotalHints
  );

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

    trackSliderInteraction(`ifm_dynamic_param_${p}`, newValue, {
      oldValue,
      newValue,
      parameterName: p,
      slideContext: "IFM Dynamic Simulator",
    });
  }

  function addHint() {
    if (!sessionActive) return;
    setPendingHints((prev) => prev + 1);

    trackButtonClick("ifm_add_hint", {
      pendingHints: pendingHints + 1,
      slideContext: "IFM Dynamic Simulator",
    });
  }

  function simulateResponse(isCorrect) {
    if (!sessionActive) return;

    const newSuccesses = isCorrect ? currentSuccesses + 1 : currentSuccesses;
    const newFailures = isCorrect ? currentFailures : currentFailures + 1;
    const newTotalHints = currentTotalHints + pendingHints;
    const newProb = calcProb(
      params.theta,
      params.beta,
      params.mu,
      params.rho,
      params.nu,
      newSuccesses,
      newFailures,
      newTotalHints
    );

    const entry = {
      step: responseLog.length + 1,
      correct: isCorrect,
      hintsUsed: pendingHints,
      probability: newProb,
      successes: newSuccesses,
      failures: newFailures,
      totalHints: newTotalHints,
      timestamp: Date.now(),
    };

    setResponseLog((prev) => [...prev, entry]);
    setRetrainingData((prev) => [...prev, entry]);
    setPendingHints(0); // Reset pending hints after submitting response

    trackButtonClick("ifm_dynamic_simulate_response", {
      isCorrect,
      hintsUsed: pendingHints,
      stepNumber: entry.step,
      newProbability: newProb,
      slideContext: "IFM Dynamic Simulator",
    });
  }

  function endSession() {
    const sessionStats = {
      finalParams: { ...params },
      totalResponses: responseLog.length,
      correctResponses: responseLog.filter((r) => r.correct).length,
      totalHints: currentTotalHints,
      finalProbability: currentProb,
      sessionDuration: responseLog.length
        ? responseLog[responseLog.length - 1].timestamp -
          responseLog[0].timestamp
        : 0,
    };

    setSessionActive(false);

    trackButtonClick("ifm_dynamic_end_session", {
      sessionStats,
      slideContext: "IFM Dynamic Simulator",
    });
  }

  function retrainModel() {
    if (!retrainingData.length) return;

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

    let { theta, beta, mu, rho, nu } = params;

    // Hyperparameters for realistic updates
    const etaTheta = 0.01; // Learning rate for ability
    const etaBeta = 0.01; // Learning rate for difficulty
    const alphaMu = 0.02; // EMA smoothing for success rate
    const alphaRho = 0.02; // EMA smoothing for failure rate
    const alphaNu = 0.02; // EMA smoothing for hint rate
    const lambda = 0.005; // L2 regularization strength
    const maxStepSize = 0.05; // Maximum parameter change per update
    const noiseStd = 0.03; // Process noise standard deviation

    // Prior means (regularization targets)
    const thetaPrior = 0.0;
    const betaPrior = 0.0;
    const muPrior = 0.16;
    const rhoPrior = -0.06;
    const nuPrior = 0.12;

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
    const betaUpdate = etaBeta * (-betaGradient - lambda * (beta - betaPrior)); // Negative gradient if too easy (decrease beta to make harder)
    beta += Math.max(-maxStepSize, Math.min(maxStepSize, betaUpdate));
    beta = Math.max(-2, Math.min(2, beta)); // Enforce bounds

    // IFM-specific: Separate learning rates for successes, failures, and hints
    const windowSize = Math.max(8, Math.floor(total / 2));
    if (total >= windowSize * 2) {
      const early = recent.slice(0, windowSize);
      const late = recent.slice(-windowSize);

      const earlySuccessRate =
        early.reduce((sum, r) => sum + (r.correct ? 1 : 0), 0) / early.length;
      const lateSuccessRate =
        late.reduce((sum, r) => sum + (r.correct ? 1 : 0), 0) / late.length;
      const improvement = lateSuccessRate - earlySuccessRate;

      // Adjust success learning rate based on improvement
      const muSignal =
        muPrior + 0.005 * Math.max(-1, Math.min(1, improvement * 5));
      const muTarget = Math.max(0, Math.min(0.08, muSignal));
      const muUpdate = alphaMu * (muTarget - mu);
      mu += Math.max(-maxStepSize, Math.min(maxStepSize, muUpdate));
      mu = Math.max(0, Math.min(0.08, mu));

      // Adjust failure learning rate inversely to improvement
      const rhoSignal =
        rhoPrior - 0.005 * Math.max(-1, Math.min(1, improvement * 5));
      const rhoTarget = Math.max(-0.08, Math.min(0, rhoSignal));
      const rhoUpdate = alphaRho * (rhoTarget - rho);
      rho += Math.max(-maxStepSize, Math.min(maxStepSize, rhoUpdate));
      rho = Math.max(-0.08, Math.min(0, rho));
    }

    // Special IFM logic: Adjust hint parameter based on hint effectiveness
    let hintEntries = recent.filter((r) => r.hintsUsed > 0);
    let noHintEntries = recent.filter((r) => r.hintsUsed === 0);

    if (hintEntries.length >= 3 && noHintEntries.length >= 3) {
      let hintSuccessRate =
        hintEntries.filter((r) => r.correct).length / hintEntries.length;
      let noHintSuccessRate =
        noHintEntries.filter((r) => r.correct).length / noHintEntries.length;
      let hintEffectiveness = hintSuccessRate - noHintSuccessRate;

      // Adjust hint learning rate based on effectiveness with EMA
      const nuSignal =
        nuPrior + 0.005 * Math.max(-1, Math.min(1, hintEffectiveness * 10));
      const nuTarget = Math.max(0, Math.min(0.08, nuSignal));
      const nuUpdate = alphaNu * (nuTarget - nu);
      nu += Math.max(-maxStepSize, Math.min(maxStepSize, nuUpdate));
      nu = Math.max(0, Math.min(0.08, nu));
    }

    // Add small amount of process noise to prevent deterministic behavior
    const addNoise = (value, bounds) => {
      const noise = (Math.random() - 0.5) * 2 * noiseStd;
      return Math.max(bounds[0], Math.min(bounds[1], value + noise));
    };

    theta = addNoise(theta, [-3, 3]);
    beta = addNoise(beta, [-2, 2]);
    mu = addNoise(mu, [0, 0.08]);
    rho = addNoise(rho, [-0.08, 0]);
    nu = addNoise(nu, [0, 0.08]);

    const newParams = {
      theta: parseFloat(theta.toFixed(2)),
      beta: parseFloat(beta.toFixed(2)),
      mu: parseFloat(mu.toFixed(3)),
      rho: parseFloat(rho.toFixed(3)),
      nu: parseFloat(nu.toFixed(3)),
    };

    setParams(newParams);
    setRetrainingData([]);
    setSessionActive(true);
    setResponseLog([]);
    setLastChangedParam(null);
    setPendingHints(0);

    trackButtonClick("ifm_dynamic_retrain_model", {
      preRetrainParams,
      postRetrainParams: newParams,
      trainingDataCount: retrainDataSnapshot.length,
      recentAccuracy: acc,
      hintUsage: retrainDataSnapshot.reduce(
        (sum, entry) => sum + entry.hintsUsed,
        0
      ),
      slideContext: "IFM Dynamic Simulator",
    });
  }

  function resetAll() {
    setParams(paramDefaults);
    setSessionActive(true);
    setResponseLog([]);
    setRetrainingData([]);
    setLastChangedParam(null);
    setPendingHints(0);

    trackButtonClick("ifm_dynamic_reset_all", {
      slideContext: "IFM Dynamic Simulator",
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

        <div className="border-l-8 border-orange-600 bg-orange-100 p-3 rounded-r-lg">
          <div className="text-orange-800 font-bold text-sm tracking-wide">
            CURRENT VALUE:{" "}
            {["mu", "rho", "nu"].includes(showTooltip)
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
      mu: "text-green-700",
      rho: "text-red-700",
      nu: "text-orange-700",
    };
    return colors[param] || "text-black";
  };

  return (
    <div className="bg-white min-h-screen flex flex-col text-black font-['IBM_Plex_Mono',monospace]">
      {/* Header */}
      <div className="border-b-8 border-black bg-gradient-to-r from-orange-400 to-red-400 px-8 py-6 shadow-lg">
        <div className="flex items-center justify-center">
          <span className="text-black font-bold text-2xl uppercase tracking-wider">
            IFM: Real-Time Learning Path
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-8 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Introduction */}
          <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg">
            <p className="text-lg text-black leading-relaxed text-center">
              Experience the most sophisticated approach - <strong>IFM</strong>{" "}
              in real-time! Unlike PFM, IFM recognizes instructional supports
              (hints) that accumulate within each learning opportunity.
              <br />
              <strong>IFM Innovation:</strong> Add hints to your current
              opportunity before responding to see their cumulative learning
              effect!
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

              {/* Add Hint Button */}
              {sessionActive && (
                <div className="mb-6 p-4 border-4 border-orange-600 rounded-xl bg-orange-50">
                  <div className="text-center mb-4">
                    <p className="text-orange-800 font-bold mb-2 text-sm">
                      Add instructional support to this opportunity:
                    </p>
                    <button
                      onClick={addHint}
                      disabled={!sessionActive}
                      className={`w-full px-4 py-3 bg-orange-600 text-white border-4 border-black rounded-xl font-bold uppercase tracking-wide transition-all transform hover:scale-105 ${
                        !sessionActive
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-white hover:text-orange-600"
                      }`}
                    >
                      Add Hint ({pendingHints})
                    </button>
                  </div>
                  <p className="text-orange-700 text-xs text-center font-bold">
                    Hints accumulate within the same opportunity!
                  </p>
                </div>
              )}

              {/* Response Buttons */}
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
                  ✓ Got It Right
                  {pendingHints > 0 && (
                    <div className="text-sm">
                      + {pendingHints} hint{pendingHints > 1 ? "s" : ""}
                    </div>
                  )}
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
                  ✗ Got It Wrong
                  {pendingHints > 0 && (
                    <div className="text-sm">
                      + {pendingHints} hint{pendingHints > 1 ? "s" : ""}
                    </div>
                  )}
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
                      IFM Retraining Ready
                    </h4>
                  </div>
                  <p className="text-yellow-800 font-bold mb-4 text-sm">
                    {retrainingData.length} opportunities collected. Ready to
                    update IFM parameters based on your success/failure/hint
                    patterns.
                  </p>
                  <button
                    onClick={retrainModel}
                    className="w-full px-4 py-3 bg-yellow-600 text-white border-4 border-black rounded-xl font-bold uppercase tracking-wide hover:bg-white hover:text-yellow-600 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-5 h-5" />
                    Retrain IFM Model
                  </button>
                </div>
              )}

              {/* Response History */}
              <div className="border-l-8 border-orange-600 bg-orange-100 rounded-r-xl p-4">
                <h4 className="font-bold text-orange-800 mb-3 text-lg uppercase">
                  Recent Responses
                </h4>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {responseLog.length === 0 ? (
                    <div className="text-orange-700 text-center py-2 font-bold">
                      Your IFM learning journey starts here!
                    </div>
                  ) : (
                    responseLog
                      .slice(-5)
                      .reverse()
                      .map((entry, i) => {
                        const bgColor = entry.correct
                          ? "bg-green-200"
                          : "bg-red-200";
                        const borderColor =
                          entry.hintsUsed > 0
                            ? entry.correct
                              ? "border-l-4 border-green-700 border-r-4 border-orange-500"
                              : "border-l-4 border-red-700 border-r-4 border-orange-500"
                            : entry.correct
                            ? "border-l-4 border-green-700"
                            : "border-l-4 border-red-700";
                        const textColor = entry.correct
                          ? "text-green-900"
                          : "text-red-900";
                        const icon = entry.correct ? "✓ Success" : "✗ Failure";

                        return (
                          <div
                            key={entry.step}
                            className={`${bgColor} ${borderColor} ${textColor} rounded-r-lg font-mono px-3 py-2`}
                          >
                            <div className="font-bold text-sm">
                              Opp. {entry.step}: {icon}
                              {entry.hintsUsed > 0 && (
                                <span className="text-orange-700">
                                  {" "}
                                  (+{entry.hintsUsed})
                                </span>
                              )}
                            </div>
                            <div className="text-xs">
                              Prob: {(entry.probability * 100).toFixed(1)}%
                            </div>
                          </div>
                        );
                      })
                  )}
                </div>
              </div>
            </div>

            {/* Middle Column - Parameters */}
            <div className="border-4 border-black rounded-xl p-6 bg-white shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <Brain className="w-6 h-6 text-orange-700" />
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
                        disabled={!sessionActive}
                        onChange={(e) => setParam(key, e.target.value)}
                        className={`flex-1 h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer border-2 border-black ${
                          !sessionActive ? "opacity-50" : ""
                        }`}
                      />
                      <span
                        className={`font-mono w-14 text-center font-bold text-sm border-2 border-black rounded px-1 py-1 bg-gray-50 transition-all duration-500 ${
                          lastChangedParam === key
                            ? "bg-yellow-300 text-yellow-900 border-yellow-500 scale-110"
                            : `text-${meta.color}-800`
                        }`}
                      >
                        {["mu", "rho", "nu"].includes(key)
                          ? params[key].toFixed(2)
                          : params[key]}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Success Probability Display */}
              <div className="mt-6 p-4 border-4 border-orange-600 rounded-xl bg-orange-50">
                <div className="text-center mb-3">
                  <span className="text-black font-bold text-sm">
                    SUCCESS PROBABILITY
                  </span>
                </div>
                <div className="text-2xl font-bold text-orange-600 text-center mb-3">
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
              <div className="mt-6 grid grid-cols-3 gap-2">
                <div className="bg-green-200 border-2 border-green-600 rounded-lg p-3 text-center">
                  <div className="font-bold text-green-800 text-xs">
                    SUCCESSES
                  </div>
                  <div className="text-xl font-bold text-green-600">
                    {currentSuccesses}
                  </div>
                </div>
                <div className="bg-red-200 border-2 border-red-600 rounded-lg p-3 text-center">
                  <div className="font-bold text-red-800 text-xs">FAILURES</div>
                  <div className="text-xl font-bold text-red-600">
                    {currentFailures}
                  </div>
                </div>
                <div className="bg-orange-200 border-2 border-orange-600 rounded-lg p-3 text-center">
                  <div className="font-bold text-orange-800 text-xs">HINTS</div>
                  <div className="text-xl font-bold text-orange-600">
                    {currentTotalHints}
                  </div>
                </div>
              </div>

              {/* Current Opportunity Section */}
              <div className="mt-4 p-3 border-4 border-blue-600 rounded-xl bg-blue-50">
                <div className="text-blue-800 font-bold text-sm mb-2 text-center">
                  CURRENT OPPORTUNITY
                </div>
                <div className="flex justify-center items-center gap-2 text-sm">
                  <span className="text-blue-700 font-bold">
                    Pending hints:
                  </span>
                  <span className="text-xl font-bold text-blue-600 px-2 py-1 bg-white border-2 border-blue-600 rounded">
                    {pendingHints}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column - Chart */}
            <div className="border-4 border-black rounded-xl p-6 bg-white shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <LineChart className="w-6 h-6 text-orange-700" />
                <h3 className="text-xl font-bold text-black uppercase tracking-wide">
                  Learning Curve
                </h3>
              </div>

              <div className="h-64 w-full bg-gray-50 border-4 border-black rounded-lg p-4">
                <canvas ref={chartRef} />
              </div>

              <div className="mt-4 p-3 border-4 border-orange-600 rounded-lg bg-orange-50 text-center">
                <div className="font-bold text-orange-800 text-sm mb-2">
                  Journey Progress: {responseLog.length} opportunities completed
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
                    <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-orange-500"></div>
                    <span>+Hints</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Formula Section - Full Width */}
          <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <Calculator className="w-6 h-6 text-orange-700" />
              <h3 className="text-xl font-bold text-black uppercase tracking-wide">
                IFM Formula
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
                  <strong>2.</strong> logit = θ + β + μ × S + ρ × F + ν × H
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
                      "mu"
                    )}`}
                  >
                    {params.mu.toFixed(2)}
                  </span>
                  ×
                  <span className="mx-1 px-2 py-1 rounded font-bold bg-green-200 text-green-800">
                    {currentSuccesses}
                  </span>
                  +
                  <span
                    className={`mx-1 px-2 py-1 rounded font-bold transition-all duration-500 ${getParamColor(
                      "rho"
                    )}`}
                  >
                    ({params.rho.toFixed(2)})
                  </span>
                  ×
                  <span className="mx-1 px-2 py-1 rounded font-bold bg-red-200 text-red-800">
                    {currentFailures}
                  </span>
                  +
                  <span
                    className={`mx-1 px-2 py-1 rounded font-bold transition-all duration-500 ${getParamColor(
                      "nu"
                    )}`}
                  >
                    {params.nu.toFixed(2)}
                  </span>
                  ×
                  <span className="mx-1 px-2 py-1 rounded font-bold bg-orange-200 text-orange-800">
                    {currentTotalHints}
                  </span>
                </div>

                {/* Step 4: Calculate logit */}
                <div className="text-base font-mono mb-2">
                  <strong>4.</strong> logit ={" "}
                  {(
                    params.theta -
                    params.beta +
                    params.mu * currentSuccesses +
                    params.rho * currentFailures +
                    params.nu * currentTotalHints
                  ).toFixed(3)}
                </div>

                {/* Step 5: Final probability */}
                <div className="text-lg font-bold text-orange-600 border-t-2 border-orange-300 pt-2">
                  <strong>5.</strong> P(success) ={" "}
                  {(currentProb * 100).toFixed(1)}%
                </div>
              </div>
            </div>

            {/* Parameter Legend */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
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
                  μ = Success Rate
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-200 border-2 border-red-700 rounded"></div>
                <span className="font-bold text-red-700">ρ = Failure Rate</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-orange-200 border-2 border-orange-700 rounded"></div>
                <span className="font-bold text-orange-700">ν = Hint Rate</span>
              </div>
            </div>
          </div>

          {/* Key Insights */}
          <div className="border-4 border-black rounded-xl p-8 bg-gradient-to-r from-orange-100 to-red-100 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <Lightbulb className="w-6 h-6 text-orange-700" />
              <h3 className="text-2xl font-bold text-black uppercase tracking-wide">
                IFM: Real-Time Learning and Retraining
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border-4 border-green-600 rounded-xl p-6 bg-green-50">
                <h4 className="font-bold text-green-800 mb-4 text-xl uppercase tracking-wide">
                  During Session
                </h4>
                <ul className="space-y-2 text-black font-bold">
                  <li>• θ, β, μ, ρ, ν stay constant (no tuning!)</li>
                  <li>
                    • Each opportunity updates success/failure/hint counts
                  </li>
                  <li>• Success probability updates in real-time</li>
                  <li>• Model tracks instructional patterns for retraining</li>
                </ul>
              </div>

              <div className="border-4 border-orange-600 rounded-xl p-6 bg-orange-50">
                <h4 className="font-bold text-orange-800 mb-4 text-xl uppercase tracking-wide">
                  During Retrain
                </h4>
                <ul className="space-y-2 text-black font-bold">
                  <li>• θ, β updated based on overall performance</li>
                  <li>• μ, ρ adjusted based on success/failure patterns</li>
                  <li>• ν tuned based on hint effectiveness analysis</li>
                  <li>
                    • Most sophisticated: accounts for instructional support
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center">
            <button
              onClick={() => {
                trackButtonClick("ifm_dynamic_continue", {
                  finalJourney: responseLog,
                  totalOpportunities: responseLog.length,
                  finalProbability: currentProb,
                  totalHints: currentTotalHints,
                  slideContext: "IFM Dynamic Simulator",
                });
                navigate(23);
              }}
              className="px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105 flex items-center gap-3"
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
