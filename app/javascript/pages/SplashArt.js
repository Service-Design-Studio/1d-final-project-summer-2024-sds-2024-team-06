import React from 'react'

import Navigation from '../components/Navigation';

const quotes = [{msg: "You are the author of your own story.", imageUrl: "/images/quote-placeholder.png"}]

// To use brownPaper background: <div style={brownPaper}></div>
const brownPaper = {
  height: 'relative',
  background: 'url(/images/background-brown.svg) no-repeat center center fixed',
  backgroundSize: 'cover',
};

export default function SplashArt() {
  return (
    <div className="flex flex-col h-screen">
    <Navigation />

    {/*Splash art content*/}
    <div style={brownPaper} className="flex-1 grow p-4"
        onClick={() => {window.location.href="/journal"}}>
      <div className='grid sm:grid-rows-7 p-4 sm:p-8'>
        <div className='row-span-1'></div>
        {/*Main content*/}
        <div className='row-span-5'>
          {/*Split quote in one side, svg on the other*/}
          <div className='grid sm:grid-cols-3'>
            <div className='col-span-2'>
              <p>{quotes[0].msg}</p>
            </div>
            <div className='col-span-1'>
              <img src={quotes[0].imageUrl} className="w-relative object-cover" />
            </div>
          </div>
        {/*Continue button*/}
        <button id="continue" className="text-sm md:text-base fixed bottom-2 rounded-full bg-white hover:bg-gray-200 text-black py-2 px-4">Click anywhere to continue</button>
        </div>
        <div className='row-span-1'></div>
      </div>
      
    </div>
    </div>
  )
}