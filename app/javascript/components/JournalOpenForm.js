import React from 'react';
import { useState } from 'react';
//import { useUser } from '../pages/User.js'; 
import { guideMe, generateTip } from '../api/gemini.js'
import {enqueueGuideMe, enqueueGenerateTip } from '../api/queueManager.js'

import Navigation from "../components/Navigation";


// function to dynamically get today's date
function get_date(){
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
  });
  return formattedDate
}


// function to check if a string consists of only white strings
function isWhitespace(str) {
  return /^\s*$/.test(str);
}

// function to create a goal journal entry for a user
async function createJournalForUser(journalEntry) {
  console.log(journalEntry)
  fetch(`/api/journals`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ journal: journalEntry })
  })
  .then(response => response.json())
  .then(data => {
    console.log('Journal created:', data);
    window.location.href=`/journal/${data.id}?type=open`
    //return data.id;
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
function showPopup(popupID) {
  const popup = document.getElementById(popupID);
  popup.classList.remove('hidden');
  popup.classList.add('visible');
  popup.classList.remove('opacity-0');
  popup.classList.add('opacity-1');
}

//function to hide pop-up
function hidePopup(popupID) {
  const popup = document.getElementById(popupID);
  popup.classList.add('hidden');
  popup.classList.remove('visible');
  popup.classList.add('opacity-0');
  popup.classList.remove('opacity-1');
}

//function to disable buttons
function disableButton(buttonID){
  const button = document.getElementById(buttonID);
  button.disabled = true;
  button.style.backgroundColor = "#2B44C1";
};

//function to enable buttons
function enableButton(buttonID){
  const button = document.getElementById(buttonID);
  button.textContent = "Guide me";
  button.disabled = false;
  button.style.backgroundColor = "#3655F4";
};


//function to add newline to the prompt for proper formatting
function formatPrompt(generated){
  generated = generated.replace(/([.!?])/g, '$1\n')
  return generated.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
      <br />
    </React.Fragment>
))}



export default function JournalOpenForm() {

    const [title, setTitle] = useState("");
    const [journalEntry, setJournalEntry] = useState("");
    const [generateButton, setGenerateButton] = useState("Guide Me");
    const [submitButton, setSubmitButton] = useState("Submit");
    const [tipBody, setTipBody] = useState("   ");
    //const { currentUser } = useUser();

    return (
    <div className="flex flex-col h-screen">
        <Navigation />
        <div style={brownPaper} className="flex-1 grow p-4">
        <div>&nbsp;</div>
        <div>&nbsp;</div>
            <div className="grid grid-cols-1 sm:grid-cols-7">
                <div className='col-span-1' onClick={() => {
                                                    hidePopup("popup-exit");
                                                    hidePopup("popup-empty");}}></div>
                <div className='col-span-1 sm:col-span-5'>
                        {/*Title*/}
                        <div className="flex justify-between">
                              <div>
                                <span className="text-[#382C0D] text-2xl lg:text-4xl font-sriracha block text-left font-bold">Open-ended Journal Entry</span>
                                <span className="text-[#382C0D] text-bold text-sm lg:text-base block text-left">{get_date()}</span>
                              </div>
                              <button id="close" className="text-3xl lg:text-5xl text-[#382C0D] border-none bg-transparent hover:text-[#1F2F3A] focus:outline-none"
                                    onClick={()=> showPopup("popup-exit")}>&times;</button>
                        </div>
                        <div>&nbsp;</div>
                        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                        {/*Main journal entry space*/}
                            <div style={dottedPaper} className="flex-grow sm:col-span-2 rounded-md p-4 lg:p-10">
                                <div className="flex justify-between">
                                    <span className="text-lg lg:text-2xl font-sriracha text-left font-bold">Title</span>
                                    <span className="text-xs lg:text-base text-grey text-left">Summarise what the entry is about.</span>
                                </div>
                                <div>&nbsp;</div>
                                <input id="openended-title" className="text-xs lg:text-base shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" type="text"
                                       value={title} onChange={(e) => setTitle(e.target.value)}></input>
                                <div>&nbsp;</div>
                                <label htmlFor="openended-entry" className="text-lg lg:text-2xl font-sriracha font-bold">Think and jot down something that happened or a feeling you felt today</label>
                                <div>&nbsp;</div>
                                <textarea id="openended-entry" rows="20" className="text-xs lg:text-base shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                                          value={journalEntry} onChange={(e) => setJournalEntry(e.target.value)}></textarea>
                                <div>&nbsp;</div>
                                <div className="flex justify-center">
                                    <button className="text-base lg:text-lg flex-1 bg-[#3655F4] hover:bg-[#2B44C1] text-white font-bold py-2 px-4"
                                            id="button-submit"
                                            onClick={async function submit() {
                                              // change button to "Submitting"
                                              setSubmitButton("Submitting...");
                                              disableButton("button-submit");
                                              // do a check for empty fields
                                              if (isWhitespace(journalEntry)){
                                                showPopup("popup-empty");
                                                return;
                                              };
                                              // llm to generate a tip with tip title
                                              const generatedTip = await generateTip(journalEntry);
                                              // post to end-api
                                              let data_id = await createJournalForUser({
                                                //user_id: currentUser.id,
                                                journal_title: title || "Untitled",
                                                journalentry: journalEntry,
                                                tip_title: generatedTip.title,
                                                tip_body: generatedTip.description.replace(/([.!?])/g, '$1\n'),
                                                date_created: new Date().toISOString(),
                                              });
                                            }}>{submitButton}</button>


                                </div>
                            </div>
                        {/*Prompt space*/}
                            <div style={dottedPaper} className='sm:col-span-1 rounded-md p-4 lg:p-10'>
                                    <label htmlFor="prompt" className="text-lg lg:text-2xl font-sriracha font-bold">Prompt</label>
                                    <div>&nbsp;</div>
                                    <div className='flex flex-col flex-grow justify-between'>
                                        <div id="prompt" className="flex-wrap border border-black rounded-md p-2">
                                            {/* {tipBody}</div> */}
                                          <p id="prompt-content" className='text-xs lg:text-base'>{tipBody}</p></div>
                                        <div>&nbsp;</div>
                                        <div className="flex justify-center">
                                        <button className="text-base lg:text-lg flex-1 bg-[#3655F4] hover:bg-[#2B44C1] text-white font-bold py-2 px-4"
                                                id="button-prompt"
                                                onClick={async function generatePrompt() {
                                                  // clear any previous prompts
                                                  setTipBody("");
                                                  // change button to "Generating..."
                                                  setGenerateButton("Generating...");
                                                  disableButton("button-prompt");
                                                  // llm to generate a prompt
                                                  const generatedGuide = await guideMe(journalEntry);
                                                  //update the prompt-space with new lines/ break lines
                                                  //setTipBody(formatPrompt(generatedGuide.response))
                                                  setTipBody(formatPrompt(generatedGuide.response))
                                                  // change button back to "Guide Me"
                                                  setGenerateButton("Guide Me")
                                                  enableButton("button-prompt");
                                                }}>{generateButton}</button>
                                        </div>
                                    </div>
                            </div>
                  </div>

                </div>
                
                <div className='col-span-1' onClick={() => {
                                                    hidePopup("popup-exit");
                                                    hidePopup("popup-empty");}}></div>
            </div>
            {/*Pop-up on exit*/}
            <div id="popup-exit" className='flex flex-col flex-grow hidden opacity-0 bg-[#FFF8EA] shadow-xl rounded-md fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[250px] lg:w-1/4 p-4'>
                  <span className="block text-lg lg:text-xl font-bold text-[#C0564B]">Are you leaving?</span>
                  <span className="block text-xs lg:text-base text-bold">Leaving would not save any changes on your journal.</span>
                  <div>&nbsp;</div>
                  <div className="block flex justify-between gap-4">
                    <button id="home" className="text-xs lg:text-base bg-[#C0564B] hover:bg-[#A0453A] text-white font-bold py-2 px-4"
                        onClick={() => {window.location.href="/journal"}}>Okay, I'll leave</button>
                    <button id="return" className="text-xs lg:text-base bg-[#3655F4] hover:bg-[#2B44C1] text-white font-bold py-2 px-4"
                        onClick={() => hidePopup("popup-exit")}>No, I'll continue writing</button> 
                  </div>
            </div>

            {/*Pop-up on empty fields*/}
            <div id="popup-empty" className='flex flex-col flex-grow hidden opacity-0 bg-[#FFF8EA] shadow-xl rounded-md fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[250px] lg:w-1/4 p-4'>
                  <span className="block text-lg lg:text-xl font-bold text-[#C0564B]">Error, missing field!</span>
                  <span className="block text-xs lg:text-base text-bold">Main journal entry should be filled.</span>
                  <div>&nbsp;</div>
                  <div className="block flex justify-between gap-4">
                  <button id="home" className="text-xs lg:text-base bg-[#C0564B] hover:bg-[#A0453A] text-white font-bold py-2 px-4"
                        onClick={() => {window.location.href="/journal"}}>Discard, let me leave</button>
                    <button id="return" className="text-xs lg:text-base bg-[#3655F4] hover:bg-[#2B44C1] text-white font-bold py-2 px-4"
                        onClick={() => {
                          hidePopup("popup-empty");
                          setSubmitButton("Submit");
                          enableButton("button-submit");}}>Okay, I'll continue writing</button> 
                  </div>
            </div>
        </div>
    </div>)
}
