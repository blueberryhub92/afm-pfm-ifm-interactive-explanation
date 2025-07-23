import { useState } from "react";
import {
  Calculator,
  Brain,
  Target,
  TrendingUp,
  Play,
  BookOpen,
  Code,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export const AFMFormulaExplanation = ({ scroll }) => {
  const [showMath, setShowMath] = useState(false);
  const [hoveredTerm, setHoveredTerm] = useState(null);
  const [showQMatrix, setShowQMatrix] = useState(false);
  const [currentTask, setCurrentTask] = useState(0);

  // Python programming tasks and their required skills
  const pythonTasks = [
    {
      name: "Print Hello World",
      code: 'print("Hello, World!")',
      description: "Basic output statement",
      skills: {
        "Basic Syntax": 1,
        Variables: 0,
        Loops: 0,
        Functions: 0,
        "Data Structures": 0,
        "File I/O": 0,
        "String Operations": 1,
        Conditionals: 0,
      },
    },
    {
      name: "Variable Assignment",
      code: 'name = "Alice"\nage = 25\nprint(f"Name: {name}, Age: {age}")',
      description: "Variables and string formatting",
      skills: {
        "Basic Syntax": 1,
        Variables: 1,
        Loops: 0,
        Functions: 0,
        "Data Structures": 0,
        "File I/O": 0,
        "String Operations": 1,
        Conditionals: 0,
      },
    },
    {
      name: "For Loop with List",
      code: "numbers = [1, 2, 3, 4, 5]\nfor num in numbers:\n    print(num * 2)",
      description: "Iteration and list processing",
      skills: {
        "Basic Syntax": 1,
        Variables: 1,
        Loops: 1,
        Functions: 0,
        "Data Structures": 1,
        "File I/O": 0,
        "String Operations": 0,
        Conditionals: 0,
      },
    },
    {
      name: "Function Definition",
      code: 'def calculate_area(length, width):\n    return length * width\n\narea = calculate_area(5, 3)\nprint(f"Area: {area}")',
      description: "Function creation and parameters",
      skills: {
        "Basic Syntax": 1,
        Variables: 1,
        Loops: 0,
        Functions: 1,
        "Data Structures": 0,
        "File I/O": 0,
        "String Operations": 1,
        Conditionals: 0,
      },
    },
    {
      name: "Conditional Logic",
      code: 'score = 85\nif score >= 90:\n    grade = "A"\nelif score >= 80:\n    grade = "B"\nelse:\n    grade = "C"\nprint(f"Grade: {grade}")',
      description: "If-else statements and comparison",
      skills: {
        "Basic Syntax": 1,
        Variables: 1,
        Loops: 0,
        Functions: 0,
        "Data Structures": 0,
        "File I/O": 0,
        "String Operations": 1,
        Conditionals: 1,
      },
    },
    {
      name: "File Reading",
      code: 'with open("data.txt", "r") as file:\n    content = file.read()\n    lines = content.split("\\n")\n    for line in lines:\n        print(line.strip())',
      description: "File operations and string processing",
      skills: {
        "Basic Syntax": 1,
        Variables: 1,
        Loops: 1,
        Functions: 0,
        "Data Structures": 1,
        "File I/O": 1,
        "String Operations": 1,
        Conditionals: 0,
      },
    },
  ];

  const skillNames = Object.keys(pythonTasks[0].skills);

  const QMatrixVisualization = ({ onClose }) => {
    const [currentTask, setCurrentTask] = useState(0);

    // Python programming tasks and their required skills
    const pythonTasks = [
      {
        name: "Print Hello World",
        code: 'print("Hello, World!")',
        description: "Basic output statement",
        skills: {
          "Basic Syntax": 1,
          Variables: 0,
          Loops: 0,
          Functions: 0,
          "Data Structures": 0,
          "File I/O": 0,
          "String Operations": 1,
          Conditionals: 0,
        },
      },
      {
        name: "Variable Assignment",
        code: 'name = "Alice"\nage = 25\nprint(f"Name: {name}, Age: {age}")',
        description: "Variables and string formatting",
        skills: {
          "Basic Syntax": 1,
          Variables: 1,
          Loops: 0,
          Functions: 0,
          "Data Structures": 0,
          "File I/O": 0,
          "String Operations": 1,
          Conditionals: 0,
        },
      },
      {
        name: "For Loop with List",
        code: "numbers = [1, 2, 3, 4, 5]\nfor num in numbers:\n    print(num * 2)",
        description: "Iteration and list processing",
        skills: {
          "Basic Syntax": 1,
          Variables: 1,
          Loops: 1,
          Functions: 0,
          "Data Structures": 1,
          "File I/O": 0,
          "String Operations": 0,
          Conditionals: 0,
        },
      },
      {
        name: "Function Definition",
        code: 'def calculate_area(length, width):\n    return length * width\n\narea = calculate_area(5, 3)\nprint(f"Area: {area}")',
        description: "Function creation and parameters",
        skills: {
          "Basic Syntax": 1,
          Variables: 1,
          Loops: 0,
          Functions: 1,
          "Data Structures": 0,
          "File I/O": 0,
          "String Operations": 1,
          Conditionals: 0,
        },
      },
      {
        name: "Conditional Logic",
        code: 'score = 85\nif score >= 90:\n    grade = "A"\nelif score >= 80:\n    grade = "B"\nelse:\n    grade = "C"\nprint(f"Grade: {grade}")',
        description: "If-else statements and comparison",
        skills: {
          "Basic Syntax": 1,
          Variables: 1,
          Loops: 0,
          Functions: 0,
          "Data Structures": 0,
          "File I/O": 0,
          "String Operations": 1,
          Conditionals: 1,
        },
      },
      {
        name: "File Reading",
        code: 'with open("data.txt", "r") as file:\n    content = file.read()\n    lines = content.split("\\n")\n    for line in lines:\n        print(line.strip())',
        description: "File operations and string processing",
        skills: {
          "Basic Syntax": 1,
          Variables: 1,
          Loops: 1,
          Functions: 0,
          "Data Structures": 1,
          "File I/O": 1,
          "String Operations": 1,
          Conditionals: 0,
        },
      },
    ];

    const skillNames = Object.keys(pythonTasks[0].skills);
    const currentTaskData = pythonTasks[currentTask];

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white border-4 border-black rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto font-mono">
          {/* Header */}
          <div className="bg-black text-white p-6 border-b-4 border-black rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Code className="w-8 h-8" />
                <h3 className="text-2xl font-bold tracking-wide">
                  Q-Matrix Visualization
                </h3>
              </div>
              <button
                onClick={() => setShowQMatrix(false)}
                className="p-2 hover:bg-white hover:text-black border-2 border-white rounded-lg transition-colors font-bold"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="p-8 space-y-8">
            {/* Task Selector */}
            <div className="border-4 border-black rounded-xl p-6 bg-white shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-xl font-bold text-black tracking-tight">
                  Current Programming Task:
                </h4>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentTask(Math.max(0, currentTask - 1))}
                    disabled={currentTask === 0}
                    className="p-2 border-2 border-black rounded-lg hover:bg-black hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-bold"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="font-mono text-sm bg-gray-100 px-3 py-1 border-2 border-black rounded-lg font-bold">
                    {currentTask + 1} / {pythonTasks.length}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentTask(
                        Math.min(pythonTasks.length - 1, currentTask + 1)
                      )
                    }
                    disabled={currentTask === pythonTasks.length - 1}
                    className="p-2 border-2 border-black rounded-lg hover:bg-black hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-bold"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="bg-blue-50 border-2 border-blue-600 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                  <strong className="text-black text-lg font-bold">
                    {currentTaskData.name}
                  </strong>
                </div>
                <p className="text-black text-sm mb-4 font-mono">
                  {currentTaskData.description}
                </p>
                <div className="bg-black text-green-400 p-4 border-2 border-gray-600 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{currentTaskData.code}</pre>
                </div>
              </div>
            </div>

            {/* Q-Matrix Table */}
            <div className="border-4 border-black rounded-xl p-6 bg-white shadow-lg">
              <h4 className="text-xl font-bold text-black mb-6 flex items-center gap-3 tracking-tight">
                <Target className="w-6 h-6" />
                Q-Matrix: Skills Required for This Task
              </h4>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border-2 border-black p-3 text-left font-bold text-black text-sm">
                        Skill (Knowledge Component)
                      </th>
                      <th className="border-2 border-black p-3 text-center font-bold text-black text-sm">
                        q<sub>jk</sub> Value
                      </th>
                      <th className="border-2 border-black p-3 text-center font-bold text-black text-sm">
                        Required?
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {skillNames.map((skill, index) => {
                      const isRequired = currentTaskData.skills[skill] === 1;
                      return (
                        <tr
                          key={skill}
                          className={isRequired ? "bg-green-50" : "bg-red-50"}
                        >
                          <td className="border-2 border-black p-3 font-mono text-sm font-bold text-black">
                            {skill}
                          </td>
                          <td className="border-2 border-black p-3 text-center">
                            <span
                              className={`inline-block w-8 h-8 border-2 border-black rounded-lg flex items-center justify-center font-bold text-lg ${isRequired
                                ? "bg-green-600 text-white"
                                : "bg-red-600 text-white"
                                }`}
                            >
                              {currentTaskData.skills[skill]}
                            </span>
                          </td>
                          <td className="border-2 border-black p-3 text-center">
                            <span
                              className={`px-4 py-1 border-2 border-black rounded-lg text-sm font-bold ${isRequired
                                ? "bg-green-600 text-white"
                                : "bg-red-600 text-white"
                                }`}
                            >
                              {isRequired ? "YES" : "NO"}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Formula Context */}
            <div className="bg-blue-50 border-4 border-blue-600 rounded-xl p-6 shadow-lg">
              <h4 className="text-xl font-bold text-black mb-6 flex items-center gap-3 tracking-tight">
                <Calculator className="w-6 h-6" />
                How This Affects the AFM Formula
              </h4>
              <div className="space-y-4">
                <p className="text-black text-sm font-mono leading-relaxed">
                  In the AFM formula, only skills where{" "}
                  <span className="bg-gray-100 px-2 py-1 border-2 border-black rounded font-bold">
                    q<sub>jk</sub> = 1
                  </span>{" "}
                  contribute to the calculation:
                </p>
                <div className="bg-white border-2 border-gray-600 rounded-lg p-4 font-mono">
                  {skillNames.filter(
                    (skill) => currentTaskData.skills[skill] === 1
                  ).length > 0 ? (
                    <div>
                      <div className="text-black font-bold mb-3 text-sm">
                        Active terms for "{currentTaskData.name}":
                      </div>
                      <div className="space-y-2">
                        {skillNames
                          .filter((skill) => currentTaskData.skills[skill] === 1)
                          .map((skill, index) => (
                            <div key={skill} className="text-black font-mono text-sm bg-gray-100 p-2 border-2 border-gray-600 rounded">
                              • q<sub>j,{skill}</sub> × β<sub>{skill}</sub> + q
                              <sub>j,{skill}</sub> × γ<sub>{skill}</sub> × T
                              <sub>i,{skill}</sub>
                            </div>
                          ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-black font-bold text-sm">
                      No skills required for this task
                    </div>
                  )}
                </div>
                <div className="bg-red-50 border-2 border-red-600 rounded-lg p-4">
                  <p className="text-black font-mono text-sm leading-relaxed">
                    Skills with q<sub>jk</sub> = 0 are multiplied by zero, so they
                    don't contribute to the student's predicted performance on
                    this task.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AFMFormulaTooltip = () => (
    <div className="fixed z-50 top-55 left-4 bg-white border-4 border-blue-700 rounded-xl shadow-lg p-6 max-w-sm w-auto font-mono">
      <div className="absolute -top-6 left-4 px-3 py-1 bg-blue-700 text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
        <Calculator className="w-4 h-4" />
        AFM FORMULA EXPLAINED
      </div>

      <h4 className="font-bold text-blue-800 mb-4 text-lg uppercase tracking-wide">
        How AFM Works in Practice
      </h4>

      <div className="bg-blue-50 border-2 border-blue-600 rounded-lg p-4 mt-4">
        <div className="font-bold text-blue-800 text-sm mb-2 uppercase tracking-wide">
          Why This Formula Works:
        </div>
        <div className="space-y-2 text-xs">
          <div className="bg-white border border-blue-300 rounded p-2">
            <div className="text-blue-900 font-bold">
              Log-odds transformation
            </div>
            <div className="text-blue-800">
              Converts probabilities (0-1) to linear scale (-∞ to +∞)
            </div>
          </div>
          <div className="bg-white border border-blue-300 rounded p-2">
            <div className="text-blue-900 font-bold">Additive modeling</div>
            <div className="text-blue-800">
              Can add/subtract ability, difficulty, and practice effects
            </div>
          </div>
          <div className="bg-white border border-blue-300 rounded p-2">
            <div className="text-blue-900 font-bold">Easy computation</div>
            <div className="text-blue-800">
              Linear math first, then convert to probability at the end
            </div>
          </div>
        </div>
      </div>

      <div className="bg-orange-50 border-2 border-orange-600 rounded-lg p-4 mt-6">
        <div className="font-bold text-orange-800 text-sm mb-3 uppercase tracking-wide flex items-center gap-2">
          <Calculator className="w-4 h-4" />
          Step-by-Step Process:
        </div>
        <div className="space-y-2 font-mono text-xs">
          <div className="bg-white border border-orange-300 rounded p-2">
            <div className="text-orange-900 font-bold mb-1">
              Step 1: Calculate the right side
            </div>
            <div className="text-orange-800">θᵢ + Σβₖ + Σγₖᵀᵢₖ = 1.39</div>
            <div className="text-orange-700 text-xs mt-1">
              Add student ability + skill difficulties + practice effects
            </div>
          </div>
          <div className="bg-white border border-orange-300 rounded p-2">
            <div className="text-orange-900 font-bold mb-1">
              Step 2: This equals log(p/(1-p))
            </div>
            <div className="text-orange-800">So log(p/(1-p)) = 1.39</div>
            <div className="text-orange-700 text-xs mt-1">
              The formula shows this relationship
            </div>
          </div>
          <div className="bg-white border border-orange-300 rounded p-2">
            <div className="text-orange-900 font-bold mb-1">
              Step 3: Solve for p using logistic function
            </div>
            <div className="text-orange-800">
              p = e^1.39/(1+e^1.39) = 4/5 = 0.8
            </div>
            <div className="text-orange-700 text-xs mt-1">
              Convert back to probability (80% chance of success)
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => setHoveredTerm(null)}
        className="absolute top-2 right-2 px-2 py-1 rounded border-2 border-black bg-blue-700 text-white font-bold hover:bg-white hover:text-blue-700 transition-colors"
      >
        X
      </button>
    </div>
  );

  const LogOddsTooltip = () => (
    <div className="fixed z-50 top-8 left-4 bg-white border-4 border-green-700 rounded-xl shadow-lg p-6 w-96 font-mono">
      <div className="absolute -top-6 left-4 px-3 py-1 bg-green-700 text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
        <Calculator className="w-4 h-4" />
        LOG-ODDS EXPLAINED
      </div>

      <h4 className="font-bold text-green-800 mb-4 text-lg uppercase tracking-wide">
        What Are Log-Odds?
      </h4>

      <div className="space-y-4">
        <div className="bg-blue-100 border-4 border-blue-600 rounded-xl p-4">
          <div className="text-blue-800 font-bold text-lg mb-2 flex items-center gap-2">
            Regular Probability
          </div>
          <div className="font-mono text-blue-900 text-sm space-y-1">
            <div>• p = 0.7 means 70% chance of success</div>
            <div>• Range: 0 to 1</div>
            <div>• Hard to do math with!</div>
          </div>
        </div>

        <div className="bg-green-100 border-4 border-green-600 rounded-xl p-4">
          <div className="text-green-800 font-bold text-lg mb-2 flex items-center gap-2">
            Log-Odds Transform
          </div>
          <div className="font-mono text-green-900 text-sm space-y-1">
            <div>• Takes p/(1-p) then log of result</div>
            <div>• Range: -∞ to +∞</div>
            <div>
              • <span className="font-black">Easy to add/subtract!</span>
            </div>
          </div>
        </div>

        <div className="bg-purple-100 border-4 border-purple-600 rounded-xl p-4">
          <div className="text-purple-800 font-bold text-lg mb-2 flex items-center gap-2">
            Why AFM Uses This
          </div>
          <div className="font-mono text-purple-900 text-sm space-y-1">
            <div>• Can add ability + difficulty + practice</div>
            <div>• Then convert back to probability</div>
            <div>
              • <span className="font-black">Linear = easier math!</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border-2 border-yellow-600 rounded-lg p-4 mt-4">
        <div className="font-bold text-yellow-800 text-sm mb-2 uppercase tracking-wide">
          Simple Version:
        </div>
        <div className="font-mono text-yellow-900 text-xs">
          Log-odds lets us treat probability like regular numbers we can add and
          subtract!
        </div>
      </div>

      <button
        onClick={() => setHoveredTerm(null)}
        className="absolute top-2 right-2 px-2 py-1 rounded border-2 border-black bg-green-700 text-white font-bold hover:bg-white hover:text-green-700 transition-colors"
      >
        X
      </button>
    </div>
  );

  return (
    <div className="bg-white min-h-screen flex flex-col items-center py-8 px-4 md:px-10 text-black font-mono">
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-8">
        {/* Header */}
        <div className="text-center border-4 border-black rounded-xl p-6 bg-white shadow-lg">
          <h2 className="text-4xl font-bold text-black mb-4 tracking-tight">
            Additive Factor Model (AFM)
          </h2>
          <p className="text-lg text-black font-mono">
            Optional: Learn about the math behind AFM by expanding the section
            below. Press continue when you're ready to move on.
          </p>
        </div>

        {/* Expandable Math Section */}
        <div className="border-4 border-black rounded-xl bg-white shadow-lg overflow-hidden">
          <button
            onClick={() => setShowMath(!showMath)}
            className="w-full bg-black text-white px-6 py-4 text-left font-bold text-lg hover:bg-gray-800 transition-colors flex items-center justify-between border-b-4 border-black"
          >
            <div className="flex items-center gap-3">
              <Calculator className="w-6 h-6" />
              <span>See the math</span>
            </div>
            <span className="text-2xl font-mono">{showMath ? "−" : "+"}</span>
          </button>

          {showMath && (
            <div className="p-8 space-y-8 bg-white">
              <p className="text-black leading-relaxed text-lg font-mono">
                The AFM calculates the
                <span
                  className="mx-1 relative cursor-pointer border-2 border-green-600 bg-green-100 px-2 py-1 rounded hover:bg-green-200 transition-colors"
                  onMouseEnter={() => setHoveredTerm("log-odds")}
                  onMouseLeave={() => setHoveredTerm(null)}
                >
                  <strong>log-odds</strong>
                </span>
                of a student answering a question correctly using the formula:
              </p>

              {/* AFM Formula - Updated with tooltip styling */}
              <div
                className="border-4 border-black rounded-xl p-8 bg-gradient-to-r from-blue-50 to-purple-50 relative shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
                onMouseEnter={() => setHoveredTerm("afm-formula")}
                onMouseLeave={() => setHoveredTerm(null)}
              >
                <div className="absolute -top-4 left-6 px-4 py-2 bg-black text-white font-bold rounded-md text-sm tracking-wider flex items-center gap-2">
                  <Calculator className="w-4 h-4" />
                  AFM FORMULA (hover for details)
                </div>

                {/* Formula with tooltip styling */}
                <div className="flex items-center justify-center space-x-1 mt-4">
                  <span className="font-bold text-lg">log</span>

                  <span className="text-xl font-bold">(</span>
                  <div className="flex flex-col items-center mx-1">
                    <div className="text-sm border-b-2 border-black pb-0.5 mb-0.5 px-1 font-mono">
                      <span className="italic font-bold">p</span>
                      <sub className="text-xs font-bold">ij</sub>
                    </div>
                    <div className="text-sm pt-0.5 font-mono">
                      <span className="font-bold">1 - </span>
                      <span className="italic font-bold">p</span>
                      <sub className="text-xs font-bold">ij</sub>
                    </div>
                  </div>
                  <span className="text-xl font-bold">)</span>

                  <span className="mx-2 font-bold text-xl">=</span>

                  <span className="italic text-lg font-bold text-blue-700">
                    θ
                  </span>
                  <sub className="text-sm font-bold">i</sub>

                  <span className="mx-2 font-bold text-xl">+</span>

                  <div className="flex flex-col items-center mx-1">
                    <div className="text-sm mb-1 font-bold">
                      <span className="italic">K</span>
                    </div>
                    <div className="text-xl font-bold">∑</div>
                    <div className="text-sm mt-1 font-bold">
                      <span className="italic">k</span>=1
                    </div>
                  </div>

                  <div className="mx-1 font-mono">
                    <span className="italic font-bold">q</span>
                    <sub className="text-sm font-bold">jk</sub>
                    <span className="italic font-bold text-purple-700">β</span>
                    <sub className="text-sm font-bold">k</sub>
                  </div>

                  <span className="mx-2 font-bold text-xl">+</span>

                  <div className="flex flex-col items-center mx-1">
                    <div className="text-sm mb-1 font-bold">
                      <span className="italic">K</span>
                    </div>
                    <div className="text-xl font-bold">∑</div>
                    <div className="text-sm mt-1 font-bold">
                      <span className="italic">k</span>=1
                    </div>
                  </div>

                  <div className="mx-1 font-mono">
                    <span className="italic font-bold">q</span>
                    <sub className="text-sm font-bold">jk</sub>
                    <span className="italic font-bold text-green-700">γ</span>
                    <sub className="text-sm font-bold">k</sub>
                    <span className="italic font-bold text-orange-700">T</span>
                    <sub className="text-sm font-bold">ik</sub>
                  </div>
                </div>
              </div>

              {/* Parameter Definitions */}
              <div className="border-4 border-black rounded-xl p-6 bg-white shadow-lg">
                <div className="flex items-center gap-2 mb-6">
                  <BookOpen className="w-6 h-6 text-black" />
                  <span className="font-bold text-xl text-black tracking-tight">
                    PARAMETER DEFINITIONS
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div className="border-2 border-blue-600 rounded-lg p-4 bg-blue-50">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                        <strong className="font-mono text-blue-800">
                          p<sub>ij</sub>
                        </strong>
                      </div>
                      <p className="text-black font-mono text-sm">
                        probability that student <em>i</em> answers item{" "}
                        <em>j</em> correctly
                      </p>
                    </div>

                    <div className="border-2 border-blue-600 rounded-lg p-4 bg-blue-50">
                      <div className="flex items-center gap-2 mb-2">
                        <Brain className="w-4 h-4 text-blue-600" />
                        <strong className="font-mono text-blue-800">
                          θ<sub>i</sub>
                        </strong>
                      </div>
                      <p className="text-black font-mono text-sm">
                        baseline proficiency of student <em>i</em>
                      </p>
                    </div>

                    <div className="border-2 border-gray-600 rounded-lg p-4 bg-gray-50">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-4 h-4 text-gray-600" />
                        <strong className="font-mono text-gray-800">
                          q<sub>jk</sub>
                        </strong>
                      </div>
                      <p className="text-black font-mono text-sm">
                        binary indicator: 1 if item <em>j</em> requires skill{" "}
                        <em>k</em>, 0 otherwise (from the Q-matrix)
                      </p>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div className="border-2 border-purple-600 rounded-lg p-4 bg-purple-50">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-4 h-4 bg-purple-600 rounded-full"></div>
                        <strong className="font-mono text-purple-800">
                          β<sub>k</sub>
                        </strong>
                      </div>
                      <p className="text-black font-mono text-sm">
                        difficulty parameter for skill <em>k</em> (negative
                        values = harder skills)
                      </p>
                    </div>

                    <div className="border-2 border-green-600 rounded-lg p-4 bg-green-50">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <strong className="font-mono text-green-800">
                          γ<sub>k</sub>
                        </strong>
                      </div>
                      <p className="text-black font-mono text-sm">
                        learning rate parameter for skill <em>k</em>
                      </p>
                    </div>

                    <div className="border-2 border-orange-600 rounded-lg p-4 bg-orange-50">
                      <div className="flex items-center gap-2 mb-2">
                        <Play className="w-4 h-4 text-orange-600" />
                        <strong className="font-mono text-orange-800">
                          T<sub>ik</sub>
                        </strong>
                      </div>
                      <p className="text-black font-mono text-sm">
                        number of opportunities student <em>i</em> has had to
                        practice skill <em>k</em>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* New Q-matrix explanation */}
              <div
                onClick={() => setShowQMatrix(true)}
                className="border-4 border-orange-600 rounded-xl p-6 bg-orange-50 shadow-lg cursor-pointer hover:shadow-2xl hover:border-orange-700 hover:bg-orange-100 transition-all duration-300 transform hover:scale-[1.02]"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-6 h-6 text-orange-600" />
                  <span className="font-bold text-xl text-orange-800 tracking-tight">
                    THE Q-MATRIX: MAPPING TASKS TO SKILLS (Click this box for
                    Details)
                  </span>
                </div>
                <div className="space-y-4">
                  <p className="text-black font-mono text-sm leading-relaxed">
                    The{" "}
                    <strong>
                      q<sub>jk</sub>
                    </strong>{" "}
                    parameter comes from the <strong>Q-matrix</strong>, which
                    specifies which skills (knowledge components) are required
                    for each task.
                  </p>
                  <div className="bg-white border-2 border-orange-400 rounded-lg p-4">
                    <div className="font-bold text-orange-800 mb-2">
                      Important: Tasks Usually Involve Multiple Skills
                    </div>
                    <p className="text-black font-mono text-sm">
                      In practice, most educational tasks require{" "}
                      <strong>more than one skill/KC</strong>. For example, a
                      fraction division problem might require: (1) fraction
                      concepts, (2) division operations, and (3) simplification
                      skills. The formula <strong>adds up</strong> the
                      contributions from all required skills.
                    </p>
                  </div>
                  <div className="bg-white border-2 border-orange-400 rounded-lg p-4">
                    <div className="font-bold text-orange-800 mb-2">
                      How q works:
                    </div>
                    <div className="font-mono text-sm space-y-1">
                      <div>
                        • q<sub>jk</sub> = 1 if task j requires skill k
                      </div>
                      <div>
                        • q<sub>jk</sub> = 0 if task j does NOT require skill k
                      </div>
                      <div>
                        • Only skills where q<sub>jk</sub> = 1 get included in
                        the sum
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <button
            onClick={() => scroll(15)}
            className="px-12 py-4 bg-black text-white border-4 border-black rounded-xl hover:bg-white hover:text-black transition-all text-xl font-bold uppercase tracking-wider shadow-lg"
          >
            Continue →
          </button>
        </div>
      </div>

      {showQMatrix && <QMatrixVisualization />}

      {/* Tooltips */}
      {hoveredTerm === "log-odds" && <LogOddsTooltip />}
      {hoveredTerm === "afm-formula" && <AFMFormulaTooltip />}
    </div>
  );
};
