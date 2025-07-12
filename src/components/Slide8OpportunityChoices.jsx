import { useState } from "react";
import { TrendingUp, TrendingDown, Minus, Lightbulb, ArrowRight, HelpCircle } from "lucide-react";

export const Slide8OpportunityChoices = ({ scroll }) => {
  const [opportunityChoice, setOpportunityChoice] = useState("");
  const [showOpportunityResult, setShowOpportunityResult] = useState(false);

  const handleOpportunityChoice = (choice) => {
    setOpportunityChoice(choice);
    setShowOpportunityResult(true);
  };

  const choiceData = {
    'Increased': {
      icon: <TrendingUp className="w-6 h-6" />,
      bgColor: 'bg-green-600'
    },
    'Decreased': {
      icon: <TrendingDown className="w-6 h-6" />,
      bgColor: 'bg-red-600'
    },
    "Didn't change": {
      icon: <Minus className="w-6 h-6" />,
      bgColor: 'bg-red-600'
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center py-8 px-4 md:px-10 text-black font-['IBM_Plex_Mono',monospace]">
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">

        {/* Question Header */}
        <div className="border-4 border-black rounded-xl p-6 bg-gradient-to-r from-blue-100 to-purple-100 shadow-lg relative">
          <div className="absolute -top-6 left-4 px-3 py-1 bg-blue-600 text-white font-bold rounded-md text-xs tracking-wider flex items-center gap-2">
            <HelpCircle className="w-4 h-4" />
            REFLECTION QUESTION
          </div>
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-black tracking-tight leading-tight">
              How do you think your practice opportunities changed from the first question to the second?
            </h2>
            <p className="text-xl font-semibold text-gray-700 bg-white px-4 py-2 rounded border-2 border-black inline-block">
              I think it:
            </p>
          </div>
        </div>

        {/* Choice Buttons */}
        <div className="grid grid-cols-1 gap-4">
          {Object.entries(choiceData).map(([choice, data]) => (
            <button
              key={choice}
              onClick={() => handleOpportunityChoice(choice)}
              className={`
                w-full py-4 px-8 border-4 rounded-xl font-bold uppercase text-lg transition-all shadow-lg flex items-center justify-center gap-3
                ${opportunityChoice === choice
                  ? `${data.bgColor} text-white border-black`
                  : `bg-white text-black border-black hover:text-gray-700 hover:border-gray-700`
                }
              `}
            >
              {data.icon}
              {choice}
            </button>
          ))}
        </div>

        {/* Result Section */}
        {showOpportunityResult && (
          <div className="border-l-8 border-green-600 bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 shadow-lg animate-fadeIn">
            <div className="flex items-center gap-2 mb-4 font-bold text-xl text-green-800">
              <Lightbulb className="w-6 h-6" />
              Your practice opportunities increased!
            </div>
            <div className="bg-white border-2 border-black rounded-lg p-4">
              <p className="text-black leading-relaxed font-mono">
                After the first question, you had <span className="bg-yellow-300 px-1 font-bold">1 opportunity</span> in <span className="bg-blue-200 px-1 font-bold">Index Slicing in Python</span>. After the second question, you had <span className="bg-yellow-300 px-1 font-bold">2 opportunities</span> in that same skill. Each time you work on a task for a <span className="bg-green-200 px-1 font-bold">specific skill</span>, your opportunities in that skill <span className="bg-yellow-300 px-1 font-bold">increase by 1</span>. However, your opportunities in <span className="bg-red-200 px-1 font-bold">different skills</span> (like loops or functions) remain the same, as tasks are <span className="bg-green-200 px-1 font-bold">skill-specific</span>.
                <br /><br />
                <span className="bg-purple-200 px-1 font-bold">AFM</span> estimates the <span className="bg-orange-200 px-1 font-bold">probability</span> that a student answers the next task on a specific skill correctly.
              </p>
            </div>
          </div>
        )}

        {/* Continue Button */}
        {showOpportunityResult && (
          <div className="text-center">
            <button
              onClick={() => scroll(8)}
              className="px-8 py-4 bg-purple-600 text-white border-4 border-black rounded-lg font-bold uppercase hover:bg-white hover:text-purple-700 hover:border-purple-800 transition-all shadow-lg flex items-center gap-2 mx-auto text-lg"
            >
              Next
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};