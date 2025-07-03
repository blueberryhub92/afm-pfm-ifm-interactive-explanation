import { useState } from "react";
import {
  ArrowRight,
  CheckCircle,
  XCircle,
  Brain,
  AlertTriangle,
  TrendingUp,
  Target,
  Lightbulb,
} from "lucide-react";

export const Slide22AFMCorrectness = ({ scroll }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showModelTeaser, setShowModelTeaser] = useState(false);

  const steps = [
    {
      title: "The Correctness Challenge",
      content: (
        <div className="space-y-6">
          <div className="border-l-8 border-orange-600 bg-orange-100 p-6 rounded-r-xl">
            <p className="text-black text-xl font-bold leading-relaxed">
              Remember the scenario where you answered incorrectly but your success probability still increased? This highlights a key limitation of AFM's approach to learning.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-4 border-red-600 rounded-xl p-6 bg-red-50">
              <div className="flex items-center gap-3 mb-4">
                <XCircle className="w-8 h-8 text-red-600" />
                <h3 className="text-xl font-bold text-red-700 uppercase tracking-wide">Incorrect Answer</h3>
              </div>
              <p className="text-black font-bold text-lg">
                In AFM, getting an answer wrong still increases your success probability because any attempt is considered practice.
              </p>
            </div>
            
            <div className="border-4 border-green-600 rounded-xl p-6 bg-green-50">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <h3 className="text-xl font-bold text-green-700 uppercase tracking-wide">Correct Answer</h3>
              </div>
              <p className="text-black font-bold text-lg">
                Correct answers also increase success probability, but by the same amount as incorrect ones.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Why This Matters",
      content: (
        <div className="space-y-6">
          <div className="border-4 border-purple-600 rounded-xl p-6 bg-purple-50">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="w-8 h-8 text-purple-600" />
              <h3 className="text-xl font-bold text-purple-700 uppercase tracking-wide">Real Learning Patterns</h3>
            </div>
            <p className="text-black text-lg font-bold leading-relaxed">
              In reality, correct and incorrect answers provide different types of feedback and should have different impacts on our confidence in a student's mastery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-l-4 border-green-600 bg-green-100 p-4 rounded-r-lg">
              <h4 className="font-bold text-green-700 mb-2 uppercase">Correct Answers Should:</h4>
              <ul className="text-black font-bold space-y-1">
                <li>• Increase confidence more</li>
                <li>• Reinforce correct patterns</li>
                <li>• Strengthen mastery</li>
              </ul>
            </div>
            
            <div className="border-l-4 border-red-600 bg-red-100 p-4 rounded-r-lg">
              <h4 className="font-bold text-red-700 mb-2 uppercase">Incorrect Answers Should:</h4>
              <ul className="text-black font-bold space-y-1">
                <li>• Provide learning opportunities</li>
                <li>• But increase confidence less</li>
                <li>• Or even decrease it initially</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "The Impact on Learning",
      content: (
        <div className="space-y-6">
          <div className="border-4 border-yellow-600 rounded-xl p-6 bg-yellow-50">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-8 h-8 text-yellow-600" />
              <h3 className="text-xl font-bold text-yellow-700 uppercase tracking-wide">Potential Problems</h3>
            </div>
            <div className="space-y-4">
              <div className="border-l-4 border-yellow-600 bg-white p-4 rounded-r-lg">
                <p className="text-black font-bold">
                  <span className="text-yellow-700">Random Guessing:</span> Students could guess randomly and still see their success probability increase.
                </p>
              </div>
              <div className="border-l-4 border-yellow-600 bg-white p-4 rounded-r-lg">
                <p className="text-black font-bold">
                  <span className="text-yellow-700">Overconfidence:</span> The system might overestimate student knowledge after incorrect responses.
                </p>
              </div>
              <div className="border-l-4 border-yellow-600 bg-white p-4 rounded-r-lg">
                <p className="text-black font-bold">
                  <span className="text-yellow-700">Motivation Issues:</span> Students might not feel the need to focus on accuracy.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => setShowModelTeaser(true)}
              className="px-8 py-4 bg-blue-600 text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-blue-600 transition-all transform hover:scale-105 flex items-center gap-3 mx-auto"
            >
              <Lightbulb className="w-5 h-5" />
              <span>Is there a better approach?</span>
            </button>
          </div>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col text-black font-['IBM_Plex_Mono',monospace]">
      {/* Header */}
      <div className="border-b-8 border-black bg-red-400 px-8 py-6 shadow-lg">
        <div className="flex items-center justify-center">
          <span className="text-black font-bold text-2xl uppercase tracking-wider">
            AFM & Answer Correctness
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Indicator */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              {steps.map((_, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className={`w-4 h-4 rounded-full border-2 border-black ${
                      index <= currentStep ? 'bg-red-600' : 'bg-gray-200'
                    }`}
                  />
                  {index < steps.length - 1 && (
                    <div className={`w-12 h-1 border-t-2 border-black ${
                      index < currentStep ? 'bg-red-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg mb-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-black uppercase tracking-tight">
              {steps[currentStep].title}
            </h2>
            
            {steps[currentStep].content}
          </div>

          {/* Model Teaser */}
          {showModelTeaser && (
            <div className="border-4 border-green-600 rounded-xl p-8 bg-green-50 mb-8">
              <div className="text-center space-y-6">
                <div className="flex items-center justify-center gap-3">
                  <Target className="w-12 h-12 text-green-600" />
                  <h3 className="text-3xl font-bold text-green-700 uppercase tracking-wide">
                    Good News!
                  </h3>
                </div>
                
                <p className="text-black text-xl font-bold leading-relaxed">
                  There are learning models that <span className="bg-yellow-300 px-2 py-1 border-2 border-black rounded">DO</span> take answer correctness into account when updating success probabilities.
                </p>
                
                <div className="border-4 border-green-600 rounded-xl p-6 bg-white">
                  <p className="text-black text-lg font-bold">
                    These models can differentiate between correct and incorrect responses, 
                    providing more accurate predictions of student knowledge and more 
                    effective learning experiences.
                  </p>
                </div>

                <div className="flex items-center justify-center gap-2 text-green-700">
                  <TrendingUp className="w-6 h-6" />
                  <span className="font-bold text-lg uppercase tracking-wide">
                    Let's explore one such model!
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="px-6 py-3 bg-gray-600 text-white border-4 border-black rounded-xl font-bold uppercase tracking-wide hover:bg-white hover:text-gray-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Previous
            </button>

            <div className="px-6 py-3 bg-white border-4 border-black rounded-xl font-bold text-black uppercase tracking-wide">
              Step {currentStep + 1} of {steps.length}
            </div>

            {currentStep < steps.length - 1 ? (
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-red-600 text-white border-4 border-black rounded-xl font-bold uppercase tracking-wide hover:bg-white hover:text-red-600 transition-all"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={() => scroll(23)}
                disabled={!showModelTeaser}
                className="px-8 py-4 bg-green-600 text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-green-600 transition-all transform hover:scale-105 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Discover the Solution</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};