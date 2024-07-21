import React from 'react';
import { useState } from 'react';
import { useUser } from '../pages/User.js'; 

import Navigation from "../components/Navigation";

function get_date(){
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
  });
  return formattedDate
}

// function to create a goal journal entry for a user
function createJournalForUser(journalEntry) {
  console.log(journalEntry)
  fetch(`/api/journal`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ Journal: journalEntry })
  })
  .then(response => response.json())
  .then(data => {
    console.log('Journal created:', data);
    onAddFlower(data);
  })
  .catch((error) => {
    console.error('Error in submiting journal entry:', error);
  });
}

// To use dotted paper background: <div style={dottedPaper}></div>
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


//function to create a pop-up when the user exits
function showPopup() {
  const popup = document.getElementById('popupOnExit');
  popup.classList.remove('hidden');
  popup.classList.add('visible');
  popup.classList.remove('opacity-0');
  popup.classList.add('opacity-1');
}

//function to hide pop-up
function hidePopup() {
  const popup = document.getElementById('popupOnExit');
  popup.classList.add('hidden');
  popup.classList.remove('visible');
  popup.classList.add('opacity-0');
  popup.classList.remove('opacity-1');
}


export default function JournalOpenForm() {

    const [title, setTitle] = useState("");
    const [journalEntry, setJournalEntry] = useState("");
    //const [tipTitle, setTipTitle] = useState("");
    const [tipBody, setTipBody] = useState("");
    const { currentUser } = useUser();

    return (
    <div className="flex flex-col h-screen">
        <Navigation />
        <div style={brownPaper} className="flex-1 grow pb-4">
        <div>&nbsp;</div>
        <div>&nbsp;</div>
            <div className="grid grid-cols-7">
                <div className='col-span-1' onClick={() => hidePopup()}></div>
                <div className='col-span-5'>
                        {/*Title*/}
                        <div className="flex justify-between">
                              <div>
                                <span className="text-[#382C0D] text-2xl md:text-4xl font-sriracha block text-left font-bold">Open-ended Journal Entry</span>
                                <span className="text-[#382C0D] text-bold text-sm md:text-base block text-left">{get_date()}</span>
                              </div>
                              <button id="close" className="text-3xl md:text-5xl text-[#382C0D] border-none bg-transparent hover:text-[#1F2F3A] focus:outline-none"
                                    onClick={()=> showPopup()}>&times;</button>
                        </div>
                        <div>&nbsp;</div>
                        <div className='grid grid-cols-3 gap-4'>
                        {/*Main journal entry space*/}
                            <div style={dottedPaper} className="flex-grow col-span-2 rounded-md p-10">
                                <div className="flex justify-between">
                                    <span className="text-lg md:text-2xl font-sriracha text-left font-bold">Title</span>
                                    <span className="text-sm md:text-base text-grey text-left">Summarise what the entry is about.</span>
                                </div>
                                <div>&nbsp;</div>
                                <input id="openended-title" className="text-sm md:text-base shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" type="text"
                                       value={title} onChange={(e) => setTitle(e.target.value)}></input>
                                <div>&nbsp;</div>
                                <label for="openended-entry" className="text-lg md:text-2xl font-sriracha font-bold">Think and jot down something that happened or a feeling you felt today</label>
                                <div>&nbsp;</div>
                                <textarea id="openended-entry" rows="20" className="text-sm md:text-base shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                                          value={journalEntry} onChange={(e) => setJournalEntry(e.target.value)}></textarea>
                                <div>&nbsp;</div>
                                <div className="flex justify-center">
                                    <button className="text-base md:text-lg flex-1 bg-[#3655F4] hover:bg-[#2B44C1] text-white font-bold py-2 px-4"
                                            onClick={() =>{
                                              // post to end-api
                                              createJournalForUser({
                                                user_id: currentUser.id,
                                                journal_title: title,
                                                journalentry: journalEntry,
                                                tip_title: '',
                                                tip_body: '',
                                                date_created: new Date().toISOString(),
                                              });

                                              // go to the preview page
                                              //window.location.href="/journal"
                                            }}>Submit</button>
                                </div>
                            </div>
                        {/*Prompt space*/}
                            <div style={dottedPaper} className='col-span-1 rounded-md p-10'>
                                    <label for="prompt" className="text-lg md:text-2xl font-sriracha font-bold">Prompt</label>
                                    <div>&nbsp;</div>
                                    <div className='flex flex-col flex-grow justify-between'>
                                        <div id="prompt" className="text-sm md:text-base border border-black rounded-lg p-4 h-80">{value}</div>
                                        <div>&nbsp;</div>
                                        <div className="flex justify-center">
                                        <button className="text-base md:text-lg flex-1 bg-[#3655F4] hover:bg-[#2B44C1] text-white font-bold py-2 px-4">Guide Me</button>
                                        </div>
                                    </div>
                            </div>
                  </div>

                </div>
                
                <div className='col-span-1' onClick={() => hidePopup()}></div>
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
        </div>
    </div>)
}
