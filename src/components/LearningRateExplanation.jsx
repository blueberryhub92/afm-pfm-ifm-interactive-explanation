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
  const [step1bData, setStep1bData] = useState([]);
  const [currentTry1b, setCurrentTry1b] = useState(0);
  const [isPlaying1b, setIsPlaying1b] = useState(false);
  const [selectedExamples, setSelectedExamples] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [demoMode, setDemoMode] = useState(null); // null, "same-lr", "same-difficulty"

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
      codeExample: `name = "Alice"
age = 25
greeting = f"Hello {name}, you are {age} years old!"
print(greeting)`,
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
      codeExample: `def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

result = factorial(5)  # Returns 120`,
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
      codeExample: `numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
# Get squares of even numbers only
squares = [x**2 for x in numbers if x % 2 == 0]
print(squares)  # [4, 16, 36, 64, 100]`,
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
      codeExample: `import time

def timing_decorator(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} took {end-start:.4f}s")
        return result
    return wrapper

@timing_decorator
def slow_function():
    time.sleep(0.1)
    return "Done"`,
    },
    {
      id: "basic-functions",
      name: "BASIC FUNCTIONS",
      shortName: "Basic Functions",
      difficulty: 0.5,
      learningRate: 0.5,
      color: "#10b981",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-400",
      textColor: "text-emerald-800",
      description: "Straightforward concepts, quick learning, simple logic",
      label: "High LR + Low Difficulty",
      codeExample: `def add(a, b):
    return a + b

def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

result = add(3, 5)  # 8
message = greet("Alice")  # "Hello, Alice!"`,
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
      codeExample: `for i in range(1, 11):
    if i == 5:
        continue  # Skip 5
    print(i)
# Output: 1, 2, 3, 4, 6, 7, 8, 9, 10

# Alternative with while loop
count = 0
while count < 10:
    count += 1
    if count != 5:
        print(count)`,
    },
    {
      id: "classes-oop",
      name: "CLASSES & OOP",
      shortName: "Classes & OOP",
      difficulty: -0.5,
      learningRate: 0.5,
      color: "#3b82f6",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-400",
      textColor: "text-blue-800",
      description: "Object-oriented, moderate complexity, steady learning",
      label: "Medium LR + Medium Difficulty",
      codeExample: `class Car:
    def __init__(self, brand, model):
        self.brand = brand
        self.model = model
        self.engine_running = False
    
    def start_engine(self):
        self.engine_running = True
        print(f"{self.brand} {self.model} engine started!")
    
    def stop_engine(self):
        self.engine_running = False
        print(f"{self.brand} {self.model} engine stopped!")

my_car = Car("Toyota", "Camry")
my_car.start_engine()`,
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
      codeExample: `import asyncio
import aiohttp

async def fetch_data(url):
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            return await response.json()

async def fetch_all_data():
    urls = ["api1.com", "api2.com", "api3.com"]
    # Fetch all APIs concurrently
    tasks = [fetch_data(url) for url in urls]
    results = await asyncio.gather(*tasks)
    return {f"api_{i}": data for i, data in enumerate(results)}

# Run the async function
data = asyncio.run(fetch_all_data())`,
    },
    // Generic examples for extreme cases
    {
      id: "variable-assignment",
      name: "VARIABLE ASSIGNMENT",
      shortName: "Variable Assignment",
      difficulty: 0.8,
      learningRate: 0.1,
      color: "#8b5cf6",
      bgColor: "bg-violet-50",
      borderColor: "border-violet-400",
      textColor: "text-violet-800",
      description:
        "Simple concept but requires lots of repetition to become fluent",
      label: "Low LR + Low Difficulty",
      codeExample: `# Variable assignment - easy to understand, needs practice for fluency
name = "Alice"
age = 25
is_student = True
counter = counter + 1  # increment
greeting = f"Hello {name}"`,
    },
    {
      id: "regex-patterns",
      name: "REGEX PATTERNS",
      shortName: "Regex Patterns",
      difficulty: -1.3,
      learningRate: 0.9,
      color: "#f97316",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-400",
      textColor: "text-orange-800",
      description:
        "Complex initially, but rapid improvement once breakthrough happens",
      label: "High LR + High Difficulty",
      codeExample: `import re

# Email validation - complex initially
email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
is_valid = re.match(email_pattern, "user@example.com")

# Once understood, new patterns become intuitive
phone_pattern = r'(\d{3})-(\d{3})-(\d{4})'
date_pattern = r'(\d{1,2})/(\d{1,2})/(\d{4})'`,
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

  const resetStep1b = () => {
    setIsPlaying1b(false);
    setCurrentTry1b(0);
    setStep1bData([]);
  };

  const stepForward = () => {
    if (currentTry < 10) {
      const newTry = currentTry + 1;
      setCurrentTry(newTry);

      if (currentStep === 0) {
        // Step 1: Basic Functions vs Classes & OOP (same learning rate, different difficulty)
        const examples = [
          availableExamples.find((e) => e.id === "basic-functions"),
          availableExamples.find((e) => e.id === "classes-oop"),
        ];
        const newData = generateDataForExamples(examples, newTry);
        setStep1Data(newData);
      }
    }
  };

  const stepForward1b = () => {
    if (currentTry1b < 10) {
      const newTry = currentTry1b + 1;
      setCurrentTry1b(newTry);

      // Step 1b: String Formatting vs Variable Assignment (same difficulty, very different learning rate)
      const stringFormatting = availableExamples.find(
        (e) => e.id === "string-formatting"
      );
      const variableAssignment = {
        ...availableExamples.find((e) => e.id === "variable-assignment"),
        difficulty: 0.5, // Adjust to match string-formatting's difficulty for fair comparison
      };
      const examples = [stringFormatting, variableAssignment];
      const newData = generateDataForExamples(examples, newTry);
      setStep1bData(newData);
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
    if (isPlaying1b && currentTry1b < 10) {
      const timer = setTimeout(stepForward1b, 800);
      return () => clearTimeout(timer);
    } else if (currentTry1b >= 10) {
      setIsPlaying1b(false);
    }
  }, [isPlaying1b, currentTry1b]);

  useEffect(() => {
    if (currentStep === 0) {
      resetStep1();
      resetStep1b();
      setDemoMode(null);
    }
  }, [currentStep]);

  const startDemo = (mode) => {
    setDemoMode(mode);
    if (mode === "same-lr") {
      resetStep1();
    } else if (mode === "same-difficulty") {
      resetStep1b();
    }
  };

  const switchDemoMode = () => {
    if (demoMode === "same-lr") {
      setDemoMode("same-difficulty");
      resetStep1b();
    } else {
      setDemoMode("same-lr");
      resetStep1();
    }
  };

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
    if (draggedItem) {
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
    const basicFunctions = availableExamples.find(
      (e) => e.id === "basic-functions"
    );
    const classesOOP = availableExamples.find((e) => e.id === "classes-oop");

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
                <strong>Example:</strong> Basic Functions have a moderate
                learning rate - once you understand function definitions and
                parameters, each practice attempt builds on the previous
                knowledge consistently.
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
                <strong>Example:</strong> Classes & OOP are conceptually more
                challenging initially - they require understanding abstract
                concepts like objects, methods, inheritance, and encapsulation
                before you can effectively practice them.
              </div>
            </div>
          </div>
          <div className="mt-4 bg-yellow-100 border-2 border-yellow-600 rounded-lg p-4">
            <div className="font-bold text-yellow-800 text-base mb-2 flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              Why Same Learning Rate but Different Difficulty?
            </div>
            <p className="text-yellow-900 text-sm">
              <strong>
                Both Basic Functions and Classes & OOP have identical Learning
                Rate (γ = 0.5)
              </strong>{" "}
              because once you grasp the core concept in either area, you
              progress at a similar steady pace with practice. However,{" "}
              <strong>Classes & OOP start harder (β = -0.5 vs β = 0.5)</strong>{" "}
              because they require understanding multiple interconnected
              concepts (objects, methods, inheritance) before you can even begin
              practicing effectively, while Basic Functions are more
              straightforward from the start.
            </p>
          </div>

          {/* Start Demo Button */}
          {!demoMode && (
            <div className="flex justify-center">
              <button
                onClick={() => startDemo("same-lr")}
                className="px-8 py-4 bg-purple-600 text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-purple-600 transition-all transform hover:scale-105 flex items-center gap-3"
              >
                <Play className="w-6 h-6" />
                <span>Watch this behaviour live</span>
              </button>
            </div>
          )}
        </div>

        {/* Visual Learning Curve Demo */}
        {demoMode === "same-lr" && (
          <div className="border-4 border-blue-600 rounded-xl p-6 bg-blue-50">
            <div className="flex items-center gap-3 mb-4">
              <Code className="w-8 h-8 text-blue-600" />
              <h3 className="text-xl font-bold text-blue-700 uppercase tracking-wide">
                Same Learning Rate, Different Difficulty
              </h3>
            </div>
            <p className="text-blue-900 text-sm font-bold mb-4">
              Watch how <strong>Basic Functions</strong> (Easy + Same LR)
              compares to <strong>Classes & OOP</strong> (Harder + Same LR).
              Both have identical Learning Rate (γ = 0.5), but different Skill
              Difficulty!
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
                        <div>FIXED STUDENT ABILITY: {studentAbility}</div>
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
                      className={`border-2 ${basicFunctions.borderColor} ${basicFunctions.bgColor} rounded-lg p-3`}
                    >
                      <div
                        className={`font-bold ${basicFunctions.textColor} text-xs mb-2`}
                      >
                        {basicFunctions.shortName}
                      </div>
                      <div className="text-xs space-y-1">
                        <div>β: {basicFunctions.difficulty} (Easy)</div>
                        <div>γ: {basicFunctions.learningRate} (Same)</div>
                      </div>
                    </div>
                    <div
                      className={`border-2 ${classesOOP.borderColor} ${classesOOP.bgColor} rounded-lg p-3`}
                    >
                      <div
                        className={`font-bold ${classesOOP.textColor} text-xs mb-2`}
                      >
                        {classesOOP.shortName}
                      </div>
                      <div className="text-xs space-y-1">
                        <div>β: {classesOOP.difficulty} (Harder)</div>
                        <div>γ: {classesOOP.learningRate} (Same)</div>
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
                          dataKey="basic-functions"
                          stroke={basicFunctions.color}
                          strokeWidth={5}
                          dot={{
                            fill: basicFunctions.color,
                            strokeWidth: 3,
                            r: 6,
                          }}
                          name={basicFunctions.shortName}
                        />
                        <Line
                          type="monotone"
                          dataKey="classes-oop"
                          stroke={classesOOP.color}
                          strokeWidth={5}
                          dot={{ fill: classesOOP.color, strokeWidth: 3, r: 6 }}
                          name={classesOOP.shortName}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 bg-blue-100 border-2 border-blue-700 rounded-lg p-3">
              <p className="text-blue-900 text-sm font-bold">
                <strong>Key Insight:</strong> Both examples have the{" "}
                <strong>same Learning Rate (γ = 0.5)</strong> - notice how the
                curves have identical slopes! The difference is the{" "}
                <strong>starting point</strong>: Skill Difficulty (β) determines
                where you begin, while Learning Rate determines how quickly you
                improve.
              </p>
            </div>

            {/* Toggle to other demo */}
            <div className="flex justify-center mt-6">
              <button
                onClick={switchDemoMode}
                className="px-6 py-3 bg-orange-600 text-white border-4 border-black rounded-xl font-bold text-base uppercase tracking-wide hover:bg-white hover:text-orange-600 transition-all transform hover:scale-105 flex items-center gap-3"
              >
                <Zap className="w-5 h-5" />
                <span>
                  What about Same Difficulty, but Different Learning Rate?
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Second Visual Learning Curve Demo - Same Difficulty, Different Learning Rate */}
        {demoMode === "same-difficulty" && (
          <div className="border-4 border-orange-600 rounded-xl p-6 bg-orange-50">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-8 h-8 text-orange-600" />
              <h3 className="text-xl font-bold text-orange-700 uppercase tracking-wide">
                Same Difficulty, Different Learning Rate
              </h3>
            </div>
            <p className="text-orange-900 text-sm font-bold mb-4">
              Now watch how <strong>String Formatting</strong> (Same Difficulty
              + High LR = 0.8) compares to <strong>Variable Assignment</strong>{" "}
              (Same Difficulty + Very Low LR = 0.1). Both have identical Skill
              Difficulty (β = 0.5), but vastly different Learning Rates -
              creating a dramatic visual difference!
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
                        <div>FIXED STUDENT ABILITY: {studentAbility}</div>
                        <div>ITERATION: {currentTry1b}</div>
                      </div>
                    </div>

                    <button
                      onClick={() => setIsPlaying1b(!isPlaying1b)}
                      disabled={currentTry1b >= 10}
                      className={`w-full px-4 py-3 border-4 border-black rounded-xl font-bold text-sm tracking-wider transition-all ${
                        isPlaying1b
                          ? "bg-red-600 text-white hover:bg-white hover:text-red-600"
                          : "bg-green-600 text-white hover:bg-white hover:text-green-600"
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {isPlaying1b ? "PAUSE" : "START"} SIMULATION
                    </button>

                    <button
                      onClick={stepForward1b}
                      disabled={isPlaying1b || currentTry1b >= 10}
                      className="w-full px-4 py-3 bg-blue-600 text-white border-4 border-black rounded-xl font-bold text-sm tracking-wider transition-all hover:bg-white hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      STEP FORWARD
                    </button>

                    <button
                      onClick={resetStep1b}
                      className="w-full px-4 py-3 bg-gray-600 text-white border-4 border-black rounded-xl font-bold text-sm tracking-wider transition-all hover:bg-white hover:text-gray-600 flex items-center justify-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      RESET
                    </button>
                  </div>

                  {/* Parameter Display */}
                  <div className="mt-4 space-y-2">
                    <div
                      className={`border-2 ${
                        availableExamples.find(
                          (e) => e.id === "string-formatting"
                        ).borderColor
                      } ${
                        availableExamples.find(
                          (e) => e.id === "string-formatting"
                        ).bgColor
                      } rounded-lg p-3`}
                    >
                      <div
                        className={`font-bold ${
                          availableExamples.find(
                            (e) => e.id === "string-formatting"
                          ).textColor
                        } text-xs mb-2`}
                      >
                        String Formatting
                      </div>
                      <div className="text-xs space-y-1">
                        <div>β: 0.5 (Same)</div>
                        <div>γ: 0.8 (High LR)</div>
                      </div>
                    </div>
                    <div
                      className={`border-2 ${
                        availableExamples.find(
                          (e) => e.id === "variable-assignment"
                        ).borderColor
                      } ${
                        availableExamples.find(
                          (e) => e.id === "variable-assignment"
                        ).bgColor
                      } rounded-lg p-3`}
                    >
                      <div
                        className={`font-bold ${
                          availableExamples.find(
                            (e) => e.id === "variable-assignment"
                          ).textColor
                        } text-xs mb-2`}
                      >
                        Variable Assignment
                      </div>
                      <div className="text-xs space-y-1">
                        <div>β: 0.5 (Same)</div>
                        <div>γ: 0.1 (Very Low LR)</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Graph */}
              <div className="col-span-1 lg:col-span-2">
                <div className="border-4 border-black rounded-xl p-6 bg-white shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <TrendingUp className="w-6 h-6 text-orange-700" />
                    <h3 className="text-lg font-bold text-black uppercase tracking-wide">
                      Success Probability Over Time
                    </h3>
                  </div>

                  <div className="bg-gray-50 border-4 border-black rounded-lg p-4 h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={step1bData}
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
                          stroke={
                            availableExamples.find(
                              (e) => e.id === "string-formatting"
                            ).color
                          }
                          strokeWidth={5}
                          dot={{
                            fill: availableExamples.find(
                              (e) => e.id === "string-formatting"
                            ).color,
                            strokeWidth: 3,
                            r: 6,
                          }}
                          name="String Formatting (γ=0.8)"
                        />
                        <Line
                          type="monotone"
                          dataKey="variable-assignment"
                          stroke={
                            availableExamples.find(
                              (e) => e.id === "variable-assignment"
                            ).color
                          }
                          strokeWidth={5}
                          dot={{
                            fill: availableExamples.find(
                              (e) => e.id === "variable-assignment"
                            ).color,
                            strokeWidth: 3,
                            r: 6,
                          }}
                          name="Variable Assignment (γ=0.1)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 bg-orange-100 border-2 border-orange-700 rounded-lg p-3">
              <p className="text-orange-900 text-sm font-bold">
                <strong>Key Insight:</strong> Both examples have the{" "}
                <strong>same Skill Difficulty (β = 0.5)</strong> - notice how
                they start at the same point! The dramatic difference is the{" "}
                <strong>learning speed (slope)</strong>: Learning Rate (γ)
                determines how steep the curve is. String Formatting (γ = 0.8)
                has a very steep slope showing rapid improvement, while Variable
                Assignment (γ = 0.1) has a very shallow slope showing very slow
                progress per practice attempt - despite starting at the same
                difficulty level!
              </p>
            </div>

            {/* Toggle to other demo */}
            <div className="flex justify-center mt-6">
              <button
                onClick={switchDemoMode}
                className="px-6 py-3 bg-blue-600 text-white border-4 border-black rounded-xl font-bold text-base uppercase tracking-wide hover:bg-white hover:text-blue-600 transition-all transform hover:scale-105 flex items-center gap-3"
              >
                <Code className="w-5 h-5" />
                <span>
                  What about Same Learning Rate, but Different Difficulty?
                </span>
              </button>
            </div>
          </div>
        )}

        {demoMode && (
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
              into the graph to see how various combinations of Learning Rate
              and Skill Difficulty create different learning trajectories.
            </p>
          </div>
        )}
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
          You can compare as many examples as you want simultaneously in
          real-time!
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
                  ACTIVE COMPARISONS ({selectedExamples.length})
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
                    <div className="mb-3">
                      <div className="text-xs font-bold text-gray-800 mb-2">
                        Code Example:
                      </div>
                      <div className="bg-gray-900 rounded-lg p-3 overflow-x-auto">
                        <pre className="text-xs text-green-400 font-mono whitespace-pre-wrap">
                          <code>{example.codeExample}</code>
                        </pre>
                      </div>
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
