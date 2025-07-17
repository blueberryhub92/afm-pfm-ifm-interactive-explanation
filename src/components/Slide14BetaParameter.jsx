import { useState } from "react";
import { Target, Brain, CheckCircle, XCircle, ArrowRight, BookOpen, TrendingDown, TrendingUp } from "lucide-react";

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

  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center py-8 px-4 md:px-10 text-black font-['IBM_Plex_Mono',monospace]">
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">

        {/* Main Concept */}
        <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative">
          <div className="absolute -top-6 left-4 px-3 py-1 bg-purple-600 text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
            <Target className="w-4 h-4" />
            BETA PARAMETER (β)
          </div>
          <div className="text-xl md:text-2xl font-bold tracking-tight text-black mb-6">
            Understanding Task Difficulty
          </div>

          <div className="space-y-6 text-lg leading-relaxed">
            <p className="text-black">
              We measure how hard a skill is to learn with{" "}
              <span className="bg-purple-200 px-2 py-1 rounded font-bold border-2 border-purple-600">
                task difficulty (β)
              </span>, which represents how hard a specific skill is to master. In practice, this is estimated from aggregated student performance data - skills that most students find difficult have more negative β values.
            </p>

            <div className="border-l-8 border-red-500 bg-red-50 p-4 rounded-r-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="w-5 h-5 text-red-700" />
                <span className="font-bold text-red-700">Lower β (Harder Skills)</span>
              </div>
              <p className="text-black">
                A lower β suggests that the skill is harder to learn, so it's less likely that the student will answer a task on the same concept correctly on the next try.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Exercise */}
        <div className="border-4 border-black rounded-xl p-8 bg-gradient-to-br from-yellow-100 to-orange-100 shadow-lg relative">
          <div className="absolute -top-6 left-4 px-3 py-1 bg-orange-600 text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
            <Brain className="w-4 h-4" />
            INTERACTIVE EXERCISE
          </div>

          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="w-6 h-6 text-orange-700" />
            <span className="text-xl font-bold text-black">Fill in the blanks!</span>
          </div>

          <div className="border-l-8 border-green-500 bg-green-50 p-6 rounded-r-lg">

            <div className="text-lg text-black leading-relaxed">
              On the other hand, a higher β suggests that the skill is{" "}
              <select
                value={betaAnswer1}
                onChange={(e) => setBetaAnswer1(e.target.value)}
                className="inline-block px-4 py-2 border-4 border-black rounded-lg bg-white font-bold text-black focus:outline-none focus:ring-4 focus:ring-purple-300 mx-1"
              >
                <option value="">...</option>
                <option value="easier">easier</option>
                <option value="harder">harder</option>
              </select>{" "}
              to learn, so it's{" "}
              <select
                value={betaAnswer2}
                onChange={(e) => setBetaAnswer2(e.target.value)}
                className="inline-block px-4 py-2 border-4 border-black rounded-lg bg-white font-bold text-black focus:outline-none focus:ring-4 focus:ring-purple-300 mx-1"
              >
                <option value="">...</option>
                <option value="more">more</option>
                <option value="less">less</option>
              </select>{" "}
              likely that the student will answer a task on the same concept correctly on the next try.
            </div>
          </div>
        </div>

        {/* Submit Button */}
        {!showResult && (
          <div className="flex justify-center">
            <button
              onClick={handleBetaSubmit}
              disabled={!betaAnswer1 || !betaAnswer2}
              className={`px-8 py-4 border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide transition-all transform hover:scale-105 ${betaAnswer1 && betaAnswer2
                ? "bg-purple-600 text-white hover:bg-white hover:text-purple-600 hover:border-purple-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
            >
              Submit Answer
            </button>
          </div>
        )}

        {/* Results */}
        {showResult && (
          <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative">
            <div className={`absolute -top-6 left-4 px-3 py-1 text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2 ${isCorrect ? "bg-green-600" : "bg-blue-600"
              }`}>
              {isCorrect ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
              {isCorrect ? "CORRECT!" : "LEARNING MOMENT"}
            </div>

            <div className="text-center space-y-6">
              {isCorrect ? (
                <div className="text-2xl text-green-700 font-bold flex items-center justify-center gap-3">
                  <CheckCircle className="w-8 h-8" />
                  <span>Nice work!</span>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-xl text-blue-900 font-bold">
                    The correct answer would have been:
                  </div>
                  <div className="bg-blue-50 border-4 border-blue-600 rounded-xl p-4">
                    <span className="text-lg font-mono">
                      <span className="bg-blue-200 px-2 py-1 rounded font-bold">easier</span>
                      {" "} and {" "}
                      <span className="bg-blue-200 px-2 py-1 rounded font-bold">more</span>
                    </span>
                  </div>
                </div>
              )}

              <button
                onClick={() => scroll(11)}
                className="px-8 py-4 bg-blue-600 text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-blue-600 hover:border-blue-600 transition-all transform hover:scale-105 flex items-center gap-3 mx-auto"
              >
                <span>Continue</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};