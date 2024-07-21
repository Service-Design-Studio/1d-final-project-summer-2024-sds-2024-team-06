import React from 'react'
import { useState } from 'react';
import { useUser } from '../pages/User.js'; 

import Navigation from "../components/Navigation";

// function to create a goal journal entry for a user
function createGoalJournalForUser(journalEntry) {
  fetch(`/api/goal_journals`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ goal_journal: journalEntry })
  })
  .then(response => response.json())
  .then(data => {
    console.log('Journal created:', data);
  })
  .catch((error) => {
    console.error('Error in submiting journal entry:', error);
  });
}

 
// to use dotted paper background: <div style={dottedPaper}></div>
const dottedPaper = {
  height: 'relative',
  background: 'url(/images/background-dottedpaper.svg) no-repeat center center fixed',
  backgroundSize: 'cover',
};

const brownPaper = {
  height: 'relative',
  background: 'url(/images/background-brown.svg) no-repeat center center fixed',
  backgroundSize: 'cover',
};

// function to create a pop-up
function showPopup() {
  const popup = document.getElementById('popupOnExit');
  popup.classList.remove('hidden');
  popup.classList.add('visible');
  popup.classList.remove('opacity-0');
  popup.classList.add('opacity-1');
}

// function to hide pop-up
function hidePopup() {
  const popup = document.getElementById('popupOnExit');
  popup.classList.add('hidden');
  popup.classList.remove('visible');
  popup.classList.add('opacity-0');
  popup.classList.remove('opacity-1');
}


export default function JournalGoalForm() {

    const [title, setTitle] = useState("");
    const [start, setStart] = useState("");
    const [stop, setStop] = useState("");
    const [continueUser, setContinueUser] = useState("");
    const { currentUser } = useUser();

    return (
    <div className="flex flex-col h-screen">
        <Navigation />
        <div style={brownPaper} className="flex-1 grow pb-4">
        <div>&nbsp;</div>
        <div>&nbsp;</div>
            <div className="grid grid-cols-5">
                <div className='col-span-1' onClick={()=> hidePopup()}></div>
                {/*Title*/}
                <div className='col-span-3'>
                        <div className="flex justify-between">
                            <span className="text-[#382C0D] text-2xl md:text-4xl font-sriracha font-bold">Goal-setting Entry</span>
                            <button id="close" className="text-3xl md:text-5xl text-[#382C0D] border-none bg-transparent hover:text-[#1F2F3A] focus:outline-none"
                                    onClick={()=> showPopup()}>&times;</button>
                        </div>
                    <div>&nbsp;</div>
                    {/*Main journal entry space*/}
                    <div style={dottedPaper} className="flex-grow rounded-md p-10">
                        <div className="flex justify-between">
                            <span className="text-lg md:text-2xl font-sriracha text-left font-bold">Title</span>
                            <span className="text-sm md:text-base text-right text-grey">Summarise what this entry is about.</span>
                        </div>
                        <div>&nbsp;</div>
                        <input id="goalsetting-title" className="text-sm md:text-base shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" 
                               value={title} onChange={(e) => setTitle(e.target.value)} type="text"></input>
                        <div>&nbsp;</div>
                        <label for="goalsetting-start" className="text-lg md:text-2xl font-sriracha font-bold">One thing I will start...</label>
                        <div>&nbsp;</div>
                        <textarea id="goalsetting-start" rows="5" className="text-sm md:text-base shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                                  value={start} onChange={(e) => setStart(e.target.value)}></textarea>
                        <div>&nbsp;</div>
                        <label for="goalsetting-stop" className="text-lg md:text-2xl font-sriracha font-bold">One thing I will stop...</label>
                        <div>&nbsp;</div>
                        <textarea id="goalsetting-stop" rows="5" className="text-sm md:text-base shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                                  value={stop} onChange={(e) => setStop(e.target.value)}></textarea>
                        <div>&nbsp;</div>
                        <label for="goalsetting-continue" className="text-lg md:text-2xl font-sriracha font-bold">One thing I will continue...</label>
                        <div>&nbsp;</div>
                        <textarea id="goalsetting-continue" rows="5" className="text-sm md:text-base shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                                  value={continueUser} onChange={(e) => setContinueUser(e.target.value)}></textarea>
                        <div>&nbsp;</div>
                        <div className="flex justify-center">
                            <button id="submit" className="block text-base md:text-lg flex-1 bg-[#3655F4] hover:bg-[#2B44C1] text-white font-bold py-2 px-4"
                                    onClick={() =>{
                                      // post to end-api
                                      createGoalJournalForUser({
                                        //user_id: currentUser.id,
                                        journal_title: title,
                                        journal_start: start,
                                        journal_end: stop,
                                        journal_third: continueUser,
                                        date_created: new Date().toISOString(),
                                      });

                                      // go to the preview page
                                      //window.location.href="/journal"
                                    }}>Submit</button>
                        </div>
                    </div>
                </div>
                <div className='col-span-1' onClick={()=> hidePopup()}></div>
            </div>
        </div>

        {/*Pop-up on exit*/}
        <div id="popupOnExit" className='hidden opacity-0 bg-[#FFF8EA] shadow-xl rounded-md fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 p-4'>
          <span className="text-sm md:text-base text-bold">Leaving would not save any changes.</span>
          <div>&nbsp;</div>
          <div className="flex justify-between gap-4">
            <button id="home" className="text-sm md:text-base bg-[#3655F4] hover:bg-[#2B44C1] text-white font-bold py-2 px-4"
                    onClick={() => {window.location.href="/journal"}}>Okay, I'll leave</button>
            <button id="return" className="text-sm md:text-base bg-[#3655F4] hover:bg-[#2B44C1] text-white font-bold py-2 px-4"
                    onClick={() => hidePopup()}>Aight, I'll continue journalling</button>
          </div>
        </div>
    </div>)
    

}

