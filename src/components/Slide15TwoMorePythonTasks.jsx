import { Code, Target, Zap, ArrowRight, List, Brain, TrendingUp, Clock } from "lucide-react";

export const Slide15TwoMorePythonTasks = ({ scroll }) => (
  <div className="bg-white min-h-screen flex flex-col items-center py-8 px-4 md:px-10 text-black font-['IBM_Plex_Mono',monospace]">
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-8">
      
      {/* Header */}
      <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative">
        <div className="absolute -top-6 left-4 px-3 py-1 bg-black text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
          <Code className="w-4 h-4" />
          TASK COMPARISON
        </div>
        <div className="text-2xl md:text-3xl font-bold tracking-tight text-black text-center">
          Compare these two Python learning tasks:
        </div>
      </div>

      {/* Tasks Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        
        {/* Task A */}
        <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative">
          <div className="absolute -top-6 left-4 px-3 py-1 bg-green-600 text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
            <List className="w-4 h-4" />
            TASK A
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-green-100 border-4 border-green-600 rounded-xl flex items-center justify-center text-green-700 font-bold text-2xl">
              A
            </div>
            <div className="text-2xl font-bold text-black">
              List Manipulation
            </div>
          </div>
          
          <div className="border-4 border-green-600 rounded-xl p-6 bg-green-50 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-green-700" />
              <span className="font-bold text-green-700 text-lg">TASK DESCRIPTION</span>
            </div>
            <p className="text-black mb-4 leading-relaxed">
              Write functions to perform basic list operations: finding max/min values, calculating averages, filtering even numbers, etc.
            </p>
            
            <div className="bg-black text-green-400 p-4 rounded-lg border-2 border-green-600 font-mono text-sm">
              <div className="text-green-300"># Example exercise:</div>
              <div className="text-white">def find_even_numbers(numbers):</div>
              <div className="ml-4 text-gray-400"># Return list of even numbers</div>
              <div className="ml-4 text-yellow-400">pass</div>
            </div>
          </div>
          
          <div className="border-l-8 border-green-600 bg-green-100 p-4 rounded-r-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-green-700" />
              <span className="font-bold text-green-700">PRACTICE PATTERN</span>
            </div>
            <p className="text-black font-mono">
              Clear, immediate feedback with each function you write
            </p>
          </div>
        </div>

        {/* Task B */}
        <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative">
          <div className="absolute -top-6 left-4 px-3 py-1 bg-purple-600 text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
            <Brain className="w-4 h-4" />
            TASK B
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-purple-100 border-4 border-purple-600 rounded-xl flex items-center justify-center text-purple-700 font-bold text-2xl">
              B
            </div>
            <div className="text-2xl font-bold text-black">
              Algorithm Design
            </div>
          </div>
          
          <div className="border-4 border-purple-600 rounded-xl p-6 bg-purple-50 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-purple-700" />
              <span className="font-bold text-purple-700 text-lg">TASK DESCRIPTION</span>
            </div>
            <p className="text-black mb-4 leading-relaxed">
              Design efficient algorithms for complex problems: graph traversal, dynamic programming, optimization problems, etc.
            </p>
            
            <div className="bg-black text-green-400 p-4 rounded-lg border-2 border-purple-600 font-mono text-sm">
              <div className="text-green-300"># Example exercise:</div>
              <div className="text-white">def shortest_path(graph, start, end):</div>
              <div className="ml-4 text-gray-400"># Find shortest path in weighted graph</div>
              <div className="ml-4 text-gray-400"># Consider edge cases, optimization</div>
              <div className="ml-4 text-yellow-400">pass</div>
            </div>
          </div>
          
          <div className="border-l-8 border-purple-600 bg-purple-100 p-4 rounded-r-lg">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-purple-700" />
              <span className="font-bold text-purple-700">PRACTICE PATTERN</span>
            </div>
            <p className="text-black font-mono">
              Progress feels slow initially, breakthrough moments after extended practice
            </p>
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <div className="flex justify-center">
        <button
          onClick={() => scroll(16)}
          className="px-8 py-4 bg-purple-600 text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-purple-600 hover:border-purple-600 transition-all transform hover:scale-105 flex items-center gap-3"
        >
          <span>Continue</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
);