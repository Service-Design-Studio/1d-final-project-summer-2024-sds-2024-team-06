import React from 'react'
import { useState } from 'react'
import Controls from './GalleryControls'
import Captions from './Captions'
import { useParams } from 'react-router-dom'


// function to create a pop-up
function showPopup(popupID) {
  const popup = document.getElementById(popupID);
  popup.classList.remove('hidden');
  popup.classList.add('visible');
  popup.classList.remove('opacity-0');
  popup.classList.add('opacity-1');
}

// function to hide pop-up
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


// function to create a goal journal entry for a user
function createGalleryJournalForUser(journalEntry) {
  fetch(`/api/gallery_journals`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ gallery_journal: journalEntry })
  })
  .then(response => response.json())
  .then(data => {
    console.log('Journal created:', data);
    window.location.href=`/journal/${data.id}?type=gallery` // im assuming this is type gallery
  })
  .catch((error) => {
    console.error('Error in submiting journal entry:', error);
  });
}


export default function AudioPlayer({imageUrl, id, mp3, title, artist, captions}) {

  const [currentTrack, setCurrentTrack] = useState(null);
  const [userTitle, setUserTitle] = useState("");
  const [journalbits, setJournalbits] = useState("");

  return (
    <>
    {/* Background image */}
    <div className="flex-1 flex justify-center items-center grow bg-[#0D0D0D] relative no-scrollbar" onClick={() => hidePopup("popup-leaving")}>
        <img id="picture" src={imageUrl} alt={id} style={{ height: `calc(100vh - 64px)`}}/>
        {/* Black tint */}
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
    </div>
    

    {/* Description & audio control area */}
    <div className='fixed top-1/2 transform p-4'>
        {/* Title and artist name */}
        <title className="text-white text-2xl lg:text-4xl font-sans block text-left">{title}</title>
        <h1 className="text-white text-xs md:text-base font-sans block text-left">By: {artist}</h1>
        <div>&nbsp;</div>
        {/* Audio control */}
        <div id="audio-player"><Controls mp3={mp3}/></div>
    </div>

    {/* Journal area */}
    <div className='fixed top-1/2 right-0 transform p-4'>
          <h1 className="text-white text-xs md:text-base font-sans block text-left">Let's pen down some thoughts...</h1>
          <p className="text-white text-xs font-sans block text-left">*You can zoom into the picture to see the finer details</p>
          <div>&nbsp;</div>
          <input id="goalsetting-title" className="text-xs md:text-base shadow appearance-none border w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-transparent text-white" 
                        value={userTitle} onChange={(e) => setUserTitle(e.target.value)} type="text" placeholder="Title"></input>
          {/* <div>&nbsp;</div> */}
          <textarea
            id="text-box"
            value={journalbits}
            onChange={(e) => setJournalbits(e.target.value)}
            rows="5"
            placeholder=""
            className="w-full bg-transparent text-white"
          />
        <div>&nbsp;</div>

      {/* Exit buttons */}
      <div className="flex justify-between gap-4">
          <button
            id="leave-activity"
            type="button"
            className="inline-flex justify-center rounded-md shadow-sm text-xs md:text-base bg-[#1F2937] hover:bg-[#111827] text-white py-2 px-4"
            onClick={() => showPopup("popup-leaving")}
            >Leave</button>

            <button
            id="journal-activity"
            type="button"
            className="inline-flex justify-center rounded-md shadow-sm text-xs md:text-base bg-[#1F2937] hover:bg-[#111827] text-white py-2 px-4"
            onClick={() =>{
              disableButton("journal-activity");
              // accept empty fields?
              // post to end-api
              createGalleryJournalForUser({
                journal_title: title,
                journal_entry: journalbits,
                tip_title: '',
                tip_body: '',
                imageURL: imageUrl,
                date_created: new Date().toISOString(),
              });}}
            >Publish to journal</button>
        </div>
    </div>

    {/*Pop-up on leaving*/}
    <div id="popup-leaving" className='flex flex-col flex-grow hidden opacity-0 bg-[#0D0D0D] shadow-xl rounded-md fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[250px] lg:w-1/4 p-4'>
              <span className="block text-lg lg:text-xl font-bold text-[#713a35]">Are you leaving?</span>
              <span className="block text-xs lg:text-base text-bold text-white">Leaving would not save any changes on your journal.</span>
              <div>&nbsp;</div>
              <div className="block flex justify-between gap-4">
                <button id="home" className="text-xs lg:text-base bg-[#713a35] hover:bg-[#5e2c29] text-white font-bold py-2 px-4"
                    onClick={() => {window.location.href="/gallery-walk"}}>Okay, I'll leave</button>
                <button id="return" className="text-xs lg:text-base bg-[#21687f] hover:bg-[#1a4e63] text-white font-bold py-2 px-4"
                    onClick={() => hidePopup("popup-leaving")}>No, I'll continue reflecting</button> 
              </div>
    </div>
    </>    
  )
}
