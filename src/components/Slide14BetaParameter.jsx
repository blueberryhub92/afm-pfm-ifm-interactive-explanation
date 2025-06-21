import { useState } from "react";

export const Slide14BetaParameter = ({ scroll }) => {
  const [betaAnswer1, setBetaAnswer1] = useState("");
  const [betaAnswer2, setBetaAnswer2] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleBetaSubmit = () => {
    const correct1 = betaAnswer1 === "easier";
    const correct2 = betaAnswer2 === "more";
    const allCorrect = correct1 && correct2;

    setIsCorrect(allCorrect);
    setShowResult(true);
  };

  const handleContinue15 = () => {
    scroll(15);
  };

  return (
    <div className="max-w-2xl w-full space-y-8">
      <p className="text-lg text-gray-700 leading-relaxed">
        We measure how hard a skill is to learn with{" "}
        <strong>task difficulty (β)</strong>, which represents how hard a
        specific skill is to master. In practice, this is estimated from
        aggregated student performance data - skills that most students find
        difficult have more negative β values.
      </p>
      <p className="text-lg text-gray-700 leading-relaxed">
        A lower β suggests that the skill is harder to learn, so it's less
        likely that the student will answer a task on the same concept correctly
        on the next try.
      </p>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <p className="text-lg text-gray-700 mb-4 italic">
          Click to fill in the blanks!
        </p>
        <p className="text-lg text-gray-700 mb-4">
          On the other hand, a higher β suggests that the skill is{" "}
          <select
            value={betaAnswer1}
            onChange={(e) => setBetaAnswer1(e.target.value)}
            className="inline-block px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">...</option>
            <option value="easier">easier</option>
            <option value="harder">harder</option>
          </select>{" "}
          to learn, so it's{" "}
          <select
            value={betaAnswer2}
            onChange={(e) => setBetaAnswer2(e.target.value)}
            className="inline-block px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">...</option>
            <option value="more">more</option>
            <option value="less">less</option>
          </select>{" "}
          likely that the student will answer a task on the same concept
          correctly on the next try.
        </p>
      </div>
      <div className="text-center">
        <button
          onClick={handleBetaSubmit}
          className="px-8 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
        >
          Submit
        </button>
      </div>

      {showResult && (
        <div className="text-center space-y-4">
          {isCorrect ? (
            <p className="text-lg text-green-600 font-semibold">Nice work!</p>
          ) : (
            <p className="text-lg text-blue-900 font-semibold">
              The correct answer would have been: easier, more
            </p>
          )}

          <button
            onClick={handleContinue15}
            className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
};
