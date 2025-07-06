import { useState } from "react";
import {
  Code,
  Target,
  Zap,
  ArrowRight,
  List,
  Brain,
  TrendingUp,
  Clock,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { ArrowLeft, TrendingDown, Calendar } from "lucide-react";

export const Slide21AFMLimitations = ({ scroll }) => {
  const [currentView, setCurrentView] = useState("overview");
  const [completedScenarios, setCompletedScenarios] = useState(new Set());
  const [step, setStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [learningRate, setLearningRate] = useState(0.1);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [initialProb, setInitialProb] = useState(0.25);
  const [sliderValues, setSliderValues] = useState({
    days: 0.8,
    months: 0.8,
    year: 0.8,
  });
  const [userGuess, setUserGuess] = useState({ value: 4, unit: "weeks" });
  const [showAnswer, setShowAnswer] = useState(false);
  const [showTellMeAnswer, setShowTellMeAnswer] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSliderChange = (period, value) => {
    setSliderValues((prev) => ({ ...prev, [period]: value }));
  };

  const handleGuessSubmit = () => {
    setShowAnswer(true);
  };

  const scenarios = [
    { title: "Binary Skills", id: "binary-skills", icon: Target, color: "red" },
    { title: "No Forgetting", id: "no-forgetting", icon: Clock, color: "blue" },
    {
      title: "Context Blind",
      id: "context-blind",
      icon: Brain,
      color: "green",
    },
    {
      title: "Cold Start Problem",
      id: "cold-start-problem",
      icon: Zap,
      color: "purple",
    },
    {
      title: "Uniform Learning Rates",
      id: "uniform-learning-rates",
      icon: TrendingUp,
      color: "orange",
    },
    {
      title: "Incorrect Answers",
      id: "incorrect-answers",
      icon: AlertTriangle,
      color: "pink",
    },
  ];

  const pythonQuestion = {
    question: "What will this Python code output?",
    code: `def calculate_sum(numbers):
    total = 0
    for num in numbers:
        total += num
    return total

result = calculate_sum([2, 4, 6, 8])
print(result)`,
    options: ["16", "18", "24", "Error"],
    correctAnswer: "20",
    hint: "There may not be a correct answer option.",
  };

  // Generate simulation data
  const generateSimulationSteps = (rate) => {
    const rates = { fast: rate * 2.5, slow: rate * 0.6, afm: rate };
    const steps = [0, 3, 6, 10];
    const titles = [
      "Initial State",
      "After 3 Practice Attempts",
      "After 6 Practice Attempts",
      "After 10 Practice Attempts",
    ];
    const descriptions = [
      "Both students start with the same initial success probability",
      "Students show different learning patterns based on their individual rates",
      "Learning differences become more apparent",
      "AFM's uniform rate creates significant prediction errors for both students",
    ];

    return steps.map((practiceCount, i) => ({
      title: titles[i],
      description: descriptions[i],
      practiceCount,
      fastStudent: {
        actual: Math.min(0.95, 0.25 + rates.fast * practiceCount),
      },
      slowStudent: {
        actual: Math.min(0.95, 0.25 + rates.slow * practiceCount),
      },
      afmPrediction: Math.min(0.95, 0.25 + rates.afm * practiceCount),
    }));
  };

  const simulationSteps = generateSimulationSteps(learningRate);

  // Event handlers
  const handleBeginTask = (taskId) => {
    if (taskId === "uniform-learning-rates") {
      setCurrentView("setup");
      setStep(0);
    } else if (taskId === "incorrect-answers") {
      setCurrentView("incorrect-answers");
      setStep(0);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setShowFeedback(false);
      setInitialProb(0.25);
    } else if (taskId === "no-forgetting") {
      setCurrentView("no-forgetting");
      setShowAnswer(false);
      setShowTellMeAnswer(false);
      setShowExplanation(false);
      setSliderValues({ days: 0.8, months: 0.8, year: 0.8 });
      setUserGuess({ value: 4, unit: "weeks" });
      setStep(0);
    } else if (
      ["binary-skills", "context-blind", "cold-start-problem"].includes(taskId)
    ) {
      // Placeholder for other scenarios - implement these views later
      alert(`${taskId} scenario coming soon!`);
      // For now, mark as completed immediately for testing
      setCompletedScenarios((prev) => new Set([...prev, taskId]));
    }
  };

  const navigateStep = (direction) => {
    const newStep = step + direction;
    if (newStep >= 0 && newStep < simulationSteps.length) {
      setIsAnimating(true);
      setTimeout(() => {
        setStep(newStep);
        setIsAnimating(false);
      }, 300);
    }
  };

  const backToOverview = () => {
    setCurrentView("overview");

    // Track completion for specific scenarios
    if (
      ["task", "incorrect-answers-reflection", "no-forgetting"].includes(
        currentView
      )
    ) {
      let scenarioId;
      if (currentView === "task") scenarioId = "uniform-learning-rates";
      else if (currentView === "incorrect-answers-reflection")
        scenarioId = "incorrect-answers";
      else if (currentView === "no-forgetting") scenarioId = "no-forgetting";

      if (scenarioId) {
        setCompletedScenarios((prev) => new Set([...prev, scenarioId]));
      }
    }
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);
    setTimeout(() => {
      setInitialProb((prev) => Math.min(0.95, prev + 0.15));
    }, 1000);
  };

  // Components
  const ProbabilityBar = ({
    actual,
    label,
    color,
    showPredictionError = false,
    afmPrediction,
  }) => {
    const errorSize = showPredictionError
      ? Math.abs(actual - afmPrediction)
      : 0;
    const isUnderPredicted = actual > afmPrediction;

    return (
      <div className="border-4 border-black rounded-xl p-6 bg-white shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-bold text-black font-['IBM_Plex_Mono',monospace]">
            {label}
          </span>
          <span className="text-lg font-bold text-black font-['IBM_Plex_Mono',monospace]">
            {(actual * 100).toFixed(0)}%
          </span>
        </div>
        <div className="relative">
          <div className="w-full bg-gray-200 rounded-none h-8 border-4 border-black overflow-hidden">
            <div
              className={`h-full ${color} transition-all duration-500 ease-out ${
                isAnimating ? "opacity-70" : ""
              }`}
              style={{ width: `${actual * 100}%` }}
            />
          </div>
          {showPredictionError && afmPrediction !== actual && (
            <div className="absolute top-0 left-0 w-full h-8">
              <div
                className="absolute top-0 h-8 border-4 border-dashed border-black bg-yellow-300 bg-opacity-70"
                style={{
                  left: `${Math.min(actual, afmPrediction) * 100}%`,
                  width: `${errorSize * 100}%`,
                }}
              />
              <div
                className="absolute top-1/2 transform -translate-y-1/2 text-sm font-bold text-black bg-white px-2 py-1 border-2 border-black rounded-none font-['IBM_Plex_Mono',monospace]"
                style={{
                  left: `${afmPrediction * 100}%`,
                  transform: "translateX(-50%) translateY(-50%)",
                }}
              >
                AFM
              </div>
            </div>
          )}
        </div>
        {showPredictionError && afmPrediction !== actual && (
          <div className="text-center mt-4">
            <span
              className={`font-bold text-lg font-['IBM_Plex_Mono',monospace] ${
                isUnderPredicted ? "text-red-600" : "text-blue-600"
              }`}
            >
              {isUnderPredicted ? "UNDER" : "OVER"}-PREDICTED BY{" "}
              {(errorSize * 100).toFixed(0)}%
            </span>
          </div>
        )}
      </div>
    );
  };

  const Layout = ({ title, children }) => (
    <div className="bg-white min-h-screen flex flex-col text-black font-['IBM_Plex_Mono',monospace]">
      <div className="border-b-8 border-black bg-yellow-400 px-8 py-6 shadow-lg">
        <div className="flex items-center justify-center">
          <span className="text-black font-bold text-2xl uppercase tracking-wider">
            {title}
          </span>
        </div>
      </div>
      <div className="flex-1 px-8 py-8">{children}</div>
    </div>
  );

  // View renderers
  const renderSetup = () => (
    <Layout title="Task: Uniform Learning Rates">
      <div className="max-w-4xl mx-auto">
        <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg">
          <div className="text-center space-y-8">
            <h2 className="text-3xl font-bold text-black uppercase tracking-tight">
              Configure AFM Learning Rate
            </h2>
            <p className="text-black text-lg leading-relaxed">
              Set the learning rate γ (gamma) that AFM will use for both
              students. This single rate will be applied uniformly regardless of
              individual learning differences.
            </p>

            <div className="border-4 border-black rounded-xl p-6 bg-gray-100">
              <div className="text-left max-w-md mx-auto">
                <label className="block text-lg font-bold text-black mb-4 uppercase tracking-wide">
                  Try to adapt the Learning Rate y:{" "}
                  <span className="text-2xl text-purple-600">
                    {learningRate.toFixed(2)}
                  </span>
                </label>
                <div className="relative">
                  <div className="w-full h-6 bg-gray-200 border-4 border-black rounded-none">
                    <div
                      className="h-full bg-purple-600 transition-all duration-300"
                      style={{
                        width: `${((learningRate - 0.05) / 0.1) * 100}%`,
                      }}
                    />
                  </div>
                  <input
                    type="range"
                    min="0.05"
                    max="0.15"
                    step="0.01"
                    value={learningRate}
                    onChange={(e) =>
                      setLearningRate(parseFloat(e.target.value))
                    }
                    className="absolute top-0 w-full h-6 opacity-0 cursor-pointer"
                  />
                  <div className="flex justify-between text-sm font-bold text-black mt-2 uppercase">
                    <span>0.05 (SLOW)</span>
                    <span>0.15 (FAST)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-l-8 border-orange-600 bg-orange-100 p-6 rounded-r-xl">
              <p className="text-black font-bold text-lg">
                NOTE: In reality, students have different learning rates, but
                AFM uses this single value for all learners.
              </p>
            </div>

            <button
              onClick={() => setCurrentView("task")}
              className="px-8 py-4 bg-purple-600 text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-purple-600 transition-all transform hover:scale-105 flex items-center gap-3 mx-auto"
            >
              <span>START SIMULATION</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );

  const renderTask = () => {
    const currentStep = simulationSteps[step];
    const showErrors = step > 0;
    const isLastStep = step === simulationSteps.length - 1;

    return (
      <Layout title="Task: Uniform Learning Rates">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-black uppercase tracking-tight">
                {currentStep.title}
              </h3>
              <div className="px-4 py-2 bg-purple-600 text-white font-bold border-4 border-black rounded-xl">
                γ = {learningRate.toFixed(2)}
              </div>
            </div>

            <p className="text-center text-black mb-8 text-lg font-bold">
              {currentStep.description}
            </p>

            <div className="space-y-6">
              <ProbabilityBar
                actual={currentStep.fastStudent.actual}
                label="FAST LEARNER"
                color="bg-green-600"
                showPredictionError={showErrors}
                afmPrediction={currentStep.afmPrediction}
              />
              <ProbabilityBar
                actual={currentStep.slowStudent.actual}
                label="SLOW LEARNER"
                color="bg-red-600"
                showPredictionError={showErrors}
                afmPrediction={currentStep.afmPrediction}
              />

              {showErrors && (
                <div className="border-4 border-black rounded-xl p-6 bg-yellow-100">
                  <div className="text-center space-y-2">
                    <span className="text-xl font-bold text-black uppercase tracking-wide">
                      AFM UNIFORM PREDICTION:{" "}
                      {(currentStep.afmPrediction * 100).toFixed(0)}%
                    </span>
                    <p className="text-lg font-bold text-black">
                      SAME PREDICTION FOR BOTH STUDENTS USING γ ={" "}
                      {learningRate.toFixed(2)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={() => navigateStep(-1)}
              disabled={step === 0}
              className="px-6 py-3 bg-gray-600 text-white border-4 border-black rounded-xl font-bold uppercase tracking-wide hover:bg-white hover:text-gray-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← PREVIOUS
            </button>

            <div className="px-6 py-3 bg-white border-4 border-black rounded-xl font-bold text-black uppercase tracking-wide">
              STEP {step + 1} OF {simulationSteps.length}
            </div>

            <button
              onClick={isLastStep ? backToOverview : () => navigateStep(1)}
              className={`px-6 py-3 text-white border-4 border-black rounded-xl font-bold uppercase tracking-wide transition-all ${
                isLastStep
                  ? "bg-green-600 hover:bg-white hover:text-green-600"
                  : "bg-purple-600 hover:bg-white hover:text-purple-600"
              }`}
            >
              {isLastStep ? "COMPLETE TASK ✓" : "NEXT →"}
            </button>
          </div>

          {isLastStep && showErrors && (
            <div className="border-l-8 border-orange-600 bg-orange-100 rounded-r-xl p-6">
              <h4 className="font-bold text-black mb-4 text-xl uppercase tracking-wide">
                KEY INSIGHTS:
              </h4>
              <ul className="text-lg font-bold text-black space-y-2">
                <li>• AFM USES THE SAME LEARNING RATE FOR ALL STUDENTS</li>
                <li>
                  • FAST LEARNERS EXCEED AFM PREDICTIONS (UNDER-PREDICTED)
                </li>
                <li>
                  • SLOW LEARNERS FALL SHORT OF AFM PREDICTIONS (OVER-PREDICTED)
                </li>
                <li>
                  • INDIVIDUAL DIFFERENCES IN LEARNING SPEED ARE NOT CAPTURED
                </li>
              </ul>
            </div>
          )}
        </div>
      </Layout>
    );
  };

  const renderIncorrectAnswers = () => (
    <Layout title="How do Incorrect Answers Impact Success Probability?">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center mb-6">
          <p className="text-black text-xl font-bold leading-relaxed">
            Answer the multiple-choice question below.{" "}
            <span className="text-purple-600 font-bold underline decoration-4">
              Pay attention to what happens to your success probability after
              you submit your answer.
            </span>
          </p>
        </div>

        <div className="border-4 border-black rounded-xl p-6 bg-white shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <span className="text-2xl font-bold text-black uppercase tracking-wide">
              SUCCESS PROBABILITY: {(initialProb * 100).toFixed(0)}%
            </span>
            <div className="flex items-center space-x-4">
              <span className="text-lg font-bold text-black">0%</span>
              <div className="w-64 bg-gray-200 border-4 border-black rounded-none h-8 overflow-hidden">
                <div
                  className="h-full bg-purple-600 transition-all duration-1000 ease-out"
                  style={{ width: `${initialProb * 100}%` }}
                />
              </div>
              <span className="text-lg font-bold text-black">100%</span>
            </div>
          </div>
        </div>

        <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-6 text-black uppercase tracking-tight">
            {pythonQuestion.question}
          </h2>
          <p className="text-lg font-bold text-orange-600 text-center mb-6 bg-orange-100 p-4 border-4 border-orange-600 rounded-xl">
            {pythonQuestion.hint}
          </p>

          <div className="bg-black text-green-400 p-6 rounded-xl font-['IBM_Plex_Mono',monospace] text-lg mb-8 border-4 border-black">
            <pre className="whitespace-pre-wrap">{pythonQuestion.code}</pre>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-8">
            {pythonQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => !showFeedback && handleAnswerSelect(option)}
                disabled={showFeedback}
                className={`px-6 py-4 border-4 border-black rounded-xl font-bold text-xl uppercase tracking-wide transition-all ${
                  selectedAnswer === option
                    ? "bg-red-600 text-white"
                    : showFeedback
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-white text-black hover:bg-yellow-400 cursor-pointer transform hover:scale-105"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {showFeedback && (
            <div className="space-y-6">
              <div className="border-l-8 border-yellow-600 bg-yellow-100 p-6 rounded-r-xl">
                <p className="text-black text-xl font-bold">
                  Did you notice that your success probability increased, even
                  though you got the answer wrong?{" "}
                  <span className="text-yellow-700 underline decoration-4">
                    There really wasn't a correct answer option.
                  </span>{" "}
                  This is another interesting characteristic of AFM, but it
                  isn't necessarily a flaw.
                </p>
              </div>

              <div className="border-l-8 border-blue-600 bg-blue-100 p-6 rounded-r-xl">
                <p className="text-black mb-3 text-xl font-bold">
                  Why might it make sense for success probability to increase
                  regardless of the correctness of your answer?{" "}
                  <button
                    onClick={() => setShowExplanation(true)}
                    className="text-blue-700 font-bold hover:text-blue-800 underline cursor-pointer decoration-4"
                  >
                    TELL ME!
                  </button>
                </p>
                {showExplanation && (
                  <p className="text-black mt-4 text-lg font-bold bg-white p-4 border-4 border-blue-600 rounded-xl">
                    Well, AFM considers every answer, wrong or right, as a
                    learning opportunity that raises your success probability.
                    As you might have experienced in real life, reviewing
                    incorrect answers often helps to solidify your knowledge
                    even more and reduce the chance that you'll make the same
                    mistake again.
                  </p>
                )}
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() => setCurrentView("incorrect-answers-reflection")}
                  className="px-8 py-4 bg-purple-600 text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-purple-600 transition-all transform hover:scale-105 flex items-center gap-3"
                >
                  <span>CONTINUE</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );

  const renderNoForgetting = () => (
    <div className="bg-white min-h-screen flex flex-col items-center py-8 px-4 md:px-10 text-black font-['IBM_Plex_Mono',monospace]">
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-8">
        {/* Header */}
        <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative">
          <div className="absolute -top-6 left-4 px-3 py-1 bg-red-600 text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
            <Brain className="w-4 h-4" />
            MEMORY EXPERIMENT
          </div>
          <div className="text-2xl md:text-3xl font-bold tracking-tight text-black text-center">
            When does your success probability decrease?
          </div>
        </div>

        {/* Scenario Description */}
        <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative">
          <div className="absolute -top-6 left-4 px-3 py-1 bg-blue-600 text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
            <Clock className="w-4 h-4" />
            SCENARIO
          </div>

          <div className="border-4 border-blue-600 rounded-xl p-6 bg-blue-50 mb-6">
            <p className="text-black text-lg leading-relaxed font-mono">
              Aileen is a student who has been learning Python for 3 months.
              Today, she tested her knowledge of programming in Python with AFM
              and received a success probability of{" "}
              <span className="bg-yellow-300 px-2 py-1 border-2 border-black rounded font-bold">
                80%
              </span>
              . If Kris doesn't review or practice Python after today, what do
              you predict her success probability to be in:
            </p>
          </div>
        </div>

        {!showAnswer ? (
          <>
            {/* Time Period Sliders */}
            <div className="space-y-6">
              {[
                {
                  label: "5 days",
                  key: "days",
                  color: "orange-600",
                  bgColor: "orange-100",
                  icon: Calendar,
                },
                {
                  label: "2 months",
                  key: "months",
                  color: "purple-600",
                  bgColor: "purple-100",
                  icon: Calendar,
                },
                {
                  label: "1 year",
                  key: "year",
                  color: "red-600",
                  bgColor: "red-100",
                  icon: Calendar,
                },
              ].map(({ label, key, color, bgColor, icon: Icon }) => (
                <div
                  key={key}
                  className="border-4 border-black rounded-xl p-6 bg-white shadow-lg relative"
                >
                  <div
                    className={`absolute -top-6 left-4 px-3 py-1 bg-${color} text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2`}
                  >
                    <Icon className="w-4 h-4" />
                    {label.toUpperCase()}
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-black font-bold text-xl font-mono">
                      Success Rate: {(sliderValues[key] * 100).toFixed(1)}%
                    </span>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 font-mono">
                      <span>0%</span>
                      <span>|</span>
                      <span>100%</span>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="w-full bg-gray-300 border-2 border-black rounded-full h-8 overflow-hidden">
                      <div
                        className={`h-full bg-${color} transition-all duration-300 border-r-2 border-black`}
                        style={{ width: `${sliderValues[key] * 100}%` }}
                      />
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={sliderValues[key]}
                      onChange={(e) =>
                        handleSliderChange(key, parseFloat(e.target.value))
                      }
                      className="absolute top-0 w-full h-8 opacity-0 cursor-pointer"
                    />
                    <div
                      className="absolute top-0 w-8 h-8 bg-black border-2 border-white rounded-full cursor-pointer transform -translate-x-4 flex items-center justify-center"
                      style={{ left: `${sliderValues[key] * 100}%` }}
                    >
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* General Question */}
            <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative">
              <div className="absolute -top-6 left-4 px-3 py-1 bg-green-600 text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                PREDICTION
              </div>

              <div className="border-4 border-green-600 rounded-xl p-6 bg-green-50 mb-6">
                <p className="text-black font-mono text-lg mb-4 font-bold">
                  In general, when do you think the success probability starts
                  decreasing?
                </p>
                <div className="flex items-center space-x-4 justify-center flex-wrap gap-4">
                  <input
                    type="number"
                    value={userGuess.value}
                    onChange={(e) =>
                      setUserGuess((prev) => ({
                        ...prev,
                        value: parseInt(e.target.value) || 0,
                      }))
                    }
                    className="w-24 px-4 py-3 border-4 border-black rounded-lg text-center font-bold text-xl font-mono bg-white focus:bg-yellow-100 focus:outline-none"
                    min="1"
                  />
                  <select
                    value={userGuess.unit}
                    onChange={(e) =>
                      setUserGuess((prev) => ({
                        ...prev,
                        unit: e.target.value,
                      }))
                    }
                    className="px-4 py-3 border-4 border-black rounded-lg bg-white font-bold font-mono text-lg focus:bg-yellow-100 focus:outline-none"
                  >
                    <option value="days">DAYS</option>
                    <option value="weeks">WEEKS</option>
                    <option value="months">MONTHS</option>
                    <option value="years">YEARS</option>
                  </select>
                  <span className="text-black font-mono font-bold">
                    after you stop reviewing the material.
                  </span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                onClick={handleGuessSubmit}
                className="px-8 py-4 bg-black text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-black hover:border-black transition-all transform hover:scale-105 font-mono"
              >
                Submit Answer
              </button>
            </div>
          </>
        ) : (
          <div className="space-y-6">
            {/* User's Guess Display */}
            <div className="border-4 border-black rounded-xl p-6 bg-white shadow-lg relative">
              <div className="absolute -top-6 left-4 px-3 py-1 bg-orange-600 text-white font-semibold rounded-md text-xs tracking-wider">
                YOUR GUESS
              </div>
              <div className="border-l-8 border-orange-600 bg-orange-100 p-4 rounded-r-lg">
                <p className="text-black font-bold font-mono text-lg">
                  You guessed: {userGuess.value} {userGuess.unit}
                </p>
              </div>
            </div>

            {/* Reveal Section */}
            <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative">
              <div className="absolute -top-6 left-4 px-3 py-1 bg-purple-600 text-white font-semibold rounded-md text-xs tracking-wider">
                THE ANSWER
              </div>

              <div className="text-black font-mono text-lg mb-6">
                <p className="mb-4 leading-relaxed">
                  Alright, now that you've submitted your guesses, it's time to
                  reveal the answer! AFM will start decreasing your success
                  probability...
                </p>
                <button
                  onClick={() => setShowTellMeAnswer(true)}
                  className="px-6 py-3 bg-purple-600 text-white border-4 border-black rounded-lg font-bold uppercase tracking-wide hover:bg-white hover:text-purple-600 hover:border-purple-600 transition-all transform hover:scale-105"
                >
                  Tell me!
                </button>
              </div>

              {showTellMeAnswer && (
                <>
                  {/* The Answer */}
                  <div className="border-4 border-blue-600 rounded-xl p-6 bg-blue-50 mb-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Brain className="w-6 h-6 text-blue-700" />
                      <span className="font-bold text-blue-700 text-xl uppercase tracking-wide">
                        The Truth
                      </span>
                    </div>
                    <p className="text-black font-mono text-lg leading-relaxed">
                      <span className="bg-red-300 px-2 py-1 border-2 border-black rounded font-bold">
                        NEVER!
                      </span>{" "}
                      AFM assumes that once you've mastered a skill, you'll
                      never forget it. Your probability of success will remain
                      at 80% indefinitely, whether it's been 5 days, 2 months,
                      or even 1 year since you last practiced Python.
                    </p>
                  </div>

                  {/* Limitations */}
                  <div className="border-4 border-yellow-600 rounded-xl p-6 bg-yellow-50">
                    <div className="flex items-center gap-2 mb-4">
                      <AlertTriangle className="w-6 h-6 text-yellow-700" />
                      <span className="font-bold text-yellow-700 text-xl uppercase tracking-wide">
                        Why is this a limitation?
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border-l-4 border-yellow-600 bg-white p-4 rounded-r-lg">
                        <p className="text-black font-mono text-sm">
                          • Skills can decay over time without practice
                        </p>
                      </div>
                      <div className="border-l-4 border-yellow-600 bg-white p-4 rounded-r-lg">
                        <p className="text-black font-mono text-sm">
                          • May lead to overconfident predictions
                        </p>
                      </div>
                      <div className="border-l-4 border-yellow-600 bg-white p-4 rounded-r-lg">
                        <p className="text-black font-mono text-sm">
                          • Doesn't match human learning patterns
                        </p>
                      </div>
                      <div className="border-l-4 border-yellow-600 bg-white p-4 rounded-r-lg">
                        <p className="text-black font-mono text-sm">
                          • Systems might not provide adequate review
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Back Button */}
            <div className="flex justify-center">
              <button
                onClick={() => backToOverview()}
                className="px-8 py-4 bg-black text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-black hover:border-black transition-all transform hover:scale-105 flex items-center gap-3 font-mono"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Go Back</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderReflection = () => (
    <Layout title="Reflection: Incorrect Answers">
      <div className="max-w-4xl mx-auto">
        <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg text-center">
          <h2 className="text-3xl font-bold mb-6 text-black uppercase tracking-tight">
            Do you think answering incorrectly should always increase success
            probability?
          </h2>

          <div className="text-black mb-8 space-y-6">
            <p className="text-xl font-bold">
              Take a moment to think about this question and when you're ready,
              click the button below to return to the main scenario menu.
            </p>

            <div className="border-4 border-black rounded-xl p-6 bg-gray-100 text-left">
              <h3 className="font-bold text-black mb-4 text-xl uppercase tracking-wide">
                Consider these perspectives:
              </h3>
              <ul className="space-y-3 text-lg font-bold">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">PRO:</span>
                  <span>Every interaction is a learning opportunity</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">PRO:</span>
                  <span>Wrong answers can lead to deeper understanding</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">CON:</span>
                  <span>
                    Guessing randomly would still increase success probability
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">CON:</span>
                  <span>
                    No distinction between thoughtful errors and careless
                    mistakes
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <button
            onClick={backToOverview}
            className="px-8 py-4 bg-black text-white border-4 border-black rounded-xl font-bold text-xl uppercase tracking-wide hover:bg-white hover:text-black transition-all transform hover:scale-105 flex items-center gap-3 mx-auto"
          >
            <ArrowRight className="w-5 h-5 rotate-180" />
            <span>GO BACK</span>
          </button>
        </div>
      </div>
    </Layout>
  );

  const renderOverview = () => (
    <div className="bg-white min-h-screen flex flex-col text-black font-['IBM_Plex_Mono',monospace] py-8 px-4 md:px-10">
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-8">
        {/* Header */}
        <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative">
          <div className="absolute -top-6 left-4 px-3 py-1 bg-black text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            AFM LIMITATIONS
          </div>
          <div className="text-2xl md:text-3xl font-bold tracking-tight text-black text-center">
            Explore AFM's limitations through interactive scenarios
          </div>
          <p className="text-lg text-black text-center mt-4 font-bold">
            Complete all six scenarios below to proceed.
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="border-4 border-black rounded-xl p-4 bg-yellow-400 text-center">
          <span className="text-black font-bold text-xl uppercase tracking-wide">
            {completedScenarios.size} / 6 SCENARIOS COMPLETE
          </span>
        </div>

        {/* Scenarios Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {scenarios.map((scenario) => {
            const isCompleted = completedScenarios.has(scenario.id);
            const IconComponent = scenario.icon;
            const colorClasses = {
              red: "bg-red-100 border-red-600 text-red-700",
              blue: "bg-blue-100 border-blue-600 text-blue-700",
              green: "bg-green-100 border-green-600 text-green-700",
              purple: "bg-purple-100 border-purple-600 text-purple-700",
              orange: "bg-orange-100 border-orange-600 text-orange-700",
              pink: "bg-pink-100 border-pink-600 text-pink-700",
            };

            return (
              <div
                key={scenario.id}
                className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative"
              >
                <div
                  className={`absolute -top-6 left-4 px-3 py-1 font-semibold rounded-md text-xs tracking-wider flex items-center gap-2 border-4 border-black ${
                    colorClasses[scenario.color]
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  SCENARIO
                </div>

                <div className="text-center space-y-6">
                  <div className="flex items-center justify-center space-x-4">
                    <h3 className="text-2xl font-bold text-black uppercase tracking-tight">
                      {scenario.title}
                    </h3>
                    {isCompleted && (
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    )}
                  </div>

                  <button
                    className={`w-full px-6 py-4 border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide transition-all transform hover:scale-105 ${
                      isCompleted
                        ? "bg-green-600 text-white hover:bg-white hover:text-green-600"
                        : "bg-purple-600 text-white hover:bg-white hover:text-purple-600"
                    }`}
                    onClick={() => handleBeginTask(scenario.id)}
                  >
                    {isCompleted ? "REVIEW" : "BEGIN"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

        <div className="flex justify-center mt-12">
            <button
              className="px-12 py-4 bg-green-600 text-white border-4 border-black rounded-xl font-bold text-xl uppercase tracking-wide hover:bg-white hover:text-green-600 hover:border-green-600 transition-all transform hover:scale-105 flex items-center gap-3 font-['IBM_Plex_Mono',monospace]"
              onClick={() => {
                scroll(18);
              }}
            >
              <span>Continue to Next Section</span>
              <ArrowRight className="w-6 h-6" />
            </button>
        </div>
    </div>
  );

  // Main render logic
  const views = {
    setup: renderSetup,
    task: renderTask,
    "incorrect-answers": renderIncorrectAnswers,
    "incorrect-answers-reflection": renderReflection,
    overview: renderOverview,
    "no-forgetting": renderNoForgetting,
  };

  return views[currentView]?.() || renderOverview();
};
