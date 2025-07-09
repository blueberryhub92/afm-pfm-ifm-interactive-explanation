import React from 'react';
import { ArrowRight, Code, Calculator, Users, Brain, Play } from 'lucide-react';

const Layout = ({ title, children }) => (
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

const TechnicalCard = ({ title, description, icon: Icon, config, onClick, size = "normal", isMain = false }) => {
  const sizeClasses = {
    normal: "col-span-1 row-span-1",
    wide: "col-span-2 row-span-1", 
    tall: "col-span-1 row-span-2",
    large: "col-span-2 row-span-2"
  };

  const cardClass = isMain 
    ? "bg-black text-white border-3 border-black" 
    : "bg-white text-black border-2 border-black";

  return (
    <div
      onClick={onClick}
      className={`${sizeClasses[size]} ${cardClass} p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 relative group`}
    >
      {/* Technical drawing corner marker */}
      <div 
        className={`absolute top-2 right-2 w-2 h-2 border ${isMain ? 'border-white bg-black' : 'border-black bg-white'}`}
      />
      
      {/* Dimension lines for main card */}
      {isMain && (
        <>
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <span className="bg-black text-white px-3 py-1 text-xs font-mono tracking-wider border border-white">
              FEATURED MODULE
            </span>
          </div>
          <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 rotate-90">
            <div className="w-4 h-px bg-black"></div>
          </div>
        </>
      )}
      
      <div className="h-full flex flex-col justify-between">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-8 h-8 border ${isMain ? 'border-white' : 'border-black'} flex items-center justify-center ${isMain ? 'bg-black' : 'bg-white'}`}>
            <Icon className={`w-4 h-4 ${isMain ? 'text-white' : 'text-black'}`} />
          </div>
          <ArrowRight className={`w-4 h-4 ${isMain ? 'text-white' : 'text-black'} opacity-0 group-hover:opacity-100 transition-opacity`} />
        </div>
        
        <div>
          <div className="flex items-center mb-3">
            <div>
              <h3 className={`text-lg font-bold ${isMain ? 'text-white' : 'text-black'} tracking-wider uppercase`}>
                {title}
              </h3>
              <span className={`text-xs font-mono ${isMain ? 'text-gray-300' : 'text-gray-600'}`}>
                {config}
              </span>
            </div>
          </div>
          
          <p className={`${isMain ? 'text-white' : 'text-black'} text-sm font-mono leading-relaxed`}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export const WelcomePage = ({scroll}) => {

  return (
    <Layout title="Learning Models Hub">
      <div className="max-w-7xl mx-auto">
        {/* Compact Hero Section */}
        <div className="border-2 border-black p-4 bg-white mb-6 relative">
          {/* Technical corner brackets */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-black"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-black"></div>
          
          <div className="text-center space-y-3">
            <div className="inline-block border border-black px-3 py-1 mb-2">
              <span className="text-xs tracking-wider font-mono">EDUCATIONAL FRAMEWORK</span>
            </div>
            <h1 className="text-3xl font-bold uppercase tracking-wider text-black">
              MODELINGO
            </h1>
            <p className="text-sm font-mono leading-relaxed max-w-3xl mx-auto text-black">
              COMPREHENSIVE LEARNING MODEL ANALYSIS & SIMULATION PLATFORM
              <br />
              INTERACTIVE EDUCATIONAL ALGORITHMS & PREDICTIVE MODELING
            </p>
          </div>
        </div>

        {/* Technical Grid with dimension lines */}
        <div className="relative">
          {/* Dimension bracket */}
          <div className="absolute -top-4 left-0 right-0 h-3 border-l-2 border-r-2 border-t-2 border-black"></div>
          
          <div className="grid grid-cols-4 grid-rows-3 gap-6 h-[600px]">
            {/* Start Python Journey - Large featured card */}
            <TechnicalCard
              title="Python Journey"
              description="INITIALIZE PROGRAMMING SEQUENCE • INTERACTIVE TUTORIALS • HANDS-ON EXERCISES • FUNDAMENTAL ALGORITHMS"
              icon={Code}
              config="MODULE-001"
              size="large"
              isMain={true}
              onClick={() => scroll(1)}
            />

            {/* AFM Formula - Tall card */}
            <TechnicalCard
              title="AFM Formula"
              description="ADDITIVE FACTOR MODEL • MATHEMATICAL FOUNDATION • PREDICTIVE ALGORITHMS • PERFORMANCE ANALYSIS"
              icon={Calculator}
              config="MODULE-002"
              size="tall"
              onClick={() => scroll(14)}
            />

            {/* PFM - Wide card */}
            <TechnicalCard
              title="Performance Factor"
              description="PERFORMANCE FACTOR MODEL • SKILL ACQUISITION • LEARNING PROGRESSION • FACTOR ANALYSIS"
              icon={Users}
              config="MODULE-003"
              size="wide"
              onClick={() => scroll(18)}
            />

            {/* AFM Simulator - Normal card */}
            <TechnicalCard
              title="AFM Simulator"
              description="INTERACTIVE SIMULATION • UNIFORM LEARNING RATES "
              icon={Play}
              config="MODULE-004"
              size="normal"
              onClick={() => scroll(15)}
            />

            {/* IFM - Normal card */}
            <TechnicalCard
              title="Instructional Factor"
              description="INSTRUCTIONAL FACTOR MODEL • TEACHING METHODOLOGY"
              icon={Brain}
              config="MODULE-005"
              size="normal"
              onClick={() => scroll(21)}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};