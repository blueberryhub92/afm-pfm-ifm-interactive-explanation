import { useState } from "react";

export const Slide19AFMFormula = ({scroll}) => {
  const [showMath, setShowMath] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  const handleStartPart3 = () => {
    scroll(20);
  };

  return (

      <div
        className="flex flex-col items-center justify-center px-8 py-16"
        style={{ minHeight: "calc(100vh - 80px)" }}
      >
        <div className="max-w-6xl w-full space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Additive Factor Model (AFM)
            </h2>
            <p className="text-lg text-gray-600 italic">
              Optional: Learn about the math behind AFM by expanding the section
              below. Press continue when you're ready to move on.
            </p>
          </div>

          {/* Expandable section */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <button
              onClick={() => setShowMath(!showMath)}
              className="w-full bg-purple-600 text-white px-6 py-4 text-left font-semibold hover:bg-purple-700 transition-colors flex items-center justify-between"
            >
              <span>See the math</span>
              <span className="text-xl">{showMath ? "-" : "+"}</span>
            </button>

            {showMath && (
              <div className="p-6 space-y-6 bg-white">
                {!showDemo ? (
                  // Original math content
                  <>
                    <p className="text-gray-700 leading-relaxed">
                      The AFM calculates the <strong>log-odds</strong> of a
                      student answering a question correctly using the formula:
                    </p>

                    {/* AFM Formula */}
                    <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-purple-400">
                      <div className="text-center text-xl font-mono mb-4">
                        log(p<sub>ij</sub> / (1 - p<sub>ij</sub>)) = θ
                        <sub>i</sub> + Σ<sub>k=1</sub>
                        <sup>K</sup> q<sub>jk</sub>β<sub>k</sub> + Σ
                        <sub>k=1</sub>
                        <sup>K</sup> q<sub>jk</sub>γ<sub>k</sub>T<sub>ik</sub>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <p className="text-gray-700 leading-relaxed">
                        <strong>Where:</strong>
                      </p>
                      <ul className="space-y-2 text-gray-700 ml-4">
                        <li>
                          <strong>
                            p<sub>ij</sub>
                          </strong>{" "}
                          = probability that student <em>i</em> answers item{" "}
                          <em>j</em> correctly
                        </li>
                        <li>
                          <strong>
                            θ<sub>i</sub>
                          </strong>{" "}
                          = baseline proficiency of student <em>i</em>
                        </li>
                        <li>
                          <strong>
                            q<sub>jk</sub>
                          </strong>{" "}
                          = whether item <em>j</em> requires skill <em>k</em> (1
                          if yes, 0 if no)
                        </li>
                        <li>
                          <strong>
                            β<sub>k</sub>
                          </strong>{" "}
                          = difficulty parameter for skill <em>k</em> (negative
                          values = harder skills)
                        </li>
                        <li>
                          <strong>
                            γ<sub>k</sub>
                          </strong>{" "}
                          = learning rate parameter for skill <em>k</em>
                        </li>
                        <li>
                          <strong>
                            T<sub>ik</sub>
                          </strong>{" "}
                          = number of opportunities student <em>i</em> has had
                          to practice skill <em>k</em>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                      <p className="text-gray-700 leading-relaxed">
                        <strong>Key insight:</strong> AFM models learning as
                        additive - each practice opportunity (T) contributes to
                        improving performance, with the improvement rate
                        determined by the learning parameter (γ) for each skill.
                        The model accounts for both inherent skill difficulty
                        (β) and individual student ability (θ).
                      </p>
                    </div>

                    {/* Got it! button */}
                    <div className="text-center mt-8">
                      <button
                        onClick={() => setShowDemo(true)}
                        className="px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-lg font-semibold"
                      >
                        Got it!
                      </button>
                    </div>
                  </>
                ) : (
                  // Demo content
                  <>
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">
                        AFM in Action: Log-Odds vs Probability
                      </h3>
                      <p className="text-gray-600">
                        Here's a clear demonstration of how the{" "}
                        <strong>Additive Factor Model (AFM)</strong> links{" "}
                        <strong>log-odds</strong> and{" "}
                        <strong>probability</strong> with skill practice:
                      </p>
                    </div>

                    {/* Charts placeholder */}
                    <div className="bg-gray-200 rounded-lg p-8 text-center">
                      <p className="text-sm text-gray-500">
                        <img
                          src="log-odds-probability-chart.png"
                          alt="Charts"
                          className="w-full"
                        />
                      </p>
                    </div>

                    {/* Explanations */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Left explanation */}
                      <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                        <h4 className="font-bold text-blue-800 mb-3">
                          Left Plot: Log-Odds vs Practice Opportunities
                        </h4>
                        <ul className="space-y-2 text-gray-700 text-sm">
                          <li>
                            • This grows <strong>linearly</strong> as practice
                            increases.
                          </li>
                          <li>
                            • <strong>Formula:</strong>
                          </li>
                          <li className="font-mono text-xs bg-white p-2 rounded ml-4">
                            log-odds = θᵢ + Σₖ qⱼₖβₖ + Σₖ qⱼₖγₖTᵢₖ
                          </li>
                          <li>
                            • In our example: Two skills contribute learning, so
                            the slope is the{" "}
                            <strong>sum of their learning rates</strong>.
                          </li>
                        </ul>
                      </div>

                      {/* Right explanation */}
                      <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                        <h4 className="font-bold text-green-800 mb-3">
                          Right Plot: Probability vs Practice Opportunities
                        </h4>
                        <ul className="space-y-2 text-gray-700 text-sm">
                          <li>
                            • This grows <strong>nonlinearly</strong> (sigmoid
                            shape) because:
                          </li>
                          <li className="font-mono text-xs bg-white p-2 rounded ml-4">
                            p = 1 / (1 + e⁻ˡᵒᵍ⁻ᵒᵈᵈˢ)
                          </li>
                          <li>
                            • Even though log-odds increase linearly,
                            probability saturates toward 1 (maximum confidence
                            in mastery).
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Real-world analogy */}
                    <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                      <h4 className="font-bold text-yellow-800 mb-3">
                        Real-World Analogy:
                      </h4>
                      <p className="text-gray-700 leading-relaxed text-sm">
                        Think of this as practicing math problems: Each attempt{" "}
                        <strong>strengthens your skill</strong> (linear gain in
                        log-odds). But your{" "}
                        <strong>confidence in getting it right</strong>{" "}
                        (probability) grows <strong>quickly at first</strong>,
                        then <strong>levels off</strong> — reflecting
                        diminishing returns.
                      </p>
                    </div>

                    {/* Back button */}
                    <div className="text-center mt-6">
                      <button
                        onClick={() => setShowDemo(false)}
                        className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold"
                      >
                        ← Back to Formula
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Continue button */}
          <div className="text-center mt-12">
            <button
              onClick={handleStartPart3}
              className="px-8 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-lg font-semibold"
            >
              Continue →
            </button>
          </div>
        </div>
      </div>
  );
};
