import React from 'react';
import { ArrowRight, Code, Calculator, Users, Brain, Play } from 'lucide-react';

const Layout = ({ title, children }) => (
  <div className="relative min-h-screen bg-gray-900" style={{
    backgroundImage: `
      radial-gradient(circle at 25% 25%, #1f2937 0%, transparent 50%),
      radial-gradient(circle at 75% 75%, #374151 0%, transparent 50%),
      linear-gradient(45deg, #111827 25%, transparent 25%),
      linear-gradient(-45deg, #111827 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #111827 75%),
      linear-gradient(-45deg, transparent 75%, #111827 75%)
    `,
    backgroundSize: '60px 60px, 60px 60px, 30px 30px, 30px 30px, 30px 30px, 30px 30px',
    backgroundPosition: '0 0, 40px 40px, 0 0, 0 15px, 15px 15px, 15px 0'
  }}>
    <div className="relative z-10 w-full">{children}</div>
  </div>
);

const PixelButton = ({ children, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`bg-yellow-400 text-black px-4 py-2 font-bold border-2 border-yellow-300 hover:bg-yellow-300 transition-colors duration-200 ${className}`}
    style={{
      clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
      fontFamily: 'monospace'
    }}
  >
    {children}
  </button>
);

const TechnicalCard = ({ title, description, icon: Icon, config, onClick, colorScheme = "purple", isMain = false }) => {
  const colorSchemes = {
    purple: {
      bg: "bg-gradient-to-br from-purple-600 to-indigo-800",
      border: "border-purple-400",
      accent: "bg-purple-400",
      glow: "shadow-purple-500/50"
    },
    blue: {
      bg: "bg-gradient-to-br from-blue-600 to-cyan-800",
      border: "border-cyan-400",
      accent: "bg-cyan-400",
      glow: "shadow-cyan-500/50"
    },
    green: {
      bg: "bg-gradient-to-br from-green-600 to-emerald-800",
      border: "border-green-400",
      accent: "bg-green-400",
      glow: "shadow-green-500/50"
    },
    orange: {
      bg: "bg-gradient-to-br from-orange-600 to-red-800",
      border: "border-orange-400",
      accent: "bg-orange-400",
      glow: "shadow-orange-500/50"
    },
    pink: {
      bg: "bg-gradient-to-br from-pink-600 to-rose-800",
      border: "border-pink-400",
      accent: "bg-pink-400",
      glow: "shadow-pink-500/50"
    }
  };

  const scheme = colorSchemes[colorScheme];

  return (
    <div
      onClick={onClick}
      className={`${scheme.bg} ${scheme.border} border-4 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl ${scheme.glow} relative group h-full overflow-hidden`}
      style={{
        clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
        imageRendering: 'pixelated'
      }}
    >
      {/* Pixel grid overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(255,255,255,0.1) 50%, transparent 50%),
            linear-gradient(rgba(255,255,255,0.1) 50%, transparent 50%)
          `,
          backgroundSize: '4px 4px'
        }}
      />
      
      {/* Featured badge */}
      {isMain && (
        <div className="absolute top-4 left-4 z-10">
          <div 
            className="bg-yellow-400 text-black px-3 py-1 text-xs font-bold border-2 border-yellow-300"
            style={{
              clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
              fontFamily: 'monospace'
            }}
          >
            ★ FEATURED
          </div>
        </div>
      )}
      
      <div className="relative z-10 h-full p-6 flex flex-col justify-between text-white">
        {/* Icon */}
        <div className="flex justify-end mb-4">
          <div 
            className={`w-12 h-12 ${scheme.accent} border-2 border-white flex items-center justify-center`}
            style={{
              clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))'
            }}
          >
            <Icon className="w-6 h-6 text-black" />
          </div>
        </div>
        
        {/* Content */}
        <div className="space-y-3">
          <div className="space-y-2">
            <p className="text-yellow-300 text-xs font-bold tracking-wider uppercase" style={{ fontFamily: 'monospace' }}>
              {config}
            </p>
            <h3 className="text-xl md:text-2xl font-bold text-white leading-tight" style={{ fontFamily: 'monospace' }}>
              {title}
            </h3>
          </div>
          
          <p className="text-gray-200 text-sm leading-relaxed" style={{ fontFamily: 'monospace' }}>
            {description}
          </p>
          
          {/* Pixel arrow */}
          <div className="flex items-center text-yellow-300 text-sm font-bold group-hover:text-yellow-200 transition-colors duration-300">
            <span style={{ fontFamily: 'monospace' }}>ENTER</span>
            <div className="ml-2 w-4 h-4 bg-yellow-300 group-hover:bg-yellow-200 transition-colors duration-300" 
                 style={{
                   clipPath: 'polygon(0 0, 70% 0, 100% 50%, 70% 100%, 0 100%, 30% 50%)'
                 }} />
          </div>
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
        <div className="text-center py-16 px-8">
          <div className="space-y-6">
            {/* Pixel badge */}
            <div className="inline-block">
              <div 
                className="bg-green-400 text-black px-4 py-2 text-sm font-bold border-2 border-green-300"
                style={{
                  clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
                  fontFamily: 'monospace'
                }}
              >
                ◆ EDUCATIONAL FRAMEWORK ◆
              </div>
            </div>
            
            {/* Pixel title */}
            <h1 
              className="text-5xl md:text-7xl font-bold text-white leading-tight tracking-wider"
              style={{ 
                fontFamily: 'monospace',
                textShadow: '4px 4px 0px #4338ca, 8px 8px 0px #1e1b4b',
                imageRendering: 'pixelated'
              }}
            >
              MODELINGO
            </h1>
            
            {/* Subtitle */}
            <p 
              className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto"
              style={{ fontFamily: 'monospace' }}
            >
              &gt; Comprehensive learning model analysis and simulation platform
              <br />
              &gt; Featuring interactive educational algorithms and predictive modeling
            </p>
            
            {/* Pixel decorations */}
            <div className="flex justify-center items-center space-x-4 mt-8">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-4 h-4 bg-yellow-400 border border-yellow-300"
                  style={{
                    clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))',
                    animation: `pulse ${1 + i * 0.2}s infinite`
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Pixel Bento Grid */}
        <div className="px-8 pb-16">
          <div className="grid grid-cols-4 grid-rows-3 gap-6 h-[600px]">
            
            {/* Python Journey - Large featured card (2x2) */}
            <div className="col-span-2 row-span-2">
              <TechnicalCard
                title="Python Journey"
                description="Initialize your programming sequence with interactive tutorials, hands-on exercises, and fundamental algorithms designed for comprehensive learning."
                icon={Code}
                config="Module 001"
                colorScheme="purple"
                isMain={true}
                onClick={() => scroll(1)}
              />
            </div>

            {/* AFM Formula - Tall card (1x2) */}
            <div className="col-span-1 row-span-2">
              <TechnicalCard
                title="AFM Formula"
                description="Explore the Additive Factor Model with mathematical foundations, predictive algorithms, and performance analysis tools."
                icon={Calculator}
                config="Module 002"
                colorScheme="blue"
                onClick={() => scroll(14)}
              />
            </div>

            {/* AFM Simulator - Normal card (1x1) */}
            <div className="col-span-1 row-span-1">
              <TechnicalCard
                title="AFM Simulator"
                description="Interactive simulation environment with uniform learning rates and real-time modeling capabilities."
                icon={Play}
                config="Module 004"
                colorScheme="orange"
                onClick={() => scroll(15)}
              />
            </div>

            {/* IFM - Normal card (1x1) */}
            <div className="col-span-1 row-span-1">
              <TechnicalCard
                title="Instructional Factor"
                description="Discover the Instructional Factor Model focusing on teaching methodology and educational optimization."
                icon={Brain}
                config="Module 005"
                colorScheme="pink"
                onClick={() => scroll(21)}
              />
            </div>

            {/* PFM - Wide card (2x1) */}
            <div className="col-span-2 row-span-1">
              <TechnicalCard
                title="Performance Factor Model"
                description="Analyze the Performance Factor Model for skill acquisition, learning progression, and comprehensive factor analysis with advanced metrics."
                icon={Users}
                config="Module 003"
                colorScheme="green"
                onClick={() => scroll(18)}
              />
            </div>
          </div>
        </div>

        {/* Pixel Footer */}
        <div className="text-center py-12 px-8">
          <div className="space-y-6">
            <h2 
              className="text-3xl md:text-4xl font-bold text-white"
              style={{ 
                fontFamily: 'monospace',
                textShadow: '2px 2px 0px #059669'
              }}
            >
              &gt; SELECT MODULE_
            </h2>
            <p 
              className="text-lg text-gray-300 max-w-2xl mx-auto"
              style={{ fontFamily: 'monospace' }}
            >
              Choose any module above to begin your journey into advanced learning models and educational technology.
            </p>
            
            {/* Pixel progress bar */}
            <div className="flex justify-center mt-6">
              <div className="flex space-x-1">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className="w-6 h-4 bg-green-400 border border-green-300"
                    style={{
                      clipPath: 'polygon(0 0, calc(100% - 2px) 0, 100% 2px, 100% 100%, 2px 100%, 0 calc(100% - 2px))',
                      animation: `pulse ${2 + i * 0.1}s infinite`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </Layout>
  );
};