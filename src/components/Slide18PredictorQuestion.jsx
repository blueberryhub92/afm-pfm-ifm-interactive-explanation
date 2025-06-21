import { useState } from "react";

export const Slide18PredictorQuestion = ({ scroll }) => {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSubmit = () => {
    setShowExplanation(true);
  };

  const handleContinue19 = () => {
    scroll(19);
  };

  return (
    <div className="max-w-2xl w-full space-y-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Which of the following does change throughout a learning session and
        therefore acts as a predictor variable in the regression model?
      </h2>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <p className="text-lg text-gray-700 mb-4 italic">Select your answer:</p>
        <div className="space-y-4 mb-6">
          {[
            "ability",
            "skill difficulty",
            "opportunities",
            "learning rate",
          ].map((option) => (
            <label
              key={option}
              className="flex items-center space-x-3 cursor-pointer"
            >
              <input
                type="radio"
                name="predictor"
                value={option}
                checked={selectedAnswer === option}
                onChange={(e) => setSelectedAnswer(e.target.value)}
                className="w-4 h-4 text-purple-600 focus:ring-purple-500"
              />
              <span className="text-lg text-gray-700 capitalize">{option}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={handleSubmit}
          disabled={!selectedAnswer}
          className="px-8 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Submit
        </button>
      </div>

      {showExplanation && (
        <div className="bg-gray-50 rounded-lg shadow-lg p-6 space-y-6">
          <div className="text-center">
            {selectedAnswer === "opportunities" ? (
              <p className="text-lg text-green-600 font-semibold">Nice work!</p>
            ) : (
              <p className="text-lg text-blue-900 font-semibold">No!</p>
            )}
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              The increase in success probability comes from:
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>
                <strong>Practice effect</strong> (γ × practice_count term)
              </li>
              <li>
                <strong>NOT from increasing ability</strong>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-gray-800 mb-4">
              The AFM assumes that each student has a{" "}
              <strong>fixed ability level</strong> for the duration of the
              analysis. Learning happens through the{" "}
              <strong>practice effect</strong>, not through changing ability.
              Here's how:
            </p>
          </div>

          <div className="bg-white p-4 rounded border-l-4 border-blue-500">
            <h4 className="font-bold text-gray-800 mb-2">
              1. Student Ability (θ) - Your Baseline
            </h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
              <li>This represents your 'starting point' skill level</li>
              <li>
                <strong>It stays constant</strong> during the prediction period
              </li>
              <li>
                Think of it as your 'natural aptitude' for this type of problem
              </li>
            </ul>
          </div>

          <div className="bg-white p-4 rounded border-l-4 border-green-500">
            <h4 className="font-bold text-gray-800 mb-2">
              2. Practice Effect (γ × practice_count) - Where Learning Lives
            </h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
              <li>
                <strong>This is where the model captures learning</strong>
              </li>
              <li>Each practice attempt adds γ to your log-odds of success</li>
              <li>The more you practice, the higher this term gets</li>
              <li>
                <strong>
                  This is the AFM's way of modeling skill improvement
                </strong>
              </li>
            </ul>
          </div>

          <div className="bg-purple-50 p-4 rounded">
            <h4 className="font-bold text-gray-800 mb-2">What This Means</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
              <li>
                AFM doesn't say 'you got smarter' - it says 'you got more
                practice'
              </li>
              <li>Your underlying ability stays the same</li>
              <li>
                But your performance improves because practice makes you better
                at this specific skill
              </li>
            </ul>
          </div>

          <div className="text-center">
            <button
              onClick={handleContinue19}
              className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
