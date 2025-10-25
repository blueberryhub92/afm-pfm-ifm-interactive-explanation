import React, { useState, useEffect, useRef } from "react";
import {
  CheckCircle,
  XCircle,
  RotateCcw,
  TrendingUp,
  Calculator,
  ArrowRight,
  ArrowLeft,
  Brain,
  Zap,
  Target,
  HelpCircle,
  Lightbulb,
  Info,
  X,
  AlertTriangle,
} from "lucide-react";
import { getUserId } from "../utils/analytics";

export const ModelComparison = ({ navigate }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [ifmProbability, setIfmProbability] = useState(0.4);
  const [afmProbability, setAfmProbability] = useState(0.4);
  const [pfmProbability, setPfmProbability] = useState(0.4);
  const [hoveredTerm, setHoveredTerm] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showDebriefingTooltip, setShowDebriefingTooltip] = useState(false);
  const [showHintInterpretation, setShowHintInterpretation] = useState(false);

  const userId = getUserId();

  const simulationRef = useRef(null);
  const parameterRef = useRef(null);
  const hintInterpretationRef = useRef(null);

  // Learning scenario: For loops and while loops in Python
  const answerSequence = [
    {
      correct: true,
      hints: 0,
      description: "for i in range(5): print(i) - correctly printed 0-4",
    },
    {
      correct: false,
      hints: 2,
      description: "while loop condition error, hints about termination needed",
    },
    {
      correct: true,
      hints: 1,
      description: "nested for loop with hint about indentation",
    },
    {
      correct: false,
      hints: 3,
      description:
        "infinite loop bug, multiple hints about loop exit conditions",
    },
    {
      correct: true,
      hints: 0,
      description: "for loop with enumerate() - mastered independently",
    },
    {
      correct: true,
      hints: 1,
      description: "while loop with counter, one hint about initialization",
    },
    {
      correct: false,
      hints: 2,
      description:
        "list comprehension vs loop confusion, hints clarified syntax",
    },
    {
      correct: true,
      hints: 0,
      description:
        "complex nested loops for matrix iteration - solved independently",
    },
  ];

  // AFM parameters (MOST OPTIMISTIC - treats all practice as beneficial)
  const afmParams = {
    baseline: 0.4,
    skillDifficulty: -0.6,
    gammaUnified: 0.18, // High learning from all attempts (optimistic)
  };

  // PFM parameters (MODERATE - successes help, failures hurt)
  const pfmParams = {
    baseline: 0.4,
    skillDifficulty: -0.6,
    gammaSuccess: 0.16, // Learning from correct responses
    gammaFailure: -0.06, // Penalty for incorrect responses
  };

  // IFM parameters (LEAST OPTIMISTIC - most conservative)
  const ifmParams = {
    baseline: 0.4, // θ (student baseline)
    skillDifficulty: -0.6, // β (KC difficulty)
    successEffect: 0.12, // μ (effect of prior successes) - modest boost
    failureEffect: -0.15, // ρ (effect of prior failures) - strong penalty
    hintEffect: -0.08, // ν (effect of prior hints/tells) - slight penalty
  };

  const calculateProbabilities = (step) => {
    if (step === 0) {
      return { ifm: 0.4, afm: 0.4, pfm: 0.4 };
    }

    let totalSuccesses = 0;
    let totalFailures = 0;
    let totalHints = 0;
    let totalAttempts = 0;

    // Count up to current step
    for (let i = 0; i < Math.min(step, answerSequence.length); i++) {
      const answer = answerSequence[i];
      totalHints += answer.hints;
      totalAttempts++;

      if (answer.correct) {
        totalSuccesses++;
      } else {
        totalFailures++;
      }
    }

    // AFM calculation (MOST OPTIMISTIC): log-odds = baseline + difficulty + (gamma * total_attempts)
    const afmLogOdds =
      afmParams.baseline +
      afmParams.skillDifficulty +
      afmParams.gammaUnified * totalAttempts;
    const afmProb = 1 / (1 + Math.exp(-afmLogOdds));

    // PFM calculation (MODERATE): separate learning rates for successes/failures only
    const pfmLogOdds =
      pfmParams.baseline +
      pfmParams.skillDifficulty +
      pfmParams.gammaSuccess * totalSuccesses +
      pfmParams.gammaFailure * totalFailures;
    const pfmProb = 1 / (1 + Math.exp(-pfmLogOdds));

    // IFM calculation (LEAST OPTIMISTIC): log-odds = θ + β + μ*S + ρ*F + ν*T
    const ifmLogOdds =
      ifmParams.baseline +
      ifmParams.skillDifficulty +
      ifmParams.successEffect * totalSuccesses +
      ifmParams.failureEffect * totalFailures +
      ifmParams.hintEffect * totalHints;
    const ifmProb = 1 / (1 + Math.exp(-ifmLogOdds));

    return {
      afm: Math.max(0.05, Math.min(0.95, afmProb)),
      pfm: Math.max(0.05, Math.min(0.95, pfmProb)),
      ifm: Math.max(0.05, Math.min(0.95, ifmProb)),
    };
  };

  const handleNextStep = () => {
    if (currentStep < answerSequence.length) {
      const nextStep = currentStep + 1;
      const probabilities = calculateProbabilities(nextStep);
      setAfmProbability(probabilities.afm);
      setPfmProbability(probabilities.pfm);
      setIfmProbability(probabilities.ifm);
      setCurrentStep(nextStep);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      const probabilities = calculateProbabilities(prevStep);
      setAfmProbability(probabilities.afm);
      setPfmProbability(probabilities.pfm);
      setIfmProbability(probabilities.ifm);
      setCurrentStep(prevStep);
    }
  };

  // Scroll to top on mount (instant)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  // Scroll to hint interpretation when opened
  useEffect(() => {
    if (showHintInterpretation && hintInterpretationRef.current) {
      // Small delay to ensure the content is rendered
      setTimeout(() => {
        hintInterpretationRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }, 100);
    }
  }, [showHintInterpretation]);

  const resetSimulation = () => {
    setCurrentStep(0);
    setAfmProbability(0.4);
    setPfmProbability(0.4);
    setIfmProbability(0.4);
  };

  const calculateTooltipPosition = () => {
    const margin = 16;
    return { x: margin, y: margin };
  };

  const handleMouseEnter = (term, ref) => {
    setHoveredTerm(term);
    const position = calculateTooltipPosition();
    setTooltipPosition(position);
  };

  const SimulationTooltip = () => (
    <div
      className="fixed z-50 bg-white border-4 border-black rounded-xl shadow-lg p-6 w-96 font-['IBM_Plex_Mono',monospace]"
      style={{
        left: `${tooltipPosition.x}px`,
        top: `${tooltipPosition.y}px`,
        maxWidth: "384px",
      }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Brain className="w-5 h-5 text-black" />
        <h4 className="font-bold text-black text-lg tracking-wide">
          SIMULATION DETAILS
        </h4>
      </div>

      <div className="border-4 border-black rounded-lg p-4 bg-gray-50 mb-4">
        <p className="text-black font-mono text-sm leading-relaxed mb-3">
          This simulation shows a student learning Python loops (for/while).
          Each step represents a coding problem, tracking correctness and hints
          needed.
        </p>
      </div>

      <div className="border-l-8 border-purple-600 bg-purple-100 p-3 rounded-r-lg">
        <h5 className="font-bold text-purple-800 mb-2 text-sm tracking-wide">
          OPTIMISM RANKING:
        </h5>
        <ul className="text-sm text-black font-mono space-y-1">
          <li>• AFM: Most optimistic - all attempts help</li>
          <li>• PFM: Moderate - successes help, failures hurt</li>
          <li>• IFM: Least optimistic - penalizes failures & hints</li>
        </ul>
      </div>
    </div>
  );

  const ParameterTooltip = () => (
    <div
      className="fixed z-50 bg-white border-4 border-black rounded-xl shadow-lg p-6 w-96 font-['IBM_Plex_Mono',monospace]"
      style={{
        left: `${tooltipPosition.x}px`,
        top: `${tooltipPosition.y}px`,
        maxWidth: "384px",
      }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="w-5 h-5 text-black" />
        <h4 className="font-bold text-black text-lg tracking-wide">
          PARAMETER VALUES
        </h4>
      </div>

      <div className="space-y-4">
        <div className="border-4 border-green-600 rounded-lg p-4 bg-green-50">
          <h5 className="font-bold text-green-800 mb-2 text-sm tracking-wide">
            AFM PARAMETERS (MOST OPTIMISTIC):
          </h5>
          <div className="text-sm text-black font-mono space-y-1">
            <div>θ (baseline) = 0.4</div>
            <div>β (difficulty) = -0.6</div>
            <div>γ (unified) = +0.18</div>
            <div className="text-green-700 font-bold">
              All attempts = progress!
            </div>
          </div>
        </div>

        <div className="border-4 border-blue-600 rounded-lg p-4 bg-blue-50">
          <h5 className="font-bold text-blue-800 mb-2 text-sm tracking-wide">
            PFM PARAMETERS (MODERATE):
          </h5>
          <div className="text-sm text-black font-mono space-y-1">
            <div>θ (baseline) = 0.4</div>
            <div>β (difficulty) = -0.6</div>
            <div>γ_s (success) = +0.16</div>
            <div>γ_f (failure) = -0.06</div>
            <div className="text-blue-700 font-bold">
              Success helps, failure hurts
            </div>
          </div>
        </div>

        <div className="border-4 border-orange-600 rounded-lg p-4 bg-orange-50">
          <h5 className="font-bold text-orange-800 mb-2 text-sm tracking-wide">
            IFM PARAMETERS (LEAST OPTIMISTIC):
          </h5>
          <div className="text-sm text-black font-mono space-y-1">
            <div>θ (baseline) = 0.4</div>
            <div>β (difficulty) = -0.6</div>
            <div>μ (success) = +0.12</div>
            <div>ρ (failure) = -0.15</div>
            <div>ν (hint) = -0.08</div>
            <div className="text-orange-700 font-bold">Most conservative!</div>
          </div>
        </div>
      </div>
    </div>
  );

  const getCurrentAnswer = () => {
    if (currentStep === 0 || currentStep > answerSequence.length) return null;
    return answerSequence[currentStep - 1];
  };

  const getDetailedStats = () => {
    let totalSuccesses = 0;
    let totalFailures = 0;
    let totalHints = 0;

    for (let i = 0; i < Math.min(currentStep, answerSequence.length); i++) {
      const answer = answerSequence[i];
      totalHints += answer.hints;
      if (answer.correct) {
        totalSuccesses++;
      } else {
        totalFailures++;
      }
    }
    return { totalSuccesses, totalFailures, totalHints };
  };

  const DebriefingTooltip = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[9999]">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Study Debriefing
            </h2>
            <button
              onClick={() => setShowDebriefingTooltip(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">
              Research Study
            </h3>
            <p className="text-blue-700 font-medium mb-2">
              "Design, Implementation and Evaluation of Human-Centered,
              Interactive Simulations for Explainable Student Models"
            </p>
            <div className="text-sm text-blue-700">
              <p>
                <strong>Data Controller:</strong> Raphael Stedler
              </p>
              <p>
                <strong>Department:</strong> Human-centered Computing and
                Cognitive Science
              </p>
              <p>
                <strong>University:</strong> University of Duisburg-Essen
              </p>
              <p>
                <strong>Contact:</strong> raphael.stedler@stud.uni-due.de
              </p>
            </div>
          </div>

          <div className="space-y-4 text-gray-700">
            <div className="text-center mb-6">
              <p className="text-lg text-black font-medium">
                Thank you for participating in Phase 1 of our research!
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                What You Just Experienced
              </h3>
              <p className="text-sm text-gray-700 mb-4">
                You interacted with an educational app designed to teach three
                student modeling approaches: AFM (most optimistic), PFM
                (moderate), and IFM (most conservative). These models differ in
                how they interpret student learning from successes, failures,
                and hints.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                About This Research
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <p>
                    <strong>Study Title:</strong> "Design, Implementation and
                    Evaluation of Human-Centered, Interactive Simulations for
                    Explainable Student Models"
                  </p>
                  <p>
                    <strong>Researcher:</strong> Raphael Stedler
                  </p>
                  <p>
                    <strong>Institution:</strong> University of Duisburg-Essen
                  </p>
                  <p>
                    <strong>Department:</strong> Human-centered Computing and
                    Cognitive Science
                  </p>
                </div>
                <div className="space-y-2">
                  <p>
                    <strong>Purpose:</strong> Master's thesis research on
                    educational technology
                  </p>
                  <p>
                    <strong>Your Role:</strong> Phase 1 participant - app usage
                    and feedback
                  </p>
                  <p>
                    <strong>Data Use:</strong> Academic research and thesis
                    publication
                  </p>
                  <p>
                    <strong>Contact:</strong> raphael.stedler@stud.uni-due.de
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Optional Phase 2: Follow-Up Interview with Eye-Tracking or
                Screen Recording
              </h3>
              <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mb-4">
                <p className="text-center font-medium mb-2">
                  <strong>
                    You may be invited to participate in an optional follow-up
                    study!
                  </strong>
                </p>
                <p className="text-center text-orange-800 text-sm">
                  Duration: 40-45 minutes • Separate consent required •
                  Completely voluntary
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">
                    What Phase 2 Involves:
                  </h4>
                  <ol className="list-decimal pl-6 space-y-1">
                    <li>Brief introduction and setup (5 minutes)</li>
                    <li>
                      App interaction with eye-tracking or screen recording
                      (15-20 minutes)
                    </li>
                    <li>
                      Semi-structured interview about your experience (15-20
                      minutes)
                    </li>
                  </ol>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">
                    Why Eye-Tracking/Screen Recording?
                  </h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Understand how you visually process the interface</li>
                    <li>Track interaction patterns and focus areas</li>
                    <li>Gain deeper insights into your learning experience</li>
                    <li>Improve educational simulation design</li>
                  </ul>
                </div>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg mt-4">
                <h4 className="font-semibold text-gray-800 mb-2">
                  Important Notes:
                </h4>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>
                    <strong>Voluntary:</strong> Phase 2 participation is
                    completely optional
                  </li>
                  <li>
                    <strong>Privacy:</strong> Eye-tracking data is biometric
                    data, handled with strict confidentiality
                  </li>
                  <li>
                    <strong>Consent:</strong> Separate informed consent will be
                    requested for Phase 2
                  </li>
                  <li>
                    <strong>Data Linking:</strong> Your Phase 1 and Phase 2 data
                    will be connected via your study ID
                  </li>
                  <li>
                    <strong>Anonymity:</strong> All data will be anonymized in
                    publications and presentations
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Your Rights and Next Steps
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">
                    Your Data Rights:
                  </h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Request access to your data</li>
                    <li>Request correction or deletion</li>
                    <li>Withdraw consent at any time</li>
                    <li>File complaints with data protection authorities</li>
                    <li>Contact researcher with questions</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">
                    What Happens Next:
                  </h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Your app usage data is automatically saved</li>
                    <li>Please complete the questionnaire</li>
                    <li>You may be contacted for Phase 2 (optional)</li>
                    <li>Research results will be published in thesis</li>
                    <li>Thank you for contributing to learning science!</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Your Study ID
              </h3>
              <p className="text-gray-700 mb-2 text-sm">
                Save this ID for potential Phase 2 participation:
              </p>
              <div className="flex items-center gap-2">
                <code className="bg-blue-100 px-3 py-1 rounded text-sm font-mono text-blue-900">
                  {userId}
                </code>
                <button
                  onClick={() => navigator.clipboard.writeText(userId)}
                  className="text-blue-600 hover:text-blue-800 text-sm underline"
                >
                  Copy
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                This ID links your Phase 1 and Phase 2 data while maintaining
                your anonymity
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white min-h-screen flex flex-col text-black font-['IBM_Plex_Mono',monospace] relative">
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      {/* Header */}
      <div className="border-b-8 border-black bg-gradient-to-r from-orange-400 to-purple-400 px-8 py-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div></div>
          <span className="text-black font-bold text-2xl uppercase tracking-wider">
            AFM vs PFM vs IFM: Optimism Comparison
          </span>
          {/* Debriefing Info Button */}
          <button
            onClick={() => setShowDebriefingTooltip(true)}
            className="bg-blue-600 text-white px-4 py-3 rounded-xl border-4 border-black shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105 flex items-center gap-2 font-bold text-sm uppercase tracking-wide"
            title="Click to view study information and debriefing"
          >
            <Info className="w-5 h-5" />
            <span>Study Debriefing</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-8 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Introduction */}
          <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg">
            <p className="text-lg text-black leading-relaxed text-center">
              Compare how the three learning models track student progress
              differently.
            </p>
          </div>

          {/* Important Note about Hint Interpretation */}
          <div className="border-4 border-red-600 rounded-xl p-6 bg-red-50 shadow-lg">
            <div className="flex items-center justify-center gap-3 mb-4">
              <AlertTriangle className="w-8 h-8 text-red-700" />
              <h3 className="text-2xl font-bold text-red-800 uppercase tracking-wide text-center">
                IMPORTANT: Hints are penalized in this simulation!
              </h3>
              <AlertTriangle className="w-8 h-8 text-red-700" />
            </div>
            <div className="bg-white border-2 border-red-700 rounded-lg p-4">
              <p className="text-black font-bold text-center text-lg mb-3">
                In the IFM model used in this comparative simulation, hints have
                a <span className="text-red-700 underline">NEGATIVE</span>{" "}
                effect (ν = -0.08).
              </p>
            </div>
          </div>

          {/* Design Decision Callout - Foldable */}
          <div
            ref={hintInterpretationRef}
            className="border-4 border-black rounded-xl bg-gradient-to-r from-yellow-100 to-red-100 shadow-lg overflow-hidden"
          >
            <button
              onClick={() => setShowHintInterpretation(!showHintInterpretation)}
              className="w-full bg-red-700 text-white px-6 py-4 text-left font-bold text-lg hover:bg-red-800 transition-colors flex items-center justify-between border-b-4 border-black"
            >
              <div className="flex items-center gap-3">
                <HelpCircle className="w-6 h-6" />
                <span>
                  But wait: Hints are penalized? The IFM Simulator (previous
                  slide) rewarded the use of hints!
                </span>
              </div>
              <span className="text-2xl font-mono">
                {showHintInterpretation ? "−" : "+"}
              </span>
            </button>

            {showHintInterpretation && (
              <div className="p-8 space-y-6 bg-white">
                <div className="flex items-center gap-3 mb-6">
                  <HelpCircle className="w-6 h-6 text-red-700" />
                  <h3 className="text-xl font-bold text-black uppercase tracking-wide">
                    Critical Design Decision: Hint Interpretation
                  </h3>
                </div>

                <div className="border-4 border-red-600 rounded-xl p-6 bg-red-50 mb-6">
                  <div className="text-red-800 font-bold text-lg mb-4 text-center">
                    IMPORTANT: The comparison on this slide shows hints as
                    PENALIZED (ν = -0.08)
                  </div>
                  <p className="text-red-700 font-bold text-center mb-4">
                    But in the IFM simulator (previous slide), hints are
                    BENEFICIAL (parameter ν can only be manipulated in positive
                    direction)!
                  </p>
                  <div className="border-l-4 border-red-700 bg-white p-4 rounded-r-lg">
                    <p className="text-black font-bold text-sm">
                      <strong>Why the difference?</strong> This demonstrates a
                      crucial design choice in educational modeling: Are
                      instructional supports (hints) a sign of learning
                      difficulty (penalty) or effective scaffolding (benefit)?
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border-4 border-orange-600 rounded-xl p-4 bg-orange-50">
                    <h4 className="font-bold text-orange-800 mb-3 text-center">
                      HINTS AS PENALTY (This Demo)
                    </h4>
                    <ul className="text-black text-sm font-bold space-y-2">
                      <li>• ν = -0.08 (negative effect)</li>
                      <li>• Theory: Hints indicate struggle</li>
                      <li>• More hints = lower confidence</li>
                      <li>• Conservative assessment approach</li>
                    </ul>
                  </div>

                  <div className="border-4 border-green-600 rounded-xl p-4 bg-green-50">
                    <h4 className="font-bold text-green-800 mb-3 text-center">
                      HINTS AS BENEFIT (IFM Simulator)
                    </h4>
                    <ul className="text-black text-sm font-bold space-y-2">
                      <li>• ν = positive value / positive effect</li>
                      <li>• Theory: Hints provide learning</li>
                      <li>• More scaffolding = better outcomes</li>
                      <li>• Supportive instruction approach</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Controls and Current Status */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Controls */}
            <div className="border-4 border-black rounded-xl p-6 bg-gray-50 shadow-lg">
              <h3 className="text-xl font-bold text-black uppercase tracking-wide mb-2 text-center">
                Simulate the difference in progress tracking
              </h3>
              <p className="text-sm text-gray-700 text-center mb-4 font-bold">
                Click step by step to follow the progress
              </p>
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={handlePreviousStep}
                  disabled={currentStep === 0}
                  className={`flex items-center space-x-2 px-6 py-3 border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide transition-all transform hover:scale-105 ${
                    currentStep === 0
                      ? "bg-gray-400 text-gray-600 cursor-not-allowed opacity-50"
                      : "bg-blue-600 text-white hover:bg-white hover:text-blue-600"
                  }`}
                >
                  <ArrowLeft size={20} />
                  <span>STEP BACK</span>
                </button>

                <button
                  onClick={handleNextStep}
                  disabled={currentStep >= answerSequence.length}
                  className={`flex items-center space-x-2 px-6 py-3 border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide transition-all transform hover:scale-105 ${
                    currentStep >= answerSequence.length
                      ? "bg-gray-400 text-gray-600 cursor-not-allowed opacity-50"
                      : "bg-green-600 text-white hover:bg-white hover:text-green-600"
                  }`}
                >
                  <ArrowRight size={20} />
                  <span>NEXT PRACTICE ATTEMPT</span>
                </button>

                <button
                  onClick={resetSimulation}
                  className="flex items-center space-x-2 px-6 py-3 bg-gray-600 text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-gray-600 transition-all transform hover:scale-105"
                >
                  <RotateCcw size={20} />
                  <span>RESET</span>
                </button>
              </div>
            </div>

            {/* Current Status */}
            <div className="border-4 border-black rounded-xl p-6 bg-white shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-black uppercase tracking-wide">
                  PRACTICE {currentStep} OF {answerSequence.length}
                </h3>
              </div>
              <div className="flex items-center gap-4 text-sm font-bold mb-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-green-600">
                    {getDetailedStats().totalSuccesses} SUCCESS
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-600" />
                  <span className="text-red-600">
                    {getDetailedStats().totalFailures} FAILURE
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-yellow-600" />
                  <span className="text-yellow-600">
                    {getDetailedStats().totalHints} HINT
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Current Answer Details */}
          {getCurrentAnswer() && (
            <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg">
              <div
                className={`border-4 rounded-xl p-6 ${
                  getCurrentAnswer().correct
                    ? "bg-green-100 border-green-600"
                    : "bg-red-100 border-red-600"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {getCurrentAnswer().correct ? (
                      <CheckCircle size={24} className="text-green-600" />
                    ) : (
                      <XCircle size={24} className="text-red-600" />
                    )}
                    <span
                      className={`font-bold text-lg tracking-wide uppercase ${
                        getCurrentAnswer().correct
                          ? "text-green-800"
                          : "text-red-800"
                      }`}
                    >
                      {getCurrentAnswer().correct ? "SUCCESS" : "FAILURE"}
                    </span>
                  </div>
                  <div
                    className={`flex items-center gap-2 border-4 px-4 py-2 rounded-lg ${
                      getCurrentAnswer().hints > 0
                        ? "text-red-600 border-red-600 bg-red-100"
                        : "text-yellow-600 border-yellow-600 bg-yellow-100"
                    }`}
                  >
                    <Lightbulb size={20} />
                    <span className="font-bold text-lg">
                      {getCurrentAnswer().hints} HINT
                      {getCurrentAnswer().hints !== 1 ? "S" : ""}
                    </span>
                    {getCurrentAnswer().hints > 0 && (
                      <span className="text-red-800 font-bold ml-2">
                        → PENALIZED!
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-black font-bold text-base">
                  {getCurrentAnswer().description}
                </p>
              </div>
            </div>
          )}

          {/* Model Predictions */}
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="border-4 border-black rounded-xl p-6 bg-white shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 border-4 border-green-600 rounded-xl flex items-center justify-center text-green-700 font-bold text-lg">
                  AFM
                </div>
                <div className="text-lg font-bold text-black uppercase tracking-wide">
                  Success Probability
                </div>
              </div>

              <div className="text-3xl font-bold text-green-600 mb-3 text-center">
                {(afmProbability * 100).toFixed(1)}%
              </div>

              <div className="w-full bg-gray-300 border-4 border-black rounded-full h-4 mb-3">
                <div
                  className="h-full bg-green-600 rounded-full transition-all duration-1000"
                  style={{ width: `${afmProbability * 100}%` }}
                ></div>
              </div>

              <div className="border-l-4 border-green-600 bg-green-100 p-3 rounded-r-lg">
                <div className="text-xs text-black font-bold uppercase">
                  ALL ATTEMPTS = PROGRESS
                </div>
              </div>
            </div>

            <div className="border-4 border-black rounded-xl p-6 bg-white shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 border-4 border-blue-600 rounded-xl flex items-center justify-center text-blue-700 font-bold text-lg">
                  PFM
                </div>
                <div className="text-lg font-bold text-black uppercase tracking-wide">
                  Success Probability
                </div>
              </div>

              <div className="text-3xl font-bold text-blue-600 mb-3 text-center">
                {(pfmProbability * 100).toFixed(1)}%
              </div>

              <div className="w-full bg-gray-300 border-4 border-black rounded-full h-4 mb-3">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-1000"
                  style={{ width: `${pfmProbability * 100}%` }}
                ></div>
              </div>

              <div className="border-l-4 border-blue-600 bg-blue-100 p-3 rounded-r-lg">
                <div className="text-xs text-black font-bold uppercase">
                  SUCCESS HELPS, FAILURE HURTS
                </div>
              </div>
            </div>

            <div className="border-4 border-black rounded-xl p-6 bg-white shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-orange-100 border-4 border-orange-600 rounded-xl flex items-center justify-center text-orange-700 font-bold text-lg">
                  IFM
                </div>
                <div className="text-lg font-bold text-black uppercase tracking-wide">
                  Success Probability
                </div>
              </div>

              <div className="text-3xl font-bold text-orange-600 mb-3 text-center">
                {(ifmProbability * 100).toFixed(1)}%
              </div>

              <div className="w-full bg-gray-300 border-4 border-black rounded-full h-4 mb-3">
                <div
                  className="h-full bg-orange-600 rounded-full transition-all duration-1000"
                  style={{ width: `${ifmProbability * 100}%` }}
                ></div>
              </div>

              <div className="border-l-4 border-red-600 bg-red-100 p-3 rounded-r-lg">
                <div className="text-xs text-black font-bold uppercase mb-1">
                  MOST CONSERVATIVE
                </div>
                <div className="text-xs text-red-800 font-bold">
                  HINTS PENALIZED (ν = -0.08)
                </div>
              </div>
            </div>
          </div>

          {/* Model Comparison */}
          <div className="border-4 border-black rounded-xl p-8 bg-gradient-to-r from-yellow-100 to-orange-100 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <span className="font-bold text-black text-xl tracking-wide uppercase">
                OPTIMISM RANKING:
              </span>
              <div className="flex gap-4 text-lg font-bold">
                <span className="text-green-600">
                  AFM: {(afmProbability * 100).toFixed(1)}%
                </span>
                <span className="text-blue-600">
                  PFM: {(pfmProbability * 100).toFixed(1)}%
                </span>
                <span className="text-orange-600">
                  IFM: {(ifmProbability * 100).toFixed(1)}%
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="border-4 border-green-600 rounded-lg p-4 bg-green-50">
                <h4 className="font-bold text-green-800 mb-2 text-sm tracking-wide">
                  AFM - MOST OPTIMISTIC:
                </h4>
                <p className="text-black text-sm font-mono">
                  Every attempt is progress - can overestimate mastery with
                  repeated errors
                </p>
              </div>

              <div className="border-4 border-blue-600 rounded-lg p-4 bg-blue-50">
                <h4 className="font-bold text-blue-800 mb-2 text-sm tracking-wide">
                  PFM - MODERATE:
                </h4>
                <p className="text-black text-sm font-mono">
                  Only successes help, failures hurt - balanced perspective
                </p>
              </div>

              <div className="border-4 border-red-600 rounded-lg p-4 bg-red-50">
                <h4 className="font-bold text-red-800 mb-2 text-sm tracking-wide">
                  IFM - LEAST OPTIMISTIC:
                </h4>
                <p className="text-black text-sm font-mono mb-2">
                  Penalizes failures and hints - most conservative, least likely
                  to overestimate
                </p>
                <p className="text-red-800 text-xs font-bold">
                  Hints have NEGATIVE EFFECT (ν = -0.08) in this comparison!
                </p>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <div className="flex justify-center">
            <button
              onClick={() => navigate(24)}
              className="px-12 py-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white border-4 border-black rounded-xl font-bold text-2xl uppercase tracking-wide hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg flex items-center gap-3"
            >
              <span>Continue</span>
              <ArrowRight className="w-8 h-8" />
            </button>
          </div>

          {hoveredTerm === "simulation" && <SimulationTooltip />}
          {hoveredTerm === "parameters" && <ParameterTooltip />}
          {showDebriefingTooltip && <DebriefingTooltip />}
        </div>
      </div>
    </div>
  );
};
