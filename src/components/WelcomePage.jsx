import React, { useState, useEffect } from 'react';
import { ArrowRight, Brain, Lightbulb, Target, Code, Calculator, Users } from 'lucide-react';
import { trackButtonClick, trackCustomEvent } from '../utils/analytics';

export const WelcomePage = ({ navigate }) => {
  const [hoveredModule, setHoveredModule] = useState(null);
  const [hoverStartTime, setHoverStartTime] = useState(null);
  const [viewStartTime] = useState(Date.now());
  const [interactionHistory, setInteractionHistory] = useState([]);

  // Module definitions
  const modules = [
    {
      title: "Start Python Journey",
      id: "python-journey",
      icon: Code,
      color: "green",
      description: "Begin your adventure with Python programming. Learn about AFMs parameters with interactive tutorials and hands-on exercises.",
      onClick: () => {
        handleModuleClick("python-journey");
        navigate(1);
      },
      size: "large" // Featured module
    },
    {
      title: "Additive Factor Model",
      id: "afm-formula",
      icon: Calculator,
      color: "blue",
      description: "Dive deep into the Additive Factor Model. Understand the mathematical foundation and learn how it predicts student performance.",
      onClick: () => {
        handleModuleClick("afm-formula");
        navigate(14);
      },
      size: "normal"
    },
    {
      title: "Performance Factor Model",
      id: "pfm",
      icon: Users,
      color: "orange",
      description: "Explore PFM and its approach to modeling student learning through correct and incorrect answers.",
      onClick: () => {
        handleModuleClick("pfm");
        navigate(18);
      },
      size: "normal"
    },
    {
      title: "Instructional Factor Model",
      id: "ifm",
      icon: Brain,
      color: "red",
      description: "Learn about IFM and how it incorporates instructional factors into learning predictions.",
      onClick: () => {
        handleModuleClick("ifm");
        navigate(21);
      },
      size: "normal"
    }
  ];

  useEffect(() => {
    // Track initial page view with detailed context
    trackCustomEvent('welcome_page_viewed', {
      componentName: 'WelcomePage',
      pageType: 'introduction',
      elementType: 'page',
      viewContext: {
        timestamp: Date.now(),
        availableModules: modules.map(m => ({
          id: m.id,
          title: m.title,
          size: m.size
        })),
        layout: 'bento_grid',
        featuredModule: modules.find(m => m.size === 'large')?.id
      }
    });

    // Cleanup and track exit
    return () => {
      const timeSpent = Date.now() - viewStartTime;
      trackCustomEvent('welcome_page_exit', {
        componentName: 'WelcomePage',
        pageType: 'introduction',
        elementType: 'page',
        exitContext: {
          timestamp: Date.now(),
          timeSpent,
          interactionCount: interactionHistory.length,
          interactionPattern: summarizeInteractions(interactionHistory),
          lastInteraction: interactionHistory[interactionHistory.length - 1]
        }
      });
    };
  }, [interactionHistory]);

  const summarizeInteractions = (interactions) => {
    return {
      totalHovers: interactions.filter(i => i.type === 'hover').length,
      totalClicks: interactions.filter(i => i.type === 'click').length,
      uniqueModulesInteracted: [...new Set(interactions.map(i => i.moduleId))].length,
      mostInteractedModule: getMostFrequent(interactions.map(i => i.moduleId))
    };
  };

  const getMostFrequent = (arr) => {
    return arr.length > 0
      ? arr.reduce((a, b) =>
        arr.filter(v => v === a).length >= arr.filter(v => v === b).length ? a : b
      )
      : null;
  };

  const handleModuleClick = (moduleId) => {
    const module = modules.find(m => m.id === moduleId);
    const interactionTime = Date.now();
    const hoverDuration = hoveredModule === moduleId ? interactionTime - hoverStartTime : 0;

    // Track detailed module click
    trackButtonClick(`welcome_page_module_${moduleId}`, {
      componentName: 'WelcomePage',
      elementType: 'module_button',
      elementLocation: 'module_grid',
      interactionContext: {
        moduleId,
        moduleTitle: module?.title,
        moduleSize: module?.size,
        moduleColor: module?.color,
        timestamp: interactionTime,
        wasHovered: moduleId === hoveredModule,
        hoverDuration,
        interactionSequence: interactionHistory.length + 1
      }
    });

    // Track module selection as a custom event for additional analytics
    trackCustomEvent('welcome_page_module_selected', {
      componentName: 'WelcomePage',
      elementType: 'module',
      elementLocation: 'module_grid',
      selectionContext: {
        moduleId,
        moduleTitle: module?.title,
        moduleType: module?.size === 'large' ? 'featured' : 'standard',
        selectionTimestamp: interactionTime,
        timeFromPageLoad: interactionTime - viewStartTime,
        priorInteractions: summarizeInteractions(interactionHistory),
        interactionPattern: {
          wasHovered: moduleId === hoveredModule,
          hoverDuration,
          directSelection: !hoveredModule || hoveredModule === moduleId
        }
      }
    });

    // Update interaction history
    setInteractionHistory(prev => [...prev, {
      type: 'click',
      moduleId,
      timestamp: interactionTime,
      hoverDuration
    }]);
  };

  const handleModuleHover = (moduleId, isEntering) => {
    const module = modules.find(m => m.id === moduleId);
    const interactionTime = Date.now();

    if (isEntering) {
      setHoveredModule(moduleId);
      setHoverStartTime(interactionTime);

      // Track hover start
      trackCustomEvent('welcome_page_module_hover_start', {
        componentName: 'WelcomePage',
        elementType: 'module',
        elementLocation: 'module_grid',
        hoverContext: {
          moduleId,
          moduleTitle: module?.title,
          moduleSize: module?.size,
          moduleColor: module?.color,
          timestamp: interactionTime,
          timeFromPageLoad: interactionTime - viewStartTime,
          previousModule: hoveredModule,
          interactionSequence: interactionHistory.length + 1
        }
      });
    } else {
      const hoverDuration = interactionTime - hoverStartTime;

      // Only track meaningful hovers (> 500ms)
      if (hoverDuration > 500) {
        trackCustomEvent('welcome_page_module_hover_end', {
          componentName: 'WelcomePage',
          elementType: 'module',
          elementLocation: 'module_grid',
          hoverContext: {
            moduleId,
            moduleTitle: module?.title,
            moduleSize: module?.size,
            moduleColor: module?.color,
            timestamp: interactionTime,
            hoverDuration,
            isExtendedHover: hoverDuration > 2000,
            interactionSequence: interactionHistory.length + 1
          }
        });

        // Update interaction history
        setInteractionHistory(prev => [...prev, {
          type: 'hover',
          moduleId,
          timestamp: interactionTime,
          duration: hoverDuration
        }]);
      }

      setHoveredModule(null);
      setHoverStartTime(null);
    }
  };

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
    <div className="bg-white min-h-screen grid place-items-center text-black font-['IBM_Plex_Mono',monospace] py-8 px-4 md:px-10">
      <div className="w-full max-w-6xl mx-auto space-y-8">

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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:h-[600px]">
          {/* Left Side - Start Python Journey (Large Module) */}
          <div className="lg:col-span-2">
            {modules.filter(module => module.size === "large").map((module) => {
              const IconComponent = module.icon;
              const isLarge = true;

              return (
                <div
                  key={module.id}
                  className="h-full border-4 border-black rounded-xl p-6 bg-white shadow-lg relative cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl hover:-translate-y-2 group"
                  onClick={module.onClick}
                  onMouseEnter={() => handleModuleHover(module.id, true)}
                  onMouseLeave={() => handleModuleHover(module.id, false)}
                  data-module-id={module.id}
                >
                  <div
                    className={`absolute -top-6 left-4 px-3 py-1 font-semibold rounded-md text-xs tracking-wider flex items-center gap-2 border-4 border-black ${colorClasses[module.color]} transition-all duration-300 group-hover:scale-110`}
                  >
                    <IconComponent className="w-4 h-4" />
                    MODULE
                  </div>

                  <div className="h-full flex flex-col justify-between">
                    <div className="flex items-start justify-between mb-4">
                      <IconComponent className="w-12 h-12 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3" />
                      <ArrowRight className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" />
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-black uppercase tracking-tight mb-3 transition-all duration-300 group-hover:text-purple-600">
                        {module.title}
                      </h3>

                      <p className="text-sm font-bold text-black leading-relaxed transition-all duration-300 group-hover:text-gray-700">
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

          {/* Right Side - Factor Models */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            {modules.filter(module => module.size === "normal").map((module) => {
              const IconComponent = module.icon;
              const isLarge = false;

              return (
                <div
                  key={module.id}
                  className="flex-1 border-4 border-black rounded-xl p-6 bg-white shadow-lg relative cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl hover:-translate-y-2 group"
                  onClick={module.onClick}
                  onMouseEnter={() => handleModuleHover(module.id, true)}
                  onMouseLeave={() => handleModuleHover(module.id, false)}
                  data-module-id={module.id}
                >
                  <div
                    className={`absolute -top-6 left-4 px-3 py-1 font-semibold rounded-md text-xs tracking-wider flex items-center gap-2 border-4 border-black ${colorClasses[module.color]} transition-all duration-300 group-hover:scale-110`}
                  >
                    <IconComponent className="w-4 h-4" />
                    MODULE
                  </div>

                  <div className="h-full flex flex-col justify-between">
                    <div className="flex items-start justify-between mb-4">
                      <IconComponent className="w-8 h-8 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3" />
                      <ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" />
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-black uppercase tracking-tight mb-3 transition-all duration-300 group-hover:text-purple-600">
                        {module.title}
                      </h3>

                      <p className="text-xs font-bold text-black leading-relaxed transition-all duration-300 group-hover:text-gray-700">
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
    </div>
  );
};