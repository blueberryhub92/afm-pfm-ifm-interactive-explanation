import { useState } from "react";
import {
  ArrowRight,
  CheckCircle,
  XCircle,
  Brain,
  AlertTriangle,
  TrendingUp,
  Target,
  Lightbulb,
} from "lucide-react";

const Layout = ({ children }) => (
  <div className="bg-white min-h-screen font-mono relative">
    {/* Grid background */}
    <div 
      className="absolute inset-0 opacity-60"
      style={{
        backgroundImage: 'linear-gradient(to right, #d1d5db 1px, transparent 1px), linear-gradient(to bottom, #d1d5db 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }}
    />
    
    <div className="relative flex-1 px-8 py-6">{children}</div>
  </div>
);

const TechnicalSection = ({ title, children, icon: Icon, config, isMain = false, className = "" }) => {
  const sectionClass = isMain 
    ? "bg-black text-white border-3 border-black" 
    : "bg-white text-black border-2 border-black";

  return (
    <div className={`${sectionClass} p-6 mb-6 relative ${className}`}>
      {/* Technical corner marker */}
      <div 
        className={`absolute top-2 right-2 w-2 h-2 border ${isMain ? 'border-white bg-black' : 'border-black bg-white'}`}
      />
      
      {/* Config label */}
      {config && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className={`${isMain ? 'bg-black text-white border-white' : 'bg-white text-black border-black'} px-3 py-1 text-xs font-mono tracking-wider border`}>
            {config}
          </span>
        </div>
      )}
      
      <div className="flex items-center gap-3 mb-4">
        {Icon && (
          <div className={`w-8 h-8 border ${isMain ? 'border-white' : 'border-black'} flex items-center justify-center ${isMain ? 'bg-black' : 'bg-white'}`}>
            <Icon className={`w-4 h-4 ${isMain ? 'text-white' : 'text-black'}`} />
          </div>
        )}
        <h3 className={`text-lg font-bold ${isMain ? 'text-white' : 'text-black'} tracking-wider uppercase`}>
          {title}
        </h3>
      </div>
      
      {children}
    </div>
  );
};

const DataPoint = ({ label, items, type = "positive" }) => {
  const colorClasses = {
    positive: "border-l-4 border-green-600 bg-green-50",
    negative: "border-l-4 border-red-600 bg-red-50"
  };

  return (
    <div className={`${colorClasses[type]} p-4 border-2 border-black relative`}>
      {/* Technical corner brackets */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-black"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-black"></div>
      
      <h4 className={`font-bold ${type === 'positive' ? 'text-green-700' : 'text-red-700'} mb-2 uppercase tracking-wider text-sm`}>
        {label}
      </h4>
      <div className="space-y-1">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-1 h-1 bg-black"></div>
            <span className="text-black font-mono text-sm">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Slide22AFMCorrectness = ({ scroll }) => {
  const [showModelTeaser, setShowModelTeaser] = useState(false);

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="border-2 border-black p-4 bg-white mb-6 relative">
          {/* Technical corner brackets */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-black"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-black"></div>
          
          <div className="text-center space-y-3">
            <div className="inline-block border border-black px-3 py-1 mb-2">
              <span className="text-xs tracking-wider font-mono">LEARNING ANALYSIS</span>
            </div>
            <h1 className="text-2xl font-bold uppercase tracking-wider text-black">
              AFM & ANSWER CORRECTNESS
            </h1>
            <p className="text-sm font-mono leading-relaxed text-black">
              EXAMINING REAL-WORLD LEARNING PATTERNS & FEEDBACK MECHANISMS
            </p>
          </div>
        </div>

        {/* Main Content */}
        <TechnicalSection
          title="Critical Learning Insights"
          icon={Brain}
          config="ANALYSIS-001"
          isMain={true}
        >
          <div className="space-y-4">
            <p className="text-white font-mono text-sm leading-relaxed">
              IN REALITY, CORRECT AND INCORRECT ANSWERS PROVIDE DIFFERENT TYPES OF FEEDBACK 
              AND SHOULD HAVE DIFFERENT IMPACTS ON OUR CONFIDENCE IN A STUDENT'S SUCCESS PROBABILITY.
            </p>
            
            <div className="border border-white p-4 bg-gray-900">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-white"></div>
                <span className="text-white font-mono text-xs uppercase tracking-wider">LEARNING PATTERN DIFFERENTIATION</span>
              </div>
              <p className="text-white font-mono text-sm">
                ADAPTIVE SYSTEMS MUST DISTINGUISH BETWEEN RESPONSE TYPES FOR OPTIMAL LEARNING OUTCOMES
              </p>
            </div>
          </div>
        </TechnicalSection>

        {/* Data Analysis Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <DataPoint
            label="CORRECT ANSWERS SHOULD:"
            type="positive"
            items={[
              "INCREASE CONFIDENCE MORE",
              "REINFORCE CORRECT PATTERNS", 
              "STRENGTHEN MASTERY"
            ]}
          />
          
          <DataPoint
            label="INCORRECT ANSWERS SHOULD:"
            type="negative"
            items={[
              "PROVIDE LEARNING OPPORTUNITIES",
              "BUT INCREASE CONFIDENCE LESS",
              "OR EVEN DECREASE IT INITIALLY"
            ]}
          />
        </div>

        {/* Interactive Control Panel */}
        <div className="border-2 border-black p-6 bg-white mb-6 relative">
          <div className="absolute top-2 right-2 w-2 h-2 border border-black bg-white"></div>
          
          <div className="text-center">
            <div className="inline-block border border-black px-3 py-1 mb-4">
              <span className="text-xs tracking-wider font-mono">CONTROL PANEL</span>
            </div>
            
            <button
              onClick={() => setShowModelTeaser(true)}
              className="px-6 py-3 bg-black text-white border-2 border-black font-mono text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-all transform hover:scale-105 flex items-center gap-3 mx-auto relative"
            >
              <div className="w-4 h-4 border border-current flex items-center justify-center">
                <Lightbulb className="w-2 h-2" />
              </div>
              <span>INITIALIZE SOLUTION PROTOCOL</span>
            </button>
          </div>
        </div>

        {/* Model Teaser */}
        {showModelTeaser && (
          <TechnicalSection
            title="Solution Protocol Activated"
            icon={Target}
            config="SOLUTION-001"
            className="transform transition-all duration-500"
          >
            <div className="space-y-4">
              <div className="border-2 border-black p-4 bg-green-50">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-black"></div>
                  <span className="text-black font-mono text-xs uppercase tracking-wider">SYSTEM STATUS: OPERATIONAL</span>
                </div>
                <p className="text-black font-mono text-sm leading-relaxed">
                  THERE ARE LEARNING MODELS THAT <span className="bg-yellow-300 px-2 py-1 border border-black font-bold">DO</span> TAKE 
                  ANSWER CORRECTNESS INTO ACCOUNT WHEN UPDATING SUCCESS PROBABILITIES.
                </p>
              </div>
              
              <div className="border-2 border-black p-4 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="space-y-2">
                    <CheckCircle className="w-6 h-6 mx-auto text-green-600" />
                    <span className="text-black font-mono text-xs uppercase">DIFFERENTIATE RESPONSES</span>
                  </div>
                  <div className="space-y-2">
                    <TrendingUp className="w-6 h-6 mx-auto text-blue-600" />
                    <span className="text-black font-mono text-xs uppercase">ACCURATE PREDICTIONS</span>
                  </div>
                  <div className="space-y-2">
                    <Brain className="w-6 h-6 mx-auto text-purple-600" />
                    <span className="text-black font-mono text-xs uppercase">EFFECTIVE LEARNING</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="inline-block border border-black px-3 py-1">
                  <span className="text-xs tracking-wider font-mono">NEXT: EXPLORE ADVANCED MODEL</span>
                </div>
              </div>
            </div>
          </TechnicalSection>
        )}

        {/* Navigation Control */}
        <div className="border-2 border-black p-4 bg-white relative">
          <div className="absolute top-2 right-2 w-2 h-2 border border-black bg-white"></div>
          
          <div className="flex justify-center">
            <button
              onClick={() => scroll(18)}
              disabled={!showModelTeaser}
              className="px-6 py-3 bg-green-600 text-white border-2 border-black font-mono text-sm uppercase tracking-wider hover:bg-white hover:text-green-600 transition-all transform hover:scale-105 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed relative"
            >
              <span>DISCOVER THE MODEL</span>
              <div className="w-4 h-4 border border-current flex items-center justify-center">
                <ArrowRight className="w-2 h-2" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};