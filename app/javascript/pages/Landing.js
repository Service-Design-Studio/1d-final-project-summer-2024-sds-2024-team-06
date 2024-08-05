import React from 'react'
import { useState, useEffect } from 'react';
import TestAirplane from '../components/TestAirplane';

export default function Landing() {

  const [continueButtonStyle, setContinueButtonStyle] = useState({
    opacity: 0,
    transition: "opacity 0.5s ease-in",
  });
  const [exit, setExit] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setContinueButtonStyle({
        opacity: 1,
        transition: "opacity 0.5s ease-in",
      });
    }, 200);
  }, []);

  const handleExit = () => {
    setExit(true);
    setTimeout(() => {
      window.location.href = "/check-in";
    }, 250);
  };

  useEffect(() => {
    if (exit) {
      setContinueButtonStyle({
        opacity: 0,
        transition: "opacity 0.2s ease-in",
      });
    }
  }, [exit]);


// To use NGS paper background: <div style={NGSLanding}></div>
const NGSLanding = {
  height: '100vh',
  width: '100vw',
  background: 'url(/images/background-ngs.png) no-repeat center bottom fixed',
  backgroundSize: 'cover',
};

  return (
    
    <div style={NGSLanding} class="flex justify-center no-scrollbar"
        onClick={handleExit}>
      {/*Continue button*/}
      <button style={{...continueButtonStyle}} id="continue" className="text-sm md:text-base fixed bottom-2 rounded-full bg-white hover:bg-gray-200 text-black py-2 px-4">Click anywhere to continue</button>
      <TestAirplane />
    </div>
  )
  
}