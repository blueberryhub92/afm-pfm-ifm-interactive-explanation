import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Play,
  Pause,
  RotateCcw,
  Brain,
  Target,
  TrendingUp,
  Code,
  AlertCircle,
  ArrowRight,
  Lightbulb,
  Zap,
  Clock,
  GripVertical,
  X,
} from "lucide-react";

export const LearningRateExplanation = ({ navigate }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTry, setCurrentTry] = useState(0);
  const [step1Data, setStep1Data] = useState([]);
  const [selectedExamples, setSelectedExamples] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);

  const studentAbility = 0.3;

  // Available examples that can be dragged into the graph
  const availableExamples = [
    {
      id: "string-formatting",
      name: "STRING FORMATTING",
      shortName: "String Formatting",
      difficulty: 0.5,
      learningRate: 0.8,
      color: "#059669",
      bgColor: "bg-green-50",
      borderColor: "border-green-400",
      textColor: "text-green-800",
      description: "Clear patterns, immediate feedback, rapid mastery",
      label: "High LR + Low Difficulty",
    },
    {
      id: "recursion",
      name: "RECURSION",
      shortName: "Recursion",
      difficulty: -1.0,
      learningRate: 0.2,
      color: "#dc2626",
      bgColor: "bg-red-50",
      borderColor: "border-red-400",
      textColor: "text-red-800",
      description: "Abstract concepts, slow progress, gradual understanding",
      label: "Low LR + High Difficulty",
    },
    {
      id: "list-comprehensions",
      name: "LIST COMPREHENSIONS",
      shortName: "List Comprehensions",
      difficulty: 0.0,
      learningRate: 0.7,
      color: "#f59e0b",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-400",
      textColor: "text-yellow-800",
      description: "Compact syntax, quick learning, moderate challenge",
      label: "High LR + Medium Difficulty",
    },
    {
      id: "decorators",
      name: "DECORATORS",
      shortName: "Decorators",
      difficulty: -1.5,
      learningRate: 0.15,
      color: "#9333ea",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-400",
      textColor: "text-purple-800",
      description: "Advanced meta-programming, very slow progress, complex",
      label: "Very Low LR + Very High Difficulty",
    },
    {
      id: "basic-functions",
      name: "BASIC FUNCTIONS",
      shortName: "Basic Functions",
      difficulty: 0.5,
      learningRate: 0.6,
      color: "#10b981",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-400",
      textColor: "text-emerald-800",
      description: "Straightforward concepts, quick learning, simple logic",
      label: "High LR + Low Difficulty",
    },
    {
      id: "traditional-loops",
      name: "TRADITIONAL LOOPS",
      shortName: "Traditional Loops",
      difficulty: 0.3,
      learningRate: 0.5,
      color: "#14b8a6",
      bgColor: "bg-teal-50",
      borderColor: "border-teal-400",
      textColor: "text-teal-800",
      description: "Familiar pattern, steady progress, easy start",
      label: "Medium LR + Low Difficulty",
    },
    {
      id: "classes-oop",
      name: "CLASSES & OOP",
      shortName: "Classes & OOP",
      difficulty: -0.5,
      learningRate: 0.4,
      color: "#3b82f6",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-400",
      textColor: "text-blue-800",
      description: "Object-oriented, moderate complexity, steady learning",
      label: "Medium LR + Medium Difficulty",
    },
    {
      id: "async-await",
      name: "ASYNC/AWAIT",
      shortName: "Async/Await",
      difficulty: -1.2,
      learningRate: 0.25,
      color: "#ef4444",
      bgColor: "bg-rose-50",
      borderColor: "border-rose-400",
      textColor: "text-rose-800",
      description: "Asynchronous programming, complex flow, slow mastery",
      label: "Low LR + High Difficulty",
    },
  ];

  // AFM Formula: P(success) = θ_i + β_k + γ_k * T_ik
  const calculateSuccessProbability = (example, tryNumber) => {
    const logit =
      studentAbility + example.difficulty + example.learningRate * tryNumber;
    return 1 / (1 + Math.exp(-logit));
  };

  const generateDataForExamples = (examples, maxTries = 10) => {
    const newData = [];
    for (let tryNum = 0; tryNum <= maxTries; tryNum++) {
      const dataPoint = { try: tryNum };
      examples.forEach((example) => {
        const probability = calculateSuccessProbability(example, tryNum);
        dataPoint[example.id] = Math.round(probability * 100);
      });
      newData.push(dataPoint);
    }
    return newData;
  };

  const resetStep1 = () => {
    setIsPlaying(false);
    setCurrentTry(0);
    setStep1Data([]);
  };

  const stepForward = () => {
    if (currentTry < 10) {
      const newTry = currentTry + 1;
      setCurrentTry(newTry);

      if (currentStep === 0) {
        // Step 1: String Formatting vs Recursion
        const examples = [
          availableExamples.find((e) => e.id === "string-formatting"),
          availableExamples.find((e) => e.id === "recursion"),
        ];
        const newData = generateDataForExamples(examples, newTry);
        setStep1Data(newData);
      }
    }
  };

  useEffect(() => {
    if (isPlaying && currentTry < 10) {
      const timer = setTimeout(stepForward, 800);
      return () => clearTimeout(timer);
    } else if (currentTry >= 10) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentTry]);

  useEffect(() => {
    if (currentStep === 0) {
      resetStep1();
    }
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Drag and Drop handlers
  const handleDragStart = (example) => {
    setDraggedItem(example);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (draggedItem && selectedExamples.length < 3) {
      // Check if not already added
      if (!selectedExamples.find((ex) => ex.id === draggedItem.id)) {
        setSelectedExamples([...selectedExamples, draggedItem]);
      }
    }
    setDraggedItem(null);
  };

  const handleRemoveExample = (exampleId) => {
    setSelectedExamples(selectedExamples.filter((ex) => ex.id !== exampleId));
  };

  // Generate data for selected examples in step 2
  const step2Data = generateDataForExamples(selectedExamples, 10);

  const renderStepOne = () => {
    const stringFormatting = availableExamples.find(
      (e) => e.id === "string-formatting"
    );
    const recursion = availableExamples.find((e) => e.id === "recursion");

    return (
      <div className="space-y-6">
        <div className="border-4 border-yellow-600 rounded-xl p-6 bg-yellow-50">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-8 h-8 text-yellow-600" />
            <h3 className="text-xl font-bold text-yellow-700 uppercase tracking-wide">
              Critical Distinction
            </h3>
          </div>
          <p className="text-black text-lg font-bold leading-relaxed mb-4">
            <span className="bg-yellow-200 px-2 py-1 border-2 border-yellow-600 rounded text-yellow-800 font-bold">
              Learning Rate ≠ Skill Difficulty
            </span>
          </p>
          <p className="text-black text-base font-bold leading-relaxed mb-4">
            These two concepts are independent: A task can have a fast learning
            rate but still be very difficult overall, or it can be easy but have
            a slow learning rate.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-green-100 border-2 border-green-600 rounded-lg p-4">
              <div className="font-bold text-green-800 text-base flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5" />
                Learning Rate (γ)
              </div>
              <div className="text-green-900 text-sm font-bold mb-3">
                How quickly you improve with each practice attempt
              </div>
              <div className="text-green-800 text-sm">
                <strong>Example:</strong> String formatting has a high learning
                rate - once you understand the pattern, you can apply it to
                increasingly complex scenarios.
              </div>
            </div>
            <div className="bg-red-100 border-2 border-red-600 rounded-lg p-4">
              <div className="font-bold text-red-800 text-base flex items-center gap-2 mb-2">
                <Target className="w-5 h-5" />
                Skill Difficulty (β)
              </div>
              <div className="text-red-900 text-sm font-bold mb-3">
                How hard the skill is to learn initially
              </div>
              <div className="text-red-800 text-sm">
                <strong>Example:</strong> Recursion is conceptually difficult to
                grasp at first - it requires understanding abstract concepts
                like function calls within functions.
              </div>
            </div>
          </div>
        </div>

        {/* Visual Learning Curve Demo */}
        <div className="border-4 border-blue-600 rounded-xl p-6 bg-blue-50">
          <div className="flex items-center gap-3 mb-4">
            <Code className="w-8 h-8 text-blue-600" />
            <h3 className="text-xl font-bold text-blue-700 uppercase tracking-wide">
              Visual Learning Curve Example
            </h3>
          </div>
          <p className="text-blue-900 text-sm font-bold mb-4">
            Watch how <strong>String Formatting</strong> (High LR + Low
            Difficulty) compares to <strong>Recursion</strong> (Low LR + High
            Difficulty):
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Controls */}
            <div className="col-span-1">
              <div className="border-4 border-black rounded-xl p-6 bg-white shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Play className="w-6 h-6 text-green-700" />
                  <h3 className="text-lg font-bold text-black uppercase tracking-wide">
                    Controls
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 border-4 border-black rounded-lg p-3 font-mono text-center">
                    <div className="text-xs mb-1 font-bold">AFM FORMULA:</div>
                    <div className="text-base font-bold mb-1">
                      P = θᵢ + βₖ + γₖ × T
                    </div>
                    <div className="text-xs">
                      <div>STUDENT: {studentAbility}</div>
                      <div>ITERATION: {currentTry}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    disabled={currentTry >= 10}
                    className={`w-full px-4 py-3 border-4 border-black rounded-xl font-bold text-sm tracking-wider transition-all ${
                      isPlaying
                        ? "bg-red-600 text-white hover:bg-white hover:text-red-600"
                        : "bg-green-600 text-white hover:bg-white hover:text-green-600"
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isPlaying ? "PAUSE" : "START"} SIMULATION
                  </button>

                  <button
                    onClick={stepForward}
                    disabled={isPlaying || currentTry >= 10}
                    className="w-full px-4 py-3 bg-blue-600 text-white border-4 border-black rounded-xl font-bold text-sm tracking-wider transition-all hover:bg-white hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    STEP FORWARD
                  </button>

                  <button
                    onClick={resetStep1}
                    className="w-full px-4 py-3 bg-gray-600 text-white border-4 border-black rounded-xl font-bold text-sm tracking-wider transition-all hover:bg-white hover:text-gray-600 flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    RESET
                  </button>
                </div>

                {/* Parameter Display */}
                <div className="mt-4 space-y-2">
                  <div
                    className={`border-2 ${stringFormatting.borderColor} ${stringFormatting.bgColor} rounded-lg p-3`}
                  >
                    <div
                      className={`font-bold ${stringFormatting.textColor} text-xs mb-2`}
                    >
                      {stringFormatting.shortName}
                    </div>
                    <div className="text-xs space-y-1">
                      <div>β: {stringFormatting.difficulty} (Easy)</div>
                      <div>γ: {stringFormatting.learningRate} (Fast)</div>
                    </div>
                  </div>
                  <div
                    className={`border-2 ${recursion.borderColor} ${recursion.bgColor} rounded-lg p-3`}
                  >
                    <div
                      className={`font-bold ${recursion.textColor} text-xs mb-2`}
                    >
                      {recursion.shortName}
                    </div>
                    <div className="text-xs space-y-1">
                      <div>β: {recursion.difficulty} (Hard)</div>
                      <div>γ: {recursion.learningRate} (Slow)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Graph */}
            <div className="col-span-1 lg:col-span-2">
              <div className="border-4 border-black rounded-xl p-6 bg-white shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-6 h-6 text-blue-700" />
                  <h3 className="text-lg font-bold text-black uppercase tracking-wide">
                    Success Probability Over Time
                  </h3>
                </div>

                <div className="bg-gray-50 border-4 border-black rounded-lg p-4 h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={step1Data}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
                      <XAxis
                        dataKey="try"
                        label={{
                          value: "PRACTICE ATTEMPTS",
                          position: "insideBottom",
                          offset: -10,
                          style: {
                            fontSize: "14px",
                            fontWeight: "bold",
                            fontFamily: "IBM Plex Mono",
                          },
                        }}
                        tick={{
                          fontSize: 12,
                          fontFamily: "IBM Plex Mono",
                          fontWeight: "bold",
                        }}
                      />
                      <YAxis
                        label={{
                          value: "SUCCESS PROBABILITY (%)",
                          angle: -90,
                          position: "insideLeft",
                          style: {
                            fontSize: "14px",
                            fontWeight: "bold",
                            fontFamily: "IBM Plex Mono",
                          },
                        }}
                        tick={{
                          fontSize: 12,
                          fontFamily: "IBM Plex Mono",
                          fontWeight: "bold",
                        }}
                      />
                      <Tooltip
                        contentStyle={{
                          fontFamily: "IBM Plex Mono",
                          fontSize: "12px",
                          backgroundColor: "#f8f9fa",
                          border: "3px solid #000",
                          borderRadius: "8px",
                          fontWeight: "bold",
                        }}
                      />
                      <Legend
                        wrapperStyle={{
                          fontFamily: "IBM Plex Mono",
                          fontSize: "12px",
                          fontWeight: "bold",
                          paddingTop: "10px",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="string-formatting"
                        stroke={stringFormatting.color}
                        strokeWidth={5}
                        dot={{
                          fill: stringFormatting.color,
                          strokeWidth: 3,
                          r: 6,
                        }}
                        name={stringFormatting.shortName}
                      />
                      <Line
                        type="monotone"
                        dataKey="recursion"
                        stroke={recursion.color}
                        strokeWidth={5}
                        dot={{ fill: recursion.color, strokeWidth: 3, r: 6 }}
                        name={recursion.shortName}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 bg-blue-100 border-2 border-blue-700 rounded-lg p-3">
            <p className="text-blue-900 text-sm font-bold">
              <strong>Key Insight:</strong> Learning Rate (γ) describes the{" "}
              <em>slope</em> of your improvement curve (how much you improve
              with each attempt), while Skill Difficulty (β) describes your{" "}
              <em>starting point</em> (how hard it is initially). Both
              independently affect your success probability!
            </p>
          </div>
        </div>

        <div className="border-4 border-purple-600 rounded-xl p-6 bg-purple-50">
          <div className="flex items-center gap-3 mb-4">
            <Brain className="w-8 h-8 text-purple-600" />
            <h3 className="text-xl font-bold text-purple-700 uppercase tracking-wide">
              Next: Try Different Combinations!
            </h3>
          </div>
          <p className="text-black text-lg font-bold leading-relaxed mb-3">
            In the next section, you can{" "}
            <strong className="text-purple-700">
              drag & drop different Python concepts
            </strong>{" "}
            into the graph to see how various combinations of Learning Rate and
            Skill Difficulty create different learning trajectories.
          </p>
        </div>
      </div>
    );
  };

  const renderStepTwo = () => (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="border-4 border-black rounded-xl p-8 bg-gradient-to-br from-purple-50 to-blue-50 shadow-lg">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Brain className="w-8 h-8 text-purple-600" />
          <h3 className="text-2xl font-bold text-purple-700 uppercase tracking-wide">
            Interactive Drag & Drop Learning Curves
          </h3>
        </div>
        <p className="text-lg text-black leading-relaxed text-center mb-2">
          <strong>Drag examples from the palette below</strong> into the drop
          zone to see how their Learning Rate (γ) and Skill Difficulty (β)
          affect the learning trajectory.
        </p>
        <p className="text-base text-gray-700 text-center">
          You can compare up to 3 examples simultaneously in real-time!
        </p>
      </div>

      {/* Main Drag & Drop Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Available Examples Palette */}
        <div className="col-span-1">
          <div className="border-4 border-black rounded-xl p-6 bg-white shadow-lg sticky top-4">
            <div className="flex items-center gap-3 mb-4">
              <Code className="w-6 h-6 text-purple-700" />
              <h3 className="text-lg font-bold text-black uppercase tracking-wide">
                Examples
              </h3>
            </div>
            <p className="text-xs text-gray-600 mb-4 font-bold">
              Drag these into the graph →
            </p>
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {availableExamples.map((example) => (
                <div
                  key={example.id}
                  draggable
                  onDragStart={() => handleDragStart(example)}
                  className={`${example.bgColor} border-2 ${
                    example.borderColor
                  } rounded-lg p-3 cursor-move hover:shadow-lg transition-all ${
                    selectedExamples.find((ex) => ex.id === example.id)
                      ? "opacity-50"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <GripVertical className="w-4 h-4 text-gray-400" />
                    <div className={`text-xs font-bold ${example.textColor}`}>
                      {example.shortName}
                    </div>
                  </div>
                  <div className="text-xs text-gray-700 mb-2">
                    {example.description}
                  </div>
                  <div className="flex gap-2 text-xs font-mono">
                    <span className="bg-white px-2 py-1 rounded">
                      γ: {example.learningRate}
                    </span>
                    <span className="bg-white px-2 py-1 rounded">
                      β: {example.difficulty}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Graph and Drop Zone */}
        <div className="col-span-1 lg:col-span-3 space-y-6">
          {/* Selected Examples */}
          {selectedExamples.length > 0 && (
            <div className="border-4 border-purple-600 rounded-xl p-4 bg-purple-50">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-purple-800 text-sm">
                  ACTIVE COMPARISONS ({selectedExamples.length}/3)
                </h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedExamples.map((example) => (
                  <div
                    key={example.id}
                    className={`${example.bgColor} border-2 ${example.borderColor} rounded-lg p-2 flex items-center gap-2`}
                  >
                    <span className={`text-xs font-bold ${example.textColor}`}>
                      {example.shortName}
                    </span>
                    <button
                      onClick={() => handleRemoveExample(example.id)}
                      className="ml-2 text-red-600 hover:text-red-800"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Graph Drop Zone */}
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={`border-4 border-dashed rounded-xl p-8 bg-white shadow-lg transition-all ${
              draggedItem ? "border-purple-600 bg-purple-50" : "border-gray-300"
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-blue-700" />
              <h3 className="text-xl font-bold text-black uppercase tracking-wide">
                Learning Trajectories
              </h3>
            </div>

            {selectedExamples.length === 0 ? (
              <div className="h-96 flex items-center justify-center border-4 border-dashed border-gray-300 rounded-lg">
                <div className="text-center">
                  <Code className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 font-bold text-lg">
                    Drop examples here to see their learning curves
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    Drag from the palette on the left
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 border-4 border-black rounded-lg p-6">
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart
                    data={step2Data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
                    <XAxis
                      dataKey="try"
                      label={{
                        value: "PRACTICE ATTEMPTS",
                        position: "insideBottom",
                        offset: -10,
                        style: {
                          fontSize: "14px",
                          fontWeight: "bold",
                          fontFamily: "IBM Plex Mono",
                        },
                      }}
                      tick={{
                        fontSize: 12,
                        fontFamily: "IBM Plex Mono",
                        fontWeight: "bold",
                      }}
                    />
                    <YAxis
                      label={{
                        value: "SUCCESS PROBABILITY (%)",
                        angle: -90,
                        position: "insideLeft",
                        style: {
                          fontSize: "14px",
                          fontWeight: "bold",
                          fontFamily: "IBM Plex Mono",
                        },
                      }}
                      tick={{
                        fontSize: 12,
                        fontFamily: "IBM Plex Mono",
                        fontWeight: "bold",
                      }}
                    />
                    <Tooltip
                      contentStyle={{
                        fontFamily: "IBM Plex Mono",
                        fontSize: "12px",
                        backgroundColor: "#f8f9fa",
                        border: "3px solid #000",
                        borderRadius: "8px",
                        fontWeight: "bold",
                      }}
                    />
                    <Legend
                      wrapperStyle={{
                        fontFamily: "IBM Plex Mono",
                        fontSize: "12px",
                        fontWeight: "bold",
                        paddingTop: "10px",
                      }}
                    />
                    {selectedExamples.map((example) => (
                      <Line
                        key={example.id}
                        type="monotone"
                        dataKey={example.id}
                        stroke={example.color}
                        strokeWidth={5}
                        dot={{ fill: example.color, strokeWidth: 3, r: 6 }}
                        name={example.shortName}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* Parameter Details */}
          {selectedExamples.length > 0 && (
            <div className="border-4 border-black rounded-xl p-6 bg-white shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-6 h-6 text-purple-700" />
                <h3 className="text-lg font-bold text-black uppercase tracking-wide">
                  Parameter Details
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedExamples.map((example) => (
                  <div
                    key={example.id}
                    className={`border-4 ${example.borderColor} ${example.bgColor} rounded-xl p-4`}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <h4 className={`font-bold ${example.textColor} text-sm`}>
                        {example.shortName}
                      </h4>
                    </div>
                    <div className="text-xs text-gray-700 mb-3">
                      {example.description}
                    </div>
                    <div className="bg-white border-2 border-black rounded-lg p-3 space-y-2 font-mono text-xs">
                      <div className="flex justify-between">
                        <span>Difficulty (β):</span>
                        <span className="font-bold">{example.difficulty}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Learning Rate (γ):</span>
                        <span className="font-bold">
                          {example.learningRate}
                        </span>
                      </div>
                      <div className="border-t-2 border-gray-300 pt-2">
                        <div className="text-center font-bold text-xs">
                          {example.label}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white min-h-screen flex flex-col text-black font-['IBM_Plex_Mono',monospace]">
      {/* Header */}
      <div className="border-b-8 border-black bg-purple-400 px-8 py-6 shadow-lg">
        <div className="flex items-center justify-center">
          <span className="text-black font-bold text-2xl uppercase tracking-wider">
            {currentStep === 0
              ? "Learning Rate vs Skill Difficulty"
              : "Interactive Drag & Drop Comparison"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-8 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Progress Indicator */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              {[0, 1].map((index) => (
                <div key={index} className="flex items-center">
                  <div
                    className={`w-4 h-4 rounded-full border-2 border-black ${
                      index <= currentStep ? "bg-purple-600" : "bg-gray-200"
                    }`}
                  />
                  {index < 1 && (
                    <div
                      className={`w-12 h-1 border-t-2 border-black ${
                        index < currentStep ? "bg-purple-600" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg mb-8">
            {currentStep === 0 && renderStepOne()}
            {currentStep === 1 && renderStepTwo()}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="px-6 py-3 bg-gray-600 text-white border-4 border-black rounded-xl font-bold uppercase tracking-wide hover:bg-white hover:text-gray-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Previous
            </button>

            <div className="px-6 py-3 bg-white border-4 border-black rounded-xl font-bold text-black uppercase tracking-wide">
              Step {currentStep + 1} of 2
            </div>

            {currentStep < 1 ? (
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-purple-600 text-white border-4 border-black rounded-xl font-bold uppercase tracking-wide hover:bg-white hover:text-purple-600 transition-all"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={() => navigate(14)}
                className="px-8 py-4 bg-green-600 text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-green-600 transition-all transform hover:scale-105 flex items-center gap-3"
              >
                <span>Continue</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
