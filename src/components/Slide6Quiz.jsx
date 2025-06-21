export const Slide6Quiz = ({guess2, setGuess2, scroll}) => {
  const handleSubmitGuess2 = () => guess2.trim() && scroll(7);
  
  return (
    <div className="max-w-2xl w-full text-center space-y-8">
      <h2 className="text-2xl font-bold text-gray-800">
        Let's tackle another string slicing challenge!
      </h2>
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h3 className="text-xl italic font-semibold mb-4">
          What will this code output?
        </h3>
        <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-left mb-4">
          <div>message = "dlokgm"</div>
          <div>result = message[::2]</div>
          <div>print(result)</div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Hint: This uses a different step value than our first example!
        </p>
      </div>
      
      <div className="flex space-x-4">
        <input
          type="text"
          placeholder="Type your guess here..."
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
  );
};