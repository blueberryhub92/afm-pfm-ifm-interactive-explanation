import React, { useState, useEffect, useRef } from "react";
import {
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Brain,
  Target,
  Activity,
  Lightbulb,
  Code,
  Zap,
  ArrowDownRight,
} from "lucide-react";

export const AFMIntroduction = ({ navigate, userSkillLevel }) => {
  const [hoveredTerm, setHoveredTerm] = useState(null);
  const [baselineProficiency] = useState(0.15); // θ (theta) - starting baseline
  const [probability, setProbability] = useState(0.15);
  const [taskRecommendation, setTaskRecommendation] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState("Easy");
  const [currentTask, setCurrentTask] = useState(1);
  const [maxTasks] = useState(8);

  const baselineRef = useRef(null);
  const successRef = useRef(null);

  // Get student ability value based on skill level
  const getStudentAbility = () => {
    switch (userSkillLevel) {
      case "beginner":
        return "0.3";
      case "intermediate":
        return "1.2";
      case "pro":
        return "2.1";
      default:
        return "1.2"; // default if not set
    }
  };

  // Simulate realistic AFM learning progression
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTask((prev) => {
        const nextTask = prev >= maxTasks ? 1 : prev + 1;

        // Realistic AFM progression: start from baseline θ, grow with each opportunity
        const baseGrowth = nextTask * 0.08; // Each task adds ~8% base growth
        const randomVariation = (Math.random() - 0.3) * 0.06; // Small random component, slightly negative bias
        const newProbability = Math.max(
          0.12,
          Math.min(0.88, baselineProficiency + baseGrowth + randomVariation)
        );

        setProbability(newProbability);
        return nextTask;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [maxTasks, baselineProficiency]);

  // Update task recommendations based on probability
  useEffect(() => {
    if (probability < 0.3) {
      setTaskRecommendation("Review basic concepts");
      setDifficultyLevel("Easy");
    } else if (probability < 0.6) {
      setTaskRecommendation("Practice similar problems");
      setDifficultyLevel("Medium");
    } else if (probability < 0.8) {
      setTaskRecommendation("Try advanced variations");
      setDifficultyLevel("Hard");
    } else {
      setTaskRecommendation("Challenge with complex tasks");
      setDifficultyLevel("Expert");
    }
  }, [probability]);

  const handleMouseEnter = (term) => {
    setHoveredTerm(term);
  };

  const BaselineProficiencyTooltip = () => (
    <div className="fixed z-50 top-8 right-4 bg-white border-4 border-purple-700 rounded-xl shadow-lg p-6 w-96 font-['IBM_Plex_Mono',monospace]">
      <div className="absolute -top-6 right-4 px-3 py-1 bg-purple-700 text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
        <Brain className="w-4 h-4" />
        BASELINE PROFICIENCY (θ)
      </div>

      <h4 className="font-bold text-purple-800 mb-4 text-lg uppercase tracking-wide">
        How AFM Determines Baseline Proficiency
      </h4>

      <p className="text-black text-sm leading-relaxed mb-4 font-semibold">
        Before you attempt any tasks, AFM estimates your baseline proficiency
        using several methods:
      </p>

      <div className="space-y-3 text-sm">
        <div className="border-2 border-black rounded p-2 bg-neutral-50">
          <strong className="text-purple-700">PRIOR ASSESSMENTS:</strong>{" "}
          <span className="text-black">
            Previous performance on similar skills
          </span>
        </div>
        <div className="border-2 border-black rounded p-2 bg-neutral-50">
          <strong className="text-purple-700">SELF-REPORTED:</strong>{" "}
          <span className="text-black">
            Your stated familiarity with Python
          </span>
        </div>
        <div className="border-2 border-black rounded p-2 bg-neutral-50">
          <strong className="text-purple-700">DEMOGRAPHICS:</strong>{" "}
          <span className="text-black">
            Education level, programming background
          </span>
        </div>
        <div className="border-2 border-black rounded p-2 bg-neutral-50">
          <strong className="text-purple-700">DIAGNOSTIC TESTS:</strong>{" "}
          <span className="text-black">Quick skills assessment</span>
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

  return (
    <div className="bg-white min-h-screen grid place-items-center py-8 px-4 md:px-10 text-black font-['IBM_Plex_Mono',monospace]">
      <div className="w-full max-w-4xl mx-auto space-y-8">
        {/* AFM Introduction Block */}
        <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative">
          <div className="absolute -top-6 left-6 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md text-sm tracking-wider flex items-center gap-2">
            <Brain className="w-4 h-4" />
            ADDITIVE FACTOR MODEL
          </div>

          <div className="space-y-6 text-lg font-semibold leading-relaxed">
            <p className="text-black">
              On the previous slide, you estimated your probability of success
              for a Python programming task. The{" "}
              <span className="bg-blue-200 px-2 py-1 border-2 border-black rounded font-bold uppercase">
                Additive Factor Model (AFM)
              </span>{" "}
              does exactly this – but automatically and continuously.
            </p>

            <p className="text-black">
              AFM's core purpose is to{" "}
              <span className="bg-yellow-200 px-2 py-1 border-2 border-black rounded font-bold uppercase">
                predict your success probability
              </span>{" "}
              for the next task on any given topic. It analyzes your performance
              patterns and estimates:{" "}
              <em>
                "What's the chance this student will answer the next question
                correctly?"
              </em>
            </p>
          </div>
        </div>

        {/* Adaptive Learning Block */}
        <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative">
          <div className="absolute -top-6 left-6 px-4 py-2 bg-orange-600 text-white font-semibold rounded-md text-sm tracking-wider flex items-center gap-2">
            <Zap className="w-4 h-4" />
            ADAPTIVE LEARNING
          </div>

          <div className="space-y-6 text-lg font-semibold leading-relaxed">
            <p className="text-black">
              But why is knowing this success probability so valuable? It
              enables{" "}
              <span className="bg-orange-200 px-2 py-1 border-2 border-black rounded font-bold uppercase">
                adaptive learning
              </span>{" "}
              – the system can automatically adjust the difficulty and type of
              questions based on your predicted performance.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border-4 border-red-600 rounded-xl p-4 bg-red-50">
                <div className="font-bold text-red-800 text-center mb-2 uppercase tracking-wide">
                  Low (e.g., &lt;30%)
                </div>
                <div className="text-sm text-red-700 text-center font-semibold">
                  Easier tasks to build confidence
                </div>
              </div>
              <div className="border-4 border-yellow-600 rounded-xl p-4 bg-yellow-50">
                <div className="font-bold text-yellow-800 text-center mb-2 uppercase tracking-wide">
                  Medium (e.g., 30-80%)
                </div>
                <div className="text-sm text-yellow-700 text-center font-semibold">
                  Balanced practice problems
                </div>
              </div>
              <div className="border-4 border-green-600 rounded-xl p-4 bg-green-50">
                <div className="font-bold text-green-800 text-center mb-2 uppercase tracking-wide">
                  High (e.g., &gt;80%)
                </div>
                <div className="text-sm text-green-700 text-center font-semibold">
                  Challenging problems to accelerate
                </div>
              </div>
            </div>
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
              And{" "}
              <em className="font-bold text-purple-700 uppercase">
                guess what?
              </em>{" "}
              You already know about the first parameter of AFM,{" "}
              <span className="bg-purple-300 px-2 py-1 border-2 border-black rounded font-bold uppercase transition-colors">
                θ
              </span>
              , which is the{" "}
              <span
                ref={baselineRef}
                className="relative cursor-pointer border-4 border-purple-600 bg-purple-100 px-2 py-1 rounded font-bold text-purple-800 uppercase hover:bg-purple-200 transition-colors"
                onMouseEnter={() => handleMouseEnter("baseline-proficiency")}
                onMouseLeave={() => setHoveredTerm(null)}
              >
                baseline proficiency
              </span>
              . This is what the model estimates about your ability in specific
              skills. Watch the AFM formula build up in the lower right corner
              as we progress! Based on your self-reported familiarity with
              Python, the model estimates your baseline proficiency to be{" "}
              <span className="bg-blue-200 px-2 py-1 border-2 border-black rounded font-bold">
                {getStudentAbility()}
              </span>
              .
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center">
          <button
            onClick={() => navigate(5)}
            className="px-12 py-4 bg-purple-600 text-white border-4 border-black rounded-xl font-bold text-xl uppercase tracking-wide hover:bg-white hover:text-purple-600 hover:border-purple-600 transition-all duration-200 shadow-lg"
          >
            Next →
          </button>
        </div>

        {/* Tooltips */}
        {hoveredTerm === "baseline-proficiency" && (
          <BaselineProficiencyTooltip />
        )}
      </div>
    </div>
  );
};
