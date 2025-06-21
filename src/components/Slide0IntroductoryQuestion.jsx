export const Slide0IntroductoryQuestion = ({guess1, setGuess1, scroll}) => {
 const handleSubmitGuess1 = () => guess1.trim() && scroll(1);
return (
<div className="max-w-2xl w-full text-center space-y-8">
<h1 className="text-3xl font-bold text-gray-800 mb-8">
 What is the output of the following code?
</h1>
<div className="bg-white rounded-lg shadow-lg p-6 mb-8">
<h2 className="text-xl italic font-semibold mb-4">
 Hint: It's what we're going to be learning about today!
</h2>
<div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-left mb-4">
<div>word = "nohtyp"</div>
<div>reversed_word = word[::-1]</div>
<div>print(reversed_word)</div>
</div>
</div>
<div className="flex space-x-4">
<input
type="text"
placeholder="Type guess here..."
value={guess1}
onChange={(e) => setGuess1(e.target.value)}
className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:outline-none focus:ring-2 focus:ring-purple-500"
/>
<button
onClick={handleSubmitGuess1}
className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
>
 Submit guess!
</button>
</div>
</div>
);
}