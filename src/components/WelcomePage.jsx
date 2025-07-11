import React from 'react';
import { ArrowRight, Code, Calculator, Users, Brain, Play, Lightbulb } from 'lucide-react';

export const WelcomePage = ({ scroll }) => {
  const modules = [
    {
      title: "Start Python Journey",
      id: "python-journey",
      icon: Code,
      color: "green",
      description: "Begin your adventure with Python programming. Learn about AFMs parameters with interactive tutorials and hands-on exercises.",
      onClick: () => scroll(1),
      size: "large" // Featured module
    },
    {
      title: "Additive Factor Model Formula",
      id: "afm-formula",
      icon: Calculator,
      color: "blue",
      description: "Dive deep into the Additive Factor Model. Understand the mathematical foundation and learn how it predicts student performance.",
      onClick: () => scroll(16),
      size: "normal"
    },
    {
      title: "Additive Factor Model Simulator",
      id: "afm-simulator",
      icon: Play,
      color: "purple",
      description: "Interactive simulation of AFM behavior.",
      onClick: () => scroll(17),
      size: "normal"
    },
    {
      title: "Performance Factor Model",
      id: "pfm",
      icon: Users,
      color: "orange",
      description: "Explore PFM and its approach to modeling student learning through correct and incorrect answers.",
      onClick: () => scroll(20),
      size: "wide"
    },
    {
      title: "Instructional Factor Model",
      id: "ifm",
      icon: Brain,
      color: "red",
      description: "Learn about IFM and how it incorporates instructional factors into learning predictions.",
      onClick: () => scroll(23),
      size: "normal"
    }
  ];

  const colorClasses = {
    red: "bg-red-100 border-red-600 text-red-700",
    blue: "bg-blue-100 border-blue-600 text-blue-700",
    green: "bg-green-100 border-green-600 text-green-700",
    purple: "bg-purple-100 border-purple-600 text-purple-700",
    orange: "bg-orange-100 border-orange-600 text-orange-700",
  };

  const getSizeClasses = (size) => {
    const sizeMap = {
      normal: "col-span-1 row-span-1",
      wide: "col-span-2 row-span-1",
      tall: "col-span-1 row-span-2",
      large: "col-span-2 row-span-2"
    };
    return sizeMap[size] || "col-span-1 row-span-1";
  };

  return (
    <div className="bg-white min-h-screen flex flex-col text-black font-['IBM_Plex_Mono',monospace] py-8 px-4 md:px-10">
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-8">

        {/* Header */}
        <div className="border-4 border-black rounded-xl p-8 bg-white shadow-lg relative">
          <div className="absolute -top-6 left-4 px-3 py-1 bg-black text-white font-semibold rounded-md text-xs tracking-wider flex items-center gap-2">
            <Lightbulb className="w-4 h-4" />
            LEARNING PLATFORM
          </div>
          <div className="text-2xl md:text-3xl font-bold tracking-tight text-black text-center">
            modelingo
          </div>
          <p className="text-lg text-black text-center mt-4 font-bold">
            Welcome to Interactive Student Models Platform
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-3 grid-rows-3 gap-6 h-[600px]">
          {modules.map((module) => {
            const IconComponent = module.icon;
            const isLarge = module.size === "large";

            return (
              <div
                key={module.id}
                className={`${getSizeClasses(module.size)} border-4 border-black rounded-xl p-6 bg-white shadow-lg relative cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl hover:-translate-y-2 group`}
                onClick={module.onClick}
              >
                <div
                  className={`absolute -top-6 left-4 px-3 py-1 font-semibold rounded-md text-xs tracking-wider flex items-center gap-2 border-4 border-black ${colorClasses[module.color]} transition-all duration-300 group-hover:scale-110`}
                >
                  <IconComponent className="w-4 h-4" />
                  MODULE
                </div>

                <div className="h-full flex flex-col justify-between">
                  <div className="flex items-start justify-between mb-4">
                    <IconComponent className={`${isLarge ? 'w-12 h-12' : 'w-8 h-8'} transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`} />
                    <ArrowRight className={`${isLarge ? 'w-8 h-8' : 'w-6 h-6'} opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1`} />
                  </div>

                  <div>
                    <h3 className={`${isLarge ? 'text-2xl' : 'text-xl'} font-bold text-black uppercase tracking-tight mb-3 transition-all duration-300 group-hover:text-purple-600`}>
                      {module.title}
                    </h3>

                    <p className={`${isLarge ? 'text-sm' : 'text-xs'} font-bold text-black leading-relaxed transition-all duration-300 group-hover:text-gray-700`}>
                      {module.description}
                    </p>
                  </div>
                </div>

                {/* Hover overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-purple-100 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-lg pointer-events-none"></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};