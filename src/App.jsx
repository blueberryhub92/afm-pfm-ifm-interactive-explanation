import React, { useState, useMemo, useEffect } from "react";

// AFM Components
import { AFMLimitationsDiscussion } from "./components/AFMLimitationsDiscussion";
import { AFMFormulaExplanation } from "./components/AFMFormulaExplanation";
import { AFMInteractiveSimulator } from "./components/AFMInteractiveSimulator";
import { AFMCorrectnessAnalysis } from "./components/AFMCorrectnessAnalysis";
import { AFMBetaParameter } from "./components/AFMBetaParameter";
import { AFMIntroduction } from "./components/AFMIntroduction";

// Introduction and Basics
import { IntroductoryProbabilityQuestion } from "./components/IntroductoryProbabilityQuestion";
import { ProbabilityGuessResult } from "./components/ProbabilityGuessResult";
import { ProbabilitySliderEstimation } from "./components/ProbabilitySliderEstimation";

// Quiz and Assessment
import { ConceptUnderstandingQuiz } from "./components/ConceptUnderstandingQuiz";
import { QuizFeedback } from "./components/QuizFeedback";
import { LearningOpportunityChoices } from "./components/LearningOpportunityChoices";

// Python Tasks
import { PythonTasksIntroduction } from "./components/PythonTasksIntroduction";
import { PythonTasksAdvanced } from "./components/PythonTasksAdvanced";

// Learning Rate Components
import { LearningRateQuestion } from "./components/LearningRateQuestion";
import { LearningRateExplanation } from "./components/LearningRateExplanation";

// Task Difficulty
import { TaskDifficultyQuestion } from "./components/TaskDifficultyQuestion";

// PFM Components
import { PFMIntroduction } from "./components/PFMIntroduction";
import { PFMInteractiveSimulator } from "./components/PFMInteractiveSimulator";

// IFM Components
import { IFMConceptExplanation } from "./components/IFMConceptExplanation";
import { IFMInteractiveSimulator } from "./components/IFMInteractiveSimulator";
import { IFMTasksIntroduction } from "./components/IFMTasksIntroduction";

// Other Components
import { WelcomePage } from "./components/WelcomePage";
import { ConsentDialog } from "./components/ConsentDialog";
import { QuestionnaireNotification } from "./components/QuestionnaireNotification";
import { ModelComparison } from "./components/ModelComparison";
import { AFMFormulaTooltip } from "./components/shared/AFMFormulaTooltip";
import { SlideTracker } from "./components/shared/SlideTracker";
import { trackSlideChange, trackButtonClick, syncEvents, getUserId } from "./utils/analytics";

// Constants
const TOTAL_SLIDES = 24;

// Navigation configuration
const SLIDE_TITLES = [
  "Welcome",
  "Introductory Probability",
  "Probability Guess Result",
  "Probability Estimation",
  "AFM Introduction",
  "Concept Understanding",
  "Quiz Feedback",
  "Learning Opportunities",
  "Python Tasks Introduction",
  "Task Difficulty",
  "AFM Beta Parameter",
  "Python Tasks Advanced",
  "Learning Rate Question",
  "Learning Rate Explanation",
  "AFM Formula",
  "AFM Interactive Simulator",
  "AFM Limitations",
  "AFM Correctness",
  "PFM Introduction",
  "PFM Interactive Simulator",
  "IFM Tasks Introduction",
  "IFM Concept Explanation",
  "IFM Interactive Simulator",
  "Model Comparison"
];

function NavigationBar({ currentSlide, maxVisitedSlide, onNavigate, isExpanded, setIsExpanded }) {
  return (
    <>
      {/* Toggle Button - Moves with navigation state */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`fixed top-4 z-60 w-12 h-12 bg-black text-white border-4 border-black rounded-lg font-bold text-xl uppercase tracking-wide hover:bg-white hover:text-black transition-all transform hover:scale-105 flex items-center justify-center shadow-xl ${isExpanded ? 'left-[336px]' : 'left-4'
          }`}
        title={isExpanded ? "COLLAPSE NAVIGATION" : "EXPAND NAVIGATION"}
      >
        <span className="font-black text-2xl">
          {isExpanded ? '×' : '☰'}
        </span>
      </button>

      {/* Backdrop/Overlay when navigation is expanded */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsExpanded(false)}
        />
      )}

      {/* Navigation Panel - Slides in from left and overlays content */}
      <div className={`fixed top-0 left-0 z-50 h-full w-80 bg-white border-r-8 border-black shadow-2xl transform transition-transform duration-300 ${isExpanded ? 'translate-x-0' : '-translate-x-full'
        }`}>
        <div className="pt-20 px-4 h-full overflow-y-auto">
          <div className="border-4 border-black rounded-xl p-4 bg-gray-100 mb-6">
            <h3 className="text-2xl font-black text-black uppercase tracking-tight text-center">
              NAVIGATION
            </h3>
          </div>

          <div className="space-y-3">
            {SLIDE_TITLES.map((title, index) => (
              <button
                key={index}
                onClick={() => onNavigate(index)}
                className={`w-full text-left border-4 border-black rounded-xl font-bold text-sm uppercase tracking-wide transition-all transform hover:scale-105 ${index === currentSlide
                  ? 'bg-purple-600 text-white border-l-8 border-l-yellow-500 p-3'
                  : 'bg-white text-black hover:bg-gray-100 p-3'
                  }`}
              >
                <div className="flex items-center">
                  <span className="font-black w-8 text-center">{index + 1}.</span>
                  <span className="flex-1 ml-2">{title}</span>
                  {index === currentSlide && (
                    <span className="bg-yellow-500 text-black px-2 py-1 border-2 border-black rounded-xl font-black text-xs">
                      NOW
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>



          {/* Navigation Instructions */}
          <div className="mt-6 border-l-8 border-purple-600 bg-purple-100 p-4 rounded-r-xl">
            <h4 className="font-black text-black mb-2 uppercase tracking-wide text-sm">
              KEYBOARD SHORTCUTS:
            </h4>
            <ul className="text-black font-bold text-xs space-y-1 uppercase">
              <li>• ALT + ARROW LEFT : PREVIOUS SLIDE</li>
              <li>• ALT + ARROW RIGHT : NEXT SLIDE</li>
              <li>• N : TOGGLE NAVIGATION</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

function AFMLearningAppContent() {
  const [guess1, setGuess1] = useState("");
  const [guess2, setGuess2] = useState("");
  const [taskChoice, setTaskChoice] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [maxVisitedSlide, setMaxVisitedSlide] = useState(0);
  const [slide3DoneClicked, setSlide3DoneClicked] = useState(false);
  const [showTellMe, setShowTellMe] = useState(false);
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const [showConsentDialog, setShowConsentDialog] = useState(false);


  // Check consent status and sync events on app load
  useEffect(() => {
    const consentStatus = localStorage.getItem('study_consent_given');
    if (consentStatus === 'true') {
      setConsentGiven(true);
      syncEvents();
      console.log('Anonymous User ID:', getUserId());
    } else {
      setShowConsentDialog(true);
    }
  }, []);

  // Track slide changes
  useEffect(() => {
    if (consentGiven) {
      const slideName = SLIDE_TITLES[currentSlide] || `Slide ${currentSlide}`;
      trackSlideChange(currentSlide, slideName);
    }
  }, [currentSlide, consentGiven]);

  // Handle consent given
  const handleConsentGiven = () => {
    setConsentGiven(true);
    setShowConsentDialog(false);
    syncEvents();
    console.log('Anonymous User ID:', getUserId());
  };

  // Handle consent declined
  const handleConsentDeclined = () => {
    setShowConsentDialog(false);
    // Don't track anything if consent is declined
    // You might want to show a message or redirect instead
    alert('Ohne Einverständnis zur Studienteilnahme kann die Anwendung nicht verwendet werden.');
  };

  const handleNavigation = (targetSlide) => {
    if (targetSlide >= 0 && targetSlide < SLIDE_TITLES.length) {
      const previousSlide = currentSlide;
      setCurrentSlide(targetSlide);
      // Update max visited slide if we're going to a higher slide
      if (targetSlide > maxVisitedSlide) {
        setMaxVisitedSlide(targetSlide);
      }
      // Reset slide3DoneClicked if we're not on slide 3
      if (targetSlide !== 3) {
        setSlide3DoneClicked(false);
      }
      // Close navigation when navigating to a new slide
      setIsNavExpanded(false);

      // Track navigation
      if (consentGiven) {
        trackButtonClick('navigation_menu', {
          from: previousSlide,
          to: targetSlide,
          method: 'navigation_click',
          slideName: SLIDE_TITLES[targetSlide] || `Slide ${targetSlide}`
        });
      }
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.altKey) {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          if (currentSlide > 0) {
            if (consentGiven) {
              trackButtonClick('keyboard_navigation', {
                key: 'ArrowLeft',
                from: currentSlide,
                to: currentSlide - 1
              });
            }
            handleNavigation(currentSlide - 1);
          }
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          if (currentSlide < maxVisitedSlide) {
            if (consentGiven) {
              trackButtonClick('keyboard_navigation', {
                key: 'ArrowRight',
                from: currentSlide,
                to: currentSlide + 1
              });
            }
            handleNavigation(currentSlide + 1);
          }
        }
      }

      // Toggle navigation with 'n' key
      if (event.key === 'n' && !event.ctrlKey && !event.altKey && !event.shiftKey) {
        // Only if not focused on an input field
        if (document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
          if (consentGiven) {
            trackButtonClick('navigation_toggle', {
              key: 'n',
              expanded: !isNavExpanded
            });
          }
          setIsNavExpanded(!isNavExpanded);
        }
      }


    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide, maxVisitedSlide, isNavExpanded, consentGiven]);

  // Mouse navigation (back/forward buttons)
  useEffect(() => {
    const handleMouseButton = (event) => {
      if (event.button === 3) {
        // Back button
        event.preventDefault();
        if (currentSlide > 0) {
          if (consentGiven) {
            trackButtonClick('mouse_navigation', {
              button: 'back',
              from: currentSlide,
              to: currentSlide - 1
            });
          }
          handleNavigation(currentSlide - 1);
        }
      } else if (event.button === 4) {
        // Forward button
        event.preventDefault();
        if (currentSlide < maxVisitedSlide) {
          if (consentGiven) {
            trackButtonClick('mouse_navigation', {
              button: 'forward',
              from: currentSlide,
              to: currentSlide + 1
            });
          }
          handleNavigation(currentSlide + 1);
        }
      }
    };

    window.addEventListener("mousedown", handleMouseButton);
    return () => window.removeEventListener("mousedown", handleMouseButton);
  }, [currentSlide, maxVisitedSlide, consentGiven]);

  const renderSlide = (Component, props, slideNumber, slideName) => (
    <SlideTracker
      key={`slide-${slideNumber}`}
      slideNumber={slideNumber}
      slideName={slideName}
      trackInteractions={true}
      trackScrolling={true}
      trackMouse={true}
      trackKeyboard={true}
      trackFocus={true}
      trackEngagement={true}
    >
      <div className="slide-container">
        <Component {...props} />
      </div>
    </SlideTracker>
  );

  const renderCurrentSlide = () => {
    const slideProps = {
      guess1,
      setGuess1,
      guess2,
      setGuess2,
      taskChoice,
      setTaskChoice,
      navigate: handleNavigation
    };

    switch (currentSlide) {
      case 0:
        return renderSlide(WelcomePage, { navigate: handleNavigation }, 0, "Welcome");
      case 1:
        return renderSlide(
          IntroductoryProbabilityQuestion,
          { guess1, setGuess1, navigate: handleNavigation },
          1,
          "IntroductoryProbability"
        );
      case 2:
        return renderSlide(
          ProbabilityGuessResult,
          { guess1, navigate: handleNavigation },
          2,
          "ProbabilityGuessResult"
        );
      case 3:
        return renderSlide(
          ProbabilitySliderEstimation,
          { navigate: handleNavigation, onDoneClick: () => setSlide3DoneClicked(true) },
          3,
          "ProbabilityEstimation"
        );
      case 4:
        return renderSlide(
          AFMIntroduction,
          { navigate: handleNavigation },
          4,
          "AFMIntroduction"
        );
      case 5:
        return renderSlide(
          ConceptUnderstandingQuiz,
          { guess2, setGuess2, navigate: handleNavigation },
          5,
          "ConceptUnderstanding"
        );
      case 6:
        return renderSlide(
          QuizFeedback,
          { guess2, navigate: handleNavigation, showTellMe, setShowTellMe },
          6,
          "QuizFeedback"
        );
      case 7:
        return renderSlide(
          LearningOpportunityChoices,
          { navigate: handleNavigation },
          7,
          "LearningOpportunities"
        );
      case 8:
        return renderSlide(
          PythonTasksIntroduction,
          { navigate: handleNavigation },
          8,
          "PythonTasksIntroduction"
        );
      case 9:
        return renderSlide(
          TaskDifficultyQuestion,
          { taskChoice, setTaskChoice, navigate: handleNavigation },
          9,
          "TaskDifficulty"
        );
      case 10:
        return renderSlide(
          AFMBetaParameter,
          { navigate: handleNavigation },
          10,
          "AFMBetaParameter"
        );
      case 11:
        return renderSlide(
          PythonTasksAdvanced,
          { navigate: handleNavigation },
          11,
          "PythonTasksAdvanced"
        );
      case 12:
        return renderSlide(
          LearningRateQuestion,
          { taskChoice, setTaskChoice, navigate: handleNavigation },
          12,
          "LearningRateQuestion"
        );
      case 13:
        return renderSlide(
          LearningRateExplanation,
          { navigate: handleNavigation },
          13,
          "LearningRateExplanation"
        );
      case 14:
        return renderSlide(
          AFMFormulaExplanation,
          { navigate: handleNavigation },
          14,
          "AFMFormula"
        );
      case 15:
        return renderSlide(
          AFMInteractiveSimulator,
          { navigate: handleNavigation },
          15,
          "AFMInteractiveSimulator"
        );
      case 16:
        return renderSlide(
          AFMLimitationsDiscussion,
          { navigate: handleNavigation },
          16,
          "AFMLimitations"
        );
      case 17:
        return renderSlide(
          AFMCorrectnessAnalysis,
          { navigate: handleNavigation },
          17,
          "AFMCorrectness"
        );
      case 18:
        return renderSlide(
          PFMIntroduction,
          { navigate: handleNavigation },
          18,
          "PFMIntroduction"
        );
      case 19:
        return renderSlide(
          PFMInteractiveSimulator,
          { navigate: handleNavigation },
          19,
          "PFMInteractiveSimulator"
        );
      case 20:
        return renderSlide(
          IFMTasksIntroduction,
          { navigate: handleNavigation },
          20,
          "IFMTasksIntroduction"
        );
      case 21:
        return renderSlide(
          IFMConceptExplanation,
          { navigate: handleNavigation },
          21,
          "IFMConceptExplanation"
        );
      case 22:
        return renderSlide(
          IFMInteractiveSimulator,
          { navigate: handleNavigation },
          22,
          "IFMInteractiveSimulator"
        );
      case 23:
        return renderSlide(
          ModelComparison,
          { navigate: handleNavigation },
          23,
          "ModelComparison"
        );
      default:
        return null;
    }
  };

  const getFormulaStage = (slideIndex) => {
    if (slideIndex === 3) return 1;
    if (slideIndex > 3 && slideIndex < 6) return 2; // θ only
    if (slideIndex === 6) {
      // On slide 6, show stage 2 (θ only) until "Tell me" is clicked, then stage 3 (θ + T)
      return showTellMe ? 3 : 2;
    }
    if (slideIndex > 6 && slideIndex < 10) return 3; // θ + T
    if (slideIndex >= 10 && slideIndex < 13) return 4; // θ + β + T (skill difficulty from Slide14)
    if (slideIndex >= 13 && slideIndex < 14) return 5; // θ + β + γ + T (learning rate from Slide17)
    if (slideIndex === 14) return 6; // Full formula (from Slide20)
    return 0; // No formula
  };

  const shouldShowTooltip = () => {
    if (currentSlide === 3) {
      return slide3DoneClicked;
    }
    return getFormulaStage(currentSlide) > 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Consent Dialog */}
      {showConsentDialog && (
        <ConsentDialog
          onConsent={handleConsentGiven}
          onDecline={handleConsentDeclined}
        />
      )}

      {/* Navigation Bar */}
      <NavigationBar
        currentSlide={currentSlide}
        maxVisitedSlide={maxVisitedSlide}
        onNavigate={handleNavigation}
        isExpanded={isNavExpanded}
        setIsExpanded={setIsNavExpanded}
      />

      {/* Main content - no margin adjustments, always full width */}
      <div className="w-full">
        {renderCurrentSlide()}
      </div>

      {/* AFM Formula Tooltip - conditionally rendered */}
      {shouldShowTooltip() && (
        <AFMFormulaTooltip stage={getFormulaStage(currentSlide)} />
      )}

      {/* Questionnaire Notification - always visible */}
      <QuestionnaireNotification />


    </div>
  );
}

export default function AFMLearningApp() {
  return <AFMLearningAppContent />;
}