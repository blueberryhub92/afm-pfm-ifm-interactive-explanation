import React, { useState } from "react";
import { 
  RotateCcw, 
  CheckCircle, 
  Code, 
  Play, 
  ArrowRight, 
  AlertCircle,
  Target,
  Lightbulb,
  Zap,
  Calculator
} from "lucide-react";

export const Slide12ForLoops = ({ scroll }) => {
  const [task2Answer, setTask2Answer] = useState("");
  const [showTask2Solution, setShowTask2Solution] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.target;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      
      // Insert 4 spaces at cursor position
      const newValue = task2Answer.substring(0, start) + '    ' + task2Answer.substring(end);
      setTask2Answer(newValue);
      
      // Move cursor to after the inserted spaces
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    }
  };

  const validatePythonSyntax = (code) => {
    // Remove comments and extra whitespace
    const cleanCode = code.replace(/#.*$/gm, '').trim();
    
    // Check for basic Python syntax errors
    const lines = cleanCode.split('\n').filter(line => line.trim() !== '');
    
    // Check for unbalanced parentheses, brackets, braces
    let parenCount = 0;
    let bracketCount = 0;
    let braceCount = 0;
    
    for (const char of cleanCode) {
      if (char === '(') parenCount++;
      if (char === ')') parenCount--;
      if (char === '[') bracketCount++;
      if (char === ']') bracketCount--;
      if (char === '{') braceCount++;
      if (char === '}') braceCount--;
    }
    
    if (parenCount !== 0 || bracketCount !== 0 || braceCount !== 0) {
      return { valid: false, error: "Syntax Error: Unbalanced parentheses, brackets, or braces" };
    }
    
    // Check for proper indentation in for loop
    const forLineIndex = lines.findIndex(line => line.includes('for') && line.includes('in'));
    if (forLineIndex !== -1) {
      const forLine = lines[forLineIndex];
      if (!forLine.trim().endsWith(':')) {
        return { valid: false, error: "Syntax Error: For loop must end with a colon (:)" };
      }
      
      // Check if there are indented lines after the for loop
      const hasIndentedLines = lines.slice(forLineIndex + 1).some(line => {
        // Check if line has leading whitespace and content
        return /^\s+\S/.test(line);
      });
      
      if (!hasIndentedLines) {
        return { valid: false, error: "Syntax Error: For loop body must be indented" };
      }
    }
    
    return { valid: true };
  };

  const checkTask2Answer = () => {
    if (!task2Answer.trim()) {
      setErrorMessage("Please enter some code first!");
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
      return;
    }

    // First check syntax
    const syntaxCheck = validatePythonSyntax(task2Answer);
    if (!syntaxCheck.valid) {
      setErrorMessage(syntaxCheck.error);
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
      return;
    }

    // Then check for required components
    const code = task2Answer.toLowerCase();
    
    // Check for for loop with range - more flexible pattern
    const hasForLoop = code.includes('for') && 
                      code.includes('in') && 
                      code.includes('range') &&
                      (code.includes('range(1,11)') || 
                       code.includes('range(1, 11)') ||
                       code.includes('range( 1, 11 )') ||
                       code.includes('range( 1,11 )'));
    
    // Check for sum calculation (+=, sum variable, or explicit addition)
    const hasSum = code.includes('+=') || 
                  code.includes('total') || 
                  code.includes('sum');
    
    // Check for print statement
    const hasPrint = code.includes('print');
    
    // Check for initialization of sum variable
    const hasInit = code.includes('total = 0') || 
                   code.includes('sum = 0') ||
                   /\w+\s*=\s*0/.test(code);
    
    if (!hasForLoop) {
      setErrorMessage("Missing: for loop with range(1, 11)");
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
      return;
    }
    
    if (!hasInit) {
      setErrorMessage("Missing: Initialize a variable to 0 (e.g., total = 0)");
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
      return;
    }
    
    if (!hasSum) {
      setErrorMessage("Missing: Add numbers together (use += or similar)");
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
      return;
    }
    
    if (!hasPrint) {
      setErrorMessage("Missing: print() statement to display the result");
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
      return;
    }
    
    // If all checks pass
    setShowTask2Solution(true);
    setShowError(false);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center py-8 px-4 text-black font-['IBM_Plex_Mono',monospace]">
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">
        
        {/* Instructions Section */}
        <div className="relative border-4 border-black rounded-xl p-6 bg-white shadow-lg">
          <div className="absolute -top-6 left-4 px-3 py-1 bg-orange-600 text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
            <RotateCcw className="w-4 h-4" />
            TASK 2 OF 2
          </div>
          
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-6 h-6 text-blue-700" />
            <h3 className="text-xl font-bold text-black tracking-tight">
              Mission Instructions
            </h3>
          </div>
          
          <div className="bg-orange-50 border-2 border-orange-700 rounded-lg p-4 mb-6">
            <p className="text-orange-900 font-semibold mb-4">
              Write a Python program that accomplishes the following:
            </p>
            
            <div className="space-y-3">
              <div className="bg-white border-2 border-black rounded-lg p-4 flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500 border-2 border-black rounded-full flex items-center justify-center text-white font-bold text-sm">
                  1
                </div>
                <div className="flex-1">
                  <div className="font-bold text-blue-700">Use a for loop</div>
                  <div className="text-sm text-blue-600">Iterate through numbers from 1 to 10</div>
                </div>
                <code className="bg-black text-blue-400 px-2 py-1 rounded font-mono text-xs">
                  for i in range(1, 11):
                </code>
              </div>
              
              <div className="bg-white border-2 border-black rounded-lg p-4 flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500 border-2 border-black rounded-full flex items-center justify-center text-white font-bold text-sm">
                  2
                </div>
                <div className="flex-1">
                  <div className="font-bold text-green-700">Calculate sum</div>
                  <div className="text-sm text-green-600">Add all numbers together</div>
                </div>
                <code className="bg-black text-green-400 px-2 py-1 rounded font-mono text-xs">
                  total += i
                </code>
              </div>
              
              <div className="bg-white border-2 border-black rounded-lg p-4 flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-500 border-2 border-black rounded-full flex items-center justify-center text-white font-bold text-sm">
                  3
                </div>
                <div className="flex-1">
                  <div className="font-bold text-purple-700">Print result</div>
                  <div className="text-sm text-purple-600">Display the final sum</div>
                </div>
                <code className="bg-black text-purple-400 px-2 py-1 rounded font-mono text-xs">
                  print(total)
                </code>
              </div>
            </div>
          </div>

          {/* Code Input Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Code className="w-5 h-5 text-black" />
              <label className="font-bold text-lg text-black">
                Your Python Code:
              </label>
            </div>
            
            <div className="border-4 border-black rounded-xl overflow-hidden">
              <div className="bg-black text-white px-4 py-2 flex items-center gap-2 font-bold text-sm">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="ml-2">for_loop_task.py</span>
              </div>
              <div style={{ backgroundColor: '#000000' }}>
                <textarea
                  value={task2Answer}
                  onChange={(e) => setTask2Answer(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full h-48 p-4 text-white font-mono text-sm border-none resize-none focus:outline-none"
                  style={{ 
                    backgroundColor: '#000000',
                    background: '#000000'
                  }}
                  placeholder="# Write your Python code here..."
                />
              </div>
            </div>
            
            <button
              onClick={checkTask2Answer}
              className="w-full px-8 py-4 bg-orange-600 text-white border-4 border-black rounded-xl font-bold text-xl uppercase tracking-wider hover:bg-white hover:text-orange-700 hover:border-orange-800 transition-all duration-300 shadow-lg hover:shadow-2xl flex items-center justify-center gap-3"
            >
              <Play className="w-6 h-6" />
              EXECUTE LOOP CODE
              <Zap className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Error Message */}
        {showError && (
          <div className="border-4 border-red-700 rounded-xl p-6 bg-red-50 shadow-lg animate-pulse">
            <div className="flex items-center gap-3 mb-3">
              <AlertCircle className="w-6 h-6 text-red-700" />
              <h4 className="font-bold text-red-800 text-lg">
                ✗ Code Error Detected!
              </h4>
            </div>
            <div className="bg-red-100 border-2 border-red-700 rounded-lg p-4 font-mono text-sm">
              <div className="font-bold mb-2 text-red-900">ERROR:</div>
              <div className="text-red-800 mb-4 p-2 bg-red-50 rounded">
                {errorMessage}
              </div>
              <div className="font-bold mb-2 text-red-900">REQUIREMENTS CHECKLIST:</div>
              <div className="space-y-1 text-red-800">
                <div>• Initialize a variable to 0 (e.g., <code className="bg-red-200 px-1 rounded">total = 0</code>)</div>
                <div>• Use a <code className="bg-red-200 px-1 rounded">for</code> loop with <code className="bg-red-200 px-1 rounded">range(1, 11)</code></div>
                <div>• Add numbers together using <code className="bg-red-200 px-1 rounded">+=</code></div>
                <div>• Print the final result with <code className="bg-red-200 px-1 rounded">print()</code></div>
                <div>• Use proper Python syntax (colons, indentation, etc.)</div>
              </div>
            </div>
          </div>
        )}

        {/* Success Message */}
        {showTask2Solution && (
          <div className="border-4 border-orange-700 rounded-xl p-6 bg-orange-50 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-8 h-8 text-orange-700" />
              <h4 className="font-bold text-orange-800 text-2xl">
                ✓ EXCELLENT! Loop Mastery Achieved
              </h4>
            </div>
            
            <div className="bg-white border-2 border-orange-700 rounded-lg p-4 mb-6">
              <div className="font-bold text-orange-800 mb-3 flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Perfect Solution:
              </div>
              <div className="bg-black text-orange-400 p-4 rounded-lg font-mono text-sm border-2 border-orange-700">
                <pre>{`total = 0
for number in range(1, 11):
    total += number
print(total)
# Output: 55`}</pre>
              </div>
              <div className="mt-3 p-3 bg-orange-100 border-2 border-orange-700 rounded-lg">
                <div className="font-bold text-orange-800 mb-1">How it works:</div>
                <div className="text-sm text-orange-700 font-mono">
                  1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10 = <span className="font-bold text-orange-900">55</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-orange-100 border-2 border-orange-700 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-orange-500 border-2 border-black rounded-full"></div>
                <span className="font-mono text-sm text-orange-800">Task 2: Complete</span>
                <div className="w-4 h-4 bg-green-500 border-2 border-black rounded-full"></div>
                <span className="font-mono text-sm text-green-800">All Tasks Done!</span>
              </div>
              <button
                onClick={() => scroll(13)}
                className="px-8 py-3 bg-black text-white border-4 border-black rounded-xl font-bold uppercase tracking-wider hover:bg-purple-600 hover:border-purple-800 transition-all duration-300 shadow-lg flex items-center gap-3"
              >
                Compare Results
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Demo component to show both slides
export default function SlidesDemo() {
  const [currentSlide, setCurrentSlide] = useState(11);
  
  const scroll = (slideNumber) => {
    setCurrentSlide(slideNumber);
  };

  return (
    <div className="w-full">
      <div className="flex gap-4 p-4 bg-gray-100 border-b-2 border-gray-300">
        <button
          onClick={() => setCurrentSlide(11)}
          className={`px-4 py-2 rounded font-bold ${
            currentSlide === 11 
              ? 'bg-green-600 text-white' 
              : 'bg-gray-300 text-gray-700'
          }`}
        >
          Slide 11 - Variables
        </button>
        <button
          onClick={() => setCurrentSlide(12)}
          className={`px-4 py-2 rounded font-bold ${
            currentSlide === 12 
              ? 'bg-orange-600 text-white' 
              : 'bg-gray-300 text-gray-700'
          }`}
        >
          Slide 12 - For Loops
        </button>
      </div>
      
      {currentSlide === 11 && <Slide11VariableDeclaration scroll={scroll} />}
      {currentSlide === 12 && <Slide12ForLoops scroll={scroll} />}
    </div>
  );
}