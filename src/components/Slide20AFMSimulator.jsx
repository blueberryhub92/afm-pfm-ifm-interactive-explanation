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
  Zap,
  Activity,
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
    color: "cyan",
    icon: <Brain className="w-4 h-4" />,
    tooltip: {
      color: "cyan",
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
    icon: <Target className="w-4 h-4" />,
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
    icon: <TrendingUp className="w-4 h-4" />,
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
    icon: <Play className="w-4 h-4" />,
    tooltip: {
      color: "orange",
      title: "Practice Opportunities (T)",
      desc: "How many times practiced. Only increases in-session.",
    },
  },
};

const PixelCard = ({ title, children, tagColor, tagIcon: TagIcon, size = "normal" }) => {
  const sizeClasses = {
    normal: "",
    wide: "col-span-2",
    large: "col-span-2 row-span-2"
  };

  return (
    <div className={`${sizeClasses[size]} bg-gray-800 border-4 border-${tagColor}-400 p-6 pixel-shadow relative`}>
      {/* Pixel corner brackets */}
      <div className={`absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-${tagColor}-400`}></div>
      <div className={`absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-${tagColor}-400`}></div>
      <div className={`absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-${tagColor}-400`}></div>
      <div className={`absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-${tagColor}-400`}></div>
      
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className={`w-full h-full bg-gradient-to-r from-${tagColor}-400 via-blue-500 to-purple-600 animate-pulse`} />
      </div>
      
      <div className={`bg-${tagColor}-600 border-2 border-${tagColor}-400 px-4 py-2 mb-6 pixel-shadow inline-flex items-center gap-2`}>
        {TagIcon && <TagIcon className="w-4 h-4 text-white" />}
        <span className="text-white font-bold text-sm tracking-wider uppercase">{title}</span>
      </div>
      
      <div className="relative z-10">
        {children}
      </div>
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
  const [hoveredTerm, setHoveredTerm] = useState(null);

  // Keyboard: Escape closes tooltip
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") {
        setShowTooltip(null);
        setHoveredTerm(null);
      }
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

  // Chart data with pixel-style colors
  const chartData = {
    labels: Array.from({ length: 21 }, (_, i) => i),
    datasets: [
      {
        label: "Success Probability (%)",
        data: Array.from({ length: 21 }, (_, i) => 
          calcProb(params.theta, params.beta, params.gamma, i) * 100
        ),
        borderColor: "#00ffff",
        borderWidth: 3,
        fill: false,
        tension: 0.1,
        pointRadius: Array.from({ length: 21 }, (_, i) => (i === params.practice ? 8 : 0)),
        pointBackgroundColor: Array.from({ length: 21 }, (_, i) => 
          (i === params.practice ? "#ff0080" : "#00ffff")
        ),
        pointBorderColor: Array.from({ length: 21 }, (_, i) => 
          (i === params.practice ? "#ff0080" : "#00ffff")
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
          color: "#00ffff",
          font: { weight: 700, size: 12, family: "monospace" },
        },
        grid: {
          color: "#374151",
          lineWidth: 1,
        },
        ticks: {
          color: "#ffffff",
          font: { family: "monospace", weight: 600 },
        },
      },
      y: {
        title: {
          display: true,
          text: "SUCCESS PROBABILITY (%)",
          color: "#00ffff",
          font: { weight: 700, size: 12, family: "monospace" },
        },
        min: 0,
        max: 100,
        ticks: { 
          stepSize: 20,
          color: "#ffffff",
          font: { family: "monospace", weight: 600 },
        },
        grid: {
          color: "#374151",
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

  const handleMouseEnter = (term) => {
    setHoveredTerm(term);
  };

  const ParameterTooltip = ({ param }) => {
    const meta = paramMeta[param];
    const colorMap = {
      cyan: 'cyan',
      purple: 'purple',
      green: 'green',
      orange: 'orange'
    };
    const color = colorMap[meta.color] || 'cyan';

    return (
      <div className={`fixed z-50 top-8 right-4 bg-gray-800 border-4 border-${color}-400 pixel-shadow font-mono w-96`}>
        {/* Pixel corner brackets */}
        <div className={`absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-${color}-400`}></div>
        <div className={`absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-${color}-400`}></div>
        <div className={`absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-${color}-400`}></div>
        <div className={`absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-${color}-400`}></div>
        
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className={`w-full h-full bg-gradient-to-r from-${color}-400 via-blue-500 to-purple-600 animate-pulse`} />
        </div>
        
        <div className="relative z-10 p-6">
          <div className={`bg-${color}-600 border-2 border-${color}-400 px-3 py-1 mb-4 pixel-shadow inline-flex items-center gap-2`}>
            {meta.icon}
            <span className="text-white font-bold text-xs tracking-wider uppercase">{meta.tooltip.title}</span>
          </div>
          
          <p className="text-green-400 text-sm leading-relaxed mb-4 font-mono pixel-text">
            &gt; {meta.tooltip.desc.toUpperCase()}
          </p>
          
          <div className="border-2 border-yellow-400 bg-gray-700 p-3 pixel-shadow">
            <strong className="text-yellow-400">CURRENT VALUE:</strong>{" "}
            <span className="text-white">
              {param === "gamma" ? params[param].toFixed(2) : params[param]}
            </span>
          </div>
          
          <button
            onClick={() => setHoveredTerm(null)}
            className="absolute top-2 right-2 w-8 h-8 bg-red-600 border-2 border-red-400 text-white font-bold hover:bg-red-400 transition-colors pixel-shadow flex items-center justify-center"
          >
            X
          </button>
        </div>
      </div>
    );
  };

  // UI
  return (
    <div className="bg-gray-900 min-h-screen font-mono relative overflow-hidden">
      {/* Pixel grid background */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'linear-gradient(to right, #1f2937 1px, transparent 1px), linear-gradient(to bottom, #1f2937 1px, transparent 1px)',
          backgroundSize: '8px 8px'
        }}
      />
      
      {/* Animated pixel stars */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative flex flex-col items-center justify-center py-8 px-4 md:px-10 min-h-screen">
        <div className="w-full max-w-7xl mx-auto space-y-8">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-cyan-400 mb-2 pixel-text uppercase tracking-wide">
              AFM SIMULATOR
            </h1>
            <p className="text-green-400 font-mono pixel-text">
              &gt; INTERACTIVE ADAPTIVE FACTOR MODEL
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Formula Card */}
            <PixelCard
              title="AFM Formula"
              tagColor="cyan"
              tagIcon={Calculator}
              size="normal"
            >
              <div className="space-y-4">
                <div className="text-center p-4 bg-gray-700 border-2 border-cyan-400 text-cyan-400 font-bold text-xl pixel-shadow">
                  P = {(prob * 100).toFixed(1)}%
                </div>

                <div className="bg-gray-700 border-2 border-gray-600 p-4 space-y-2 font-mono text-sm pixel-shadow">
                  <div className="text-green-400 pixel-text">
                    <strong>&gt; STEP 1:</strong> <span className="text-white">LOGIT = θ - β + γ × T</span>
                  </div>
                  <div className="text-green-400 pixel-text">
                    <strong>&gt; STEP 2:</strong> <span className="text-white">LOGIT = {params.theta.toFixed(1)} - ({params.beta.toFixed(1)}) + {params.gamma.toFixed(2)} × {params.practice}</span>
                  </div>
                  <div className="text-green-400 pixel-text">
                    <strong>&gt; STEP 3:</strong> <span className="text-white">LOGIT = {logit.toFixed(3)}</span>
                  </div>
                  <div className="text-green-400 pixel-text">
                    <strong>&gt; STEP 4:</strong> <span className="text-white">P = 1 / (1 + e⁻ˡᵒᵍⁱᵗ)</span>
                  </div>
                  <div className="text-lg font-bold mt-2 p-2 bg-gray-600 border-2 border-cyan-400 pixel-shadow">
                    <span className="text-yellow-400 pixel-text">
                      <strong>&gt; RESULT:</strong> <span className="text-cyan-400">P = {(prob * 100).toFixed(1)}%</span>
                    </span>
                  </div>
                </div>
              </div>
            </PixelCard>

            {/* Parameters Card */}
            <PixelCard
              title="Model Parameters"
              tagColor="purple"
              tagIcon={Brain}
              size="normal"
            >
              <div className="space-y-4">
                {Object.entries(paramMeta).map(([key, meta]) => (
                  <div key={key} className="space-y-2">
                    <label
                      className="font-bold text-cyan-400 flex items-center gap-2 cursor-pointer hover:bg-gray-700 p-2 transition-colors text-sm uppercase tracking-wide pixel-text pixel-shadow"
                      onClick={() => handleMouseEnter(key)}
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
                        className={`flex-1 h-3 bg-gray-700 appearance-none cursor-pointer border-2 border-gray-600 ${
                          !sessionActive && key !== "practice"
                            ? "opacity-50"
                            : ""
                        }`}
                        style={{
                          background: `linear-gradient(to right, #00ffff 0%, #00ffff ${((params[key] - meta.min) / (meta.max - meta.min)) * 100}%, #374151 ${((params[key] - meta.min) / (meta.max - meta.min)) * 100}%, #374151 100%)`
                        }}
                      />
                      <span className="font-mono w-12 text-center text-white font-bold text-sm border-2 border-gray-600 px-2 py-1 bg-gray-700 pixel-shadow">
                        {key === "gamma"
                          ? params[key].toFixed(2)
                          : params[key]}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Success Probability Display */}
                <div className="mt-6 p-4 border-2 border-green-400 bg-gray-700 pixel-shadow">
                  <div className="text-center mb-2">
                    <span className="text-green-400 font-bold text-sm uppercase tracking-wide pixel-text">
                      SUCCESS PROBABILITY
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-cyan-400 text-center mb-2 pixel-text">
                    {(prob * 100).toFixed(1)}%
                  </div>
                  <div className="w-full bg-gray-600 border-2 border-gray-500 h-4 pixel-shadow">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-400 to-green-400 transition-all duration-300"
                      style={{ width: `${(prob * 100).toFixed(0)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </PixelCard>

            {/* Chart Card */}
            <PixelCard
              title="Learning Curve"
              tagColor="green"
              tagIcon={LineChart}
              size="normal"
            >
              <div className="space-y-4">
                <div className="h-64 w-full bg-gray-700 border-2 border-green-400 p-2 pixel-shadow">
                  <Line data={chartData} options={chartOptions} />
                </div>

                <div className="p-3 border-2 border-green-400 bg-gray-700 text-center pixel-shadow">
                  <div className="font-bold text-green-400 text-sm uppercase tracking-wide pixel-text">
                    CURRENT: T={params.practice} | P={(prob * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            </PixelCard>
          </div>

          {/* Session Controls */}
          <PixelCard
            title={sessionActive ? "Learning Session Active" : "Session Ended"}
            tagColor="orange"
            tagIcon={sessionActive ? Play : Database}
            size="wide"
          >
            <div className="space-y-6">
              {/* Status Indicator */}
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 border-2 border-orange-400 pixel-shadow ${sessionActive ? "bg-orange-400 animate-pulse" : "bg-gray-600"}`}></div>
                <span className="font-mono text-sm uppercase tracking-wide text-orange-400 pixel-text">
                  {sessionActive ? "&gt; SIMULATION RUNNING" : "&gt; AWAITING RETRAIN"}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <button
                  onClick={() => simulateResponse(true)}
                  disabled={!sessionActive}
                  className={`px-4 py-3 bg-gray-700 text-green-400 border-2 border-green-400 font-bold uppercase tracking-wide transition-all hover:bg-green-400 hover:text-black pixel-shadow pixel-text ${
                    !sessionActive ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  ✓ CORRECT
                </button>

                <button
                  onClick={() => simulateResponse(false)}
                  disabled={!sessionActive}
                  className={`px-4 py-3 bg-gray-700 text-red-400 border-2 border-red-400 font-bold uppercase tracking-wide transition-all hover:bg-red-400 hover:text-black pixel-shadow pixel-text ${
                    !sessionActive ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  ✗ INCORRECT
                </button>

                <button
                  onClick={endSession}
                  disabled={!sessionActive}
                  className={`px-4 py-3 bg-gray-700 text-yellow-400 border-2 border-yellow-400 font-bold uppercase tracking-wide transition-all hover:bg-yellow-400 hover:text-black pixel-shadow pixel-text ${
                    !sessionActive ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  END SESSION
                </button>

                <button
                  onClick={resetAll}
                  className="px-4 py-3 bg-gray-700 text-cyan-400 border-2 border-cyan-400 font-bold uppercase tracking-wide hover:bg-cyan-400 hover:text-black transition-all flex items-center justify-center gap-2 pixel-shadow pixel-text"
                >
                  <RotateCcw className="w-4 h-4" />
                  RESET
                </button>
              </div>

              {/* Retrain Section */}
              {!sessionActive && retrainingData.length > 0 && (
                <div className="border-2 border-purple-400 p-4 bg-gray-700 pixel-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <RefreshCw className="w-5 h-5 text-purple-400" />
                    <h4 className="font-bold text-purple-400 text-lg uppercase tracking-wide pixel-text">
                      RETRAINING READY
                    </h4>
                  </div>
                  <p className="text-white font-mono text-sm mb-4 pixel-text">
                    &gt; {retrainingData.length} RESPONSES COLLECTED
                    <br />
                    &gt; READY TO UPDATE MODEL PARAMETERS
                  </p>
                  <button
                    onClick={retrainModel}
                    className="w-full px-4 py-3 bg-purple-600 text-white border-2 border-purple-400 font-bold uppercase tracking-wide hover:bg-purple-400 transition-all pixel-shadow pixel-text"
                  >
                    RETRAIN MODEL
                  </button>
                </div>
              )}

              {/* Response Log */}
              <div className="border-l-4 border-cyan-400 bg-gray-700 p-4 pixel-shadow">
                <h4 className="font-bold text-cyan-400 mb-3 text-lg uppercase tracking-wide pixel-text">
                  RESPONSE LOG
                </h4>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {responseLog.length === 0 ? (
                    <div className="text-gray-400 text-center py-2 font-mono text-sm pixel-text">
                      &gt; NO RESPONSES YET - SIMULATE SOME ANSWERS
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
                              ? "bg-gray-600 border-l-4 border-green-400"
                              : "bg-gray-600 border-l-4 border-red-400"
                          } font-mono px-3 py-2 text-sm pixel-shadow`}
                        >
                          <div className="font-bold text-white pixel-text">
                            &gt; T={entry.practice}: {entry.correct ? "✓ CORRECT" : "✗ INCORRECT"}
                          </div>
                          <div className="text-xs text-gray-300 pixel-text">
                            &gt; PREDICTED: {(entry.probability * 100).toFixed(1)}%
                          </div>
                        </div>
                      ))
                  )}
                </div>
              </div>
            </div>
          </PixelCard>

          {/* Key Insights */}
          <PixelCard
            title="AFM: What Happens When?"
            tagColor="blue"
            tagIcon={Lightbulb}
            size="wide"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-2 border-blue-400 p-4 bg-gray-700 pixel-shadow">
                <h4 className="font-bold text-blue-400 mb-3 text-lg uppercase tracking-wide pixel-text">
                  DURING SESSION
                </h4>
                <ul className="space-y-2 text-white font-mono text-sm">
                  <li className="pixel-text">&gt; θ, β, γ STAY CONSTANT (NO TUNING)</li>
                  <li className="pixel-text">&gt; ONLY PRACTICE (T) INCREMENTS PER ATTEMPT</li>
                  <li className="pixel-text">&gt; SUCCESS PROBABILITY UPDATES LIVE</li>
                  <li className="pixel-text">&gt; MODEL TRACKS PERFORMANCE FOR RETRAINING</li>
                </ul>
              </div>

              <div className="border-2 border-purple-400 p-4 bg-gray-700 pixel-shadow">
                <h4 className="font-bold text-purple-400 mb-3 text-lg uppercase tracking-wide pixel-text">
                  AFTER SESSION
                </h4>
                <ul className="space-y-2 text-white font-mono text-sm">
                  <li className="pixel-text">&gt; θ, β, γ UPDATE FOR EACH RESPONSE</li>
                  <li className="pixel-text">&gt; SUCCESS PROBABILITY UPDATES LIVE</li>
                  <li className="pixel-text">&gt; MODEL TRACKS PERFORMANCE FOR RETRAINING</li>
                </ul>
              </div>
            </div>
          </PixelCard>
        </div>
      </div>
    </div>
  );
};