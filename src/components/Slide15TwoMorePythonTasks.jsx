export const Slide15TwoMorePythonTasks = ({ scroll }) => (
  <div className="max-w-4xl w-full space-y-8">
    <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
      Compare these two Python learning tasks:
    </h1>

    <div className="grid md:grid-cols-2 gap-8">
      {/* Task A */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-green-100 border-2 border-green-400 rounded-full flex items-center justify-center text-green-600 font-bold text-lg mr-4">
            A
          </div>
          <h3 className="text-xl font-semibold text-gray-800">
            List Manipulation
          </h3>
        </div>

        <div className="bg-gray-50 rounded p-4 mb-4">
          <p className="text-sm text-gray-600 mb-2">
            <strong>Task:</strong>
          </p>
          <p className="text-gray-700 mb-4">
            Write functions to perform basic list operations: finding max/min
            values, calculating averages, filtering even numbers, etc.
          </p>

          <div className="bg-gray-800 text-green-400 p-3 rounded text-sm font-mono">
            <div># Example exercise:</div>
            <div>def find_even_numbers(numbers):</div>
            <div className="ml-4"># Return list of even numbers</div>
            <div className="ml-4">pass</div>
          </div>
        </div>

        <div className="text-sm text-gray-600">
          <p>
            <strong>Practice pattern:</strong> Clear, immediate feedback with
            each function you write
          </p>
        </div>
      </div>

      {/* Task B */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-purple-100 border-2 border-purple-400 rounded-full flex items-center justify-center text-purple-600 font-bold text-lg mr-4">
            B
          </div>
          <h3 className="text-xl font-semibold text-gray-800">
            Algorithm Design
          </h3>
        </div>

        <div className="bg-gray-50 rounded p-4 mb-4">
          <p className="text-sm text-gray-600 mb-2">
            <strong>Task:</strong>
          </p>
          <p className="text-gray-700 mb-4">
            Design efficient algorithms for complex problems: graph traversal,
            dynamic programming, optimization problems, etc.
          </p>

          <div className="bg-gray-800 text-green-400 p-3 rounded text-sm font-mono">
            <div># Example exercise:</div>
            <div>def shortest_path(graph, start, end):</div>
            <div className="ml-4"># Find shortest path in weighted graph</div>
            <div className="ml-4"># Consider edge cases, optimization</div>
            <div className="ml-4">pass</div>
          </div>
        </div>

        <div className="text-sm text-gray-600">
          <p>
            <strong>Practice pattern:</strong> Progress feels slow initially,
            breakthrough moments after extended practice
          </p>
        </div>
      </div>
    </div>

    <div className="text-center">
      <button
        onClick={() => scroll(16)}
        className="px-8 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
      >
        Continue
      </button>
    </div>
  </div>
);
