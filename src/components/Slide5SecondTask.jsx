export const Slide5SecondTask = ({ scroll }) => (
  <div className="max-w-2xl w-full text-center space-y-8">
    <h2 className="text-2xl font-bold text-gray-800">
      Let's tackle another task of the same concept
    </h2>

    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-left mb-4">
        <div>message = "dlokgm"</div>
        <div>result = message[::2]</div>
        <div>print(result)</div>
      </div>

      <p className="text-lg text-gray-700 mb-4">
        This is another Python task on variables, but different from the first
        task.
      </p>
    </div>

    <div className="text-center">
      <button
        onClick={() => scroll(6)}
        className="px-8 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
      >
        Continue
      </button>
    </div>
  </div>
);
