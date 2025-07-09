import React from 'react';
import { ArrowRight, Code, Calculator, Users, Brain, Play } from 'lucide-react';

const Layout = ({ title, children }) => (
  <div className="bg-gray-900 min-h-screen font-mono relative overflow-hidden">
    {/* Pixel grid background */}
    <div 
      className="absolute inset-0 opacity-30"
      style={{
        backgroundImage: 'linear-gradient(to right, #1f2937 1px, transparent 1px), linear-gradient(to bottom, #1f2937 1px, transparent 1px)',
        backgroundSize: '8px 8px'
      }}
    />
    
    {/* Animated pixel stars */}
    <div className="absolute inset-0">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-yellow-400 animate-pulse"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`
          }}
        />
      ))}
    </div>
    
    <div className="relative flex-1 px-8 py-6">{children}</div>
  </div>
);

const PixelCard = ({ title, description, icon: Icon, config, onClick, size = "normal", isMain = false }) => {
  const sizeClasses = {
    normal: "col-span-1 row-span-1",
    wide: "col-span-2 row-span-1", 
    tall: "col-span-1 row-span-2",
    large: "col-span-2 row-span-2"
  };

  const cardColors = {
    normal: "bg-blue-600 border-blue-400",
    main: "bg-red-600 border-red-400"
  };

  const cardClass = isMain 
    ? `${cardColors.main} text-white shadow-lg shadow-red-900/50` 
    : `${cardColors.normal} text-white shadow-lg shadow-blue-900/50`;

  return (
    <div
      onClick={onClick}
      className={`${sizeClasses[size]} ${cardClass} border-4 p-4 cursor-pointer transform transition-all duration-200 hover:scale-105 hover:brightness-110 relative group pixel-shadow`}
      style={{
        imageRendering: 'pixelated',
        filter: 'contrast(1.2) saturate(1.3)'
      }}
    >
      {/* Pixel corner decorations */}
      <div className="absolute top-1 right-1 w-3 h-3 bg-white opacity-60" />
      <div className="absolute bottom-1 left-1 w-3 h-3 bg-white opacity-60" />
      
      {/* Retro scan lines effect */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
        }}
      />
      
      {/* Main card special effects */}
      {isMain && (
        <>
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
            <div className="bg-yellow-400 text-black px-4 py-2 text-xs font-bold tracking-wider border-2 border-yellow-300 pixel-shadow animate-pulse">
              ★ FEATURED ★
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-red-700/20 pointer-events-none animate-pulse" />
        </>
      )}
      
      <div className="h-full flex flex-col justify-between relative z-10">
        <div className="flex items-start justify-between mb-3">
          <div className={`w-10 h-10 border-2 ${isMain ? 'border-yellow-400 bg-yellow-400' : 'border-cyan-400 bg-cyan-400'} flex items-center justify-center pixel-shadow`}>
            <Icon className={`w-6 h-6 ${isMain ? 'text-black' : 'text-black'}`} />
          </div>
          <ArrowRight className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity animate-bounce" />
        </div>
        
        <div>
          <div className="flex items-center mb-3">
            <div>
              <h3 className="text-lg font-bold text-white tracking-wider uppercase pixel-text">
                {title}
              </h3>
              <div className={`inline-block px-2 py-1 mt-1 text-xs font-bold ${isMain ? 'bg-yellow-400 text-black' : 'bg-cyan-400 text-black'} pixel-shadow`}>
                {config}
              </div>
            </div>
          </div>
          
          <p className="text-white text-sm font-mono leading-relaxed pixel-text">
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
        {/* Pixel Art Hero Section */}
        <div className="border-4 border-cyan-400 p-6 bg-gray-800 mb-8 relative pixel-shadow">
          {/* Pixel corner brackets */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-cyan-400"></div>
          <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-cyan-400"></div>
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-cyan-400"></div>
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-cyan-400"></div>
          
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-pulse" />
          </div>
          
          <div className="text-center space-y-4 relative z-10">
            <div className="inline-block border-2 border-yellow-400 bg-yellow-400 px-4 py-2 mb-3 pixel-shadow">
              <span className="text-xs tracking-wider font-bold text-black">EDUCATIONAL FRAMEWORK</span>
            </div>
            <h1 className="text-4xl font-bold uppercase tracking-wider text-white pixel-text mb-4">
              <span className="text-cyan-400">MODEL</span>
              <span className="text-yellow-400">INGO</span>
            </h1>
            <div className="bg-gray-700 border-2 border-gray-600 p-4 max-w-4xl mx-auto pixel-shadow">
              <p className="text-sm font-mono leading-relaxed text-green-400 pixel-text">
                &gt; COMPREHENSIVE LEARNING MODEL ANALYSIS
                <br />
                &gt; INTERACTIVE EDUCATIONAL ALGORITHMS
                <br />
                &gt; PREDICTIVE MODELING SIMULATION PLATFORM
              </p>
            </div>
          </div>
        </div>

        {/* Pixel Art Grid */}
        <div className="relative">
          {/* Retro grid header */}
          <div className="flex items-center justify-center mb-6">
            <div className="bg-purple-600 border-2 border-purple-400 px-6 py-3 pixel-shadow">
              <span className="text-white font-bold text-sm tracking-wider">SELECT MODULE</span>
            </div>
          </div>
          
          <div className="grid grid-cols-4 grid-rows-3 gap-6 h-[600px]">
            {/* Start Python Journey - Large featured card */}
            <PixelCard
              title="Python Journey"
              description="INITIALIZE PROGRAMMING SEQUENCE • INTERACTIVE TUTORIALS • HANDS-ON EXERCISES"
              icon={Code}
              config="LVL-001"
              size="large"
              isMain={true}
              onClick={() => scroll(1)}
            />

            {/* AFM Formula - Tall card */}
            <PixelCard
              title="AFM Formula"
              description="ADDITIVE FACTOR MODEL • MATHEMATICAL FOUNDATION • PREDICTIVE ALGORITHMS"
              icon={Calculator}
              config="LVL-002"
              size="tall"
              onClick={() => scroll(14)}
            />

            {/* PFM - Wide card */}
            <PixelCard
              title="Performance Factor"
              description="PERFORMANCE FACTOR MODEL • SKILL ACQUISITION • LEARNING PROGRESSION"
              icon={Users}
              config="LVL-003"
              size="wide"
              onClick={() => scroll(18)}
            />

            {/* AFM Simulator - Normal card */}
            <PixelCard
              title="AFM Simulator"
              description="INTERACTIVE SIMULATION • UNIFORM LEARNING RATES"
              icon={Play}
              config="LVL-004"
              size="normal"
              onClick={() => scroll(15)}
            />

            {/* IFM - Normal card */}
            <PixelCard
              title="Instructional Factor"
              description="INSTRUCTIONAL FACTOR MODEL • TEACHING METHODOLOGY"
              icon={Brain}
              config="LVL-005"
              size="normal"
              onClick={() => scroll(21)}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .pixel-shadow {
          box-shadow: 
            4px 4px 0px rgba(0, 0, 0, 0.8),
            8px 8px 0px rgba(0, 0, 0, 0.4);
        }
        
        .pixel-text {
          text-shadow: 
            2px 2px 0px rgba(0, 0, 0, 0.8),
            4px 4px 0px rgba(0, 0, 0, 0.4);
        }
      `}</style>
    </Layout>
  );
};