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
import { Slide24PFMSimulation } from "./components/Slide24PFMSimulation";
import { AFMFormulaTooltip } from "./components/shared/AFMFormulaTooltip";
import { Slide26IFM } from "./components/Slide26IFM";
import { Slide27IFMSimulation } from "./components/Slide27IFMSimulation";
import { Slide20AFMSimulator } from "./components/Slide20AFMSimulator";
import { Slide25IFMTasks } from "./components/Slide25IFMTasks";
import { Slide22AFMCorrectness } from "./components/Slide22AFMCorrectness";
import { WelcomePage } from "./components/WelcomePage";

// Constants
const TOTAL_SLIDES = 23;

// Navigation configuration
const SLIDE_TITLES = [
  "Welcome Page",
  "Python Challenge Tasks",
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
  "PFM",
  "AFM vs. PFM Simulation",
  "IFM Tasks",
  "IFM",
  "AFM vs. PFM vs. IFM Simulation"
];

function NavigationBar({ currentSlide, maxVisitedSlide, onNavigate, isExpanded, setIsExpanded }) {
  // Check if we're on the WelcomePage (slide 0)
  const isOnWelcomePage = currentSlide === 0;
  
  return (
    <>
      {/* Toggle Button - Fixed z-index issue */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`fixed top-4 z-60 w-12 h-12 bg-white text-black border-2 border-black font-mono font-bold text-xl uppercase tracking-wider hover:bg-black hover:text-white transition-all transform hover:scale-105 flex items-center justify-center relative cursor-pointer ${
          isExpanded ? 'left-[336px]' : 'left-4'
        } ${isOnWelcomePage ? 'opacity-90' : ''}`}
        title={isExpanded ? "COLLAPSE NAVIGATION" : "EXPAND NAVIGATION"}
      >
        {/* Technical corner markers */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-black"></div>
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-black"></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-black"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-black"></div>
        
        <span className="font-mono text-lg">
          {isExpanded ? '×' : '☰'}
        </span>
      </button>

      {/* Backdrop/Overlay - Only show when navigation is expanded */}
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 cursor-pointer"
          onClick={() => setIsExpanded(false)}
        />
      )}

      {/* Navigation Panel - Fixed z-index and only visible when expanded */}
      {isExpanded && (
        <div className="fixed top-0 left-0 z-50 h-screen w-80 font-mono relative transform transition-transform duration-300 shadow-xl overflow-hidden translate-x-0 bg-white border-r-2 border-black">
          {/* Grid background for technical feel */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'linear-gradient(to right, #d1d5db 1px, transparent 1px), linear-gradient(to bottom, #d1d5db 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}
          />
          
          {/* Technical corner brackets */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-black"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-black"></div>
          
          {/* Scrollable content container */}
          <div className="relative h-full overflow-y-auto">
            <div className="pt-10 px-4 pb-4">
              {/* Header with technical styling */}
              <div className="border-2 border-black p-4 bg-white mb-6 relative">
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-black"></div>
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-black"></div>
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-black"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-black"></div>
                
                <div className="text-center">
                  <h3 className="text-lg font-bold text-black uppercase tracking-wider">
                    NAVIGATION
                  </h3>
                </div>
              </div>
              
              {/* Navigation items with enhanced clickable styling - Show all allowed slides from beginning */}
              <div className="space-y-3 mb-6">
                {SLIDE_TITLES.filter((_, index) => {
                  const allowedSlides = [0, 1, 14, 15, 16, 18, 19, 21, 22];
                  return allowedSlides.includes(index);
                }).map((title, displayIndex) => {
                  // Get the original index from SLIDE_TITLES
                  const originalIndex = SLIDE_TITLES.findIndex(t => t === title);
                  return (
                    <button
                      key={originalIndex}
                      onClick={() => onNavigate(originalIndex)}
                      className={`w-full text-left border-2 border-black font-mono font-bold text-xs uppercase tracking-wider transition-all duration-200 transform relative group cursor-pointer ${
                        originalIndex === currentSlide
                          ? 'bg-black text-white scale-105 shadow-lg'
                          : 'bg-white text-black hover:bg-gray-100 hover:scale-105 hover:shadow-md active:scale-95'
                      }`}
                    >
                      {/* Technical corner markers for active slide */}
                      {originalIndex === currentSlide && (
                        <>
                          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white"></div>
                          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white"></div>
                          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white"></div>
                          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white"></div>
                        </>
                      )}
                      
                      {/* Hover effect overlay for non-active slides */}
                      {originalIndex !== currentSlide && (
                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-200"></div>
                      )}
                      
                      <div className="flex items-center p-3 relative z-10">
                        <div className={`w-6 h-6 border flex items-center justify-center mr-3 text-xs font-mono transition-all duration-200 ${
                          originalIndex === currentSlide 
                            ? 'border-white bg-black text-white' 
                            : 'border-black bg-white text-black group-hover:bg-gray-200'
                        }`}>
                          {originalIndex + 1}
                        </div>
                        <span className="flex-1 transition-colors duration-200">
                          {title}
                        </span>
                        {originalIndex === currentSlide && (
                          <div className="border border-white px-2 py-1 text-xs font-mono tracking-wider bg-white text-black">
                            ACTIVE
                          </div>
                        )}
                        {originalIndex !== currentSlide && (
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs font-mono tracking-wider">
                            →
                          </div>
                        )}
                      </div>
                      
                      {/* Click ripple effect */}
                      <div className="absolute inset-0 bg-white opacity-0 group-active:opacity-20 transition-opacity duration-75"></div>
                    </button>
                  );
                })}
              </div>

              {/* Navigation Instructions with technical styling */}
              <div className="border-2 border-black bg-white p-4 relative">
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-black"></div>
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-black"></div>
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-black"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-black"></div>

                <h4 className="font-bold text-black mb-2 uppercase tracking-wider text-sm font-mono">
                  KEYBOARD SHORTCUTS:
                </h4>
                <ul className="text-black font-mono text-xs space-y-1">
                  <li>• ALT + ← : PREVIOUS SLIDE</li>
                  <li>• ALT + → : NEXT SLIDE</li>
                  <li>• N : TOGGLE NAVIGATION</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
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

  const slideRefs = useMemo(
    () => Array.from({ length: TOTAL_SLIDES }, () => ({ current: null })),
    []
  );

  const scroll = (index) => {
    setCurrentSlide(index);
    // Update max visited slide if we're going forward
    if (index > maxVisitedSlide) {
      setMaxVisitedSlide(index);
    }
    // Reset slide3DoneClicked if we're not on slide 3
    if (index !== 3) {
      setSlide3DoneClicked(false);
    }
    // Close navigation when navigating to a new slide
    setIsNavExpanded(false);
    // Keep the original scroll behavior if you still need it
    scrollToSlide(index, slideRefs);
  };

  const handleNavigation = (targetSlide) => {
    if (targetSlide >= 0 && targetSlide < SLIDE_TITLES.length) {
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
      scrollToSlide(targetSlide, slideRefs);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.altKey) {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          if (currentSlide > 0) {
            handleNavigation(currentSlide - 1);
          }
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          if (currentSlide < maxVisitedSlide) {
            handleNavigation(currentSlide + 1);
          }
        }
      }
      
      // Toggle navigation with 'n' key
      if (event.key === 'n' && !event.ctrlKey && !event.altKey && !event.shiftKey) {
        // Only if not focused on an input field
        if (document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
          setIsNavExpanded(!isNavExpanded);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide, maxVisitedSlide, isNavExpanded]);

  // Mouse navigation (back/forward buttons)
  useEffect(() => {
    const handleMouseButton = (event) => {
      if (event.button === 3) {
        // Back button
        event.preventDefault();
        if (currentSlide > 0) {
          handleNavigation(currentSlide - 1);
        }
      } else if (event.button === 4) {
        // Forward button
        event.preventDefault();
        if (currentSlide < maxVisitedSlide) {
          handleNavigation(currentSlide + 1);
        }
      }
    };

    window.addEventListener("mousedown", handleMouseButton);
    return () => window.removeEventListener("mousedown", handleMouseButton);
  }, [currentSlide, maxVisitedSlide]);

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
        return (
          <WelcomePage scroll={scroll} />
        )
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
      default:
        return null;
    }
  };

  const getFormulaStage = (slideIndex) => {
    if (slideIndex === 3) return 1;
    if (slideIndex > 3 && slideIndex < 7) return 2; // θ only
    if (slideIndex === 7) {
      // On slide 7, show stage 2 (θ only) until "Tell me" is clicked, then stage 3 (θ + T)
      return showTellMe ? 3 : 2;
    }
    if (slideIndex > 7 && slideIndex < 14) return 3; // θ + T
    if (slideIndex >= 14 && slideIndex < 16) return 4; // θ + β + T
    if (slideIndex >= 16 && slideIndex < 19) return 5;
    if (slideIndex >= 19 && slideIndex < 20) return 6;
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
      {/* Navigation bar */}
      <div className="fixed top-0 left-0 w-full z-10">
        <NavigationBar
          currentSlide={currentSlide}
          maxVisitedSlide={maxVisitedSlide}
          onNavigate={handleNavigation}
          isExpanded={isNavExpanded}
          setIsExpanded={setIsNavExpanded}
        />
      </div>

      {/* Main content - no margin adjustments, always full width */}
      <div className="w-full">
        {renderCurrentSlide()}
      </div>

      {/* AFM Formula Tooltip - conditionally rendered */}
      {shouldShowTooltip() && (
        <AFMFormulaTooltip stage={getFormulaStage(currentSlide)} />
      )}
    </div>
  );
}

export default function AFMLearningApp() {
  return <AFMLearningAppContent />;
}