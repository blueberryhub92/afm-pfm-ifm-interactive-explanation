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

export const AFMLimitationsDiscussion = ({ navigate }) => {
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
  const [contextTaskAAnswer, setContextTaskAAnswer] = useState(null);
  const [contextTaskBAnswer, setContextTaskBAnswer] = useState(null);
  const [contextShowHint, setContextShowHint] = useState(false);
  const [contextShowComparison, setContextShowComparison] = useState(false);
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
  const [easyTaskAnswer, setEasyTaskAnswer] = useState(null);
  const [hardTaskAnswer, setHardTaskAnswer] = useState(null);
  const [showTaskComparison, setShowTaskComparison] = useState(false);

  // Q-Matrix Quality states
  const [qMatrixCurrentProblem, setQMatrixCurrentProblem] = useState(0);
  const [qMatrixSelectedAnswer, setQMatrixSelectedAnswer] = useState(null);
  const [qMatrixShowFeedback, setQMatrixShowFeedback] = useState(false);
  const [qMatrixViewMode, setQMatrixViewMode] = useState("incorrect");
  const [qMatrixAttemptedProblems, setQMatrixAttemptedProblems] = useState([]);
  const [userSkillMastery, setUserSkillMastery] = useState({
    Loops: 0.5,
    "Print Function": 0.5,
    Lists: 0.5,
    Methods: 0.5,
    Functions: 0.5,
    "Return Values": 0.5,
  });

  // Binary Skills states (new interactive version)
  const [selectedCodeSolution, setSelectedCodeSolution] = useState(null);
  const [testCaseResults, setTestCaseResults] = useState({});
  const [showBetterSolution, setShowBetterSolution] = useState(false);

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
      setSelectedCodeSolution(null);
      setTestCaseResults({});
      setShowBetterSolution(false);
      setAnimating(false);
    } else if (taskId === "context-blind") {
      setCurrentView("context-blind");
      setContextStep(0);
      setSelectedStrategy(null);
      setShowTrajectory(false);
      setAnimateSequence(false);
      setSelectedStudent(null);
      setContextTaskAAnswer(null);
      setContextTaskBAnswer(null);
      setContextShowHint(false);
      setContextShowComparison(false);
    } else if (taskId === "item-difficulty") {
      setCurrentView("item-difficulty");
      setItemCurrentProblem(0);
      setItemSelectedAnswer(null);
      setItemShowFeedback(false);
      setItemAttemptedProblems([]);
      setEasyTaskAnswer(null);
      setHardTaskAnswer(null);
      setShowTaskComparison(false);
    } else if (taskId === "q-matrix-quality") {
      setCurrentView("q-matrix-quality");
      setQMatrixCurrentProblem(0);
      setQMatrixSelectedAnswer(null);
      setQMatrixShowFeedback(false);
      setQMatrixViewMode("incorrect");
      setQMatrixAttemptedProblems([]);
      setUserSkillMastery({
        Loops: 0.5,
        "Print Function": 0.5,
        Lists: 0.5,
        Methods: 0.5,
        Functions: 0.5,
        "Return Values": 0.5,
      });
    }
  };

  const backToOverview = () => {
    setCurrentView("overview");

    // Track completion for specific scenarios
    if (
      [
        "incorrect-answers-reflection",
        "no-forgetting",
        "binary-skills",
        "context-blind",
        "item-difficulty",
        "q-matrix-quality",
      ].includes(currentView)
    ) {
      let scenarioId;
      if (currentView === "incorrect-answers-reflection")
        scenarioId = "incorrect-answers";
      else if (currentView === "no-forgetting") scenarioId = "no-forgetting";
      else if (currentView === "binary-skills") scenarioId = "binary-skills";
      else if (currentView === "context-blind") scenarioId = "context-blind";
      else if (currentView === "item-difficulty")
        scenarioId = "item-difficulty";
      else if (currentView === "q-matrix-quality")
        scenarioId = "q-matrix-quality";

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
  const TechnicalCard = ({
    title,
    description,
    children,
    size = "normal",
    accent = "black",
  }) => {
    const sizeClasses = {
      normal: "p-6",
      large: "p-8",
      small: "p-4",
    };

    const accentClasses = {
      black: "border-black",
      red: "border-red-600",
      blue: "border-blue-600",
      green: "border-green-600",
      purple: "border-purple-600",
      orange: "border-orange-600",
      yellow: "border-yellow-600",
    };

    return (
      <div
        className={`border-2 ${accentClasses[accent]} bg-white ${sizeClasses[size]} relative`}
      >
        {/* Technical corner brackets */}
        <div
          className={`absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 ${accentClasses[accent]}`}
        ></div>
        <div
          className={`absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 ${accentClasses[accent]}`}
        ></div>
        <div
          className={`absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 ${accentClasses[accent]}`}
        ></div>
        <div
          className={`absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 ${accentClasses[accent]}`}
        ></div>

        {title && (
          <div className="mb-4">
            <h3 className="text-lg font-bold text-black tracking-wider uppercase">
              {title}
            </h3>
            {description && (
              <p className="text-sm font-mono text-gray-600 mt-2">
                {description}
              </p>
            )}
          </div>
        )}

        {children}
      </div>
    );
  };

  // Button component
  const TechnicalButton = ({
    children,
    onClick,
    variant = "primary",
    disabled = false,
    size = "normal",
  }) => {
    const baseClasses =
      "font-mono font-bold tracking-wider uppercase transition-all transform hover:scale-105 border-2 border-black";
    const sizeClasses = {
      small: "px-4 py-2 text-sm",
      normal: "px-6 py-3 text-base",
      large: "px-8 py-4 text-lg",
    };
    const variantClasses = {
      primary: "bg-black text-white hover:bg-white hover:text-black",
      secondary: "bg-white text-black hover:bg-black hover:text-white",
      danger: "bg-red-600 text-white hover:bg-white hover:text-red-600",
      success: "bg-green-600 text-white hover:bg-white hover:text-green-600",
      warning: "bg-yellow-600 text-white hover:bg-white hover:text-yellow-600",
    };

    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`${baseClasses} ${sizeClasses[size]} ${
          variantClasses[variant]
        } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      >
        {children}
      </button>
    );
  };

  const renderBinarySkills = () => {
    // Define different code solutions with their characteristics
    const codeSolutions = {
      sortBased: {
        id: "sortBased",
        label: "Solution A: Sort-Based",
        code: `def second_largest(nums):
    nums.sort()
    return nums[-2]`,
        basicTest: { works: true, output: "4" },
        issues: {
          efficiency:
            "Uses sort() which is O(n log n) instead of O(n) single pass",
          edgeCases: "Fails with empty list, single element, or all duplicates",
          documentation: "No docstring or input validation",
        },
        testCases: [
          {
            id: "basic",
            input: "[1, 3, 2, 5, 4]",
            expected: "4",
            result: "4",
            pass: true,
            description: "Standard case with unique numbers",
          },
          {
            id: "empty",
            input: "[]",
            expected: "None or error handling",
            result: "IndexError: list index out of range",
            pass: false,
            description: "Empty list causes crash",
            errorExplanation:
              "The code tries to access nums[-2] on an empty list, causing an IndexError. Proper error handling is missing.",
          },
          {
            id: "duplicates",
            input: "[5, 5, 5, 5]",
            expected: "5 or None",
            result: "5",
            pass: false,
            description: "All duplicates - ambiguous result",
            errorExplanation:
              "When all numbers are the same, there's no true 'second largest'. The function returns 5, but should handle this edge case explicitly.",
          },
          {
            id: "single",
            input: "[7]",
            expected: "None",
            result: "IndexError: list index out of range",
            pass: false,
            description: "Single element causes crash",
            errorExplanation:
              "A list with only one element has no second largest number. The code crashes instead of handling this gracefully.",
          },
        ],
      },
      maxBased: {
        id: "maxBased",
        label: "Solution B: Max-Based",
        code: `def second_largest(nums):
    first_max = max(nums)
    nums.remove(first_max)
    return max(nums)`,
        basicTest: { works: true, output: "4" },
        issues: {
          efficiency: "Calls max() twice, modifies original list",
          edgeCases:
            "Fails with empty list, single element, and duplicates of max",
          documentation: "No docstring, destructive operation not documented",
        },
        testCases: [
          {
            id: "basic",
            input: "[1, 3, 2, 5, 4]",
            expected: "4",
            result: "4",
            pass: true,
            description: "Standard case works fine",
          },
          {
            id: "empty",
            input: "[]",
            expected: "None or error handling",
            result: "ValueError: max() arg is an empty sequence",
            pass: false,
            description: "Empty list causes crash",
            errorExplanation:
              "The max() function fails on an empty list. The code doesn't check if the list is empty before processing.",
          },
          {
            id: "duplicates",
            input: "[5, 5, 3, 1]",
            expected: "3",
            result: "5",
            pass: false,
            description: "Duplicate maximum values",
            errorExplanation:
              "When the maximum value appears multiple times, remove() only removes the first occurrence. This leads to returning the max again instead of the second largest distinct value.",
          },
          {
            id: "single",
            input: "[7]",
            expected: "None",
            result: "ValueError: max() arg is an empty sequence",
            pass: false,
            description: "Single element causes crash",
            errorExplanation:
              "After removing the only element, max() is called on an empty list, causing a ValueError.",
          },
        ],
      },
      indexBased: {
        id: "indexBased",
        label: "Solution C: Index-Based",
        code: `def second_largest(nums):
    sorted_nums = sorted(nums, reverse=True)
    return sorted_nums[1]`,
        basicTest: { works: true, output: "4" },
        issues: {
          efficiency: "Uses sorted() which is O(n log n)",
          edgeCases:
            "Fails with lists shorter than 2 elements, doesn't handle duplicates",
          documentation: "No docstring or validation",
        },
        testCases: [
          {
            id: "basic",
            input: "[1, 3, 2, 5, 4]",
            expected: "4",
            result: "4",
            pass: true,
            description: "Standard case works correctly",
          },
          {
            id: "empty",
            input: "[]",
            expected: "None or error handling",
            result: "IndexError: list index out of range",
            pass: false,
            description: "Empty list causes crash",
            errorExplanation:
              "Accessing index [1] on an empty list causes an IndexError. No length check is performed.",
          },
          {
            id: "duplicates",
            input: "[5, 5, 3, 1]",
            expected: "3",
            result: "5",
            pass: false,
            description: "Doesn't skip duplicates",
            errorExplanation:
              "The sorted list is [5, 5, 3, 1], so index [1] returns 5 (duplicate) instead of 3 (actual second largest distinct value).",
          },
          {
            id: "single",
            input: "[7]",
            expected: "None",
            result: "IndexError: list index out of range",
            pass: false,
            description: "Single element causes crash",
            errorExplanation:
              "A single-element list only has index [0]. Accessing index [1] causes an IndexError.",
          },
        ],
      },
    };

    // Better solution for comparison
    const betterSolution = `def second_largest(nums):
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
    
    return second if second != float('-inf') else None`;

    const stepLabels = {
      0: "Choose Your Solution",
      1: "Code Analysis",
      2: "Interactive Functionality Tests",
      3: "Better Solution Example",
      4: "Assessment Comparison",
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
      setSelectedCodeSolution(null);
      setTestCaseResults({});
      setShowBetterSolution(false);
    };

    const handleSolutionSelect = (solutionId) => {
      setSelectedCodeSolution(solutionId);
      setTestCaseResults({});
    };

    const handleTestCase = (testCaseId) => {
      setTestCaseResults((prev) => ({
        ...prev,
        [testCaseId]: true,
      }));
    };

    const renderCaseOverview = () => (
      <div className="space-y-6">
        <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative">
          <div className="absolute -top-6 left-4 px-3 py-1 bg-blue-600 text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
            <Code className="w-4 h-4" />
            PYTHON PROGRAMMING TASK
          </div>
          <div className="text-2xl md:text-3xl font-bold tracking-tight text-black text-center mb-6">
            Programming Task
          </div>

          <div className="space-y-6">
            <div className="border-4 border-blue-600 rounded-xl p-6 bg-blue-50">
              <h3 className="font-bold text-blue-700 text-lg font-mono uppercase mb-3">
                YOUR TASK
              </h3>
              <p className="text-black font-mono text-lg mb-4">
                Write a Python function to find the second largest number in a
                list
              </p>
              <p className="text-black font-mono text-sm">
                Example: second_largest([1, 3, 2, 5, 4]) should return 4
              </p>
            </div>

            <div className="border-4 border-purple-600 rounded-xl p-6 bg-purple-50">
              <h3 className="font-bold text-purple-700 text-lg font-mono uppercase mb-3">
                CHOOSE YOUR SOLUTION
              </h3>
              <p className="text-black font-mono text-sm mb-4">
                Select one of these working solutions. They all produce the
                correct output for the basic test case, but each has different
                characteristics.
              </p>

              <div className="space-y-4">
                {Object.values(codeSolutions).map((solution) => (
                  <div
                    key={solution.id}
                    className={`border-4 rounded-xl p-4 cursor-pointer transition-all ${
                      selectedCodeSolution === solution.id
                        ? "border-green-600 bg-green-100"
                        : "border-gray-400 bg-white hover:border-gray-600"
                    }`}
                    onClick={() => handleSolutionSelect(solution.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-black font-mono">
                        {solution.label}
                      </h4>
                      {selectedCodeSolution === solution.id && (
                        <span className="px-2 py-1 bg-green-600 text-white font-mono text-xs font-bold">
                          SELECTED
                        </span>
                      )}
                    </div>
                    <div className="bg-black text-green-400 p-3 rounded-lg font-mono text-sm">
                      <pre className="text-white whitespace-pre-wrap leading-relaxed">
                        {solution.code}
                      </pre>
                    </div>
                    <div className="mt-2 text-black font-mono text-xs">
                      ✓ Basic test: returns {solution.basicTest.output}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setSimStep(1)}
            disabled={!selectedCodeSolution}
            className={`px-8 py-4 border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide transition-all transform font-mono ${
              selectedCodeSolution
                ? "bg-black text-white hover:bg-white hover:text-black hover:scale-105"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            CONTINUE WITH SELECTED SOLUTION →
          </button>
        </div>
      </div>
    );

    const selectedSolution = selectedCodeSolution
      ? codeSolutions[selectedCodeSolution]
      : null;

    const renderCodeAnalysis = () => {
      if (!selectedSolution) return null;

      return (
        <div className="space-y-6">
          <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative">
            <div className="absolute -top-6 left-4 px-3 py-1 bg-green-600 text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
              <Target className="w-4 h-4" />
              STEP 1: CODE ANALYSIS
            </div>
            <div className="text-2xl md:text-3xl font-bold tracking-tight text-black text-center mb-6">
              Your Selected Solution
            </div>

            <div className="space-y-6">
              <div className="border-4 border-green-600 rounded-xl p-6 bg-green-50">
                <h3 className="font-bold text-green-700 text-lg font-mono uppercase mb-3">
                  YOUR CODE ({selectedSolution.label})
                </h3>
                <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
                  <pre className="text-white whitespace-pre-wrap leading-relaxed">
                    {selectedSolution.code}
                  </pre>
                </div>
                <div className="p-3 bg-white border-2 border-green-600 rounded-lg">
                  <p className="font-mono text-black font-bold mb-2">
                    Basic Test: second_largest([1, 3, 2, 5, 4])
                  </p>
                  <p className="font-mono text-black">
                    Output: {selectedSolution.basicTest.output}
                  </p>
                  <span className="px-2 py-1 bg-green-300 border-2 border-black font-mono font-bold text-xs inline-block mt-2">
                    ✓ RUNS CORRECTLY
                  </span>
                </div>
              </div>

              <div className="border-4 border-yellow-600 rounded-xl p-6 bg-yellow-50">
                <h3 className="font-bold text-yellow-700 text-lg font-mono uppercase mb-3">
                  THE QUESTION
                </h3>
                <p className="text-black font-mono text-lg">
                  The code runs and produces the correct output. But is running
                  correctly the only measure of programming competency? We'll
                  compare AFM's binary approach with a comprehensive code
                  evaluation.
                </p>
              </div>

              <div className="border-4 border-orange-600 rounded-xl p-6 bg-orange-50">
                <h3 className="font-bold text-orange-700 text-lg font-mono uppercase mb-3">
                  POTENTIAL CODE QUALITY ISSUES
                </h3>
                <div className="space-y-3">
                  <div className="p-3 bg-white border-2 border-orange-600 rounded-lg">
                    <h4 className="font-bold text-orange-700 font-mono mb-2">
                      EFFICIENCY:
                    </h4>
                    <p className="text-black font-mono text-sm">
                      {selectedSolution.issues.efficiency}
                    </p>
                  </div>
                  <div className="p-3 bg-white border-2 border-orange-600 rounded-lg">
                    <h4 className="font-bold text-orange-700 font-mono mb-2">
                      EDGE CASES:
                    </h4>
                    <p className="text-black font-mono text-sm">
                      {selectedSolution.issues.edgeCases}
                    </p>
                  </div>
                  <div className="p-3 bg-white border-2 border-orange-600 rounded-lg">
                    <h4 className="font-bold text-orange-700 font-mono mb-2">
                      DOCUMENTATION:
                    </h4>
                    <p className="text-black font-mono text-sm">
                      {selectedSolution.issues.documentation}
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
              TEST YOUR CODE →
            </button>
          </div>
        </div>
      );
    };

    const renderFunctionalityAssessment = () => {
      if (!selectedSolution) return null;

      return (
        <div className="space-y-6">
          <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative">
            <div className="absolute -top-6 left-4 px-3 py-1 bg-blue-600 text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
              <Zap className="w-4 h-4" />
              STEP 2: INTERACTIVE FUNCTIONALITY TESTS
            </div>
            <div className="text-2xl md:text-3xl font-bold tracking-tight text-black text-center mb-6">
              Test Your Code
            </div>
            <p className="text-lg text-black text-center mb-8 font-bold">
              Click on each test case to see how your code handles different
              scenarios
            </p>

            <div className="space-y-4">
              <div className="border-4 border-blue-600 rounded-xl p-6 bg-blue-50">
                <h3 className="font-bold text-blue-700 text-lg font-mono uppercase mb-3">
                  INTERACTIVE TEST CASES
                </h3>
                <div className="space-y-3">
                  {selectedSolution.testCases.map((testCase) => (
                    <div key={testCase.id} className="space-y-2">
                      <div
                        className={`p-4 bg-white rounded-lg cursor-pointer transition-all border-4 ${
                          testCaseResults[testCase.id]
                            ? testCase.pass
                              ? "border-green-600"
                              : "border-red-600"
                            : "border-gray-400 hover:border-gray-600"
                        }`}
                        onClick={() => handleTestCase(testCase.id)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-black font-mono text-lg">
                            {testCase.description}
                          </h4>
                          {testCaseResults[testCase.id] && (
                            <span
                              className={`px-3 py-1 border-2 border-black font-mono font-bold text-xs ${
                                testCase.pass ? "bg-green-300" : "bg-red-300"
                              }`}
                            >
                              {testCase.pass ? "✓ PASS" : "✗ FAIL"}
                            </span>
                          )}
                        </div>
                        <div className="font-mono text-black text-sm space-y-1">
                          <p>
                            <span className="font-bold">Input:</span>{" "}
                            {testCase.input}
                          </p>
                          <p>
                            <span className="font-bold">Expected:</span>{" "}
                            {testCase.expected}
                          </p>
                          {testCaseResults[testCase.id] && (
                            <p
                              className={
                                testCase.pass
                                  ? "text-green-700"
                                  : "text-red-700"
                              }
                            >
                              <span className="font-bold">Result:</span>{" "}
                              {testCase.result}
                            </p>
                          )}
                        </div>
                        {!testCaseResults[testCase.id] && (
                          <div className="mt-2 text-blue-600 font-mono text-xs font-bold">
                            Click to run this test →
                          </div>
                        )}
                      </div>

                      {testCaseResults[testCase.id] &&
                        !testCase.pass &&
                        testCase.errorExplanation && (
                          <div className="ml-4 p-3 bg-red-50 border-l-4 border-red-600 rounded">
                            <h5 className="font-bold text-red-700 font-mono text-sm mb-1">
                              WHY THIS FAILS:
                            </h5>
                            <p className="text-black font-mono text-sm">
                              {testCase.errorExplanation}
                            </p>
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              </div>

              {Object.keys(testCaseResults).length ===
                selectedSolution.testCases.length && (
                <div className="border-4 border-yellow-600 rounded-xl p-6 bg-yellow-50 animate-fadeIn">
                  <div className="flex items-center gap-3 mb-3">
                    <AlertTriangle className="w-6 h-6 text-yellow-700" />
                    <h3 className="font-bold text-yellow-700 text-lg font-mono uppercase">
                      TESTING COMPLETE
                    </h3>
                  </div>
                  <p className="text-black font-mono text-sm mb-2">
                    Your code passed{" "}
                    {selectedSolution.testCases.filter((tc) => tc.pass).length}{" "}
                    out of {selectedSolution.testCases.length} test cases.
                  </p>
                  <p className="text-black font-mono text-sm">
                    While your code works for basic scenarios, it has problems
                    with edge cases. Let's look at a better solution.
                  </p>
                </div>
              )}
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
              SEE BETTER SOLUTION →
            </button>
          </div>
        </div>
      );
    };

    const renderBetterSolutionExample = () => (
      <div className="space-y-6">
        <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative">
          <div className="absolute -top-6 left-4 px-3 py-1 bg-purple-600 text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            STEP 3: BETTER SOLUTION EXAMPLE
          </div>
          <div className="text-2xl md:text-3xl font-bold tracking-tight text-black text-center mb-6">
            A More Robust Solution
          </div>
          <p className="text-lg text-black text-center mb-8 font-bold">
            Here's how to handle all edge cases properly with O(n) efficiency
          </p>

          <div className="space-y-6">
            <div className="border-4 border-green-600 rounded-xl p-6 bg-green-50">
              <h3 className="font-bold text-green-700 text-lg font-mono uppercase mb-3">
                IMPROVED SOLUTION
              </h3>
              <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm">
                <pre className="text-white whitespace-pre-wrap leading-relaxed">
                  {betterSolution}
                </pre>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-4 border-blue-600 rounded-xl p-6 bg-blue-50">
                <h3 className="font-bold text-blue-700 text-lg font-mono uppercase mb-3">
                  KEY IMPROVEMENTS
                </h3>
                <ul className="space-y-2 text-black font-mono text-sm">
                  <li>✓ O(n) time complexity - single pass</li>
                  <li>✓ Handles empty lists gracefully</li>
                  <li>✓ Properly manages duplicates</li>
                  <li>✓ No list modification</li>
                  <li>✓ Clear documentation</li>
                  <li>✓ Input validation</li>
                </ul>
              </div>

              <div className="border-4 border-yellow-600 rounded-xl p-6 bg-yellow-50">
                <h3 className="font-bold text-yellow-700 text-lg font-mono uppercase mb-3">
                  TEST RESULTS
                </h3>
                <div className="space-y-2">
                  <div className="p-2 bg-white border-2 border-green-600 rounded">
                    <p className="font-mono text-sm text-black">
                      [1, 3, 2, 5, 4] → 4 ✓
                    </p>
                  </div>
                  <div className="p-2 bg-white border-2 border-green-600 rounded">
                    <p className="font-mono text-sm text-black">[] → None ✓</p>
                  </div>
                  <div className="p-2 bg-white border-2 border-green-600 rounded">
                    <p className="font-mono text-sm text-black">
                      [5, 5, 3, 1] → 3 ✓
                    </p>
                  </div>
                  <div className="p-2 bg-white border-2 border-green-600 rounded">
                    <p className="font-mono text-sm text-black">[7] → None ✓</p>
                  </div>
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
            ASSESSMENT COMPARISON →
          </button>
        </div>
      </div>
    );

    const renderResults = () => (
      <div className="space-y-6">
        <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative">
          <div className="absolute -top-6 left-4 px-3 py-1 bg-red-600 text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
            <Brain className="w-4 h-4" />
            ASSESSMENT COMPARISON
          </div>
          <div className="text-2xl md:text-3xl font-bold tracking-tight text-black text-center mb-6">
            Assessment Comparison
          </div>
          <p className="text-lg text-black text-center mb-8 font-bold">
            AFM's binary approach vs. comprehensive code evaluation
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-4 border-red-600 rounded-xl p-6 bg-red-50">
              <h3 className="font-bold text-red-700 text-lg font-mono uppercase mb-4 text-center">
                AFM Binary Assessment
              </h3>
              <div className="space-y-4">
                <div className="bg-red-100 p-4 border-2 border-red-600 rounded-lg">
                  <h4 className="font-bold text-red-700 font-mono mb-2">
                    BINARY LOGIC:
                  </h4>
                  <p className="text-black font-mono text-sm mb-2">
                    Code runs correctly → Skill mastered
                  </p>
                  <p className="text-black font-mono text-sm">
                    Code fails/error → Skill not mastered
                  </p>
                </div>

                <div className="bg-red-50 p-4 border-2 border-red-600 rounded-lg">
                  <h4 className="font-bold text-red-700 font-mono mb-2">
                    WHAT AFM IGNORES:
                  </h4>
                  <ul className="text-black font-mono text-sm space-y-1">
                    <li>• Algorithm efficiency</li>
                    <li>• Edge case handling</li>
                    <li>• Code readability</li>
                    <li>• Documentation quality</li>
                    <li>• Best practices</li>
                    <li>• Robustness</li>
                  </ul>
                </div>

                <div className="bg-white p-4 border-2 border-red-600 rounded-lg">
                  <p className="text-black font-mono text-sm italic">
                    "Your code works for the test case, so you must understand
                    everything perfectly!"
                  </p>
                </div>
              </div>
            </div>

            <div className="border-4 border-green-600 rounded-xl p-6 bg-green-50">
              <h3 className="font-bold text-green-700 text-lg font-mono uppercase mb-4 text-center">
                Holistic Assessment
              </h3>
              <div className="space-y-4">
                <div className="bg-green-100 p-4 border-2 border-green-600 rounded-lg">
                  <h4 className="font-bold text-green-700 font-mono mb-2">
                    COMPREHENSIVE EVALUATION:
                  </h4>
                  <p className="text-black font-mono text-sm">
                    Considers multiple dimensions of code quality beyond just
                    "does it run?"
                  </p>
                </div>

                <div className="bg-green-50 p-4 border-2 border-green-600 rounded-lg">
                  <h4 className="font-bold text-green-700 font-mono mb-2">
                    WHAT GETS CONSIDERED:
                  </h4>
                  <ul className="text-black font-mono text-sm space-y-1">
                    <li>✓ Correctness for various inputs</li>
                    <li>✓ Algorithmic efficiency (time/space)</li>
                    <li>✓ Edge case handling</li>
                    <li>✓ Code style and readability</li>
                    <li>✓ Documentation and comments</li>
                    <li>✓ Error handling and robustness</li>
                    <li>✓ Following best practices</li>
                    <li>✓ Maintainability</li>
                  </ul>
                </div>

                <div className="bg-white p-4 border-2 border-green-600 rounded-lg">
                  <p className="text-black font-mono text-sm italic">
                    "Your code works for basic cases, but needs improvement in
                    efficiency and edge case handling."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative">
          <div className="absolute -top-6 left-4 px-3 py-1 bg-yellow-600 text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            THE LIMITATION OF BINARY ASSESSMENT
          </div>
          <div className="space-y-6">
            <div className="text-center">
              <div className="bg-yellow-300 border-2 border-black px-6 py-4 inline-block mb-4">
                <span className="text-black font-bold text-xl font-mono">
                  WHY THIS MATTERS
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border-l-4 border-yellow-600 bg-yellow-50 p-4 rounded">
                <h4 className="font-bold text-yellow-700 mb-2 font-mono">
                  LOST INFORMATION
                </h4>
                <ul className="text-black font-mono text-sm space-y-1">
                  <li>• Code quality differences invisible</li>
                  <li>• No feedback on efficiency</li>
                  <li>• Edge case gaps undetected</li>
                  <li>• Best practices not reinforced</li>
                  <li>• Partial understanding missed</li>
                </ul>
              </div>
              <div className="border-l-4 border-yellow-600 bg-yellow-50 p-4 rounded">
                <h4 className="font-bold text-yellow-700 mb-2 font-mono">
                  EDUCATIONAL IMPACT
                </h4>
                <ul className="text-black font-mono text-sm space-y-1">
                  <li>• Students think "works" = "perfect"</li>
                  <li>• No incentive for code quality</li>
                  <li>• Reinforces "shortcut" thinking</li>
                  <li>• Misses learning opportunities</li>
                  <li>• Poor preparation for real work</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 border-4 border-blue-600 p-6 rounded-xl">
              <h4 className="font-bold text-blue-700 mb-3 font-mono text-center text-lg">
                THE BOTTOM LINE
              </h4>
              <p className="text-black font-mono text-sm text-center">
                AFM treats programming skill as binary (can/cannot), but real
                programming competency exists on a spectrum. A holistic
                assessment approach captures the nuances of code quality,
                helping students develop not just working code, but
                professional-grade solutions.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={resetSimulation}
            className="px-6 py-3 bg-white text-black border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-black hover:text-white transition-all transform hover:scale-105 font-mono"
          >
            TRY ANOTHER SOLUTION
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
      3: renderBetterSolutionExample,
      4: renderResults,
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
    // Hint-based learning scenario showing how AFM misses contextual learning

    const contextScenario = {
      student: "Sarah, learning Python loops",
      skill: "Python For Loops",
      taskA: {
        question: "What will this Python code output?",
        code: `for i in range(3):
    print(i * 2)`,
        options: ["0 2 4", "1 2 3", "2 4 6", "0 1 2"],
        correctAnswer: "0 2 4",
        incorrectHint:
          "Remember: range(3) gives you 0, 1, 2. Then multiply each by 2: 0*2=0, 1*2=2, 2*2=4",
        correctFeedback:
          "Great! You understand that range(3) creates 0, 1, 2, and each gets multiplied by 2. This pattern-recognition skill will help you with similar problems!",
      },
      taskB: {
        question: "What will this Python code output?",
        code: `for j in range(2):
    print(j * 3)`,
        options: ["0 3", "1 3", "0 6", "3 6"],
        correctAnswer: "0 3",
        contextualLearning: true, // This success builds on Task A's hint
      },
    };

    const handleTaskAAnswer = (answer) => {
      setContextTaskAAnswer(answer);
      // Always show contextual feedback to demonstrate context-based learning
      setContextShowHint(true);
    };

    const handleTaskBAnswer = (answer) => {
      setContextTaskBAnswer(answer);
      setContextShowComparison(true);
    };

    const resetScenario = () => {
      setContextTaskAAnswer(null);
      setContextTaskBAnswer(null);
      setContextShowHint(false);
      setContextShowComparison(false);
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
              How AFM misses learning from contextual hints and task sequences
            </p>
          </div>

          {/* Scenario Introduction */}
          <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative">
            <div className="absolute -top-6 left-4 px-3 py-1 bg-blue-600 text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
              <Code className="w-4 h-4" />
              LEARNING SCENARIO
            </div>
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-black mb-4">
                  Python Learning Sequence
                </h2>
                <p className="text-lg text-black font-bold">
                  {contextScenario.student} solves two Python tasks back-to-back
                  on an e-learning platform. Watch how context affects learning!
                </p>
              </div>

              <div className="border-4 border-blue-600 rounded-xl p-6 bg-blue-50">
                <h3 className="font-bold text-blue-700 text-lg font-mono uppercase mb-3">
                  WHAT WILL HAPPEN:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-white border-2 border-blue-600 rounded-lg">
                    <span className="font-mono text-black font-bold text-sm">
                      1. TASK A: Student attempts task, receives contextual
                      feedback
                    </span>
                  </div>
                  <div className="p-3 bg-white border-2 border-blue-600 rounded-lg">
                    <span className="font-mono text-black font-bold text-sm">
                      2. TASK B: Student applies learning from context to
                      similar task
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Task A */}
          <div className="border-4 border-red-600 rounded-xl p-8 bg-red-50 shadow-lg relative">
            <div className="absolute -top-6 left-4 px-3 py-1 bg-red-600 text-white font-semibold rounded-md text-xs tracking-wider">
              TASK A
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-red-700 text-center mb-4">
                {contextScenario.taskA.question}
              </h3>

              <div className="bg-black text-green-400 p-6 rounded-xl font-['IBM_Plex_Mono',monospace] text-lg border-4 border-black">
                <pre className="whitespace-pre-wrap">
                  {contextScenario.taskA.code}
                </pre>
              </div>

              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                {contextScenario.taskA.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      !contextTaskAAnswer && handleTaskAAnswer(option)
                    }
                    disabled={!!contextTaskAAnswer}
                    className={`px-6 py-4 border-4 border-black rounded-xl font-bold text-xl uppercase tracking-wide transition-all ${
                      contextTaskAAnswer === option
                        ? option === contextScenario.taskA.correctAnswer
                          ? "bg-green-600 text-white"
                          : "bg-red-600 text-white"
                        : contextTaskAAnswer
                        ? option === contextScenario.taskA.correctAnswer
                          ? "bg-green-300 text-black"
                          : "bg-gray-200 text-gray-500"
                        : "bg-white text-black hover:bg-red-200 cursor-pointer transform hover:scale-105"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {contextTaskAAnswer && (
                <div className="space-y-4">
                  <div
                    className={`border-l-8 ${
                      contextTaskAAnswer === contextScenario.taskA.correctAnswer
                        ? "border-green-600 bg-green-100"
                        : "border-red-600 bg-red-100"
                    } p-6 rounded-r-xl`}
                  >
                    <p className="text-black text-xl font-bold">
                      {contextTaskAAnswer ===
                      contextScenario.taskA.correctAnswer
                        ? "Correct!"
                        : "Incorrect!"}
                      The answer is{" "}
                      <strong>{contextScenario.taskA.correctAnswer}</strong>.
                    </p>
                  </div>

                  {contextShowHint && (
                    <div
                      className={`border-l-8 p-6 rounded-r-xl ${
                        contextTaskAAnswer ===
                        contextScenario.taskA.correctAnswer
                          ? "border-blue-600 bg-blue-100"
                          : "border-yellow-600 bg-yellow-100"
                      }`}
                    >
                      <h4
                        className={`font-bold text-lg mb-2 ${
                          contextTaskAAnswer ===
                          contextScenario.taskA.correctAnswer
                            ? "text-blue-700"
                            : "text-yellow-700"
                        }`}
                      >
                        {contextTaskAAnswer ===
                        contextScenario.taskA.correctAnswer
                          ? "✅ CONTEXTUAL FEEDBACK PROVIDED:"
                          : "💡 HELPFUL HINT PROVIDED:"}
                      </h4>
                      <p className="text-black text-lg font-bold">
                        {contextTaskAAnswer ===
                        contextScenario.taskA.correctAnswer
                          ? contextScenario.taskA.correctFeedback
                          : contextScenario.taskA.incorrectHint}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Task B - Only show after Task A is completed */}
          {contextTaskAAnswer && (
            <div className="border-4 border-green-600 rounded-xl p-8 bg-green-50 shadow-lg relative">
              <div className="absolute -top-6 left-4 px-3 py-1 bg-green-600 text-white font-semibold rounded-md text-xs tracking-wider">
                TASK B (IMMEDIATELY AFTER)
              </div>
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-green-700 text-center mb-4">
                  {contextScenario.taskB.question}
                </h3>

                <div className="bg-black text-green-400 p-6 rounded-xl font-['IBM_Plex_Mono',monospace] text-lg border-4 border-black">
                  <pre className="whitespace-pre-wrap">
                    {contextScenario.taskB.code}
                  </pre>
                </div>

                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                  {contextScenario.taskB.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        !contextTaskBAnswer && handleTaskBAnswer(option)
                      }
                      disabled={!!contextTaskBAnswer}
                      className={`px-6 py-4 border-4 border-black rounded-xl font-bold text-xl uppercase tracking-wide transition-all ${
                        contextTaskBAnswer === option
                          ? option === contextScenario.taskB.correctAnswer
                            ? "bg-green-600 text-white"
                            : "bg-red-600 text-white"
                          : contextTaskBAnswer
                          ? option === contextScenario.taskB.correctAnswer
                            ? "bg-green-300 text-black"
                            : "bg-gray-200 text-gray-500"
                          : "bg-white text-black hover:bg-green-200 cursor-pointer transform hover:scale-105"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                {contextTaskBAnswer && (
                  <div className="border-l-8 border-green-600 bg-green-100 p-6 rounded-r-xl">
                    <p className="text-black text-xl font-bold">
                      {contextTaskBAnswer ===
                      contextScenario.taskB.correctAnswer
                        ? "Correct!"
                        : "Incorrect!"}
                      The answer is{" "}
                      <strong>{contextScenario.taskB.correctAnswer}</strong>.
                      {contextTaskBAnswer ===
                        contextScenario.taskB.correctAnswer &&
                        contextShowHint && (
                          <span className="text-green-700">
                            {" "}
                            Great! You applied the contextual learning from Task
                            A!
                          </span>
                        )}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* AFM vs Reality Comparison */}
          {contextShowComparison && (
            <div className="space-y-6">
              <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative">
                <div className="absolute -top-6 left-4 px-3 py-1 bg-purple-600 text-white font-semibold rounded-md text-xs tracking-wider">
                  AFM VS REALITY
                </div>
                <div className="text-2xl font-bold text-black text-center mb-6">
                  How AFM Misses Contextual Learning
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border-4 border-blue-600 rounded-xl p-6 bg-blue-50">
                    <h3 className="font-bold text-blue-700 text-lg font-mono uppercase mb-4 text-center">
                      WHAT ACTUALLY HAPPENED
                    </h3>
                    <div className="space-y-3">
                      <div className="bg-white p-4 border-2 border-blue-600 rounded-lg">
                        <p className="text-black font-bold text-sm">
                          Student received contextual feedback on Task A{" "}
                          {contextTaskAAnswer ===
                          contextScenario.taskA.correctAnswer
                            ? "(reinforcement)"
                            : "(corrective hint)"}
                          , carrying that knowledge into Task B
                        </p>
                      </div>
                      <div className="bg-white p-4 border-2 border-blue-600 rounded-lg">
                        <p className="text-black font-bold text-sm">
                          Success on Task B was influenced by immediate
                          contextual learning and timing
                        </p>
                      </div>
                      <div className="bg-white p-4 border-2 border-blue-600 rounded-lg">
                        <p className="text-black font-bold text-sm">
                          This represents rapid learning from targeted
                          contextual support
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border-4 border-red-600 rounded-xl p-6 bg-red-50">
                    <h3 className="font-bold text-red-700 text-lg font-mono uppercase mb-4 text-center">
                      WHAT AFM SEES
                    </h3>
                    <div className="space-y-3">
                      <div className="bg-white p-4 border-2 border-red-600 rounded-lg">
                        <p className="text-black font-bold text-sm">
                          Simply counts: 2 total opportunities for "Python For
                          Loops"
                        </p>
                      </div>
                      <div className="bg-white p-4 border-2 border-red-600 rounded-lg">
                        <p className="text-black font-bold text-sm">
                          Treats each attempt as an isolated event
                        </p>
                      </div>
                      <div className="bg-white p-4 border-2 border-red-600 rounded-lg">
                        <p className="text-black font-bold text-sm">
                          Ignores contextual feedback, timing, and learning
                          sequence completely
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative">
                <div className="absolute -top-6 left-4 px-3 py-1 bg-orange-600 text-white font-semibold rounded-md text-xs tracking-wider">
                  CONTEXT BLINDNESS CONSEQUENCES
                </div>
                <div className="text-center space-y-4">
                  <div className="bg-orange-300 border-2 border-black px-6 py-4 inline-block">
                    <span className="text-black font-bold text-xl font-mono">
                      AFM CANNOT DETECT CONTEXTUAL LEARNING PATTERNS
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border-l-4 border-orange-600 bg-orange-50 p-4">
                      <h4 className="font-bold text-orange-700 mb-2">
                        MISSED PATTERNS
                      </h4>
                      <ul className="text-sm text-black space-y-1">
                        <li>• Rapid learning from feedback</li>
                        <li>• Task sequence effects</li>
                        <li>• Contextual support impact</li>
                      </ul>
                    </div>
                    <div className="border-l-4 border-orange-600 bg-orange-50 p-4">
                      <h4 className="font-bold text-orange-700 mb-2">
                        POOR ADAPTATION
                      </h4>
                      <ul className="text-sm text-black space-y-1">
                        <li>• Can't adapt feedback timing</li>
                        <li>• Misses optimal hint moments</li>
                        <li>• Ignores learning trajectories</li>
                      </ul>
                    </div>
                    <div className="border-l-4 border-orange-600 bg-orange-50 p-4">
                      <h4 className="font-bold text-orange-700 mb-2">
                        LIMITED INSIGHTS
                      </h4>
                      <ul className="text-sm text-black space-y-1">
                        <li>• Same estimate for hint vs random success</li>
                        <li>• No personalized instruction</li>
                        <li>• Reduced learning effectiveness</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <button
                  onClick={resetScenario}
                  className="px-6 py-3 bg-white text-black border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-black hover:text-white transition-all transform hover:scale-105 font-mono"
                >
                  Try Again
                </button>
                <button
                  onClick={backToOverview}
                  className="px-6 py-3 bg-black text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-black transition-all transform hover:scale-105 font-mono"
                >
                  ← Return to Overview
                </button>
              </div>
            </div>
          )}
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
              . If Aileen doesn't review or practice Python after today, what do
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
    // Two tasks with same knowledge component but very different difficulty
    const taskComparison = {
      easyTask: {
        id: "easy",
        difficulty: "Easy",
        // AFM has NO item difficulty parameter for this task
        instruction: "Complete this Python task:",
        task: "Assign the number 10 to a variable called x.",
        code: `# Your task: Assign the number 10 to a variable called x
# Write your answer below:

`,
        options: ["x = 10", "x == 10", "10 = x", "var x = 10"],
        correctAnswer: "x = 10",
        skills: ["Using Variables in Python"],
        afmPrediction: 0.72, // AFM gives same prediction for both tasks
      },
      hardTask: {
        id: "hard",
        difficulty: "Hard",
        // AFM has NO item difficulty parameter for this task
        instruction: "Complete this Python task:",
        task: "Write a function that takes a list and returns all even numbers.",
        code: `# Your task: Write a function that takes a list and returns all even numbers
# Function should be named 'get_evens' and take parameter 'numbers'
# Write your answer below:

`,
        options: [
          "def get_evens(numbers):\n    return [x for x in numbers if x % 2 == 0]",
          "def get_evens(numbers):\n    return numbers % 2 == 0",
          "function get_evens(numbers):\n    return [x for x in numbers if x % 2 == 0]",
          "def get_evens(numbers):\n    return numbers.filter(x % 2 == 0)",
        ],
        correctAnswer:
          "def get_evens(numbers):\n    return [x for x in numbers if x % 2 == 0]",
        skills: ["Using Variables in Python"], // Same KC as easy task!
        afmPrediction: 0.72, // AFM gives same prediction for both tasks
      },
    };

    // Show how AFM's lack of item difficulty parameters causes problems
    const baseKCMastery = 0.72; // What AFM thinks the KC mastery is

    // What the predictions SHOULD be if AFM had item difficulty parameters
    // (using hypothetical difficulty values that would make sense)
    const easyItemDifficulty = -1.8; // Variable assignment is very easy
    const hardItemDifficulty = 1.4; // Function writing is much harder

    const calculateCorrectPrediction = (itemDifficulty) => {
      return Math.max(
        0.05,
        Math.min(
          0.95,
          1 / (1 + Math.exp(-(baseKCMastery * 3 - itemDifficulty)))
        )
      );
    };

    const easyCorrectPrediction =
      calculateCorrectPrediction(easyItemDifficulty);
    const hardCorrectPrediction =
      calculateCorrectPrediction(hardItemDifficulty);

    const handleTaskAnswer = (taskType, answer) => {
      if (taskType === "easy") {
        setEasyTaskAnswer(answer);
        if (hardTaskAnswer !== null) {
          setShowTaskComparison(true);
        }
      } else {
        setHardTaskAnswer(answer);
        if (easyTaskAnswer !== null) {
          setShowTaskComparison(true);
        }
      }
    };

    const resetSimulation = () => {
      setEasyTaskAnswer(null);
      setHardTaskAnswer(null);
      setShowTaskComparison(false);
    };

    return (
      <TechnicalLayout>
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-black mb-4 uppercase tracking-wide">
              Item Difficulty Limitation
            </h1>
            <p className="text-black text-xl font-bold leading-relaxed">
              Compare these two Python tasks that are mapped to the same
              knowledge component but have very different difficulty levels.{" "}
              <span className="text-yellow-600 font-bold underline decoration-4">
                Notice how AFM gives identical predictions despite the obvious
                difficulty difference.
              </span>
            </p>
          </div>

          {/* Knowledge Component Mapping */}
          <div className="border-4 border-black rounded-xl p-6 bg-white shadow-lg">
            <h3 className="text-2xl font-bold text-black text-center mb-4 uppercase tracking-wide">
              AFM's Knowledge Component Mapping
            </h3>
            <div className="grid grid-cols-3 gap-4 items-center">
              <div className="text-center">
                <div className="border-2 border-green-600 bg-green-50 p-4 rounded-lg">
                  <div className="text-lg font-bold text-green-700 mb-2">
                    Easy Task
                  </div>
                  <div className="text-sm text-black">"Assign variable x"</div>
                </div>
              </div>

              <div className="text-center">
                <div className="border-4 border-blue-600 bg-blue-100 p-4 rounded-lg">
                  <div className="text-lg font-bold text-blue-700 mb-2">
                    MAPPED TO SAME SKILL
                  </div>
                  <div className="text-xl font-bold text-black">
                    "{taskComparison.easyTask.skills[0]}"
                  </div>
                  <div className="text-sm text-blue-700 mt-2">
                    Therefore same prediction!
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="border-2 border-red-600 bg-red-50 p-4 rounded-lg">
                  <div className="text-lg font-bold text-red-700 mb-2">
                    Hard Task
                  </div>
                  <div className="text-sm text-black">"Write function"</div>
                </div>
              </div>
            </div>
          </div>

          {/* AFM Beta Parameter Display */}
          <div className="border-4 border-black rounded-xl p-6 bg-white shadow-lg">
            <h3 className="text-2xl font-bold text-black text-center mb-4 uppercase tracking-wide">
              AFM's Beta Parameter (KC Easiness)
            </h3>
            <div className="text-center mb-4">
              <div className="border-4 border-blue-600 bg-blue-50 p-4 rounded-xl inline-block">
                <div className="text-lg font-bold text-blue-700 mb-2">
                  "{taskComparison.easyTask.skills[0]}" Knowledge Component
                </div>
                <div className="text-3xl font-bold text-blue-600">β = 0.89</div>
                <div className="text-sm font-mono text-blue-700 mt-2">
                  (Beta parameter - KC easiness learned from all mapped tasks)
                </div>
              </div>
            </div>
            <div className="text-center">
              <span className="bg-blue-200 px-4 py-2 border-2 border-black rounded font-bold text-black">
                THIS SINGLE β VALUE IS USED FOR BOTH TASKS!
              </span>
            </div>
          </div>

          {/* AFM Prediction Comparison */}
          <div className="border-4 border-black rounded-xl p-6 bg-white shadow-lg">
            <h3 className="text-2xl font-bold text-black text-center mb-4 uppercase tracking-wide">
              AFM's Identical Predictions
            </h3>
            <div className="grid grid-cols-2 gap-8">
              <div className="text-center">
                <div className="text-lg font-bold text-black mb-2">
                  Easy Task
                </div>
                <div className="text-sm font-mono text-blue-600 mb-2">
                  KC: {taskComparison.easyTask.skills[0]}
                </div>
                <div className="text-3xl font-bold text-yellow-600 mb-2">
                  {(taskComparison.easyTask.afmPrediction * 100).toFixed(0)}%
                </div>
                <div className="w-full bg-gray-200 border-2 border-black h-6">
                  <div
                    className="h-full bg-yellow-600 transition-all duration-500"
                    style={{
                      width: `${taskComparison.easyTask.afmPrediction * 100}%`,
                    }}
                  />
                </div>
                <div className="text-sm font-mono text-gray-600 mt-2">
                  Uses only the KC's β parameter
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-black mb-2">
                  Hard Task
                </div>
                <div className="text-sm font-mono text-blue-600 mb-2">
                  KC: {taskComparison.hardTask.skills[0]}
                </div>
                <div className="text-3xl font-bold text-yellow-600 mb-2">
                  {(taskComparison.hardTask.afmPrediction * 100).toFixed(0)}%
                </div>
                <div className="w-full bg-gray-200 border-2 border-black h-6">
                  <div
                    className="h-full bg-yellow-600 transition-all duration-500"
                    style={{
                      width: `${taskComparison.hardTask.afmPrediction * 100}%`,
                    }}
                  />
                </div>
                <div className="text-sm font-mono text-gray-600 mt-2">
                  Uses the same KC's β parameter
                </div>
              </div>
            </div>
            <div className="text-center mt-4">
              <span className="bg-yellow-300 px-4 py-2 border-2 border-black rounded font-bold">
                SAME KC BETA PARAMETER → IDENTICAL PREDICTIONS!
              </span>
            </div>
          </div>

          {/* Side-by-Side Task Comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Easy Task */}
            <div className="border-4 border-green-600 rounded-xl p-6 bg-green-50">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-green-700 uppercase">
                  Easy Task
                </h3>
              </div>

              <div className="text-lg font-bold text-black mb-3">
                {taskComparison.easyTask.instruction}
              </div>

              <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
                <pre className="whitespace-pre-wrap">
                  {taskComparison.easyTask.code}
                </pre>
              </div>

              <div className="grid grid-cols-1 gap-2 mb-4">
                {taskComparison.easyTask.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      !showTaskComparison && handleTaskAnswer("easy", option)
                    }
                    disabled={showTaskComparison}
                    className={`px-4 py-3 border-2 border-black rounded font-mono text-base transition-all text-left ${
                      easyTaskAnswer === option
                        ? option === taskComparison.easyTask.correctAnswer
                          ? "bg-green-600 text-white"
                          : "bg-red-600 text-white"
                        : showTaskComparison
                        ? option === taskComparison.easyTask.correctAnswer
                          ? "bg-green-300 text-black"
                          : "bg-gray-200 text-gray-500"
                        : "bg-white text-black hover:bg-green-200 cursor-pointer"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              <div className="text-sm font-mono text-green-700">
                Knowledge Component: {taskComparison.easyTask.skills.join(", ")}
              </div>
            </div>

            {/* Hard Task */}
            <div className="border-4 border-red-600 rounded-xl p-6 bg-red-50">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-red-700 uppercase">
                  Hard Task
                </h3>
              </div>

              <div className="text-lg font-bold text-black mb-3">
                {taskComparison.hardTask.instruction}
              </div>

              <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
                <pre className="whitespace-pre-wrap">
                  {taskComparison.hardTask.code}
                </pre>
              </div>

              <div className="grid grid-cols-1 gap-2 mb-4">
                {taskComparison.hardTask.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      !showTaskComparison && handleTaskAnswer("hard", option)
                    }
                    disabled={showTaskComparison}
                    className={`px-4 py-3 border-2 border-black rounded font-mono text-xs transition-all text-left ${
                      hardTaskAnswer === option
                        ? option === taskComparison.hardTask.correctAnswer
                          ? "bg-green-600 text-white"
                          : "bg-red-600 text-white"
                        : showTaskComparison
                        ? option === taskComparison.hardTask.correctAnswer
                          ? "bg-green-300 text-black"
                          : "bg-gray-200 text-gray-500"
                        : "bg-white text-black hover:bg-red-200 cursor-pointer"
                    }`}
                  >
                    <pre className="whitespace-pre-wrap">{option}</pre>
                  </button>
                ))}
              </div>

              <div className="text-sm font-mono text-red-700">
                Knowledge Component: {taskComparison.hardTask.skills.join(", ")}{" "}
                (SAME as easy task!)
              </div>
            </div>
          </div>

          {/* Results and Analysis */}
          {easyTaskAnswer && hardTaskAnswer && (
            <div className="space-y-6">
              <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg">
                <h3 className="text-2xl font-bold text-black text-center mb-6 uppercase">
                  AFM Parameter Bias Demonstration
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="border-l-8 border-yellow-600 bg-yellow-100 p-6 rounded-r-xl">
                    <h4 className="font-bold text-yellow-700 text-lg mb-3">
                      AFM'S LIMITATION
                    </h4>
                    <p className="text-black font-bold">
                      AFM gives both tasks the same{" "}
                      {(taskComparison.easyTask.afmPrediction * 100).toFixed(0)}
                      % prediction because they use the same KC beta parameter
                      (β = 0.89). AFM has no item difficulty parameters, so it
                      can't distinguish between easy and hard tasks!
                    </p>
                  </div>

                  <div className="border-l-8 border-orange-600 bg-orange-100 p-6 rounded-r-xl">
                    <h4 className="font-bold text-orange-700 text-lg mb-3">
                      PARAMETER BIAS
                    </h4>
                    <p className="text-black font-bold">
                      The KC's beta parameter (β = 0.89) is a "blended average"
                      absorbing difficulty from both tasks. Easy variable
                      assignments and hard function writing both influence this
                      single parameter, creating biased estimates that don't
                      reflect true KC mastery!
                    </p>
                  </div>

                  <div className="border-l-8 border-red-600 bg-red-100 p-6 rounded-r-xl">
                    <h4 className="font-bold text-red-700 text-lg mb-3">
                      CONFOUNDED ESTIMATES
                    </h4>
                    <p className="text-black font-bold">
                      If a student gets the easy task correct but the hard task
                      wrong, AFM cannot tell whether the mistake was due to not
                      understanding "Using Variables in Python", or because
                      writing functions is simply harder than variable
                      assignment. The KC parameter becomes unreliable!
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center space-x-4">
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
            </div>
          )}
        </div>
      </TechnicalLayout>
    );
  };

  const renderQMatrixQuality = () => {
    const pythonProblems = [
      {
        id: "syntax_problem",
        question: "What will this Python code output?",
        code: `for i in range(3):
    print(i)`,
        options: ["0 2 4", "1 2 3", "0\n1\n2", "Error"],
        correctAnswer: "0\n1\n2",
        correctSkills: ["Loops", "Print Function"], // Actually needed skills
        incorrectSkills: ["Lists", "Functions"], // Wrongly mapped skills
        difficulty: 0.2, // 20% of students get this wrong
      },
      {
        id: "list_problem",
        question: "What will this Python code output?",
        code: `data = [1, 2, 3]
data.append(4)
print(len(data))`,
        options: ["3", "4", "7", "Error"],
        correctAnswer: "4",
        correctSkills: ["Lists", "Methods"], // Actually needed skills
        incorrectSkills: ["Loops", "Print Function"], // Wrongly mapped skills
        difficulty: 0.4, // 40% of students get this wrong
      },
      {
        id: "function_problem",
        question: "What will this Python code output?",
        code: `def double(x):
    return x * 2

result = double(5)
print(result)`,
        options: ["5", "10", "25", "Error"],
        correctAnswer: "10",
        correctSkills: ["Functions", "Return Values"], // Actually needed skills
        incorrectSkills: ["Lists", "Methods"], // Wrongly mapped skills
        difficulty: 0.6, // 60% of students get this wrong
      },
    ];

    const currentQ = pythonProblems[qMatrixCurrentProblem];
    const isCorrect = qMatrixSelectedAnswer === currentQ.correctAnswer;

    // Calculate AFM prediction based on mapping and user performance
    const calculateAFMPrediction = () => {
      const currentSkills =
        qMatrixViewMode === "correct"
          ? currentQ.correctSkills
          : currentQ.incorrectSkills;

      // AFM averages the mastery of mapped skills (simplified for clarity)
      const avgMastery =
        currentSkills.reduce((sum, skill) => sum + userSkillMastery[skill], 0) /
        currentSkills.length;

      // Return the average mastery as the prediction (AFM's core logic)
      return Math.max(0.1, Math.min(0.95, avgMastery));
    };

    const currentPrediction = calculateAFMPrediction();

    const handleAnswerSelect = (answer) => {
      setQMatrixSelectedAnswer(answer);
      setQMatrixShowFeedback(true);

      // Update skill mastery based on performance (AFM: always increases)
      const isAnswerCorrect = answer === currentQ.correctAnswer;
      const relevantSkills =
        qMatrixViewMode === "correct"
          ? currentQ.correctSkills
          : currentQ.incorrectSkills;

      setUserSkillMastery((prev) => {
        const updated = { ...prev };
        relevantSkills.forEach((skill) => {
          // AFM principle: any attempt increases skill mastery
          if (isAnswerCorrect) {
            updated[skill] = Math.min(0.95, updated[skill] + 0.15);
          } else {
            updated[skill] = Math.min(0.95, updated[skill] + 0.08); // Smaller increase for wrong answers
          }
        });
        return updated;
      });

      if (!qMatrixAttemptedProblems.includes(qMatrixCurrentProblem)) {
        setQMatrixAttemptedProblems((prev) => [...prev, qMatrixCurrentProblem]);
      }
    };

    const nextProblem = () => {
      if (qMatrixCurrentProblem < pythonProblems.length - 1) {
        setQMatrixCurrentProblem((prev) => prev + 1);
        setQMatrixSelectedAnswer(null);
        setQMatrixShowFeedback(false);
      }
    };

    const toggleMapping = () => {
      setQMatrixViewMode((prev) =>
        prev === "correct" ? "incorrect" : "correct"
      );
      setQMatrixSelectedAnswer(null);
      setQMatrixShowFeedback(false);
    };

    const resetSimulation = () => {
      setQMatrixCurrentProblem(0);
      setQMatrixSelectedAnswer(null);
      setQMatrixShowFeedback(false);
      setQMatrixViewMode("incorrect");
      setQMatrixAttemptedProblems([]);
      setUserSkillMastery({
        Loops: 0.5,
        "Print Function": 0.5,
        Lists: 0.5,
        Methods: 0.5,
        Functions: 0.5,
        "Return Values": 0.5,
      });
    };

    const currentSkills =
      qMatrixViewMode === "correct"
        ? currentQ.correctSkills
        : currentQ.incorrectSkills;

    return (
      <TechnicalLayout>
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-black mb-4 uppercase tracking-wide">
              Q-Matrix Quality Limitation
            </h1>
            <p className="text-black text-xl font-bold leading-relaxed">
              See how Q-matrix mapping quality affects which skills AFM updates
              when you answer questions.{" "}
              <span className="text-indigo-600 font-bold underline decoration-4">
                Watch how correct mapping updates the RIGHT skills (green) while
                incorrect mapping updates the WRONG skills (red).
              </span>
            </p>
          </div>

          {/* New layout: Q-Matrix Mapping at top, then question and skills side by side, then prediction at bottom */}

          {/* TOP: Q-Matrix Mapping - Wide narrow box */}
          <div className="border-4 border-black rounded-xl p-6 bg-white shadow-lg">
            <div className="mb-4">
              <span className="text-lg font-bold text-black uppercase tracking-wide block mb-3">
                Current Q-Matrix Mapping:
              </span>
              <button
                onClick={toggleMapping}
                disabled={qMatrixShowFeedback}
                className={`w-full px-6 py-3 border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide transition-all transform hover:scale-105 ${
                  qMatrixViewMode === "correct"
                    ? "bg-green-600 text-white hover:bg-white hover:text-green-600"
                    : "bg-red-600 text-white hover:bg-white hover:text-red-600"
                } ${
                  qMatrixShowFeedback ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {qMatrixViewMode === "correct"
                  ? "CORRECT MAPPING"
                  : "INCORRECT MAPPING"}
              </button>
            </div>
            <div className="text-center">
              <span
                className={`px-4 py-2 border-2 border-black rounded font-bold ${
                  qMatrixViewMode === "correct" ? "bg-green-300" : "bg-red-300"
                }`}
              >
                MAPPED TO: {currentSkills.join(", ")}
              </span>
            </div>
          </div>

          {/* MIDDLE: Two-column layout: Question on left, Skills on right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* LEFT COLUMN: Problem Display */}
            <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg h-fit">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-black uppercase tracking-tight mb-4">
                  {currentQ.question}
                </h2>
                <div className="flex justify-between items-center text-sm font-mono text-black">
                  <div>
                    <div className="mb-1">
                      Real Skills:{" "}
                      <span className="font-bold">
                        {currentQ.correctSkills.join(", ")}
                      </span>
                    </div>
                  </div>
                  <div className="px-4 py-2 border-2 border-black font-bold text-lg bg-blue-300">
                    Problem {qMatrixCurrentProblem + 1} of{" "}
                    {pythonProblems.length}
                  </div>
                </div>
              </div>

              <div className="bg-black text-green-400 p-6 rounded-xl font-['IBM_Plex_Mono',monospace] text-lg mb-8 border-4 border-black">
                <pre className="whitespace-pre-wrap">{currentQ.code}</pre>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {currentQ.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      !qMatrixShowFeedback && handleAnswerSelect(option)
                    }
                    disabled={qMatrixShowFeedback}
                    className={`px-6 py-4 border-4 border-black rounded-xl font-bold text-xl uppercase tracking-wide transition-all ${
                      qMatrixSelectedAnswer === option
                        ? isCorrect
                          ? "bg-green-600 text-white"
                          : "bg-red-600 text-white"
                        : qMatrixShowFeedback
                        ? option === currentQ.correctAnswer
                          ? "bg-green-300 text-black"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-white text-black hover:bg-indigo-400 cursor-pointer transform hover:scale-105"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {qMatrixShowFeedback && (
                <div className="space-y-6">
                  <div
                    className={`border-l-8 ${
                      isCorrect
                        ? "border-green-600 bg-green-100"
                        : "border-red-600 bg-red-100"
                    } p-6 rounded-r-xl`}
                  >
                    <p className="text-black text-xl font-bold">
                      {isCorrect ? "Correct!" : "Incorrect!"} The answer is{" "}
                      <strong>{currentQ.correctAnswer}</strong>.
                    </p>
                  </div>

                  <div
                    className={`border-l-8 border-indigo-600 bg-indigo-100 p-6 rounded-r-xl`}
                  >
                    <p className="text-black text-xl font-bold">
                      <strong>AFM Learning Update:</strong>
                      {qMatrixViewMode === "correct" ? (
                        <span className="text-green-700">
                          {" "}
                          With correct mapping, AFM updated the RIGHT skills for
                          this task: {currentSkills.join(", ")}. These are the
                          skills actually needed to solve this problem!
                        </span>
                      ) : (
                        <span className="text-red-700">
                          {" "}
                          With incorrect mapping, AFM updated the WRONG skills:{" "}
                          {currentSkills.join(", ")}. These skills aren't
                          actually needed for this task, leading to poor
                          predictions!
                        </span>
                      )}
                    </p>
                  </div>

                  {/* Show skill-specific feedback for correct mapping */}
                  {qMatrixViewMode === "correct" && (
                    <div className="border-l-8 border-green-600 bg-green-100 p-6 rounded-r-xl">
                      <p className="text-black text-lg font-bold mb-2">
                        Skills Updated:
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {currentSkills.map((skill) => (
                          <div
                            key={skill}
                            className="bg-white border-2 border-green-600 p-2 rounded"
                          >
                            <span className="text-green-700 font-bold">
                              {skill}
                            </span>
                            <span className="text-black">
                              {" "}
                              → {(userSkillMastery[skill] * 100).toFixed(0)}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-center space-x-4">
                    {!qMatrixAttemptedProblems.includes(
                      qMatrixCurrentProblem
                    ) && (
                      <button
                        onClick={toggleMapping}
                        className={`px-6 py-3 border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide transition-all transform hover:scale-105 ${
                          qMatrixViewMode === "correct"
                            ? "bg-red-600 text-white hover:bg-white hover:text-red-600"
                            : "bg-green-600 text-white hover:bg-white hover:text-green-600"
                        }`}
                      >
                        Switch to{" "}
                        {qMatrixViewMode === "correct"
                          ? "Incorrect"
                          : "Correct"}{" "}
                        Mapping
                      </button>
                    )}

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

            {/* RIGHT COLUMN: Skill Mastery Display */}
            <div className="border-4 border-black rounded-xl p-6 bg-white shadow-lg h-fit">
              <h3 className="font-bold text-black text-lg mb-4 uppercase tracking-wide">
                Current Skill Mastery (AFM's Internal Model):
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  "Loops",
                  "Print Function",
                  "Lists",
                  "Methods",
                  "Functions",
                  "Return Values",
                ].map((skill) => {
                  const isRelevantForCurrentTask =
                    currentQ.correctSkills.includes(skill);
                  const isMappedToCurrentTask =
                    qMatrixViewMode === "correct"
                      ? currentQ.correctSkills.includes(skill)
                      : currentQ.incorrectSkills.includes(skill);

                  let borderColor, bgColor, textColor, statusText;

                  if (qMatrixViewMode === "correct") {
                    if (isRelevantForCurrentTask) {
                      borderColor = "border-green-600";
                      bgColor = "bg-green-50";
                      textColor = "text-green-700";
                      statusText = "✓ Correctly mapped";
                    } else {
                      borderColor = "border-gray-400";
                      bgColor = "bg-gray-50";
                      textColor = "text-gray-700";
                      statusText = "Not used for this task";
                    }
                  } else {
                    if (isMappedToCurrentTask) {
                      borderColor = "border-red-600";
                      bgColor = "bg-red-50";
                      textColor = "text-red-700";
                      statusText = "✗ Incorrectly mapped!";
                    } else {
                      borderColor = "border-gray-400";
                      bgColor = "bg-gray-50";
                      textColor = "text-gray-700";
                      statusText = "Not mapped";
                    }
                  }

                  return (
                    <div
                      key={skill}
                      className={`border-2 ${borderColor} ${bgColor} p-3 rounded`}
                    >
                      <div className={`text-sm font-bold ${textColor} mb-1`}>
                        {skill}
                      </div>
                      <div className="text-lg font-bold text-black">
                        {(userSkillMastery[skill] * 100).toFixed(0)}%
                      </div>
                      <div className="w-full bg-gray-200 border border-black h-2 mb-1">
                        <div
                          className={`h-full transition-all duration-500 ${
                            qMatrixViewMode === "correct" &&
                            isRelevantForCurrentTask
                              ? "bg-green-600"
                              : qMatrixViewMode === "incorrect" &&
                                isMappedToCurrentTask
                              ? "bg-red-600"
                              : "bg-gray-400"
                          }`}
                          style={{
                            width: `${userSkillMastery[skill] * 100}%`,
                          }}
                        />
                      </div>
                      <div className={`text-xs ${textColor} font-bold`}>
                        {statusText}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* BOTTOM: AFM Prediction Display - Wide narrow box */}
          <div className="border-4 border-black rounded-xl p-6 bg-white shadow-lg">
            <div className="mb-4">
              <span className="text-2xl font-bold text-black uppercase tracking-wide block mb-4">
                AFM SUCCESS PREDICTION:
              </span>
              <div className="text-center mb-4">
                <span className="text-4xl font-bold text-black">
                  {(currentPrediction * 100).toFixed(0)}%
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-lg font-bold text-black">0%</span>
                <div className="flex-1 bg-gray-200 border-4 border-black rounded-none h-8 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-1000 ease-out ${
                      qMatrixViewMode === "correct"
                        ? "bg-green-600"
                        : "bg-red-600"
                    }`}
                    style={{ width: `${currentPrediction * 100}%` }}
                  />
                </div>
                <span className="text-lg font-bold text-black">100%</span>
              </div>
            </div>
            <div className="text-center">
              <span
                className={`px-4 py-2 border-2 border-black rounded font-bold ${
                  qMatrixViewMode === "correct" ? "bg-green-300" : "bg-red-300"
                }`}
              >
                {qMatrixViewMode === "correct"
                  ? "ACCURATE SKILL-SPECIFIC PREDICTION"
                  : "GENERIC PREDICTION - ACCURACY LOST!"}
              </span>
            </div>
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
                    className={`w-4 h-4 border-2 border-black ${
                      qMatrixAttemptedProblems.includes(index)
                        ? "bg-indigo-600"
                        : index === qMatrixCurrentProblem
                        ? "bg-blue-600"
                        : "bg-gray-200"
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
                <div className="border-l-4 border-red-600 bg-red-50 p-4">
                  <h4 className="font-bold text-xl text-red-700 mb-2">
                    Q-MATRIX PROBLEMS
                  </h4>
                  <ul className="text-lg font-bold text-black space-y-1">
                    <li>• Updates irrelevant skills</li>
                    <li>• Misleading predictions</li>
                    <li>• Wrong intervention recommendations</li>
                    <li>• Systematic assessment bias</li>
                  </ul>
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
    <div className="bg-white min-h-screen flex flex-col items-center py-8 px-4 md:px-10 text-black font-['IBM_Plex_Mono',monospace]">
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

        {/* Continue Button */}
        <div className="flex justify-center">
          <button
            onClick={() => navigate(17)}
            className="px-8 py-4 bg-purple-600 text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-purple-600 transition-all transform hover:scale-105 flex items-center gap-3"
          >
            <span>Continue</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
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
