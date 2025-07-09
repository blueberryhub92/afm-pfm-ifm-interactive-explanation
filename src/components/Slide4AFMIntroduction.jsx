import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, TrendingDown, ArrowRight, Brain, Target, Activity, Lightbulb, Code, Zap, ArrowDownRight } from 'lucide-react';

export const Slide4AFMIntroduction = ({ scroll }) => {
  const [hoveredTerm, setHoveredTerm] = useState(null);
  const [baselineProficiency] = useState(0.15); // θ (theta) - starting baseline
  const [probability, setProbability] = useState(0.15);
  const [taskRecommendation, setTaskRecommendation] = useState('');
  const [difficultyLevel, setDifficultyLevel] = useState('Easy');
  const [currentTask, setCurrentTask] = useState(1);
  const [maxTasks] = useState(8);
  
  const baselineRef = useRef(null);
  const successRef = useRef(null);

  // Simulate realistic AFM learning progression
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTask(prev => {
        const nextTask = prev >= maxTasks ? 1 : prev + 1;
        
        // Realistic AFM progression: start from baseline θ, grow with each opportunity
        const baseGrowth = nextTask * 0.08; // Each task adds ~8% base growth
        const randomVariation = (Math.random() - 0.3) * 0.06; // Small random component, slightly negative bias
        const newProbability = Math.max(0.12, Math.min(0.88, baselineProficiency + baseGrowth + randomVariation));
        
        setProbability(newProbability);
        return nextTask;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [maxTasks, baselineProficiency]);

  // Update task recommendations based on probability
  useEffect(() => {
    if (probability < 0.3) {
      setTaskRecommendation('Review basic concepts');
      setDifficultyLevel('Easy');
    } else if (probability < 0.6) {
      setTaskRecommendation('Practice similar problems');
      setDifficultyLevel('Medium');
    } else if (probability < 0.8) {
      setTaskRecommendation('Try advanced variations');
      setDifficultyLevel('Hard');
    } else {
      setTaskRecommendation('Challenge with complex tasks');
      setDifficultyLevel('Expert');
    }
  }, [probability]);

  const handleMouseEnter = (term) => {
    setHoveredTerm(term);
  };

  const BaselineProficiencyTooltip = () => (
    <div className="fixed z-50 top-8 right-4 bg-white border-2 border-black shadow-lg p-6 w-96 font-mono">
      {/* Technical corner brackets */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black"></div>
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-black"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-black"></div>
      
      <div className="absolute -top-4 left-4 px-3 py-1 bg-black text-white font-mono text-xs tracking-wider border border-white">
        BASELINE PROFICIENCY (θ)
      </div>
      
      <h4 className="font-bold text-black mb-4 text-lg uppercase tracking-wider">AFM BASELINE DETERMINATION</h4>
      
      <p className="text-black text-sm leading-relaxed mb-4 font-mono">
        SYSTEM ESTIMATES BASELINE PROFICIENCY VIA MULTIPLE PARAMETERS:
      </p>
      
      <div className="space-y-3 text-sm font-mono">
        <div className="border-2 border-black p-2 bg-white">
          <span className="text-black font-bold">PRIOR ASSESSMENTS:</span> PREVIOUS SKILL PERFORMANCE
        </div>
        <div className="border-2 border-black p-2 bg-white">
          <span className="text-black font-bold">SELF-REPORTED:</span> DECLARED PYTHON FAMILIARITY
        </div>
        <div className="border-2 border-black p-2 bg-white">
          <span className="text-black font-bold">DEMOGRAPHICS:</span> EDUCATION & PROGRAMMING BACKGROUND
        </div>
        <div className="border-2 border-black p-2 bg-white">
          <span className="text-black font-bold">DIAGNOSTIC TESTS:</span> RAPID SKILLS ASSESSMENT
        </div>
      </div>
      
      <button
        onClick={() => setHoveredTerm(null)}
        className="absolute top-2 right-2 w-6 h-6 border-2 border-black bg-white text-black font-bold hover:bg-black hover:text-white transition-colors font-mono"
      >
        X
      </button>
    </div>
  );

  return (
    <div className="bg-white min-h-screen font-mono relative">
      {/* Grid background */}
      <div 
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: 'linear-gradient(to right, #d1d5db 1px, transparent 1px), linear-gradient(to bottom, #d1d5db 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />
      
      <div className="relative flex flex-col items-center justify-center py-8 px-4 md:px-10 text-black">
        <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">

          {/* Adaptive Learning Block */}
          <div className="border-2 border-black p-8 bg-white shadow-lg relative">
            {/* Technical corner brackets */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-black"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-black"></div>
            
            <div className="absolute -top-4 left-6 px-3 py-1 bg-black text-white font-mono text-xs tracking-wider border border-white">
              ADAPTIVE LEARNING SYSTEM
            </div>
            
            <div className="space-y-6 text-lg font-mono leading-relaxed">
              <p className="text-black">
                SUCCESS PROBABILITY ENABLES <span className="bg-white border-2 border-black px-2 py-1 font-bold uppercase">ADAPTIVE LEARNING</span> – 
                AUTOMATIC DIFFICULTY ADJUSTMENT BASED ON PREDICTED PERFORMANCE METRICS.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border-2 border-black p-4 bg-white relative">
                  <div className="absolute top-1 right-1 w-2 h-2 border border-black bg-white"></div>
                  <div className="font-bold text-black text-center mb-2 uppercase tracking-wider">LOW (&lt;30%)</div>
                  <div className="text-sm text-black text-center font-mono">EASIER TASKS • CONFIDENCE BUILDING</div>
                </div>
                <div className="border-2 border-black p-4 bg-white relative">
                  <div className="absolute top-1 right-1 w-2 h-2 border border-black bg-white"></div>
                  <div className="font-bold text-black text-center mb-2 uppercase tracking-wider">MEDIUM (30-80%)</div>
                  <div className="text-sm text-black text-center font-mono">BALANCED PRACTICE • SKILL DEVELOPMENT</div>
                </div>
                <div className="border-2 border-black p-4 bg-white relative">
                  <div className="absolute top-1 right-1 w-2 h-2 border border-black bg-white"></div>
                  <div className="font-bold text-black text-center mb-2 uppercase tracking-wider">HIGH (&gt;80%)</div>
                  <div className="text-sm text-black text-center font-mono">CHALLENGING PROBLEMS • ACCELERATION</div>
                </div>
              </div>
            </div>
          </div>

          {/* Parameters Block */}
          <div className="border-2 border-black p-8 bg-white shadow-lg relative">
            {/* Technical corner brackets */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-black"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-black"></div>
            
            <div className="absolute -top-4 left-6 px-3 py-1 bg-black text-white font-mono text-xs tracking-wider border border-white">
              PARAMETER ANALYSIS
            </div>
            
            <div className="space-y-6 text-lg font-mono leading-relaxed">
              <div className="border border-black p-1 inline-block">
                <h3 className="font-bold text-lg text-black tracking-wider uppercase px-2">
                  SYSTEM IDENTIFICATION
                </h3>
              </div>
              
              <div className="border border-black p-4 bg-gray-50">
                <p className="text-black leading-relaxed font-mono text-sm">
                  First <span className="bg-purple-200 px-1 border border-black font-bold">AFM PARAMETER</span> is <span className="bg-yellow-200 px-1 border border-black font-bold">θ (THETA)</span>, representing{' '}
                  <span 
                    ref={baselineRef}
                    className="cursor-pointer bg-blue-200 px-1 border border-black font-bold hover:bg-blue-300 transition-colors"
                    onMouseEnter={() => handleMouseEnter('baseline-proficiency')}
                    onMouseLeave={() => setHoveredTerm(null)}
                  >
                    BASELINE PROFICIENCY
                  </span>
                  . Model estimates <span className="bg-green-200 px-1 border border-black font-bold">ABILITY</span> before specific <span className="bg-red-200 px-1 border border-black font-bold">SKILL EXECUTION</span>. <span className="bg-purple-200 px-1 border border-black font-bold">AFM</span> formula construction proceeding in <span className="bg-orange-200 px-1 border border-black font-bold">LOWER RIGHT QUADRANT</span>.
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Control */}
          <div className="text-center">
            <button
              onClick={() => scroll(5)}
              className="px-12 py-4 bg-black text-white border-2 border-black font-bold text-xl uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-200 shadow-lg font-mono relative"
            >
              {/* Technical corner marker */}
              <div className="absolute top-1 right-1 w-2 h-2 border border-white bg-black"></div>
              NEXT MODULE →
            </button>
          </div>
        </div>

        {/* Tooltip System */}
        {hoveredTerm === 'baseline-proficiency' && <BaselineProficiencyTooltip />}
      </div>
    </div>
  );
};