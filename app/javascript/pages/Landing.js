import React from 'react'


// To use NGS paper background: <div style={NGSLanding}></div>
const NGSLanding = {
  height: '100vh',
  width: '100vw',
  background: 'url(/images/background-ngs.png) no-repeat center bottom fixed',
  backgroundSize: 'cover',
};

export default function Landing() {
  return (
    <div style={NGSLanding} class="flex justify-center no-scrollbar"
        onClick={() => {window.location.href="/check-in"}}>
      {/*Continue button*/}
      <button id="continue" className="text-sm md:text-base fixed bottom-2 rounded-full bg-white hover:bg-gray-200 text-black py-2 px-4">Click anywhere to continue</button>
    </div>

  // <main>
  //   <section class="w-full h-screen bg-red-200">Section 1</section>
  //   <section class="w-full h-screen bg-blue-200">Section 2</section>
  //   <section class="w-full h-screen bg-green-200">Section 3</section>
  //   <section class="w-full h-screen bg-indigo-200">Section 4</section>
  //   <section class="w-full h-screen bg-yellow-200">Section 5</section>
  // </main>
  )
}