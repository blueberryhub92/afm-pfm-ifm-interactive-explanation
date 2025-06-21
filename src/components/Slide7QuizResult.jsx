import { useState } from 'react';

export const Slide7QuizResult = ({ guess2, scroll }) => {
  const [showTellMe, setShowTellMe] = useState(false);
  
  const handleTellMe = () => {
    setShowTellMe(true);
  };
  
  return (
    <div className="relative max-w-2xl w-full text-center space-y-8">
      <div className="border-t-2 border-b-2 border-orange-400 py-4">
        <p className="text-orange-600 italic text-lg">You guessed: {guess2}</p>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <p className="text-lg font-semibold">Answer: dog</p>
        <p className="text-sm text-gray-500">
                        <img
                          src="dog.jpg"
                          alt="dog"
                          className="w-32 h-auto mx-auto"
                        />
                      </p>
      </div>
      <p className="text-lg text-gray-700 leading-relaxed">
        Did you get it right? Hopefully, that question was easier than the first
        one. So what do you think happened?
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
            Well, this is connected to our next AFM parameter:{" "}
            <strong>T</strong>. T<sub>ik</sub> represents how many times a
            student <em>i</em> has practiced skill <em>k</em>. This is a key
            input to the AFM model. Look at the tooltip at the bottom right and see how the AFM formula expands.
          </p>
        </div>
      )}
      {showTellMe && (
        <div className="text-center">
          <button
            onClick={() => scroll(8)}
            className="px-8 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
};