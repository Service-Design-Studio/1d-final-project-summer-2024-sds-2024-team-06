import React from 'react'

import Navigation from '../components/Navigation';
// import { journalQuotes } from '../api/journalQuotes';

// To use brownPaper background: <div style={brownPaper}></div>
const brownPaper = {
  height: 'relative',
  background: 'url(/images/background-brown.svg) no-repeat center center fixed',
  backgroundSize: 'cover',
};

const journalQuotes = [{message: "You are the author of your own story. If you're stuck, remember that at any moment, you have the power to write a new chapter.", 
  author: "Celest Thorson",
  imageUrl: "/images/quote-placeholder.png"},
  {message: "The keeping of a journal is a way to focus on what is important, to set goals, to celebrate achievements, and to reflect on lessons learned.", 
  author: "Jim Rohn",
  imageUrl: "/images/quote-placeholder.png"},
  {message: "Writing in a journal each day allows you to direct your focus to what you accomplished, what you’re grateful for, and what you’re committed to doing better tomorrow.", 
  author: "Hal Elrod",
  imageUrl: "/images/quote-placeholder.png"},
  {message: "The starting point of discovering who you are, your gifts, your talents, your dreams, is being comfortable with yourself. Spend time alone. Write in a journal.", 
  author: "Robin Sharma",
  imageUrl: "/images/quote-placeholder.png"},
  {message: "You must remember that your story matters. What you write has the power to save a life, sometimes that life is your own.", 
  author: " Stalina Goodwin",
  imageUrl: "/images/quote-placeholder.png"},
];


export default function JournalSplashArt() {
  const randomIndex = Math.floor(Math.random() * journalQuotes.length);

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
              {/*Main quote message*/}
              <title className="text-[#382C0D] text-2xl lg:text-4xl font-sriracha block text-left font-bold">{journalQuotes[randomIndex].message}</title>
              <div>&nbsp;</div>
              {/*if they have an author, spawn the author's name*/}
              {journalQuotes[randomIndex].author !== "undefined" && (<h1 className="text-[#382C0D] text-lg md:text-2xl font-sriracha block text-left font-bold">-{journalQuotes[randomIndex].author}</h1>)}
            </div>
            <div className='col-span-1'>
              <img src={journalQuotes[randomIndex].imageUrl} className="w-relative object-cover" />
            </div>
          </div>
        </div>
        <div className='row-span-1 flex justify-center'>
          {/*Continue button*/}
          <button id="continue" className="text-sm md:text-base fixed bottom-3 rounded-full bg-white hover:bg-gray-200 text-black py-2 px-4">Click anywhere to continue</button>
        </div>
      </div>
      </div>
    </div>
  )
}