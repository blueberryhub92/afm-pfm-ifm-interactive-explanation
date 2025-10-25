import React, { useState } from "react";
import { Eye, CheckCircle, ArrowRight, Brain } from "lucide-react";
import { trackCustomEvent } from "../utils/analytics";

export const ProbabilityGuessResult = ({
  guess1,
  navigate,
  setUserSkillLevel,
}) => {
  const [skillLevel, setSkillLevel] = useState(null);

  const handleSkillLevelSelect = (level) => {
    setSkillLevel(level);
    setUserSkillLevel(level);

    // Track skill level selection
    trackCustomEvent("python_skill_level_selected", {
      componentName: "ProbabilityGuessResult",
      elementType: "button",
      skillLevel: level,
    });
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center py-8 px-4 md:px-10 text-black font-['IBM_Plex_Mono',monospace]">
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">
        {/* Guess Display */}
        <div className="border-4 border-orange-400 rounded-xl p-8 bg-orange-50 shadow-lg relative">
          <div className="absolute -top-6 left-4 px-3 py-1 bg-orange-400 text-black font-semibold rounded-md text-xs tracking-wider flex items-center gap-2 border-2 border-black">
            <Eye className="w-4 h-4" />
            YOUR ANSWER
          </div>
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-bold text-orange-800 uppercase tracking-wide font-mono">
              "{guess1}"
            </p>
          </div>
        </div>

        {/* Correct Answer Display */}
        <div className="border-4 border-green-500 rounded-xl p-8 bg-green-50 shadow-lg relative">
          <div className="absolute -top-6 left-4 px-3 py-1 bg-green-500 text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2 border-2 border-black">
            <CheckCircle className="w-4 h-4" />
            CORRECT ANSWER
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-green-800 mb-4 uppercase tracking-wide">
              The correct answer to the task was:
            </p>
            <div className="bg-black text-white px-8 py-4 rounded-xl font-mono text-3xl md:text-4xl font-bold uppercase tracking-wider shadow-lg border-4 border-green-500 inline-block">
              PYTHON
            </div>
            <p className="text-lg text-green-700 mt-4 font-semibold">
              The programming language shown in the code snippet
            </p>
          </div>
        </div>

        {/* Python Skill Level Question */}
        <div className="border-4 border-purple-400 rounded-xl p-8 bg-purple-50 shadow-lg relative">
          <div className="absolute -top-6 left-4 px-3 py-1 bg-purple-400 text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2 border-2 border-black">
            <Brain className="w-4 h-4" />
            QUESTION
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-purple-800 mb-6 uppercase tracking-wide">
              What would you say is your skill level in Python?
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              {["beginner", "intermediate", "pro"].map((level) => (
                <button
                  key={level}
                  onClick={() => handleSkillLevelSelect(level)}
                  className={`px-8 py-4 border-4 rounded-xl font-semibold uppercase tracking-wide transition-all text-lg ${
                    skillLevel === level
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-purple-400 hover:bg-purple-100"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content - Only shown after skill level selection */}
        {skillLevel && (
          <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg">
            {/* Analysis */}
            <div className="border-4 border-blue-400 rounded-xl p-6 bg-blue-50 mb-8 relative">
              <div className="absolute -top-6 left-4 px-3 py-1 bg-blue-400 text-black font-semibold rounded-md text-xs tracking-wider flex items-center gap-2 border-2 border-black">
                <Brain className="w-4 h-4" />
                ANALYSIS
              </div>
              <p className="text-lg font-semibold text-center text-black leading-relaxed">
                You may have recognized this programming language, but chances
                are, you probably didn't know how to solve the actual
                programming task.
              </p>
            </div>

            {/* Transition to Probability Estimation */}
            <div className="text-center">
              <p className="text-lg text-black mb-6 leading-relaxed">
                What do you think chances are that you answer the{" "}
                <span className="bg-yellow-200 px-2 py-1 border-2 border-black rounded font-bold uppercase">
                  next programming task
                </span>{" "}
                correctly? Can you estimate your probability of success?
              </p>

              <button
                onClick={() => navigate(3)}
                className="px-12 py-4 bg-black text-white border-4 border-black rounded-xl font-semibold uppercase tracking-wide hover:bg-white hover:text-black transition-all text-xl flex items-center gap-3 mx-auto shadow-lg"
              >
                <Brain className="w-6 h-6" />
                Estimate my probability
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
