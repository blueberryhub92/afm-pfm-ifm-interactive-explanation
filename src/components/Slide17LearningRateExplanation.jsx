import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Play, Pause, RotateCcw, Brain, Target, Zap, Code, TrendingUp, AlertCircle, ArrowRight } from 'lucide-react';

const Layout = ({ children }) => (
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

const TechnicalCard = ({ title, children, icon: Icon, config, isMain = false, className = "", onClick }) => {
  const cardClass = isMain 
    ? "bg-black text-white border-3 border-black" 
    : "bg-white text-black border-2 border-black";

  return (
    <div className={`${cardClass} p-6 relative ${className}`} onClick={onClick}>
      {/* Technical drawing corner marker */}
      <div 
        className={`absolute top-2 right-2 w-2 h-2 border ${isMain ? 'border-white bg-black' : 'border-black bg-white'}`}
      />
      
      {/* Dimension lines for main card */}
      {isMain && (
        <>
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <span className="bg-black text-white px-3 py-1 text-xs font-mono tracking-wider border border-white">
              FEATURED SIMULATION
            </span>
          </div>
          <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 rotate-90">
            <div className="w-4 h-px bg-black"></div>
          </div>
        </>
      )}
      
      <div className="h-full flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-8 h-8 border ${isMain ? 'border-white' : 'border-black'} flex items-center justify-center ${isMain ? 'bg-black' : 'bg-white'}`}>
            <Icon className={`w-4 h-4 ${isMain ? 'text-white' : 'text-black'}`} />
          </div>
          <span className={`text-xs font-mono ${isMain ? 'text-gray-300' : 'text-gray-600'}`}>
            {config}
          </span>
        </div>
        
        <div>
          <h3 className={`text-lg font-bold ${isMain ? 'text-white' : 'text-black'} tracking-wider uppercase mb-4`}>
            {title}
          </h3>
          
          <div className={`${isMain ? 'text-white' : 'text-black'} text-sm font-mono`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Slide17LearningRateExplanation = ({scroll}) => {
  const [currentSimulation, setCurrentSimulation] = useState('learning-rate');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTry, setCurrentTry] = useState(0);
  const [data, setData] = useState([]);
  const [selectedTask, setSelectedTask] = useState(0);
  
  // Simulation parameters
  const learningRateSimulation = {
    title: "Learning Rate Analysis",
    subtitle: "UNIFORM TASK COMPLEXITY • VARIABLE LEARNING COEFFICIENTS",
    tasks: [
      {
        name: "TASKS WITH FAST LEARNING RATE: BASIC LOOPS",
        difficulty: -0.5,
        learningRate: 0.8,
        color: "#2563eb",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200",
        textColor: "text-blue-800",
        description: "CLEAR PATTERNS • IMMEDIATE FEEDBACK • RAPID CONVERGENCE"
      },
      {
        name: "TASKS WITH SLOW LEARNING RATE: ALGORITHM DESIGN",
        difficulty: -0.5,
        learningRate: 0.2,
        color: "#dc2626",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
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
        borderColor: "border-emerald-200",
        textColor: "text-emerald-800",
        description: "SIMPLE SYNTAX • BASIC CONCEPTS • LOW COMPLEXITY"
      },
      {
        name: "HARD TASK: RECURSIVE FUNCTIONS",
        difficulty: -1.0,
        learningRate: 0.4,
        color: "#7c2d12",
        bgColor: "bg-orange-50",
        borderColor: "border-orange-200",
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
          code: `# ITERATION ${currentTry}: BASIC LOOP SEQUENCE
for i in range(5):
    print(f"Count: {i}")`,
          result: currentTry >= 2 ? "SUCCESS: LOOP EXECUTED" : "ERROR: SYNTAX FAILURE"
        },
        1: {
          code: `# ITERATION ${currentTry}: ALGORITHM DESIGN
def fibonacci(n):
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

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="border-2 border-black p-4 bg-white mb-6 relative">
          {/* Technical corner brackets */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-black"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-black"></div>
          
          <div className="text-center space-y-3">
            <div className="inline-block border border-black px-3 py-1 mb-2">
              <span className="text-xs tracking-wider font-mono">AFM SIMULATION MODULE</span>
            </div>
            <h1 className="text-3xl font-bold uppercase tracking-wider text-black">
              AFM PARAMETER COMPARISON
            </h1>
            <p className="text-sm font-mono leading-relaxed max-w-3xl mx-auto text-black">
              LEARNING RATE VS TASK DIFFICULTY
              <br />
              Toggle the Demos to see what effect learning rate and task difficulty have on AFM.
            </p>
          </div>
        </div>

        {/* Simulation Selector */}
        <div className="flex justify-center mb-6">
          <div className="bg-white border-2 border-black p-2 flex font-mono">
            <button
              onClick={() => setCurrentSimulation('learning-rate')}
              className={`px-6 py-3 border font-medium transition-all tracking-wider text-xs ${
                currentSimulation === 'learning-rate'
                  ? 'bg-black text-white border-black'
                  : 'text-black border-black bg-white hover:bg-gray-100'
              }`}
            >
              LEARNING RATE DEMO
            </button>
            <button
              onClick={() => setCurrentSimulation('task-difficulty')}
              className={`px-6 py-3 border font-medium transition-all tracking-wider text-xs ${
                currentSimulation === 'task-difficulty'
                  ? 'bg-black text-white border-black'
                  : 'text-black border-black bg-white hover:bg-gray-100'
              }`}
            >
              TASK DIFFICULTY DEMO
            </button>
          </div>
        </div>

        {/* Main Content - Graph and Controls */}
        <div className="grid grid-cols-12 gap-4 mb-6">
          {/* Graph - Main Area */}
          <div className="col-span-12 lg:col-span-8">
            <TechnicalCard
              title="Success Probability Analysis"
              icon={TrendingUp}
              config="GRAPH-001"
              className="h-full"
            >
              <div className="bg-white p-4 border border-black h-full">
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
                    <XAxis 
                      dataKey="try" 
                      label={{ value: 'PRACTICE ATTEMPTS', position: 'insideBottom', offset: -5 }}
                      tick={{ fontSize: 12, fontFamily: 'monospace' }}
                    />
                    <YAxis 
                      label={{ value: 'SUCCESS PROBABILITY (%)', angle: -90, position: 'insideLeft' }}
                      tick={{ fontSize: 12, fontFamily: 'monospace' }}
                    />
                    <Tooltip 
                      labelStyle={{ fontFamily: 'monospace', fontSize: '12px' }}
                      contentStyle={{ fontFamily: 'monospace', fontSize: '12px', backgroundColor: '#f8f9fa' }}
                    />
                    <Legend wrapperStyle={{ fontFamily: 'monospace', fontSize: '12px' }} />
                    {currentSim.tasks.map((task, index) => (
                      <Line
                        key={index}
                        type="monotone"
                        dataKey={`task${index}`}
                        stroke={task.color}
                        strokeWidth={3}
                        dot={{ fill: task.color, strokeWidth: 2, r: 4 }}
                        name={task.name}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TechnicalCard>
          </div>

          {/* Controls - Right Side */}
          <div className="col-span-12 lg:col-span-4">
            <TechnicalCard
              title="Simulation Controls"
              icon={Play}
              config="CTRL-001"
              className="h-full"
            >
              <div className="space-y-4">
                {/* Student Ability and Iteration Info */}
                <div className="bg-gray-100 p-3 border border-gray-300 font-mono text-center">
                  <div className="text-xs mb-1">AFM FORMULA:</div>
                  <div className="text-sm font-bold mb-2">P(success) = θᵢ + βₖ + γₖ × T</div>
                  <div className="text-xs">
                    STUDENT ABILITY: {studentAbility} | ITERATION: {currentTry}
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    disabled={currentTry >= 10}
                    className={`px-4 py-2 border-2 border-black font-mono text-xs tracking-wider transition-all ${
                      isPlaying
                        ? 'bg-red-600 text-white hover:bg-red-700'
                        : 'bg-green-600 text-white hover:bg-green-700'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isPlaying ? 'PAUSE' : 'START'} SIMULATION
                  </button>
                  
                  <button
                    onClick={step}
                    disabled={isPlaying || currentTry >= 10}
                    className="px-4 py-2 bg-black text-white border-2 border-black font-mono text-xs tracking-wider transition-all hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    STEP FORWARD
                  </button>
                  
                  <button
                    onClick={reset}
                    className="px-4 py-2 bg-white text-black border-2 border-black font-mono text-xs tracking-wider transition-all hover:bg-gray-100"
                  >
                    RESET
                  </button>
                </div>
              </div>
            </TechnicalCard>
          </div>
        </div>

        {/* Enhanced Code Analysis - Full Width */}
        <div className="mb-6">
          <TechnicalCard
            title="Live Code Analysis"
            icon={Code}
            config="CODE-001"
            className="h-full"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {currentSim.tasks.map((task, index) => (
                <div key={index} className={`border-2 ${task.borderColor} ${task.bgColor} p-4`}>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className={`font-bold ${task.textColor} text-xs tracking-wider`}>{task.name}</h4>
                    <span className="text-xs text-gray-600">ITERATION-{currentTry}</span>
                  </div>
                  
                  {/* Task Parameters */}
                  <div className="mb-3 p-2 bg-white border border-gray-300">
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                      <div>DIFFICULTY (β): {task.difficulty}</div>
                      <div>LEARNING RATE (γ): {task.learningRate}</div>
                    </div>
                    <div className="border-t border-gray-300 pt-2 mt-2">
                      <div className={`text-xs font-bold ${task.textColor}`}>
                        SUCCESS RATE: {currentProb[`task${index}`] || 0}%
                      </div>
                    </div>
                  </div>

                  {/* Task Description */}
                  <div className={`p-2 mb-3 text-xs ${task.textColor} border border-gray-300`}>
                    {task.description}
                  </div>
                  
                  {/* Code Example */}
                  <div className="bg-black text-green-400 p-3 font-mono text-xs mb-3">
                    <pre>{taskExamples[index]?.code}</pre>
                  </div>
                  
                  {/* Result */}
                  <div className={`p-2 border text-xs font-mono ${
                    taskExamples[index]?.result?.includes('SUCCESS') 
                      ? 'bg-green-100 text-green-800 border-green-400' 
                      : 'bg-red-100 text-red-800 border-red-400'
                  }`}>
                    {taskExamples[index]?.result}
                  </div>
                </div>
              ))}
            </div>
          </TechnicalCard>
        </div>

        {/* Key Insights */}
        <TechnicalCard
          title="Technical Analysis"
          icon={AlertCircle}
          config="ANALYSIS-001"
          isMain={true}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="border border-white p-4 bg-white/10">
              <h4 className="font-bold mb-2 text-white">TASK DIFFICULTY (β)</h4>
              <p className="text-xs text-white leading-relaxed">
                BASELINE SUCCESS PROBABILITY • INHERENT CONCEPT COMPLEXITY • 
                INDEPENDENT OF LEARNING PROGRESSION
              </p>
            </div>
            
            <div className="border border-white p-4 bg-white/10">
              <h4 className="font-bold mb-2 text-white">LEARNING RATE (γ)</h4>
              <p className="text-xs text-white leading-relaxed">
                IMPROVEMENT VELOCITY • PRACTICE EFFICIENCY • 
                CONVERGENCE SPEED TO MASTERY
              </p>
            </div>
          </div>

          {/* Statement Evaluation Table */}
          <div className="border border-white p-4 bg-white/10 mb-4">
            <h4 className="font-bold mb-4 text-white text-center">STATEMENT EVALUATION MATRIX</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-white font-mono">
                <thead>
                  <tr className="border-b border-white">
                    <th className="text-left p-2 font-bold">STATEMENT</th>
                    <th className="text-center p-2 font-bold">STATUS</th>
                    <th className="text-left p-2 font-bold">REASONING</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/50">
                    <td className="p-2 align-top">"The learning rate is more important than the difficulty in the long term"</td>
                    <td className="p-2 text-center align-top">
                      <span className="bg-green-600 text-white px-2 py-1 rounded">✅ CONDITIONAL</span>
                    </td>
                    <td className="p-2 align-top">Under certain conditions: With sufficient exercises, as γₖTᵢₖ grows and βₖ remains constant</td>
                  </tr>
                  <tr className="border-b border-white/50">
                    <td className="p-2 align-top">"Learning rate always has a greater influence"</td>
                    <td className="p-2 text-center align-top">
                      <span className="bg-red-600 text-white px-2 py-1 rounded">❌ FALSE</span>
                    </td>
                    <td className="p-2 align-top">Not necessarily: If there are only a few exercises, βₖ remains more dominant</td>
                  </tr>
                  <tr>
                    <td className="p-2 align-top">"Learning rate can compensate for differences in difficulty"</td>
                    <td className="p-2 text-center align-top">
                      <span className="bg-green-600 text-white px-2 py-1 rounded">✅ TRUE</span>
                    </td>
                    <td className="p-2 align-top">Yes, with high exercise count: A skill with high difficulty and high learning rate can be mastered better than low difficulty with no learning gain</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="p-4 border border-white bg-white/10">
            <div className="mb-2">
              <span className="font-bold text-white">CRITICAL DISTINCTION:</span>
            </div>
            <p className="text-xs text-white leading-relaxed">
              HIGH TASK DIFFICULTY (LOW β) + HIGH LEARNING RATE (HIGH γ) = 
              DIFFICULT START WITH RAPID IMPROVEMENT CURVE
            </p>
          </div>
        </TechnicalCard>

        {/* Continue Button */}
        <div className="text-center mt-6">
          <button
            onClick={() => scroll(14)}
            className="px-8 py-4 bg-black text-white border-2 border-black font-mono text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-all transform hover:scale-105 flex items-center gap-3 mx-auto"
          >
            <span>CONTINUE SEQUENCE</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Layout>
  );
};