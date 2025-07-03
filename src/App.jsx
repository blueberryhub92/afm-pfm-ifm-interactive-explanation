import { useState, useMemo, useEffect } from "react";
import { Slide21AFMLimitations } from "./components/Slide21AFMLimitations";
import { Slide19AFMFormula } from "./components/Slide19AFMFormula";
import { scrollToSlide } from "./utils/utils";
import { Slide0IntroductoryQuestion } from "./components/Slide0IntroductoryQuestion";
import { Slide1GuessResult } from "./components/Slide1GuessResult";
import { Slide2CodeExplanation } from "./components/Slide2CodeExplanation";
import { Slide3SliderQuestion } from "./components/Slide3SliderQuestion";
import { Slide4AFMIntroduction } from "./components/Slide4AFMIntroduction";
import { Slide5SecondTask } from "./components/Slide5SecondTask";
import { Slide6Quiz } from "./components/Slide6Quiz";
import { Slide7QuizResult } from "./components/Slide7QuizResult";
import { Slide8OpportunityChoices } from "./components/Slide8OpportunityChoices";
import { Slide9SuccessProbabilityProgress } from "./components/Slide9SuccessProbabilityProgress";
import { Slide10TwoPythonTasks } from "./components/Slide10TwoPythonTasks";
import { Slide11VariableDeclaration } from "./components/Slide11VariableDeclaration";
import { Slide12ForLoops } from "./components/Slide12ForLoops";
import { Slide13TaskDifficultyQuestion } from "./components/Slide13TaskDifficultyQuestion";
import { Slide14BetaParameter } from "./components/Slide14BetaParameter";
import { Slide15TwoMorePythonTasks } from "./components/Slide15TwoMorePythonTasks";
import { Slide16LearningRateQuestion } from "./components/Slide16LearningRateQuestion";
import { Slide17LearningRateExplanation } from "./components/Slide17LearningRateExplanation";
import { Slide18PredictorQuestion } from "./components/Slide18PredictorQuestion";
import { Slide23PFM } from "./components/Slide23PFM";
import {Slide24PFMSimulation} from "./components/Slide24PFMSimulation";
import { Slide28GreyArea } from "./components/Slide28GreyArea";
import { ProbabilityProvider, useProbability } from './components/shared/ProbabilityContext';
import { AFMFormulaTooltip } from "./components/shared/AFMFormulaTooltip";
import { Slide26IFM } from "./components/Slide26IFM";
import { Slide27IFMSimulation } from "./components/Slide27IFMSimulation";
import { Slide20AFMSimulator } from "./components/Slide20AFMSimulator";
import { Slide25IFMTasks } from "./components/Slide25IFMTasks";
import { Slide22AFMCorrectness } from "./components/Slide22AFMCorrectness";
import { Slide29InteractiveGreyArea } from "./components/Slide29InteractiveGreyArea";

// Constants
const TOTAL_SLIDES = 28;

function AFMLearningAppContent() {
  const [guess1, setGuess1] = useState("");
  const [guess2, setGuess2] = useState("");
  const [taskChoice, setTaskChoice] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [maxVisitedSlide, setMaxVisitedSlide] = useState(0);

  const { setIsHovering } = useProbability();

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
    // Keep the original scroll behavior if you still need it
    scrollToSlide(index, slideRefs);
  };

  const handleNavigation = (targetSlide) => {
    if (targetSlide >= 0 && targetSlide <= maxVisitedSlide) {
      setCurrentSlide(targetSlide);
      scrollToSlide(targetSlide, slideRefs);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.altKey) {
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          if (currentSlide > 0) {
            handleNavigation(currentSlide - 1);
          }
        } else if (event.key === 'ArrowRight') {
          event.preventDefault();
          if (currentSlide < maxVisitedSlide) {
            handleNavigation(currentSlide + 1);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, maxVisitedSlide]);

  // Mouse navigation (back/forward buttons)
  useEffect(() => {
    const handleMouseButton = (event) => {
      if (event.button === 3) { // Back button
        event.preventDefault();
        if (currentSlide > 0) {
          handleNavigation(currentSlide - 1);
        }
      } else if (event.button === 4) { // Forward button
        event.preventDefault();
        if (currentSlide < maxVisitedSlide) {
          handleNavigation(currentSlide + 1);
        }
      }
    };

    window.addEventListener('mousedown', handleMouseButton);
    return () => window.removeEventListener('mousedown', handleMouseButton);
  }, [currentSlide, maxVisitedSlide]);

  const renderCurrentSlide = () => {
    const slideProps = {
      guess1,
      setGuess1,
      guess2, 
      setGuess2,
      taskChoice,
      setTaskChoice,
      scroll
    };

    switch(currentSlide) {
      case 0:
        return (
          <Slide0IntroductoryQuestion
            guess1={guess1}
            setGuess1={setGuess1}
            scroll={scroll}
          />
        );
      case 1:
        return (
          <Slide1GuessResult guess1={guess1} scroll={scroll} />
        );
      case 2:
        return (
          <Slide2CodeExplanation scroll={scroll} />
        );
      case 3:
        return (
          <Slide3SliderQuestion scroll={scroll} />
        );
      case 4:
        return (
          <Slide4AFMIntroduction scroll={scroll} />
        );
      case 5:
        return (
          <Slide5SecondTask scroll={scroll} />
        );
      case 6:
        return (
          <Slide6Quiz guess2={guess2} setGuess2={setGuess2} scroll={scroll} />
        );
      case 7:
        return (
          <Slide7QuizResult guess2={guess2} scroll={scroll} />
        );
      case 8:
        return (
          <Slide8OpportunityChoices scroll={scroll} />
        );
      case 9:
        return (
          <Slide9SuccessProbabilityProgress scroll={scroll} />
        );
      case 10:
        return (
          <Slide10TwoPythonTasks scroll={scroll} />
        );
      case 11:
        return (
          <Slide11VariableDeclaration scroll={scroll} />
        );
      case 12:
        return (
          <Slide12ForLoops scroll={scroll} />
        );
      case 13:
        return (
          <Slide13TaskDifficultyQuestion
            taskChoice={taskChoice}
            setTaskChoice={setTaskChoice}
            scroll={scroll}
          />
        );
      case 14:
        return (
          <Slide14BetaParameter scroll={scroll} />
        );
      case 15:
        return (
          <Slide15TwoMorePythonTasks scroll={scroll} />
        );
      case 16:
        return (
          <Slide16LearningRateQuestion
            taskChoice={taskChoice}
            setTaskChoice={setTaskChoice}
            scroll={scroll}
          />
        );
      case 17:
        return (
          <Slide17LearningRateExplanation scroll={scroll} />
        );
      case 18:
        return (
          <Slide18PredictorQuestion scroll={scroll} />
        );
      case 19:
        return (
          <Slide19AFMFormula scroll={scroll} />
        );
      case 20:
        return (
          <Slide20AFMSimulator scroll={scroll} />
        );
      case 21:
        return (
          <Slide21AFMLimitations scroll={scroll} />
        );
      case 22:
        return (
          <Slide22AFMCorrectness scroll={scroll} />
        );
      case 23:
        return (
          <Slide23PFM scroll={scroll} />
        );
      case 24:
        return (
          <Slide24PFMSimulation scroll={scroll} />
        );
      case 25:
        return (
          <Slide25IFMTasks scroll={scroll} />
        );
      case 26:
        return (
          <Slide26IFM scroll={scroll} />
        );
      case 27:
        return (
          <Slide27IFMSimulation scroll={scroll} />
        );
      case 28:
        return (
          <Slide28GreyArea scroll={scroll} />
        );
      case 29:
        return (
          <Slide29InteractiveGreyArea scroll={scroll} />
        );
      default:
        return null;
    }
  };

  const getFormulaStage = (slideIndex) => {
    if (slideIndex >= 4 && slideIndex < 7) return 1; // θ only
    if (slideIndex >= 7 && slideIndex < 14) return 2; // θ + T
    if (slideIndex >= 14 && slideIndex < 16) return 3; // θ + β + T  
    if (slideIndex >= 16 && slideIndex < 19) return 4; 
    if (slideIndex >=19 && slideIndex < 20) return 5;
    return 0; // No formula
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Current slide content */}
      <div>
        {renderCurrentSlide()}
      </div>
      
      {/* AFM Formula Tooltip - conditionally rendered */}
      {getFormulaStage(currentSlide) > 0 && (
        <AFMFormulaTooltip stage={getFormulaStage(currentSlide)} />
      )}
    </div>
  );
}

export default function AFMLearningApp() {
  return (
    <ProbabilityProvider>
        <AFMLearningAppContent />
    </ProbabilityProvider>
  );
}