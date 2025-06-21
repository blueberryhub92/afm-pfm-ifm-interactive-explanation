import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, XCircle, TrendingUp, Calculator, ArrowRight, BarChart3, Brain, Target, HelpCircle, Lightbulb } from 'lucide-react';

export const Slide25GreyArea = ({ scroll }) => {
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
      className="fixed z-50 bg-gradient-to-br from-gray-50 to-blue-50 border border-gray-300 rounded-lg shadow-xl p-4 w-96"
      style={{ 
        left: `${tooltipPosition.x}px`, 
        top: `${tooltipPosition.y}px`,
        maxWidth: '384px'
      }}
    >
      <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
        <Brain size={18} className="mr-2 text-gray-600" />
        The Grey Area Approach
      </h4>
      
      <div className="bg-gray-100 p-3 rounded-lg mb-3 font-mono text-sm">
        <div className="text-gray-800 font-semibold mb-2">Grey Area Formula:</div>
        <div className="bg-white p-2 rounded border space-y-1">
          <div>Upper: opt_t + ((1 - opt_t)/2)</div>
          <div>Lower: opt_t - (opt_t/2)</div>
        </div>
      </div>
      
      <div className="space-y-2 text-sm text-gray-700">
        <div><strong>opt_t:</strong> Optimal classification threshold</div>
        <div><strong>Upper Boundary:</strong> {upperBoundary.toFixed(3)}</div>
        <div><strong>Lower Boundary:</strong> {lowerBoundary.toFixed(3)}</div>
      </div>
      
      <div className="bg-blue-50 p-3 rounded-lg mt-3">
        <p className="text-blue-800 text-sm font-medium">
          <strong>Purpose:</strong> The Grey Area identifies when a student model is uncertain about performance, potentially indicating they're in their Zone of Proximal Development.
        </p>
      </div>
    </div>
  );

  const ZPDTooltip = () => (
    <div 
      className="fixed z-50 bg-gradient-to-br from-green-50 to-yellow-50 border border-green-200 rounded-lg shadow-xl p-4 w-80"
      style={{ 
        left: `${tooltipPosition.x}px`, 
        top: `${tooltipPosition.y}px`,
        maxWidth: '320px'
      }}
    >
      <h4 className="font-semibold text-green-800 mb-3 flex items-center">
        <Target size={18} className="mr-2" />
        Zone of Proximal Development (ZPD)
      </h4>
      
      <div className="space-y-3">
        <p className="text-sm text-green-700">
          Introduced by Vygotsky, ZPD is the difference between what a learner can do independently and what they can accomplish with guidance.
        </p>
        
        <div className="space-y-2">
          <div className="bg-red-100 p-2 rounded text-xs">
            <strong>Below ZPD:</strong> Too difficult - student struggles even with help
          </div>
          <div className="bg-yellow-100 p-2 rounded text-xs">
            <strong>Within ZPD:</strong> Perfect challenge - learning happens with scaffolding
          </div>
          <div className="bg-green-100 p-2 rounded text-xs">
            <strong>Above ZPD:</strong> Too easy - student can do it independently
          </div>
        </div>
      </div>
      
      <p className="text-xs text-gray-600 mt-3">
        The Grey Area computationally approximates the ZPD by identifying uncertainty in model predictions.
      </p>
    </div>
  );

  const ThresholdTooltip = () => (
    <div 
      className="fixed z-50 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-lg shadow-xl p-4 w-80"
      style={{ 
        left: `${tooltipPosition.x}px`, 
        top: `${tooltipPosition.y}px`,
        maxWidth: '320px'
      }}
    >
      <h4 className="font-semibold text-purple-800 mb-3">Optimal Classification Threshold</h4>
      
      <div className="space-y-3">
        <p className="text-sm text-purple-700">
          The threshold that maximizes the sum of true positive and true negative rates using ROC curve analysis.
        </p>
        
        <div className="bg-white p-2 rounded border text-xs font-mono">
          <div>If P(correct) ≥ {optimalThreshold}: Predict Success</div>
          <div>If P(correct) &lt; {optimalThreshold}: Predict Failure</div>
        </div>
        
        <div className="text-xs text-gray-600">
          <strong>Current Threshold:</strong> {optimalThreshold} (50% cutoff for demo)
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative max-w-4xl w-full space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">The Grey Area: Computational ZPD</h2>
        <p className="text-lg text-gray-600">Where uncertainty meets optimal learning</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Concept Explanation */}
        <div className="space-y-6">
          <p className="text-lg text-gray-700 leading-relaxed">
            The{' '}
            <span 
              ref={greyAreaRef}
              className="relative cursor-help border-b-2 border-dotted border-gray-500 text-gray-600 font-semibold"
              onMouseEnter={() => handleMouseEnter('greyArea', greyAreaRef)}
              onMouseLeave={() => setHoveredTerm(null)}
            >
              Grey Area
            </span>
            {' '}is a computational approach to identify a student's{' '}
            <span 
              ref={zpdRef}
              className="relative cursor-help border-b-2 border-dotted border-green-500 text-green-600 font-semibold"
              onMouseEnter={() => handleMouseEnter('zpd', zpdRef)}
              onMouseLeave={() => setHoveredTerm(null)}
            >
              Zone of Proximal Development
            </span>
            . It represents the region where our student model is most uncertain about predicting success.
          </p>

          <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-400">
            <h3 className="font-semibold text-blue-800 mb-3 flex items-center">
              <Calculator size={20} className="mr-2" />
              Grey Area Calculation
            </h3>
            
            <div className="space-y-3">
              <div className="bg-white p-3 rounded border font-mono text-sm">
                <div className="text-blue-800 font-semibold mb-2">Boundary Formulas:</div>
                <div className="space-y-1">
                  <div>Upper = opt_t + ((1 - opt_t) / 2)</div>
                  <div>Lower = opt_t - (opt_t / 2)</div>
                </div>
              </div>
              
              <div className="text-sm text-blue-700 space-y-1">
                <div><strong>opt_t:</strong>{' '}
                  <span 
                    ref={thresholdRef}
                    className="cursor-help border-b border-dotted border-purple-400"
                    onMouseEnter={() => handleMouseEnter('threshold', thresholdRef)}
                    onMouseLeave={() => setHoveredTerm(null)}
                  >
                    Optimal classification threshold
                  </span>
                  {' '}= {optimalThreshold}
                </div>
                <div><strong>Upper Boundary:</strong> {upperBoundary.toFixed(3)}</div>
                <div><strong>Lower Boundary:</strong> {lowerBoundary.toFixed(3)}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">Three Learning Zones:</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-400 rounded mr-2"></div>
                <span><strong>Below GA:</strong> Too difficult, even with help</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-yellow-400 rounded mr-2"></div>
                <span><strong>Within GA:</strong> Perfect challenge zone (ZPD)</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-400 rounded mr-2"></div>
                <span><strong>Above GA:</strong> Too easy, can do independently</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Student Status Visualization */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border-2 border-gray-200 shadow-lg">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
              <BarChart3 size={20} className="mr-2 text-blue-600" />
              Your Current Status
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-green-50 p-3 rounded">
                  <div className="font-medium text-green-800">Correct Answers</div>
                  <div className="text-2xl font-bold text-green-600">{studentData.correctAnswers}</div>
                </div>
                <div className="bg-red-50 p-3 rounded">
                  <div className="font-medium text-red-800">Incorrect Answers</div>
                  <div className="text-2xl font-bold text-red-600">{studentData.incorrectAnswers}</div>
                </div>
              </div>

              <div className="bg-blue-50 p-3 rounded">
                <div className="font-medium text-blue-800 mb-2">Model Prediction</div>
                <div className="text-3xl font-bold text-blue-600">{(currentPrediction * 100).toFixed(1)}%</div>
                <div className="text-sm text-blue-600">Probability of success</div>
              </div>

              {/* Visual Grey Area Representation */}
              <div className="relative">
                <div className="font-medium text-gray-800 mb-2">Grey Area Visualization</div>
                <div className="relative h-12 bg-gradient-to-r from-red-200 via-yellow-200 to-green-200 rounded-lg overflow-hidden">
                  {/* Probability markers */}
                  <div className="absolute inset-0 flex">
                    <div className="flex-1 border-r border-gray-300"></div>
                    <div className="flex-1 border-r border-gray-300"></div>
                    <div className="flex-1 border-r border-gray-300"></div>
                    <div className="flex-1"></div>
                  </div>
                  
                  {/* Grey Area boundaries */}
                  <div 
                    className="absolute top-0 bottom-0 bg-gray-400 bg-opacity-30 border-2 border-gray-600 border-dashed"
                    style={{
                      left: `${lowerBoundary * 100}%`,
                      width: `${(upperBoundary - lowerBoundary) * 100}%`
                    }}
                  ></div>
                  
                  {/* Current position indicator */}
                  <div 
                    className={`absolute top-0 bottom-0 w-1 transition-all duration-1000 ${
                      animationStep % 2 === 0 ? 'bg-blue-600' : 'bg-blue-800'
                    }`}
                    style={{ left: `${currentPrediction * 100}%` }}
                  ></div>
                  
                  {/* Labels */}
                  <div className="absolute -bottom-6 left-0 text-xs text-gray-600">0%</div>
                  <div className="absolute -bottom-6 left-1/4 text-xs text-gray-600">25%</div>
                  <div className="absolute -bottom-6 left-1/2 text-xs text-gray-600">50%</div>
                  <div className="absolute -bottom-6 left-3/4 text-xs text-gray-600">75%</div>
                  <div className="absolute -bottom-6 right-0 text-xs text-gray-600">100%</div>
                </div>
                
                <div className="mt-8 text-center">
                  <div className={`inline-flex items-center px-4 py-2 rounded-lg font-semibold text-lg ${
                    isInGreyArea 
                      ? 'bg-yellow-100 text-yellow-800 border-2 border-yellow-400' 
                      : currentPrediction > upperBoundary 
                        ? 'bg-green-100 text-green-800 border-2 border-green-400'
                        : 'bg-red-100 text-red-800 border-2 border-red-400'
                  }`}>
                    {isInGreyArea && <Target size={20} className="mr-2" />}
                    {currentPrediction > upperBoundary && <CheckCircle size={20} className="mr-2" />}
                    {currentPrediction < lowerBoundary && <XCircle size={20} className="mr-2" />}
                    
                    {isInGreyArea ? 'In the ZPD! Perfect for learning' :
                     currentPrediction > upperBoundary ? 'Above ZPD - Ready for harder challenges' :
                     'Below ZPD - Need more foundational work'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
            <h4 className="font-semibold text-purple-800 mb-2 flex items-center">
              <Lightbulb size={18} className="mr-2" />
              Learning Implications
            </h4>
            <div className="text-sm text-purple-700 space-y-2">
              {isInGreyArea ? (
                <>
                  <p>🎯 <strong>You're in the optimal learning zone!</strong></p>
                  <p>• Tasks are appropriately challenging</p>
                  <p>• Hints and scaffolding will be most effective</p>
                  <p>• This is where the most learning happens</p>
                </>
              ) : currentPrediction > upperBoundary ? (
                <>
                  <p>✅ <strong>Tasks might be too easy for you</strong></p>
                  <p>• Consider more challenging problems</p>
                  <p>• You can likely work independently</p>
                  <p>• Ready to move to advanced topics</p>
                </>
              ) : (
                <>
                  <p>⚠️ <strong>Current tasks are too challenging</strong></p>
                  <p>• Review fundamental concepts first</p>
                  <p>• Break problems into smaller steps</p>
                  <p>• More scaffolding needed</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={() => scroll(26)}
          className="px-8 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          Next →
        </button>
      </div>

      {hoveredTerm === 'greyArea' && <GreyAreaTooltip />}
      {hoveredTerm === 'zpd' && <ZPDTooltip />}
      {hoveredTerm === 'threshold' && <ThresholdTooltip />}
    </div>
  );
};