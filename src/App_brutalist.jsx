{
  /* <style>
    body { font-family: 'IBM Plex Mono', monospace; }
    ::selection { background: #000; color: #fff; }
    input, textarea, button, select { font-family: inherit; }
    .slider::-webkit-slider-thumb { appearance:none; width: 24px; height:24px; border:4px solid #000; background:#fff; }
    .slider::-moz-range-thumb { width: 24px; height:24px; border:4px solid #000; background:#fff; }
  </style> */
}
import React from "react";

function BrutalistSection({ children }) {
  return (
    <section className="border-8 border-black p-8 mb-12 bg-white w-full max-w-2xl mx-auto">
      {children}
    </section>
  );
}
function BrutalistButton({ children, className, ...props }) {
  return (
    <button
      className={
        "bg-black text-white px-8 py-4 uppercase font-bold border-4 border-black hover:bg-yellow-400 hover:text-black transition-colors active:scale-95 " +
        (className || "")
      }
      {...props}
    >
      {children}
    </button>
  );
}
function BrutalistInput(props) {
  return (
    <input
      className="w-full p-4 text-xl border-4 border-black bg-white focus:outline-none focus:bg-yellow-50"
      {...props}
    />
  );
}
function BrutalistRadio({ label, ...props }) {
  return (
    <label className="flex items-center font-bold cursor-pointer">
      <input type="radio" className="mr-2 border-4 border-black" {...props} />
      {label}
    </label>
  );
}

export default function AFMLearningApp() {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [guess1, setGuess1] = React.useState("");
  const [guess2, setGuess2] = React.useState("");
  const [sliderValue, setSliderValue] = React.useState(50);
  const [showTellMe, setShowTellMe] = React.useState(false);
  const [opportunityChoice, setOpportunityChoice] = React.useState("");
  const [showOpportunityResult, setShowOpportunityResult] =
    React.useState(false);
  const [showPart2, setShowPart2] = React.useState(false);
  const [taskChoice, setTaskChoice] = React.useState("");
  const [showTaskResult, setShowTaskResult] = React.useState(false);
  const [betaAnswer1, setBetaAnswer1] = React.useState("");
  const [betaAnswer2, setBetaAnswer2] = React.useState("");
  const [showBetaResult, setShowBetaResult] = React.useState(false);

  // Slides for Part 1
  function Slide0() {
    return (
      <BrutalistSection>
        <h1 className="text-3xl md:text-4xl font-bold uppercase border-b-8 border-black pb-2 mb-8 tracking-tight">
          Have you ever programmed in Python before?
        </h1>
        <div className="bg-gray-100 border-4 border-black p-6 mb-8">
          <h2 className="text-xl font-bold uppercase mb-4 border-l-8 border-black pl-2">
            What is the output of the following code?
          </h2>
          <pre className="bg-black text-lime-300 p-4 text-lg font-mono border-4 border-black mb-4">
            x = 5 y = 3 result = x + y * 2 print(result)
          </pre>
          <div className="grid grid-cols-2 gap-2 mb-6">
            <BrutalistRadio label="A) 13" name="answer1" />
            <BrutalistRadio label="B) 16" name="answer1" />
            <BrutalistRadio label="C) 11" name="answer1" />
            <BrutalistRadio label="D) 10" name="answer1" />
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setCurrentSlide(1);
            }}
            className="flex border-4 border-black"
          >
            <BrutalistInput
              type="text"
              placeholder="TYPE GUESS HERE..."
              value={guess1}
              onChange={(e) => setGuess1(e.target.value)}
            />
            <BrutalistButton type="submit">Submit Guess!</BrutalistButton>
          </form>
        </div>
      </BrutalistSection>
    );
  }
  function Slide1() {
    return (
      <BrutalistSection>
        <div className="border-y-8 border-black py-6 mb-6 text-2xl italic font-bold text-yellow-600 uppercase">
          You guessed: <span className="font-black">{guess1}</span>
        </div>
        <p className="text-xl mb-4">
          You may have recognized the programming language above as{" "}
          <b>PYTHON</b>, but chances are, you probably didn't know how to solve
          the task.
        </p>
        <p className="text-xl">
          Ready for the answer?
          <BrutalistButton className="ml-4" onClick={() => setCurrentSlide(2)}>
            Yes!
          </BrutalistButton>
        </p>
      </BrutalistSection>
    );
  }
  function Slide2() {
    return (
      <BrutalistSection>
        <h2 className="text-3xl font-bold uppercase border-b-8 border-black pb-2 mb-8">
          Code Explanation
        </h2>
        <pre className="bg-black text-lime-300 p-4 text-lg font-mono border-4 border-black mb-4">
          x = 5 y = 3 result = x + y * 2 print(result)
        </pre>
        <ol className="list-decimal text-xl mb-8 pl-8 font-bold">
          <li>x is assigned the value 5</li>
          <li>y is assigned the value 3</li>
          <li>result = x + y * 2</li>
          <li>Multiplication first: y * 2 = 3 * 2 = 6</li>
          <li>Addition: x + 6 = 5 + 6 = 11</li>
          <li>So result = 11</li>
        </ol>
        <p className="text-2xl font-black border-l-8 border-black pl-4 mb-8">
          THE OUTPUT IS: 11
        </p>
        <BrutalistButton onClick={() => setCurrentSlide(3)}>
          Continue
        </BrutalistButton>
      </BrutalistSection>
    );
  }
  function Slide3() {
    return (
      <BrutalistSection>
        <p className="text-xl mb-8">
          Don't worry if you got it wrong, though. What do you think the chances
          are that someone who doesn't know Python would have guessed the answer
          correctly by chance?
        </p>
        <p className="font-bold uppercase mb-2">Drag The Slider!</p>
        <div className="border-4 border-black p-6 mb-4">
          <div className="flex justify-between font-bold text-xs uppercase mb-1">
            <span>Pretty Small</span>
            <span>Pretty Big</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={sliderValue}
            onChange={(e) => setSliderValue(e.target.value)}
            className="slider w-full border-4 border-black bg-white"
          />
          <div className="text-center text-2xl mt-4 font-black">
            {sliderValue}%
          </div>
        </div>
        <BrutalistButton onClick={() => setCurrentSlide(4)}>
          Done
        </BrutalistButton>
      </BrutalistSection>
    );
  }
  function Slide4() {
    return (
      <BrutalistSection>
        <p className="text-xl mb-6">
          If you said pretty small, you'd be right.
        </p>
        <p className="text-xl mb-6">
          So what does this have to do with <b>ADDITIVE FACTOR MODELS</b>? Well,
          AFM is an artificial intelligence algorithm that helps us predict what
          people know – often students, since AFM is typically used in
          educational contexts (e.g., Khan Academy and other online learning
          sites).
        </p>
        <p className="text-xl mb-6">
          Like many other algorithms, AFM relies on parameters to compute its
          output, which in this case is the probability that a student answers
          the next question on a specific skill correctly.
        </p>
        <p className="text-xl mb-8">
          And <span className="italic font-bold">guess what?</span> You already
          know about the first parameter, <b>θ</b>, which is the{" "}
          <b>BASELINE PROFICIENCY</b>. This is what the model estimates about
          your ability before seeing you work on specific skills.
        </p>
        <BrutalistButton onClick={() => setCurrentSlide(5)}>
          Next &rarr;
        </BrutalistButton>
      </BrutalistSection>
    );
  }
  function Slide5() {
    return (
      <BrutalistSection>
        <h2 className="text-2xl font-black uppercase mb-8">
          Let's tackle another task of the same concept
        </h2>
        <div className="bg-gray-100 border-4 border-black p-6 mb-8">
          <pre className="bg-black text-lime-300 p-4 text-lg font-mono border-4 border-black mb-4">
            a = 10 b = 4 c = 2 answer = a + b * c print(answer)
          </pre>
          <p className="text-xl font-bold">
            This is another Python task on variables, but different from the
            first task.
          </p>
        </div>
        <BrutalistButton onClick={() => setCurrentSlide(6)}>
          Continue
        </BrutalistButton>
      </BrutalistSection>
    );
  }
  function Slide6() {
    return (
      <BrutalistSection>
        <h2 className="text-2xl font-black uppercase mb-8 text-blue-700">
          Ok, time for a quiz!
        </h2>
        <div className="bg-gray-100 border-4 border-black p-6 mb-8">
          <h3 className="text-xl font-black uppercase mb-2">
            Python Variables Question
          </h3>
          <h4 className="text-lg font-bold mb-4">What is the output?</h4>
          <pre className="bg-black text-lime-300 p-4 text-lg font-mono border-4 border-black mb-4">
            a = 10 b = 4 c = 2 answer = a + b * c print(answer)
          </pre>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setCurrentSlide(7);
          }}
          className="flex border-4 border-black"
        >
          <BrutalistInput
            type="text"
            placeholder="TYPE GUESS HERE..."
            value={guess2}
            onChange={(e) => setGuess2(e.target.value)}
          />
          <BrutalistButton type="submit">Submit Guess!</BrutalistButton>
        </form>
      </BrutalistSection>
    );
  }
  function Slide7() {
    return (
      <BrutalistSection>
        <div className="border-y-8 border-black py-6 mb-6 text-2xl italic font-bold text-yellow-600 uppercase">
          You guessed: <span className="font-black">{guess2}</span>
        </div>
        <div className="bg-gray-100 border-4 border-black p-6 mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-black text-white flex items-center justify-center text-4xl border-4 border-black">
              📱
            </div>
          </div>
          <p className="text-xl font-black">Answer: 18</p>
        </div>
        <p className="text-xl mb-6">
          Did you get it right? Hopefully, that question was easier than the
          first one. So what do you think happened?
          {!showTellMe && (
            <BrutalistButton
              className="ml-2"
              onClick={() => setShowTellMe(true)}
            >
              Tell Me!
            </BrutalistButton>
          )}
        </p>
        {showTellMe && (
          <>
            <div className="bg-blue-100 border-l-8 border-black p-6 mb-8">
              <p className="text-xl">
                Well, this is connected to our next AFM parameter: <b>T</b>. T
                <sub>ik</sub> represents how many times a student <em>i</em> has
                practiced skill <em>k</em>. This is a key input to the AFM
                model.
              </p>
            </div>
            <BrutalistButton
              onClick={() => {
                setShowTellMe(false);
                setCurrentSlide(8);
              }}
            >
              Continue
            </BrutalistButton>
          </>
        )}
      </BrutalistSection>
    );
  }
  function Slide8() {
    return (
      <BrutalistSection>
        <h2 className="text-2xl font-black uppercase mb-8">
          How do you think opportunities changed from the first question to the
          second?
        </h2>
        <p className="text-xl mb-6">I think it:</p>
        <div className="grid grid-cols-1 gap-4 mb-8">
          <BrutalistButton
            onClick={() => {
              setOpportunityChoice("Increased");
              setShowOpportunityResult(true);
            }}
            className={
              opportunityChoice === "Increased" ? "bg-green-600 text-white" : ""
            }
          >
            Increased
          </BrutalistButton>
          <BrutalistButton
            onClick={() => {
              setOpportunityChoice("Decreased");
              setShowOpportunityResult(true);
            }}
            className={
              opportunityChoice === "Decreased" ? "bg-red-600 text-white" : ""
            }
          >
            Decreased
          </BrutalistButton>
          <BrutalistButton
            onClick={() => {
              setOpportunityChoice("Didn't Change");
              setShowOpportunityResult(true);
            }}
            className={
              opportunityChoice === "Didn't Change"
                ? "bg-gray-600 text-white"
                : ""
            }
          >
            Didn't Change
          </BrutalistButton>
        </div>
        {showOpportunityResult && (
          <>
            <div className="bg-green-100 border-l-8 border-black p-6 text-left mb-8">
              <h3 className="text-2xl font-black text-green-700 mb-3">
                Your opportunities increased!
              </h3>
              <p>
                What does that mean? Well, before the first question, you likely
                didn't know much (or anything) about Python, but now you've
                worked on two tasks on the concept <b>Variables in Python</b>.
              </p>
            </div>
            <BrutalistButton
              onClick={() => {
                setShowOpportunityResult(false);
                setCurrentSlide(9);
              }}
            >
              Next &rarr;
            </BrutalistButton>
          </>
        )}
      </BrutalistSection>
    );
  }
  function Slide9() {
    return (
      <section className="border-8 border-black mb-12 p-0 bg-white max-w-2xl mx-auto">
        <div className="bg-pink-200 border-b-8 border-black px-8 py-6 flex justify-between items-center font-black text-xl uppercase">
          <div className="flex items-center gap-2">
            <span className="w-10 h-10 bg-pink-500 border-4 border-black flex items-center justify-center text-white text-lg">
              0
            </span>
            <span className="text-black">← You (0.16)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-black">Mastery (0.95) →</span>
            <span className="w-10 h-10 bg-pink-500 border-4 border-black flex items-center justify-center text-white text-lg">
              1
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center py-16 px-2 min-h-[40vh]">
          <div className="mb-8 flex justify-center">
            <span className="text-orange-600 text-7xl font-black">↑</span>
          </div>
          <div className="space-y-8 text-xl font-bold">
            <p>
              AFM estimates the probability that a student answers the next task
              on a specific skill correctly with <b>θ</b>. As it will turn out,{" "}
              <b>T</b> and the other AFM parameters help update the success
              probability over time.
            </p>
            <p>
              Let's track your own journey to mastery! You can see your current
              success probability within the <b>bar at the top</b> of the page.{" "}
              <i>Hover over the bar to see probabilities.</i>
            </p>
            <p className="font-black text-blue-700 text-2xl uppercase">
              Got it!
            </p>
          </div>
          <BrutalistButton className="mt-8" onClick={() => setShowPart2(true)}>
            Next &rarr;
          </BrutalistButton>
        </div>
      </section>
    );
  }

  // Slides for Part 2
  function Slide10() {
    return (
      <BrutalistSection>
        <h1 className="text-3xl font-bold uppercase border-b-8 border-black pb-2 mb-8 tracking-tight">
          Watch the following two Python tasks:
        </h1>
        <div className="flex justify-center gap-8 mb-8">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-red-100 border-4 border-black rounded-full flex items-center justify-center text-red-600 font-black text-2xl mb-2">
              1
            </div>
            <p className="text-xl font-bold">Python task on functions</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-orange-100 border-4 border-black rounded-full flex items-center justify-center text-orange-600 font-black text-2xl mb-2">
              2
            </div>
            <p className="text-xl font-bold">Python task on debugging</p>
          </div>
        </div>
        <BrutalistButton onClick={() => setCurrentSlide(11)}>
          Continue
        </BrutalistButton>
      </BrutalistSection>
    );
  }
  function Slide11() {
    return (
      <BrutalistSection>
        <h2 className="text-2xl font-black uppercase mb-8">
          Which task is more difficult?
        </h2>
        <div className="grid grid-cols-1 gap-4 mb-8">
          <BrutalistButton
            onClick={() => {
              setTaskChoice("1");
              setShowTaskResult(true);
            }}
          >
            1
          </BrutalistButton>
          <BrutalistButton
            onClick={() => {
              setTaskChoice("2");
              setShowTaskResult(true);
            }}
          >
            2
          </BrutalistButton>
        </div>
        {showTaskResult && (
          <div className="space-y-6">
            <p className="text-lg font-bold">
              Actually, <b>Scenario 2</b> is more challenging in this case. Can
              you think of a reason why?
            </p>
            <BrutalistButton
              onClick={() => {
                setShowTaskResult(false);
                setCurrentSlide(12);
              }}
            >
              Tell Me!
            </BrutalistButton>
          </div>
        )}
      </BrutalistSection>
    );
  }
  function Slide12() {
    return (
      <BrutalistSection>
        <div className="bg-blue-100 border-l-8 border-black p-6 mb-8">
          <p className="font-bold">
            Well, one potential reason is that debugging problems involves a
            deeper understanding of programming and the Python language than the
            concept of functions. This makes it harder for someone who is not
            familiar with programming to learn.
          </p>
        </div>
        <BrutalistButton onClick={() => setCurrentSlide(13)}>
          Continue
        </BrutalistButton>
      </BrutalistSection>
    );
  }
  function Slide13() {
    return (
      <BrutalistSection>
        <p className="text-xl mb-6">
          We measure how hard a skill is to learn with{" "}
          <b>task difficulty (β)</b>, which represents how hard a specific skill
          is to master. In practice, this is estimated from aggregated student
          performance data - skills that most students find difficult have more
          negative β values.
        </p>
        <p className="text-xl mb-6">
          A lower β suggests that the skill is harder to learn, so it's less
          likely that the student will answer a task on the same concept
          correctly on the next try.
        </p>
        <div className="bg-gray-100 border-4 border-black p-6 mb-8">
          <p className="text-xl font-bold mb-4 italic">
            Click to fill in the blanks!
          </p>
          <p className="text-xl mb-2">
            On the other hand, a higher β suggests that the skill is{" "}
            <input
              type="text"
              value={betaAnswer1}
              onChange={(e) => setBetaAnswer1(e.target.value)}
              placeholder="..."
              className="inline-block w-24 p-2 border-4 border-black bg-white mx-1"
            />
            to learn, so it's{" "}
            <input
              type="text"
              value={betaAnswer2}
              onChange={(e) => setBetaAnswer2(e.target.value)}
              placeholder="..."
              className="inline-block w-24 p-2 border-4 border-black bg-white mx-1"
            />{" "}
            likely that the student will answer a task on the same concept
            correctly on the next try.
          </p>
        </div>
        <BrutalistButton onClick={() => setShowBetaResult(true)}>
          Submit
        </BrutalistButton>
        {showBetaResult && (
          <div className="mt-6 bg-green-100 border-l-8 border-black p-6">
            <span className="font-bold text-green-700">Nice work!</span>
          </div>
        )}
      </BrutalistSection>
    );
  }

  let content;
  if (!showPart2) {
    switch (currentSlide) {
      case 0:
        content = <Slide0 />;
        break;
      case 1:
        content = <Slide1 />;
        break;
      case 2:
        content = <Slide2 />;
        break;
      case 3:
        content = <Slide3 />;
        break;
      case 4:
        content = <Slide4 />;
        break;
      case 5:
        content = <Slide5 />;
        break;
      case 6:
        content = <Slide6 />;
        break;
      case 7:
        content = <Slide7 />;
        break;
      case 8:
        content = <Slide8 />;
        break;
      case 9:
        content = <Slide9 />;
        break;
      default:
        content = <Slide0 />;
    }
  } else {
    switch (currentSlide) {
      case 10:
        content = <Slide10 />;
        break;
      case 11:
        content = <Slide11 />;
        break;
      case 12:
        content = <Slide12 />;
        break;
      case 13:
        content = <Slide13 />;
        break;
      default:
        content = <Slide10 />;
    }
  }
  // When moving to part 2, jump to slide 10
  React.useEffect(() => {
    if (showPart2) setCurrentSlide(10);
  }, [showPart2]);

  return <main className="mx-auto max-w-2xl py-12 px-2">{content}</main>;
}
