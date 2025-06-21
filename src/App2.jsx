import React, { useState, useRef } from 'react';

const AFMLearningApp = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [guess1, setGuess1] = useState('');
  const [guess2, setGuess2] = useState('');
  const [sliderValue, setSliderValue] = useState(50);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showTellMe, setShowTellMe] = useState(false);
  const [opportunityChoice, setOpportunityChoice] = useState('');
  const [showOpportunityResult, setShowOpportunityResult] = useState(false);
  
  const slideRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
  ];

  const scrollToSlide = (slideIndex) => {
    slideRefs[slideIndex].current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const handleSubmitGuess1 = () => {
    if (guess1.trim()) {
      scrollToSlide(1);
    }
  };

  const handleSubmitGuess2 = () => {
    if (guess2.trim()) {
      scrollToSlide(7);
    }
  };

  const handleSliderDone = () => {
    scrollToSlide(3);
  };

  const handleYesClick = () => {
    scrollToSlide(2);
  };

  const handleNextClick = () => {
    scrollToSlide(5);
  };

  const handleTellMe = () => {
    setShowTellMe(true);
  };

  const handleOpportunityChoice = (choice) => {
    setOpportunityChoice(choice);
    setShowOpportunityResult(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Slide 0: First Python Question */}
      <div ref={slideRefs[0]} className="min-h-screen flex flex-col justify-center items-center p-8 transition-all duration-500">
        <div className="max-w-2xl w-full text-center space-y-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            Have you ever programmed in Python before?
          </h1>
          
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">What is the output of the following code?</h2>
            <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-left mb-4">
              <div>x = 5</div>
              <div>y = 3</div>
              <div>result = x + y * 2</div>
              <div>print(result)</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <input type="radio" name="answer1" value="13" id="opt1" className="text-purple-600" />
                <label htmlFor="opt1" className="text-left">A) 13</label>
              </div>
              <div className="flex items-center space-x-3">
                <input type="radio" name="answer1" value="16" id="opt2" className="text-purple-600" />
                <label htmlFor="opt2" className="text-left">B) 16</label>
              </div>
              <div className="flex items-center space-x-3">
                <input type="radio" name="answer1" value="11" id="opt3" className="text-purple-600" />
                <label htmlFor="opt3" className="text-left">C) 11</label>
              </div>
              <div className="flex items-center space-x-3">
                <input type="radio" name="answer1" value="10" id="opt4" className="text-purple-600" />
                <label htmlFor="opt4" className="text-left">D) 10</label>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Type guess here..."
              value={guess1}
              onChange={(e) => setGuess1(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={handleSubmitGuess1}
              className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              Submit guess!
            </button>
          </div>
        </div>
      </div>

      {/* Slide 1: Guess Result */}
      <div ref={slideRefs[1]} className="min-h-screen flex flex-col justify-center items-center p-8 transition-all duration-500">
        <div className="max-w-2xl w-full text-center space-y-8">
          <div className="border-t-2 border-b-2 border-orange-400 py-4">
            <p className="text-orange-600 italic text-lg">You guessed: {guess1}</p>
          </div>
          
          <p className="text-lg text-gray-700 leading-relaxed">
            You may have recognized the programming language above as <strong>Python</strong>, but chances are, 
            you probably didn't know how to solve the task.
          </p>
          
          <p className="text-lg text-gray-700">Ready for the answer? 
            <button 
              onClick={handleYesClick}
              className="ml-2 underline text-blue-600 hover:text-blue-800 font-semibold"
            >
              Yes!
            </button>
          </p>
        </div>
      </div>

      {/* Slide 2: Code Explanation */}
      <div ref={slideRefs[2]} className="min-h-screen flex flex-col justify-center items-center p-8 transition-all duration-500">
        <div className="max-w-2xl w-full space-y-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Code Explanation</h2>
            <div className="bg-gray-900 text-green-400 p-4 rounded font-mono mb-4">
              <div>x = 5</div>
              <div>y = 3</div>
              <div>result = x + y * 2</div>
              <div>print(result)</div>
            </div>
            
            <div className="space-y-3 text-left">
              <p><strong>Step by step:</strong></p>
              <p>• x is assigned the value 5</p>
              <p>• y is assigned the value 3</p>
              <p>• result = x + y * 2</p>
              <p>• Due to operator precedence, multiplication happens first: y * 2 = 3 * 2 = 6</p>
              <p>• Then addition: x + 6 = 5 + 6 = 11</p>
              <p>• So result = 11</p>
              <p><strong>The output is: 11</strong></p>
            </div>
          </div>
          
          <div className="text-center">
            <button
              onClick={handleSliderDone}
              className="px-8 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      </div>

      {/* Slide 3: Probability Slider */}
      <div ref={slideRefs[3]} className="min-h-screen flex flex-col justify-center items-center p-8 transition-all duration-500">
        <div className="max-w-2xl w-full text-center space-y-8">
          <p className="text-lg text-gray-700 leading-relaxed">
            Don't worry if you got it wrong, though. What do you think the chances are that someone who doesn't know Python would have guessed the answer correctly by chance?
          </p>
          
          <div className="space-y-6">
            <p className="text-gray-600 italic">Drag the slider!</p>
            
            <div className="relative">
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>Pretty Small</span>
                <span>Pretty Big</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={sliderValue}
                onChange={(e) => setSliderValue(e.target.value)}
                className="w-full h-2 bg-gradient-to-r from-pink-200 via-orange-200 to-orange-300 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="text-center mt-2 text-lg font-semibold">
                {sliderValue}%
              </div>
            </div>
            
            <button
              onClick={() => scrollToSlide(4)}
              className="px-8 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>

      {/* Slide 4: AFM Introduction */}
      <div ref={slideRefs[4]} className="min-h-screen flex flex-col justify-center items-center p-8 transition-all duration-500">
        <div className="max-w-2xl w-full space-y-8">
          <p className="text-lg text-gray-700 leading-relaxed">
            If you said pretty small, you'd be right.
          </p>
          
          <p className="text-lg text-gray-700 leading-relaxed">
            So what does this have to do with <strong>Additive Factor Models</strong>? Well, AFM is an artificial intelligence algorithm that helps us predict what people know – often students, since AFM is typically used in educational contexts (e.g., Khan Academy and other online learning sites).
          </p>
          
          <p className="text-lg text-gray-700 leading-relaxed">
            Like many other algorithms, AFM relies on parameters to compute its output, which in this case is the probability that a student answers the next question on a specific skill correctly.
          </p>
          
          <p className="text-lg text-gray-700 leading-relaxed">
            And <em>guess what?</em> You already know about the first parameter, <strong>θ</strong>, which is the <strong>baseline proficiency</strong>. This is what the model estimates about your ability before seeing you work on specific skills.
          </p>
          
          <div className="text-center">
            <button
              onClick={handleNextClick}
              className="px-8 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              Next →
            </button>
          </div>
        </div>
      </div>

      {/* Slide 5: Second Python Task */}
      <div ref={slideRefs[5]} className="min-h-screen flex flex-col justify-center items-center p-8 transition-all duration-500">
        <div className="max-w-2xl w-full text-center space-y-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Let's tackle another task of the same concept
          </h2>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-left mb-4">
              <div>a = 10</div>
              <div>b = 4</div>
              <div>c = 2</div>
              <div>answer = a + b * c</div>
              <div>print(answer)</div>
            </div>
            
            <p className="text-lg text-gray-700 mb-4">
              This is another Python task on variables, but different from the first task.
            </p>
          </div>
          
          <div className="text-center">
            <button
              onClick={() => scrollToSlide(6)}
              className="px-8 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      </div>

      {/* Slide 6: Quiz Time */}
      <div ref={slideRefs[6]} className="min-h-screen flex flex-col justify-center items-center p-8 transition-all duration-500">
        <div className="max-w-2xl w-full text-center space-y-8">
          <h2 className="text-2xl font-bold text-blue-600 mb-8">
            Ok, time for a quiz!
          </h2>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Python Variables Question</h3>
            <h4 className="text-lg mb-4">What is the output?</h4>
            
            <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-left mb-4">
              <div>a = 10</div>
              <div>b = 4</div>
              <div>c = 2</div>
              <div>answer = a + b * c</div>
              <div>print(answer)</div>
            </div>
          </div>

          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Type guess here..."
              value={guess2}
              onChange={(e) => setGuess2(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={handleSubmitGuess2}
              className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              Submit guess!
            </button>
          </div>
        </div>
      </div>

      {/* Slide 7: Second Guess Result */}
      <div ref={slideRefs[7]} className="min-h-screen flex flex-col justify-center items-center p-8 transition-all duration-500">
        <div className="max-w-2xl w-full text-center space-y-8">
          <div className="border-t-2 border-b-2 border-orange-400 py-4">
            <p className="text-orange-600 italic text-lg">You guessed: {guess2}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white text-2xl">📱</span>
              </div>
            </div>
            <p className="text-lg font-semibold">Answer: 18</p>
          </div>
          
          <p className="text-lg text-gray-700 leading-relaxed">
            Did you get it right? Hopefully, that question was easier than the first one. So what do you think happened? 
            <button 
              onClick={handleTellMe}
              className="ml-2 underline text-blue-600 hover:text-blue-800 font-semibold"
            >
              Tell me!
            </button>
          </p>
          
          {showTellMe && (
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 text-left transition-all duration-500">
              <p className="text-gray-700 leading-relaxed">
                Well, this is connected to our next AFM parameter: <strong>T</strong>. T<sub>ik</sub> represents how many times a student <em>i</em> has practiced skill <em>k</em>. This is a key input to the AFM model.
              </p>
            </div>
          )}
          
          {showTellMe && (
            <div className="text-center">
              <button
                onClick={() => scrollToSlide(8)}
                className="px-8 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                Continue
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Slide 8: Opportunities Question */}
      <div ref={slideRefs[8]} className="min-h-screen flex flex-col justify-center items-center p-8 transition-all duration-500">
        <div className="max-w-2xl w-full text-center space-y-8">
          <h2 className="text-xl font-semibold text-gray-800">
            How do you think opportunities changed from the first question to the second?
          </h2>
          
          <p className="text-lg text-gray-700">I think it:</p>
          
          <div className="space-y-4">
            <button
              onClick={() => handleOpportunityChoice('Increased')}
              className={`w-full py-3 px-6 rounded-lg border-2 transition-all ${
                opportunityChoice === 'Increased' 
                  ? 'bg-green-500 text-white border-green-500' 
                  : 'bg-white text-gray-700 border-gray-300 hover:border-green-500'
              }`}
            >
              Increased
            </button>
            <button
              onClick={() => handleOpportunityChoice('Decreased')}
              className={`w-full py-3 px-6 rounded-lg border-2 transition-all ${
                opportunityChoice === 'Decreased' 
                  ? 'bg-red-500 text-white border-red-500' 
                  : 'bg-white text-gray-700 border-gray-300 hover:border-red-500'
              }`}
            >
              Decreased
            </button>
            <button
              onClick={() => handleOpportunityChoice("Didn't change")}
              className={`w-full py-3 px-6 rounded-lg border-2 transition-all ${
                opportunityChoice === "Didn't change" 
                  ? 'bg-gray-500 text-white border-gray-500' 
                  : 'bg-white text-gray-700 border-gray-300 hover:border-gray-500'
              }`}
            >
              Didn't change
            </button>
          </div>
          
          {showOpportunityResult && (
            <div className="bg-green-50 border-l-4 border-green-400 p-6 text-left transition-all duration-500">
              <h3 className="text-lg font-bold text-green-800 mb-3">Your opportunities increased!</h3>
              <p className="text-gray-700 leading-relaxed">
                What does that mean? Well, before the first question, you likely didn't know much (or anything) about Python, but now you've worked on two tasks on the concept <strong>Variables in Python</strong>.
              </p>
            </div>
          )}
          
          {showOpportunityResult && (
            <div className="text-center">
              <button
                onClick={() => scrollToSlide(9)}
                className="px-8 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Slide 9: Mastery Progress Page */}
      <div ref={slideRefs[9]} className="min-h-screen bg-white">
        {/* Header with mastery bar */}
        <div className="bg-gradient-to-r from-pink-200 to-pink-300 px-6 py-4">
          <div className="flex items-center justify-between text-lg">
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 bg-pink-400 rounded flex items-center justify-center text-white font-bold text-sm">0</span>
              <span className="text-pink-800">← You (0.16)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-pink-800">Mastery (0.95) →</span>
              <span className="w-6 h-6 bg-pink-400 rounded flex items-center justify-center text-white font-bold text-sm">1</span>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex flex-col items-center justify-center px-8 py-16" style={{ minHeight: 'calc(100vh - 80px)' }}>
          <div className="max-w-2xl w-full text-center space-y-8">
            {/* Orange arrow pointing up */}
            <div className="flex justify-center mb-8">
              <div className="text-orange-500 text-6xl">↑</div>
            </div>
            
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p className="text-lg">
                AFM estimates the probability that a student answers the next task on a specific skill correctly with <strong>θ</strong>. As it will turn out, <strong>T</strong> and the other AFM parameters help update the success probability over time.
              </p>
              
              <p className="text-lg">
                Let's track your own journey to mastery! You can see your current success probability within the <strong>bar at the top of the page</strong>. <em>Hover over the bar to see probabilities.</em>
              </p>
              
              <p className="text-lg font-semibold text-blue-600">
                Got it!
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #8b5cf6;
          cursor: pointer;
          box-shadow: 0 0 0 1px #ffffff, inset 0 1px 1px rgba(0,0,0,0.25), 0 3px 6px rgba(0,0,0,0.15);
        }
        
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #8b5cf6;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 0 1px #ffffff, inset 0 1px 1px rgba(0,0,0,0.25), 0 3px 6px rgba(0,0,0,0.15);
        }
      `}</style>
    </div>
  );
};

export default AFMLearningApp;