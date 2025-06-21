export const Slide17LearningRateExplanation = ({scroll}) => (
  <div>
    <div className="max-w-3xl w-full space-y-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Why Learning Rates Differ
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-green-50 border-l-4 border-green-400 p-6">
          <h3 className="font-bold text-green-700 mb-3 flex items-center">
            <span className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm mr-2">
              A
            </span>
            Fast Learning Rate
          </h3>
          <ul className="text-gray-700 space-y-2 text-sm">
            <li>
              • <strong>Immediate feedback:</strong> Each function either works
              or doesn't
            </li>
            <li>
              • <strong>Incremental building:</strong> Each new function builds
              on previous knowledge
            </li>
            <li>
              • <strong>Clear patterns:</strong> Syntax and logic patterns
              become recognizable quickly
            </li>
            <li>
              • <strong>Concrete results:</strong> You can see and test output
              immediately
            </li>
          </ul>
        </div>

        <div className="bg-purple-50 border-l-4 border-purple-400 p-6">
          <h3 className="font-bold text-purple-700 mb-3 flex items-center">
            <span className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm mr-2">
              B
            </span>
            Slow Learning Rate
          </h3>
          <ul className="text-gray-700 space-y-2 text-sm">
            <li>
              • <strong>Abstract thinking:</strong> Requires developing mental
              models of complex processes
            </li>
            <li>
              • <strong>Pattern recognition:</strong> Takes time to recognize
              when to apply different approaches
            </li>
            <li>
              • <strong>Integration challenge:</strong> Must combine multiple
              concepts simultaneously
            </li>
            <li>
              • <strong>Delayed understanding:</strong> "Aha!" moments often
              come after extended practice
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-6">
        <h3 className="font-bold text-blue-700 mb-2">Key Takeaway</h3>
        <p className="text-gray-700">
          Understanding learning rates helps set realistic expectations and
          choose appropriate practice strategies. Fast-learning tasks build
          confidence, while slow-learning tasks develop deep expertise over
          time.
        </p>
      </div>
    </div>
    <div className="text-center pt-10">
      <button
        onClick={() => scroll(18)}
        className="px-8 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
      >
        Continue
      </button>
    </div>
  </div>
);
