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
    }
  };

  const backToOverview = () => {
    setCurrentView("overview");

    // Track completion for specific scenarios
    if (
      ["incorrect-answers-reflection", "no-forgetting", "binary-skills", "context-blind"].includes(
        currentView
      )
    ) {
      let scenarioId;
      if (currentView === "incorrect-answers-reflection")
        scenarioId = "incorrect-answers";
      else if (currentView === "no-forgetting") scenarioId = "no-forgetting";
      else if (currentView === "binary-skills") scenarioId = "binary-skills";
      else if (currentView === "context-blind") scenarioId = "context-blind";

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
    // Medical diagnosis scenario - more relatable and shows real-world implications
    const medicalCase = {
      patientInfo: "22-year-old college student presents with fatigue, difficulty concentrating, and frequent headaches for the past 3 weeks.",
      symptoms: [
        { id: 'fatigue', name: 'Chronic Fatigue', identified: true, points: 2 },
        { id: 'concentration', name: 'Difficulty Concentrating', identified: true, points: 2 },
        { id: 'headaches', name: 'Frequent Headaches', identified: true, points: 2 },
        { id: 'sleep', name: 'Sleep Pattern Changes', identified: false, points: 1 },
        { id: 'appetite', name: 'Appetite Changes', identified: false, points: 1 }
      ],
      diagnosis: {
        primary: 'Stress-related fatigue',
        differential: ['Depression', 'Sleep disorder', 'Nutritional deficiency'],
        studentAnswer: 'Stress-related fatigue',
        correct: true
      },
      treatment: {
        immediate: ['Rest', 'Stress management', 'Regular sleep schedule'],
        longterm: ['Counseling', 'Lifestyle changes', 'Follow-up'],
        studentAnswers: ['Rest', 'Sleep better'],
        partialCredit: 0.4
      }
    };

    const calculateRealScore = () => {
      const symptomScore = medicalCase.symptoms.reduce((acc, symptom) =>
        acc + (symptom.identified ? symptom.points : 0), 0
      );
      const maxSymptomScore = medicalCase.symptoms.reduce((acc, symptom) => acc + symptom.points, 0);
      const diagnosisScore = medicalCase.diagnosis.correct ? 3 : 0;
      const treatmentScore = medicalCase.treatment.partialCredit * 3;

      return ((symptomScore + diagnosisScore + treatmentScore) / (maxSymptomScore + 6)) * 100;
    };

    const afmScore = medicalCase.diagnosis.correct ? 100 : 0; // Binary: either all correct or all wrong
    const realScore = calculateRealScore(); // ~73% - shows partial understanding

    const stepLabels = {
      0: 'Case Overview',
      1: 'Symptom Analysis',
      2: 'Diagnosis Assessment',
      3: 'Treatment Planning',
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
            <Brain className="w-4 h-4" />
            MEDICAL CASE STUDY
          </div>
          <div className="text-2xl md:text-3xl font-bold tracking-tight text-black text-center mb-6">
            Medical Case Study
          </div>
          <p className="text-lg text-black text-center mb-8 font-bold">
            Understand how AFM's binary approach fails in complex assessment scenarios
          </p>

          <div className="space-y-6">
            <div className="border-4 border-blue-600 rounded-xl p-6 bg-blue-50">
              <h3 className="font-bold text-blue-700 text-lg font-mono uppercase mb-3">
                PATIENT PRESENTATION
              </h3>
              <p className="text-black font-mono text-lg">
                {medicalCase.patientInfo}
              </p>
            </div>

            <div className="border-4 border-yellow-600 rounded-xl p-6 bg-yellow-50">
              <h3 className="font-bold text-yellow-700 text-lg font-mono uppercase mb-3">
                YOUR TASK
              </h3>
              <p className="text-black font-mono text-lg">
                As a medical student, you need to: identify symptoms, make a diagnosis, and propose treatment.
                We'll see how AFM evaluates your performance vs. a more nuanced approach.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setSimStep(1)}
            className="px-8 py-4 bg-black text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-black hover:border-black transition-all transform hover:scale-105 font-mono"
          >
            START MEDICAL ASSESSMENT →
          </button>
        </div>
      </div>
    );

    const renderSymptomAnalysis = () => (
      <div className="space-y-6">
        <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative">
          <div className="absolute -top-6 left-4 px-3 py-1 bg-green-600 text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
            <List className="w-4 h-4" />
            STEP 1: SYMPTOM IDENTIFICATION
          </div>
          <div className="text-2xl md:text-3xl font-bold tracking-tight text-black text-center mb-6">
            Step 1: Symptom Identification
          </div>
          <p className="text-lg text-black text-center mb-8 font-bold">
            Student identifies symptoms from patient presentation
          </p>

          <div className="border-4 border-green-600 rounded-xl p-6 bg-green-50">
            <h3 className="font-bold text-green-700 text-lg font-mono uppercase mb-3">
              SYMPTOM CHECKLIST
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {medicalCase.symptoms.map((symptom) => (
                <div key={symptom.id} className="flex items-center justify-between p-3 bg-white border-2 border-green-600 rounded-lg">
                  <span className="font-mono text-black font-bold">{symptom.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 border-2 border-black font-mono font-bold text-xs ${symptom.identified ? 'bg-green-300' : 'bg-red-300'}`}>
                      {symptom.identified ? 'IDENTIFIED' : 'MISSED'}
                    </span>
                    <span className="text-sm font-mono font-bold">({symptom.points} pts)</span>
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
            className="px-6 py-3 bg-black text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-black transition-all transform hover:scale-105 font-mono"
          >
            NEXT: DIAGNOSIS →
          </button>
        </div>
      </div>
    );

    const renderDiagnosisAssessment = () => (
      <div className="space-y-6">
        <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative">
          <div className="absolute -top-6 left-4 px-3 py-1 bg-blue-600 text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
            <Brain className="w-4 h-4" />
            STEP 2: DIAGNOSIS
          </div>
          <div className="text-2xl md:text-3xl font-bold tracking-tight text-black text-center mb-6">
            Step 2: Diagnosis
          </div>
          <p className="text-lg text-black text-center mb-8 font-bold">
            Student makes primary diagnosis and considers differentials
          </p>

          <div className="border-4 border-blue-600 rounded-xl p-6 bg-blue-50">
            <h3 className="font-bold text-blue-700 text-lg font-mono uppercase mb-3">
              DIAGNOSIS ASSESSMENT
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-white border-2 border-blue-600 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-black font-bold">Primary Diagnosis:</span>
                  <span className={`px-2 py-1 border-2 border-black font-mono font-bold text-sm ${medicalCase.diagnosis.correct ? 'bg-green-300' : 'bg-red-300'}`}>
                    {medicalCase.diagnosis.correct ? 'CORRECT' : 'INCORRECT'}
                  </span>
                </div>
                <p className="font-mono text-black">Student Answer: {medicalCase.diagnosis.studentAnswer}</p>
                <p className="font-mono text-black">Correct Answer: {medicalCase.diagnosis.primary}</p>
              </div>
              <div className="p-3 bg-white border-2 border-blue-600 rounded-lg">
                <span className="font-mono text-black font-bold">Differential Diagnoses Considered:</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {medicalCase.diagnosis.differential.map((diff, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-200 border border-black font-mono text-xs">
                      {diff}
                    </span>
                  ))}
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
            NEXT: TREATMENT →
          </button>
        </div>
      </div>
    );

    const renderTreatmentPlanning = () => (
      <div className="space-y-6">
        <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative">
          <div className="absolute -top-6 left-4 px-3 py-1 bg-purple-600 text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
            <Zap className="w-4 h-4" />
            STEP 3: TREATMENT PLANNING
          </div>
          <div className="text-2xl md:text-3xl font-bold tracking-tight text-black text-center mb-6">
            Step 3: Treatment Planning
          </div>
          <p className="text-lg text-black text-center mb-8 font-bold">
            Student proposes treatment plan with partial credit opportunity
          </p>

          <div className="border-4 border-purple-600 rounded-xl p-6 bg-purple-50">
            <h3 className="font-bold text-purple-700 text-lg font-mono uppercase mb-3">
              TREATMENT ASSESSMENT
            </h3>
            <div className="space-y-4">
              <div className="p-3 bg-white border-2 border-purple-600 rounded-lg">
                <span className="font-mono text-black font-bold">Recommended Treatment:</span>
                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-3">
                  {medicalCase.treatment.immediate.concat(medicalCase.treatment.longterm).map((treatment, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-100 border border-gray-400 rounded">
                      <span className="font-mono text-black text-sm">{treatment}</span>
                      <span className={`px-2 py-1 border border-black font-mono font-bold text-xs ${medicalCase.treatment.studentAnswers.includes(treatment) ? 'bg-green-300' : 'bg-red-300'}`}>
                        {medicalCase.treatment.studentAnswers.includes(treatment) ? 'INCLUDED' : 'MISSED'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-3 bg-white border-2 border-purple-600 rounded-lg">
                <span className="font-mono text-black font-bold">Student's Treatment Plan:</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {medicalCase.treatment.studentAnswers.map((answer, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-200 border border-black font-mono text-xs">
                      {answer}
                    </span>
                  ))}
                </div>
                <p className="mt-2 font-mono text-black text-sm">
                  Partial Credit: {(medicalCase.treatment.partialCredit * 100).toFixed(0)}%
                </p>
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
            className="px-6 py-3 bg-green-600 text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-green-600 transition-all transform hover:scale-105 font-mono"
          >
            VIEW RESULTS →
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
            Compare AFM's binary approach vs nuanced evaluation
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
                    Final diagnosis correct → Student gets 100%
                  </p>
                  <p className="text-black font-mono text-sm">
                    Final diagnosis wrong → Student gets 0%
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
                    <li>• Partial symptom identification</li>
                    <li>• Treatment planning skills</li>
                    <li>• Clinical reasoning process</li>
                    <li>• Differential considerations</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-4 border-green-600 rounded-xl p-6 bg-green-50">
              <h3 className="font-bold text-green-700 text-lg font-mono uppercase mb-4 text-center">
                Nuanced Assessment
              </h3>
              <div className="space-y-4">
                <div className="bg-green-100 p-4 border-2 border-green-600">
                  <h4 className="font-bold text-green-700 font-mono mb-2">COMPREHENSIVE LOGIC:</h4>
                  <p className="text-black font-mono text-sm">
                    • Symptom identification: 6/8 points
                  </p>
                  <p className="text-black font-mono text-sm">
                    • Diagnosis accuracy: 3/3 points
                  </p>
                  <p className="text-black font-mono text-sm">
                    • Treatment planning: 1.2/3 points
                  </p>
                </div>

                <div className="bg-white p-4 border-2 border-green-600">
                  <h4 className="font-bold text-black font-mono mb-2">NUANCED SCORE:</h4>
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
                    <li>• Strong diagnostic skills</li>
                    <li>• Good symptom recognition</li>
                    <li>• Needs treatment planning work</li>
                    <li>• Overall solid foundation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative">
          <div className="absolute -top-6 left-4 px-3 py-1 bg-yellow-600 text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            THE PROBLEM WITH BINARY ASSESSMENT
          </div>
          <div className="text-center space-y-4">
            <div className="bg-yellow-300 border-2 border-black px-6 py-4 inline-block">
              <span className="text-black font-bold text-xl font-mono">
                27% DIFFERENCE IN ASSESSMENT
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border-l-4 border-yellow-600 bg-white p-4">
                <h4 className="font-bold text-yellow-700 mb-2 font-mono">LOST INFORMATION</h4>
                <ul className="text-black font-mono text-sm space-y-1">
                  <li>• PARTIAL COMPETENCIES IGNORED</li>
                  <li>• SKILL DEVELOPMENT UNMEASURED</li>
                  <li>• LEARNING GAPS HIDDEN</li>
                  <li>• PROGRESS TRACKING IMPOSSIBLE</li>
                </ul>
              </div>
              <div className="border-l-4 border-yellow-600 bg-white p-4">
                <h4 className="font-bold text-yellow-700 mb-2 font-mono">EDUCATIONAL IMPACT</h4>
                <ul className="text-black font-mono text-sm space-y-1">
                  <li>• STUDENTS RECEIVE POOR FEEDBACK</li>
                  <li>• TEACHERS MISS LEARNING INSIGHTS</li>
                  <li>• ADAPTIVE SYSTEMS FAIL</li>
                  <li>• MOTIVATION DECREASES</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative">
          <div className="absolute -top-6 left-4 px-3 py-1 bg-blue-600 text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            BETTER ASSESSMENT APPROACHES
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'RUBRIC-BASED',
              'MULTI-DIMENSIONAL',
              'COMPETENCY-BASED',
              'PORTFOLIO',
              'AUTHENTIC TASKS',
              'PEER REVIEW',
              'SELF-ASSESSMENT',
              'PROCESS-FOCUSED'
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
      1: renderSymptomAnalysis,
      2: renderDiagnosisAssessment,
      3: renderTreatmentPlanning,
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
    // Language learning scenario showing how context affects performance
    const languageScenario = {
      student: "Maria, learning Spanish vocabulary",
      skill: "Translating common Spanish words to English",
      contexts: [
        {
          id: 'morning-focused',
          name: 'Morning Study Session',
          time: '9:00 AM',
          condition: 'Well-rested, focused, quiet environment',
          performance: { correct: 18, total: 20, percentage: 90 },
          color: 'green'
        },
        {
          id: 'evening-tired',
          name: 'Evening Study Session',
          time: '11:00 PM',
          condition: 'Tired, distracted, noisy environment',
          performance: { correct: 12, total: 20, percentage: 60 },
          color: 'red'
        },
        {
          id: 'group-collaborative',
          name: 'Group Study Session',
          time: '2:00 PM',
          condition: 'Collaborative, social learning, peer support',
          performance: { correct: 16, total: 20, percentage: 80 },
          color: 'blue'
        },
        {
          id: 'test-anxiety',
          name: 'Quiz Environment',
          time: '10:00 AM',
          condition: 'High pressure, timed, formal assessment',
          performance: { correct: 11, total: 20, percentage: 55 },
          color: 'orange'
        },
        {
          id: 'app-gamified',
          name: 'Mobile App Learning',
          time: '7:00 PM',
          condition: 'Gamified, immediate feedback, bite-sized',
          performance: { correct: 17, total: 20, percentage: 85 },
          color: 'purple'
        }
      ]
    };

    const calculateContextAFMPrediction = () => {
      const totalCorrect = languageScenario.contexts.reduce((sum, ctx) => sum + ctx.performance.correct, 0);
      const totalQuestions = languageScenario.contexts.reduce((sum, ctx) => sum + ctx.performance.total, 0);
      return (totalCorrect / totalQuestions) * 100;
    };

    const calculateVariance = () => {
      const performances = languageScenario.contexts.map(ctx => ctx.performance.percentage);
      const mean = performances.reduce((sum, perf) => sum + perf, 0) / performances.length;
      const variance = performances.reduce((sum, perf) => sum + Math.pow(perf - mean, 2), 0) / performances.length;
      return Math.sqrt(variance);
    };

    const afmPrediction = calculateContextAFMPrediction();
    const performanceVariance = calculateVariance();

    const stepLabels = {
      0: 'Context Overview',
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
            <TrendingUp className="w-4 h-4" />
            LANGUAGE LEARNING CONTEXT STUDY
          </div>
          <div className="text-2xl md:text-3xl font-bold tracking-tight text-black text-center mb-6">
            Language Learning Context Study
          </div>
          <p className="text-lg text-black text-center mb-8 font-bold">
            Observe how the same student performs differently across various learning contexts
          </p>

          <div className="space-y-6">
            <div className="border-4 border-blue-600 rounded-xl p-6 bg-blue-50">
              <h3 className="font-bold text-blue-700 text-lg font-mono uppercase mb-3">
                STUDENT PROFILE
              </h3>
              <p className="text-black font-mono text-lg">
                <strong>Student:</strong> {languageScenario.student}
              </p>
              <p className="text-black font-mono text-lg">
                <strong>Skill:</strong> {languageScenario.skill}
              </p>
              <p className="text-black font-mono text-lg">
                <strong>Assessment:</strong> 20 vocabulary words per session
              </p>
            </div>

            <div className="border-4 border-yellow-600 rounded-xl p-6 bg-yellow-50">
              <h3 className="font-bold text-yellow-700 text-lg font-mono uppercase mb-3">
                STUDY QUESTION
              </h3>
              <p className="text-black font-mono text-lg">
                How does learning context affect performance? AFM treats all sessions equally,
                but should context matter for predictions?
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setContextStep(1)}
            className="px-8 py-4 bg-black text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-black hover:border-black transition-all transform hover:scale-105 font-mono"
          >
            ANALYZE PERFORMANCE DATA →
          </button>
        </div>
      </div>
    );

    const renderPerformanceAnalysis = () => (
      <div className="space-y-6">
        <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative">
          <div className="absolute -top-6 left-4 px-3 py-1 bg-purple-600 text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
            <TrendingDown className="w-4 h-4" />
            PERFORMANCE ACROSS DIFFERENT CONTEXTS
          </div>
          <div className="text-2xl md:text-3xl font-bold tracking-tight text-black text-center mb-6">
            Performance Across Different Contexts
          </div>
          <p className="text-lg text-black text-center mb-8 font-bold">
            Same student, same skill, different contexts - notice the variation
          </p>

          <div className="space-y-4">
            {languageScenario.contexts.map((context) => (
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
                      {context.performance.correct}/{context.performance.total} correct
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
            PERFORMANCE VARIANCE
          </div>
          <div className="text-center space-y-4">
            <div className="bg-orange-300 border-2 border-black px-6 py-4 inline-block">
              <span className="text-black font-bold text-xl font-mono">
                {performanceVariance.toFixed(1)}% STANDARD DEVIATION
              </span>
            </div>
            <p className="text-black font-mono text-lg">
              High variance indicates context significantly impacts performance
            </p>
            <div className="text-sm font-mono text-black">
              Range: {Math.min(...languageScenario.contexts.map(c => c.performance.percentage))}% - {Math.max(...languageScenario.contexts.map(c => c.performance.percentage))}%
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
            Compare how different approaches handle context-dependent performance
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
                    All sessions weighted equally regardless of context
                  </p>
                  <p className="text-black font-mono text-sm">
                    Total: {languageScenario.contexts.reduce((sum, ctx) => sum + ctx.performance.correct, 0)}/{languageScenario.contexts.reduce((sum, ctx) => sum + ctx.performance.total, 0)} correct
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
                    <li>• Time of day effects</li>
                    <li>• Emotional state variations</li>
                    <li>• Environmental factors</li>
                    <li>• Learning mode preferences</li>
                    <li>• Social context impacts</li>
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
                    Predict based on upcoming context conditions
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
                      Morning: ~90% | Evening: ~60%
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-4 border-2 border-green-600">
                  <h4 className="font-bold text-green-700 font-mono mb-2">CAPTURED INSIGHTS:</h4>
                  <ul className="text-black font-mono text-sm space-y-1">
                    <li>• Peak performance times</li>
                    <li>• Optimal learning conditions</li>
                    <li>• Environmental sensitivity</li>
                    <li>• Contextual interventions</li>
                    <li>• Personalized scheduling</li>
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
            How ignoring context affects learning systems and outcomes
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-bold text-orange-700 text-lg font-mono uppercase">
                MISSED OPPORTUNITIES
              </h3>
              <div className="space-y-3">
                {[
                  'OPTIMAL LEARNING TIMES',
                  'ENVIRONMENTAL PREFERENCES',
                  'PERSONALIZED SCHEDULING',
                  'CONTEXTUAL INTERVENTIONS',
                  'ADAPTIVE CONTENT DELIVERY'
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
                  'INACCURATE PREDICTIONS',
                  'POOR TIMING OF INTERVENTIONS',
                  'INEFFECTIVE SCHEDULING',
                  'REDUCED PERSONALIZATION',
                  'MISSED OPTIMIZATION OPPORTUNITIES'
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
            CONTEXT-AWARE LEARNING SYSTEMS
          </div>
          <div className="space-y-4">
            <div className="text-center">
              <div className="bg-green-300 border-2 border-black px-6 py-4 inline-block">
                <span className="text-black font-bold text-xl font-mono">
                  BETTER LEARNING OUTCOMES
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                'TIME-AWARE SCHEDULING',
                'ENVIRONMENTAL ADAPTATION',
                'MOOD-BASED CONTENT',
                'SOCIAL CONTEXT INTEGRATION',
                'PERSONALIZED TIMING',
                'CONTEXTUAL FEEDBACK',
                'ADAPTIVE DIFFICULTY',
                'SITUATIONAL SUPPORT'
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
            <Zap className="w-4 h-4" />
            REAL-WORLD APPLICATIONS
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border-2 border-blue-600 bg-blue-50 p-4">
              <h4 className="font-bold text-blue-700 mb-2 font-mono">LANGUAGE LEARNING</h4>
              <p className="text-black font-mono text-sm">
                Schedule practice sessions during peak attention times, adapt to learning environment preferences
              </p>
            </div>
            <div className="border-2 border-blue-600 bg-blue-50 p-4">
              <h4 className="font-bold text-blue-700 mb-2 font-mono">PROGRAMMING EDUCATION</h4>
              <p className="text-black font-mono text-sm">
                Consider debugging vs. coding contexts, collaborative vs. individual learning modes
              </p>
            </div>
            <div className="border-2 border-blue-600 bg-blue-50 p-4">
              <h4 className="font-bold text-blue-700 mb-2 font-mono">MEDICAL TRAINING</h4>
              <p className="text-black font-mono text-sm">
                Account for high-pressure vs. low-pressure learning environments, simulation vs. real-world contexts
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
            Complete all four scenarios below to proceed.
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="border-4 border-black rounded-xl p-4 bg-yellow-400 text-center">
          <span className="text-black font-bold text-xl uppercase tracking-wide">
            {completedScenarios.size} / 4 SCENARIOS COMPLETE
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
                      if (scenario.id === 'binary-skills' || scenario.id === 'context-blind') {
                        alert(`${scenario.title} scenario is currently under development. Please try the other scenarios.`);
                      } else {
                        handleBeginTask(scenario.id);
                      }
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
            scroll(19);
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
  };

  return views[currentView]?.() || renderOverview();
};
