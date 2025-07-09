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

  // Technical Layout Component
  const TechnicalLayout = ({ children }) => (
  <div className="bg-white min-h-screen font-mono relative">
    {/* Grid background */}
    <div 
      className="absolute inset-0 opacity-60"
      style={{
        backgroundImage: 'linear-gradient(to right, #d1d5db 1px, transparent 1px), linear-gradient(to bottom, #d1d5db 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }}
    />
    
    <div className="relative flex-1 px-8 py-6">{children}</div>
  </div>
);

  // Technical Card Component
  const TechnicalCard = ({ title, description, children, size = "normal", accent = "black" }) => {
    const sizeClasses = {
      normal: "p-6",
      large: "p-8",
      small: "p-4"
    };

    const accentClasses = {
      black: "border-black",
      red: "border-red-600",
      blue: "border-blue-600",
      green: "border-green-600",
      purple: "border-purple-600",
      orange: "border-orange-600",
      yellow: "border-yellow-600"
    };

    return (
      <div className={`border-2 ${accentClasses[accent]} bg-white ${sizeClasses[size]} relative`}>
        {/* Technical corner brackets */}
        <div className={`absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 ${accentClasses[accent]}`}></div>
        <div className={`absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 ${accentClasses[accent]}`}></div>
        <div className={`absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 ${accentClasses[accent]}`}></div>
        <div className={`absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 ${accentClasses[accent]}`}></div>
        
        {title && (
          <div className="mb-4">
            <h3 className="text-lg font-bold text-black tracking-wider uppercase">{title}</h3>
            {description && (
              <p className="text-sm font-mono text-gray-600 mt-2">{description}</p>
            )}
          </div>
        )}
        
        {children}
      </div>
    );
  };

  // Progress bar component
  const TechnicalProgressBar = ({ actual, label, color, showPredictionError = false, afmPrediction }) => {
    const colorClasses = {
      green: "bg-green-600",
      red: "bg-red-600",
      purple: "bg-purple-600",
      blue: "bg-blue-600"
    };

    const errorSize = showPredictionError ? Math.abs(actual - afmPrediction) : 0;
    const isUnderPredicted = actual > afmPrediction;

    return (
      <TechnicalCard accent={color === "green" ? "green" : color === "red" ? "red" : "purple"}>
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-bold text-black font-mono tracking-wider uppercase">
            {label}
          </span>
          <span className="text-lg font-bold text-black font-mono">
            {(actual * 100).toFixed(0)}%
          </span>
        </div>
        <div className="relative">
          <div className="w-full bg-gray-200 border-2 border-black h-8 relative">
            <div
              className={`h-full ${colorClasses[color]} transition-all duration-500 ease-out ${
                isAnimating ? "opacity-70" : ""
              }`}
              style={{ width: `${actual * 100}%` }}
            />
          </div>
          {showPredictionError && afmPrediction !== actual && (
            <div className="absolute top-0 left-0 w-full h-8">
              <div
                className="absolute top-0 h-8 border-2 border-dashed border-black bg-yellow-300 bg-opacity-70"
                style={{
                  left: `${Math.min(actual, afmPrediction) * 100}%`,
                  width: `${errorSize * 100}%`,
                }}
              />
              <div
                className="absolute top-1/2 transform -translate-y-1/2 text-xs font-bold text-black bg-white px-2 py-1 border border-black font-mono"
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
              className={`font-bold text-sm font-mono tracking-wider uppercase ${
                isUnderPredicted ? "text-red-600" : "text-blue-600"
              }`}
            >
              {isUnderPredicted ? "UNDER" : "OVER"}-PREDICTED BY{" "}
              {(errorSize * 100).toFixed(0)}%
            </span>
          </div>
        )}
      </TechnicalCard>
    );
  };

  // Button component
  const TechnicalButton = ({ children, onClick, variant = "primary", disabled = false, size = "normal" }) => {
    const baseClasses = "font-mono font-bold tracking-wider uppercase transition-all transform hover:scale-105 border-2 border-black";
    const sizeClasses = {
      small: "px-4 py-2 text-sm",
      normal: "px-6 py-3 text-base",
      large: "px-8 py-4 text-lg"
    };
    const variantClasses = {
      primary: "bg-black text-white hover:bg-white hover:text-black",
      secondary: "bg-white text-black hover:bg-black hover:text-white",
      danger: "bg-red-600 text-white hover:bg-white hover:text-red-600",
      success: "bg-green-600 text-white hover:bg-white hover:text-green-600",
      warning: "bg-yellow-600 text-white hover:bg-white hover:text-yellow-600"
    };

    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        {children}
      </button>
    );
  };

  // View renderers
  const renderSetup = () => (
    <TechnicalLayout title="Uniform Learning Rates" subtitle="CONFIGURATION">
      <div className="max-w-4xl mx-auto space-y-6">
        <TechnicalCard 
          title="Configure AFM Learning Rate"
          description="Set the learning rate γ (gamma) that AFM will use for both students"
          size="large"
        >
          <div className="space-y-6">
            <div className="border-2 border-gray-300 p-6 bg-gray-50">
              <div className="text-left max-w-md mx-auto">
                <label className="block text-base font-bold text-black mb-4 uppercase tracking-wide font-mono">
                  Learning Rate γ:{" "}
                  <span className="text-xl text-purple-600">
                    {learningRate.toFixed(2)}
                  </span>
                </label>
                <div className="relative">
                  <div className="w-full h-6 bg-gray-200 border-2 border-black">
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
                  <div className="flex justify-between text-xs font-bold text-black mt-2 uppercase font-mono">
                    <span>0.05 (SLOW)</span>
                    <span>0.15 (FAST)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-orange-600 bg-orange-50 p-4">
              <p className="text-black font-bold text-sm font-mono">
                NOTE: In reality, students have different learning rates, but AFM uses this single value for all learners.
              </p>
            </div>

            <div className="text-center">
              <TechnicalButton
                onClick={() => setCurrentView("task")}
                variant="primary"
                size="large"
              >
                START SIMULATION →
              </TechnicalButton>
            </div>
          </div>
        </TechnicalCard>
      </div>
    </TechnicalLayout>
  );

  const renderTask = () => {
    const currentStep = simulationSteps[step];
    const showErrors = step > 0;
    const isLastStep = step === simulationSteps.length - 1;

    return (
      <TechnicalLayout title="Uniform Learning Rates" subtitle={`STEP ${step + 1}/${simulationSteps.length}`}>
        <div className="max-w-4xl mx-auto space-y-6">
          <TechnicalCard title={currentStep.title} description={currentStep.description}>
            <div className="flex justify-between items-center mb-6">
              <div className="border border-black px-3 py-1 bg-purple-100">
                <span className="font-mono text-sm">γ = {learningRate.toFixed(2)}</span>
              </div>
            </div>
          </TechnicalCard>

          <div className="space-y-4">
            <TechnicalProgressBar
              actual={currentStep.fastStudent.actual}
              label="FAST LEARNER"
              color="green"
              showPredictionError={showErrors}
              afmPrediction={currentStep.afmPrediction}
            />
            <TechnicalProgressBar
              actual={currentStep.slowStudent.actual}
              label="SLOW LEARNER"
              color="red"
              showPredictionError={showErrors}
              afmPrediction={currentStep.afmPrediction}
            />

            {showErrors && (
              <TechnicalCard accent="yellow">
                <div className="text-center space-y-2">
                  <span className="text-lg font-bold text-black uppercase tracking-wide font-mono">
                    AFM UNIFORM PREDICTION: {(currentStep.afmPrediction * 100).toFixed(0)}%
                  </span>
                  <p className="text-sm font-bold text-black font-mono">
                    SAME PREDICTION FOR BOTH STUDENTS USING γ = {learningRate.toFixed(2)}
                  </p>
                </div>
              </TechnicalCard>
            )}
          </div>

          <div className="flex justify-center space-x-4">
            <TechnicalButton
              onClick={() => navigateStep(-1)}
              disabled={step === 0}
              variant="secondary"
            >
              ← PREVIOUS
            </TechnicalButton>

            <div className="border-2 border-black px-6 py-3 bg-white font-mono font-bold uppercase tracking-wide">
              STEP {step + 1} OF {simulationSteps.length}
            </div>

            <TechnicalButton
              onClick={isLastStep ? backToOverview : () => navigateStep(1)}
              variant={isLastStep ? "success" : "primary"}
            >
              {isLastStep ? "COMPLETE TASK ✓" : "NEXT →"}
            </TechnicalButton>
          </div>

          {isLastStep && showErrors && (
            <TechnicalCard accent="orange" title="Key Insights">
              <ul className="text-sm font-bold text-black space-y-2 font-mono">
                <li>• AFM USES THE SAME LEARNING RATE FOR ALL STUDENTS</li>
                <li>• FAST LEARNERS EXCEED AFM PREDICTIONS (UNDER-PREDICTED)</li>
                <li>• SLOW LEARNERS FALL SHORT OF AFM PREDICTIONS (OVER-PREDICTED)</li>
                <li>• INDIVIDUAL DIFFERENCES IN LEARNING SPEED ARE NOT CAPTURED</li>
              </ul>
            </TechnicalCard>
          )}
        </div>
      </TechnicalLayout>
    );
  };

  const renderIncorrectAnswers = () => (
    <TechnicalLayout title="Incorrect Answers Impact" subtitle="ANALYSIS">
      <div className="max-w-4xl mx-auto space-y-6">
        <TechnicalCard 
          title="Observe Success Probability Changes"
          description="Answer the question below and watch how your success probability changes"
        >
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-bold text-black uppercase tracking-wide font-mono">
              SUCCESS PROBABILITY: {(initialProb * 100).toFixed(0)}%
            </span>
            <div className="flex items-center space-x-4">
              <span className="text-sm font-bold text-black font-mono">0%</span>
              <div className="w-64 bg-gray-200 border-2 border-black h-6">
                <div
                  className="h-full bg-purple-600 transition-all duration-1000 ease-out"
                  style={{ width: `${initialProb * 100}%` }}
                />
              </div>
              <span className="text-sm font-bold text-black font-mono">100%</span>
            </div>
          </div>
        </TechnicalCard>

        <TechnicalCard title={pythonQuestion.question} accent="blue">
          <div className="border-2 border-orange-600 bg-orange-50 p-4 mb-6">
            <p className="text-sm font-bold text-orange-800 font-mono">
              {pythonQuestion.hint}
            </p>
          </div>

          <div className="bg-black text-green-400 p-4 font-mono text-sm mb-6 border-2 border-black">
            <pre className="whitespace-pre-wrap">{pythonQuestion.code}</pre>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-6">
            {pythonQuestion.options.map((option, index) => (
              <TechnicalButton
                key={index}
                onClick={() => !showFeedback && handleAnswerSelect(option)}
                disabled={showFeedback}
                variant={selectedAnswer === option ? "danger" : "secondary"}
                size="normal"
              >
                {option}
              </TechnicalButton>
            ))}
          </div>

          {showFeedback && (
            <div className="space-y-4">
              <div className="border-l-4 border-yellow-600 bg-yellow-50 p-4">
                <p className="text-black text-sm font-bold font-mono">
                  Did you notice that your success probability increased, even though you got the answer wrong?
                  There really wasn't a correct answer option. This is an interesting characteristic of AFM.
                </p>
              </div>

              <div className="border-l-4 border-blue-600 bg-blue-50 p-4">
                <p className="text-black mb-3 text-sm font-bold font-mono">
                  Why might it make sense for success probability to increase regardless of correctness?{" "}
                  <button
                    onClick={() => setShowExplanation(true)}
                    className="text-blue-700 font-bold hover:text-blue-800 underline cursor-pointer"
                  >
                    TELL ME!
                  </button>
                </p>
                {showExplanation && (
                  <div className="border-2 border-blue-600 bg-white p-4 mt-4">
                    <p className="text-black text-sm font-bold font-mono">
                      AFM considers every answer as a learning opportunity that raises your success probability.
                      Reviewing incorrect answers often helps solidify knowledge and reduce future mistakes.
                    </p>
                  </div>
                )}
              </div>

              <div className="text-center">
                <TechnicalButton
                  onClick={() => setCurrentView("incorrect-answers-reflection")}
                  variant="primary"
                  size="large"
                >
                  CONTINUE →
                </TechnicalButton>
              </div>
            </div>
          )}
        </TechnicalCard>
      </div>
    </TechnicalLayout>
  );

  const renderReflection = () => (
    <TechnicalLayout title="Incorrect Answers Impact" subtitle="REFLECTION">
      <div className="max-w-4xl mx-auto space-y-6">
        <TechnicalCard 
          title="Critical Analysis" 
          description="Evaluate AFM's approach to incorrect answers"
          size="large"
          accent="orange"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-black uppercase tracking-wider font-mono mb-4">
              Should answering incorrectly always increase success probability?
            </h2>
            <p className="text-lg font-bold text-black font-mono">
              Consider the implications of AFM's current approach
            </p>
          </div>
        </TechnicalCard>

        <TechnicalCard title="Perspective Analysis" accent="blue">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-l-4 border-green-600 bg-green-50 p-4">
              <h3 className="font-bold text-green-700 mb-3 text-lg uppercase tracking-wide font-mono">
                ARGUMENTS FOR
              </h3>
              <ul className="space-y-2 text-black font-mono text-sm">
                <li>• EVERY INTERACTION = LEARNING OPPORTUNITY</li>
                <li>• WRONG ANSWERS → DEEPER UNDERSTANDING</li>
                <li>• ENCOURAGES CONTINUED ENGAGEMENT</li>
                <li>• MISTAKES PART OF LEARNING PROCESS</li>
              </ul>
            </div>
            
            <div className="border-l-4 border-red-600 bg-red-50 p-4">
              <h3 className="font-bold text-red-700 mb-3 text-lg uppercase tracking-wide font-mono">
                ARGUMENTS AGAINST
              </h3>
              <ul className="space-y-2 text-black font-mono text-sm">
                <li>• RANDOM GUESSING STILL INCREASES PROBABILITY</li>
                <li>• NO DISTINCTION: THOUGHTFUL VS CARELESS</li>
                <li>• REINFORCES INCORRECT PATTERNS</li>
                <li>• UNREALISTIC SUCCESS PREDICTIONS</li>
              </ul>
            </div>
          </div>
        </TechnicalCard>

        <div className="text-center">
          <TechnicalButton
            onClick={backToOverview}
            variant="primary"
            size="large"
          >
            ← RETURN TO OVERVIEW
          </TechnicalButton>
        </div>
      </div>
    </TechnicalLayout>
  );

  const renderNoForgetting = () => (
    <TechnicalLayout title="No Forgetting Assumption" subtitle="MEMORY DECAY EXPERIMENT">
      <div className="max-w-4xl mx-auto space-y-6">
        <TechnicalCard 
          title="Memory Decay Scenario"
          description="Predict how success probability changes over time without practice"
          size="large"
        >
          <div className="border-2 border-blue-600 bg-blue-50 p-6">
            <p className="text-black text-lg font-mono leading-relaxed">
              <strong>SCENARIO:</strong> Aileen learned Python for 3 months and achieved an{" "}
              <span className="bg-yellow-300 px-2 py-1 border-2 border-black font-bold">
                80% SUCCESS PROBABILITY
              </span>{" "}
              in AFM. If she doesn't practice Python after today, predict her success probability:
            </p>
          </div>
        </TechnicalCard>

        {!showAnswer ? (
          <>
            <div className="space-y-4">
              {[
                { label: "5 DAYS", key: "days", accent: "orange" },
                { label: "2 MONTHS", key: "months", accent: "purple" },
                { label: "1 YEAR", key: "year", accent: "red" },
              ].map(({ label, key, accent }) => (
                <TechnicalCard key={key} title={label} accent={accent}>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-bold text-black font-mono">
                      PREDICTED SUCCESS: {(sliderValues[key] * 100).toFixed(1)}%
                    </span>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 font-mono">
                      <span>0%</span>
                      <span>|</span>
                      <span>100%</span>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="w-full bg-gray-200 border-2 border-black h-8">
                      <div
                        className={`h-full bg-${accent === "orange" ? "orange" : accent === "purple" ? "purple" : "red"}-600 transition-all duration-300`}
                        style={{ width: `${sliderValues[key] * 100}%` }}
                      />
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={sliderValues[key]}
                      onChange={(e) => handleSliderChange(key, parseFloat(e.target.value))}
                      className="absolute top-0 w-full h-8 opacity-0 cursor-pointer"
                    />
                  </div>
                </TechnicalCard>
              ))}
            </div>

            <TechnicalCard title="General Prediction" accent="green">
              <div className="text-center space-y-4">
                <p className="text-black font-mono text-lg font-bold">
                  WHEN DOES SUCCESS PROBABILITY START DECREASING?
                </p>
                <div className="flex items-center justify-center space-x-4 flex-wrap gap-4">
                  <div className="border-2 border-black bg-white">
                    <input
                      type="number"
                      value={userGuess.value}
                      onChange={(e) => setUserGuess(prev => ({ ...prev, value: parseInt(e.target.value) || 0 }))}
                      className="w-24 px-4 py-3 text-center font-bold text-xl font-mono bg-white focus:bg-yellow-100 focus:outline-none border-none"
                      min="1"
                    />
                  </div>
                  <div className="border-2 border-black bg-white">
                    <select
                      value={userGuess.unit}
                      onChange={(e) => setUserGuess(prev => ({ ...prev, unit: e.target.value }))}
                      className="px-4 py-3 bg-white font-bold font-mono text-lg focus:bg-yellow-100 focus:outline-none border-none"
                    >
                      <option value="days">DAYS</option>
                      <option value="weeks">WEEKS</option>
                      <option value="months">MONTHS</option>
                      <option value="years">YEARS</option>
                    </select>
                  </div>
                  <span className="text-black font-mono font-bold">
                    AFTER STOPPING PRACTICE
                  </span>
                </div>
              </div>
            </TechnicalCard>

            <div className="text-center">
              <TechnicalButton
                onClick={handleGuessSubmit}
                variant="primary"
                size="large"
              >
                SUBMIT PREDICTION
              </TechnicalButton>
            </div>
          </>
        ) : (
          <div className="space-y-6">
            <TechnicalCard title="Your Prediction" accent="orange">
              <div className="text-center">
                <p className="text-black font-bold font-mono text-lg">
                  YOU PREDICTED: {userGuess.value} {userGuess.unit.toUpperCase()}
                </p>
              </div>
            </TechnicalCard>

            <TechnicalCard title="AFM's Reality" accent="red">
              <div className="text-center space-y-4">
                <p className="text-black font-mono text-lg">
                  AFM will start decreasing your success probability...
                </p>
                {!showTellMeAnswer && (
                  <TechnicalButton
                    onClick={() => setShowTellMeAnswer(true)}
                    variant="danger"
                    size="large"
                  >
                    REVEAL ANSWER
                  </TechnicalButton>
                )}
              </div>
            </TechnicalCard>

            {showTellMeAnswer && (
              <>
                <TechnicalCard title="The Truth" accent="blue">
                  <div className="text-center space-y-4">
                    <div className="bg-red-300 border-2 border-black px-6 py-4 inline-block">
                      <span className="text-black font-bold text-2xl font-mono">
                        NEVER!
                      </span>
                    </div>
                    <p className="text-black font-mono text-lg">
                      AFM assumes once you've mastered a skill, you'll never forget it.
                      Your 80% success probability remains constant indefinitely.
                    </p>
                  </div>
                </TechnicalCard>

                <TechnicalCard title="Why This Is Problematic" accent="yellow">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border-l-4 border-yellow-600 bg-white p-4">
                      <p className="text-black font-mono text-sm font-bold">
                        • SKILLS DECAY WITHOUT PRACTICE
                      </p>
                    </div>
                    <div className="border-l-4 border-yellow-600 bg-white p-4">
                      <p className="text-black font-mono text-sm font-bold">
                        • OVERCONFIDENT PREDICTIONS
                      </p>
                    </div>
                    <div className="border-l-4 border-yellow-600 bg-white p-4">
                      <p className="text-black font-mono text-sm font-bold">
                        • DOESN'T MATCH HUMAN LEARNING
                      </p>
                    </div>
                    <div className="border-l-4 border-yellow-600 bg-white p-4">
                      <p className="text-black font-mono text-sm font-bold">
                        • INADEQUATE REVIEW SCHEDULING
                      </p>
                    </div>
                  </div>
                </TechnicalCard>
              </>
            )}

            <div className="text-center">
              <TechnicalButton
                onClick={backToOverview}
                variant="primary"
                size="large"
              >
                ← RETURN TO OVERVIEW
              </TechnicalButton>
            </div>
          </div>
        )}
      </div>
    </TechnicalLayout>
  );

  const renderOverview = () => (
    <TechnicalLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <TechnicalCard 
          title="Mission Objective"
          description="Complete all scenarios to understand AFM's limitations"
          size="large"
        >
          <div className="text-center">
            <div className="bg-yellow-300 border-2 border-black px-6 py-3 inline-block mb-4">
              <span className="text-black font-bold text-xl font-mono">
                PROGRESS: {completedScenarios.size} / 6 SCENARIOS COMPLETE
              </span>
            </div>
            <p className="text-black font-mono text-lg">
              Explore each limitation through hands-on experimentation
            </p>
          </div>
        </TechnicalCard>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {scenarios.map((scenario) => {
            const isCompleted = completedScenarios.has(scenario.id);
            const IconComponent = scenario.icon;

            return (
              <TechnicalCard
                key={scenario.id}
                title={scenario.title}
                accent={scenario.color}
                size="large"
              >
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center space-x-4">
                    <IconComponent className="w-8 h-8 text-black" />
                    {isCompleted && (
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    )}
                  </div>

                  <TechnicalButton
                    onClick={() => handleBeginTask(scenario.id)}
                    variant={isCompleted ? "success" : "primary"}
                    size="large"
                  >
                    {isCompleted ? "REVIEW SCENARIO" : "BEGIN SCENARIO"}
                  </TechnicalButton>
                </div>
              </TechnicalCard>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <TechnicalButton
            onClick={() => scroll(17)}
            variant="success"
            size="large"
          >
            CONTINUE TO NEXT SECTION →
          </TechnicalButton>
        </div>
      </div>
    </TechnicalLayout>
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