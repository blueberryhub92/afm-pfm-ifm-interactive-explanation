import React, { useState, useEffect } from "react";
import {
  Code,
  Target,
  Zap,
  ArrowRight,
  List,
  Brain,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
} from "lucide-react";
import { trackButtonClick, trackCustomEvent } from "../utils/analytics";
import { startConfetti } from "../utils/confetti";

export const PythonTasksAdvanced = ({ navigate }) => {
  const [startTime] = useState(Date.now());
  const [taskStartTime, setTaskStartTime] = useState(null);
  const [interactionHistory, setInteractionHistory] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [draggedOption, setDraggedOption] = useState(null);
  const [isOverDropZone, setIsOverDropZone] = useState(false);

  // Track component entry
  useEffect(() => {
    trackCustomEvent("advanced_python_tasks_viewed", {
      componentName: "PythonTasksAdvanced",
      elementType: "task_selection",
      viewContext: {
        timestamp: startTime,
        availableTasks: Object.keys(tasks).length,
      },
    });

    return () => {
      // Track component exit
      trackCustomEvent("advanced_python_tasks_exited", {
        componentName: "PythonTasksAdvanced",
        elementType: "task_selection",
        completionMetrics: {
          timeSpent: Date.now() - startTime,
          completedTasks: completedTasks.length,
          totalTasks: Object.keys(tasks).length,
          interactionPattern: summarizeInteractions(interactionHistory),
        },
      });
    };
  }, [completedTasks, interactionHistory]);

  const summarizeInteractions = (interactions) => {
    return {
      totalInteractions: interactions.length,
      taskAttempts: interactions.filter((i) => i.type === "task_attempt")
        .length,
      correctAnswers: interactions.filter((i) => i.type === "correct_answer")
        .length,
      incorrectAnswers: interactions.filter(
        (i) => i.type === "incorrect_answer"
      ).length,
      averageTimePerTask:
        interactions
          .filter((i) => i.type === "task_complete")
          .reduce((sum, i) => sum + i.duration, 0) /
        Math.max(1, completedTasks.length),
      completionSequence: completedTasks,
    };
  };

  const tasks = {
    A: {
      title: "String Formatting",
      description:
        "Format user data into a readable string. Given a user dictionary with name, age, and city, create a formatted introduction string.",
      testCase: {
        input: '{"name": "Alice", "age": 25, "city": "New York"}',
        output: '"Hi, I\'m Alice, 25 years old, from New York!"',
      },
      code: `def format_user_intro(user):
    pass`,
      question: "What would be the correct implementation?",
      options: [
        {
          id: "a",
          text: `return f"Hi, I'm {user['name']}, {user['age']} years old, from {user['city']}!"`,
          correct: true,
        },
        {
          id: "b",
          text: `return "Hi, I'm " + user.name + ", " + user.age + " years old, from " + user.city + "!"`,
          correct: false,
        },
        {
          id: "c",
          text: `return f"Hi, I'm {user.name}, {user.age} years old, from {user.city}!"`,
          correct: false,
        },
        {
          id: "d",
          text: `return "Hi, I'm {}, {} years old, from {}!".format(user['name'], user['age'], user['city'])`,
          correct: false,
        },
      ],
      color: "orange",
      learningRate: "high",
      explanation:
        "String formatting has clear patterns and immediate visual feedback. Each practice attempt builds directly on the previous one.",
    },
    B: {
      title: "Recursive Fibonacci",
      description:
        "Calculate the nth Fibonacci number using recursion. The Fibonacci sequence starts with 0, 1, and each subsequent number is the sum of the two preceding ones.",
      testCase: {
        rules:
          "fibonacci(0) = 0, fibonacci(1) = 1, fibonacci(n) = fibonacci(n-1) + fibonacci(n-2)",
        example: "fibonacci(5) = 5 (sequence: 0,1,1,2,3,5)",
      },
      code: `def fibonacci(n):
    pass`,
      question: "What would be the correct recursive implementation?",
      options: [
        {
          id: "a",
          text: `if n <= 1:
    return n
return fibonacci(n-1) + fibonacci(n-2)`,
          correct: true,
        },
        {
          id: "b",
          text: `if n == 0:
    return 0
elif n == 1:
    return 1
else:
    return fibonacci(n-1) + fibonacci(n+1)`,
          correct: false,
        },
        {
          id: "c",
          text: `if n <= 1:
    return 1
return fibonacci(n-1) + fibonacci(n-2)`,
          correct: false,
        },
        {
          id: "d",
          text: `return fibonacci(n-1) + fibonacci(n-2)`,
          correct: false,
        },
      ],
      color: "orange",
      learningRate: "low",
      explanation:
        "Recursive thinking requires understanding abstract concepts like function calls within functions. Mastery comes slowly even with practice.",
    },
  };

  const handleTaskClick = (taskId) => {
    const task = tasks[taskId];

    trackButtonClick("advanced_python_task_selected", {
      componentName: "PythonTasksAdvanced",
      elementType: "button",
      elementLocation: "task_selection",
      selectionContext: {
        taskId,
        taskTitle: task.title,
        taskType: task.color,
        learningRate: task.learningRate,
        isCompleted: completedTasks.includes(taskId),
        previousTask: selectedTask,
        timeFromStart: Date.now() - startTime,
      },
    });

    setSelectedTask(taskId);
    setSelectedAnswer(null);
    setShowResult(false);
    setTaskStartTime(Date.now());

    setInteractionHistory((prev) => [
      ...prev,
      {
        type: "task_attempt",
        taskId,
        timestamp: Date.now(),
      },
    ]);
  };

  const handleDragStart = (e, optionId) => {
    setDraggedOption(optionId);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setIsOverDropZone(true);
  };

  const handleDragLeave = () => {
    setIsOverDropZone(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsOverDropZone(false);

    if (draggedOption && !showResult) {
      setSelectedAnswer(draggedOption);
    }
    setDraggedOption(null);
  };

  const handleAnswerSelect = (answerId) => {
    const task = tasks[selectedTask];
    const selectedOption = task.options.find((opt) => opt.id === answerId);
    const isCorrect = selectedOption?.correct;

    trackCustomEvent("advanced_python_task_answer", {
      componentName: "PythonTasksAdvanced",
      elementType: "task",
      answerContext: {
        taskId: selectedTask,
        taskTitle: task.title,
        answerId,
        isCorrect,
        timeToAnswer: Date.now() - taskStartTime,
        learningRate: task.learningRate,
        previousAttempts: interactionHistory.filter(
          (i) => i.type === "task_attempt" && i.taskId === selectedTask
        ).length,
      },
    });

    setSelectedAnswer(answerId);
    setShowResult(true);

    setInteractionHistory((prev) => [
      ...prev,
      {
        type: isCorrect ? "correct_answer" : "incorrect_answer",
        taskId: selectedTask,
        answerId,
        timestamp: Date.now(),
      },
    ]);

    // Mark task as completed if answer is correct
    if (isCorrect && !completedTasks.includes(selectedTask)) {
      trackCustomEvent("advanced_python_task_completed", {
        componentName: "PythonTasksAdvanced",
        elementType: "task",
        completionContext: {
          taskId: selectedTask,
          taskTitle: task.title,
          timeToComplete: Date.now() - taskStartTime,
          learningRate: task.learningRate,
          isFirstCompletion: true,
          totalCompleted: completedTasks.length + 1,
        },
      });

      setCompletedTasks([...completedTasks, selectedTask]);
      setInteractionHistory((prev) => [
        ...prev,
        {
          type: "task_complete",
          taskId: selectedTask,
          timestamp: Date.now(),
          duration: Date.now() - taskStartTime,
        },
      ]);

      // Trigger confetti for correct answer
      startConfetti(3000);
    }
  };

  const resetTask = () => {
    trackButtonClick("advanced_python_task_reset", {
      componentName: "PythonTasksAdvanced",
      elementType: "button",
      elementLocation: "task_navigation",
      resetContext: {
        taskId: selectedTask,
        wasCompleted: completedTasks.includes(selectedTask),
        timeSpent: Date.now() - taskStartTime,
        learningRate: tasks[selectedTask]?.learningRate,
      },
    });

    setSelectedTask(null);
    setSelectedAnswer(null);
    setShowResult(false);
    setTaskStartTime(null);
    setDraggedOption(null);
    setIsOverDropZone(false);

    setInteractionHistory((prev) => [
      ...prev,
      {
        type: "task_reset",
        taskId: selectedTask,
        timestamp: Date.now(),
      },
    ]);
  };

  const handleContinue = () => {
    trackButtonClick("advanced_python_tasks_continue", {
      componentName: "PythonTasksAdvanced",
      elementType: "button",
      elementLocation: "section_navigation",
      navigationContext: {
        completedTasks: completedTasks.length,
        totalTasks: Object.keys(tasks).length,
        timeSpent: Date.now() - startTime,
        interactionSummary: summarizeInteractions(interactionHistory),
        learningRateComparison: {
          highRateCompleted: completedTasks.includes("A"),
          lowRateCompleted: completedTasks.includes("B"),
        },
      },
    });

    navigate(12);
  };

  // Color classes matching AFMLimitations style
  const colorClasses = {
    green: "bg-green-100 border-green-600 text-green-700",
    orange: "bg-orange-100 border-orange-600 text-orange-700",
  };

  // Task Detail View
  if (selectedTask) {
    const task = tasks[selectedTask];
    const IconComponent = task.learningRate === "high" ? TrendingUp : Clock;
    const correctAnswer = task.options.find((opt) => opt.correct);
    const selectedOption = task.options.find(
      (opt) => opt.id === selectedAnswer
    );

    return (
      <div className="bg-white min-h-screen flex flex-col text-black font-['IBM_Plex_Mono',monospace] py-8 px-4 md:px-10">
        <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">
          {/* Header */}
          <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative">
            <div
              className={`absolute -top-6 left-4 px-3 py-1 font-semibold rounded-md text-xs tracking-wider flex items-center gap-2 border-4 border-black ${
                colorClasses[task.color]
              }`}
            >
              <Target className="w-4 h-4" />
              TASK {selectedTask} OF 2
            </div>
            <div className="text-2xl md:text-3xl font-bold tracking-tight text-black text-center">
              {task.title}
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Instructions */}
            <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg">
              <div className="space-y-6">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <IconComponent className="w-6 h-6 text-black" />
                  <h3 className="text-xl font-bold text-black uppercase tracking-tight">
                    Instructions
                  </h3>
                </div>

                <p className="text-black font-bold text-lg mb-6">
                  {task.description}
                </p>

                <div
                  className={`bg-black text-green-400 p-6 rounded-lg font-mono text-sm border-4 shadow-lg transition-all ${
                    isOverDropZone && !showResult
                      ? "border-yellow-400 shadow-yellow-400/50 scale-105"
                      : "border-gray-600"
                  }`}
                  onDragOver={!showResult ? handleDragOver : undefined}
                  onDragLeave={!showResult ? handleDragLeave : undefined}
                  onDrop={!showResult ? handleDrop : undefined}
                >
                  <div className="flex items-center gap-2 mb-3 text-gray-400">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="ml-2 text-xs">code_editor.py</span>
                  </div>
                  <pre className="text-white whitespace-pre-wrap leading-relaxed">
                    {task.code.split("pass")[0]}
                    {!showResult && !selectedAnswer && (
                      <span className="text-yellow-400 border-2 border-dashed border-yellow-400/50 rounded px-2 py-1 bg-yellow-400/10">
                        Drag & Drop your answer here
                      </span>
                    )}
                    {selectedAnswer && (
                      <span className="text-cyan-400">
                        {
                          task.options.find((opt) => opt.id === selectedAnswer)
                            ?.text
                        }
                      </span>
                    )}
                    {!selectedAnswer && showResult && (
                      <span className="text-white">pass</span>
                    )}
                  </pre>
                </div>

                {/* Test Cases */}
                <div className="bg-blue-50 border-4 border-blue-600 rounded-xl p-6">
                  <h4 className="text-blue-800 font-bold text-lg mb-4 uppercase tracking-tight">
                    Test Case
                  </h4>
                  {task.testCase.input && (
                    <div className="space-y-2">
                      <div className="flex flex-col gap-2">
                        <span className="text-blue-700 font-bold">Input:</span>
                        <code className="bg-blue-100 px-2 py-1 rounded text-blue-800 font-mono text-sm break-all overflow-wrap-anywhere">
                          format_user_intro({task.testCase.input})
                        </code>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-blue-700 font-bold">Output:</span>
                        <code className="bg-blue-100 px-2 py-1 rounded text-blue-800 font-mono text-sm break-all overflow-wrap-anywhere">
                          {task.testCase.output}
                        </code>
                      </div>
                    </div>
                  )}
                  {task.testCase.rules && (
                    <div className="space-y-2">
                      <div>
                        <span className="text-blue-700 font-bold">Rules:</span>
                        <div className="bg-blue-100 p-3 rounded mt-2 overflow-hidden">
                          <code className="text-blue-800 font-mono text-sm break-all overflow-wrap-anywhere whitespace-pre-wrap">
                            {task.testCase.rules}
                          </code>
                        </div>
                      </div>
                      <div>
                        <span className="text-blue-700 font-bold">
                          Example:
                        </span>
                        <div className="bg-blue-100 p-3 rounded mt-2 overflow-hidden">
                          <code className="text-blue-800 font-mono text-sm break-all overflow-wrap-anywhere whitespace-pre-wrap">
                            {task.testCase.example}
                          </code>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Solutions */}
            <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg">
              <h3 className="text-xl font-bold mb-6 text-black uppercase tracking-tight">
                {showResult
                  ? task.question
                  : "Drag one of these solutions into the code editor"}
              </h3>

              <div className="space-y-4">
                {task.options.map((option) => (
                  <div
                    key={option.id}
                    draggable={!showResult}
                    onDragStart={(e) => handleDragStart(e, option.id)}
                    onClick={() => !showResult && setSelectedAnswer(option.id)}
                    className={`w-full text-left p-4 rounded-lg border-4 border-black transition-all ${
                      showResult
                        ? option.correct
                          ? "bg-green-100 border-green-600"
                          : option.id === selectedAnswer
                          ? "bg-red-100 border-red-600"
                          : "bg-gray-50"
                        : selectedAnswer === option.id
                        ? colorClasses[task.color]
                        : draggedOption === option.id
                        ? "bg-yellow-100 opacity-50 scale-95"
                        : "bg-gray-50 hover:bg-gray-100"
                    } ${
                      !showResult
                        ? "cursor-grab active:cursor-grabbing hover:scale-105 transition-transform"
                        : "cursor-default"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 border-black ${
                          showResult
                            ? option.correct
                              ? "bg-green-600 text-white"
                              : option.id === selectedAnswer
                              ? "bg-red-600 text-white"
                              : "bg-gray-300 text-gray-600"
                            : "bg-black text-white"
                        }`}
                      >
                        {option.id.toUpperCase()}
                      </div>
                      <pre className="text-sm font-mono text-black whitespace-pre-wrap flex-1 font-bold">
                        {option.text}
                      </pre>
                      {showResult && option.correct && (
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      )}
                      {showResult &&
                        !option.correct &&
                        option.id === selectedAnswer && (
                          <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                        )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Submit Button */}
              {selectedAnswer && !showResult && (
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={() => handleAnswerSelect(selectedAnswer)}
                    className="px-8 py-4 bg-blue-600 text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-blue-700 transition-all transform hover:scale-105 flex items-center gap-2"
                  >
                    <CheckCircle className="w-6 h-6" />
                    Submit Solution
                  </button>
                </div>
              )}

              {/* Result */}
              {showResult && (
                <div
                  className={`mt-8 p-6 rounded-xl border-4 border-black shadow-lg ${
                    selectedOption?.correct ? "bg-green-100" : "bg-red-100"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {selectedOption?.correct ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-600" />
                    )}
                    <span
                      className={`font-bold text-lg uppercase tracking-wide ${
                        selectedOption?.correct
                          ? "text-green-700"
                          : "text-red-700"
                      }`}
                    >
                      {selectedOption?.correct ? "Correct!" : "Incorrect"}
                    </span>
                  </div>
                  {!selectedOption?.correct && (
                    <p className="text-black font-bold">
                      The correct answer is option{" "}
                      {correctAnswer.id.toUpperCase()}.
                      {selectedTask === "A" &&
                        " F-string formatting with dictionary key access is the most readable and efficient approach."}
                      {selectedTask === "B" &&
                        " Recursive functions need base cases (n <= 1) and must call themselves with smaller values (n-1, n-2)."}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Back Button */}
          <div className="flex justify-center">
            <button
              onClick={resetTask}
              className="px-8 py-4 bg-black text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-black transition-all transform hover:scale-105"
            >
              ← Back to Tasks
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main Task Selection View
  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center text-black font-['IBM_Plex_Mono',monospace] py-8 px-4 md:px-10">
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-8">
        {/* Header */}
        <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative">
          <div className="absolute -top-6 left-4 px-3 py-1 bg-black text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
            <Brain className="w-4 h-4" />
            LEARNING RATE COMPARISON
          </div>
          <div className="text-2xl md:text-3xl font-bold tracking-tight text-black text-center">
            Which task has a faster learning rate?
          </div>
          <p className="text-lg text-black text-center mt-4 font-bold">
            Choose a task to practice and see how learning rate affects skill
            acquisition.
          </p>
          <p className="text-md text-black text-center mt-2 font-bold">
            Learning rate measures how quickly someone improves with practice.
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="border-4 border-black rounded-xl p-4 bg-yellow-400 text-center">
          <span className="text-black font-bold text-xl uppercase tracking-wide">
            {completedTasks.length} / 2 TASKS COMPLETE
          </span>
          {completedTasks.length === 2 && (
            <div className="mt-2 text-black font-bold text-lg">
              ALL TASKS COMPLETED!
            </div>
          )}
        </div>

        {/* Task Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {Object.entries(tasks).map(([taskId, task]) => {
            const IconComponent =
              task.learningRate === "high" ? TrendingUp : Clock;
            const learningRateColor =
              task.learningRate === "high"
                ? "bg-blue-100 border-blue-600 text-blue-700"
                : "bg-red-100 border-red-600 text-red-700";
            const isCompleted = completedTasks.includes(taskId);

            return (
              <div
                key={taskId}
                className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl hover:-translate-y-2"
                onClick={() => handleTaskClick(taskId)}
              >
                <div
                  className={`absolute -top-6 left-4 px-3 py-1 font-semibold rounded-md text-xs tracking-wider flex items-center gap-2 border-4 border-black ${
                    colorClasses[task.color]
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  TASK
                </div>

                <div className="text-center space-y-6">
                  <div className="flex items-center justify-center space-x-4">
                    <h3 className="text-2xl font-bold text-black uppercase tracking-tight">
                      {task.title}
                    </h3>
                    {isCompleted && (
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    )}
                  </div>

                  {/* Task Description */}
                  <div className="text-left space-y-4">
                    <p className="text-black font-bold text-md">
                      {task.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center mt-12">
        <button
          onClick={handleContinue}
          className="px-12 py-4 bg-green-600 text-white border-4 border-black rounded-xl font-bold text-xl uppercase tracking-wide hover:bg-white hover:text-green-600 hover:border-green-600 transition-all transform hover:scale-105 flex items-center gap-3"
        >
          <span>Continue to Next Section</span>
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
