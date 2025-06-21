import { useState } from 'react';

export const Slide9SuccessProbabilityProgress = ({ scroll }) => {
  const [gotItClicked, setGotItClicked] = useState(false);

  return (
    <div className="max-w-2xl w-full text-center space-y-8 px-8">
      <div className="flex justify-center mb-8">
        <div className="text-orange-500 text-6xl">↑</div>
      </div>
      <div className="space-y-6 text-gray-700 leading-relaxed">
        <p className="text-lg">
          AFM estimates the probability that a student answers the next task
          on a specific skill correctly. As it will turn out,{" "}
          <strong>T</strong> helps to update the success probability over
          time.
        </p>
        <p className="text-lg">
          Let's track your own journey to mastery! You can see your current
          success probability within the{" "}
          <strong>bar at the top of the page</strong>.{" "}
          <em>Hover over the bar to see probabilities.</em>
        </p>
        <button
          onClick={() => setGotItClicked(true)}
          className="text-lg font-semibold text-blue-600 bg-transparent border-none cursor-pointer hover:text-blue-800 transition-colors"
        >
          Got it!
        </button>
        {gotItClicked && (
          <div className="space-y-6 mt-8">
            <p className="text-lg text-gray-700">
              Alright, let's continue learning about more parameters!
            </p>
            <button
              onClick={() => scroll(10)}
              className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-lg font-semibold"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};