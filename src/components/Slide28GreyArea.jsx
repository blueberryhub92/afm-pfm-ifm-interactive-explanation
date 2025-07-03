import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, XCircle, TrendingUp, Calculator, ArrowRight, BarChart3, Brain, Target, HelpCircle, Lightbulb, Code, Zap } from 'lucide-react';

export const Slide28GreyArea = ({ scroll }) => {
  const [hoveredTerm, setHoveredTerm] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0, side: 'right' });
  const [animationStep, setAnimationStep] = useState(0);
  
  const greyAreaRef = useRef(null);
  const zpdRef = useRef(null);
  const thresholdRef = useRef(null);
  const boundariesRef = useRef(null);

  // Simulated student data for Python programming
  const studentData = {
    totalAttempts: 45,
    correctAnswers: 28,
    incorrectAnswers: 17,
    hintsUsed: 8,
    currentProficiency: 0.62, // θᵢ
    skills: [
      { name: 'Variable Assignment', difficulty: -0.3, attempts: 12, correct: 9 },
      { name: 'String Slicing', difficulty: 0.2, attempts: 8, correct: 4 },
      { name: 'Loop Logic', difficulty: 0.5, attempts: 15, correct: 8 },
      { name: 'Function Definition', difficulty: 0.1, attempts: 10, correct: 7 }
    ]
  };

  // Calculate AFM prediction for current state
  const calculateAFMPrediction = () => {
    const theta = studentData.currentProficiency;
    const avgDifficulty = studentData.skills.reduce((sum, skill) => sum + skill.difficulty, 0) / studentData.skills.length;
    const avgLearningRate = 0.15; // γ
    const totalPractice = studentData.totalAttempts;
    
    const logOdds = theta + avgDifficulty + (avgLearningRate * totalPractice);
    const probability = Math.exp(logOdds) / (1 + Math.exp(logOdds));
    return Math.max(0.05, Math.min(0.95, probability)); // Clamp between 5% and 95%
  };

  const currentPrediction = calculateAFMPrediction();
  
  // Calculate Grey Area boundaries
  const optimalThreshold = 0.5; // Simplified for demonstration
  const upperBoundary = optimalThreshold + ((1 - optimalThreshold) / 2);
  const lowerBoundary = optimalThreshold - (optimalThreshold / 2);
  
  const isInGreyArea = currentPrediction >= lowerBoundary && currentPrediction <= upperBoundary;
  
  useEffect(() => {
    const timer = setInterval(() => {
      setAnimationStep(prev => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const calculateTooltipPosition = () => {
    const margin = 16;
    return { x: margin, y: margin, side: 'top-left' };
  };

  const handleMouseEnter = (term, ref) => {
    setHoveredTerm(term);
    const position = calculateTooltipPosition();
    setTooltipPosition(position);
  };

  const GreyAreaTooltip = () => (
    <div 
      className="fixed z-50 bg-white border-4 border-black rounded-xl shadow-lg p-6 w-96 font-['IBM_Plex_Mono',monospace]"
      style={{ 
        left: `${tooltipPosition.x}px`, 
        top: `${tooltipPosition.y}px`,
        maxWidth: '384px'
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-gray-600 border-2 border-black rounded-lg flex items-center justify-center">
          <Brain size={16} className="text-white" />
        </div>
        <h4 className="font-bold text-black text-lg uppercase tracking-wide">Grey Area</h4>
      </div>
      
      <div className="border-4 border-gray-600 rounded-xl p-4 bg-gray-100 mb-4">
        <div className="text-black font-bold mb-3 uppercase tracking-wide text-sm">Formula:</div>
        <div className="bg-black text-green-400 p-3 rounded-lg font-mono text-sm">
          <div className="text-green-300"># Grey Area Boundaries</div>
          <div className="text-white">upper = opt_t + ((1 - opt_t)/2)</div>
          <div className="text-white">lower = opt_t - (opt_t/2)</div>
        </div>
      </div>
      
      <div className="space-y-2 text-sm text-black font-mono">
        <div><strong>opt_t:</strong> Optimal threshold</div>
        <div><strong>Upper:</strong> {upperBoundary.toFixed(3)}</div>
        <div><strong>Lower:</strong> {lowerBoundary.toFixed(3)}</div>
      </div>
      
      <div className="border-l-8 border-blue-600 bg-blue-100 p-3 rounded-r-lg mt-4">
        <p className="text-black text-sm font-bold">
          Identifies computational ZPD through model uncertainty
        </p>
      </div>
    </div>
  );

  const ZPDTooltip = () => (
    <div 
      className="fixed z-50 bg-white border-4 border-black rounded-xl shadow-lg p-6 w-80 font-['IBM_Plex_Mono',monospace]"
      style={{ 
        left: `${tooltipPosition.x}px`, 
        top: `${tooltipPosition.y}px`,
        maxWidth: '320px'
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-green-600 border-2 border-black rounded-lg flex items-center justify-center">
          <Target size={16} className="text-white" />
        </div>
        <h4 className="font-bold text-black text-lg uppercase tracking-wide">ZPD</h4>
      </div>
      
      <p className="text-sm text-black mb-4 font-mono">
        Zone of Proximal Development by Vygotsky
      </p>
      
      <div className="space-y-2">
        <div className="border-4 border-red-600 bg-red-100 p-2 rounded-lg text-xs font-bold text-black uppercase">
          Below ZPD: Too Hard
        </div>
        <div className="border-4 border-yellow-600 bg-yellow-100 p-2 rounded-lg text-xs font-bold text-black uppercase">
          Within ZPD: Perfect Challenge
        </div>
        <div className="border-4 border-green-600 bg-green-100 p-2 rounded-lg text-xs font-bold text-black uppercase">
          Above ZPD: Too Easy
        </div>
      </div>
    </div>
  );

  const ThresholdTooltip = () => (
    <div 
      className="fixed z-50 bg-white border-4 border-black rounded-xl shadow-lg p-6 w-80 font-['IBM_Plex_Mono',monospace]"
      style={{ 
        left: `${tooltipPosition.x}px`, 
        top: `${tooltipPosition.y}px`,
        maxWidth: '320px'
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-purple-600 border-2 border-black rounded-lg flex items-center justify-center">
          <Calculator size={16} className="text-white" />
        </div>
        <h4 className="font-bold text-black text-lg uppercase tracking-wide">Threshold</h4>
      </div>
      
      <p className="text-sm text-black mb-4 font-mono">
        ROC curve optimization for classification
      </p>
      
      <div className="bg-black text-green-400 p-3 rounded-lg font-mono text-xs mb-3">
        <div className="text-green-300"># Classification Rule</div>
        <div className="text-white">if P(correct) {'>='} {optimalThreshold}:</div>
        <div className="ml-4 text-yellow-400">predict_success = True</div>
        <div className="text-white">else:</div>
        <div className="ml-4 text-yellow-400">predict_success = False</div>
      </div>
    </div>
  );

  return (
    <div className="bg-white min-h-screen flex flex-col items-center py-8 px-4 md:px-10 text-black font-['IBM_Plex_Mono',monospace]">
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-8">
        
        {/* Header */}
        <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative">
          <div className="absolute -top-6 left-4 px-3 py-1 bg-gray-600 text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
            <Target className="w-4 h-4" />
            COMPUTATIONAL ZPD
          </div>
          <div className="text-2xl md:text-4xl font-bold tracking-tight text-black text-center uppercase">
            The Grey Area Approach
          </div>
          <div className="text-lg text-center mt-2 font-mono">
            Where uncertainty meets optimal learning
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column: Concept Explanation */}
          <div className="space-y-6">
            
            {/* Main Explanation */}
            <div className="border-4 border-black rounded-xl p-6 bg-white shadow-lg relative">
              <div className="absolute -top-6 left-4 px-3 py-1 bg-blue-600 text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
                <Brain className="w-4 h-4" />
                CONCEPT
              </div>
              
              <p className="text-lg text-black leading-relaxed font-mono mb-4">
                The{' '}
                <span 
                  ref={greyAreaRef}
                  className="relative cursor-help bg-gray-200 border-2 border-gray-600 px-2 py-1 rounded font-bold text-gray-800 hover:bg-gray-300 transition-colors"
                  onMouseEnter={() => handleMouseEnter('greyArea', greyAreaRef)}
                  onMouseLeave={() => setHoveredTerm(null)}
                >
                  GREY AREA
                </span>
                {' '}identifies a student's{' '}
                <span 
                  ref={zpdRef}
                  className="relative cursor-help bg-green-200 border-2 border-green-600 px-2 py-1 rounded font-bold text-green-800 hover:bg-green-300 transition-colors"
                  onMouseEnter={() => handleMouseEnter('zpd', zpdRef)}
                  onMouseLeave={() => setHoveredTerm(null)}
                >
                  ZPD
                </span>
                {' '}through model uncertainty.
              </p>

              <div className="border-l-8 border-blue-600 bg-blue-100 p-4 rounded-r-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="w-5 h-5 text-blue-700" />
                  <span className="font-bold text-blue-700 uppercase tracking-wide">Key Insight</span>
                </div>
                <p className="text-black font-mono text-sm">
                  When our model is uncertain, the student is likely in their optimal learning zone
                </p>
              </div>
            </div>

            {/* Formula Box */}
            <div className="border-4 border-black rounded-xl p-6 bg-white shadow-lg relative">
              <div className="absolute -top-6 left-4 px-3 py-1 bg-purple-600 text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
                <Calculator className="w-4 h-4" />
                FORMULA
              </div>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-purple-100 border-4 border-purple-600 rounded-xl flex items-center justify-center text-purple-700 font-bold text-xl">
                  GA
                </div>
                <div className="text-xl font-bold text-black uppercase">
                  Grey Area Calculation
                </div>
              </div>
              
              <div className="bg-black text-green-400 p-4 rounded-lg border-2 border-purple-600 font-mono text-sm mb-4">
                <div className="text-green-300"># Boundary Formulas</div>
                <div className="text-white">upper = opt_t + ((1 - opt_t) / 2)</div>
                <div className="text-white">lower = opt_t - (opt_t / 2)</div>
                <div className="text-gray-400 mt-2"># Current values:</div>
                <div className="text-yellow-400">opt_t = {optimalThreshold}</div>
                <div className="text-yellow-400">upper = {upperBoundary.toFixed(3)}</div>
                <div className="text-yellow-400">lower = {lowerBoundary.toFixed(3)}</div>
              </div>

              <div className="text-sm text-black space-y-1 font-mono">
                <div><strong>opt_t:</strong>{' '}
                  <span 
                    ref={thresholdRef}
                    className="cursor-help bg-purple-200 border border-purple-400 px-1 rounded hover:bg-purple-300 transition-colors"
                    onMouseEnter={() => handleMouseEnter('threshold', thresholdRef)}
                    onMouseLeave={() => setHoveredTerm(null)}
                  >
                    Optimal classification threshold
                  </span>
                </div>
              </div>
            </div>

            {/* Learning Zones */}
            <div className="border-4 border-black rounded-xl p-6 bg-white shadow-lg">
              <h3 className="font-bold text-black mb-4 uppercase tracking-wide text-lg">Learning Zones:</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-600 border-2 border-black rounded-lg flex items-center justify-center">
                    <XCircle size={16} className="text-white" />
                  </div>
                  <span className="font-bold text-black font-mono">BELOW GA: Too difficult</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-yellow-600 border-2 border-black rounded-lg flex items-center justify-center">
                    <Target size={16} className="text-white" />
                  </div>
                  <span className="font-bold text-black font-mono">WITHIN GA: Perfect challenge (ZPD)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-600 border-2 border-black rounded-lg flex items-center justify-center">
                    <CheckCircle size={16} className="text-white" />
                  </div>
                  <span className="font-bold text-black font-mono">ABOVE GA: Too easy</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Student Status */}
          <div className="space-y-6">
            
            {/* Current Status */}
            <div className="border-4 border-black rounded-xl p-6 bg-white shadow-lg relative">
              <div className="absolute -top-6 left-4 px-3 py-1 bg-orange-600 text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                YOUR STATUS
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-orange-100 border-4 border-orange-600 rounded-xl flex items-center justify-center text-orange-700 font-bold text-2xl">
                  {(currentPrediction * 100).toFixed(0)}%
                </div>
                <div className="text-2xl font-bold text-black uppercase">
                  Model Prediction
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="border-4 border-green-600 bg-green-100 p-4 rounded-xl text-center">
                  <div className="font-bold text-green-800 text-sm uppercase tracking-wide">Correct</div>
                  <div className="text-3xl font-bold text-green-600 font-mono">{studentData.correctAnswers}</div>
                </div>
                <div className="border-4 border-red-600 bg-red-100 p-4 rounded-xl text-center">
                  <div className="font-bold text-red-800 text-sm uppercase tracking-wide">Incorrect</div>
                  <div className="text-3xl font-bold text-red-600 font-mono">{studentData.incorrectAnswers}</div>
                </div>
              </div>

              {/* Visual Grey Area Representation */}
              <div className="border-4 border-black rounded-xl p-4 bg-gray-50">
                <div className="font-bold text-black mb-3 uppercase tracking-wide text-sm">Grey Area Visualization</div>
                <div className="relative h-16 bg-gradient-to-r from-red-200 via-yellow-200 to-green-200 rounded-lg overflow-hidden border-4 border-black">
                  
                  {/* Grid lines */}
                  <div className="absolute inset-0 flex">
                    <div className="flex-1 border-r-2 border-black border-dashed"></div>
                    <div className="flex-1 border-r-2 border-black border-dashed"></div>
                    <div className="flex-1 border-r-2 border-black border-dashed"></div>
                    <div className="flex-1"></div>
                  </div>
                  
                  {/* Grey Area boundaries */}
                  <div 
                    className="absolute top-0 bottom-0 bg-black bg-opacity-20 border-4 border-black border-dashed"
                    style={{
                      left: `${lowerBoundary * 100}%`,
                      width: `${(upperBoundary - lowerBoundary) * 100}%`
                    }}
                  >
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black font-bold text-xs bg-white px-1 rounded border border-black">
                      GA
                    </div>
                  </div>
                  
                  {/* Current position indicator */}
                  <div 
                    className={`absolute top-0 bottom-0 w-2 transition-all duration-1000 border-2 border-black ${
                      animationStep % 2 === 0 ? 'bg-blue-600' : 'bg-blue-800'
                    }`}
                    style={{ left: `${currentPrediction * 100}%` }}
                  ></div>
                  
                  {/* Labels */}
                  <div className="absolute -bottom-8 left-0 text-xs text-black font-bold font-mono">0%</div>
                  <div className="absolute -bottom-8 left-1/4 text-xs text-black font-bold font-mono">25%</div>
                  <div className="absolute -bottom-8 left-1/2 text-xs text-black font-bold font-mono">50%</div>
                  <div className="absolute -bottom-8 left-3/4 text-xs text-black font-bold font-mono">75%</div>
                  <div className="absolute -bottom-8 right-0 text-xs text-black font-bold font-mono">100%</div>
                </div>
              </div>
            </div>

            {/* Status Message */}
            <div className={`border-4 border-black rounded-xl p-6 shadow-lg ${
              isInGreyArea 
                ? 'bg-yellow-100' 
                : currentPrediction > upperBoundary 
                  ? 'bg-green-100'
                  : 'bg-red-100'
            }`}>
              <div className={`flex items-center gap-4 mb-4 ${
                isInGreyArea 
                  ? 'text-yellow-800' 
                  : currentPrediction > upperBoundary 
                    ? 'text-green-800'
                    : 'text-red-800'
              }`}>
                <div className={`w-12 h-12 border-4 border-black rounded-xl flex items-center justify-center ${
                  isInGreyArea 
                    ? 'bg-yellow-600' 
                    : currentPrediction > upperBoundary 
                      ? 'bg-green-600'
                      : 'bg-red-600'
                }`}>
                  {isInGreyArea && <Target size={20} className="text-white" />}
                  {currentPrediction > upperBoundary && <CheckCircle size={20} className="text-white" />}
                  {currentPrediction < lowerBoundary && <XCircle size={20} className="text-white" />}
                </div>
                
                <div className="text-xl font-bold text-black uppercase tracking-wide">
                  {isInGreyArea ? 'In the ZPD!' :
                   currentPrediction > upperBoundary ? 'Above ZPD' :
                   'Below ZPD'}
                </div>
              </div>

              <div className="text-sm text-black font-mono space-y-1">
                {isInGreyArea ? (
                  <>
                    <div>Perfect learning zone activated</div>
                    <div>Scaffolding will be most effective</div>
                    <div>Maximum learning potential</div>
                  </>
                ) : currentPrediction > upperBoundary ? (
                  <>
                    <div>Ready for harder challenges</div>
                    <div>Can work independently</div>
                    <div>Time to level up</div>
                  </>
                ) : (
                  <>
                    <div>Tasks too challenging</div>
                    <div>Review fundamentals first</div>
                    <div>More scaffolding needed</div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="flex justify-center">
          <button
            onClick={() => scroll(29)}
            className="px-8 py-4 bg-gray-600 text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-gray-600 hover:border-gray-600 transition-all transform hover:scale-105 flex items-center gap-3"
          >
            <span>Next</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {hoveredTerm === 'greyArea' && <GreyAreaTooltip />}
      {hoveredTerm === 'zpd' && <ZPDTooltip />}
      {hoveredTerm === 'threshold' && <ThresholdTooltip />}
    </div>
  );
};