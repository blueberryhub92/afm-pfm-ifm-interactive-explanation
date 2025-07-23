import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Play, Pause, RotateCcw, Brain, Target, TrendingUp, Code, AlertCircle, ArrowRight, Lightbulb, Zap, Clock } from 'lucide-react';

export const LearningRateExplanation = ({ navigate }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentSimulation, setCurrentSimulation] = useState('learning-rate');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTry, setCurrentTry] = useState(0);
  const [data, setData] = useState([]);

  // Simulation parameters
  const learningRateSimulation = {
    title: "Learning Rate Analysis",
    subtitle: "UNIFORM TASK COMPLEXITY • VARIABLE LEARNING COEFFICIENTS",
    tasks: [
      {
        name: "TASKS WITH FAST LEARNING RATE",
        difficulty: -0.5,
        learningRate: 0.8,
        color: "#2563eb",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-400",
        textColor: "text-blue-800",
        description: "CLEAR PATTERNS • IMMEDIATE FEEDBACK • RAPID CONVERGENCE"
      },
      {
        name: "TASKS WITH SLOW LEARNING RATE",
        difficulty: -0.5,
        learningRate: 0.2,
        color: "#dc2626",
        bgColor: "bg-red-50",
        borderColor: "border-red-400",
        textColor: "text-red-800",
        description: "ABSTRACT CONCEPTS • DELAYED UNDERSTANDING • GRADUAL PROGRESS"
      }
    ]
  };

  const taskDifficultySimulation = {
    title: "Skill Difficulty Analysis",
    subtitle: "UNIFORM LEARNING RATES • VARIABLE TASK COMPLEXITY",
    tasks: [
      {
        name: "EASY TASKS",
        difficulty: 0.5,
        learningRate: 0.4,
        color: "#059669",
        bgColor: "bg-emerald-50",
        borderColor: "border-emerald-400",
        textColor: "text-emerald-800",
        description: "SIMPLE SYNTAX • BASIC CONCEPTS • LOW COMPLEXITY"
      },
      {
        name: "HARD TASKS",
        difficulty: -1.0,
        learningRate: 0.4,
        color: "#7c2d12",
        bgColor: "bg-orange-50",
        borderColor: "border-orange-400",
        textColor: "text-orange-800",
        description: "COMPLEX LOGIC • ADVANCED CONCEPTS • HIGH COMPLEXITY"
      }
    ]
  };

  const currentSim = currentSimulation === 'learning-rate' ? learningRateSimulation : taskDifficultySimulation;
  const studentAbility = 0.3;

  // AFM Formula: P(success) = θ_i + β_k + γ_k * T_ik
  const calculateSuccessProbability = (task, tryNumber) => {
    const logit = studentAbility + task.difficulty + (task.learningRate * tryNumber);
    return 1 / (1 + Math.exp(-logit));
  };

  const generateData = () => {
    const newData = [];
    const maxTries = 10;

    for (let tryNum = 0; tryNum <= maxTries; tryNum++) {
      const dataPoint = { try: tryNum };

      currentSim.tasks.forEach((task, index) => {
        const probability = calculateSuccessProbability(task, tryNum);
        dataPoint[`task${index}`] = Math.round(probability * 100);
      });

      newData.push(dataPoint);
    }

    return newData;
  };

  const reset = () => {
    setIsPlaying(false);
    setCurrentTry(0);
    setData([]);
  };

  const step = () => {
    if (currentTry < 10) {
      const newTry = currentTry + 1;
      setCurrentTry(newTry);

      const newData = generateData().slice(0, newTry + 1);
      setData(newData);
    }
  };

  useEffect(() => {
    if (isPlaying && currentTry < 10) {
      const timer = setTimeout(step, 800);
      return () => clearTimeout(timer);
    } else if (currentTry >= 10) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentTry]);

  useEffect(() => {
    reset();
  }, [currentSimulation]);

  const getCurrentTaskExample = () => {
    // Fast Learning Rate Tasks (all STRING FORMATTING concept, different examples)
    const fastLearningTasks = [
      {
        code: `# ITERATION ${currentTry}: STRING FORMATTING - BASIC
user_name = "Alice"
user_age = 25
full_info = f"{user_name} is {user_age} years old"
print(full_info)`,
        success: currentTry >= 1,
        concept: "STRING FORMATTING"
      },
      {
        code: `# ITERATION ${currentTry}: STRING FORMATTING - ADVANCED
def format_user_intro(user):
    # Create formatted introduction
    return f"Hi, I'm {user['name']}, {user['age']} years old, from {user['city']}!"

user = {"name": "Alice", "age": 25, "city": "New York"}
print(format_user_intro(user))`,
        success: currentTry >= 2,
        concept: "STRING FORMATTING"
      },
      {
        code: `# ITERATION ${currentTry}: STRING FORMATTING - NUMERIC
price = 24.99
tax_rate = 0.08
total = price * (1 + tax_rate)
print(f"Price: \${price:.2f}")
print(f"Total with tax: \${total:.2f}")`,
        success: currentTry >= 3,
        concept: "STRING FORMATTING"
      },
      {
        code: `# ITERATION ${currentTry}: STRING FORMATTING - ALIGNMENT
items = [("Apple", 1.50), ("Banana", 0.75), ("Orange", 2.00)]
print("RECEIPT")
print("-" * 20)
for item, price in items:
    print(f"{item:<10} \${price:>6.2f}")`,
        success: currentTry >= 4,
        concept: "STRING FORMATTING"
      },
      {
        code: `# ITERATION ${currentTry}: STRING FORMATTING - CONDITIONALS
def grade_message(name, score):
    if score >= 90:
        return f"Excellent work, {name}! You scored {score}% - Grade: A"
    elif score >= 80:
        return f"Good job, {name}! You scored {score}% - Grade: B"
    else:
        return f"Keep practicing, {name}. You scored {score}% - Grade: C"

print(grade_message("Bob", 85))`,
        success: currentTry >= 5,
        concept: "STRING FORMATTING"
      },
      {
        code: `# ITERATION ${currentTry}: STRING FORMATTING - DATETIME
from datetime import datetime
now = datetime.now()
birthday = datetime(1995, 6, 15)
age = now.year - birthday.year

print(f"Today is {now.strftime('%B %d, %Y')}")
print(f"You are {age} years old")
print(f"Born on {birthday.strftime('%A, %B %d, %Y')}")`,
        success: currentTry >= 6,
        concept: "STRING FORMATTING"
      },
      {
        code: `# ITERATION ${currentTry}: STRING FORMATTING - TABLES
students = [
    {"name": "Alice", "math": 95, "eng": 87},
    {"name": "Bob", "math": 78, "eng": 92},
    {"name": "Carol", "math": 88, "eng": 90}
]

print(f"{'Name':<8} {'Math':<6} {'English':<8} {'Average':<8}")
print("-" * 32)
for student in students:
    avg = (student['math'] + student['eng']) / 2
    print(f"{student['name']:<8} {student['math']:<6} {student['eng']:<8} {avg:<8.1f}")`,
        success: currentTry >= 7,
        concept: "STRING FORMATTING"
      },
      {
        code: `# ITERATION ${currentTry}: STRING FORMATTING - MULTILINE
def create_report(name, department, hours, rate):
    report = f"""
    EMPLOYEE REPORT
    {'='*20}
    Name: {name}
    Department: {department}
    Hours Worked: {hours}
    Hourly Rate: \${rate:.2f}
    Total Pay: \${hours * rate:.2f}
    {'='*20}
    """
    return report

print(create_report("John Doe", "Engineering", 40, 25.50))`,
        success: currentTry >= 8,
        concept: "STRING FORMATTING"
      },
      {
        code: `# ITERATION ${currentTry}: STRING FORMATTING - VALIDATION
def format_phone_number(phone):
    # Remove all non-digit characters
    digits = ''.join(filter(str.isdigit, phone))
    
    if len(digits) == 10:
        return f"({digits[:3]}) {digits[3:6]}-{digits[6:]}"
    elif len(digits) == 11 and digits[0] == '1':
        return f"+1 ({digits[1:4]}) {digits[4:7]}-{digits[7:]}"
    else:
        return f"Invalid phone number: {phone}"

print(format_phone_number("5551234567"))
print(format_phone_number("15551234567"))`,
        success: currentTry >= 9,
        concept: "STRING FORMATTING"
      },
      {
        code: `# ITERATION ${currentTry}: STRING FORMATTING - DYNAMIC
def create_progress_bar(current, total, width=20):
    percentage = current / total
    filled = int(width * percentage)
    bar = '█' * filled + '░' * (width - filled)
    
    return f"Progress: [{bar}] {percentage*100:.1f}% ({current}/{total})"

for i in range(0, 101, 25):
    print(create_progress_bar(i, 100))`,
        success: currentTry >= 10,
        concept: "STRING FORMATTING"
      }
    ];

    // Slow Learning Rate Tasks (all RECURSION concept, different examples)
    const slowLearningTasks = [
      {
        code: `# ITERATION ${currentTry}: RECURSION - COUNTDOWN
def countdown(n):
    # Base case
    if n <= 0:
        print("Done!")
        return
    # Recursive case
    print(n)
    countdown(n - 1)

countdown(3)`,
        success: currentTry >= 4,
        concept: "RECURSION"
      },
      {
        code: `# ITERATION ${currentTry}: RECURSION - FACTORIAL
def factorial(n):
    # Base case
    if n <= 1:
        return 1
    # Recursive case: n! = n * (n-1)!
    return n * factorial(n - 1)

for i in range(5):
    print(f"{i}! = {factorial(i)}")`,
        success: currentTry >= 6,
        concept: "RECURSION"
      },
      {
        code: `# ITERATION ${currentTry}: RECURSION - FIBONACCI
def fibonacci(n):
    # Base cases
    if n <= 1:
        return n
    # Recursive case: f(n) = f(n-1) + f(n-2)
    return fibonacci(n-1) + fibonacci(n-2)

for i in range(7):
    print(f"fibonacci({i}) = {fibonacci(i)}")`,
        success: currentTry >= 7,
        concept: "RECURSION"
      },
      {
        code: `# ITERATION ${currentTry}: RECURSION - SUM OF DIGITS
def sum_of_digits(n):
    # Base case
    if n < 10:
        return n
    # Recursive case: sum last digit + sum of remaining digits
    return (n % 10) + sum_of_digits(n // 10)

numbers = [123, 456, 789]
for num in numbers:
    print(f"Sum of digits in {num}: {sum_of_digits(num)}")`,
        success: currentTry >= 8,
        concept: "RECURSION"
      },
      {
        code: `# ITERATION ${currentTry}: RECURSION - POWER CALCULATION
def power(base, exponent):
    # Base case
    if exponent == 0:
        return 1
    # Recursive case: base^exp = base * base^(exp-1)
    return base * power(base, exponent - 1)

tests = [(2, 3), (5, 2), (3, 4)]
for base, exp in tests:
    print(f"{base}^{exp} = {power(base, exp)}")`,
        success: currentTry >= 9,
        concept: "RECURSION"
      },
      {
        code: `# ITERATION ${currentTry}: RECURSION - PALINDROME CHECK
def is_palindrome(s):
    # Base case: empty string or single character
    if len(s) <= 1:
        return True
    # Recursive case: check first/last chars and recurse on middle
    return s[0] == s[-1] and is_palindrome(s[1:-1])

words = ["racecar", "hello", "level", "python"]
for word in words:
    print(f"'{word}' is palindrome: {is_palindrome(word)}")`,
        success: currentTry >= 10,
        concept: "RECURSION"
      },
      {
        code: `# ITERATION ${currentTry}: RECURSION - GCD (EUCLIDEAN)
def gcd(a, b):
    # Base case: when b is 0, gcd is a
    if b == 0:
        return a
    # Recursive case: gcd(a, b) = gcd(b, a % b)
    return gcd(b, a % b)

pairs = [(48, 18), (100, 75), (17, 13)]
for x, y in pairs:
    print(f"gcd({x}, {y}) = {gcd(x, y)}")`,
        success: currentTry >= 11,
        concept: "RECURSION"
      },
      {
        code: `# ITERATION ${currentTry}: RECURSION - BINARY SEARCH
def binary_search(arr, target, left=0, right=None):
    if right is None:
        right = len(arr) - 1
    
    # Base case: not found
    if left > right:
        return -1
    
    mid = (left + right) // 2
    
    # Base case: found
    if arr[mid] == target:
        return mid
    # Recursive cases
    elif arr[mid] > target:
        return binary_search(arr, target, left, mid - 1)
    else:
        return binary_search(arr, target, mid + 1, right)

numbers = [1, 3, 5, 7, 9, 11, 13, 15]
target = 7
result = binary_search(numbers, target)
print(f"Found {target} at index: {result}")`,
        success: currentTry >= 12,
        concept: "RECURSION"
      },
      {
        code: `# ITERATION ${currentTry}: RECURSION - TREE TRAVERSAL
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def inorder_traversal(root):
    if root is None:
        return []
    # Recursive case: left subtree, root, right subtree
    return (inorder_traversal(root.left) + 
            [root.val] + 
            inorder_traversal(root.right))

# Build tree: 1-2-3
root = TreeNode(2, TreeNode(1), TreeNode(3))
print(f"Inorder traversal: {inorder_traversal(root)}")`,
        success: currentTry >= 13,
        concept: "RECURSION"
      },
      {
        code: `# ITERATION ${currentTry}: RECURSION - PERMUTATIONS
def permutations(arr):
    # Base case: empty or single element
    if len(arr) <= 1:
        return [arr]
    
    result = []
    for i in range(len(arr)):
        # Choose current element as first
        first = arr[i]
        rest = arr[:i] + arr[i+1:]
        
        # Recursively get permutations of rest
        for perm in permutations(rest):
            result.append([first] + perm)
    
    return result

letters = ['A', 'B', 'C']
perms = permutations(letters)
print(f"Permutations of {letters}:")
for perm in perms:
    print(perm)`,
        success: currentTry >= 14,
        concept: "RECURSION"
      }
    ];

    if (currentSimulation === 'learning-rate') {
      // Get the appropriate task for the current iteration
      const fastTask = fastLearningTasks[Math.min(currentTry, fastLearningTasks.length - 1)];
      const slowTask = slowLearningTasks[Math.min(currentTry, slowLearningTasks.length - 1)];

      return {
        0: {
          code: fastTask.code,
          result: fastTask.success ? `SUCCESS: ${fastTask.concept} MASTERED` : `ERROR: ${fastTask.concept} INCOMPLETE`,
          concept: fastTask.concept
        },
        1: {
          code: slowTask.code,
          result: slowTask.success ? `SUCCESS: ${slowTask.concept} MASTERED` : `ERROR: ${slowTask.concept} INCOMPLETE`,
          concept: slowTask.concept
        }
      };
    } else {
      // Skill Difficulty Simulation - Same concept type but different difficulty levels
      const easyTasks = [
        {
          code: `# ITERATION ${currentTry}: SIMPLE ARITHMETIC - BASIC ADDITION
a = 5
b = 3
result = a + b
print(f"{a} + {b} = {result}")`,
          success: currentTry >= 1,
          concept: "SIMPLE ARITHMETIC"
        },
        {
          code: `# ITERATION ${currentTry}: SIMPLE ARITHMETIC - BASIC SUBTRACTION
x = 10
y = 4
difference = x - y
print(f"{x} - {y} = {difference}")`,
          success: currentTry >= 2,
          concept: "SIMPLE ARITHMETIC"
        },
        {
          code: `# ITERATION ${currentTry}: SIMPLE ARITHMETIC - BASIC MULTIPLICATION
length = 6
width = 4
area = length * width
print(f"Area: {length} × {width} = {area}")`,
          success: currentTry >= 3,
          concept: "SIMPLE ARITHMETIC"
        },
        {
          code: `# ITERATION ${currentTry}: SIMPLE ARITHMETIC - BASIC DIVISION
total = 20
people = 4
per_person = total / people
print(f"{total} ÷ {people} = {per_person}")`,
          success: currentTry >= 4,
          concept: "SIMPLE ARITHMETIC"
        },
        {
          code: `# ITERATION ${currentTry}: SIMPLE ARITHMETIC - SIMPLE PERCENTAGES
score = 85
total_points = 100
percentage = (score / total_points) * 100
print(f"Score: {score}/{total_points} = {percentage}%")`,
          success: currentTry >= 5,
          concept: "SIMPLE ARITHMETIC"
        },
        {
          code: `# ITERATION ${currentTry}: SIMPLE ARITHMETIC - BASIC AVERAGES
grade1 = 80
grade2 = 90
grade3 = 85
average = (grade1 + grade2 + grade3) / 3
print(f"Average: ({grade1} + {grade2} + {grade3}) ÷ 3 = {average:.1f}")`,
          success: currentTry >= 6,
          concept: "SIMPLE ARITHMETIC"
        },
        {
          code: `# ITERATION ${currentTry}: SIMPLE ARITHMETIC - BASIC POWERS
base = 2
exponent = 3
result = base ** exponent
print(f"{base}^{exponent} = {result}")`,
          success: currentTry >= 7,
          concept: "SIMPLE ARITHMETIC"
        },
        {
          code: `# ITERATION ${currentTry}: SIMPLE ARITHMETIC - SIMPLE REMAINDERS
dividend = 17
divisor = 5
quotient = dividend // divisor
remainder = dividend % divisor
print(f"{dividend} ÷ {divisor} = {quotient} remainder {remainder}")`,
          success: currentTry >= 8,
          concept: "SIMPLE ARITHMETIC"
        },
        {
          code: `# ITERATION ${currentTry}: SIMPLE ARITHMETIC - BASIC ROUNDING
price = 12.456
rounded_price = round(price, 2)
print(f"Original: \${price}")
print(f"Rounded: \${rounded_price}")`,
          success: currentTry >= 9,
          concept: "SIMPLE ARITHMETIC"
        },
        {
          code: `# ITERATION ${currentTry}: SIMPLE ARITHMETIC - SIMPLE COMPARISONS
num1 = 15
num2 = 12
larger = max(num1, num2)
smaller = min(num1, num2)
print(f"Larger: {larger}")
print(f"Smaller: {smaller}")`,
          success: currentTry >= 10,
          concept: "SIMPLE ARITHMETIC"
        }
      ];

      const hardTasks = [
        {
          code: `# ITERATION ${currentTry}: COMPLEX ARITHMETIC - COMPOUND INTEREST
principal = 1000
rate = 0.05
time = 3
compounds_per_year = 4

# A = P(1 + r/n)^(nt)
amount = principal * (1 + rate/compounds_per_year) ** (compounds_per_year * time)
interest = amount - principal

print(f"Principal: \${principal}")
print(f"Final amount: \${amount:.2f}")
print(f"Interest earned: \${interest:.2f}")`,
          success: currentTry >= 7,
          concept: "COMPLEX ARITHMETIC"
        },
        {
          code: `# ITERATION ${currentTry}: COMPLEX ARITHMETIC - QUADRATIC FORMULA
import math

# ax² + bx + c = 0
a = 1
b = -5
c = 6

discriminant = b**2 - 4*a*c
sqrt_discriminant = math.sqrt(discriminant)

x1 = (-b + sqrt_discriminant) / (2*a)
x2 = (-b - sqrt_discriminant) / (2*a)

print(f"Equation: {a}x² + ({b})x + {c} = 0")
print(f"Solutions: x₁ = {x1}, x₂ = {x2}")`,
          success: currentTry >= 8,
          concept: "COMPLEX ARITHMETIC"
        },
        {
          code: `# ITERATION ${currentTry}: COMPLEX ARITHMETIC - STATISTICS WITH VARIANCE
import math

data = [85, 92, 78, 96, 88, 75, 91, 83, 89, 94]
n = len(data)

# Calculate mean
mean = sum(data) / n

# Calculate variance
variance = sum((x - mean)**2 for x in data) / n
std_dev = math.sqrt(variance)

print(f"Data: {data}")
print(f"Mean: {mean:.2f}")
print(f"Variance: {variance:.2f}")
print(f"Standard Deviation: {std_dev:.2f}")`,
          success: currentTry >= 9,
          concept: "COMPLEX ARITHMETIC"
        },
        {
          code: `# ITERATION ${currentTry}: COMPLEX ARITHMETIC - TRIGONOMETRIC CALCULATIONS
import math

# Calculate triangle properties
side_a = 5
side_b = 7
angle_c_degrees = 60

# Convert to radians
angle_c_radians = math.radians(angle_c_degrees)

# Law of cosines: c² = a² + b² - 2ab*cos(C)
side_c_squared = side_a**2 + side_b**2 - 2*side_a*side_b*math.cos(angle_c_radians)
side_c = math.sqrt(side_c_squared)

# Calculate area using Heron's formula
s = (side_a + side_b + side_c) / 2
area = math.sqrt(s * (s - side_a) * (s - side_b) * (s - side_c))

print(f"Triangle sides: a={side_a}, b={side_b}, c={side_c:.2f}")
print(f"Area: {area:.2f}")`,
          success: currentTry >= 10,
          concept: "COMPLEX ARITHMETIC"
        },
        {
          code: `# ITERATION ${currentTry}: COMPLEX ARITHMETIC - FINANCIAL CALCULATIONS
# Calculate loan payment using amortization formula
loan_amount = 250000
annual_rate = 0.045
years = 30

monthly_rate = annual_rate / 12
num_payments = years * 12

# PMT = L[c(1 + c)^n]/[(1 + c)^n - 1]
numerator = loan_amount * monthly_rate * (1 + monthly_rate)**num_payments
denominator = (1 + monthly_rate)**num_payments - 1
monthly_payment = numerator / denominator

total_paid = monthly_payment * num_payments
total_interest = total_paid - loan_amount

print(f"Loan: \${loan_amount:,}")
print(f"Monthly payment: \${monthly_payment:.2f}")
print(f"Total interest: \${total_interest:,.2f}")`,
          success: currentTry >= 11,
          concept: "COMPLEX ARITHMETIC"
        },
        {
          code: `# ITERATION ${currentTry}: COMPLEX ARITHMETIC - COMBINATORICS
import math

# Calculate combinations and permutations
n = 10  # Total items
r = 3   # Items to choose

# nPr = n! / (n-r)!
permutations = math.factorial(n) / math.factorial(n - r)

# nCr = n! / (r!(n-r)!)
combinations = math.factorial(n) / (math.factorial(r) * math.factorial(n - r))

# Probability calculations
total_outcomes = combinations
favorable_outcomes = 2
probability = favorable_outcomes / total_outcomes

print(f"Permutations P({n},{r}): {int(permutations)}")
print(f"Combinations C({n},{r}): {int(combinations)}")
print(f"Probability: {probability:.4f} or {probability*100:.2f}%")`,
          success: currentTry >= 12,
          concept: "COMPLEX ARITHMETIC"
        }
      ];

      const easyTask = easyTasks[Math.min(currentTry, easyTasks.length - 1)];
      const hardTask = hardTasks[Math.min(currentTry, hardTasks.length - 1)];

      return {
        0: {
          code: easyTask.code,
          result: easyTask.success ? `SUCCESS: ${easyTask.concept} COMPLETED` : `ERROR: ${easyTask.concept} NEEDS WORK`,
          concept: easyTask.concept
        },
        1: {
          code: hardTask.code,
          result: hardTask.success ? `SUCCESS: ${hardTask.concept} MASTERED` : `ERROR: ${hardTask.concept} TOO COMPLEX`,
          concept: hardTask.concept
        }
      };
    }
  };

  const taskExamples = getCurrentTaskExample();
  const currentProb = currentTry > 0 ? data[currentTry - 1] : { task0: 0, task1: 0 };

  const handleNext = () => {
    if (currentStep < 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepOne = () => (
    <div className="space-y-6">
      <div className="border-4 border-yellow-600 rounded-xl p-6 bg-yellow-50">
        <div className="flex items-center gap-3 mb-4">
          <Target className="w-8 h-8 text-yellow-600" />
          <h3 className="text-xl font-bold text-yellow-700 uppercase tracking-wide">Critical Distinction</h3>
        </div>
        <p className="text-black text-lg font-bold leading-relaxed mb-4">
          <span className="bg-yellow-200 px-2 py-1 border-2 border-yellow-600 rounded text-yellow-800 font-bold">
            Learning Rate ≠ Skill Difficulty
          </span>
          . A task can have fast learning rate but still be highly difficult overall.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="bg-green-100 border-2 border-green-600 rounded-lg p-3">
            <div className="font-bold text-green-800 text-sm flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Learning Rate
            </div>
            <div className="text-green-900 text-xs mt-1">Speed of progress per practice session - how quickly you improve with each attempt</div>
          </div>
          <div className="bg-red-100 border-2 border-red-600 rounded-lg p-3">
            <div className="font-bold text-red-800 text-sm flex items-center gap-2">
              <Target className="w-4 h-4" />
              Skill Difficulty
            </div>
            <div className="text-red-900 text-xs mt-1">Inherent conceptual difficulty - how hard the skill is to learn in the first place</div>
          </div>
        </div>
      </div>

      <div className="border-4 border-purple-600 rounded-xl p-6 bg-purple-50">
        <div className="flex items-center gap-3 mb-4">
          <Brain className="w-8 h-8 text-purple-600" />
          <h3 className="text-xl font-bold text-purple-700 uppercase tracking-wide">Next: Interactive Simulation</h3>
        </div>
        <p className="text-black text-lg font-bold leading-relaxed">
          In the next section, you'll simulate different effects of learning rate and skill difficulty on success probability. You'll see how these two parameters affect the AFM formula differently.
        </p>
      </div>
    </div>
  );

  const renderStepTwo = () => (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg">
        <p className="text-lg text-black leading-relaxed text-center">
          <strong>Learning Rate vs Skill Difficulty:</strong> Toggle the demos to see what effect learning rate and skill difficulty have on AFM.
        </p>
      </div>

      {/* Simulation Selector */}
      <div className="flex justify-center">
        <div className="bg-white border-4 border-black rounded-xl p-2 flex font-mono shadow-lg">
          <button
            onClick={() => setCurrentSimulation('learning-rate')}
            className={`px-6 py-3 border-4 border-black rounded-lg font-bold transition-all tracking-wider text-sm ${currentSimulation === 'learning-rate'
              ? 'bg-purple-600 text-white'
              : 'text-black bg-white hover:bg-gray-100'
              }`}
          >
            LEARNING RATE DEMO
          </button>
          <button
            onClick={() => setCurrentSimulation('task-difficulty')}
            className={`px-6 py-3 border-4 border-black rounded-lg font-bold transition-all tracking-wider text-sm ml-2 ${currentSimulation === 'task-difficulty'
              ? 'bg-purple-600 text-white'
              : 'text-black bg-white hover:bg-gray-100'
              }`}
          >
            SKILL DIFFICULTY DEMO
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Graph - Main Area */}
        <div className="col-span-1 lg:col-span-2">
          <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-blue-700" />
              <h3 className="text-xl font-bold text-black uppercase tracking-wide">
                Success Probability Analysis
              </h3>
            </div>

            <div className="bg-gray-50 border-4 border-black rounded-lg p-6 h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
                  <XAxis
                    dataKey="try"
                    label={{
                      value: 'PRACTICE ATTEMPTS',
                      position: 'insideBottom',
                      offset: -10,
                      style: { fontSize: '16px', fontWeight: 'bold', fontFamily: 'IBM Plex Mono' }
                    }}
                    tick={{ fontSize: 14, fontFamily: 'IBM Plex Mono', fontWeight: 'bold' }}
                  />
                  <YAxis
                    label={{
                      value: 'SUCCESS PROBABILITY (%)',
                      angle: -90,
                      position: 'insideLeft',
                      offset: 10,
                      style: { fontSize: '16px', fontWeight: 'bold', fontFamily: 'IBM Plex Mono', textAnchor: 'middle' }
                    }}
                    tick={{ fontSize: 14, fontFamily: 'IBM Plex Mono', fontWeight: 'bold' }}
                  />
                  <Tooltip
                    labelStyle={{ fontFamily: 'IBM Plex Mono', fontSize: '14px', fontWeight: 'bold' }}
                    contentStyle={{
                      fontFamily: 'IBM Plex Mono',
                      fontSize: '14px',
                      backgroundColor: '#f8f9fa',
                      border: '3px solid #000',
                      borderRadius: '8px',
                      fontWeight: 'bold'
                    }}
                  />
                  <Legend
                    wrapperStyle={{
                      fontFamily: 'IBM Plex Mono',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      paddingTop: '20px'
                    }}
                    iconType="line"
                  />
                  {currentSim.tasks.map((task, index) => (
                    <Line
                      key={index}
                      type="monotone"
                      dataKey={`task${index}`}
                      stroke={task.color}
                      strokeWidth={5}
                      dot={{ fill: task.color, strokeWidth: 3, r: 6 }}
                      name={task.name}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Controls - Right Side */}
        <div className="col-span-1">
          <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <Play className="w-6 h-6 text-green-700" />
              <h3 className="text-xl font-bold text-black uppercase tracking-wide">
                Simulation Controls
              </h3>
            </div>

            <div className="space-y-6">
              {/* AFM Formula Display */}
              <div className="bg-gray-50 border-4 border-black rounded-lg p-4 font-mono text-center">
                <div className="text-sm mb-2 font-bold">AFM FORMULA:</div>
                <div className="text-lg font-bold mb-2">P(success) = θᵢ + βₖ + γₖ × T</div>
                <div className="text-sm">
                  <div>STUDENT ABILITY: {studentAbility}</div>
                  <div>ITERATION: {currentTry}</div>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="space-y-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  disabled={currentTry >= 10}
                  className={`w-full px-4 py-3 border-4 border-black rounded-xl font-bold text-sm tracking-wider transition-all ${isPlaying
                    ? 'bg-red-600 text-white hover:bg-white hover:text-red-600'
                    : 'bg-green-600 text-white hover:bg-white hover:text-green-600'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isPlaying ? 'PAUSE' : 'START'} SIMULATION
                </button>

                <button
                  onClick={step}
                  disabled={isPlaying || currentTry >= 10}
                  className="w-full px-4 py-3 bg-blue-600 text-white border-4 border-black rounded-xl font-bold text-sm tracking-wider transition-all hover:bg-white hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  STEP FORWARD
                </button>

                <button
                  onClick={reset}
                  className="w-full px-4 py-3 bg-gray-600 text-white border-4 border-black rounded-xl font-bold text-sm tracking-wider transition-all hover:bg-white hover:text-gray-600 flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  RESET
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Code Analysis Section */}
      <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <Code className="w-6 h-6 text-purple-700" />
          <h3 className="text-xl font-bold text-black uppercase tracking-wide">
            Parameter Comparison
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {currentSim.tasks.map((task, index) => (
            <div key={index} className={`border-4 ${task.borderColor} ${task.bgColor} rounded-xl p-6`}>
              <div className="flex items-center justify-between mb-4">
                <h4 className={`font-bold ${task.textColor} text-sm tracking-wider`}>{task.name}</h4>
                <span className="text-xs text-gray-600 font-mono">ITERATION-{currentTry}</span>
              </div>

              {/* Task Parameters */}
              <div className="p-4 bg-white border-4 border-black rounded-lg">
                <div className="grid grid-cols-2 gap-2 text-sm font-mono font-bold">
                  <div>DIFFICULTY (β): {task.difficulty}</div>
                  <div>LEARNING RATE (γ): {task.learningRate}</div>
                </div>
                <div className="border-t-2 border-black pt-2 mt-2">
                  <div className={`text-sm font-bold ${task.textColor}`}>
                    SUCCESS RATE: {currentProb[`task${index}`] || 0}%
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white min-h-screen flex flex-col text-black font-['IBM_Plex_Mono',monospace]">
      {/* Header */}
      <div className="border-b-8 border-black bg-purple-400 px-8 py-6 shadow-lg">
        <div className="flex items-center justify-center">
          <span className="text-black font-bold text-2xl uppercase tracking-wider">
            {currentStep === 0 ? "Learning Rate vs Skill Difficulty" : "Parameter Comparison"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-8 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Progress Indicator */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              {[0, 1].map((index) => (
                <div key={index} className="flex items-center">
                  <div
                    className={`w-4 h-4 rounded-full border-2 border-black ${index <= currentStep ? 'bg-purple-600' : 'bg-gray-200'
                      }`}
                  />
                  {index < 1 && (
                    <div className={`w-12 h-1 border-t-2 border-black ${index < currentStep ? 'bg-purple-600' : 'bg-gray-200'
                      }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg mb-8">
            {currentStep === 0 && renderStepOne()}
            {currentStep === 1 && renderStepTwo()}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="px-6 py-3 bg-gray-600 text-white border-4 border-black rounded-xl font-bold uppercase tracking-wide hover:bg-white hover:text-gray-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Previous
            </button>

            <div className="px-6 py-3 bg-white border-4 border-black rounded-xl font-bold text-black uppercase tracking-wide">
              Step {currentStep + 1} of 2
            </div>

            {currentStep < 1 ? (
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-purple-600 text-white border-4 border-black rounded-xl font-bold uppercase tracking-wide hover:bg-white hover:text-purple-600 transition-all"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={() => navigate(14)}
                className="px-8 py-4 bg-green-600 text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-green-600 transition-all transform hover:scale-105 flex items-center gap-3"
              >
                <span>Continue</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};