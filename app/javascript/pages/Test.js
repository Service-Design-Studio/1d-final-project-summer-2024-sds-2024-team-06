import React, { useState, useEffect } from 'react';
import LoadingScreen from './Loading';

const Test = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        const nextProgress = prev + Math.floor(Math.random() * 10) + 10;
        if (nextProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoaded(true), 1000); // Ensure the animation finishes
          return 100;
        }
        return nextProgress;
      });
    }, 500);
  }, []);

  if (!isLoaded) {
    return <LoadingScreen loadingProgress={loadingProgress} />;
  }

  return (
    <div className="app-content">
      <h1>Welcome to the App</h1>
    </div>
  );
};

export default Test;