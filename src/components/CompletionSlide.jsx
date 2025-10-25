import React, { useState, useEffect } from "react";
import { ArrowRight, Target, Info, X } from "lucide-react";
import { getUserId } from "../utils/analytics";

export const CompletionSlide = ({ navigate }) => {
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [showDebriefingTooltip, setShowDebriefingTooltip] = useState(false);

  const userId = getUserId();

  // Scroll to top on mount (instant)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

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
      <div className="border-b-8 border-black bg-gradient-to-r from-purple-400 to-blue-400 px-8 py-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div></div>
          <span className="text-black font-bold text-2xl uppercase tracking-wider">
            Learning Journey Complete!
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
          {/* Congratulations Section */}
          <div
            className="border-4 border-black rounded-xl p-8 bg-gradient-to-r from-gray-100 to-purple-100 shadow-lg"
            style={{
              animation: "fadeIn 1s ease-in",
            }}
          >
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-4 h-4 bg-purple-600 rounded-full animate-pulse"></div>
                <h3 className="text-2xl font-bold text-black uppercase tracking-wide">
                  Congratulations! You've completed the learning journey!
                </h3>
                <div className="w-4 h-4 bg-purple-600 rounded-full animate-pulse"></div>
              </div>
              <p className="text-lg text-black font-bold">
                You've explored AFM, PFM, and IFM models. Choose where to go
                next:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Back to Welcome */}
              <button
                onClick={() => navigate(0)}
                className="px-6 py-4 bg-gray-600 text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-gray-600 transition-all transform hover:scale-105 flex flex-col items-center gap-2"
              >
                <span>Home</span>
              </button>

              {/* AFM Simulator */}
              <button
                onClick={() => navigate(15)}
                className="px-6 py-4 bg-green-600 text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-green-600 transition-all transform hover:scale-105 flex flex-col items-center gap-2"
              >
                <span>AFM Simulator</span>
              </button>

              {/* PFM Simulator */}
              <button
                onClick={() => navigate(19)}
                className="px-6 py-4 bg-blue-600 text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-blue-600 transition-all transform hover:scale-105 flex flex-col items-center gap-2"
              >
                <span>PFM Simulator</span>
              </button>

              {/* IFM Simulator */}
              <button
                onClick={() => navigate(22)}
                className="px-6 py-4 bg-orange-600 text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-orange-600 transition-all transform hover:scale-105 flex flex-col items-center gap-2"
              >
                <span>IFM Simulator</span>
              </button>
            </div>
          </div>

          {/* Questionnaire Request - Foldable */}
          <div
            className="border-4 border-black rounded-xl bg-gradient-to-r from-blue-100 to-green-100 shadow-lg overflow-hidden"
            style={{
              animation: "fadeIn 1s ease-in 0.5s both",
            }}
          >
            <button
              onClick={() => setShowQuestionnaire(!showQuestionnaire)}
              className="w-full bg-black text-white px-6 py-4 text-left font-bold text-lg hover:bg-gray-800 transition-colors flex items-center justify-between border-b-4 border-black"
            >
              <div className="flex items-center gap-3">
                <Target className="w-6 h-6" />
                <span>Help Support This Research!</span>
              </div>
              <span className="text-2xl font-mono">
                {showQuestionnaire ? "−" : "+"}
              </span>
            </button>

            {showQuestionnaire && (
              <div className="p-8 space-y-6 bg-white">
                <div className="border-4 border-blue-600 rounded-xl p-6 bg-blue-50">
                  <p className="text-black font-bold text-lg text-center mb-4">
                    <strong>Your experience matters!</strong> This interactive
                    app is part of a master thesis research project.
                  </p>
                  <p className="text-black font-bold text-center mb-4">
                    Please take a few minutes to share your insights about the
                    learning experience you just completed.
                  </p>
                  <div className="text-center">
                    <span className="bg-green-300 px-4 py-2 border-2 border-black rounded font-bold">
                      Only takes 5-10 minutes
                    </span>
                  </div>
                </div>

                <div className="flex justify-center mb-6">
                  <button
                    onClick={() => {
                      const questionnaireUrl =
                        "https://limesurvey.uni-due.de/index.php/847825?lang=en";
                      window.open(questionnaireUrl, "_blank");
                    }}
                    className="px-8 py-4 bg-blue-600 text-white border-4 border-black rounded-xl font-bold text-xl uppercase tracking-wide hover:bg-white hover:text-blue-600 transition-all transform hover:scale-105 flex items-center gap-3"
                  >
                    <span>Take Questionnaire</span>
                    <ArrowRight className="w-6 h-6" />
                  </button>
                </div>

                <div className="border-l-8 border-green-600 bg-green-100 p-4 rounded-r-lg">
                  <div className="text-center">
                    <p className="text-green-800 font-bold text-sm">
                      Your feedback helps improve educational technology and
                      supports academic research. Thank you for contributing to
                      the advancement of learning science!
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showDebriefingTooltip && <DebriefingTooltip />}
    </div>
  );
};
