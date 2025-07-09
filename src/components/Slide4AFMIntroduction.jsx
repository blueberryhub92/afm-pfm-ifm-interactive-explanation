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
    <div className="fixed z-50 top-8 right-4 bg-gray-800 border-4 border-cyan-400 p-6 w-96 font-mono pixel-shadow">
      {/* Pixel corner brackets */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-cyan-400"></div>
      <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-cyan-400"></div>
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-cyan-400"></div>
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-cyan-400"></div>
      
      <div className="absolute -top-6 left-4 bg-yellow-400 text-black px-4 py-2 font-mono text-xs tracking-wider border-2 border-yellow-300 pixel-shadow">
        BASELINE PROFICIENCY (θ)
      </div>
      
      {/* Retro scan lines effect */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
        }}
      />
      
      <h4 className="font-bold text-cyan-400 mb-4 text-lg uppercase tracking-wider pixel-text">AFM BASELINE DETERMINATION</h4>
      
      <p className="text-green-400 text-sm leading-relaxed mb-4 font-mono pixel-text">
        &gt; SYSTEM ESTIMATES BASELINE PROFICIENCY VIA MULTIPLE PARAMETERS:
      </p>
      
      <div className="space-y-3 text-sm font-mono">
        <div className="border-2 border-blue-400 p-2 bg-gray-700 pixel-shadow">
          <span className="text-yellow-400 font-bold">PRIOR ASSESSMENTS:</span> <span className="text-white">PREVIOUS SKILL PERFORMANCE</span>
        </div>
        <div className="border-2 border-purple-400 p-2 bg-gray-700 pixel-shadow">
          <span className="text-yellow-400 font-bold">SELF-REPORTED:</span> <span className="text-white">DECLARED PYTHON FAMILIARITY</span>
        </div>
        <div className="border-2 border-red-400 p-2 bg-gray-700 pixel-shadow">
          <span className="text-yellow-400 font-bold">DEMOGRAPHICS:</span> <span className="text-white">EDUCATION & PROGRAMMING BACKGROUND</span>
        </div>
        <div className="border-2 border-green-400 p-2 bg-gray-700 pixel-shadow">
          <span className="text-yellow-400 font-bold">DIAGNOSTIC TESTS:</span> <span className="text-white">RAPID SKILLS ASSESSMENT</span>
        </div>
      </div>
      
      <button
        onClick={() => setHoveredTerm(null)}
        className="absolute top-2 right-2 w-8 h-8 border-2 border-red-400 bg-red-600 text-white font-bold hover:bg-red-700 transition-colors font-mono pixel-shadow"
      >
        X
      </button>
    </div>
  );

  return (
    <div className="bg-gray-900 min-h-screen font-mono relative overflow-hidden">
      {/* Pixel grid background */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'linear-gradient(to right, #1f2937 1px, transparent 1px), linear-gradient(to bottom, #1f2937 1px, transparent 1px)',
          backgroundSize: '8px 8px'
        }}
      />
      
      {/* Animated pixel stars */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      <div className="relative flex flex-col items-center justify-center py-8 px-4 md:px-10 text-white">
        <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">

          {/* Adaptive Learning Block */}
          <div className="border-4 border-cyan-400 p-8 bg-gray-800 pixel-shadow relative">
            {/* Pixel corner brackets */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-cyan-400"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-cyan-400"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-cyan-400"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-cyan-400"></div>
            
            <div className="absolute -top-6 left-6 bg-yellow-400 text-black px-4 py-2 font-mono text-xs tracking-wider border-2 border-yellow-300 pixel-shadow">
              ADAPTIVE LEARNING SYSTEM
            </div>
            
            {/* Retro scan lines effect */}
            <div 
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
              }}
            />
            
            <div className="space-y-6 text-lg font-mono leading-relaxed relative z-10">
              <p className="text-green-400 pixel-text">
                &gt; SUCCESS PROBABILITY ENABLES <span className="bg-purple-600 border-2 border-purple-400 px-2 py-1 font-bold uppercase text-white pixel-shadow">ADAPTIVE LEARNING</span> – 
                AUTOMATIC DIFFICULTY ADJUSTMENT BASED ON PREDICTED PERFORMANCE METRICS.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border-4 border-red-400 p-4 bg-red-600 relative pixel-shadow">
                  <div className="absolute top-1 right-1 w-3 h-3 bg-white opacity-60" />
                  <div className="font-bold text-white text-center mb-2 uppercase tracking-wider pixel-text">LOW (&lt;30%)</div>
                  <div className="text-sm text-white text-center font-mono">EASIER TASKS • CONFIDENCE BUILDING</div>
                </div>
                <div className="border-4 border-yellow-400 p-4 bg-yellow-600 relative pixel-shadow">
                  <div className="absolute top-1 right-1 w-3 h-3 bg-white opacity-60" />
                  <div className="font-bold text-white text-center mb-2 uppercase tracking-wider pixel-text">MEDIUM (30-80%)</div>
                  <div className="text-sm text-white text-center font-mono">BALANCED PRACTICE • SKILL DEVELOPMENT</div>
                </div>
                <div className="border-4 border-green-400 p-4 bg-green-600 relative pixel-shadow">
                  <div className="absolute top-1 right-1 w-3 h-3 bg-white opacity-60" />
                  <div className="font-bold text-white text-center mb-2 uppercase tracking-wider pixel-text">HIGH (&gt;80%)</div>
                  <div className="text-sm text-white text-center font-mono">CHALLENGING PROBLEMS • ACCELERATION</div>
                </div>
              </div>
            </div>
          </div>

          {/* Parameters Block */}
          <div className="border-4 border-purple-400 p-8 bg-gray-800 pixel-shadow relative">
            {/* Pixel corner brackets */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-purple-400"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-purple-400"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-purple-400"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-purple-400"></div>
            
            <div className="absolute -top-6 left-6 bg-yellow-400 text-black px-4 py-2 font-mono text-xs tracking-wider border-2 border-yellow-300 pixel-shadow">
              PARAMETER ANALYSIS
            </div>
            
            {/* Retro scan lines effect */}
            <div 
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
              }}
            />
            
            <div className="space-y-6 text-lg font-mono leading-relaxed relative z-10">
              <div className="border-2 border-cyan-400 bg-cyan-400 p-2 inline-block pixel-shadow">
                <h3 className="font-bold text-lg text-black tracking-wider uppercase px-2 pixel-text">
                  SYSTEM IDENTIFICATION
                </h3>
              </div>
              
              <div className="border-4 border-blue-400 p-4 bg-gray-700 pixel-shadow">
                <p className="text-green-400 leading-relaxed font-mono text-sm pixel-text">
                  &gt; First <span className="bg-purple-600 border-2 border-purple-400 px-1 font-bold text-white pixel-shadow">AFM PARAMETER</span> is <span className="bg-yellow-600 border-2 border-yellow-400 px-1 font-bold text-white pixel-shadow">θ (THETA)</span>, representing{' '}
                  <span 
                    ref={baselineRef}
                    className="cursor-pointer bg-blue-600 border-2 border-blue-400 px-1 font-bold text-white hover:bg-blue-700 transition-colors pixel-shadow"
                    onMouseEnter={() => handleMouseEnter('baseline-proficiency')}
                    onMouseLeave={() => setHoveredTerm(null)}
                  >
                    BASELINE PROFICIENCY
                  </span>
                  . Model estimates <span className="bg-green-600 border-2 border-green-400 px-1 font-bold text-white pixel-shadow">ABILITY</span> before specific <span className="bg-red-600 border-2 border-red-400 px-1 font-bold text-white pixel-shadow">SKILL EXECUTION</span>. <span className="bg-purple-600 border-2 border-purple-400 px-1 font-bold text-white pixel-shadow">AFM</span> formula construction proceeding in <span className="bg-orange-600 border-2 border-orange-400 px-1 font-bold text-white pixel-shadow">LOWER RIGHT QUADRANT</span>.
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Control */}
          <div className="text-center">
            <button
              onClick={() => scroll(5)}
              className="px-12 py-4 bg-red-600 text-white border-4 border-red-400 font-bold text-xl uppercase tracking-wider hover:bg-red-700 transition-all duration-200 pixel-shadow font-mono relative transform hover:scale-105"
            >
              {/* Pixel corner marker */}
              <div className="absolute top-1 right-1 w-3 h-3 bg-white opacity-60" />
              <ArrowRight className="inline-block w-6 h-6 ml-2 animate-bounce" />
              NEXT MODULE
            </button>
          </div>
        </div>

        {/* Tooltip System */}
        {hoveredTerm === 'baseline-proficiency' && <BaselineProficiencyTooltip />}
      </div>

      <style jsx>{`
        .pixel-shadow {
          box-shadow: 
            4px 4px 0px rgba(0, 0, 0, 0.8),
            8px 8px 0px rgba(0, 0, 0, 0.4);
        }
        
        .pixel-text {
          text-shadow: 
            2px 2px 0px rgba(0, 0, 0, 0.8),
            4px 4px 0px rgba(0, 0, 0, 0.4);
        }
      `}</style>
    </div>
  );
};