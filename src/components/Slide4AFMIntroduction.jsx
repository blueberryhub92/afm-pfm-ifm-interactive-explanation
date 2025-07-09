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
    <div className="fixed z-50 top-8 right-4 bg-gray-800 border-4 border-cyan-400 pixel-shadow font-mono w-96">
      {/* Pixel corner brackets */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-cyan-400"></div>
      <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-cyan-400"></div>
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-cyan-400"></div>
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-cyan-400"></div>
      
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-pulse" />
      </div>
      
      <div className="relative z-10 p-6">
        <div className="bg-purple-600 border-2 border-purple-400 px-3 py-1 mb-4 pixel-shadow inline-flex items-center gap-2">
          <Brain className="w-4 h-4 text-white" />
          <span className="text-white font-bold text-xs tracking-wider">BASELINE PROFICIENCY (θ)</span>
        </div>
        
        <h4 className="font-bold text-cyan-400 mb-4 text-lg uppercase tracking-wide pixel-text">AFM Baseline Detection</h4>
        
        <p className="text-green-400 text-sm leading-relaxed mb-4 font-mono pixel-text">
          &gt; SYSTEM ESTIMATES INITIAL SKILL LEVEL
          <br />
          &gt; MULTIPLE DATA SOURCES ANALYZED
        </p>
        
        <div className="space-y-3 text-sm">
          <div className="border-2 border-yellow-400 bg-gray-700 p-2 pixel-shadow">
            <strong className="text-yellow-400">ASSESSMENTS:</strong> <span className="text-white">Previous skill performance</span>
          </div>
          <div className="border-2 border-yellow-400 bg-gray-700 p-2 pixel-shadow">
            <strong className="text-yellow-400">SELF-REPORT:</strong> <span className="text-white">User Python familiarity</span>
          </div>
          <div className="border-2 border-yellow-400 bg-gray-700 p-2 pixel-shadow">
            <strong className="text-yellow-400">DEMOGRAPHICS:</strong> <span className="text-white">Education & background</span>
          </div>
          <div className="border-2 border-yellow-400 bg-gray-700 p-2 pixel-shadow">
            <strong className="text-yellow-400">DIAGNOSTICS:</strong> <span className="text-white">Quick skill assessment</span>
          </div>
        </div>
        
        <button
          onClick={() => setHoveredTerm(null)}
          className="absolute top-2 right-2 w-8 h-8 bg-red-600 border-2 border-red-400 text-white font-bold hover:bg-red-400 transition-colors pixel-shadow flex items-center justify-center"
        >
          X
        </button>
      </div>
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
        {[...Array(15)].map((_, i) => (
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

      <div className="relative flex flex-col items-center justify-center py-8 px-4 md:px-10 min-h-screen">
        <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">

          {/* Adaptive Learning Block */}
          <div className="bg-gray-800 border-4 border-blue-400 p-8 pixel-shadow relative">
            {/* Pixel corner brackets */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-blue-400"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-blue-400"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-blue-400"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-blue-400"></div>
            
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="w-full h-full bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-600 animate-pulse" />
            </div>
            
            <div className="bg-orange-600 border-2 border-orange-400 px-4 py-2 mb-6 pixel-shadow inline-flex items-center gap-2">
              <Zap className="w-4 h-4 text-white" />
              <span className="text-white font-bold text-sm tracking-wider">ADAPTIVE LEARNING</span>
            </div>
            
            <div className="relative z-10 space-y-6 text-lg font-mono leading-relaxed">
              <p className="text-white pixel-text">
                &gt; SUCCESS PROBABILITY ENABLES <span className="bg-orange-600 border-2 border-orange-400 px-2 py-1 font-bold uppercase text-white pixel-shadow">ADAPTIVE LEARNING</span>
                <br />
                &gt; SYSTEM AUTO-ADJUSTS DIFFICULTY
                <br />
                &gt; BASED ON PREDICTED PERFORMANCE
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-700 border-4 border-red-400 p-4 pixel-shadow">
                  <div className="bg-red-600 border-2 border-red-400 px-2 py-1 mb-2 pixel-shadow">
                    <span className="font-bold text-white text-center block uppercase tracking-wide">LOW (&lt;30%)</span>
                  </div>
                  <div className="text-sm text-red-400 text-center font-mono pixel-text">EASIER TASKS • BUILD CONFIDENCE</div>
                </div>
                <div className="bg-gray-700 border-4 border-yellow-400 p-4 pixel-shadow">
                  <div className="bg-yellow-600 border-2 border-yellow-400 px-2 py-1 mb-2 pixel-shadow">
                    <span className="font-bold text-white text-center block uppercase tracking-wide">MED (30-80%)</span>
                  </div>
                  <div className="text-sm text-yellow-400 text-center font-mono pixel-text">BALANCED PRACTICE • STEADY PROGRESS</div>
                </div>
                <div className="bg-gray-700 border-4 border-green-400 p-4 pixel-shadow">
                  <div className="bg-green-600 border-2 border-green-400 px-2 py-1 mb-2 pixel-shadow">
                    <span className="font-bold text-white text-center block uppercase tracking-wide">HIGH (&gt;80%)</span>
                  </div>
                  <div className="text-sm text-green-400 text-center font-mono pixel-text">CHALLENGE MODE • ACCELERATE</div>
                </div>
              </div>
            </div>
          </div>

          {/* Parameters Block */}
          <div className="bg-gray-800 border-4 border-purple-400 p-8 pixel-shadow relative">
            {/* Pixel corner brackets */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-purple-400"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-purple-400"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-purple-400"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-purple-400"></div>
            
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="w-full h-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-600 animate-pulse" />
            </div>
            
            <div className="bg-purple-600 border-2 border-purple-400 px-4 py-2 mb-6 pixel-shadow inline-flex items-center gap-2">
              <Target className="w-4 h-4 text-white" />
              <span className="text-white font-bold text-sm tracking-wider">PARAMETERS</span>
            </div>
            
            <div className="relative z-10 space-y-6 text-lg font-mono leading-relaxed">
              <p className="text-white pixel-text">
                &gt; <em className="font-bold text-cyan-400 uppercase">SYSTEM ALERT:</em> FIRST PARAMETER DETECTED
                <br />
                &gt; <span className="bg-purple-600 border-2 border-purple-400 px-2 py-1 font-bold uppercase text-white pixel-shadow">θ (THETA)</span> = BASELINE PROFICIENCY
                <br />
                &gt; PRE-SKILL ABILITY ESTIMATION
                <br />
                &gt; WATCH AFM FORMULA BUILD →
              </p>
              
              <div className="flex items-center gap-4">
                <span className="text-cyan-400 font-bold pixel-text">BASELINE:</span>
                <span 
                  ref={baselineRef}
                  className="relative cursor-pointer border-4 border-cyan-400 bg-gray-700 px-3 py-2 font-bold text-cyan-400 uppercase hover:bg-cyan-400 hover:text-black transition-all pixel-shadow"
                  onMouseEnter={() => handleMouseEnter('baseline-proficiency')}
                  onMouseLeave={() => setHoveredTerm(null)}
                >
                  Θ PROFICIENCY
                </span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="text-center">
            <button
              onClick={() => scroll(6)}
              className="bg-red-600 border-4 border-red-400 text-white px-12 py-4 font-bold text-xl uppercase tracking-wide hover:bg-red-400 transition-all duration-200 pixel-shadow transform hover:scale-105"
            >
              NEXT LEVEL →
            </button>
          </div>
        </div>
      </div>

      {/* Tooltips */}
      {hoveredTerm === 'baseline-proficiency' && <BaselineProficiencyTooltip />}

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