import React, { useState } from "react";

export default function AFMLearningApp() {
  const [slide, setSlide] = useState(0);
  const [guess1, setGuess1] = useState("");
  const [answer1, setAnswer1] = useState("");
  const [sliderValue, setSliderValue] = useState(50);
  const [guess2, setGuess2] = useState("");

  const slides = [
    // Slide 0
    <section key={0} className="transition-all duration-700 border-8 border-black mb-12 p-8 bg-white">
      <h1 className="text-4xl font-bold uppercase border-b-8 border-black pb-2 mb-8 tracking-tight">
        Have you ever programmed in Python before?
      </h1>
      <div className="bg-gray-100 border-4 border-black p-6 mb-8">
        <h2 className="text-xl font-bold uppercase mb-4 border-l-8 border-black pl-2">What is the output of the following code?</h2>
        <pre className="bg-black text-lime-300 p-4 text-lg font-mono border-4 border-black mb-4">
{`x = 5
y = 3
result = x + y * 2
print(result)`}
        </pre>
        <div className="grid grid-cols-2 gap-2">
          {["13", "16", "11", "10"].map((option, index) => (
            <label key={index} className="flex items-center font-bold cursor-pointer">
              <input
                type="radio"
                name="answer1"
                className="mr-2 border-4 border-black"
                onChange={() => setAnswer1(option)}
              />
              {String.fromCharCode(65 + index)} {option}
            </label>
          ))}
        </div>
      </div>
      <div className="flex border-4 border-black">
        <input
          type="text"
          value={guess1}
          onChange={(e) => setGuess1(e.target.value)}
          className="flex-1 p-4 text-xl border-none focus:outline-none bg-white"
          placeholder="TYPE GUESS HERE..."
        />
        <button
          className="bg-black text-white px-8 py-4 uppercase font-bold border-l-4 border-black hover:bg-yellow-400 hover:text-black"
          onClick={() => setSlide(1)}
        >
          Submit Guess!
        </button>
      </div>
    </section>,

    // Slide 1
    <section key={1} className="transition-all duration-700 border-8 border-black mb-12 p-8 bg-white">
      <div className="border-y-8 border-black py-6 mb-6">
        <p className="text-2xl italic font-bold text-yellow-600 uppercase">
          You guessed: <span className="font-black">{guess1 || "___"}</span>
        </p>
      </div>
      <p className="text-xl mb-4">You may have recognized the programming language above as <b>PYTHON</b>, but chances are, you probably didn't know how to solve the task.</p>
      <p className="text-xl">
        Ready for the answer?
        <button
          className="ml-4 px-6 py-2 bg-black text-white uppercase font-bold border-4 border-black hover:bg-yellow-400 hover:text-black"
          onClick={() => setSlide(2)}
        >
          Yes!
        </button>
      </p>
    </section>,

    // Slide 2
    <section key={2} className="transition-all duration-700 border-8 border-black mb-12 p-8 bg-white">
      <h2 className="text-3xl font-bold uppercase border-b-8 border-black pb-2 mb-8">Code Explanation</h2>
      <pre className="bg-black text-lime-300 p-4 text-lg font-mono border-4 border-black mb-4">
{`x = 5
y = 3
result = x + y * 2
print(result)`}
      </pre>
      <ol className="list-decimal text-xl mb-8 pl-8 font-bold">
        <li>x is assigned the value 5</li>
        <li>y is assigned the value 3</li>
        <li>result = x + y * 2</li>
        <li>Multiplication first: y * 2 = 3 * 2 = 6</li>
        <li>Addition: x + 6 = 5 + 6 = 11</li>
        <li>So result = 11</li>
      </ol>
      <p className="text-2xl font-black border-l-8 border-black pl-4 mb-8">THE OUTPUT IS: 11</p>
      <button
        className="bg-black text-white uppercase font-bold border-4 border-black px-8 py-4 hover:bg-yellow-400 hover:text-black"
        onClick={() => setSlide(3)}
      >
        Continue
      </button>
    </section>,

    // Slide 3
    <section key={3} className="transition-all duration-700 border-8 border-black mb-12 p-8 bg-white">
      <p className="text-xl mb-8">
        What do you think the chances are that someone who doesn't know Python would have guessed the answer correctly by chance?
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
        <div className="text-center text-2xl mt-4 font-black">{sliderValue}%</div>
      </div>
      <button
        className="bg-red-600 text-white uppercase font-bold border-4 border-black px-8 py-4 hover:bg-yellow-400 hover:text-black"
        onClick={() => setSlide(4)}
      >
        Done
      </button>
    </section>,

    // Slide 4
    <section key={4} className="transition-all duration-700 border-8 border-black mb-12 p-8 bg-white">
      <p className="text-xl mb-6">If you said pretty small, you'd be right.</p>
      <p className="text-xl mb-6">So what does this have to do with <b>ADDITIVE FACTOR MODELS</b>? Well, AFM is an artificial intelligence algorithm that helps us predict what people know – often students, since AFM is typically used in educational contexts (e.g., Khan Academy and other online learning sites).</p>
      <p className="text-xl mb-6">Like many other algorithms, AFM relies on parameters to compute its output, which in this case is the probability that a student answers the next question on a specific skill correctly.</p>
      <p className="text-xl mb-8">
        And <span className="italic font-bold">guess what?</span> You already know about the first parameter, <b>θ</b>, which is the <b>BASELINE PROFICIENCY</b>. This is what the model estimates about your ability before seeing you work on specific skills.
      </p>
      <button className="bg-black text-white uppercase font-bold border-4 border-black px-8 py-4 hover:bg-yellow-400 hover:text-black" onClick={() => setSlide(5)}>
        Next →
      </button>
    </section>,

    // Slide 5
    <section key={5} className="transition-all duration-700 border-8 border-black mb-12 p-8 bg-white">
      <h2 className="text-2xl font-black uppercase mb-8">Let's tackle another task of the same concept</h2>
      <div className="bg-gray-100 border-4 border-black p-6 mb-8">
        <pre className="bg-black text-lime-300 p-4 text-lg font-mono border-4 border-black mb-4">a = 10
b = 4
c = 2
answer = a + b * c
print(answer)</pre>
        <p className="text-xl font-bold">This is another Python task on variables, but different from the first task.</p>
      </div>
      <button className="bg-black text-white uppercase font-bold border-4 border-black px-8 py-4 hover:bg-yellow-400 hover:text-black" onClick={() => setSlide(6)}>Continue</button>
    </section>,

    // Slide 6
    <section key={6} className="transition-all duration-700 border-8 border-black mb-12 p-8 bg-white">
      <h2 className="text-2xl font-black uppercase mb-8 text-blue-700">Ok, time for a quiz!</h2>
      <div className="bg-gray-100 border-4 border-black p-6 mb-8">
        <h3 className="text-xl font-black uppercase mb-2">Python Variables Question</h3>
        <h4 className="text-lg font-bold mb-4">What is the output?</h4>
        <pre className="bg-black text-lime-300 p-4 text-lg font-mono border-4 border-black mb-4">a = 10
b = 4
c = 2
answer = a + b * c
print(answer)</pre>
      </div>
      <div className="flex border-4 border-black">
        <input type="text" value={guess2} onChange={(e) => setGuess2(e.target.value)} className="flex-1 p-4 text-xl border-none focus:outline-none bg-white" placeholder="TYPE GUESS HERE..." />
        <button className="bg-black text-white px-8 py-4 uppercase font-bold border-l-4 border-black hover:bg-yellow-400 hover:text-black" onClick={() => setSlide(7)}>Submit Guess!</button>
      </div>
    </section>,

    // Slide 7
    <section key={7} className="transition-all duration-700 border-8 border-black mb-12 p-8 bg-white">
      <div className="border-y-8 border-black py-6 mb-6">
        <p className="text-2xl italic font-bold text-yellow-600 uppercase">You guessed: <span className="font-black">{guess2 || "___"}</span></p>
      </div>
      <div className="bg-gray-100 border-4 border-black p-6 mb-8">
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 bg-black text-white flex items-center justify-center text-4xl border-4 border-black">📱</div>
        </div>
        <p className="text-xl font-black">Answer: 18</p>
      </div>
      <p className="text-xl mb-6">Did you get it right? Hopefully, that question was easier than the first one. So what do you think happened?
        <button className="ml-2 px-4 py-2 bg-black text-white uppercase font-bold border-4 border-black hover:bg-yellow-400 hover:text-black">Tell Me!</button>
      </p>
      <div className="bg-blue-100 border-l-8 border-black p-6 mb-4">
        <p className="font-bold">Well, this is connected to our next AFM parameter: <b>T</b>. T<sub>ik</sub> represents how many times a student <i>i</i> has practiced skill <i>k</i>. This is a key input to the AFM model.</p>
      </div>
      <button className="bg-black text-white uppercase font-bold border-4 border-black px-8 py-4 hover:bg-yellow-400 hover:text-black" onClick={() => setSlide(8)}>Continue</button>
    </section>,

    // Slide 8
    <section key={8} className="transition-all duration-700 border-8 border-black mb-12 p-8 bg-white">
      <h2 className="text-2xl font-black uppercase mb-8">How do you think opportunities changed from the first question to the second?</h2>
      <p className="text-xl mb-6">I think it:</p>
      <div className="grid grid-cols-1 gap-4 mb-8">
        <button className="w-full py-4 border-4 border-black bg-white text-black uppercase font-bold hover:bg-green-500 hover:text-white">Increased</button>
        <button className="w-full py-4 border-4 border-black bg-white text-black uppercase font-bold hover:bg-red-600 hover:text-white">Decreased</button>
        <button className="w-full py-4 border-4 border-black bg-white text-black uppercase font-bold hover:bg-gray-700 hover:text-white">Didn't Change</button>
      </div>
      <div className="bg-green-100 border-l-8 border-black p-6 mb-4">
        <h3 className="text-xl font-black text-green-900 mb-3">Your opportunities increased!</h3>
        <p>What does that mean? Well, before the first question, you likely didn't know much (or anything) about Python, but now you've worked on two tasks on the concept <b>Variables in Python</b>.</p>
      </div>
      <button className="bg-black text-white uppercase font-bold border-4 border-black px-8 py-4 hover:bg-yellow-400 hover:text-black" onClick={() => setSlide(9)}>Next →</button>
    </section>,

    // Slide 9
    <section key={9} className="transition-all duration-700 border-8 border-black mb-12 p-0 bg-white">
      <div className="bg-pink-200 border-b-8 border-black px-8 py-6 flex justify-between items-center font-black text-xl uppercase">
        <div className="flex items-center gap-2">
          <span className="w-10 h-10 bg-pink-500 border-4 border-black flex items-center justify-center text-white text-lg">0</span>
          <span className="text-black">← You (0.16)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-black">Mastery (0.95) →</span>
          <span className="w-10 h-10 bg-pink-500 border-4 border-black flex items-center justify-center text-white text-lg">1</span>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center py-16 px-2 min-h-[40vh]">
        <div className="mb-8 flex justify-center">
          <span className="text-orange-600 text-7xl font-black">↑</span>
        </div>
        <div className="space-y-8 text-xl font-bold">
          <p>AFM estimates the probability that a student answers the next task on a specific skill correctly with <b>θ</b>. As it will turn out, <b>T</b> and the other AFM parameters help update the success probability over time.</p>
          <p>Let's track your own journey to mastery! You can see your current success probability within the <b>bar at the top</b> of the page. <i>Hover over the bar to see probabilities.</i></p>
          {/* <p className="font-black text-blue-700 text-2xl uppercase" onClick={() => setSlide(10)}>Got it!</p> */}
      <button className="bg-black text-white uppercase font-bold border-4 border-black px-8 py-4 hover:bg-yellow-400 hover:text-black" onClick={() => setSlide(10)}>got it</button>
        </div>
      </div>
    </section>,

    // Slide 10
    <section key={10} className="min-h-screen flex flex-col justify-center items-center p-8 transition-all duration-500">
        <div className="max-w-2xl w-full text-center space-y-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            Watch the following two Python tasks:
          </h1>
          
          <div className="flex justify-center space-x-8 mb-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-red-100 border-2 border-red-400 rounded-full flex items-center justify-center text-red-600 font-bold text-xl mb-2">
                1
              </div>
              <p className="text-gray-700">Python task on functions</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-orange-100 border-2 border-orange-400 rounded-full flex items-center justify-center text-orange-600 font-bold text-xl mb-2">
                2
              </div>
              <p className="text-gray-700">Python task on debugging</p>
            </div>
          </div>
          
          <div className="text-center">
            <button
              // onClick={() => scrollToSlide(11)}
              className="px-8 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      </section>
  ];

  return (
    <main className="mx-auto max-w-3xl py-12 px-2 font-[\'IBM Plex Mono\'], monospace">
      {slides[slide]}
    </main>
  );
}
