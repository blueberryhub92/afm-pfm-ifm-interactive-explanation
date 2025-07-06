import React from 'react';
import { ArrowRight, Code, Calculator, Users, Brain, Play } from 'lucide-react';

const Layout = ({ title, children }) => (
  <div className="bg-white min-h-screen flex flex-col text-black font-['IBM_Plex_Mono',monospace]">
    <div className="border-b-8 border-black bg-yellow-400 px-8 py-6 shadow-lg">
      <div className="flex items-center justify-center">
        <span className="text-black font-bold text-2xl uppercase tracking-wider">
          {title}
        </span>
      </div>
    </div>
    <div className="flex-1 px-8 py-8">{children}</div>
  </div>
);

const BentoCard = ({ title, description, icon: Icon, bgColor, textColor, onClick, size = "normal" }) => {
  const sizeClasses = {
    normal: "col-span-1 row-span-1",
    wide: "col-span-2 row-span-1",
    tall: "col-span-1 row-span-2",
    large: "col-span-2 row-span-2"
  };

  return (
    <div
      onClick={onClick}
      className={`${sizeClasses[size]} ${bgColor} border-4 border-black rounded-xl p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-8 group`}
    >
      <div className="h-full flex flex-col justify-between">
        <div className="flex items-start justify-between mb-4">
          <Icon className={`w-8 h-8 ${textColor} group-hover:scale-110 transition-transform`} />
          <ArrowRight className={`w-6 h-6 ${textColor} opacity-0 group-hover:opacity-100 transition-opacity`} />
        </div>
        
        <div>
          <h3 className={`text-xl font-bold ${textColor} uppercase tracking-tight mb-2 group-hover:text-2xl transition-all`}>
            {title}
          </h3>
          <p className={`${textColor} text-sm font-bold leading-relaxed`}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export const WelcomePage = () => {
  const handleNavigation = (destination) => {
    console.log(`Navigating to: ${destination}`);
    // In a real app, you'd use your navigation logic here
    alert(`Would navigate to: ${destination}`);
  };

  return (
    <Layout title="Learning Models Hub">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="border-4 border-black rounded-xl p-8 bg-purple-600 text-white shadow-lg mb-8">
          <div className="text-center space-y-6">
            <h1 className="text-4xl font-bold uppercase tracking-tight">
              Welcome to modelingo
            </h1>
            <p className="text-xl font-bold leading-relaxed max-w-3xl mx-auto">
              Explore different learning models, understand their formulas, and simulate their behavior.
              Start your journey into student models.
            </p>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-4 grid-rows-3 gap-6 h-[600px]">
          {/* Start Python Journey - Large featured card */}
          <BentoCard
            title="Start Python Journey"
            description="Begin your adventure with Python programming. Learn the fundamentals and build your first projects with interactive tutorials and hands-on exercises."
            icon={Code}
            bgColor="bg-green-400"
            textColor="text-black"
            size="large"
            onClick={() => handleNavigation('Start Python Journey')}
          />

          {/* AFM Formula - Tall card */}
          <BentoCard
            title="AFM Formula"
            description="Dive deep into the Additive Factor Model. Understand the mathematical foundation and learn how it predicts student performance."
            icon={Calculator}
            bgColor="bg-blue-400"
            textColor="text-black"
            size="tall"
            onClick={() => handleNavigation('AFM Formula')}
          />

          {/* PFM - Wide card */}
          <BentoCard
            title="Performance Factor Model"
            description="Explore PFM and its approach to modeling student learning through performance factors and skill acquisition."
            icon={Users}
            bgColor="bg-orange-400"
            textColor="text-black"
            size="wide"
            onClick={() => handleNavigation('PFM')}
          />

          {/* AFM Simulator - Normal card */}
          <BentoCard
            title="AFM Simulator"
            description="Interactive simulation of AFM behavior. See how uniform learning rates affect different types of students."
            icon={Play}
            bgColor="bg-red-400"
            textColor="text-white"
            size="normal"
            onClick={() => handleNavigation('AFM Simulator')}
          />

          {/* IFM - Normal card */}
          <BentoCard
            title="Instructional Factor Model"
            description="Learn about IFM and how it incorporates instructional factors into learning predictions."
            icon={Brain}
            bgColor="bg-pink-400"
            textColor="text-black"
            size="normal"
            onClick={() => handleNavigation('IFM')}
          />
        </div>
      </div>
    </Layout>
  );
};