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
      bgColor: 'bg-black text-white'
    },
    'Decreased': {
      icon: <TrendingDown className="w-6 h-6" />,
      bgColor: 'bg-black text-white'
    },
    "Didn't change": {
      icon: <Minus className="w-6 h-6" />,
      bgColor: 'bg-black text-white'
    }
  };

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
      
      <div className="relative flex-1 px-8 py-6">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Question Header */}
          <div className="border-2 border-black p-6 bg-white relative">
            {/* Technical corner brackets */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-black"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-black"></div>
            
            {/* Technical header label */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-black text-white px-3 py-1 text-xs font-mono tracking-wider border border-white flex items-center gap-2">
                <HelpCircle className="w-3 h-3" />
                REFLECTION SEQUENCE
              </span>
            </div>
            
            {/* Dimension lines */}
            <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 rotate-90">
              <div className="w-4 h-px bg-black"></div>
            </div>
            <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 rotate-90">
              <div className="w-4 h-px bg-black"></div>
            </div>
            
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-black tracking-wider uppercase">
                How do you think opportunities changed from the first question to the second?
              </h2>
              <div className="inline-block border border-black px-4 py-2">
                <span className="text-lg font-mono tracking-wider text-black">
                  I THINK IT:
                </span>
              </div>
            </div>
          </div>

          {/* Choice Buttons */}
          <div className="relative">
            {/* Dimension bracket */}
            <div className="absolute -top-4 left-0 right-0 h-3 border-l-2 border-r-2 border-t-2 border-black"></div>
            
            <div className="grid grid-cols-1 gap-4">
              {Object.entries(choiceData).map(([choice, data]) => (
                <button
                  key={choice}
                  onClick={() => handleOpportunityChoice(choice)}
                  className={`
                    w-full py-4 px-8 border-2 border-black font-bold uppercase text-lg transition-all relative group
                    ${opportunityChoice === choice
                      ? `${data.bgColor}`
                      : `bg-white text-black hover:bg-gray-50`
                    }
                  `}
                >
                  {/* Technical corner marker */}
                  <div className={`absolute top-2 right-2 w-2 h-2 border ${opportunityChoice === choice ? 'border-white bg-black' : 'border-black bg-white'}`} />
                  
                  <div className="flex items-center justify-center gap-3 tracking-wider">
                    {data.icon}
                    {choice}
                  </div>
                  
                  {/* Arrow indicator */}
                  <ArrowRight className={`w-4 h-4 absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity ${opportunityChoice === choice ? 'text-white' : 'text-black'}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Result Section */}
          {showOpportunityResult && (
            <div className="border-2 border-black bg-white p-6 relative animate-fadeIn">
              {/* Technical corner brackets */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-black"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-black"></div>
              
              {/* Technical header label */}
              <div className="absolute -top-4 left-4">
                <span className="bg-black text-white px-3 py-1 text-xs font-mono tracking-wider border border-white flex items-center gap-2">
                  <Lightbulb className="w-3 h-3" />
                  ANALYSIS RESULT
                </span>
              </div>
              
              <div className="space-y-4">
                <div className="border border-black p-1 inline-block">
                  <h3 className="font-bold text-lg text-black tracking-wider uppercase px-2">
                    Your opportunities increased!
                  </h3>
                </div>
                
                <div className="border border-black p-4 bg-gray-50">
                  <p className="text-black leading-relaxed font-mono text-sm">
                    After the first question, you had <span className="bg-yellow-200 px-1 border border-black font-bold">1 OPPORTUNITY</span> in <span className="bg-blue-200 px-1 border border-black font-bold">INDEX SLICING IN PYTHON</span>. After the second question, you had <span className="bg-yellow-200 px-1 border border-black font-bold">2 OPPORTUNITIES</span> in that same skill. Each time you work on a task for a <span className="bg-green-200 px-1 border border-black font-bold">SPECIFIC SKILL</span>, your opportunities in that skill <span className="bg-yellow-200 px-1 border border-black font-bold">INCREASE BY 1</span>. However, your opportunities in <span className="bg-red-200 px-1 border border-black font-bold">DIFFERENT SKILLS</span> (like loops) stay the same, as tasks are <span className="bg-green-200 px-1 border border-black font-bold">SKILL-SPECIFIC</span>.
                    <br /><br />
                    <span className="bg-purple-200 px-1 border border-black font-bold">AFM</span> estimates the <span className="bg-orange-200 px-1 border border-black font-bold">PROBABILITY</span> that a student answers the next task on a specific skill correctly. As it will turn out, <span className="bg-purple-200 px-1 border border-black font-bold">T</span> helps to update the <span className="bg-orange-200 px-1 border border-black font-bold">SUCCESS PROBABILITY</span> over time.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Continue Button */}
          {showOpportunityResult && (
            <div className="text-center">
              <button
                onClick={() => scroll(8)}
                className="px-8 py-4 bg-black text-white border-2 border-black font-bold uppercase hover:bg-white hover:text-black transition-all relative group tracking-wider"
              >
                {/* Technical corner marker */}
                <div className="absolute top-2 right-2 w-2 h-2 border border-white bg-black group-hover:border-black group-hover:bg-white" />
                
                <div className="flex items-center gap-2">
                  NEXT SEQUENCE
                  <ArrowRight className="w-6 h-6" />
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};