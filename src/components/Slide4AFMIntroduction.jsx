import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, TrendingDown, ArrowRight, Brain, Target, Activity, Lightbulb, Code, Zap, ArrowDownRight } from 'lucide-react';

export const Slide4AFMIntroduction = ({ scroll }) => {
  const [hoveredTerm, setHoveredTerm] = useState(null);
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
        
        // Realistic AFM progression: start low, grow with each opportunity
        const baseGrowth = nextTask * 0.08; // Each task adds ~8% base growth
        const randomVariation = (Math.random() - 0.3) * 0.06; // Small random component, slightly negative bias
        const newProbability = Math.max(0.12, Math.min(0.88, 0.15 + baseGrowth + randomVariation));
        
        setProbability(newProbability);
        return nextTask;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [maxTasks]);

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

  const SkillTooltip = () => (
    <div className="fixed z-50 top-4 left-4 bg-white border-4 border-green-700 rounded-xl shadow-lg p-6 w-96 font-['IBM_Plex_Mono',monospace]">
      <div className="absolute -top-6 left-4 px-3 py-1 bg-green-700 text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
        <Code className="w-4 h-4" />
        SKILL DEFINITION
      </div>
      
      <h4 className="font-bold text-green-800 mb-4 text-lg uppercase tracking-wide">What is a "Skill" in AFM?</h4>
      
      <p className="text-black text-sm leading-relaxed mb-4 font-semibold">
        In AFM, a "skill" is a specific concept or technique that can be learned and practiced independently. Each skill represents a distinct cognitive ability.
      </p>
      
      <div className="bg-neutral-100 border-2 border-black rounded p-4 font-mono text-sm mb-4">
        <div className="text-green-700 mb-2 font-bold"># Current Example - String Slicing:</div>
        <div className="text-black">word = "nohtyp"</div>
        <div className="text-black">reversed_word = word[::-1]</div>
        <div className="text-black">print(reversed_word)</div>
        <div className="text-blue-700 mt-2 font-bold"># Output: python</div>
      </div>
      
      <div>
        <h5 className="font-bold text-black mb-3 uppercase tracking-wide border-b-2 border-black pb-1">Other Python Skills:</h5>
        <div className="space-y-2 text-sm">
          <div className="border-l-4 border-blue-600 pl-3">
            <strong className="text-blue-600 uppercase">Functions:</strong> <span className="text-black">Defining, calling, parameters, returns</span>
          </div>
          <div className="border-l-4 border-green-600 pl-3">
            <strong className="text-green-600 uppercase">OOP:</strong> <span className="text-black">Classes, objects, inheritance</span>
          </div>
          <div className="border-l-4 border-purple-600 pl-3">
            <strong className="text-purple-600 uppercase">Recursion:</strong> <span className="text-black">Base cases, recursive calls</span>
          </div>
          <div className="border-l-4 border-orange-600 pl-3">
            <strong className="text-orange-600 uppercase">Data Structures:</strong> <span className="text-black">Lists, dicts, sets, tuples</span>
          </div>
        </div>
      </div>
      
      <button
        onClick={() => setHoveredTerm(null)}
        className="absolute top-2 right-2 px-2 py-1 rounded border-2 border-black bg-green-700 text-white font-bold hover:bg-white hover:text-green-700 transition-colors"
      >
        X
      </button>
    </div>
  );

  const BaselineProficiencyTooltip = () => (
    <div className="fixed z-50 top-4 left-4 bg-white border-4 border-purple-700 rounded-xl shadow-lg p-6 w-96 font-['IBM_Plex_Mono',monospace]">
      <div className="absolute -top-6 left-4 px-3 py-1 bg-purple-700 text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
        <Brain className="w-4 h-4" />
        BASELINE PROFICIENCY (θ)
      </div>
      
      <h4 className="font-bold text-purple-800 mb-4 text-lg uppercase tracking-wide">How AFM Determines Baseline Proficiency</h4>
      
      <p className="text-black text-sm leading-relaxed mb-4 font-semibold">
        Before you attempt any tasks, AFM estimates your baseline proficiency using several methods:
      </p>
      
      <div className="space-y-3 text-sm">
        <div className="border-2 border-black rounded p-2 bg-neutral-50">
          <strong className="text-purple-700">PRIOR ASSESSMENTS:</strong> <span className="text-black">Previous performance on similar skills</span>
        </div>
        <div className="border-2 border-black rounded p-2 bg-neutral-50">
          <strong className="text-purple-700">SELF-REPORTED:</strong> <span className="text-black">Your stated familiarity with Python</span>
        </div>
        <div className="border-2 border-black rounded p-2 bg-neutral-50">
          <strong className="text-purple-700">DEMOGRAPHICS:</strong> <span className="text-black">Education level, programming background</span>
        </div>
        <div className="border-2 border-black rounded p-2 bg-neutral-50">
          <strong className="text-purple-700">DIAGNOSTIC TESTS:</strong> <span className="text-black">Quick skills assessment</span>
        </div>
      </div>
      
      <button
        onClick={() => setHoveredTerm(null)}
        className="absolute top-2 right-2 px-2 py-1 rounded border-2 border-black bg-purple-700 text-white font-bold hover:bg-white hover:text-purple-700 transition-colors"
      >
        X
      </button>
    </div>
  );

  const SuccessProbabilitySimulation = () => (
    <div className="fixed z-50 top-4 left-4 bg-white border-4 border-blue-700 rounded-xl shadow-lg p-6 w-80 font-['IBM_Plex_Mono',monospace]">
      <div className="absolute -top-6 left-4 px-3 py-1 bg-blue-700 text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
        <Activity className="w-4 h-4" />
        REALISTIC AFM SIMULATION
      </div>
      
      <div className="text-sm font-bold text-blue-800 mb-3 flex items-center justify-between">
        <span className="uppercase tracking-wide">Success Probability</span>
        <TrendingUp size={16} className="text-green-600" />
      </div>
      
      <div className="border-4 border-blue-700 rounded-xl p-4 bg-blue-50 text-center mb-4">
        <div className="text-4xl font-bold text-blue-700 mb-1">
          {(probability * 100).toFixed(1)}%
        </div>
        <div className="text-xs font-bold text-blue-600 uppercase tracking-wide">
          String Slicing Skill
        </div>
      </div>
      
      <div className="w-full bg-neutral-200 rounded-lg h-6 mb-4 border-2 border-black overflow-hidden">
        <div 
          className={`h-full rounded-lg transition-all duration-1000 ${
            probability >= 0.7 ? 'bg-green-500' : 
            probability <= 0.4 ? 'bg-red-500' : 'bg-yellow-500'
          }`}
          style={{ width: `${probability * 100}%` }}
        ></div>
      </div>
      
      <div className="bg-neutral-100 border-2 border-neutral-400 rounded-lg p-3 mb-4">
        <div className="flex items-center justify-between text-xs font-bold text-neutral-700 mb-2">
          <span>TASK PROGRESS:</span>
          <span>{currentTask}/{maxTasks}</span>
        </div>
        <div className="w-full bg-neutral-300 rounded-full h-2 border border-black">
          <div 
            className="bg-blue-600 h-full rounded-full transition-all duration-1000"
            style={{ width: `${(currentTask / maxTasks) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <div className="border-t-4 border-black pt-4">
        <div className="text-xs font-bold text-black mb-2 uppercase tracking-wide">
          Current Recommendation:
        </div>
        <div className={`text-sm font-bold px-3 py-2 rounded-lg text-center border-2 border-black ${
          difficultyLevel === 'Easy' ? 'bg-green-100 text-green-800' :
          difficultyLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
          difficultyLevel === 'Hard' ? 'bg-orange-100 text-orange-800' :
          'bg-red-100 text-red-800'
        }`}>
          <div className="uppercase text-xs tracking-wide">{difficultyLevel}</div>
          <div className="text-xs">{taskRecommendation}</div>
        </div>
      </div>
      
      <button
        onClick={() => setHoveredTerm(null)}
        className="absolute top-2 right-2 px-2 py-1 rounded border-2 border-black bg-blue-700 text-white font-bold hover:bg-white hover:text-blue-700 transition-colors"
      >
        X
      </button>
    </div>
  );

  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center py-8 px-4 md:px-10 text-black font-['IBM_Plex_Mono',monospace]">
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">

        {/* Adaptive Learning Block */}
        <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative">
          <div className="absolute -top-6 left-6 px-4 py-2 bg-orange-600 text-white font-semibold rounded-md text-sm tracking-wider flex items-center gap-2">
            <Zap className="w-4 h-4" />
            ADAPTIVE LEARNING
          </div>
          
          <div className="space-y-6 text-lg font-semibold leading-relaxed">
            <p className="text-black">
              But why is knowing this success probability so valuable? It enables <span className="bg-orange-200 px-2 py-1 border-2 border-black rounded font-bold uppercase">adaptive learning</span> – the system can automatically adjust the difficulty and type of questions based on your predicted performance.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border-4 border-red-600 rounded-xl p-4 bg-red-50">
                <div className="font-bold text-red-800 text-center mb-2 uppercase tracking-wide">Low (e.g., &lt;30%)</div>
                <div className="text-sm text-red-700 text-center font-semibold">Easier tasks to build confidence</div>
              </div>
              <div className="border-4 border-yellow-600 rounded-xl p-4 bg-yellow-50">
                <div className="font-bold text-yellow-800 text-center mb-2 uppercase tracking-wide">Medium (e.g., 30-80%)</div>
                <div className="text-sm text-yellow-700 text-center font-semibold">Balanced practice problems</div>
              </div>
              <div className="border-4 border-green-600 rounded-xl p-4 bg-green-50">
                <div className="font-bold text-green-800 text-center mb-2 uppercase tracking-wide">High (e.g., &gt;80%)</div>
                <div className="text-sm text-green-700 text-center font-semibold">Challenging problems to accelerate</div>
              </div>
            </div>
            
            <p className="text-black">
              Check out this{' '}
              <span 
                ref={successRef}
                className="relative cursor-pointer border-4 border-blue-600 bg-blue-100 px-2 py-1 rounded font-bold text-blue-800 uppercase hover:bg-blue-200 transition-colors"
                onMouseEnter={() => handleMouseEnter('success-probability')}
                onMouseLeave={() => setHoveredTerm(null)}
              >
                simulation
              </span>
              {' '}to see how recommendations change depending on success probability.
            </p>
          </div>
        </div>

        {/* Parameters Block */}
        <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative">
          <div className="absolute -top-6 left-6 px-4 py-2 bg-purple-600 text-white font-semibold rounded-md text-sm tracking-wider flex items-center gap-2">
            <Target className="w-4 h-4" />
            PARAMETERS
          </div>
          
          <div className="space-y-6 text-lg font-semibold leading-relaxed">
            <p className="text-black">
              And <em className="font-bold text-purple-700 uppercase">guess what?</em> You already know about the first parameter of AFM, <span 
                className="bg-purple-300 px-2 py-1 border-2 border-black rounded font-bold uppercase transition-colors"
              >
                θ
              </span>, which is the{' '}
              <span 
                ref={baselineRef}
                className="relative cursor-pointer border-4 border-purple-600 bg-purple-100 px-2 py-1 rounded font-bold text-purple-800 uppercase hover:bg-purple-200 transition-colors"
                onMouseEnter={() => handleMouseEnter('baseline-proficiency')}
                onMouseLeave={() => setHoveredTerm(null)}
              >
                baseline proficiency
              </span>
              . This is what the model estimates about your ability before seeing you work on specific skills. Watch the AFM formula build up in the lower right corner as we progress!
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center">
          <button
            onClick={() => scroll(6)}
            className="px-12 py-4 bg-purple-600 text-white border-4 border-black rounded-xl font-bold text-xl uppercase tracking-wide hover:bg-white hover:text-purple-600 hover:border-purple-600 transition-all duration-200 shadow-lg"
          >
            Next →
          </button>
        </div>
      </div>

      {/* Tooltips */}
      {hoveredTerm === 'skill' && <SkillTooltip />}
      {hoveredTerm === 'baseline-proficiency' && <BaselineProficiencyTooltip />}
      {hoveredTerm === 'success-probability' && <SuccessProbabilitySimulation />}
    </div>
  );
};