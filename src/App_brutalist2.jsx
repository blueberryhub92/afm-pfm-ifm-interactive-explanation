import React, { useState } from 'react';

export default function AFMLearningApp() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [userGuess1, setUserGuess1] = useState('');
  const [userGuess2, setUserGuess2] = useState('');
  const [sliderValue, setSliderValue] = useState(50);
  const [selectedOption, setSelectedOption] = useState('');
  const [fillInBlanks, setFillInBlanks] = useState({ blank1: '', blank2: '' });
  const [predictorVariable, setPredictorVariable] = useState('');
  const [showMath, setShowMath] = useState(false);
  const [proficiency, setProficiency] = useState(0.16);

  const slides = [
    // Slide 0 - Initial Python Question
    {
      id: 0,
      content: (
        <section className="border-8 border-black bg-white p-8 mb-12">
          <h1 className="text-3xl md:text-4xl font-black uppercase border-b-8 border-black pb-2 mb-8 tracking-tight">
            Have you ever programmed in Python before?
          </h1>
          <div className="bg-gray-100 border-4 border-black p-6 mb-8">
            <h2 className="text-xl font-black uppercase mb-4 border-l-8 border-black pl-2">
              What is the output of the following code?
            </h2>
            <pre className="bg-black text-lime-300 p-4 text-lg font-mono border-4 border-black mb-4">
{`x = 5
y = 3
result = x + y * 2
print(result)`}
            </pre>
            <div className="flex border-4 border-black">
              <input 
                type="text" 
                placeholder="TYPE GUESS HERE..." 
                className="w-full p-4 text-xl border-4 border-black bg-white focus:outline-none focus:bg-yellow-50"
                value={userGuess1}
                onChange={(e) => setUserGuess1(e.target.value)}
              />
              <button 
                type="button" 
                className="bg-black text-white px-8 py-4 uppercase font-bold border-4 border-black hover:bg-yellow-400 hover:text-black transition-colors active:scale-95"
                onClick={() => setCurrentSlide(1)}
              >
                Submit Guess!
              </button>
            </div>
          </div>
        </section>
      )
    },
    // Slide 1 - Guess Response
    {
      id: 1,
      content: (
        <section className="border-8 border-black bg-white p-8 mb-12">
          <div className="border-y-8 border-black py-6 mb-6 text-2xl italic font-bold text-yellow-600 uppercase">
            You guessed: <span className="font-black">{userGuess1 || '[GUESS]'}</span>
          </div>
          <p className="text-xl mb-4">
            You may have recognized the programming language above as <b>PYTHON</b>, but chances are, you probably didn't know how to solve the task.
          </p>
          <p className="text-xl">
            Ready for the answer?
            <button 
              className="bg-black text-white px-8 py-4 uppercase font-bold border-4 border-black hover:bg-yellow-400 hover:text-black transition-colors active:scale-95 ml-4"
              onClick={() => setCurrentSlide(2)}
            >
              Yes!
            </button>
          </p>
        </section>
      )
    },
    // Slide 2 - Code Explanation
    {
      id: 2,
      content: (
        <section className="border-8 border-black bg-white p-8 mb-12">
          <h2 className="text-3xl font-black uppercase border-b-8 border-black pb-2 mb-8">Code Explanation</h2>
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
            className="bg-black text-white px-8 py-4 uppercase font-bold border-4 border-black hover:bg-yellow-400 hover:text-black transition-colors active:scale-95"
            onClick={() => setCurrentSlide(3)}
          >
            Continue
          </button>
        </section>
      )
    },
    // Slide 3 - Probability Slider
    {
      id: 3,
      content: (
        <section className="border-8 border-black bg-white p-8 mb-12">
          <p className="text-xl mb-8">
            Don't worry if you got it wrong. What do you think are the chances that someone who doesn't know Python would have guessed the answer correctly by chance?
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
              className="w-full border-4 border-black bg-white h-6"
              onChange={(e) => setSliderValue(e.target.value)}
            />
            <div className="text-center text-2xl mt-4 font-black">{sliderValue}%</div>
          </div>
          <button 
            className="bg-black text-white px-8 py-4 uppercase font-bold border-4 border-black hover:bg-yellow-400 hover:text-black transition-colors active:scale-95"
            onClick={() => setCurrentSlide(4)}
          >
            Done
          </button>
        </section>
      )
    },
    // Slide 4 - AFM Introduction
    {
      id: 4,
      content: (
        <section className="border-8 border-black bg-white p-8 mb-12">
          <p className="text-xl mb-6">If you said pretty small, you'd be right.</p>
          <p className="text-xl mb-6">
            So what does this have to do with <b>ADDITIVE FACTOR MODELS</b>? AFM is an AI algorithm that predicts what people know – often students, since AFM is typically used in educational contexts (e.g., Khan Academy).
          </p>
          <p className="text-xl mb-6">
            Like many other algorithms, AFM relies on parameters to compute its output, which in this case is the probability that a student answers the next question on a specific skill correctly.
          </p>
          <p className="text-xl mb-8">
            And <span className="italic font-bold">guess what?</span> You already know about the first parameter, <b>θ</b>, which is the <b>BASELINE PROFICIENCY</b>.
          </p>
          <button 
            className="bg-black text-white px-8 py-4 uppercase font-bold border-4 border-black hover:bg-yellow-400 hover:text-black transition-colors active:scale-95"
            onClick={() => setCurrentSlide(5)}
          >
            Next →
          </button>
        </section>
      )
    },
    // Slide 5 - Second Task
    {
      id: 5,
      content: (
        <section className="border-8 border-black bg-white p-8 mb-12">
          <h2 className="text-2xl font-black uppercase mb-8">Let's tackle another task of the same concept</h2>
          <div className="bg-gray-100 border-4 border-black p-6 mb-8">
            <pre className="bg-black text-lime-300 p-4 text-lg font-mono border-4 border-black mb-4">
{`a = 10
b = 4
c = 2
answer = a + b * c
print(answer)`}
            </pre>
            <p className="text-xl font-black">This is another Python task on variables, but different from the first task.</p>
          </div>
          <button 
            className="bg-black text-white px-8 py-4 uppercase font-bold border-4 border-black hover:bg-yellow-400 hover:text-black transition-colors active:scale-95"
            onClick={() => setCurrentSlide(6)}
          >
            Continue
          </button>
        </section>
      )
    },
    // Slide 6 - Quiz Time
    {
      id: 6,
      content: (
        <section className="border-8 border-black bg-white p-8 mb-12">
          <h2 className="text-2xl font-black uppercase mb-8 text-blue-700">Ok, time for a quiz!</h2>
          <div className="bg-gray-100 border-4 border-black p-6 mb-8">
            <h3 className="text-xl font-black uppercase mb-2">Python Variables Question</h3>
            <h4 className="text-lg font-bold mb-4">What is the output?</h4>
            <pre className="bg-black text-lime-300 p-4 text-lg font-mono border-4 border-black mb-4">
{`a = 10
b = 4
c = 2
answer = a + b * c
print(answer)`}
            </pre>
          </div>
          <div className="flex border-4 border-black">
            <input 
              type="text" 
              placeholder="TYPE GUESS HERE..." 
              className="w-full p-4 text-xl border-4 border-black bg-white focus:outline-none focus:bg-yellow-50"
              value={userGuess2}
              onChange={(e) => setUserGuess2(e.target.value)}
            />
            <button 
              type="button" 
              className="bg-black text-white px-8 py-4 uppercase font-bold border-4 border-black hover:bg-yellow-400 hover:text-black transition-colors active:scale-95"
              onClick={() => {
                setProficiency(0.35);
                setCurrentSlide(7);
              }}
            >
              Submit Guess!
            </button>
          </div>
        </section>
      )
    },
    // Slide 7 - Quiz Result
    {
      id: 7,
      content: (
        <section className="border-8 border-black bg-white p-8 mb-12">
          <div className="border-y-8 border-black py-6 mb-6 text-2xl italic font-bold text-yellow-600 uppercase">
            You guessed: <span className="font-black">{userGuess2 || '[GUESS]'}</span>
          </div>
          <div className="bg-gray-100 border-4 border-black p-6 mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-black text-white flex items-center justify-center text-4xl border-4 border-black">📱</div>
            </div>
            <p className="text-xl font-black">Answer: 18</p>
          </div>
          <p className="text-xl mb-6">
            Did you get it right? Hopefully, that question was easier than the first one. So what do you think happened?
            <button 
              className="ml-2 underline font-black text-blue-700"
              onClick={() => setCurrentSlide(8)}
            >
              Tell Me!
            </button>
          </p>
          <div className="bg-blue-100 border-l-8 border-black p-6 mb-8">
            <p className="text-xl">Well, this is connected to our next AFM parameter: <b>T</b>. T<sub>ik</sub> represents how many times a student <em>i</em> has practiced skill <em>k</em>.</p>
          </div>
          <button 
            className="bg-black text-white px-8 py-4 uppercase font-bold border-4 border-black hover:bg-yellow-400 hover:text-black transition-colors active:scale-95"
            onClick={() => setCurrentSlide(8)}
          >
            Continue
          </button>
        </section>
      )
    },
    // Slide 8 - Opportunities
    {
      id: 8,
      content: (
        <section className="border-8 border-black bg-white p-8 mb-12">
          <h2 className="text-2xl font-black mb-4">How do you think opportunities changed from the first question to the second?</h2>
          <p className="text-xl mb-6">I think it:</p>
          <div className="grid grid-cols-1 gap-4 mb-8">
            <button 
              className="bg-green-600 text-white px-8 py-4 border-4 border-black font-black uppercase"
              onClick={() => setCurrentSlide(9)}
            >
              Increased
            </button>
            <button 
              className="bg-red-600 text-white px-8 py-4 border-4 border-black font-black uppercase"
              onClick={() => setCurrentSlide(9)}
            >
              Decreased
            </button>
            <button 
              className="bg-gray-600 text-white px-8 py-4 border-4 border-black font-black uppercase"
              onClick={() => setCurrentSlide(9)}
            >
              Didn't Change
            </button>
          </div>
          <div className="bg-green-100 border-l-8 border-black p-6 text-left mb-8">
            <h3 className="text-2xl font-black text-green-700 mb-3">Your opportunities increased!</h3>
            <p>Before the first question, you likely didn't know much about Python, but now you've worked on two tasks on the concept <b>Variables in Python</b>.</p>
          </div>
          <button 
            className="bg-black text-white px-8 py-4 uppercase font-bold border-4 border-black hover:bg-yellow-400 hover:text-black transition-colors active:scale-95"
            onClick={() => setCurrentSlide(9)}
          >
            Next →
          </button>
        </section>
      )
    },
    // Slide 9 - Progress Bar
    {
      id: 9,
      content: (
        <section className="border-8 border-black mb-12 p-0 bg-white max-w-2xl mx-auto">
          <div className="bg-pink-200 border-b-8 border-black px-8 py-6 flex justify-between items-center font-black text-xl uppercase">
            <div className="flex items-center gap-2">
              <span className="w-10 h-10 bg-pink-500 border-4 border-black flex items-center justify-center text-white text-lg">0</span>
              <span className="text-black">← You ({proficiency.toFixed(2)})</span>
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
              <p className="font-black text-blue-700 text-2xl uppercase">Got it!</p>
            </div>
            <button 
              className="bg-black text-white px-8 py-4 uppercase font-bold border-4 border-black hover:bg-yellow-400 hover:text-black transition-colors active:scale-95 mt-8"
              onClick={() => setCurrentSlide(10)}
            >
              Next →
            </button>
          </div>
        </section>
      )
    },
    // Slide 10 - Two Python Tasks
    {
      id: 10,
      content: (
        <section className="border-8 border-black bg-white p-8 mb-12">
          <h1 className="text-3xl font-black uppercase border-b-8 border-black pb-2 mb-8 tracking-tight">
            Watch the following two Python tasks:
          </h1>
          <div className="flex justify-center gap-8 mb-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-red-100 border-4 border-black rounded-full flex items-center justify-center text-red-600 font-black text-2xl mb-2">1</div>
              <p className="text-xl font-bold">Python task on functions</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-orange-100 border-4 border-black rounded-full flex items-center justify-center text-orange-600 font-black text-2xl mb-2">2</div>
              <p className="text-xl font-bold">Python task on debugging</p>
            </div>
          </div>
          <button 
            className="bg-black text-white px-8 py-4 uppercase font-bold border-4 border-black hover:bg-yellow-400 hover:text-black transition-colors active:scale-95"
            onClick={() => setCurrentSlide(11)}
          >
            Continue
          </button>
        </section>
      )
    },
    // Slide 11 - Which is more difficult?
    {
      id: 11,
      content: (
        <section className="border-8 border-black bg-white p-8 mb-12">
          <h2 className="text-2xl font-black uppercase mb-8">Which task is more difficult?</h2>
          <div className="grid grid-cols-1 gap-4 mb-8">
            <button 
              className="bg-gray-600 text-white px-8 py-4 border-4 border-black font-black uppercase"
              onClick={() => setCurrentSlide(12)}
            >
              1
            </button>
            <button 
              className="bg-gray-200 text-black px-8 py-4 border-4 border-black font-black uppercase"
              onClick={() => setCurrentSlide(12)}
            >
              2
            </button>
          </div>
          <div className="space-y-6">
            <p className="text-lg font-bold">Actually, <b>Scenario 2</b> is more challenging in this case. Can you think of a reason why?</p>
            <button 
              className="ml-2 underline font-black text-blue-700"
              onClick={() => setCurrentSlide(12)}
            >
              Tell Me!
            </button>
          </div>
        </section>
      )
    },
    // Slide 12 - Debugging Explanation
    {
      id: 12,
      content: (
        <section className="border-8 border-black bg-white p-8 mb-12">
          <div className="bg-blue-100 border-l-8 border-black p-6 mb-8">
            <p className="font-bold">One reason is that debugging problems involves a deeper understanding of programming and Python than functions. This makes it harder for someone who is not familiar with programming to learn.</p>
          </div>
          <button 
            className="bg-black text-white px-8 py-4 uppercase font-bold border-4 border-black hover:bg-yellow-400 hover:text-black transition-colors active:scale-95"
            onClick={() => setCurrentSlide(13)}
          >
            Continue
          </button>
        </section>
      )
    },
    // Slide 13 - Task Comparison
    {
      id: 13,
      content: (
        <section className="border-8 border-black bg-white p-8 mb-12">
          <h1 className="text-3xl font-black uppercase border-b-8 border-black pb-2 mb-8 text-center">
            Compare these two Python learning tasks:
          </h1>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border-4 border-black p-6 rounded">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 border-4 border-black rounded-full flex items-center justify-center text-green-600 font-black text-lg mr-4">A</div>
                <h3 className="text-xl font-black">List Manipulation</h3>
              </div>
              <div className="bg-gray-50 rounded p-4 mb-4">
                <p className="text-sm font-bold mb-2">Task:</p>
                <p className="mb-4">Write functions to perform basic list operations: finding max/min values, calculating averages, filtering even numbers, etc.</p>
                <pre className="bg-black text-lime-300 p-3 rounded text-sm font-mono">
{`# Example exercise:
def find_even_numbers(numbers):
    # Return list of even numbers
    pass`}
                </pre>
              </div>
              <div className="text-sm font-bold">Practice pattern: Clear, immediate feedback with each function you write</div>
            </div>
            <div className="bg-white border-4 border-black p-6 rounded">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 border-4 border-black rounded-full flex items-center justify-center text-purple-600 font-black text-lg mr-4">B</div>
                <h3 className="text-xl font-black">Algorithm Design</h3>
              </div>
              <div className="bg-gray-50 rounded p-4 mb-4">
                <p className="text-sm font-bold mb-2">Task:</p>
                <p className="mb-4">Design efficient algorithms for complex problems: graph traversal, dynamic programming, optimization problems, etc.</p>
                <pre className="bg-black text-lime-300 p-3 rounded text-sm font-mono">
{`# Example exercise:
def shortest_path(graph, start, end):
    # Find shortest path in weighted graph
    # Consider edge cases, optimization
    pass`}
                </pre>
              </div>
              <div className="text-sm font-bold">Practice pattern: Progress feels slow initially, breakthrough moments after extended practice</div>
            </div>
          </div>
          <button 
            className="bg-black text-white px-8 py-4 uppercase font-bold border-4 border-black hover:bg-yellow-400 hover:text-black transition-colors active:scale-95 mt-8"
            onClick={() => setCurrentSlide(14)}
          >
            Continue
          </button>
        </section>
      )
    },
    // Slide 14 - Learning Rate Question
    {
      id: 14,
      content: (
        <section className="border-8 border-black bg-white p-8 mb-12">
          <h2 className="text-2xl font-black uppercase mb-8">Which task has a faster learning rate?</h2>
          <div className="grid grid-cols-1 gap-4 mb-8">
            <button 
              className="bg-green-600 text-white px-8 py-4 border-4 border-black font-black uppercase"
              onClick={() => setCurrentSlide(15)}
            >
              Task A - List Manipulation
            </button>
            <button 
              className="bg-purple-600 text-white px-8 py-4 border-4 border-black font-black uppercase"
              onClick={() => setCurrentSlide(15)}
            >
              Task B - Algorithm Design
            </button>
          </div>
          <div className="bg-yellow-50 border-l-8 border-black p-6 mb-8">
            <p className="text-lg">Correct! <b>Task A</b> typically has a much faster learning rate. Can you think of why this might be?</p>
          </div>
          <button 
            className="ml-2 underline font-black text-blue-700"
            onClick={() => setCurrentSlide(15)}
          >
            Tell me why!
          </button>
        </section>
      )
    },
    // Slide 15 - Learning Rate Explanation
    {
      id: 15,
      content: (
        <section className="border-8 border-black bg-white p-8 mb-12">
          <h2 className="text-2xl font-black text-center mb-6 uppercase">Why Learning Rates Differ</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-green-50 border-l-8 border-black p-6">
              <h3 className="font-black text-green-700 mb-3 flex items-center">
                <span className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm mr-2">A</span>
                Fast Learning Rate
              </h3>
              <ul className="font-bold text-sm">
                <li>• Immediate feedback: Each function either works or doesn't</li>
                <li>• Incremental building: Each new function builds on previous knowledge</li>
                <li>• Clear patterns: Syntax and logic patterns become recognizable quickly</li>
                <li>• Concrete results: You can see and test output immediately</li>
              </ul>
            </div>
            <div className="bg-purple-50 border-l-8 border-black p-6">
              <h3 className="font-black text-purple-700 mb-3 flex items-center">
                <span className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm mr-2">B</span>
                Slow Learning Rate
              </h3>
              <ul className="font-bold text-sm">
                <li>• Abstract thinking: Requires developing mental models of complex processes</li>
                <li>• Pattern recognition: Takes time to recognize when to apply different approaches</li>
                <li>• Integration challenge: Must combine multiple concepts simultaneously</li>
                <li>• Delayed understanding: "Aha!" moments often come after extended practice</li>
              </ul>
            </div>
          </div>
          <div className="bg-blue-50 border-l-8 border-black p-6 mb-8">
            <h3 className="font-black text-blue-700 mb-2">Key Takeaway</h3>
            <p>Understanding learning rates helps set realistic expectations and choose appropriate practice strategies. Fast-learning tasks build confidence, while slow-learning tasks develop deep expertise over time.</p>
          </div>
          <button 
            className="bg-black text-white px-8 py-4 uppercase font-bold border-4 border-black hover:bg-yellow-400 hover:text-black transition-colors active:scale-95"
            onClick={() => setCurrentSlide(16)}
          >
            Continue
          </button>
        </section>
      )
    },
    // Slide 16 - Task Difficulty
    {
      id: 16,
      content: (
        <section className="border-8 border-black bg-white p-8 mb-12">
          <p className="text-lg mb-4">
            We measure how hard a skill is to learn with <b>task difficulty (β)</b>, which represents how hard a specific skill is to master. In practice, this is estimated from aggregated student performance data - skills that most students find difficult have more negative β values.
          </p>
          <p className="text-lg mb-4">
            A lower β suggests that the skill is harder to learn, so it's less likely that the student will answer a task on the same concept correctly on the next try.
          </p>
          <div className="bg-white border-4 border-black p-6 mb-4">
            <p className="text-lg font-bold mb-4 italic">Click to fill in the blanks!</p>
            <p className="text-lg mb-2">
              On the other hand, a higher β suggests that the skill is
              <select 
                className="border-4 border-black px-2 py-1 mx-2"
                value={fillInBlanks.blank1}
                onChange={(e) => setFillInBlanks({...fillInBlanks, blank1: e.target.value})}
              >
                <option value="">...</option>
                <option value="easier">easier</option>
                <option value="harder">harder</option>
              </select>
              to learn, so it's
              <select 
                className="border-4 border-black px-2 py-1 mx-2"
                value={fillInBlanks.blank2}
                onChange={(e) => setFillInBlanks({...fillInBlanks, blank2: e.target.value})}
              >
                <option value="">...</option>
                <option value="more">more</option>
                <option value="less">less</option>
              </select>
              likely that the student will answer a task on the same concept correctly on the next try.
            </p>
          </div>
          <button 
            className="bg-black text-white px-8 py-4 uppercase font-bold border-4 border-black hover:bg-yellow-400 hover:text-black transition-colors active:scale-95"
            onClick={() => setCurrentSlide(17)}
          >
            Continue
          </button>
        </section>
      )
    }
  ]

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-4xl p-8">
        {slides[currentSlide].content}
      </div>
    </div>

  ) 
}