import React, { useState } from 'react';
import { 
  Code, 
  Play, 
  Target, 
  FileText, 
  RotateCcw, 
  CheckCircle, 
  AlertCircle,
  Lightbulb,
  Calculator,
  ArrowRight,
} from "lucide-react";

// Mock hook for demonstration - replace with your actual hook
const useProbability = () => ({
  updateProbability: (prob) => console.log(`Probability updated to: ${prob}`)
});

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

const TechnicalCard = ({ title, description, icon: Icon, config, onClick, children, className = "" }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white text-black border-2 border-black p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 relative group ${className}`}
    >
      {/* Technical drawing corner marker */}
      <div className="absolute top-2 right-2 w-2 h-2 border border-black bg-white" />
      
      <div className="h-full flex flex-col justify-between">
        <div className="flex items-start justify-between mb-4">
          <div className="w-8 h-8 border border-black flex items-center justify-center bg-white">
            <Icon className="w-4 h-4 text-black" />
          </div>
          <ArrowRight className="w-4 h-4 text-black opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        
        <div>
          <div className="flex items-center mb-3">
            <div>
              <h3 className="text-lg font-bold text-black tracking-wider uppercase">
                {title}
              </h3>
              <span className="text-xs font-mono text-gray-600">
                {config}
              </span>
            </div>
          </div>
          
          <p className="text-black text-sm font-mono leading-relaxed">
            {description}
          </p>
        </div>
        
        {children && (
          <div className="mt-4">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export const Slide10TwoPythonTasks = ({ scroll }) => {
  const { updateProbability } = useProbability();
  
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskAnswer, setTaskAnswer] = useState("");
  const [showSolution, setShowSolution] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [completedTasks, setCompletedTasks] = useState([]);

  const tasks = {
    1: {
      title: "Variable Declaration Protocol",
      description: "Initialize data structures with specified parameters",
      color: 'green',
      icon: FileText,
      config: "TASK-001",
      requirements: [
        { label: 'String Variable', code: 'name = "Alice"', type: 'STRING' },
        { label: 'Integer Variable', code: 'age = 25', type: 'INTEGER' },
        { label: 'Location Variable', code: 'city = "New York"', type: 'STRING' }
      ],
      solution: `name = "Alice"
age = 25
city = "New York"`,
      checkFunction: (answer) => {
        const normalizedInput = answer.trim().toLowerCase();
        const lines = normalizedInput.split('\n')
          .map(line => line.trim())
          .filter(line => line.length > 0);
        
        if (lines.length !== 3) {
          return { valid: false, error: "Protocol requires exactly 3 variable declarations" };
        }
        
        const expectedLines = [
          'name = "alice"',
          'age = 25',
          'city = "new york"'
        ];
        
        const isCorrect = lines.every((line, index) => {
          const cleanLine = line.replace(/\s*=\s*/, ' = ');
          return cleanLine === expectedLines[index];
        });
        
        if (!isCorrect) {
          return { valid: false, error: "Variable assignment parameters do not match specifications" };
        }
        
        return { valid: true };
      }
    },
    2: {
      title: "Iteration Loop Protocol",
      description: "Execute summation algorithm with sequential processing",
      color: 'orange',
      icon: RotateCcw,
      config: "TASK-002",
      requirements: [
        { label: 'Loop Structure', code: 'for i in range(1, 11):', type: 'CONTROL' },
        { label: 'Accumulator Function', code: 'total += i', type: 'OPERATION' },
        { label: 'Output Display', code: 'print(total)', type: 'DISPLAY' }
      ],
      solution: `total = 0
for number in range(1, 11):
    total += number
print(total)
# Output: 55`,
      checkFunction: (answer) => {
        const code = answer.toLowerCase();
        
        if (!code.trim()) {
          return { valid: false, error: "No code input detected" };
        }

        const hasForLoop = code.includes('for') && 
                          code.includes('in') && 
                          code.includes('range') &&
                          (code.includes('range(1,11)') || 
                           code.includes('range(1, 11)') ||
                           code.includes('range( 1, 11 )') ||
                           code.includes('range( 1,11 )'));
        
        const hasSum = code.includes('+=') || 
                      code.includes('total') || 
                      code.includes('sum');
        
        const hasPrint = code.includes('print');
        
        const hasInit = code.includes('total = 0') || 
                       code.includes('sum = 0') ||
                       /\w+\s*=\s*0/.test(code);
        
        if (!hasForLoop) {
          return { valid: false, error: "Missing loop structure with range(1, 11)" };
        }
        
        if (!hasInit) {
          return { valid: false, error: "Missing accumulator initialization (variable = 0)" };
        }
        
        if (!hasSum) {
          return { valid: false, error: "Missing accumulation operation (use += operator)" };
        }
        
        if (!hasPrint) {
          return { valid: false, error: "Missing output display function" };
        }
        
        return { valid: true };
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.target;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      
      const newValue = taskAnswer.substring(0, start) + '    ' + taskAnswer.substring(end);
      setTaskAnswer(newValue);
      
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    }
  };

  const handleTaskClick = (taskId) => {
    updateProbability(0.30);
    setSelectedTask(taskId);
    setTaskAnswer("");
    setShowSolution(false);
    setShowError(false);
    setErrorMessage("");
  };

  const handleCheckAnswer = () => {
    const task = tasks[selectedTask];
    const result = task.checkFunction(taskAnswer);
    
    if (result.valid) {
      setShowSolution(true);
      setShowError(false);
      if (!completedTasks.includes(selectedTask)) {
        setCompletedTasks([...completedTasks, selectedTask]);
      }
    } else {
      setErrorMessage(result.error);
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
    }
  };

  const resetTask = () => {
    setSelectedTask(null);
    setTaskAnswer("");
    setShowSolution(false);
    setShowError(false);
    setErrorMessage("");
  };

  // Task Detail View
  if (selectedTask) {
    const task = tasks[selectedTask];
    const IconComponent = task.icon;

    return (
      <Layout>
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div className="border-2 border-black p-4 bg-white relative">
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-black"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-black"></div>
            
            <div className="text-center space-y-3">
              <div className="inline-block border border-black px-3 py-1 mb-2">
                <span className="text-xs tracking-wider font-mono">{task.config}</span>
              </div>
              <h1 className="text-3xl font-bold uppercase tracking-wider text-black">
                {task.title}
              </h1>
              <p className="text-sm font-mono leading-relaxed text-black">
                {task.description.toUpperCase()}
              </p>
            </div>
          </div>

          {/* Instructions */}
          <div className="border-2 border-black p-6 bg-white relative">
            <div className="absolute top-2 right-2 w-2 h-2 border border-black bg-white" />
            
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 border border-black flex items-center justify-center bg-white">
                <IconComponent className="w-4 h-4 text-black" />
              </div>
              <h3 className="text-lg font-bold text-black tracking-wider uppercase">
                Protocol Specifications
              </h3>
            </div>
            
            <div className="space-y-4">
              {task.requirements.map((req, index) => (
                <div key={index} className="border border-black p-4 bg-white relative">
                  <div className="absolute top-1 right-1 w-1 h-1 border border-black bg-white" />
                  
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 border border-black flex items-center justify-center bg-white text-black font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-black uppercase tracking-wide text-sm">{req.label}</div>
                      <div className="text-xs font-mono text-gray-600">{req.type}</div>
                    </div>
                    <div className="bg-black text-white px-2 py-1 font-mono text-xs">
                      {req.code}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Code Input */}
          <div className="border-2 border-black p-6 bg-white relative">
            <div className="absolute top-2 right-2 w-2 h-2 border border-black bg-white" />
            
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 border border-black flex items-center justify-center bg-white">
                <Code className="w-4 h-4 text-black" />
              </div>
              <h3 className="text-lg font-bold text-black tracking-wider uppercase">
                Code Input Terminal
              </h3>
            </div>
            
            <div className="border-2 border-black overflow-hidden mb-4">
              <div className="bg-black text-white px-4 py-2 flex items-center gap-2 font-mono text-xs">
                <div className="w-2 h-2 bg-red-500 border border-white"></div>
                <div className="w-2 h-2 bg-yellow-500 border border-white"></div>
                <div className="w-2 h-2 bg-green-500 border border-white"></div>
                <span className="ml-2 tracking-wider">TASK_{selectedTask}.PY</span>
              </div>
              <div style={{ backgroundColor: '#000000' }}>
                <textarea
                  value={taskAnswer}
                  onChange={(e) => setTaskAnswer(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full h-40 p-4 text-white font-mono text-sm border-none resize-none focus:outline-none"
                  style={{ 
                    backgroundColor: '#000000',
                    background: '#000000'
                  }}
                  placeholder="# ENTER PYTHON CODE HERE..."
                />
              </div>
            </div>
            
            <button
              onClick={handleCheckAnswer}
              className="w-full px-8 py-4 bg-black text-white border-2 border-black font-bold text-lg uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center gap-3"
            >
              <Play className="w-5 h-5" />
              EXECUTE & VALIDATE
            </button>
          </div>

          {/* Error Display */}
          {showError && (
            <div className="border-2 border-black p-6 bg-white relative">
              <div className="absolute top-2 right-2 w-2 h-2 border border-black bg-white" />
              
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 border border-black flex items-center justify-center bg-white">
                  <AlertCircle className="w-4 h-4 text-black" />
                </div>
                <h4 className="font-bold text-black text-lg uppercase tracking-wide">
                  Error Detected
                </h4>
              </div>
              
              <div className="border border-black p-4 bg-white">
                <div className="font-mono text-sm">
                  <div className="font-bold mb-2 text-black uppercase">SYSTEM ERROR:</div>
                  <div className="text-black">
                    {errorMessage}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Success Display */}
          {showSolution && (
            <div className="border-2 border-black p-6 bg-black text-white relative">
              <div className="absolute top-2 right-2 w-2 h-2 border border-white bg-black" />
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 border border-white flex items-center justify-center bg-black">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <h4 className="font-bold text-white text-xl uppercase tracking-wide">
                  Protocol Executed Successfully
                </h4>
              </div>
              
              <div className="border border-white p-4 bg-black mb-4">
                <div className="font-bold text-white mb-3 flex items-center gap-2 uppercase tracking-wide">
                  <Lightbulb className="w-4 h-4" />
                  Reference Implementation:
                </div>
                <div className="bg-white text-black p-4 border border-white font-mono text-sm">
                  <pre>{task.solution}</pre>
                </div>
                {selectedTask === 2 && (
                  <div className="mt-3 p-3 border border-white bg-black">
                    <div className="font-bold text-white mb-1 uppercase tracking-wide">Algorithm Analysis:</div>
                    <div className="text-sm text-white font-mono">
                      SEQUENTIAL SUMMATION: 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10 = <span className="font-bold">55</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="border-2 border-black p-6 bg-white relative">
            <div className="absolute top-2 right-2 w-2 h-2 border border-black bg-white" />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 border border-black flex items-center justify-center bg-white">
                  <ArrowRight className="w-4 h-4 text-black" />
                </div>
                <div>
                  <div className="font-bold text-black uppercase tracking-wide">Navigation Options</div>
                  <div className="text-xs font-mono text-gray-600">Return to task selection or continue</div>
                </div>
              </div>
              <button
                onClick={resetTask}
                className="px-6 py-2 bg-white text-black border-2 border-black font-bold text-sm uppercase tracking-wide hover:bg-black hover:text-white transition-all"
              >
                ← Return to Tasks
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Main Task Selection View
  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="border-2 border-black p-4 bg-white relative">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-black"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-black"></div>
          
          <div className="text-center space-y-3">
            <div className="inline-block border border-black px-3 py-1 mb-2">
              <span className="text-xs tracking-wider font-mono">PYTHON PROTOCOL SUITE</span>
            </div>
            <h1 className="text-3xl font-bold uppercase tracking-wider text-black">
              Task Execution Framework
            </h1>
            <p className="text-sm font-mono leading-relaxed text-black">
              INTERACTIVE PROGRAMMING PROTOCOLS • OPTIONAL EXECUTION MODULES
            </p>
          </div>
        </div>

        {/* Task Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Task 1 */}
          <TechnicalCard
            title="Variable Protocol"
            description="DATA INITIALIZATION • MEMORY ALLOCATION • TYPE ASSIGNMENT • VARIABLE DECLARATION SEQUENCES"
            icon={FileText}
            config="TASK-001"
            onClick={() => handleTaskClick(1)}
          >
            <div className="border border-black p-3 bg-white font-mono text-xs">
              <div className="font-bold mb-2 uppercase tracking-wide">Module Overview:</div>
              <div>• STRING INITIALIZATION</div>
              <div>• INTEGER ASSIGNMENT</div>
              <div>• MEMORY ALLOCATION</div>
              {completedTasks.includes(1) && (
                <div className="mt-2 flex items-center gap-1 text-black">
                  <CheckCircle className="w-3 h-3" />
                  <span className="font-bold">COMPLETED</span>
                </div>
              )}
            </div>
          </TechnicalCard>

          {/* Task 2 */}
          <TechnicalCard
            title="Iteration Protocol"
            description="LOOP STRUCTURES • SEQUENTIAL PROCESSING • ACCUMULATION ALGORITHMS • CONTROL FLOW MANAGEMENT"
            icon={RotateCcw}
            config="TASK-002"
            onClick={() => handleTaskClick(2)}
          >
            <div className="border border-black p-3 bg-white font-mono text-xs">
              <div className="font-bold mb-2 uppercase tracking-wide">Module Overview:</div>
              <div>• LOOP INITIALIZATION</div>
              <div>• RANGE PROCESSING</div>
              <div>• ACCUMULATION LOGIC</div>
              {completedTasks.includes(2) && (
                <div className="mt-2 flex items-center gap-1 text-black">
                  <CheckCircle className="w-3 h-3" />
                  <span className="font-bold">COMPLETED</span>
                </div>
              )}
            </div>
          </TechnicalCard>
        </div>

        {/* Progress Section */}
        <div className="border-2 border-black p-6 bg-white relative">
          <div className="absolute top-2 right-2 w-2 h-2 border border-black bg-white" />
          
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-8 border border-black flex items-center justify-center bg-white">
                <Calculator className="w-4 h-4 text-black" />
              </div>
              <h3 className="text-lg font-bold text-black tracking-wider uppercase">
                Progress Analysis
              </h3>
            </div>
            
            <div className="text-sm font-mono text-black mb-4">
              {completedTasks.length === 0 && "READY TO INITIALIZE PROTOCOL EXECUTION"}
              {completedTasks.length === 1 && "PROGRESS: 50% COMPLETE • ONE MODULE REMAINING"}
              {completedTasks.length === 2 && "ALL PROTOCOLS EXECUTED SUCCESSFULLY"}
            </div>
            
            {/* Progress Bar */}
            <div className="w-full border-2 border-black h-6 mb-4 bg-white relative">
              <div 
                className="bg-black h-full transition-all duration-500"
                style={{ width: `${(completedTasks.length / 2) * 100}%` }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-mono font-bold mix-blend-difference text-white">
                  {completedTasks.length}/2 MODULES
                </span>
              </div>
            </div>
            
            <button
              onClick={() => scroll(9)}
              className="px-8 py-3 bg-black text-white border-2 border-black font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3 mx-auto"
            >
              <span>Continue Protocol</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            
            {completedTasks.length < 2 && (
              <div className="text-xs text-gray-600 font-mono mt-2">
                OPTIONAL MODULES • EXECUTION NOT REQUIRED FOR PROGRESSION
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};