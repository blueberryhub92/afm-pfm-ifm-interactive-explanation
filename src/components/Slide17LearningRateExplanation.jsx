import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Play, Pause, RotateCcw, Brain, Target, TrendingUp, Code, AlertCircle, ArrowRight, Lightbulb, Zap, Clock } from 'lucide-react';

export const Slide17LearningRateExplanation = ({ scroll }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentSimulation, setCurrentSimulation] = useState('learning-rate');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTry, setCurrentTry] = useState(0);
  const [data, setData] = useState([]);

  // Simulation parameters
  const learningRateSimulation = {
    title: "Learning Rate Analysis",
    subtitle: "UNIFORM TASK COMPLEXITY • VARIABLE LEARNING COEFFICIENTS",
    tasks: [
      {
        name: "TASKS WITH FAST LEARNING RATE: STRING FORMATTING",
        difficulty: -0.5,
        learningRate: 0.8,
        color: "#2563eb",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-400",
        textColor: "text-blue-800",
        description: "CLEAR PATTERNS • IMMEDIATE FEEDBACK • RAPID CONVERGENCE"
      },
      {
        name: "TASKS WITH SLOW LEARNING RATE: RECURSIVE FIBONACCI",
        difficulty: -0.5,
        learningRate: 0.2,
        color: "#dc2626",
        bgColor: "bg-red-50",
        borderColor: "border-red-400",
        textColor: "text-red-800",
        description: "ABSTRACT CONCEPTS • DELAYED UNDERSTANDING • GRADUAL PROGRESS"
      }
    ]
  };

  const taskDifficultySimulation = {
    title: "Task Difficulty Analysis",
    subtitle: "UNIFORM LEARNING RATES • VARIABLE TASK COMPLEXITY",
    tasks: [
      {
        name: "EASY TASK: PRINT STATEMENTS",
        difficulty: 0.5,
        learningRate: 0.4,
        color: "#059669",
        bgColor: "bg-emerald-50",
        borderColor: "border-emerald-400",
        textColor: "text-emerald-800",
        description: "SIMPLE SYNTAX • BASIC CONCEPTS • LOW COMPLEXITY"
      },
      {
        name: "HARD TASK: RECURSIVE FUNCTIONS",
        difficulty: -1.0,
        learningRate: 0.4,
        color: "#7c2d12",
        bgColor: "bg-orange-50",
        borderColor: "border-orange-400",
        textColor: "text-orange-800",
        description: "COMPLEX LOGIC • ADVANCED CONCEPTS • HIGH COMPLEXITY"
      }
    ]
  };

  const currentSim = currentSimulation === 'learning-rate' ? learningRateSimulation : taskDifficultySimulation;
  const studentAbility = 0.3;

  // AFM Formula: P(success) = θ_i + β_k + γ_k * T_ik
  const calculateSuccessProbability = (task, tryNumber) => {
    const logit = studentAbility + task.difficulty + (task.learningRate * tryNumber);
    return 1 / (1 + Math.exp(-logit));
  };

  const generateData = () => {
    const newData = [];
    const maxTries = 10;

    for (let tryNum = 0; tryNum <= maxTries; tryNum++) {
      const dataPoint = { try: tryNum };

      currentSim.tasks.forEach((task, index) => {
        const probability = calculateSuccessProbability(task, tryNum);
        dataPoint[`task${index}`] = Math.round(probability * 100);
      });

      newData.push(dataPoint);
    }

    return newData;
  };

  const reset = () => {
    setIsPlaying(false);
    setCurrentTry(0);
    setData([]);
  };

  const step = () => {
    if (currentTry < 10) {
      const newTry = currentTry + 1;
      setCurrentTry(newTry);

      const newData = generateData().slice(0, newTry + 1);
      setData(newData);
    }
  };

  useEffect(() => {
    if (isPlaying && currentTry < 10) {
      const timer = setTimeout(step, 800);
      return () => clearTimeout(timer);
    } else if (currentTry >= 10) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentTry]);

  useEffect(() => {
    reset();
  }, [currentSimulation]);

  const getCurrentTaskExample = () => {
    if (currentSimulation === 'learning-rate') {
      return {
        0: {
          code: `# ITERATION ${currentTry}: STRING FORMATTING
def format_user_intro(user):
    # Create formatted introduction
    # Input: user = {"name": "Alice", "age": 25, "city": "New York"}
    # Output: "Hi, I'm Alice, 25 years old, from New York!"
    return f"Hi, I'm {user['name']}, {user['age']} years old, from {user['city']}!"`,
          result: currentTry >= 2 ? "SUCCESS: STRING FORMATTED" : "ERROR: SYNTAX FAILURE"
        },
        1: {
          code: `# ITERATION ${currentTry}: RECURSIVE FIBONACCI
def fibonacci(n):
    # Calculate nth Fibonacci number recursively
    # fibonacci(0) = 0, fibonacci(1) = 1
    # fibonacci(n) = fibonacci(n-1) + fibonacci(n-2)
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)`,
          result: currentTry >= 6 ? "SUCCESS: RECURSIVE SOLUTION" : "ERROR: LOGIC INCOMPLETE"
        }
      };
    } else {
      return {
        0: {
          code: `# ITERATION ${currentTry}: SIMPLE PRINT
message = "Hello, World!"
print(message)`,
          result: currentTry >= 1 ? "SUCCESS: OUTPUT GENERATED" : "ERROR: MINOR SYNTAX"
        },
        1: {
          code: `# ITERATION ${currentTry}: RECURSIVE COMPLEXITY
def hanoi(n, source, destination, auxiliary):
    if n == 1:
        print(f"Move disk 1 from {source} to {destination}")
    else:
        hanoi(n-1, source, auxiliary, destination)
        print(f"Move disk {n} from {source} to {destination}")
        hanoi(n-1, auxiliary, destination, source)`,
          result: currentTry >= 7 ? "SUCCESS: PATTERN MASTERED" : "ERROR: PATTERN INCOMPLETE"
        }
      };
    }
  };

  const taskExamples = getCurrentTaskExample();
  const currentProb = currentTry > 0 ? data[currentTry - 1] : { task0: 0, task1: 0 };

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

  const renderStepOne = () => (
    <div className="space-y-6">
      <div className="border-l-8 border-blue-600 bg-blue-100 p-6 rounded-r-xl">
        <p className="text-black text-xl font-bold leading-relaxed">
          You correctly identified that <strong>Task A (String Formatting)</strong> has a much faster learning rate than <strong>Task B (Recursive Fibonacci)</strong>. Let's explore why based on these specific examples.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fast Learning Rate - Task A */}
        <div className="border-4 border-green-600 rounded-xl p-6 bg-green-50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-600 text-white rounded-lg flex items-center justify-center text-2xl font-black border-2 border-black">
              A
            </div>
            <div>
              <h3 className="text-xl font-bold text-green-700 uppercase tracking-wide">String Formatting</h3>
              <div className="text-sm text-green-600">FAST LEARNING RATE</div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="bg-green-100 border-2 border-green-600 rounded-lg p-3">
              <div className="font-bold text-green-800 text-sm flex items-center gap-2">
                <Target className="w-4 h-4" />
                Immediate Visual Feedback
              </div>
              <div className="text-green-900 text-xs mt-1">When you format strings, you can instantly see if your output matches the expected format - clear success/failure indicators</div>
            </div>
            <div className="bg-green-100 border-2 border-green-600 rounded-lg p-3">
              <div className="font-bold text-green-800 text-sm flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                Clear Patterns & Build-up
              </div>
              <div className="text-green-900 text-xs mt-1">F-string syntax follows predictable patterns - once you learn the basic format, you can quickly apply it to different scenarios</div>
            </div>
          </div>
        </div>

        {/* Slow Learning Rate - Task B */}
        <div className="border-4 border-purple-600 rounded-xl p-6 bg-purple-50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-purple-600 text-white rounded-lg flex items-center justify-center text-2xl font-black border-2 border-black">
              B
            </div>
            <div>
              <h3 className="text-xl font-bold text-purple-700 uppercase tracking-wide">Recursive Fibonacci</h3>
              <div className="text-sm text-purple-600">SLOW LEARNING RATE</div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="bg-purple-100 border-2 border-purple-600 rounded-lg p-3">
              <div className="font-bold text-purple-800 text-sm flex items-center gap-2">
                <Brain className="w-4 h-4" />
                Abstract Mental Models
              </div>
              <div className="text-purple-900 text-xs mt-1">Understanding recursion requires grasping abstract concepts like function calls within functions and base cases</div>
            </div>
            <div className="bg-purple-100 border-2 border-purple-600 rounded-lg p-3">
              <div className="font-bold text-purple-800 text-sm flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Delayed Understanding
              </div>
              <div className="text-purple-900 text-xs mt-1">The "aha!" moment comes slowly - you need to understand how recursion builds up and breaks down problems before mastery clicks</div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-4 border-blue-600 rounded-xl p-6 bg-blue-50">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="w-8 h-8 text-blue-600" />
          <h3 className="text-xl font-bold text-blue-700 uppercase tracking-wide">Learning Rate Explained</h3>
        </div>
        <p className="text-black text-lg font-bold leading-relaxed mb-4">
          <span className="bg-blue-200 px-2 py-1 border-2 border-blue-600 rounded text-blue-800 font-bold">
            Learning Rate
          </span>
          {' '}measures how quickly someone improves with practice. High learning rate = rapid improvement per practice session. Low learning rate = gradual, slow improvement even with practice.
        </p>
      </div>

      <div className="border-4 border-yellow-600 rounded-xl p-6 bg-yellow-50">
        <div className="flex items-center gap-3 mb-4">
          <Target className="w-8 h-8 text-yellow-600" />
          <h3 className="text-xl font-bold text-yellow-700 uppercase tracking-wide">Critical Distinction</h3>
        </div>
        <p className="text-black text-lg font-bold leading-relaxed mb-4">
          <span className="bg-yellow-200 px-2 py-1 border-2 border-yellow-600 rounded text-yellow-800 font-bold">
            Learning Rate ≠ Task Difficulty
          </span>
          . A task can have fast learning rate but still be highly difficult overall.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="bg-green-100 border-2 border-green-600 rounded-lg p-3">
            <div className="font-bold text-green-800 text-sm flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Learning Rate
            </div>
            <div className="text-green-900 text-xs mt-1">Speed of progress per practice session - how quickly you improve with each attempt</div>
          </div>
          <div className="bg-red-100 border-2 border-red-600 rounded-lg p-3">
            <div className="font-bold text-red-800 text-sm flex items-center gap-2">
              <Target className="w-4 h-4" />
              Task Difficulty
            </div>
            <div className="text-red-900 text-xs mt-1">Inherent conceptual difficulty - how hard the skill is to learn in the first place</div>
          </div>
        </div>
      </div>

      <div className="border-4 border-purple-600 rounded-xl p-6 bg-purple-50">
        <div className="flex items-center gap-3 mb-4">
          <Brain className="w-8 h-8 text-purple-600" />
          <h3 className="text-xl font-bold text-purple-700 uppercase tracking-wide">Next: Interactive Simulation</h3>
        </div>
        <p className="text-black text-lg font-bold leading-relaxed">
          In the next section, you'll simulate different effects of learning rate and task difficulty on success probability. You'll see how these two parameters affect the AFM formula differently.
        </p>
      </div>
    </div>
  );

  const renderStepTwo = () => (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg">
        <p className="text-lg text-black leading-relaxed text-center">
          <strong>Learning Rate vs Task Difficulty:</strong> Toggle the demos to see what effect learning rate and task difficulty have on AFM.
        </p>
      </div>

      {/* Simulation Selector */}
      <div className="flex justify-center">
        <div className="bg-white border-4 border-black rounded-xl p-2 flex font-mono shadow-lg">
          <button
            onClick={() => setCurrentSimulation('learning-rate')}
            className={`px-6 py-3 border-4 border-black rounded-lg font-bold transition-all tracking-wider text-sm ${currentSimulation === 'learning-rate'
              ? 'bg-purple-600 text-white'
              : 'text-black bg-white hover:bg-gray-100'
              }`}
          >
            LEARNING RATE DEMO
          </button>
          <button
            onClick={() => setCurrentSimulation('task-difficulty')}
            className={`px-6 py-3 border-4 border-black rounded-lg font-bold transition-all tracking-wider text-sm ml-2 ${currentSimulation === 'task-difficulty'
              ? 'bg-purple-600 text-white'
              : 'text-black bg-white hover:bg-gray-100'
              }`}
          >
            TASK DIFFICULTY DEMO
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Graph - Main Area */}
        <div className="col-span-1 lg:col-span-2">
          <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-blue-700" />
              <h3 className="text-xl font-bold text-black uppercase tracking-wide">
                Success Probability Analysis
              </h3>
            </div>

            <div className="bg-gray-50 border-4 border-black rounded-lg p-4 h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
                  <XAxis
                    dataKey="try"
                    label={{ value: 'PRACTICE ATTEMPTS', position: 'insideBottom', offset: -5 }}
                    tick={{ fontSize: 12, fontFamily: 'IBM Plex Mono' }}
                  />
                  <YAxis
                    label={{ value: 'SUCCESS PROBABILITY (%)', angle: -90, position: 'insideLeft' }}
                    tick={{ fontSize: 12, fontFamily: 'IBM Plex Mono' }}
                  />
                  <Tooltip
                    labelStyle={{ fontFamily: 'IBM Plex Mono', fontSize: '12px' }}
                    contentStyle={{ fontFamily: 'IBM Plex Mono', fontSize: '12px', backgroundColor: '#f8f9fa', border: '2px solid #000' }}
                  />
                  <Legend wrapperStyle={{ fontFamily: 'IBM Plex Mono', fontSize: '12px' }} />
                  {currentSim.tasks.map((task, index) => (
                    <Line
                      key={index}
                      type="monotone"
                      dataKey={`task${index}`}
                      stroke={task.color}
                      strokeWidth={4}
                      dot={{ fill: task.color, strokeWidth: 2, r: 5 }}
                      name={task.name}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Controls - Right Side */}
        <div className="col-span-1">
          <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <Play className="w-6 h-6 text-green-700" />
              <h3 className="text-xl font-bold text-black uppercase tracking-wide">
                Simulation Controls
              </h3>
            </div>

            <div className="space-y-6">
              {/* AFM Formula Display */}
              <div className="bg-gray-50 border-4 border-black rounded-lg p-4 font-mono text-center">
                <div className="text-sm mb-2 font-bold">AFM FORMULA:</div>
                <div className="text-lg font-bold mb-2">P(success) = θᵢ + βₖ + γₖ × T</div>
                <div className="text-sm">
                  <div>STUDENT ABILITY: {studentAbility}</div>
                  <div>ITERATION: {currentTry}</div>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="space-y-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  disabled={currentTry >= 10}
                  className={`w-full px-4 py-3 border-4 border-black rounded-xl font-bold text-sm tracking-wider transition-all ${isPlaying
                    ? 'bg-red-600 text-white hover:bg-white hover:text-red-600'
                    : 'bg-green-600 text-white hover:bg-white hover:text-green-600'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isPlaying ? 'PAUSE' : 'START'} SIMULATION
                </button>

                <button
                  onClick={step}
                  disabled={isPlaying || currentTry >= 10}
                  className="w-full px-4 py-3 bg-blue-600 text-white border-4 border-black rounded-xl font-bold text-sm tracking-wider transition-all hover:bg-white hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  STEP FORWARD
                </button>

                <button
                  onClick={reset}
                  className="w-full px-4 py-3 bg-gray-600 text-white border-4 border-black rounded-xl font-bold text-sm tracking-wider transition-all hover:bg-white hover:text-gray-600 flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  RESET
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Code Analysis Section */}
      <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <Code className="w-6 h-6 text-purple-700" />
          <h3 className="text-xl font-bold text-black uppercase tracking-wide">
            Live Code Analysis
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {currentSim.tasks.map((task, index) => (
            <div key={index} className={`border-4 ${task.borderColor} ${task.bgColor} rounded-xl p-6`}>
              <div className="flex items-center justify-between mb-4">
                <h4 className={`font-bold ${task.textColor} text-sm tracking-wider`}>{task.name}</h4>
                <span className="text-xs text-gray-600 font-mono">ITERATION-{currentTry}</span>
              </div>

              {/* Task Parameters */}
              <div className="mb-4 p-4 bg-white border-4 border-black rounded-lg">
                <div className="grid grid-cols-2 gap-2 text-sm font-mono font-bold">
                  <div>DIFFICULTY (β): {task.difficulty}</div>
                  <div>LEARNING RATE (γ): {task.learningRate}</div>
                </div>
                <div className="border-t-2 border-black pt-2 mt-2">
                  <div className={`text-sm font-bold ${task.textColor}`}>
                    SUCCESS RATE: {currentProb[`task${index}`] || 0}%
                  </div>
                </div>
              </div>

              {/* Task Description */}
              <div className={`p-3 mb-4 text-sm ${task.textColor} border-4 border-black rounded-lg font-bold`}>
                {task.description}
              </div>

              {/* Code Example */}
              <div className="bg-black text-green-400 p-4 font-mono text-sm mb-4 rounded-lg border-4 border-gray-600">
                <pre>{taskExamples[index]?.code}</pre>
              </div>

              {/* Result */}
              <div className={`p-3 border-4 text-sm font-mono font-bold rounded-lg ${taskExamples[index]?.result?.includes('SUCCESS')
                ? 'bg-green-100 text-green-800 border-green-600'
                : 'bg-red-100 text-red-800 border-red-600'
                }`}>
                {taskExamples[index]?.result}
              </div>
            </div>
          ))}
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
            {currentStep === 0 ? "Why Learning Rates Differ" : "AFM Parameter Comparison"}
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
                    className={`w-4 h-4 rounded-full border-2 border-black ${index <= currentStep ? 'bg-purple-600' : 'bg-gray-200'
                      }`}
                  />
                  {index < 1 && (
                    <div className={`w-12 h-1 border-t-2 border-black ${index < currentStep ? 'bg-purple-600' : 'bg-gray-200'
                      }`} />
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
                onClick={() => scroll(16)}
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