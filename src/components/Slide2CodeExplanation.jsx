export const Slide2CodeExplanation = ({ scroll }) => (
 <div className="max-w-2xl w-full space-y-8">
<div className="bg-white rounded-lg shadow-lg p-6">
<h2 className="text-2xl font-bold mb-4 text-center">Code Explanation</h2>
<div className="bg-gray-900 text-green-400 p-4 rounded font-mono mb-4">
<div>word = "nohtyp"</div>
<div>reversed_word = word[::-1]</div>
<div>print(reversed_word)</div>
</div>
<div className="space-y-3 text-left">
<p><strong>Step by step:</strong></p>
<p>• word is assigned the string "nohtyp"</p>
<p>• reversed_word = word[::-1]</p>
<p>• The [::-1] is Python's slice notation for reversing a string</p>
<p>• It means: start at the end, go to the beginning, step by -1 (backwards)</p>
<p>• So "nohtyp" becomes "python" when reversed</p>
<p>• The print() function outputs the reversed string</p>
<p><strong>The output is: python</strong></p>
</div>
</div>
<div className="text-center">
<button
onClick={() => scroll(3)}
className="px-8 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
>
 Continue
</button>
</div>
</div>
 );