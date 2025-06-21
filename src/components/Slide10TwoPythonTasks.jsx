import { useProbability } from './shared/ProbabilityContext';

export const Slide10TwoPythonTasks = ({ scroll }) => {
  const { updateProbability } = useProbability();

  const handleStartTask = () => {
    // Example of updating probability when starting a task
    updateProbability(0.30);
    scroll(11);
  };

  return (
    <div className="max-w-2xl w-full text-center space-y-8 px-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Try the following two Python tasks:
      </h1>
      <div className="flex justify-center space-x-8 mb-8">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-green-100 border-2 border-green-400 rounded-full flex items-center justify-center text-green-600 font-bold text-xl mb-2">
            1
          </div>
          <p className="text-gray-700">Variable Declaration Task</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-orange-100 border-2 border-orange-400 rounded-full flex items-center justify-center text-orange-600 font-bold text-xl mb-2">
            2
          </div>
          <p className="text-gray-700">For Loop Task</p>
        </div>
      </div>
      <div className="text-center">
        <button
          onClick={handleStartTask}
          className="px-8 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
        >
          Start Task 1
        </button>
      </div>
    </div>
  );
};