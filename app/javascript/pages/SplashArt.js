import React from 'react'

import Navigation from '../components/Navigation';


// To use NGS paper background: <div style={NGSLanding}></div>
const background = {
  height: '100vh',
  width: '100vw',
  background: 'url(/images/background-journalsplashart.png) no-repeat center center fixed',
  backgroundSize: 'cover',
};

export default function SplashArt() {
  return (
    <>
    <Navigation />
    {/* Splash art */}
    <div style={background} class="flex justify-center no-scrollbar"
        onClick={() => {window.location.href="/journal"}}>
      {/*Continue button*/}
      <button id="continue" className="text-sm md:text-base fixed bottom-2 rounded-full bg-white hover:bg-gray-200 text-black py-2 px-4">Click anywhere to continue</button>
    </div>
    </>
  )
}