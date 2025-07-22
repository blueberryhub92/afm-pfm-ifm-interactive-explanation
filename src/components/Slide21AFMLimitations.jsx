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
  BarChart3,
  Grid3x3,
} from "lucide-react";
import { ArrowLeft, TrendingDown, Calendar } from "lucide-react";

export const Slide21AFMLimitations = ({ scroll }) => {
  const [currentView, setCurrentView] = useState("overview");
  const [completedScenarios, setCompletedScenarios] = useState(new Set());
  const [simStep, setSimStep] = useState(0);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showComparison, setShowComparison] = useState(false);
  const [animating, setAnimating] = useState(false);

  const [contextStep, setContextStep] = useState(0);
  const [selectedStrategy, setSelectedStrategy] = useState(null);
  const [showTrajectory, setShowTrajectory] = useState(false);
  const [animateSequence, setAnimateSequence] = useState(false);
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
  const [step, setStep] = useState(0);

  // Item Difficulty states
  const [itemCurrentProblem, setItemCurrentProblem] = useState(0);
  const [itemSelectedAnswer, setItemSelectedAnswer] = useState(null);
  const [itemShowFeedback, setItemShowFeedback] = useState(false);
  const [itemAttemptedProblems, setItemAttemptedProblems] = useState([]);

  // Q-Matrix Quality states
  const [qMatrixCurrentProblem, setQMatrixCurrentProblem] = useState(0);
  const [qMatrixSelectedAnswer, setQMatrixSelectedAnswer] = useState(null);
  const [qMatrixShowFeedback, setQMatrixShowFeedback] = useState(false);
  const [qMatrixViewMode, setQMatrixViewMode] = useState('incorrect');
  const [qMatrixAttemptedProblems, setQMatrixAttemptedProblems] = useState([]);

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
      title: "Incorrect Answers",
      id: "incorrect-answers",
      icon: AlertTriangle,
      color: "pink",
    },
    {
      title: "Item Difficulty",
      id: "item-difficulty",
      icon: BarChart3,
      color: "yellow",
    },
    {
      title: "Q-Matrix Quality",
      id: "q-matrix-quality",
      icon: Grid3x3,
      color: "indigo",
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



  // Event handlers
  const handleBeginTask = (taskId) => {
    if (taskId === "incorrect-answers") {
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
    } else if (taskId === "binary-skills") {
      setCurrentView("binary-skills");
      setSimStep(0);
      setSelectedStudent(null);
      setShowComparison(false);
      setAnimating(false);
    } else if (taskId === "context-blind") {
      setCurrentView("context-blind");
      setContextStep(0);
      setSelectedStrategy(null);
      setShowTrajectory(false);
      setAnimateSequence(false);
      setSelectedStudent(null);
    } else if (taskId === "item-difficulty") {
      setCurrentView("item-difficulty");
      setItemCurrentProblem(0);
      setItemSelectedAnswer(null);
      setItemShowFeedback(false);
      setItemAttemptedProblems([]);
    } else if (taskId === "q-matrix-quality") {
      setCurrentView("q-matrix-quality");
      setQMatrixCurrentProblem(0);
      setQMatrixSelectedAnswer(null);
      setQMatrixShowFeedback(false);
      setQMatrixViewMode('incorrect');
      setQMatrixAttemptedProblems([]);
    }
  };

  const backToOverview = () => {
    setCurrentView("overview");

    // Track completion for specific scenarios
    if (
      ["incorrect-answers-reflection", "no-forgetting", "binary-skills", "context-blind", "item-difficulty", "q-matrix-quality"].includes(
        currentView
      )
    ) {
      let scenarioId;
      if (currentView === "incorrect-answers-reflection")
        scenarioId = "incorrect-answers";
      else if (currentView === "no-forgetting") scenarioId = "no-forgetting";
      else if (currentView === "binary-skills") scenarioId = "binary-skills";
      else if (currentView === "context-blind") scenarioId = "context-blind";
      else if (currentView === "item-difficulty") scenarioId = "item-difficulty";
      else if (currentView === "q-matrix-quality") scenarioId = "q-matrix-quality";

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
        className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
      >
        {children}
      </button>
    );
  };

  const renderBinarySkills = () => {
    // Python programming assessment scenario - shows binary vs nuanced evaluation
    const programmingAssessment = {
      taskInfo: "Write a Python function to find the second largest number in a list",
      requirements: [
        { id: 'functionality', name: 'Basic Functionality', achieved: true, points: 3 },
        { id: 'efficiency', name: 'Algorithm Efficiency', achieved: false, points: 2 },
        { id: 'edge_cases', name: 'Edge Case Handling', achieved: false, points: 2 },
        { id: 'documentation', name: 'Code Documentation', achieved: false, points: 1 },
        { id: 'style', name: 'Code Style & Readability', achieved: true, points: 1 }
      ],
      studentCode: `def second_largest(nums):
    nums.sort()
    return nums[-2]

# Test
print(second_largest([1, 3, 2, 5, 4]))`,
      expectedOutput: '4',
      actualOutput: '4',
      codeRuns: true,
      issues: {
        efficiency: 'Uses sort() which is O(n log n) instead of O(n) single pass',
        edgeCases: 'No handling for empty lists, single element, or duplicate values',
        documentation: 'No docstring, no comments explaining logic'
      }
    };

    const calculateRealScore = () => {
      const totalPoints = programmingAssessment.requirements.reduce((acc, req) =>
        acc + (req.achieved ? req.points : 0), 0
      );
      const maxPoints = programmingAssessment.requirements.reduce((acc, req) => acc + req.points, 0);
      return (totalPoints / maxPoints) * 100;
    };

    const afmScore = programmingAssessment.codeRuns ? 100 : 0; // Binary: either runs or doesn't
    const realScore = calculateRealScore(); // ~44% - shows partial competency

    const stepLabels = {
      0: 'Programming Task Overview',
      1: 'Code Analysis',
      2: 'Functionality Assessment',
      3: 'Quality Evaluation',
      4: 'Results Comparison'
    };

    const navigateSimStep = (direction) => {
      const newStep = simStep + direction;
      if (newStep >= 0 && newStep <= 4) {
        setAnimating(true);
        setTimeout(() => {
          setSimStep(newStep);
          setAnimating(false);
        }, 300);
      }
    };

    const resetSimulation = () => {
      setSimStep(0);
    };

    const renderCaseOverview = () => (
      <div className="space-y-6">
        <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative">
          <div className="absolute -top-6 left-4 px-3 py-1 bg-blue-600 text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
            <Code className="w-4 h-4" />
            PYTHON PROGRAMMING ASSESSMENT
          </div>
          <div className="text-2xl md:text-3xl font-bold tracking-tight text-black text-center mb-6">
            Python Programming Assessment
          </div>
          <p className="text-lg text-black text-center mb-8 font-bold">
            Understand how AFM's binary approach fails in comprehensive code evaluation
          </p>

          <div className="space-y-6">
            <div className="border-4 border-blue-600 rounded-xl p-6 bg-blue-50">
              <h3 className="font-bold text-blue-700 text-lg font-mono uppercase mb-3">
                PROGRAMMING TASK
              </h3>
              <p className="text-black font-mono text-lg mb-4">
                {programmingAssessment.taskInfo}
              </p>
              <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm">
                <div className="flex items-center gap-2 mb-2 text-gray-400">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="ml-2 text-xs">python_assessment.py</span>
                </div>
                <pre className="text-white whitespace-pre-wrap leading-relaxed">
                  {programmingAssessment.studentCode}
                </pre>
              </div>
            </div>

            <div className="border-4 border-yellow-600 rounded-xl p-6 bg-yellow-50">
              <h3 className="font-bold text-yellow-700 text-lg font-mono uppercase mb-3">
                ASSESSMENT CHALLENGE
              </h3>
              <p className="text-black font-mono text-lg">
                The code runs and produces the correct output. But is running correctly
                the only measure of programming competency? We'll compare AFM's binary
                approach with a comprehensive code evaluation.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setSimStep(1)}
            className="px-8 py-4 bg-black text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-black hover:border-black transition-all transform hover:scale-105 font-mono"
          >
            START CODE ANALYSIS →
          </button>
        </div>
      </div>
    );

    const renderCodeAnalysis = () => (
      <div className="space-y-6">
        <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative">
          <div className="absolute -top-6 left-4 px-3 py-1 bg-green-600 text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
            <Target className="w-4 h-4" />
            STEP 1: CODE ANALYSIS
          </div>
          <div className="text-2xl md:text-3xl font-bold tracking-tight text-black text-center mb-6">
            Step 1: Code Analysis
          </div>
          <p className="text-lg text-black text-center mb-8 font-bold">
            Analyzing student's code submission across multiple dimensions
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-4 border-green-600 rounded-xl p-6 bg-green-50">
              <h3 className="font-bold text-green-700 text-lg font-mono uppercase mb-3">
                STUDENT'S SOLUTION
              </h3>
              <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm">
                <pre className="text-white whitespace-pre-wrap leading-relaxed">
                  {programmingAssessment.studentCode}
                </pre>
              </div>
              <div className="mt-4 p-3 bg-white border-2 border-green-600 rounded-lg">
                <p className="font-mono text-black font-bold">
                  Output: {programmingAssessment.actualOutput}
                </p>
                <p className="font-mono text-black font-bold">
                  Expected: {programmingAssessment.expectedOutput}
                </p>
                <span className={`px-2 py-1 border-2 border-black font-mono font-bold text-xs ${programmingAssessment.codeRuns ? 'bg-green-300' : 'bg-red-300'}`}>
                  {programmingAssessment.codeRuns ? 'RUNS CORRECTLY' : 'EXECUTION ERROR'}
                </span>
              </div>
            </div>

            <div className="border-4 border-orange-600 rounded-xl p-6 bg-orange-50">
              <h3 className="font-bold text-orange-700 text-lg font-mono uppercase mb-3">
                CODE QUALITY ISSUES
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-white border-2 border-orange-600 rounded-lg">
                  <h4 className="font-bold text-orange-700 font-mono mb-2">EFFICIENCY:</h4>
                  <p className="text-black font-mono text-sm">
                    {programmingAssessment.issues.efficiency}
                  </p>
                </div>
                <div className="p-3 bg-white border-2 border-orange-600 rounded-lg">
                  <h4 className="font-bold text-orange-700 font-mono mb-2">EDGE CASES:</h4>
                  <p className="text-black font-mono text-sm">
                    {programmingAssessment.issues.edgeCases}
                  </p>
                </div>
                <div className="p-3 bg-white border-2 border-orange-600 rounded-lg">
                  <h4 className="font-bold text-orange-700 font-mono mb-2">DOCUMENTATION:</h4>
                  <p className="text-black font-mono text-sm">
                    {programmingAssessment.issues.documentation}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={() => navigateSimStep(-1)}
            className="px-6 py-3 bg-white text-black border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-black hover:text-white transition-all transform hover:scale-105 font-mono"
          >
            ← PREVIOUS
          </button>

          <button
            onClick={() => navigateSimStep(1)}
            className="px-6 py-3 bg-black text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-black transition-all transform hover:scale-105 font-mono"
          >
            NEXT: FUNCTIONALITY →
          </button>
        </div>
      </div>
    );

    const renderFunctionalityAssessment = () => (
      <div className="space-y-6">
        <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative">
          <div className="absolute -top-6 left-4 px-3 py-1 bg-blue-600 text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
            <Zap className="w-4 h-4" />
            STEP 2: FUNCTIONALITY TEST
          </div>
          <div className="text-2xl md:text-3xl font-bold tracking-tight text-black text-center mb-6">
            Step 2: Functionality Test
          </div>
          <p className="text-lg text-black text-center mb-8 font-bold">
            Testing the code with various inputs to evaluate robustness
          </p>

          <div className="space-y-4">
            <div className="border-4 border-blue-600 rounded-xl p-6 bg-blue-50">
              <h3 className="font-bold text-blue-700 text-lg font-mono uppercase mb-3">
                TEST CASES
              </h3>
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3 bg-white border-2 border-green-600 rounded-lg">
                    <h4 className="font-bold text-green-700 font-mono mb-1">BASIC CASE</h4>
                    <p className="font-mono text-black text-sm">Input: [1,3,2,5,4]</p>
                    <p className="font-mono text-black text-sm">Expected: 4</p>
                    <span className="px-2 py-1 bg-green-300 border border-black font-mono font-bold text-xs">
                      PASS
                    </span>
                  </div>
                  <div className="p-3 bg-white border-2 border-red-600 rounded-lg">
                    <h4 className="font-bold text-red-700 font-mono mb-1">EDGE CASE</h4>
                    <p className="font-mono text-black text-sm">Input: []</p>
                    <p className="font-mono text-black text-sm">Expected: Handle gracefully</p>
                    <span className="px-2 py-1 bg-red-300 border border-black font-mono font-bold text-xs">
                      FAIL
                    </span>
                  </div>
                  <div className="p-3 bg-white border-2 border-red-600 rounded-lg">
                    <h4 className="font-bold text-red-700 font-mono mb-1">DUPLICATES</h4>
                    <p className="font-mono text-black text-sm">Input: [5,5,5,5]</p>
                    <p className="font-mono text-black text-sm">Expected: Handle duplicates</p>
                    <span className="px-2 py-1 bg-red-300 border border-black font-mono font-bold text-xs">
                      FAIL
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-4 border-yellow-600 rounded-xl p-6 bg-yellow-50">
              <h3 className="font-bold text-yellow-700 text-lg font-mono uppercase mb-3">
                BETTER SOLUTION EXAMPLE
              </h3>
              <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm">
                <pre className="text-white whitespace-pre-wrap leading-relaxed">
                  {`def second_largest(nums):
    """
    Find the second largest number in a list.
    
    Args:
        nums: List of numbers
    
    Returns:
        Second largest number or None if not possible
    """
    if len(nums) < 2:
        return None
    
    first = second = float('-inf')
    
    for num in nums:
        if num > first:
            second = first
            first = num
        elif num > second and num != first:
            second = num
    
    return second if second != float('-inf') else None`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={() => navigateSimStep(-1)}
            className="px-6 py-3 bg-white text-black border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-black hover:text-white transition-all transform hover:scale-105 font-mono"
          >
            ← PREVIOUS
          </button>

          <button
            onClick={() => navigateSimStep(1)}
            className="px-6 py-3 bg-black text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-black transition-all transform hover:scale-105 font-mono"
          >
            NEXT: QUALITY EVALUATION →
          </button>
        </div>
      </div>
    );

    const renderQualityEvaluation = () => (
      <div className="space-y-6">
        <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative">
          <div className="absolute -top-6 left-4 px-3 py-1 bg-purple-600 text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
            <Brain className="w-4 h-4" />
            STEP 3: QUALITY EVALUATION
          </div>
          <div className="text-2xl md:text-3xl font-bold tracking-tight text-black text-center mb-6">
            Step 3: Quality Evaluation
          </div>
          <p className="text-lg text-black text-center mb-8 font-bold">
            Comprehensive assessment across multiple programming competencies
          </p>

          <div className="border-4 border-purple-600 rounded-xl p-6 bg-purple-50">
            <h3 className="font-bold text-purple-700 text-lg font-mono uppercase mb-3">
              ASSESSMENT CRITERIA
            </h3>
            <div className="space-y-3">
              {programmingAssessment.requirements.map((req) => (
                <div key={req.id} className="flex items-center justify-between p-3 bg-white border-2 border-purple-600 rounded-lg">
                  <span className="font-mono text-black font-bold">{req.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 border-2 border-black font-mono font-bold text-xs ${req.achieved ? 'bg-green-300' : 'bg-red-300'}`}>
                      {req.achieved ? 'ACHIEVED' : 'MISSING'}
                    </span>
                    <span className="text-sm font-mono font-bold">({req.points} pts)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={() => navigateSimStep(-1)}
            className="px-6 py-3 bg-white text-black border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-black hover:text-white transition-all transform hover:scale-105 font-mono"
          >
            ← PREVIOUS
          </button>

          <button
            onClick={() => navigateSimStep(1)}
            className="px-6 py-3 bg-green-600 text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-green-600 transition-all transform hover:scale-105 font-mono"
          >
            VIEW COMPARISON →
          </button>
        </div>
      </div>
    );

    const renderResults = () => (
      <div className="space-y-6">
        <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative">
          <div className="absolute -top-6 left-4 px-3 py-1 bg-red-600 text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            ASSESSMENT COMPARISON
          </div>
          <div className="text-2xl md:text-3xl font-bold tracking-tight text-black text-center mb-6">
            Assessment Comparison
          </div>
          <p className="text-lg text-black text-center mb-8 font-bold">
            Compare AFM's binary approach vs comprehensive code evaluation
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-4 border-red-600 rounded-xl p-6 bg-red-50">
              <h3 className="font-bold text-red-700 text-lg font-mono uppercase mb-4 text-center">
                AFM Binary Assessment
              </h3>
              <div className="space-y-4">
                <div className="bg-red-100 p-4 border-2 border-red-600">
                  <h4 className="font-bold text-red-700 font-mono mb-2">BINARY LOGIC:</h4>
                  <p className="text-black font-mono text-sm">
                    Code runs correctly → Student gets 100%
                  </p>
                  <p className="text-black font-mono text-sm">
                    Code fails/error → Student gets 0%
                  </p>
                </div>

                <div className="bg-white p-4 border-2 border-red-600">
                  <h4 className="font-bold text-black font-mono mb-2">AFM SCORE:</h4>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-red-600 font-mono">
                      {afmScore.toFixed(0)}%
                    </div>
                    <div className="w-full bg-gray-200 border-2 border-black h-6 mt-2">
                      <div
                        className="h-full bg-red-600 transition-all duration-500"
                        style={{ width: `${afmScore}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 p-4 border-2 border-red-600">
                  <h4 className="font-bold text-red-700 font-mono mb-2">IGNORED FACTORS:</h4>
                  <ul className="text-black font-mono text-sm space-y-1">
                    <li>• Algorithm efficiency</li>
                    <li>• Edge case handling</li>
                    <li>• Code readability</li>
                    <li>• Documentation quality</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-4 border-green-600 rounded-xl p-6 bg-green-50">
              <h3 className="font-bold text-green-700 text-lg font-mono uppercase mb-4 text-center">
                Comprehensive Assessment
              </h3>
              <div className="space-y-4">
                <div className="bg-green-100 p-4 border-2 border-green-600">
                  <h4 className="font-bold text-green-700 font-mono mb-2">HOLISTIC EVALUATION:</h4>
                  <p className="text-black font-mono text-sm">
                    • Functionality: 3/3 points
                  </p>
                  <p className="text-black font-mono text-sm">
                    • Efficiency: 0/2 points
                  </p>
                  <p className="text-black font-mono text-sm">
                    • Edge cases: 0/2 points
                  </p>
                  <p className="text-black font-mono text-sm">
                    • Documentation: 0/1 points
                  </p>
                  <p className="text-black font-mono text-sm">
                    • Code style: 1/1 points
                  </p>
                </div>

                <div className="bg-white p-4 border-2 border-green-600">
                  <h4 className="font-bold text-black font-mono mb-2">COMPREHENSIVE SCORE:</h4>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 font-mono">
                      {realScore.toFixed(0)}%
                    </div>
                    <div className="w-full bg-gray-200 border-2 border-black h-6 mt-2">
                      <div
                        className="h-full bg-green-600 transition-all duration-500"
                        style={{ width: `${realScore}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-4 border-2 border-green-600">
                  <h4 className="font-bold text-green-700 font-mono mb-2">CAPTURED INSIGHTS:</h4>
                  <ul className="text-black font-mono text-sm space-y-1">
                    <li>• Solid basic programming skills</li>
                    <li>• Needs efficiency optimization</li>
                    <li>• Lacks robustness thinking</li>
                    <li>• Should improve documentation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative">
          <div className="absolute -top-6 left-4 px-3 py-1 bg-yellow-600 text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            THE PROBLEM WITH BINARY CODE ASSESSMENT
          </div>
          <div className="text-center space-y-4">
            <div className="bg-yellow-300 border-2 border-black px-6 py-4 inline-block">
              <span className="text-black font-bold text-xl font-mono">
                56% DIFFERENCE IN ASSESSMENT
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border-l-4 border-yellow-600 bg-white p-4">
                <h4 className="font-bold text-yellow-700 mb-2 font-mono">LOST INFORMATION</h4>
                <ul className="text-black font-mono text-sm space-y-1">
                  <li>• ALGORITHM QUALITY IGNORED</li>
                  <li>• MAINTAINABILITY UNMEASURED</li>
                  <li>• LEARNING GAPS HIDDEN</li>
                  <li>• PROFESSIONAL SKILLS MISSED</li>
                </ul>
              </div>
              <div className="border-l-4 border-yellow-600 bg-white p-4">
                <h4 className="font-bold text-yellow-700 mb-2 font-mono">EDUCATIONAL IMPACT</h4>
                <ul className="text-black font-mono text-sm space-y-1">
                  <li>• STUDENTS LEARN BAD PRACTICES</li>
                  <li>• TEACHERS MISS SKILL GAPS</li>
                  <li>• EMPLOYERS GET POOR SIGNALS</li>
                  <li>• CODE QUALITY SUFFERS</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative">
          <div className="absolute -top-6 left-4 px-3 py-1 bg-blue-600 text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            BETTER PROGRAMMING ASSESSMENT
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'CODE REVIEW',
              'UNIT TESTING',
              'PERFORMANCE METRICS',
              'DOCUMENTATION',
              'REFACTORING',
              'PAIR PROGRAMMING',
              'CODE STYLE',
              'ALGORITHM ANALYSIS'
            ].map((approach) => (
              <div key={approach} className="border-2 border-blue-600 bg-blue-50 p-3 text-center">
                <span className="text-black font-mono font-bold text-sm">{approach}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={resetSimulation}
            className="px-6 py-3 bg-white text-black border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-black hover:text-white transition-all transform hover:scale-105 font-mono"
          >
            RESTART SIMULATION
          </button>
          <button
            onClick={backToOverview}
            className="px-6 py-3 bg-black text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-black transition-all transform hover:scale-105 font-mono"
          >
            ← RETURN TO OVERVIEW
          </button>
        </div>
      </div>
    );

    // Main simulation flow
    const simulationViews = {
      0: renderCaseOverview,
      1: renderCodeAnalysis,
      2: renderFunctionalityAssessment,
      3: renderQualityEvaluation,
      4: renderResults
    };

    return (
      <div className="bg-white min-h-screen flex flex-col items-center py-8 px-4 md:px-10 text-black font-['IBM_Plex_Mono',monospace]">
        <div className="w-full max-w-6xl mx-auto flex flex-col gap-8">
          <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative">
            <div className="absolute -top-6 left-4 px-3 py-1 bg-red-600 text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
              <Target className="w-4 h-4" />
              BINARY SKILLS LIMITATION
            </div>
            <div className="text-2xl md:text-3xl font-bold tracking-tight text-black text-center">
              Binary Skills Limitation
            </div>
            <p className="text-lg text-black text-center mt-4 font-bold">
              {stepLabels[simStep]}
            </p>
          </div>
          {simulationViews[simStep]()}
        </div>
      </div>
    );
  };

  const renderContextBlind = () => {
    // Python programming context scenario showing how context affects coding performance
    const programmingScenario = {
      student: "Alex, learning Python programming",
      skill: "Writing Python functions and solving coding problems",
      contexts: [
        {
          id: 'morning-focused',
          name: 'Morning Coding Session',
          time: '9:00 AM',
          condition: 'Fresh, focused, quiet environment, full-screen IDE',
          performance: { correct: 18, total: 20, percentage: 90 },
          color: 'green'
        },
        {
          id: 'late-debugging',
          name: 'Late Night Debugging',
          time: '11:30 PM',
          condition: 'Tired, stressed, fixing bugs under pressure',
          performance: { correct: 11, total: 20, percentage: 55 },
          color: 'red'
        },
        {
          id: 'pair-programming',
          name: 'Pair Programming Session',
          time: '2:00 PM',
          condition: 'Collaborative, discussing solutions, peer support',
          performance: { correct: 16, total: 20, percentage: 80 },
          color: 'blue'
        },
        {
          id: 'online-platform',
          name: 'Online Coding Platform',
          time: '7:00 PM',
          condition: 'Timed challenges, competitive environment, small screen',
          performance: { correct: 12, total: 20, percentage: 60 },
          color: 'orange'
        },
        {
          id: 'algorithm-problems',
          name: 'Algorithm Practice',
          time: '4:00 PM',
          condition: 'Complex problems, whiteboard-style, deep thinking',
          performance: { correct: 15, total: 20, percentage: 75 },
          color: 'purple'
        }
      ]
    };

    const calculateContextAFMPrediction = () => {
      const totalCorrect = programmingScenario.contexts.reduce((sum, ctx) => sum + ctx.performance.correct, 0);
      const totalQuestions = programmingScenario.contexts.reduce((sum, ctx) => sum + ctx.performance.total, 0);
      return (totalCorrect / totalQuestions) * 100;
    };

    const calculateVariance = () => {
      const performances = programmingScenario.contexts.map(ctx => ctx.performance.percentage);
      const mean = performances.reduce((sum, perf) => sum + perf, 0) / performances.length;
      const variance = performances.reduce((sum, perf) => sum + Math.pow(perf - mean, 2), 0) / performances.length;
      return Math.sqrt(variance);
    };

    const afmPrediction = calculateContextAFMPrediction();
    const performanceVariance = calculateVariance();

    const stepLabels = {
      0: 'Programming Context Overview',
      1: 'Performance Analysis',
      2: 'AFM vs Context-Aware',
      3: 'Educational Implications'
    };

    const navigateContext = (direction) => {
      const newStep = contextStep + direction;
      if (newStep >= 0 && newStep < 4) {
        setAnimateSequence(true);
        setTimeout(() => {
          setContextStep(newStep);
          setAnimateSequence(false);
        }, 300);
      }
    };

    const handleStrategySelect = (strategy) => {
      setSelectedStrategy(strategy);
    };

    const renderContextOverview = () => (
      <div className="space-y-6">
        <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative">
          <div className="absolute -top-6 left-4 px-3 py-1 bg-blue-600 text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
            <Code className="w-4 h-4" />
            PYTHON PROGRAMMING CONTEXT STUDY
          </div>
          <div className="text-2xl md:text-3xl font-bold tracking-tight text-black text-center mb-6">
            Python Programming Context Study
          </div>
          <p className="text-lg text-black text-center mb-8 font-bold">
            Observe how the same programmer performs differently across various coding contexts
          </p>

          <div className="space-y-6">
            <div className="border-4 border-blue-600 rounded-xl p-6 bg-blue-50">
              <h3 className="font-bold text-blue-700 text-lg font-mono uppercase mb-3">
                PROGRAMMER PROFILE
              </h3>
              <p className="text-black font-mono text-lg">
                <strong>Student:</strong> {programmingScenario.student}
              </p>
              <p className="text-black font-mono text-lg">
                <strong>Skill:</strong> {programmingScenario.skill}
              </p>
              <p className="text-black font-mono text-lg">
                <strong>Assessment:</strong> 20 coding problems per session
              </p>
            </div>

            <div className="border-4 border-yellow-600 rounded-xl p-6 bg-yellow-50">
              <h3 className="font-bold text-yellow-700 text-lg font-mono uppercase mb-3">
                RESEARCH QUESTION
              </h3>
              <p className="text-black font-mono text-lg">
                How does programming context affect coding performance? AFM treats all sessions equally,
                but should context matter for predicting coding success?
              </p>
            </div>

            <div className="border-4 border-green-600 rounded-xl p-6 bg-green-50">
              <h3 className="font-bold text-green-700 text-lg font-mono uppercase mb-3">
                CONTEXT VARIABLES
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 bg-white border-2 border-green-600 rounded-lg">
                  <span className="font-mono text-black font-bold text-sm">• TIME OF DAY</span>
                </div>
                <div className="p-3 bg-white border-2 border-green-600 rounded-lg">
                  <span className="font-mono text-black font-bold text-sm">• ENVIRONMENT SETUP</span>
                </div>
                <div className="p-3 bg-white border-2 border-green-600 rounded-lg">
                  <span className="font-mono text-black font-bold text-sm">• PROBLEM TYPE</span>
                </div>
                <div className="p-3 bg-white border-2 border-green-600 rounded-lg">
                  <span className="font-mono text-black font-bold text-sm">• COLLABORATION MODE</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setContextStep(1)}
            className="px-8 py-4 bg-black text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-black hover:border-black transition-all transform hover:scale-105 font-mono"
          >
            ANALYZE CODING PERFORMANCE →
          </button>
        </div>
      </div>
    );

    const renderPerformanceAnalysis = () => (
      <div className="space-y-6">
        <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative">
          <div className="absolute -top-6 left-4 px-3 py-1 bg-purple-600 text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
            <TrendingDown className="w-4 h-4" />
            PERFORMANCE ACROSS DIFFERENT PROGRAMMING CONTEXTS
          </div>
          <div className="text-2xl md:text-3xl font-bold tracking-tight text-black text-center mb-6">
            Performance Across Different Programming Contexts
          </div>
          <p className="text-lg text-black text-center mb-8 font-bold">
            Same programmer, same skill level, different contexts - notice the significant variation
          </p>

          <div className="space-y-4">
            {programmingScenario.contexts.map((context) => (
              <div
                key={context.id}
                className={`border-4 border-${context.color}-600 rounded-xl p-4 bg-${context.color}-50`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-black text-lg font-mono uppercase">
                      {context.name}
                    </h3>
                    <p className="text-sm font-mono text-black">
                      {context.time} - {context.condition}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-black font-mono">
                      {context.performance.percentage}%
                    </div>
                    <div className="text-sm font-mono text-black">
                      {context.performance.correct}/{context.performance.total} problems solved
                    </div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 border-2 border-black h-6">
                  <div
                    className={`h-full bg-${context.color}-600 transition-all duration-500`}
                    style={{ width: `${context.performance.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative">
          <div className="absolute -top-6 left-4 px-3 py-1 bg-orange-600 text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            PROGRAMMING PERFORMANCE VARIANCE
          </div>
          <div className="text-center space-y-4">
            <div className="bg-orange-300 border-2 border-black px-6 py-4 inline-block">
              <span className="text-black font-bold text-xl font-mono">
                {performanceVariance.toFixed(1)}% STANDARD DEVIATION
              </span>
            </div>
            <p className="text-black font-mono text-lg">
              High variance indicates context significantly impacts programming performance
            </p>
            <div className="text-sm font-mono text-black">
              Range: {Math.min(...programmingScenario.contexts.map(c => c.performance.percentage))}% - {Math.max(...programmingScenario.contexts.map(c => c.performance.percentage))}%
            </div>
            <div className="border-4 border-orange-600 rounded-xl p-6 bg-orange-50">
              <h3 className="font-bold text-orange-700 text-lg font-mono uppercase mb-3">
                CONTEXT IMPACT FACTORS
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 bg-white border-2 border-orange-600 rounded-lg">
                  <span className="font-mono text-black font-bold text-sm">• COGNITIVE LOAD</span>
                </div>
                <div className="p-3 bg-white border-2 border-orange-600 rounded-lg">
                  <span className="font-mono text-black font-bold text-sm">• DEVELOPMENT ENVIRONMENT</span>
                </div>
                <div className="p-3 bg-white border-2 border-orange-600 rounded-lg">
                  <span className="font-mono text-black font-bold text-sm">• TIME PRESSURE</span>
                </div>
                <div className="p-3 bg-white border-2 border-orange-600 rounded-lg">
                  <span className="font-mono text-black font-bold text-sm">• COLLABORATION DYNAMICS</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setContextStep(2)}
            className="px-8 py-4 bg-black text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-black hover:border-black transition-all transform hover:scale-105 font-mono"
          >
            COMPARE AFM VS CONTEXT-AWARE →
          </button>
        </div>
      </div>
    );

    const renderAFMComparison = () => (
      <div className="space-y-6">
        <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative">
          <div className="absolute -top-6 left-4 px-3 py-1 bg-red-600 text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            AFM VS CONTEXT-AWARE PREDICTIONS
          </div>
          <div className="text-2xl md:text-3xl font-bold tracking-tight text-black text-center mb-6">
            AFM vs Context-Aware Predictions
          </div>
          <p className="text-lg text-black text-center mb-8 font-bold">
            Compare how different approaches handle context-dependent programming performance
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-4 border-red-600 rounded-xl p-6 bg-red-50">
              <h3 className="font-bold text-red-700 text-lg font-mono uppercase mb-4 text-center">
                AFM Prediction
              </h3>
              <div className="space-y-4">
                <div className="bg-red-100 p-4 border-2 border-red-600">
                  <h4 className="font-bold text-red-700 font-mono mb-2">CONTEXT-BLIND LOGIC:</h4>
                  <p className="text-black font-mono text-sm">
                    All coding sessions weighted equally regardless of context
                  </p>
                  <p className="text-black font-mono text-sm">
                    Total: {programmingScenario.contexts.reduce((sum, ctx) => sum + ctx.performance.correct, 0)}/{programmingScenario.contexts.reduce((sum, ctx) => sum + ctx.performance.total, 0)} problems solved
                  </p>
                </div>

                <div className="bg-white p-4 border-2 border-red-600">
                  <h4 className="font-bold text-black font-mono mb-2">AFM PREDICTION:</h4>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-red-600 font-mono">
                      {afmPrediction.toFixed(0)}%
                    </div>
                    <div className="w-full bg-gray-200 border-2 border-black h-6 mt-2">
                      <div
                        className="h-full bg-red-600 transition-all duration-500"
                        style={{ width: `${afmPrediction}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 p-4 border-2 border-red-600">
                  <h4 className="font-bold text-red-700 font-mono mb-2">MISSED CONTEXT:</h4>
                  <ul className="text-black font-mono text-sm space-y-1">
                    <li>• Time of day effects on focus</li>
                    <li>• Development environment impacts</li>
                    <li>• Problem type complexity variations</li>
                    <li>• Collaboration vs solo performance</li>
                    <li>• Cognitive load differences</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-4 border-green-600 rounded-xl p-6 bg-green-50">
              <h3 className="font-bold text-green-700 text-lg font-mono uppercase mb-4 text-center">
                Context-Aware Prediction
              </h3>
              <div className="space-y-4">
                <div className="bg-green-100 p-4 border-2 border-green-600">
                  <h4 className="font-bold text-green-700 font-mono mb-2">CONTEXT-AWARE LOGIC:</h4>
                  <p className="text-black font-mono text-sm">
                    Weight recent performance by context similarity
                  </p>
                  <p className="text-black font-mono text-sm">
                    Predict based on upcoming programming context
                  </p>
                </div>

                <div className="bg-white p-4 border-2 border-green-600">
                  <h4 className="font-bold text-black font-mono mb-2">CONTEXT PREDICTION:</h4>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 font-mono">
                      Variable
                    </div>
                    <div className="text-sm font-mono text-black mt-2">
                      Depends on upcoming context:
                    </div>
                    <div className="text-sm font-mono text-black">
                      Morning IDE: ~90% | Late debugging: ~55%
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-4 border-2 border-green-600">
                  <h4 className="font-bold text-green-700 font-mono mb-2">CAPTURED INSIGHTS:</h4>
                  <ul className="text-black font-mono text-sm space-y-1">
                    <li>• Optimal coding times</li>
                    <li>• Preferred development environments</li>
                    <li>• Problem type strengths</li>
                    <li>• Collaboration effectiveness</li>
                    <li>• Context-specific interventions</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setContextStep(3)}
            className="px-8 py-4 bg-black text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-black hover:border-black transition-all transform hover:scale-105 font-mono"
          >
            EDUCATIONAL IMPLICATIONS →
          </button>
        </div>
      </div>
    );

    const renderEducationalImplications = () => (
      <div className="space-y-6">
        <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative">
          <div className="absolute -top-6 left-4 px-3 py-1 bg-orange-600 text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            EDUCATIONAL IMPLICATIONS OF CONTEXT BLINDNESS
          </div>
          <div className="text-2xl md:text-3xl font-bold tracking-tight text-black text-center mb-6">
            Educational Implications of Context Blindness
          </div>
          <p className="text-lg text-black text-center mb-8 font-bold">
            How ignoring programming context affects coding education and skill development
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-bold text-orange-700 text-lg font-mono uppercase">
                MISSED OPPORTUNITIES
              </h3>
              <div className="space-y-3">
                {[
                  'OPTIMAL CODING SESSIONS',
                  'ENVIRONMENT OPTIMIZATION',
                  'PERSONALIZED SCHEDULING',
                  'CONTEXT-SPECIFIC PRACTICE',
                  'ADAPTIVE PROBLEM SELECTION'
                ].map((item, index) => (
                  <div key={index} className="border-l-4 border-orange-600 bg-orange-50 p-3">
                    <span className="text-black font-mono font-bold text-sm">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-red-700 text-lg font-mono uppercase">
                NEGATIVE IMPACTS
              </h3>
              <div className="space-y-3">
                {[
                  'INACCURATE SKILL PREDICTIONS',
                  'POOR LEARNING RECOMMENDATIONS',
                  'INEFFECTIVE PRACTICE TIMING',
                  'REDUCED CODE QUALITY',
                  'MISSED DEBUGGING PATTERNS'
                ].map((item, index) => (
                  <div key={index} className="border-l-4 border-red-600 bg-red-50 p-3">
                    <span className="text-black font-mono font-bold text-sm">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative">
          <div className="absolute -top-6 left-4 px-3 py-1 bg-green-600 text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            CONTEXT-AWARE PROGRAMMING EDUCATION
          </div>
          <div className="space-y-4">
            <div className="text-center">
              <div className="bg-green-300 border-2 border-black px-6 py-4 inline-block">
                <span className="text-black font-bold text-xl font-mono">
                  BETTER CODING OUTCOMES
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                'SMART SCHEDULING',
                'ENVIRONMENT SETUP',
                'PROBLEM ADAPTATION',
                'COLLABORATION TIMING',
                'COGNITIVE LOAD MANAGEMENT',
                'DEBUGGING SUPPORT',
                'PERSONALIZED PACING',
                'CONTEXT-AWARE HINTS'
              ].map((approach, index) => (
                <div key={index} className="border-2 border-green-600 bg-green-50 p-3 text-center">
                  <span className="text-black font-mono font-bold text-sm">{approach}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative">
          <div className="absolute -top-6 left-4 px-3 py-1 bg-blue-600 text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
            <Code className="w-4 h-4" />
            REAL-WORLD PROGRAMMING APPLICATIONS
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border-2 border-blue-600 bg-blue-50 p-4">
              <h4 className="font-bold text-blue-700 mb-2 font-mono">BOOTCAMP EDUCATION</h4>
              <p className="text-black font-mono text-sm">
                Adapt lesson timing to student energy levels, optimize pair programming sessions,
                personalize project complexity based on context
              </p>
            </div>
            <div className="border-2 border-blue-600 bg-blue-50 p-4">
              <h4 className="font-bold text-blue-700 mb-2 font-mono">ONLINE PLATFORMS</h4>
              <p className="text-black font-mono text-sm">
                Consider user's coding environment, time of day, and problem-solving context
                when suggesting next challenges
              </p>
            </div>
            <div className="border-2 border-blue-600 bg-blue-50 p-4">
              <h4 className="font-bold text-blue-700 mb-2 font-mono">WORKPLACE TRAINING</h4>
              <p className="text-black font-mono text-sm">
                Account for development environment, team dynamics, and project pressure
                when assessing coding competency
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setContextStep(0)}
            className="px-6 py-3 bg-white text-black border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-black hover:text-white transition-all transform hover:scale-105 font-mono"
          >
            RESTART ANALYSIS
          </button>
          <button
            onClick={backToOverview}
            className="px-6 py-3 bg-black text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-black transition-all transform hover:scale-105 font-mono"
          >
            ← RETURN TO OVERVIEW
          </button>
        </div>
      </div>
    );

    const contextViews = {
      0: renderContextOverview,
      1: renderPerformanceAnalysis,
      2: renderAFMComparison,
      3: renderEducationalImplications
    };

    return (
      <div className="bg-white min-h-screen flex flex-col items-center py-8 px-4 md:px-10 text-black font-['IBM_Plex_Mono',monospace]">
        <div className="w-full max-w-6xl mx-auto flex flex-col gap-8">
          <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative">
            <div className="absolute -top-6 left-4 px-3 py-1 bg-green-600 text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
              <Brain className="w-4 h-4" />
              CONTEXT BLIND LIMITATION
            </div>
            <div className="text-2xl md:text-3xl font-bold tracking-tight text-black text-center">
              Context Blind Limitation
            </div>
            <p className="text-lg text-black text-center mt-4 font-bold">
              {stepLabels[contextStep]}
            </p>
          </div>
          {contextViews[contextStep]()}
        </div>
      </div>
    );
  };

  const renderIncorrectAnswers = () => (
    <TechnicalLayout title="How do Incorrect Answers Impact Success Probability?">
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
                className={`px-6 py-4 border-4 border-black rounded-xl font-bold text-xl uppercase tracking-wide transition-all ${selectedAnswer === option
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
    </TechnicalLayout>
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

  const renderItemDifficulty = () => {
    const pythonProblems = [
      {
        id: 'easy',
        difficulty: 'Easy',
        question: 'What will this Python code output?',
        code: `x = 5
y = 10
print(x + y)`,
        options: ['5', '10', '15', '25'],
        correctAnswer: '15',
        realDifficulty: 0.1, // 10% get this wrong
        afmPrediction: 0.72 // AFM uses average across all items
      },
      {
        id: 'medium',
        difficulty: 'Medium',
        question: 'What will this Python code output?',
        code: `numbers = [1, 2, 3, 4]
result = sum(numbers) / len(numbers)
print(result)`,
        options: ['2.5', '10', '4', '2'],
        correctAnswer: '2.5',
        realDifficulty: 0.4, // 40% get this wrong
        afmPrediction: 0.72 // Same AFM prediction
      },
      {
        id: 'hard',
        difficulty: 'Hard',
        question: 'What will this Python code output?',
        code: `def mystery_func(lst):
    return [x for x in lst if x % 2 == 0]

result = mystery_func([1, 2, 3, 4, 5, 6])
print(len(result))`,
        options: ['3', '6', '4', '2'],
        correctAnswer: '3',
        realDifficulty: 0.7, // 70% get this wrong
        afmPrediction: 0.72 // Same AFM prediction
      }
    ];

    const currentQ = pythonProblems[itemCurrentProblem];
    const isCorrect = itemSelectedAnswer === currentQ.correctAnswer;

    const handleAnswerSelect = (answer) => {
      setItemSelectedAnswer(answer);
      setItemShowFeedback(true);

      if (!itemAttemptedProblems.includes(itemCurrentProblem)) {
        setItemAttemptedProblems(prev => [...prev, itemCurrentProblem]);
      }
    };

    const nextProblem = () => {
      if (itemCurrentProblem < pythonProblems.length - 1) {
        setItemCurrentProblem(prev => prev + 1);
        setItemSelectedAnswer(null);
        setItemShowFeedback(false);
      }
    };

    const resetSimulation = () => {
      setItemCurrentProblem(0);
      setItemSelectedAnswer(null);
      setItemShowFeedback(false);
      setItemAttemptedProblems([]);
    };

    return (
      <TechnicalLayout>
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-black mb-4 uppercase tracking-wide">
              Item Difficulty Limitation
            </h1>
            <p className="text-black text-xl font-bold leading-relaxed">
              Try these Python problems of different difficulties.{" "}
              <span className="text-yellow-600 font-bold underline decoration-4">
                Notice how AFM gives the same prediction for all problems,
                regardless of their actual difficulty.
              </span>
            </p>
          </div>

          {/* AFM Prediction Display */}
          <div className="border-4 border-black rounded-xl p-6 bg-white shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <span className="text-2xl font-bold text-black uppercase tracking-wide">
                AFM SUCCESS PREDICTION: {(currentQ.afmPrediction * 100).toFixed(0)}%
              </span>
              <div className="flex items-center space-x-4">
                <span className="text-lg font-bold text-black">0%</span>
                <div className="w-64 bg-gray-200 border-4 border-black rounded-none h-8 overflow-hidden">
                  <div
                    className="h-full bg-yellow-600 transition-all duration-1000 ease-out"
                    style={{ width: `${currentQ.afmPrediction * 100}%` }}
                  />
                </div>
                <span className="text-lg font-bold text-black">100%</span>
              </div>
            </div>
            <div className="text-center">
              <span className="bg-yellow-300 px-4 py-2 border-2 border-black rounded font-bold">
                SAME PREDICTION FOR ALL ITEMS!
              </span>
            </div>
          </div>

          {/* Problem Display */}
          <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-black uppercase tracking-tight">
                {currentQ.question}
              </h2>
              <div className="text-right">
                <div className={`px-4 py-2 border-2 border-black font-bold text-lg ${currentQ.difficulty === 'Easy' ? 'bg-green-300' :
                  currentQ.difficulty === 'Medium' ? 'bg-yellow-300' : 'bg-red-300'
                  }`}>
                  {currentQ.difficulty} Problem
                </div>
                <div className="text-sm font-mono text-black mt-2">
                  Real difficulty: {(currentQ.realDifficulty * 100).toFixed(0)}% failure rate
                </div>
              </div>
            </div>

            <div className="bg-black text-green-400 p-6 rounded-xl font-['IBM_Plex_Mono',monospace] text-lg mb-8 border-4 border-black">
              <pre className="whitespace-pre-wrap">{currentQ.code}</pre>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-8">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !itemShowFeedback && handleAnswerSelect(option)}
                  disabled={itemShowFeedback}
                  className={`px-6 py-4 border-4 border-black rounded-xl font-bold text-xl uppercase tracking-wide transition-all ${itemSelectedAnswer === option
                    ? isCorrect ? "bg-green-600 text-white" : "bg-red-600 text-white"
                    : itemShowFeedback
                      ? option === currentQ.correctAnswer ? "bg-green-300 text-black" : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-white text-black hover:bg-yellow-400 cursor-pointer transform hover:scale-105"
                    }`}
                >
                  {option}
                </button>
              ))}
            </div>

            {itemShowFeedback && (
              <div className="space-y-6">
                <div className={`border-l-8 ${isCorrect ? 'border-green-600 bg-green-100' : 'border-red-600 bg-red-100'} p-6 rounded-r-xl`}>
                  <p className="text-black text-xl font-bold">
                    {isCorrect ? 'Correct!' : 'Incorrect!'} The answer is <strong>{currentQ.correctAnswer}</strong>.
                    {currentQ.difficulty === 'Hard' && !isCorrect && (
                      <span className="text-red-700"> This was a difficult problem that {(currentQ.realDifficulty * 100).toFixed(0)}% of students get wrong!</span>
                    )}
                    {currentQ.difficulty === 'Easy' && isCorrect && (
                      <span className="text-green-700"> This was an easy problem that most students get right.</span>
                    )}
                  </p>
                </div>

                <div className="border-l-8 border-yellow-600 bg-yellow-100 p-6 rounded-r-xl">
                  <p className="text-black text-xl font-bold">
                    <strong>AFM Problem:</strong> Even though this {currentQ.difficulty.toLowerCase()} problem has a real difficulty of {(currentQ.realDifficulty * 100).toFixed(0)}%,
                    AFM still predicts {(currentQ.afmPrediction * 100).toFixed(0)}% success rate - the same as all other Python problems!
                  </p>
                </div>

                <div className="flex justify-center space-x-4">
                  {itemCurrentProblem < pythonProblems.length - 1 ? (
                    <button
                      onClick={nextProblem}
                      className="px-8 py-4 bg-yellow-600 text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-yellow-600 transition-all transform hover:scale-105"
                    >
                      Next Problem →
                    </button>
                  ) : (
                    <div className="space-x-4">
                      <button
                        onClick={resetSimulation}
                        className="px-8 py-4 bg-gray-600 text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-gray-600 transition-all transform hover:scale-105"
                      >
                        Try Again
                      </button>
                      <button
                        onClick={backToOverview}
                        className="px-8 py-4 bg-black text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-black transition-all transform hover:scale-105"
                      >
                        ← Back to Overview
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Progress Display */}
          <div className="border-4 border-black rounded-xl p-6 bg-white shadow-lg">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-black">
                Problem {itemCurrentProblem + 1} of {pythonProblems.length}
              </span>
              <div className="flex space-x-2">
                {pythonProblems.map((_, index) => (
                  <div
                    key={index}
                    className={`w-4 h-4 border-2 border-black ${itemAttemptedProblems.includes(index) ? 'bg-yellow-600' :
                      index === itemCurrentProblem ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Research Evidence */}
          {itemAttemptedProblems.length === pythonProblems.length && (
            <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg">
              <div className="text-center space-y-4">
                <div className="bg-red-300 border-2 border-black px-6 py-4 inline-block">
                  <span className="text-black font-bold text-xl">
                    RESEARCH EVIDENCE
                  </span>
                </div>
                <div className="bg-red-100 border-4 border-red-600 rounded-xl p-6">
                  <p className="text-black text-lg leading-relaxed font-bold">
                    "Tasks with heterogeneous difficulty cause parameter bias in AFM,
                    since the model cannot separate item and KC effects"
                  </p>
                  <p className="text-red-700 text-sm mt-4">
                    — Educational Data Mining Research
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </TechnicalLayout>
    );
  };

  const renderQMatrixQuality = () => {
    const pythonProblems = [
      {
        id: 'syntax_problem',
        question: 'What will this Python code output?',
        code: `for i in range(3):
    print(i)`,
        options: ['0 1 2', '1 2 3', '0\n1\n2', 'Error'],
        correctAnswer: '0\n1\n2',
        correctMapping: ['Loops', 'Print Function'],
        incorrectMapping: ['Python Programming'], // Too generic
        afmPredictionCorrect: 0.78,
        afmPredictionIncorrect: 0.65 // Biased due to wrong mapping
      },
      {
        id: 'list_problem',
        question: 'What will this Python code output?',
        code: `data = [1, 2, 3]
data.append(4)
print(len(data))`,
        options: ['3', '4', '7', 'Error'],
        correctAnswer: '4',
        correctMapping: ['Lists', 'Methods'],
        incorrectMapping: ['Python Programming'], // Too generic
        afmPredictionCorrect: 0.72,
        afmPredictionIncorrect: 0.65 // Same biased prediction
      },
      {
        id: 'function_problem',
        question: 'What will this Python code output?',
        code: `def double(x):
    return x * 2

result = double(5)
print(result)`,
        options: ['5', '10', '25', 'Error'],
        correctAnswer: '10',
        correctMapping: ['Functions', 'Return Values'],
        incorrectMapping: ['Python Programming'], // Too generic
        afmPredictionCorrect: 0.69,
        afmPredictionIncorrect: 0.65 // Same biased prediction
      }
    ];

    const currentQ = pythonProblems[qMatrixCurrentProblem];
    const isCorrect = qMatrixSelectedAnswer === currentQ.correctAnswer;
    const currentMapping = qMatrixViewMode === 'correct' ? currentQ.correctMapping : currentQ.incorrectMapping;
    const currentPrediction = qMatrixViewMode === 'correct' ? currentQ.afmPredictionCorrect : currentQ.afmPredictionIncorrect;

    const handleAnswerSelect = (answer) => {
      setQMatrixSelectedAnswer(answer);
      setQMatrixShowFeedback(true);

      if (!qMatrixAttemptedProblems.includes(qMatrixCurrentProblem)) {
        setQMatrixAttemptedProblems(prev => [...prev, qMatrixCurrentProblem]);
      }
    };

    const nextProblem = () => {
      if (qMatrixCurrentProblem < pythonProblems.length - 1) {
        setQMatrixCurrentProblem(prev => prev + 1);
        setQMatrixSelectedAnswer(null);
        setQMatrixShowFeedback(false);
      }
    };

    const toggleMapping = () => {
      setQMatrixViewMode(prev => prev === 'correct' ? 'incorrect' : 'correct');
      setQMatrixSelectedAnswer(null);
      setQMatrixShowFeedback(false);
    };

    const resetSimulation = () => {
      setQMatrixCurrentProblem(0);
      setQMatrixSelectedAnswer(null);
      setQMatrixShowFeedback(false);
      setQMatrixViewMode('incorrect');
      setQMatrixAttemptedProblems([]);
    };

    return (
      <TechnicalLayout>
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-black mb-4 uppercase tracking-wide">
              Q-Matrix Quality Limitation
            </h1>
            <p className="text-black text-xl font-bold leading-relaxed">
              See how incorrect skill mappings distort AFM predictions.{" "}
              <span className="text-indigo-600 font-bold underline decoration-4">
                Switch between correct and incorrect Q-matrix mappings
                to observe the prediction changes.
              </span>
            </p>
          </div>

          {/* Mapping Mode Toggle */}
          <div className="border-4 border-black rounded-xl p-6 bg-white shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-bold text-black uppercase tracking-wide">
                Current Q-Matrix Mapping:
              </span>
              <button
                onClick={toggleMapping}
                className={`px-6 py-3 border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide transition-all transform hover:scale-105 ${qMatrixViewMode === 'correct'
                  ? 'bg-green-600 text-white hover:bg-white hover:text-green-600'
                  : 'bg-red-600 text-white hover:bg-white hover:text-red-600'
                  }`}
              >
                {qMatrixViewMode === 'correct' ? 'CORRECT MAPPING' : 'INCORRECT MAPPING'}
              </button>
            </div>
            <div className="text-center">
              <span className={`px-4 py-2 border-2 border-black rounded font-bold ${qMatrixViewMode === 'correct' ? 'bg-green-300' : 'bg-red-300'
                }`}>
                MAPPED TO: {currentMapping.join(', ')}
              </span>
            </div>
          </div>

          {/* AFM Prediction Display */}
          <div className="border-4 border-black rounded-xl p-6 bg-white shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <span className="text-2xl font-bold text-black uppercase tracking-wide">
                AFM SUCCESS PREDICTION: {(currentPrediction * 100).toFixed(0)}%
              </span>
              <div className="flex items-center space-x-4">
                <span className="text-lg font-bold text-black">0%</span>
                <div className="w-64 bg-gray-200 border-4 border-black rounded-none h-8 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-1000 ease-out ${qMatrixViewMode === 'correct' ? 'bg-green-600' : 'bg-red-600'
                      }`}
                    style={{ width: `${currentPrediction * 100}%` }}
                  />
                </div>
                <span className="text-lg font-bold text-black">100%</span>
              </div>
            </div>
            <div className="text-center">
              <span className={`px-4 py-2 border-2 border-black rounded font-bold ${qMatrixViewMode === 'correct' ? 'bg-green-300' : 'bg-red-300'
                }`}>
                {qMatrixViewMode === 'correct'
                  ? 'SPECIFIC SKILL TRACKING'
                  : 'GENERIC MAPPING - PREDICTION BIAS!'
                }
              </span>
            </div>
          </div>

          {/* Problem Display */}
          <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-black uppercase tracking-tight">
                {currentQ.question}
              </h2>
              <div className="text-right">
                <div className="px-4 py-2 border-2 border-black font-bold text-lg bg-blue-300">
                  Python Problem {qMatrixCurrentProblem + 1}
                </div>
                <div className="text-sm font-mono text-black mt-2">
                  Skill mapping affects prediction!
                </div>
              </div>
            </div>

            <div className="bg-black text-green-400 p-6 rounded-xl font-['IBM_Plex_Mono',monospace] text-lg mb-8 border-4 border-black">
              <pre className="whitespace-pre-wrap">{currentQ.code}</pre>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-8">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !qMatrixShowFeedback && handleAnswerSelect(option)}
                  disabled={qMatrixShowFeedback}
                  className={`px-6 py-4 border-4 border-black rounded-xl font-bold text-xl uppercase tracking-wide transition-all ${qMatrixSelectedAnswer === option
                    ? isCorrect ? "bg-green-600 text-white" : "bg-red-600 text-white"
                    : qMatrixShowFeedback
                      ? option === currentQ.correctAnswer ? "bg-green-300 text-black" : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-white text-black hover:bg-indigo-400 cursor-pointer transform hover:scale-105"
                    }`}
                >
                  {option}
                </button>
              ))}
            </div>

            {qMatrixShowFeedback && (
              <div className="space-y-6">
                <div className={`border-l-8 ${isCorrect ? 'border-green-600 bg-green-100' : 'border-red-600 bg-red-100'} p-6 rounded-r-xl`}>
                  <p className="text-black text-xl font-bold">
                    {isCorrect ? 'Correct!' : 'Incorrect!'} The answer is <strong>{currentQ.correctAnswer}</strong>.
                  </p>
                </div>

                <div className={`border-l-8 border-indigo-600 bg-indigo-100 p-6 rounded-r-xl`}>
                  <p className="text-black text-xl font-bold">
                    <strong>Q-Matrix Impact:</strong>
                    {qMatrixViewMode === 'correct' ? (
                      <span className="text-green-700"> With correct mapping to specific skills [{currentMapping.join(', ')}], AFM can make accurate predictions!</span>
                    ) : (
                      <span className="text-red-700"> With incorrect generic mapping to [{currentMapping.join(', ')}], AFM loses important skill-specific information!</span>
                    )}
                  </p>
                </div>

                <div className="flex justify-center space-x-4">
                  <button
                    onClick={toggleMapping}
                    className={`px-6 py-3 border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide transition-all transform hover:scale-105 ${qMatrixViewMode === 'correct'
                      ? 'bg-red-600 text-white hover:bg-white hover:text-red-600'
                      : 'bg-green-600 text-white hover:bg-white hover:text-green-600'
                      }`}
                  >
                    Switch to {qMatrixViewMode === 'correct' ? 'Incorrect' : 'Correct'} Mapping
                  </button>

                  {qMatrixCurrentProblem < pythonProblems.length - 1 ? (
                    <button
                      onClick={nextProblem}
                      className="px-8 py-4 bg-indigo-600 text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-indigo-600 transition-all transform hover:scale-105"
                    >
                      Next Problem →
                    </button>
                  ) : (
                    <div className="space-x-4">
                      <button
                        onClick={resetSimulation}
                        className="px-8 py-4 bg-gray-600 text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-gray-600 transition-all transform hover:scale-105"
                      >
                        Try Again
                      </button>
                      <button
                        onClick={backToOverview}
                        className="px-8 py-4 bg-black text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-black transition-all transform hover:scale-105"
                      >
                        ← Back to Overview
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Progress Display */}
          <div className="border-4 border-black rounded-xl p-6 bg-white shadow-lg">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-black">
                Problem {qMatrixCurrentProblem + 1} of {pythonProblems.length}
              </span>
              <div className="flex space-x-2">
                {pythonProblems.map((_, index) => (
                  <div
                    key={index}
                    className={`w-4 h-4 border-2 border-black ${qMatrixAttemptedProblems.includes(index) ? 'bg-indigo-600' :
                      index === qMatrixCurrentProblem ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Research Evidence */}
          {qMatrixAttemptedProblems.length === pythonProblems.length && (
            <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg">
              <div className="text-center space-y-4">
                <div className="bg-indigo-300 border-2 border-black px-6 py-4 inline-block">
                  <span className="text-black font-bold text-xl">
                    RESEARCH EVIDENCE
                  </span>
                </div>
                <div className="bg-indigo-100 border-4 border-indigo-600 rounded-xl p-6">
                  <p className="text-black text-lg leading-relaxed font-bold">
                    "AFM's results are highly sensitive to Q-matrix definition, and errors
                    propagate to all model outputs"
                  </p>
                  <p className="text-indigo-700 text-sm mt-4">
                    — Multiple Educational Data Mining Studies
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </TechnicalLayout>
    );
  };

  const renderReflection = () => (
    <TechnicalLayout title="Reflection: Incorrect Answers">
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
    </TechnicalLayout>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              yellow: "bg-yellow-100 border-yellow-600 text-yellow-700",
              indigo: "bg-indigo-100 border-indigo-600 text-indigo-700",
            };

            return (
              <div
                key={scenario.id}
                className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative"
              >
                <div
                  className={`absolute -top-6 left-4 px-3 py-1 font-semibold rounded-md text-xs tracking-wider flex items-center gap-2 border-4 border-black ${colorClasses[scenario.color]
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
                    className={`w-full px-6 py-4 border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide transition-all transform hover:scale-105 ${isCompleted
                      ? "bg-green-600 text-white hover:bg-white hover:text-green-600"
                      : "bg-purple-600 text-white hover:bg-white hover:text-purple-600"
                      }`}
                    onClick={() => {
                      handleBeginTask(scenario.id);
                    }}
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
            scroll(17);
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
    "incorrect-answers": renderIncorrectAnswers,
    "incorrect-answers-reflection": renderReflection,
    overview: renderOverview,
    "no-forgetting": renderNoForgetting,
    "binary-skills": renderBinarySkills,
    "context-blind": renderContextBlind,
    "item-difficulty": renderItemDifficulty,
    "q-matrix-quality": renderQMatrixQuality,
  };

  return views[currentView]?.() || renderOverview();
};
