import React, { useEffect, useState } from 'react';
import "../../assets/stylesheets/dotsAnimation.css";

export default function JournalLoadScreen({ loadingProgress }) {
  const [currentFrame, setCurrentFrame] = useState(1);
  const [isFinalFrame, setIsFinalFrame] = useState(false);
  const actualFrames = 67;
  const totalFrames = actualFrames * 3;
  const finalFrameDelay = 1000; // Delay duration in milliseconds

  useEffect(() => {
    const targetFrame = Math.floor((loadingProgress / 100) * totalFrames);

    if (currentFrame < targetFrame) {
      const interval = setInterval(() => {
        setCurrentFrame((prev) => {
          const nextFrame = prev + 1;
          if (nextFrame > targetFrame) {
            clearInterval(interval);
            return Math.min(nextFrame, totalFrames); // Ensure it does not exceed the totalFrames
          }
          return nextFrame;
        });
      }, 100); // Adjust the interval based on the desired frame rate
    }
  }, [loadingProgress]);

  useEffect(() => {
    if (loadingProgress === 100 && currentFrame < totalFrames) {
      const interval = setInterval(() => {
        setCurrentFrame((prev) => {
          const nextFrame = prev + 1;
          if (nextFrame >= totalFrames) {
            clearInterval(interval);
            setIsFinalFrame(true);
            return totalFrames; // Ensure it ends at the last frame
          }
          return nextFrame;
        });
      }, 100); // Adjust the interval based on the desired frame rate
    }
  }, [loadingProgress, currentFrame]);

  useEffect(() => {
    if (isFinalFrame) {
      const timeout = setTimeout(() => {
        // You can add any action here that should happen after the delay
        // For example, you could set a state to indicate that loading is complete
      }, finalFrameDelay);

      return () => clearTimeout(timeout); // Cleanup the timeout
    }
  }, [isFinalFrame]);

  return (
    <div className="flex flex-col justify-center items-center bg-[#F2FEDC]" style={{
        position: 'fixed',
        width: '100%',
        height: '100%',
      }}>
      <div className="h-2/3 w-full flex flex-col items-center">
        <div className="flex flex-row space-x-1 mt-2 items-center">
          <h1 style={{marginBottom: "0.5rem"}} className="self-end text-2xl">Loading Journals</h1>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
        <img
          // src={`/images/journal-frames/${(currentFrame % actualFrames) + 1}.png`}
          src="/images/journal-writing-gif.gif"
          alt={`Loading frame ${(currentFrame % actualFrames) + 1}`}
          className='w-1/3 h-auto object-contain'
        />
        <div class="w-3/12 bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
            <div class="bg-blue-600 h-2.5 rounded-full" style={{width: `${loadingProgress}%`}}></div>
        </div>
      </div>
    </div>
  );
}
