import { useState, useMemo, useEffect } from "react";
import { Slide21AFMLimitations } from "./components/Slide21AFMLimitations";
import { Slide19AFMFormula } from "./components/Slide19AFMFormula";
import { scrollToSlide } from "./utils/utils";
import { Slide0IntroductoryQuestion } from "./components/Slide0IntroductoryQuestion";
import { Slide1GuessResult } from "./components/Slide1GuessResult";
import { Slide3SliderQuestion } from "./components/Slide3SliderQuestion";
import { Slide4AFMIntroduction } from "./components/Slide4AFMIntroduction";
import { Slide6Quiz } from "./components/Slide6Quiz";
import { Slide7QuizResult } from "./components/Slide7QuizResult";
import { Slide8OpportunityChoices } from "./components/Slide8OpportunityChoices";
import { Slide10TwoPythonTasks } from "./components/Slide10TwoPythonTasks";
import { Slide13TaskDifficultyQuestion } from "./components/Slide13TaskDifficultyQuestion";
import { Slide14BetaParameter } from "./components/Slide14BetaParameter";
import { Slide15TwoMorePythonTasks } from "./components/Slide15TwoMorePythonTasks";
import { Slide16LearningRateQuestion } from "./components/Slide16LearningRateQuestion";
import { Slide17LearningRateExplanation } from "./components/Slide17LearningRateExplanation";
import { Slide23PFM } from "./components/Slide23PFM";
import { AFMFormulaTooltip } from "./components/shared/AFMFormulaTooltip";
import { Slide26IFM } from "./components/Slide26IFM";
import { Slide27IFMSimulation } from "./components/Slide27IFMSimulation";
import { Slide20AFMSimulator } from "./components/Slide20AFMSimulator";
import { Slide25IFMTasks } from "./components/Slide25IFMTasks";
import { Slide22AFMCorrectness } from "./components/Slide22AFMCorrectness";
import { WelcomePage } from "./components/WelcomePage";
import { trackSlideChange, trackButtonClick, syncEvents, getUserId } from "./utils/analytics";
import ConsentDialog from "./components/ConsentDialog";

import { Slide24PFMSimulation } from "./components/Slide24PFMSimulation";
import { ModelComparison } from "./components/ModelComparison";
import { QuestionnaireNotification } from "./components/QuestionnaireNotification";

// Constants
const TOTAL_SLIDES = 24;

// Navigation configuration
const SLIDE_TITLES = [
  "Welcome",
  "Introductory Question",
  "Guess Result",
  "Slider Question",
  "AFM Introduction",
  "Quiz",
  "Quiz Result",
  "Opportunity Choices",
  "Two Python Tasks",
  "Task Difficulty Question",
  "Beta Parameter",
  "Two More Python Tasks",
  "Learning Rate Question",
  "Learning Rate Explanation",
  "AFM Formula",
  "AFM Simulator",
  "AFM Limitations",
  "AFM Correctness",
  "PFM Introduction",
  "PFM Simulation",
  "IFM Tasks",
  "IFM Introduction",
  "IFM Simulation",
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


  const slideRefs = useMemo(
    () => Array.from({ length: TOTAL_SLIDES }, () => ({ current: null })),
    []
  );

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

  const scroll = (index) => {
    const previousSlide = currentSlide;
    setCurrentSlide(index);
    // Update max visited slide if we're going forward
    if (index > maxVisitedSlide) {
      setMaxVisitedSlide(index);
    }
    // Reset slide3DoneClicked if we're not on slide 3 (Slide3SliderQuestion)
    if (index !== 3) {
      setSlide3DoneClicked(false);
    }
    // Close navigation when navigating to a new slide
    setIsNavExpanded(false);
    // Keep the original scroll behavior if you still need it
    scrollToSlide(index, slideRefs);

    // Track navigation
    if (consentGiven) {
      trackButtonClick('slide_navigation', {
        from: previousSlide,
        to: index,
        method: 'button_click',
        slideName: SLIDE_TITLES[index] || `Slide ${index}`
      });
    }
  };

  const handleNavigation = (targetSlide) => {
    if (targetSlide >= 0 && targetSlide < SLIDE_TITLES.length) {
      const previousSlide = currentSlide;
      setCurrentSlide(targetSlide);
      // Update max visited slide if we're going to a higher slide
      if (targetSlide > maxVisitedSlide) {
        setMaxVisitedSlide(targetSlide);
      }
      // Reset slide3DoneClicked if we're not on slide 3 (Slide3SliderQuestion)
      if (targetSlide !== 3) {
        setSlide3DoneClicked(false);
      }
      // Close navigation when navigating to a new slide
      setIsNavExpanded(false);
      scrollToSlide(targetSlide, slideRefs);

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

  const renderCurrentSlide = () => {
    const slideProps = {
      guess1,
      setGuess1,
      guess2,
      setGuess2,
      taskChoice,
      setTaskChoice,
      scroll,
    };

    switch (currentSlide) {
      case 0:
        return <WelcomePage scroll={scroll} />;
      case 1:
        return (
          <Slide0IntroductoryQuestion
            guess1={guess1}
            setGuess1={setGuess1}
            scroll={scroll}
          />
        );
      case 2:
        return <Slide1GuessResult guess1={guess1} scroll={scroll} />;
      case 3:
        return (
          <Slide3SliderQuestion
            scroll={scroll}
            onDoneClick={() => setSlide3DoneClicked(true)}
          />
        );
      case 4:
        return <Slide4AFMIntroduction scroll={scroll} />;
      case 5:
        return (
          <Slide6Quiz guess2={guess2} setGuess2={setGuess2} scroll={scroll} />
        );
      case 6:
        return (
          <Slide7QuizResult
            guess2={guess2}
            scroll={scroll}
            showTellMe={showTellMe}
            setShowTellMe={setShowTellMe}
          />
        );
      case 7:
        return <Slide8OpportunityChoices scroll={scroll} />;
      case 8:
        return <Slide10TwoPythonTasks scroll={scroll} />;
      case 9:
        return (
          <Slide13TaskDifficultyQuestion
            taskChoice={taskChoice}
            setTaskChoice={setTaskChoice}
            scroll={scroll}
          />
        );
      case 10:
        return <Slide14BetaParameter scroll={scroll} />;
      case 11:
        return <Slide15TwoMorePythonTasks scroll={scroll} />;
      case 12:
        return (
          <Slide16LearningRateQuestion
            taskChoice={taskChoice}
            setTaskChoice={setTaskChoice}
            scroll={scroll}
          />
        );
      case 13:
        return <Slide17LearningRateExplanation scroll={scroll} />;
      case 14:
        return <Slide19AFMFormula scroll={scroll} />;
      case 15:
        return <Slide20AFMSimulator scroll={scroll} />;
      case 16:
        return <Slide21AFMLimitations scroll={scroll} />;
      case 17:
        return <Slide22AFMCorrectness scroll={scroll} />;
      case 18:
        return <Slide23PFM scroll={scroll} />;
      case 19:
        return <Slide24PFMSimulation scroll={scroll} />;
      case 20:
        return <Slide25IFMTasks scroll={scroll} />;
      case 21:
        return <Slide26IFM scroll={scroll} />;
      case 22:
        return <Slide27IFMSimulation scroll={scroll} />;
      case 23:
        return <ModelComparison scroll={scroll} />;
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
    if (slideIndex >= 10 && slideIndex < 13) return 4; // θ + β + T (task difficulty from Slide14)
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