import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, XCircle, TrendingUp, Calculator, ArrowRight, BarChart3, Brain, Target, HelpCircle, Lightbulb, Code, Zap, Settings, Play, Pause, RotateCcw, BookOpen, Users, Sliders, Info } from 'lucide-react';

export const Slide29InteractiveGreyArea = ({ scroll }) => {
  const [threshold, setThreshold] = useState(0.5);
  const [greyAreaWidth, setGreyAreaWidth] = useState(0.5);
  const [selectedScenario, setSelectedScenario] = useState('beginner');
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPrediction, setCurrentPrediction] = useState(0.62);
  const [interactionCount, setInteractionCount] = useState(0);
  const [showThresholdTooltip, setShowThresholdTooltip] = useState(false);
  const [showWidthTooltip, setShowWidthTooltip] = useState(false);

  // Student scenarios for exploration
  const scenarios = {
    beginner: {
      name: 'Beginner Programmer',
      proficiency: 0.25,
      description: 'Just started learning Python basics',
      challenges: ['Variables', 'Print statements', 'Simple math'],
      color: 'red',
      details: 'Low skill level - needs lots of scaffolding'
    },
    intermediate: {
      name: 'Intermediate Student',
      proficiency: 0.65,
      description: 'Comfortable with loops and functions',
      challenges: ['Object-oriented programming', 'File handling', 'Error handling'],
      color: 'yellow',
      details: 'Medium skill level - in optimal learning zone'
    },
    advanced: {
      name: 'Advanced Learner',
      proficiency: 0.85,
      description: 'Ready for complex algorithms',
      challenges: ['Machine learning', 'Web frameworks', 'Database integration'],
      color: 'green',
      details: 'High skill level - ready for challenges'
    }
  };

  // Calculate grey area boundaries based on user settings
  const calculateBoundaries = () => {
    const widthFactor = greyAreaWidth;
    const upper = threshold + ((1 - threshold) * widthFactor);
    const lower = threshold - (threshold * widthFactor);
    return { upper: Math.min(upper, 0.95), lower: Math.max(lower, 0.05) };
  };

  const { upper, lower } = calculateBoundaries();
  const scenario = scenarios[selectedScenario];
  const isInGreyArea = currentPrediction >= lower && currentPrediction <= upper;

  // Track interactions for research
  const handleParameterChange = (param, value) => {
    setInteractionCount(prev => prev + 1);
    if (param === 'threshold') {
      setThreshold(value);
    } else if (param === 'width') {
      setGreyAreaWidth(value);
    }
  };

  // Simulation steps for understanding
  const simulationSteps = [
    {
      title: "Reset to Defaults",
      description: "Starting with standard threshold (0.5) and medium width (0.5)",
      action: () => {
        setThreshold(0.5);
        setGreyAreaWidth(0.5);
        setCurrentPrediction(scenario.proficiency);
      }
    },
    {
      title: "Lower Threshold",
      description: "Making it easier to be classified as 'likely to succeed'",
      action: () => setThreshold(0.3)
    },
    {
      title: "Widen Grey Area",
      description: "Creating a larger uncertainty zone around the threshold",
      action: () => setGreyAreaWidth(0.8)
    },
    {
      title: "Observe Changes",
      description: "See how the student's placement in learning zones has changed",
      action: () => {}
    }
  ];

  const runSimulation = () => {
    if (isPlaying) {
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    setCurrentStep(0);
    
    const runStep = (stepIndex) => {
      if (stepIndex >= simulationSteps.length) {
        setIsPlaying(false);
        return;
      }
      
      setCurrentStep(stepIndex);
      simulationSteps[stepIndex].action();
      
      setTimeout(() => {
        runStep(stepIndex + 1);
      }, 2500);
    };
    
    runStep(0);
  };

  const resetSimulation = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setThreshold(0.5);
    setGreyAreaWidth(0.5);
    setCurrentPrediction(scenario.proficiency);
  };

  // Get learning zone recommendation
  const getLearningZoneInfo = () => {
    if (isInGreyArea) {
      return {
        zone: 'Grey Area (ZPD)',
        color: 'yellow',
        meaning: 'Model is uncertain - perfect for learning!',
        action: 'Provide scaffolding and support',
        explanation: 'The model cannot confidently predict success or failure, indicating the student is at their optimal challenge level.'
      };
    } else if (currentPrediction > upper) {
      return {
        zone: 'Above Grey Area',
        color: 'green',
        meaning: 'Model predicts high success probability',
        action: 'Increase difficulty or move to new topics',
        explanation: 'The model is confident the student will succeed, suggesting the material may be too easy.'
      };
    } else {
      return {
        zone: 'Below Grey Area',
        color: 'red',
        meaning: 'Model predicts low success probability',
        action: 'Provide more support or review basics',
        explanation: 'The model is confident the student will struggle, suggesting the material is too difficult.'
      };
    }
  };

  const zoneInfo = getLearningZoneInfo();

  return (
    <div className="bg-white min-h-screen flex flex-col items-center py-8 px-4 md:px-10 text-black font-['IBM_Plex_Mono',monospace]">
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-8">
        
        {/* Header */}
        <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative">
          <div className="absolute -top-6 left-4 px-3 py-1 bg-purple-600 text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
            <Settings className="w-4 h-4" />
            INTERACTIVE EXPLORER
          </div>
          <div className="text-2xl md:text-4xl font-bold tracking-tight text-black text-center uppercase">
            Understanding Threshold & Grey Area Width
          </div>
          <div className="text-lg text-center mt-2 font-mono">
            See how parameter changes affect learning zones
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Left Column: Controls & Explanations */}
          <div className="space-y-6">
            
            {/* Threshold Explanation */}
            <div className="border-4 border-purple-600 rounded-xl p-6 bg-purple-50 shadow-lg relative">
              <div className="absolute -top-6 left-4 px-3 py-1 bg-purple-600 text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
                <Calculator className="w-4 h-4" />
                THRESHOLD
              </div>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-600 border-2 border-black rounded-lg flex items-center justify-center text-white font-bold text-xl">
                  T
                </div>
                <div className="text-lg font-bold text-black uppercase">
                  Classification Boundary
                </div>
              </div>
              
              <div className="space-y-3 text-sm text-black font-mono">
                <div className="bg-white border-2 border-purple-600 p-3 rounded-lg">
                  <div className="font-bold mb-2">What it means:</div>
                  <div>The probability cutoff for predicting student success</div>
                </div>
                
                <div className="bg-white border-2 border-purple-600 p-3 rounded-lg">
                  <div className="font-bold mb-2">Current value: {threshold.toFixed(2)}</div>
                  <div>
                    {threshold < 0.5 ? '• Lower bar for "likely to succeed"' :
                     threshold > 0.5 ? '• Higher bar for "likely to succeed"' :
                     '• Standard 50/50 classification'}
                  </div>
                </div>
                
                <div className="bg-white border-2 border-purple-600 p-3 rounded-lg">
                  <div className="font-bold mb-2">Effect on learning:</div>
                  <div>
                    {threshold < 0.4 ? 'More students appear "ready" - may miss struggling learners' :
                     threshold > 0.6 ? 'Fewer students appear "ready" - may over-support capable learners' :
                     'Balanced classification for most students'}
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <input
                  type="range"
                  min="0.1"
                  max="0.9"
                  step="0.05"
                  value={threshold}
                  onChange={(e) => handleParameterChange('threshold', parseFloat(e.target.value))}
                  className="w-full h-4 bg-purple-200 rounded-lg appearance-none cursor-pointer border-2 border-purple-600"
                />
                <div className="flex justify-between text-xs text-purple-700 mt-1 font-mono font-bold">
                  <span>Easy to Succeed</span>
                  <span>Hard to Succeed</span>
                </div>
              </div>
            </div>

            {/* Width Explanation */}
            <div className="border-4 border-gray-600 rounded-xl p-6 bg-gray-50 shadow-lg relative">
              <div className="absolute -top-6 left-4 px-3 py-1 bg-gray-600 text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
                <Sliders className="w-4 h-4" />
                GREY AREA WIDTH
              </div>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gray-600 border-2 border-black rounded-lg flex items-center justify-center text-white font-bold text-xl">
                  W
                </div>
                <div className="text-lg font-bold text-black uppercase">
                  Uncertainty Zone Size
                </div>
              </div>
              
              <div className="space-y-3 text-sm text-black font-mono">
                <div className="bg-white border-2 border-gray-600 p-3 rounded-lg">
                  <div className="font-bold mb-2">What it controls:</div>
                  <div>How wide the "uncertain" zone is around the threshold</div>
                </div>
                
                <div className="bg-white border-2 border-gray-600 p-3 rounded-lg">
                  <div className="font-bold mb-2">Current width: {greyAreaWidth.toFixed(1)}</div>
                  <div>Zone spans: {lower.toFixed(2)} to {upper.toFixed(2)}</div>
                  <div>Total range: {(upper - lower).toFixed(2)}</div>
                </div>
                
                <div className="bg-white border-2 border-gray-600 p-3 rounded-lg">
                  <div className="font-bold mb-2">Effect on learning:</div>
                  <div>
                    {greyAreaWidth < 0.3 ? 'Narrow zone - quick decisions, less personalization' :
                     greyAreaWidth > 0.7 ? 'Wide zone - more students get adaptive support' :
                     'Moderate zone - balanced approach'}
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <input
                  type="range"
                  min="0.1"
                  max="1.0"
                  step="0.1"
                  value={greyAreaWidth}
                  onChange={(e) => handleParameterChange('width', parseFloat(e.target.value))}
                  className="w-full h-4 bg-gray-200 rounded-lg appearance-none cursor-pointer border-2 border-gray-600"
                />
                <div className="flex justify-between text-xs text-gray-700 mt-1 font-mono font-bold">
                  <span>Narrow Uncertainty</span>
                  <span>Wide Uncertainty</span>
                </div>
              </div>
            </div>

            {/* Student Scenario Selector */}
            <div className="border-4 border-black rounded-xl p-6 bg-white shadow-lg relative">
              <div className="absolute -top-6 left-4 px-3 py-1 bg-blue-600 text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
                <Users className="w-4 h-4" />
                TEST STUDENT
              </div>
              
              <h3 className="font-bold text-black mb-4 uppercase tracking-wide">Select a Student to Analyze:</h3>
              <div className="space-y-3">
                {Object.entries(scenarios).map(([key, scenario]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setSelectedScenario(key);
                      setCurrentPrediction(scenario.proficiency);
                      setInteractionCount(prev => prev + 1);
                    }}
                    className={`w-full p-4 border-4 rounded-xl font-bold text-left transition-all ${
                      selectedScenario === key
                        ? `border-${scenario.color}-600 bg-${scenario.color}-100 text-${scenario.color}-800`
                        : 'border-gray-400 bg-gray-100 text-gray-800 hover:border-gray-600'
                    }`}
                  >
                    <div className="font-bold text-sm uppercase tracking-wide">{scenario.name}</div>
                    <div className="text-xs mt-1">{scenario.description}</div>
                    <div className="text-xs mt-1 font-mono">Model prediction: {(scenario.proficiency * 100).toFixed(0)}%</div>
                    <div className="text-xs mt-1 italic">{scenario.details}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Simulation Controls */}
            <div className="border-4 border-black rounded-xl p-6 bg-white shadow-lg">
              <h3 className="font-bold text-black mb-4 uppercase tracking-wide">Demo Simulation:</h3>
              <div className="flex gap-3 mb-4">
                <button
                  onClick={runSimulation}
                  className={`flex-1 px-4 py-3 border-4 border-black rounded-xl font-bold text-sm uppercase tracking-wide transition-all flex items-center justify-center gap-2 ${
                    isPlaying 
                      ? 'bg-red-600 text-white hover:bg-red-700' 
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isPlaying ? 'Stop' : 'Run Demo'}
                </button>
                <button
                  onClick={resetSimulation}
                  className="px-4 py-3 bg-gray-600 text-white border-4 border-black rounded-xl font-bold text-sm uppercase tracking-wide hover:bg-gray-700 transition-all flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
              </div>
              
              {isPlaying && (
                <div className="text-sm text-black font-mono border-4 border-blue-600 bg-blue-100 p-3 rounded-xl">
                  <div className="font-bold">Step {currentStep + 1}: {simulationSteps[currentStep]?.title}</div>
                  <div className="mt-1">{simulationSteps[currentStep]?.description}</div>
                </div>
              )}
            </div>
          </div>

          {/* Middle Column: Visualization */}
          <div className="space-y-6">
            
            {/* Main Visualization */}
            <div className="border-4 border-black rounded-xl p-6 bg-white shadow-lg relative">
              <div className="absolute -top-6 left-4 px-3 py-1 bg-green-600 text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                LEARNING ZONES
              </div>
              
              <div className="space-y-6">
                {/* Current Student Status */}
                <div className="text-center">
                  <div className={`inline-flex items-center gap-3 px-6 py-3 border-4 border-black rounded-xl ${
                    scenario.color === 'red' ? 'bg-red-100' :
                    scenario.color === 'yellow' ? 'bg-yellow-100' : 'bg-green-100'
                  }`}>
                    <div className={`w-8 h-8 border-2 border-black rounded-lg flex items-center justify-center ${
                      scenario.color === 'red' ? 'bg-red-600' :
                      scenario.color === 'yellow' ? 'bg-yellow-600' : 'bg-green-600'
                    }`}>
                      <Target size={16} className="text-white" />
                    </div>
                    <span className="font-bold text-black text-lg">{scenario.name}</span>
                    <span className="font-mono text-sm">({(currentPrediction * 100).toFixed(0)}% predicted success)</span>
                  </div>
                </div>

                {/* Parameter Values Display */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="border-4 border-purple-600 bg-purple-100 p-3 rounded-xl text-center">
                    <div className="font-bold text-purple-800 text-sm uppercase tracking-wide">Threshold</div>
                    <div className="text-2xl font-bold text-purple-600 font-mono">{threshold.toFixed(2)}</div>
                  </div>
                  <div className="border-4 border-gray-600 bg-gray-100 p-3 rounded-xl text-center">
                    <div className="font-bold text-gray-800 text-sm uppercase tracking-wide">Width</div>
                    <div className="text-2xl font-bold text-gray-600 font-mono">{greyAreaWidth.toFixed(1)}</div>
                  </div>
                </div>

                {/* Zone Boundaries */}
                <div className="border-4 border-black rounded-xl p-4 bg-gray-50">
                  <div className="font-bold text-black mb-2 uppercase tracking-wide text-sm">Calculated Boundaries:</div>
                  <div className="grid grid-cols-3 gap-2 text-xs font-mono text-center">
                    <div className="bg-red-200 border-2 border-red-600 p-2 rounded">
                      <div className="font-bold text-red-800">Below</div>
                      <div className="text-black">0% - {lower.toFixed(2)}</div>
                    </div>
                    <div className="bg-yellow-200 border-2 border-yellow-600 p-2 rounded">
                      <div className="font-bold text-yellow-800">Grey Area</div>
                      <div className="text-black">{lower.toFixed(2)} - {upper.toFixed(2)}</div>
                    </div>
                    <div className="bg-green-200 border-2 border-green-600 p-2 rounded">
                      <div className="font-bold text-green-800">Above</div>
                      <div className="text-black">{upper.toFixed(2)} - 100%</div>
                    </div>
                  </div>
                </div>

                {/* Visual Grey Area Representation */}
                <div className="border-4 border-black rounded-xl p-4 bg-gray-50">
                  <div className="font-bold text-black mb-3 uppercase tracking-wide text-sm">Visual Representation</div>
                  <div className="relative h-20 bg-gradient-to-r from-red-200 via-yellow-200 to-green-200 rounded-lg overflow-hidden border-4 border-black">
                    
                    {/* Grey Area boundaries */}
                    <div 
                      className="absolute top-0 bottom-0 bg-black bg-opacity-30 border-4 border-black border-dashed transition-all duration-500"
                      style={{
                        left: `${lower * 100}%`,
                        width: `${(upper - lower) * 100}%`
                      }}
                    >
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black font-bold text-sm bg-white px-2 py-1 rounded border-2 border-black">
                        GREY AREA
                      </div>
                    </div>
                    
                    {/* Threshold line */}
                    <div 
                      className="absolute top-0 bottom-0 w-1 bg-purple-600 border-2 border-purple-800 transition-all duration-500"
                      style={{ left: `${threshold * 100}%` }}
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-purple-600 font-bold text-xs bg-white px-1 rounded border border-purple-600">
                        T
                      </div>
                    </div>
                    
                    {/* Student position */}
                    <div 
                      className="absolute top-0 bottom-0 w-3 bg-blue-600 border-2 border-blue-800 transition-all duration-500"
                      style={{ left: `${currentPrediction * 100}%` }}
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-blue-600 font-bold text-xs bg-white px-1 rounded border border-blue-600">
                        S
                      </div>
                    </div>
                    
                    {/* Scale labels */}
                    <div className="absolute -bottom-10 left-0 text-xs text-black font-bold font-mono">0%</div>
                    <div className="absolute -bottom-10 left-1/4 transform -translate-x-1/2 text-xs text-black font-bold font-mono">25%</div>
                    <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-xs text-black font-bold font-mono">50%</div>
                    <div className="absolute -bottom-10 left-3/4 transform -translate-x-1/2 text-xs text-black font-bold font-mono">75%</div>
                    <div className="absolute -bottom-10 right-0 text-xs text-black font-bold font-mono">100%</div>
                  </div>
                  
                  <div className="mt-4 text-xs text-gray-600 font-mono">
                    T = Threshold, S = Student, Grey Area = Uncertainty Zone
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Results & Interpretation */}
          <div className="space-y-6">
            
            {/* Current Analysis */}
            <div className={`border-4 border-black rounded-xl p-6 shadow-lg transition-all duration-500 ${
              zoneInfo.color === 'yellow' 
                ? 'bg-yellow-100 border-yellow-600' 
                : zoneInfo.color === 'green' 
                  ? 'bg-green-100 border-green-600'
                  : 'bg-red-100 border-red-600'
            }`}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 border-2 border-black rounded-lg flex items-center justify-center ${
                  zoneInfo.color === 'yellow' 
                    ? 'bg-yellow-600' 
                    : zoneInfo.color === 'green' 
                      ? 'bg-green-600'
                      : 'bg-red-600'
                }`}>
                  {zoneInfo.color === 'yellow' && <Target size={20} className="text-white" />}
                  {zoneInfo.color === 'green' && <CheckCircle size={20} className="text-white" />}
                  {zoneInfo.color === 'red' && <XCircle size={20} className="text-white" />}
                </div>
                
                <div className="text-xl font-bold text-black uppercase tracking-wide">
                  {zoneInfo.zone}
                </div>
              </div>
              
              <div className="space-y-3 text-sm text-black font-mono">
                <div className="bg-white border-2 border-gray-600 p-3 rounded-lg">
                  <div className="font-bold mb-2">Model's Assessment:</div>
                  <div>{zoneInfo.meaning}</div>
                </div>
                
                <div className="bg-white border-2 border-gray-600 p-3 rounded-lg">
                  <div className="font-bold mb-2">Recommended Action:</div>
                  <div>{zoneInfo.action}</div>
                </div>
                
                <div className="bg-white border-2 border-gray-600 p-3 rounded-lg">
                  <div className="font-bold mb-2">Why This Matters:</div>
                  <div>{zoneInfo.explanation}</div>
                </div>
              </div>
            </div>

            {/* Parameter Effects Summary */}
            <div className="border-4 border-black rounded-xl p-6 bg-white shadow-lg">
              <h3 className="font-bold text-black mb-4 uppercase tracking-wide flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                Key Insights
              </h3>
              
              <div className="space-y-4">
                <div className="border-4 border-purple-600 bg-purple-100 p-4 rounded-xl">
                  <div className="font-bold text-purple-800 mb-2 uppercase text-sm">Threshold Effect</div>
                  <div className="text-sm text-black font-mono">
                    {threshold < 0.4 ? 'Lower threshold = More students seem "ready" = Risk of under-supporting' :
                     threshold > 0.6 ? 'Higher threshold = Fewer students seem "ready" = Risk of over-supporting' :
                     'Balanced threshold = Standard classification approach'}
                  </div>
                </div>
                
                <div className="border-4 border-gray-600 bg-gray-100 p-4 rounded-xl">
                  <div className="font-bold text-gray-800 mb-2 uppercase text-sm">Width Effect</div>
                  <div className="text-sm text-black font-mono">
                    {greyAreaWidth < 0.3 ? 'Narrow width = Quick decisions, less adaptive support' :
                     greyAreaWidth > 0.7 ? 'Wide width = More students get personalized attention' :
                     'Medium width = Balanced approach to uncertainty'}
                  </div>
                </div>

                <div className="border-4 border-blue-600 bg-blue-100 p-4 rounded-xl">
                  <div className="font-bold text-blue-800 mb-2 uppercase text-sm">Current Setup</div>
                  <div className="text-sm text-black font-mono">
                    With T={threshold.toFixed(2)} and W={greyAreaWidth.toFixed(1)}, this {scenario.name.toLowerCase()} is {isInGreyArea ? 'in the optimal learning zone' : zoneInfo.color === 'green' ? 'ready for harder challenges' : 'struggling and needs support'}.
                  </div>
                </div>
              </div>
            </div>

            {/* Zone Comparison */}
            <div className="border-4 border-black rounded-xl p-6 bg-white shadow-lg">
              <h3 className="font-bold text-black mb-4 uppercase tracking-wide">Learning Zone Guide:</h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 border-4 border-red-600 bg-red-100 rounded-xl">
                  <XCircle size={20} className="text-red-600" />
                  <div>
                    <div className="font-bold text-red-800 text-sm">BELOW GREY AREA</div>
                    <div className="text-xs text-black font-mono">Too difficult - provide scaffolding</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 border-4 border-yellow-600 bg-yellow-100 rounded-xl">
                  <Target size={20} className="text-yellow-600" />
                  <div>
                    <div className="font-bold text-yellow-800 text-sm">IN GREY AREA (ZPD)</div>
                    <div className="text-xs text-black font-mono">Perfect challenge - adaptive support</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 border-4 border-green-600 bg-green-100 rounded-xl">
                  <CheckCircle size={20} className="text-green-600" />
                  <div>
                    <div className="font-bold text-green-800 text-sm">ABOVE GREY AREA</div>
                    <div className="text-xs text-black font-mono">Too easy - provide scaffolding</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}