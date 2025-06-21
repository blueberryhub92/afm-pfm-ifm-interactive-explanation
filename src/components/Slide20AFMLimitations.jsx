import { useState } from "react";

export const Slide20AFMLimitations = () => {
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

  const handleSliderChange = (period, value) => {
    setSliderValues((prev) => ({ ...prev, [period]: value }));
  };

  const handleGuessSubmit = () => {
    setShowAnswer(true);
  };

  const scenarios = [
    { title: "Binary Skills", id: "binary-skills" },
    { title: "No Forgetting", id: "no-forgetting" },
    { title: "Context Blind", id: "context-blind" },
    { title: "Cold Start Problem", id: "cold-start-problem" },
    { title: "Uniform Learning Rates", id: "uniform-learning-rates" },
    { title: "Incorrect Answers", id: "incorrect-answers" },
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
      setShowFeedback(false);
      setInitialProb(0.25);
    } else if (taskId === "no-forgetting") {
      setCurrentView("no-forgetting");
      setShowAnswer(false);
      setShowTellMeAnswer(false);
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
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          <span className="text-sm text-gray-600">
            Success Probability: {(actual * 100).toFixed(0)}%
          </span>
        </div>
        <div className="relative">
          <div className="w-full bg-gray-200 rounded h-6 overflow-hidden">
            <div
              className={`h-full ${color} transition-all duration-500 ease-out ${
                isAnimating ? "opacity-70" : ""
              }`}
              style={{ width: `${actual * 100}%` }}
            />
          </div>
          {showPredictionError && afmPrediction !== actual && (
            <div className="absolute top-0 left-0 w-full h-6">
              <div
                className="absolute top-0 h-6 border-2 border-dashed border-gray-600 bg-gray-300 bg-opacity-50"
                style={{
                  left: `${Math.min(actual, afmPrediction) * 100}%`,
                  width: `${errorSize * 100}%`,
                }}
              />
              <div
                className="absolute top-1/2 transform -translate-y-1/2 text-xs font-bold text-gray-700 bg-white px-1 rounded"
                style={{
                  left: `${afmPrediction * 100}%`,
                  transform: "translateX(-50%) translateY(-50%)",
                }}
              >
                AFM
              </div>
            </div>
          )}
          <div className="absolute -bottom-4 left-0 w-full flex justify-between text-xs text-gray-400">
            <span>0</span>
            <span className="absolute left-1/2 transform -translate-x-1/2">
              |
            </span>
            <span>1</span>
          </div>
        </div>
        {showPredictionError && afmPrediction !== actual && (
          <div className="text-xs text-center">
            <span
              className={`font-medium ${
                isUnderPredicted ? "text-red-600" : "text-blue-600"
              }`}
            >
              {isUnderPredicted ? "Under" : "Over"}-predicted by{" "}
              {(errorSize * 100).toFixed(0)}%
            </span>
          </div>
        )}
      </div>
    );
  };

  const Layout = ({ title, children }) => (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-100">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4 shadow-lg">
        <div className="flex items-center justify-center text-lg">
          <span className="text-white font-semibold">{title}</span>
        </div>
      </div>
      <div
        className="flex flex-col items-center justify-center px-8 py-16"
        style={{ minHeight: "calc(100vh - 80px)" }}
      >
        {children}
      </div>
    </div>
  );

  // View renderers
  const renderSetup = () => (
    <Layout title="Task: Uniform Learning Rates - Setup">
      <div className="max-w-4xl w-full">
        <div className="bg-white rounded-xl shadow-2xl p-8 text-center space-y-8 border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Configure AFM Learning Rate
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            Set the learning rate γ (gamma) that AFM will use for both students.
            This single rate will be applied uniformly regardless of individual
            learning differences.
          </p>
          <div className="space-y-6">
            <div className="text-left max-w-md mx-auto">
              <label className="block text-sm font-medium text-purple-600 mb-3">
                Learning Rate γ:{" "}
                <span className="font-bold text-xl">
                  {learningRate.toFixed(2)}
                </span>
              </label>
              <div className="relative">
                <input
                  type="range"
                  min="0.05"
                  max="0.15"
                  step="0.01"
                  value={learningRate}
                  onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                  className="w-full h-3 bg-purple-200 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #9333ea 0%, #9333ea ${
                      ((learningRate - 0.05) / 0.1) * 100
                    }%, #e9d5ff ${
                      ((learningRate - 0.05) / 0.1) * 100
                    }%, #e9d5ff 100%)`,
                  }}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>0.05 (Slow)</span>
                  <span>0.15 (Fast)</span>
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-600 bg-amber-50 p-4 rounded-lg border border-amber-200">
              <p>
                <strong>Note:</strong> In reality, students have different
                learning rates, but AFM uses this single value for all learners.
              </p>
            </div>
          </div>
          <button
            onClick={() => setCurrentView("task")}
            className="w-full max-w-md px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg hover:from-pink-700 hover:to-purple-700 transition-all duration-300 font-semibold text-lg shadow-lg transform hover:scale-105"
          >
            Start Simulation →
          </button>
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
        <div className="max-w-4xl w-full space-y-8">
          <div className="bg-white rounded-xl shadow-2xl p-8 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">
                {currentStep.title}
              </h3>
              <div className="text-sm text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                AFM Learning Rate: γ = {learningRate.toFixed(2)}
              </div>
            </div>

            <p className="text-center text-gray-600 mb-8 text-lg">
              {currentStep.description}
            </p>

            <div className="space-y-8">
              <ProbabilityBar
                actual={currentStep.fastStudent.actual}
                label="Fast Learner"
                color="bg-gradient-to-r from-green-400 to-green-600"
                showPredictionError={showErrors}
                afmPrediction={currentStep.afmPrediction}
              />
              <ProbabilityBar
                actual={currentStep.slowStudent.actual}
                label="Slow Learner"
                color="bg-gradient-to-r from-red-400 to-red-600"
                showPredictionError={showErrors}
                afmPrediction={currentStep.afmPrediction}
              />

              {showErrors && (
                <div className="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-300">
                  <div className="text-center space-y-2">
                    <span className="text-sm font-medium text-gray-700">
                      AFM Uniform Prediction:{" "}
                      {(currentStep.afmPrediction * 100).toFixed(0)}%
                    </span>
                    <p className="text-xs text-gray-500">
                      Same prediction for both students using γ ={" "}
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
              className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              ← Previous
            </button>

            <span className="px-6 py-3 bg-white rounded-lg shadow-md text-gray-700 border border-gray-200">
              Step {step + 1} of {simulationSteps.length}
            </span>

            <button
              onClick={isLastStep ? backToOverview : () => navigateStep(1)}
              className={`px-6 py-3 text-white rounded-lg transition-all duration-300 shadow-md ${
                isLastStep
                  ? "bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700"
                  : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              }`}
            >
              {isLastStep ? "Complete Task ✓" : "Next →"}
            </button>
          </div>

          {isLastStep && showErrors && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">
                Key Insights:
              </h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• AFM uses the same learning rate for all students</li>
                <li>
                  • Fast learners exceed AFM predictions (under-predicted)
                </li>
                <li>
                  • Slow learners fall short of AFM predictions (over-predicted)
                </li>
                <li>
                  • Individual differences in learning speed are not captured
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
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center mb-6">
          <p className="text-gray-700 leading-relaxed text-lg">
            Answer the multiple-choice question below.{" "}
            <em className="text-purple-600 font-semibold">
              Pay attention to what happens to your success probability after
              you submit your answer.
            </em>
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold text-gray-800">
              Success Probability: {(initialProb * 100).toFixed(0)}%
            </span>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600">0%</span>
              <div className="w-64 bg-gray-200 rounded-full h-6 overflow-hidden relative shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-pink-500 to-purple-600 transition-all duration-1000 ease-out"
                  style={{ width: `${initialProb * 100}%` }}
                />
                <div className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white text-sm font-bold">
                  |
                </div>
              </div>
              <span className="text-sm text-gray-600">100%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-2xl p-8 border border-gray-100">
          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
            {pythonQuestion.question}
          </h2>
          <p className="text-sm text-amber-600 text-center mb-6 italic bg-amber-50 p-2 rounded">
            {pythonQuestion.hint}
          </p>

          <div className="bg-gray-900 text-green-400 p-6 rounded-lg font-mono text-sm mb-8 overflow-x-auto shadow-inner">
            <pre className="whitespace-pre-wrap">{pythonQuestion.code}</pre>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-8">
            {pythonQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => !showFeedback && handleAnswerSelect(option)}
                disabled={showFeedback}
                className={`px-6 py-4 rounded-lg border-2 transition-all duration-300 font-semibold ${
                  selectedAnswer === option
                    ? "bg-red-100 border-red-500 text-red-700 shadow-lg"
                    : showFeedback
                    ? "bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-white border-gray-300 hover:border-purple-400 hover:bg-purple-50 cursor-pointer shadow-md hover:shadow-lg transform hover:scale-105"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {showFeedback && (
            <div className="space-y-6">
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg shadow-md">
                <p className="text-gray-700 text-lg">
                  Did you notice that your success probability increased, even
                  though you got the answer wrong?{" "}
                  <em className="text-yellow-700 font-semibold">
                    We promise there really wasn't a correct answer option.
                  </em>{" "}
                  This is another interesting characteristic of AFM, but it
                  isn't necessarily a flaw.
                </p>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg text-left shadow-md">
                <p className="text-gray-700 mb-3 text-lg">
                  Why might it make sense for success probability to increase
                  regardless of the correctness of your answer?{" "}
                  <strong className="text-blue-700">Tell me!</strong>
                </p>
                <p className="text-gray-600">
                  Well, BKT considers every answer, wrong or right, as a
                  learning opportunity that brings you one step closer to
                  mastery. As you might have experienced in real life, reviewing
                  incorrect answers often helps to solidify your knowledge even
                  more and reduce the chance that you'll make the same mistake
                  again.
                </p>
              </div>

              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setCurrentView("incorrect-answers-reflection")}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-md"
                >
                  Continue →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );

  const renderReflection = () => (
    <Layout title="Reflection: Incorrect Answers">
      <div className="max-w-4xl w-full space-y-8">
        <div className="bg-white rounded-xl shadow-2xl p-8 text-center border border-gray-100">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Do you think answering incorrectly should always increase success
            probability?
          </h2>

          <div className="text-gray-600 mb-8 space-y-4">
            <p className="text-lg">
              Take a moment to think about this question and when you're ready,
              click the button below to return to the main scenario menu.
            </p>

            <div className="bg-gray-50 p-6 rounded-lg text-left">
              <h3 className="font-semibold text-gray-800 mb-3">
                Consider these perspectives:
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  • <strong>Pro:</strong> Every interaction is a learning
                  opportunity
                </li>
                <li>
                  • <strong>Pro:</strong> Wrong answers can lead to deeper
                  understanding
                </li>
                <li>
                  • <strong>Con:</strong> Guessing randomly would still increase
                  success probability
                </li>
                <li>
                  • <strong>Con:</strong> No distinction between thoughtful
                  errors and careless mistakes
                </li>
              </ul>
            </div>
          </div>

          <button
            onClick={backToOverview}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 text-lg font-semibold shadow-lg transform hover:scale-105"
          >
            ← Go Back
          </button>
        </div>
      </div>
    </Layout>
  );

  const renderOverview = () => (
    <div
      className="flex flex-col items-center justify-center px-8 py-16"
      style={{ minHeight: "calc(100vh - 80px)" }}
    >
      <div className="max-w-6xl w-full space-y-8">
        <div className="text-center mb-8">
          <p className="text-lg text-gray-700 leading-relaxed">
            Now, let's explore AFM more deeply to find out more about its
            limitations and behavior in different situations. Complete all six
            scenarios below to proceed.
          </p>
        </div>

        <div className="text-right mb-4">
          <span className="text-orange-500 font-medium">
            {completedScenarios.size} / 6 scenarios complete
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {scenarios.map((scenario) => {
            const isCompleted = completedScenarios.has(scenario.id);
            return (
              <div
                key={scenario.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
              >
                <div className="p-6 text-center space-y-4">
                  <div className="flex items-center justify-center space-x-2">
                    <h3 className="text-lg font-medium text-gray-800 italic leading-relaxed">
                      {scenario.title}
                    </h3>
                    {isCompleted && (
                      <span className="text-green-500 text-xl">✓</span>
                    )}
                  </div>
                  <button
                    className={`w-full px-6 py-3 rounded-lg font-semibold transition-colors ${
                      isCompleted
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : "bg-pink-600 text-white hover:bg-pink-700"
                    }`}
                    onClick={() => handleBeginTask(scenario.id)}
                  >
                    {isCompleted ? "Review" : "Begin"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Continue button appears when all scenarios are completed */}
        {completedScenarios.size === 6 && (
          <div className="text-center mt-12">
            <button
              className="px-12 py-4 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg hover:from-green-700 hover:to-teal-700 transition-all duration-300 text-xl font-bold shadow-lg transform hover:scale-105"
              onClick={() => {
                // Add your continue logic here
                console.log(
                  "All scenarios completed! Continue to next section..."
                );
              }}
            >
              Continue to Next Section →
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderNoForgetting = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-100">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4 shadow-lg">
        <div className="flex items-center justify-center text-lg">
          <span className="text-white font-semibold">
            When does your success probability decrease?
          </span>
        </div>
      </div>

      <div
        className="flex flex-col items-center justify-center px-8 py-16"
        style={{ minHeight: "calc(100vh - 80px)" }}
      >
        <div className="max-w-4xl w-full space-y-8">
          <div className="text-center mb-6">
            <p className="text-gray-600 italic text-lg">
              Read the scenario below and then answer the questions.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-2xl p-8 border border-gray-100">
            <div className="text-gray-700 mb-8 text-lg leading-relaxed">
              <p>
                Kris is a student who has been learning Python for 3 months.
                Today, she tested her knowledge of programming in Python with
                AFM and received a success probability of <strong>80%</strong>.
                If Kris doesn't review or practice Python after today, what do
                you predict her success probability to be in:
              </p>
            </div>

            {!showAnswer ? (
              <>
                <div className="text-center mb-6">
                  <p className="text-gray-600 italic">Drag the sliders!</p>
                </div>

                <div className="space-y-8 mb-8">
                  {[
                    {
                      label: "5 days",
                      key: "days",
                      color: "from-orange-400 to-orange-600",
                    },
                    {
                      label: "2 months",
                      key: "months",
                      color: "from-purple-400 to-purple-600",
                    },
                    {
                      label: "1 year",
                      key: "year",
                      color: "from-red-400 to-red-600",
                    },
                  ].map(({ label, key, color }) => (
                    <div key={key} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700 font-semibold text-lg">
                          {label}: {sliderValues[key].toFixed(1)}
                        </span>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <span>0%</span>
                          <span>|</span>
                          <span>100%</span>
                        </div>
                      </div>
                      <div className="relative">
                        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r ${color} transition-all duration-300`}
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
                          className="absolute top-0 w-full h-4 opacity-0 cursor-pointer"
                        />
                        <div
                          className="absolute top-0 w-6 h-4 bg-gray-800 rounded cursor-pointer transform -translate-x-3"
                          style={{ left: `${sliderValues[key] * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50 p-6 rounded-lg mb-8">
                  <p className="text-gray-700 mb-4">
                    In general, when do you think the success probability starts
                    decreasing? Enter your answer below.
                  </p>
                  <div className="flex items-center space-x-4 justify-center flex-wrap">
                    <input
                      type="number"
                      value={userGuess.value}
                      onChange={(e) =>
                        setUserGuess((prev) => ({
                          ...prev,
                          value: parseInt(e.target.value) || 0,
                        }))
                      }
                      className="w-20 px-3 py-2 border border-gray-300 rounded-md text-center focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
                      className="px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option value="weeks">weeks</option>
                      <option value="months">months</option>
                      <option value="years">years</option>
                    </select>
                    <span className="text-gray-600">
                      after you stop reviewing the material.
                    </span>
                  </div>
                </div>

                <div className="text-center">
                  <button
                    onClick={handleGuessSubmit}
                    className="px-8 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-semibold shadow-lg"
                  >
                    Submit answer
                  </button>
                </div>
              </>
            ) : (
              <div className="space-y-6">
                <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-lg">
                  <p className="text-orange-800 font-medium">
                    You guessed: {userGuess.value} {userGuess.unit}
                  </p>
                </div>

                <div className="text-gray-700 text-lg">
                  <p className="mb-4">
                    Alright, now that you've submitted your guesses, it's time
                    to reveal the answer! AFM will start decreasing your
                    success probability...
                  </p>
                  <p
                    className="font-semibold text-purple-600 text-xl underline cursor-pointer hover:text-purple-800 transition-colors"
                    onClick={() => setShowTellMeAnswer(true)}
                  >
                    Tell me!
                  </p>
                </div>

                {showTellMeAnswer && (
                  <>
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
                      <p className="text-blue-800 text-lg leading-relaxed">
                        <strong>Never!</strong> AFM assumes that once you've
                        mastered a skill, you'll never forget it. Your
                        probability of success will remain at 80% indefinitely,
                        whether it's been 5 days, 2 months, or even 1 year since
                        you last practiced Python.
                      </p>
                    </div>

                    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">
                        Why is this a limitation?
                      </h4>
                      <ul className="text-yellow-700 space-y-1 text-sm">
                        <li>
                          • In reality, skills can decay over time without
                          practice
                        </li>
                        <li>
                          • This may lead to overconfident predictions for
                          long-inactive students
                        </li>
                        <li>
                          • Educational systems might not provide adequate
                          review opportunities
                        </li>
                        <li>
                          • The "no forgetting" assumption doesn't match human
                          learning patterns
                        </li>
                      </ul>
                    </div>
                  </>
                )}

                <div className="text-center">
                  <button
                    onClick={() => backToOverview()}
                    className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 text-lg font-semibold shadow-lg transform hover:scale-105"
                  >
                    ← Go Back
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
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
