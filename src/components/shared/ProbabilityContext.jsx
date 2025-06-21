import { createContext, useContext, useState } from 'react';

const ProbabilityContext = createContext();

export const ProbabilityProvider = ({ children }) => {
  const [currentProbability, setCurrentProbability] = useState(0.25);
  const [showCurrentValue, setShowCurrentValue] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  const updateProbability = (newProbability) => {
    setCurrentProbability(newProbability);
  };

  const toggleCurrentValue = () => {
    setShowCurrentValue(!showCurrentValue);
  };

  return (
    <ProbabilityContext.Provider value={{
      currentProbability,
      showCurrentValue,
      isHovering,
      updateProbability,
      toggleCurrentValue,
      setIsHovering
    }}>
      {children}
    </ProbabilityContext.Provider>
  );
};

export const useProbability = () => {
  const context = useContext(ProbabilityContext);
  if (!context) {
    throw new Error('useProbability must be used within a ProbabilityProvider');
  }
  return context;
};
