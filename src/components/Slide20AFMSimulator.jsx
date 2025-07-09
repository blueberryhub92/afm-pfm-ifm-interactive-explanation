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
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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

const Layout = ({ children }) => (
  <div className="bg-white min-h-screen font-mono relative">
    {/* Grid background */}
    <div 
      className="absolute inset-0 opacity-60"
      style={{
        backgroundImage: 'linear-gradient(to right, #d1d5db 1px, transparent 1px), linear-gradient(to bottom, #d1d5db 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }}
    />
    
    <div className="relative flex-1 px-8 py-8">{children}</div>
  </div>
);

const TechnicalCard = ({ title, children, config, icon: Icon, size = "normal" }) => {
  const sizeClasses = {
    normal: "",
    wide: "col-span-2",
    large: "col-span-2 row-span-2"
  };

  return (
    <div className={`${sizeClasses[size]} bg-white text-black border-2 border-black p-6 relative`}>
      {/* Technical drawing corner marker */}
      <div className="absolute top-2 right-2 w-2 h-2 border border-black bg-white" />
      
      {/* Title section */}
      <div className="flex items-center gap-2 mb-4">
        {Icon && <Icon className="w-5 h-5" />}
        <h3 className="text-lg font-bold text-black tracking-wider uppercase">
          {title}
        </h3>
        {config && (
          <span className="text-xs font-mono text-gray-600 ml-auto">
            {config}
          </span>
        )}
      </div>
      
      {children}
    </div>
  );
};

export const Slide20AFMSimulator = ({scroll}) => {
  // State
  const [params, setParams] = useState(paramDefaults);
  const [sessionActive, setSessionActive] = useState(true);
  const [responseLog, setResponseLog] = useState([]);
  const [retrainingData, setRetrainingData] = useState([]);
  const [showTooltip, setShowTooltip] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  // Keyboard: Escape closes tooltip
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") setShowTooltip(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Derived
  const logit = params.theta - params.beta + params.gamma * params.practice;
  const prob = calcProb(
    params.theta,
    params.beta,
    params.gamma,
    params.practice
  );

  // Chart data
  const chartData = {
    labels: Array.from({ length: 21 }, (_, i) => i),
    datasets: [
      {
        label: "Success Probability (%)",
        data: Array.from({ length: 21 }, (_, i) => 
          calcProb(params.theta, params.beta, params.gamma, i) * 100
        ),
        borderColor: "#000000",
        borderWidth: 3,
        fill: false,
        tension: 0.1,
        pointRadius: Array.from({ length: 21 }, (_, i) => (i === params.practice ? 8 : 0)),
        pointBackgroundColor: Array.from({ length: 21 }, (_, i) => 
          (i === params.practice ? "#ef4444" : "#000000")
        ),
        pointBorderColor: Array.from({ length: 21 }, (_, i) => 
          (i === params.practice ? "#dc2626" : "#000000")
        ),
        pointBorderWidth: Array.from({ length: 21 }, (_, i) => 
          (i === params.practice ? 3 : 0)
        ),
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: "PRACTICE (T)",
          color: "#000",
          font: { weight: 700, size: 12, family: "monospace" },
        },
        grid: {
          color: "#d1d5db",
          lineWidth: 1,
        },
        ticks: {
          color: "#000",
          font: { family: "monospace", weight: 600 },
        },
      },
      y: {
        title: {
          display: true,
          text: "SUCCESS PROBABILITY (%)",
          color: "#000",
          font: { weight: 700, size: 12, family: "monospace" },
        },
        min: 0,
        max: 100,
        ticks: { 
          stepSize: 20,
          color: "#000",
          font: { family: "monospace", weight: 600 },
        },
        grid: {
          color: "#d1d5db",
          lineWidth: 1,
        },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
    animation: {
      duration: 200,
    },
  };

  // Handlers
  function setParam(p, v) {
    if (!sessionActive && p !== "practice") return;
    setParams((prev) => ({
      ...prev,
      [p]: p === "practice" ? parseInt(v, 10) : parseFloat(v),
    }));
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
  }

  function retrainModel() {
    if (!retrainingData.length) return;
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
      beta = Math.max(-2, beta - 0.4);
    } else if (acc > 0.6) {
      beta = Math.max(-2, beta - 0.2);
    } else if (acc < 0.3) {
      beta = Math.min(2, beta + 0.4);
    } else if (acc < 0.5) {
      beta = Math.min(2, beta + 0.2);
    }

    if (avgErr > 0.3) {
      if (acc < 0.5) {
        beta = Math.min(2, beta + 0.3);
      } else {
        beta = Math.max(-2, beta - 0.2);
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

    setParams({
      theta: parseFloat(theta.toFixed(1)),
      beta: parseFloat(beta.toFixed(1)),
      gamma: parseFloat(gamma.toFixed(2)),
      practice: 0,
    });
    setRetrainingData([]);
    setSessionActive(true);
  }

  function resetAll() {
    setParams(paramDefaults);
    setSessionActive(true);
    setResponseLog([]);
    setRetrainingData([]);
  }

  function endSession() {
    setSessionActive(false);
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
        className="fixed z-50 bg-white border-2 border-black shadow-lg p-6 w-96 font-mono"
        style={{
          left: `${tooltipPosition.x}px`,
          top: `${tooltipPosition.y}px`,
          maxWidth: "384px",
        }}
      >
        {/* Technical corner brackets */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-black"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-black"></div>

        <div className="flex items-center gap-2 mb-4">
          {meta.icon}
          <h4 className="font-bold text-black text-lg tracking-wide uppercase">
            {meta.tooltip.title}
          </h4>
        </div>

        <div className="border-2 border-black p-4 bg-gray-100 mb-4">
          <p className="text-black font-mono text-sm leading-relaxed">
            {meta.tooltip.desc}
          </p>
        </div>

        <div className="border-l-4 border-black bg-gray-200 p-3">
          <div className="text-black font-bold text-sm tracking-wide uppercase">
            CURRENT VALUE:{" "}
            {showTooltip === "gamma"
              ? params[showTooltip].toFixed(2)
              : params[showTooltip]}
          </div>
        </div>

        <button
          onClick={() => setShowTooltip(null)}
          className="absolute top-2 right-2 px-2 py-1 border border-black bg-white text-black font-bold hover:bg-black hover:text-white transition-all"
        >
          ×
        </button>
      </div>
    );
  };

  // UI
  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-8">
        

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Formula Card */}
          <TechnicalCard
            title="AFM Formula"
            config="CALC-001"
            icon={Calculator}
            size="normal"
          >
            <div className="space-y-4">
              <div className="text-center p-4 bg-black text-white font-bold text-xl">
                P = {(prob * 100).toFixed(1)}%
              </div>

              <div className="bg-gray-100 border-2 border-black p-4 space-y-1 font-mono text-sm">
                <div><strong>STEP 1:</strong> LOGIT = θ - β + γ × T</div>
                <div><strong>STEP 2:</strong> LOGIT = {params.theta.toFixed(1)} - ({params.beta.toFixed(1)}) + {params.gamma.toFixed(2)} × {params.practice}</div>
                <div><strong>STEP 3:</strong> LOGIT = {logit.toFixed(3)}</div>
                <div><strong>STEP 4:</strong> P = 1 / (1 + e⁻ˡᵒᵍⁱᵗ)</div>
                <div className="text-lg font-bold mt-2 p-2 bg-white border border-black">
                  <strong>RESULT:</strong> P = {(prob * 100).toFixed(1)}%
                </div>
              </div>
            </div>
          </TechnicalCard>

          {/* Parameters Card */}
          <TechnicalCard
            title="Model Parameters"
            config="PARAM-001"
            icon={Brain}
            size="normal"
          >
            <div className="space-y-4">
              {Object.entries(paramMeta).map(([key, meta]) => (
                <div key={key} className="space-y-2">
                  <label
                    className="font-bold text-black flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-1 transition-colors text-sm uppercase tracking-wide"
                    onClick={() => handleTooltipShow(key)}
                  >
                    {meta.icon}
                    {meta.label}
                  </label>

                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min={meta.min}
                      max={meta.max}
                      step={meta.step}
                      value={params[key]}
                      disabled={!sessionActive && key !== "practice"}
                      onChange={(e) => setParam(key, e.target.value)}
                      className={`flex-1 h-2 bg-gray-200 appearance-none cursor-pointer border border-black ${
                        !sessionActive && key !== "practice"
                          ? "opacity-50"
                          : ""
                      }`}
                    />
                    <span className="font-mono w-12 text-center text-black font-bold text-sm border border-black px-2 py-1 bg-white">
                      {key === "gamma"
                        ? params[key].toFixed(2)
                        : params[key]}
                    </span>
                  </div>
                </div>
              ))}

              {/* Success Probability Display */}
              <div className="mt-6 p-4 border-2 border-black bg-gray-100">
                <div className="text-center mb-2">
                  <span className="text-black font-bold text-sm uppercase tracking-wide">
                    SUCCESS PROBABILITY
                  </span>
                </div>
                <div className="text-3xl font-bold text-black text-center mb-2">
                  {(prob * 100).toFixed(1)}%
                </div>
                <div className="w-full bg-gray-300 border-2 border-black h-4">
                  <div
                    className="h-full bg-black transition-all duration-300"
                    style={{ width: `${(prob * 100).toFixed(0)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </TechnicalCard>

          {/* Chart Card */}
          <TechnicalCard
            title="Learning Curve"
            config="CHART-001"
            icon={LineChart}
            size="normal"
          >
            <div className="space-y-4">
              <div className="h-64 w-full bg-gray-100 border-2 border-black p-2">
                <Line data={chartData} options={chartOptions} />
              </div>

              <div className="p-3 border-2 border-black bg-gray-100 text-center">
                <div className="font-bold text-black text-sm uppercase tracking-wide">
                  CURRENT: T={params.practice} | P={(prob * 100).toFixed(1)}%
                </div>
              </div>
            </div>
          </TechnicalCard>
        </div>

        {/* Session Controls */}
        <TechnicalCard
          title={sessionActive ? "Learning Session Active" : "Session Ended"}
          config="CTRL-001"
          icon={sessionActive ? Play : Database}
          size="wide"
        >
          <div className="space-y-6">
            {/* Status Indicator */}
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 border-2 border-black ${sessionActive ? "bg-black animate-pulse" : "bg-gray-400"}`}></div>
              <span className="font-mono text-sm uppercase tracking-wide">
                {sessionActive ? "SIMULATION RUNNING" : "AWAITING RETRAIN"}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <button
                onClick={() => simulateResponse(true)}
                disabled={!sessionActive}
                className={`px-4 py-3 bg-white text-black border-2 border-black font-bold uppercase tracking-wide transition-all hover:bg-black hover:text-white ${
                  !sessionActive ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                ✓ CORRECT
              </button>

              <button
                onClick={() => simulateResponse(false)}
                disabled={!sessionActive}
                className={`px-4 py-3 bg-white text-black border-2 border-black font-bold uppercase tracking-wide transition-all hover:bg-black hover:text-white ${
                  !sessionActive ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                ✗ INCORRECT
              </button>

              <button
                onClick={endSession}
                disabled={!sessionActive}
                className={`px-4 py-3 bg-white text-black border-2 border-black font-bold uppercase tracking-wide transition-all hover:bg-black hover:text-white ${
                  !sessionActive ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                END SESSION
              </button>

              <button
                onClick={resetAll}
                className="px-4 py-3 bg-white text-black border-2 border-black font-bold uppercase tracking-wide hover:bg-black hover:text-white transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                RESET
              </button>
            </div>

            {/* Retrain Section */}
            {!sessionActive && retrainingData.length > 0 && (
              <div className="border-2 border-black p-4 bg-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <RefreshCw className="w-5 h-5" />
                  <h4 className="font-bold text-black text-lg uppercase tracking-wide">
                    RETRAINING READY
                  </h4>
                </div>
                <p className="text-black font-mono text-sm mb-4">
                  {retrainingData.length} RESPONSES COLLECTED • READY TO UPDATE MODEL PARAMETERS
                </p>
                <button
                  onClick={retrainModel}
                  className="w-full px-4 py-3 bg-black text-white border-2 border-black font-bold uppercase tracking-wide hover:bg-white hover:text-black transition-all"
                >
                  RETRAIN MODEL
                </button>
              </div>
            )}

            {/* Response Log */}
            <div className="border-l-4 border-black bg-gray-100 p-4">
              <h4 className="font-bold text-black mb-3 text-lg uppercase tracking-wide">
                RESPONSE LOG
              </h4>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {responseLog.length === 0 ? (
                  <div className="text-black text-center py-2 font-mono text-sm">
                    NO RESPONSES YET - SIMULATE SOME ANSWERS
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
                            ? "bg-white border-l-4 border-black"
                            : "bg-gray-200 border-l-4 border-black"
                        } font-mono px-3 py-2 text-sm`}
                      >
                        <div className="font-bold">
                          T={entry.practice}: {entry.correct ? "✓ CORRECT" : "✗ INCORRECT"}
                        </div>
                        <div className="text-xs">
                          PREDICTED: {(entry.probability * 100).toFixed(1)}%
                        </div>
                      </div>
                    ))
                )}
              </div>
            </div>
          </div>
        </TechnicalCard>

        {/* Key Insights */}
        <TechnicalCard
          title="AFM: What Happens When?"
          config="INFO-001"
          icon={Lightbulb}
          size="wide"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-2 border-black p-4 bg-gray-100">
              <h4 className="font-bold text-black mb-3 text-lg uppercase tracking-wide">
                DURING SESSION
              </h4>
              <ul className="space-y-2 text-black font-mono text-sm">
                <li>• θ, β, γ STAY CONSTANT (NO TUNING)</li>
                <li>• ONLY PRACTICE (T) INCREMENTS PER ATTEMPT</li>
                <li>• SUCCESS PROBABILITY UPDATES LIVE</li>
                <li>• MODEL TRACKS PERFORMANCE FOR RETRAINING</li>
              </ul>
            </div>

            <div className="border-2 border-black p-4 bg-gray-100">
              <h4 className="font-bold text-black mb-3 text-lg uppercase tracking-wide">
                DURING RETRAIN
              </h4>
              <ul className="space-y-2 text-black font-mono text-sm">
                <li>• θ, β, γ UPDATED BASED ON PERFORMANCE</li>
                <li>• PAST RESPONSES USED FOR TUNING</li>
                <li>• MODEL LEARNS FROM COLLECTED DATA</li>
                <li>• PRACTICE COUNTER RESETS TO ZERO</li>
              </ul>
            </div>
          </div>
        </TechnicalCard>

        {/* Continue Button */}
        <div className="flex justify-center pt-2">
          <button
            className="px-12 py-4 bg-black text-white border-2 border-black font-bold uppercase tracking-wide hover:bg-white hover:text-black transition-all flex items-center gap-3 text-lg"
            onClick={() => scroll(16)}
          >
            CONTINUE
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <ParameterTooltip />
    </Layout>
  );
}