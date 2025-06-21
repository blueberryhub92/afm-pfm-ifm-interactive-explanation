export const Slide1GuessResult = ({ guess1, scroll }) => (
    <div className="max-w-2xl w-full text-center space-y-8">
      <div className="border-t-2 border-b-2 border-orange-400 py-4">
        <p className="text-orange-600 italic text-lg">You guessed: {guess1}</p>
      </div>

      <p className="text-lg text-gray-700 leading-relaxed">
        You may have recognized the programming language above as{" "}
        <strong>Python</strong>, but chances are, you probably didn't know how
        to solve the task.
      </p>

      <p className="text-lg text-gray-700">
        Ready for the answer?
        <button
          onClick={() => scroll(2)}
          className="ml-2 underline text-blue-600 hover:text-blue-800 font-semibold"
        >
          Yes!
        </button>
      </p>
    </div>
  );
