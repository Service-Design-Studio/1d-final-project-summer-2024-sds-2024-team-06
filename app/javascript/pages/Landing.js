import React from 'react'


// To use NGS paper background: <div style={NGSLanding}></div>
const NGSLanding = {
  height: '100vh',
  width: '100vw',
  background: 'url(/images/background-ngs.svg) no-repeat center center fixed',
  backgroundSize: 'cover',
};

export default function Landing() {
  return (
    <div style={NGSLanding} class="flex justify-center no-scrollbar"
        onClick={() => {window.location.href="/check-in"}}>
      {/*Continue button*/}
      <button id="continue" className="text-sm md:text-base fixed bottom-2 rounded-full bg-white hover:bg-gray-200 text-black py-2 px-4">Click anywhere to continue</button>
    </div>
  )
}