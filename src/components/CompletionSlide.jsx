import React, { useEffect } from "react";

export const CompletionSlide = ({ navigate }) => {
  // Scroll to top on mount (instant)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className="bg-white min-h-screen flex flex-col text-black font-['IBM_Plex_Mono',monospace] relative">
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      {/* Header */}
      <div className="border-b-8 border-black bg-gradient-to-r from-purple-400 to-blue-400 px-8 py-6 shadow-lg">
        <div className="flex items-center justify-center">
          <span className="text-black font-bold text-2xl uppercase tracking-wider">
            Learning Journey Complete!
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-8 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Congratulations Section */}
          <div
            className="border-4 border-black rounded-xl p-8 bg-gradient-to-r from-gray-100 to-purple-100 shadow-lg"
            style={{
              animation: "fadeIn 1s ease-in",
            }}
          >
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-4 h-4 bg-purple-600 rounded-full animate-pulse"></div>
                <h3 className="text-2xl font-bold text-black uppercase tracking-wide">
                  Congratulations! You've completed the learning journey!
                </h3>
                <div className="w-4 h-4 bg-purple-600 rounded-full animate-pulse"></div>
              </div>
              <p className="text-lg text-black font-bold">
                You've explored AFM, PFM, and IFM models. Choose where to go
                next:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Back to Welcome */}
              <button
                onClick={() => navigate(0)}
                className="px-6 py-4 bg-gray-600 text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-gray-600 transition-all transform hover:scale-105 flex flex-col items-center gap-2"
              >
                <span>Home</span>
              </button>

              {/* AFM Simulator */}
              <button
                onClick={() => navigate(15)}
                className="px-6 py-4 bg-green-600 text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-green-600 transition-all transform hover:scale-105 flex flex-col items-center gap-2"
              >
                <span>AFM Simulator</span>
              </button>

              {/* PFM Simulator */}
              <button
                onClick={() => navigate(19)}
                className="px-6 py-4 bg-blue-600 text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-blue-600 transition-all transform hover:scale-105 flex flex-col items-center gap-2"
              >
                <span>PFM Simulator</span>
              </button>

              {/* IFM Simulator */}
              <button
                onClick={() => navigate(22)}
                className="px-6 py-4 bg-orange-600 text-white border-4 border-black rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-orange-600 transition-all transform hover:scale-105 flex flex-col items-center gap-2"
              >
                <span>IFM Simulator</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
