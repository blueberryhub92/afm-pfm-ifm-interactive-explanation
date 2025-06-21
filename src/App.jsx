import { useState, useMemo, useEffect } from "react";
import { Slide20AFMLimitations } from "./components/Slide20AFMLimitations";
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
import { Slide21PFM } from "./components/Slide21PFM";
import {Slide22PFMSimulation} from "./components/Slide22PFMSimulation";
import { Slide25GreyArea } from "./components/Slide25GreyArea";
import {Slide26GreyAreaEstimation} from "./components/Slide26GreyAreaEstimation";
import { Layout } from "./components/shared/Layout";
import { SuccessProbabilityBar } from "./components/shared/SuccessProbabilityBar";
import { ProbabilityProvider, useProbability } from './components/shared/ProbabilityContext';
import { AFMFormulaTooltip } from "./components/shared/AFMFormulaTooltip";
import { Slide23IFM } from "./components/Slide23IFM";
import { Slide24IFMSimulation } from "./components/Slide24IFMSimulation";

// Constants
const BAR_VISIBILITY_START_SLIDE = 9;
const TOTAL_SLIDES = 26;

// Helper component to create Layout with conditional bar
const SlideLayout = ({ slideIndex, children, className, ref }) => {
  const { currentProbability, showCurrentValue, setIsHovering } = useProbability();
  
  const shouldShowBar = slideIndex >= BAR_VISIBILITY_START_SLIDE;
  
  const barContent = shouldShowBar ? (
    <SuccessProbabilityBar
      currentProbability={currentProbability}
      showCurrentValue={showCurrentValue}
      onHover={setIsHovering}
    />
  ) : null;
  
  return (
    <Layout 
      ref={ref} 
      className={className} 
      showBar={shouldShowBar} 
      barContent={barContent}
    >
      {children}
    </Layout>
  );
};

function AFMLearningAppContent() {
  const [guess1, setGuess1] = useState("");
  const [guess2, setGuess2] = useState("");
  const [taskChoice, setTaskChoice] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [maxVisitedSlide, setMaxVisitedSlide] = useState(0);


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
          <SlideLayout slideIndex={0} ref={slideRefs[0]}>
            <Slide0IntroductoryQuestion
              guess1={guess1}
              setGuess1={setGuess1}
              scroll={scroll}
            />
          </SlideLayout>
        );
      case 1:
        return (
          <SlideLayout slideIndex={1} ref={slideRefs[1]}>
            <Slide1GuessResult guess1={guess1} scroll={scroll} />
          </SlideLayout>
        );
      case 2:
        return (
          <SlideLayout slideIndex={2} ref={slideRefs[2]}>
            <Slide2CodeExplanation scroll={scroll} />
          </SlideLayout>
        );
      case 3:
        return (
          <SlideLayout slideIndex={3} ref={slideRefs[3]}>
            <Slide3SliderQuestion scroll={scroll} />
          </SlideLayout>
        );
      case 4:
        return (
          <SlideLayout slideIndex={4} ref={slideRefs[4]}>
            <Slide4AFMIntroduction scroll={scroll} />
          </SlideLayout>
        );
      case 5:
        return (
          <SlideLayout slideIndex={5} ref={slideRefs[5]}>
            <Slide5SecondTask scroll={scroll} />
          </SlideLayout>
        );
      case 6:
        return (
          <SlideLayout slideIndex={6} ref={slideRefs[6]}>
            <Slide6Quiz guess2={guess2} setGuess2={setGuess2} scroll={scroll} />
          </SlideLayout>
        );
      case 7:
        return (
          <SlideLayout slideIndex={7} ref={slideRefs[7]}>
            <Slide7QuizResult guess2={guess2} scroll={scroll} />
          </SlideLayout>
        );
      case 8:
        return (
          <SlideLayout slideIndex={8} ref={slideRefs[8]}>
            <Slide8OpportunityChoices scroll={scroll} />
          </SlideLayout>
        );
      case 9:
        return (
          <SlideLayout slideIndex={9} ref={slideRefs[9]}>
            <Slide9SuccessProbabilityProgress scroll={scroll} />
          </SlideLayout>
        );
      case 10:
        return (
          <SlideLayout slideIndex={10} ref={slideRefs[10]}>
            <Slide10TwoPythonTasks scroll={scroll} />
          </SlideLayout>
        );
      case 11:
        return (
          <SlideLayout slideIndex={11} ref={slideRefs[11]}>
            <Slide11VariableDeclaration scroll={scroll} />
          </SlideLayout>
        );
      case 12:
        return (
          <SlideLayout slideIndex={12} ref={slideRefs[12]}>
            <Slide12ForLoops scroll={scroll} />
          </SlideLayout>
        );
      case 13:
        return (
          <SlideLayout slideIndex={13} ref={slideRefs[13]}>
            <Slide13TaskDifficultyQuestion
              taskChoice={taskChoice}
              setTaskChoice={setTaskChoice}
              scroll={scroll}
            />
          </SlideLayout>
        );
      case 14:
        return (
          <SlideLayout slideIndex={14} ref={slideRefs[14]}>
            <Slide14BetaParameter scroll={scroll} />
          </SlideLayout>
        );
      case 15:
        return (
          <SlideLayout slideIndex={15} ref={slideRefs[15]}>
            <Slide15TwoMorePythonTasks scroll={scroll} />
          </SlideLayout>
        );
      case 16:
        return (
          <SlideLayout slideIndex={16} ref={slideRefs[16]}>
          <Slide16LearningRateQuestion
              taskChoice={taskChoice}
              setTaskChoice={setTaskChoice}
              scroll={scroll}
            />
          </SlideLayout>
        );
      case 17:
        return (
          <SlideLayout slideIndex={17} ref={slideRefs[17]}>
            <Slide17LearningRateExplanation scroll={scroll} />
          </SlideLayout>
        );
      case 18:
        return (
          <SlideLayout slideIndex={18} ref={slideRefs[18]}>
            <Slide18PredictorQuestion scroll={scroll} />
          </SlideLayout>
        );
      case 19:
        return (
          <SlideLayout 
            slideIndex={19} 
            ref={slideRefs[19]}
            // className="!bg-gradient-to-r !from-purple-100 !to-pink-100 !p-0"
          >
            <Slide19AFMFormula scroll={scroll} />
          </SlideLayout>
        );
      case 20:
        return (
          <SlideLayout 
            slideIndex={20} 
            ref={slideRefs[20]} 
            // className="!p-0"
          >
            <Slide20AFMLimitations scroll={scroll} />
          </SlideLayout>
        );
        case 21:
          return (
            <SlideLayout 
              slideIndex={21} 
              ref={slideRefs[21]}
            >
              <Slide21PFM scroll={scroll} />
            </SlideLayout>
          );
        case 22:
          return (
            <SlideLayout 
              slideIndex={22} 
              ref={slideRefs[22]}
            >
              <Slide22PFMSimulation scroll={scroll} />
            </SlideLayout>
          );
        case 23:
          return (
            <SlideLayout 
              slideIndex={23} 
              ref={slideRefs[23]}
            >
              <Slide23IFM scroll={scroll} />
            </SlideLayout>
          );
        case 24:
          return (
            <SlideLayout 
              slideIndex={24} 
              ref={slideRefs[24]}
            >
              <Slide24IFMSimulation scroll={scroll} />
            </SlideLayout>
          );
        case 25:
          return (
            <SlideLayout 
              slideIndex={25} 
              ref={slideRefs[25]}
            >
              <Slide25GreyArea scroll={scroll} />
            </SlideLayout>
          );
        case 26:
          return (
            <SlideLayout 
              slideIndex={26} 
              ref={slideRefs[26]}
            >
              <Slide26GreyAreaEstimation scroll={scroll} />
            </SlideLayout>
          );
      default:
        return null;
    }
  };

  const getFormulaStage = (slideIndex) => {
    if (slideIndex >= 4 && slideIndex < 7) return 1; // θ only
    if (slideIndex >= 7 && slideIndex < 13) return 2; // θ + T
    if (slideIndex >= 13 && slideIndex < 16) return 3; // θ + β + T  
    if (slideIndex >= 16 && slideIndex < 18) return 4; 
    if (slideIndex >=18 && slideIndex < 21) return 5;
    return 0; // No formula
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {renderCurrentSlide()}
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