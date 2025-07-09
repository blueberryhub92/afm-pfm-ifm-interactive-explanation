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
        <div className="max-w-6xl mx-auto space-y-8">

          {/* Main Concept Section */}
          <div className="border-2 border-black bg-white relative">
            {/* Technical drawing corner marker */}
            <div className="absolute top-2 right-2 w-2 h-2 border border-black bg-white" />
            
            {/* Module label */}
            <div className="absolute -top-4 left-4">
              <div className="bg-black text-white px-3 py-1 text-sm font-mono tracking-wider border border-black flex items-center gap-2">
                <Target className="w-4 h-4" />
                MODULE-014A
              </div>
            </div>
            
            <div className="p-8 pt-12">
              <div className="text-4xl font-bold tracking-wide text-black mb-6 uppercase">
                Understanding Task Difficulty
              </div>
              
              <div className="space-y-6 text-lg font-mono leading-relaxed">
                <p className="text-black">
                  We measure how hard a skill is to learn with{" "}
                  <span className="bg-black text-white px-2 py-1 font-bold border border-black">
                    task difficulty (β)
                  </span>, which represents how hard a specific skill is to master. In practice, this is estimated from aggregated student performance data - skills that most students find difficult have more negative β values.
                </p>
                
                <div className="border-l-4 border-black bg-gray-100 p-4 relative">
                  <div className="absolute top-2 left-2 w-1 h-1 bg-black" />
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingDown className="w-5 h-5 text-black" />
                    <span className="font-bold text-black uppercase tracking-wider text-lg">Lower β (Harder Skills)</span>
                  </div>
                  <p className="text-black text-base">
                    A lower β suggests that the skill is harder to learn, so it's less likely that the student will answer a task on the same concept correctly on the next try.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Exercise */}
          <div className="border-2 border-black bg-white relative">
            {/* Technical drawing corner marker */}
            <div className="absolute top-2 right-2 w-2 h-2 border border-black bg-white" />
            
            {/* Module label */}
            <div className="absolute -top-4 left-4">
              <div className="bg-black text-white px-3 py-1 text-sm font-mono tracking-wider border border-black flex items-center gap-2">
                <Brain className="w-4 h-4" />
                MODULE-014B
              </div>
            </div>
            
            <div className="p-8 pt-12">
              <div className="flex items-center gap-2 mb-6">
                <BookOpen className="w-6 h-6 text-black" />
                <span className="text-2xl font-bold text-black uppercase tracking-wider">Interactive Exercise</span>
              </div>
              
              <div className="border-l-4 border-black bg-gray-100 p-6 relative">
                <div className="absolute top-2 left-2 w-1 h-1 bg-black" />
                <div className="absolute bottom-2 left-2 w-1 h-1 bg-black" />
                
                <div className="text-lg font-mono text-black leading-relaxed">
                  On the other hand, a higher β suggests that the skill is{" "}
                  <select
                    value={betaAnswer1}
                    onChange={(e) => setBetaAnswer1(e.target.value)}
                    className="inline-block px-3 py-2 border-2 border-black bg-white font-mono text-black focus:outline-none focus:ring-2 focus:ring-black mx-1 text-lg"
                  >
                    <option value="">...</option>
                    <option value="easier">easier</option>
                    <option value="harder">harder</option>
                  </select>{" "}
                  to learn, so it's{" "}
                  <select
                    value={betaAnswer2}
                    onChange={(e) => setBetaAnswer2(e.target.value)}
                    className="inline-block px-3 py-2 border-2 border-black bg-white font-mono text-black focus:outline-none focus:ring-2 focus:ring-black mx-1 text-lg"
                  >
                    <option value="">...</option>
                    <option value="more">more</option>
                    <option value="less">less</option>
                  </select>{" "}
                  likely that the student will answer a task on the same concept correctly on the next try.
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          {!showResult && (
            <div className="flex justify-center">
              <button
                onClick={handleBetaSubmit}
                disabled={!betaAnswer1 || !betaAnswer2}
                className={`px-8 py-4 border-2 border-black font-bold text-lg uppercase tracking-wide transition-all transform hover:scale-105 ${
                  betaAnswer1 && betaAnswer2
                    ? "bg-black text-white hover:bg-white hover:text-black"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed border-gray-300"
                }`}
              >
                Submit Answer
              </button>
            </div>
          )}

          {/* Results */}
          {showResult && (
            <div className="border-2 border-black bg-white relative">
              {/* Technical drawing corner marker */}
              <div className="absolute top-2 right-2 w-2 h-2 border border-black bg-white" />
              
              {/* Module label */}
              <div className="absolute -top-4 left-4">
                <div className={`px-3 py-1 text-sm font-mono tracking-wider border border-black flex items-center gap-2 ${
                  isCorrect ? "bg-black text-white" : "bg-white text-black"
                }`}>
                  {isCorrect ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                  {isCorrect ? "RESULT-CORRECT" : "RESULT-REVIEW"}
                </div>
              </div>
              
              <div className="p-8 pt-12">
                <div className="text-center space-y-6">
                  {isCorrect ? (
                    <div className="text-3xl text-black font-bold flex items-center justify-center gap-3 uppercase tracking-wider">
                      <CheckCircle className="w-8 h-8" />
                      <span>Operation Successful</span>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="text-2xl text-black font-bold uppercase tracking-wider">
                        Expected Output:
                      </div>
                      <div className="bg-gray-100 border-2 border-black p-4 relative">
                        <div className="absolute top-1 left-1 w-1 h-1 bg-black" />
                        <div className="absolute top-1 right-1 w-1 h-1 bg-black" />
                        <div className="absolute bottom-1 left-1 w-1 h-1 bg-black" />
                        <div className="absolute bottom-1 right-1 w-1 h-1 bg-black" />
                        <span className="text-lg font-mono">
                          <span className="bg-black text-white px-2 py-1 font-bold">easier</span>
                          {" "} and {" "}
                          <span className="bg-black text-white px-2 py-1 font-bold">more</span>
                        </span>
                      </div>
                    </div>
                  )}
                  
                  <button
                    onClick={() => scroll(11)}
                    className="px-8 py-4 bg-black text-white border-2 border-black font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-black transition-all transform hover:scale-105 flex items-center gap-3 mx-auto"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};