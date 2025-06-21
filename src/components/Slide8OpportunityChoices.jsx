import { useState } from "react";

export const Slide8OpportunityChoices = ({ scroll }) => {
  const [opportunityChoice, setOpportunityChoice] = useState("");
  const [showOpportunityResult, setShowOpportunityResult] = useState(false);

  const handleOpportunityChoice = (choice) => {
    setOpportunityChoice(choice);
    setShowOpportunityResult(true);
  };
    
    return(
    <div className="max-w-2xl w-full text-center space-y-8">
          <h2 className="text-xl font-semibold text-gray-800">
            How do you think opportunities changed from the first question to the second?
          </h2>
          
          <p className="text-lg text-gray-700">I think it:</p>
          
          <div className="space-y-4">
            <button
              onClick={() => handleOpportunityChoice('Increased')}
              className={`w-full py-3 px-6 rounded-lg border-2 transition-all ${
                opportunityChoice === 'Increased' 
                  ? 'bg-green-500 text-white border-green-500' 
                  : 'bg-white text-gray-700 border-gray-300 hover:border-green-500'
              }`}
            >
              Increased
            </button>
            <button
              onClick={() => handleOpportunityChoice('Decreased')}
              className={`w-full py-3 px-6 rounded-lg border-2 transition-all ${
                opportunityChoice === 'Decreased' 
                  ? 'bg-red-500 text-white border-red-500' 
                  : 'bg-white text-gray-700 border-gray-300 hover:border-red-500'
              }`}
            >
              Decreased
            </button>
            <button
              onClick={() => handleOpportunityChoice("Didn't change")}
              className={`w-full py-3 px-6 rounded-lg border-2 transition-all ${
                opportunityChoice === "Didn't change" 
                  ? 'bg-gray-500 text-white border-gray-500' 
                  : 'bg-white text-gray-700 border-gray-300 hover:border-gray-500'
              }`}
            >
              Didn't change
            </button>
          </div>
          
          {showOpportunityResult && (
            <div className="bg-green-50 border-l-4 border-green-400 p-6 text-left transition-all duration-500">
              <h3 className="text-lg font-bold text-green-800 mb-3">Your opportunities increased!</h3>
              <p className="text-gray-700 leading-relaxed">
                What does that mean? Well, before the first question, you likely didn't know much (or anything) about Python, but now you've worked on two tasks on the concept <strong>Index Slicing in Python</strong>.
              </p>
            </div>
          )}
          
          {showOpportunityResult && (
            <div className="text-center">
              <button
                onClick={() => scroll(9)}
                className="px-8 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                Next →
              </button>
            </div>
          )}
        </div>
)}