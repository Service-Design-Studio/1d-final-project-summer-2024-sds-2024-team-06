import React from 'react';
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

    return (
    <div class="flex flex-col h-screen">
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
                                <span className="block text-left font-bold">Open-ended Journal Entry</span>
                                <span className="block text-left">{get_date()}</span>
                              </div>
                              <button id="close" class="text-5xl text-[#2F4858] border-none bg-transparent hover:text-[#1F2F3A] focus:outline-none"
                                    onClick={()=> showPopup()}>&times;</button>
                        </div>
                        <div>&nbsp;</div>
                        <div className='grid grid-cols-3 gap-4'>
                        {/*Main journal entry space*/}
                            <div style={dottedPaper} className="flex-grow col-span-2 rounded-md p-10">
                                <div className="flex justify-between">
                                    <span class="text-left font-bold">Title</span>
                                    <span class="text-sm text-right text-grey">Write in short summary of what the entry is about</span>
                                </div>
                                <div>&nbsp;</div>
                                <input id="openended-title" class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" type="text"></input>
                                <div>&nbsp;</div>
                                <label for="openended-body" class="font-bold">Think and jot down something that happened, a feeling you felt or any reflection of today</label>
                                <div>&nbsp;</div>
                                <textarea id="openended-body" rows="20" class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"></textarea>
                                <div>&nbsp;</div>
                                <div class="flex justify-center">
                                    <button class="flex-1 bg-[#3655F4] hover:bg-[#2B44C1] text-white font-bold py-2 px-4">Submit</button>
                                </div>
                            </div>
                        {/*Prompt space*/}
                            <div style={dottedPaper} className='col-span-1 rounded-md p-10'>
                                    <label for="prompt" class="font-bold">Prompt</label>
                                    <div>&nbsp;</div>
                                    <div className='flex flex-col flex-grow justify-between'>
                                        <div id="prompt" class="border border-black rounded-lg p-4 h-80">Prompt from GPT here</div>
                                        <div>&nbsp;</div>
                                        <div class="flex justify-center">
                                        <button class="flex-1 bg-[#3655F4] hover:bg-[#2B44C1] text-white font-bold py-2 px-4">Guide Me</button>
                                        </div>
                                    </div>
                            </div>
                  </div>

                </div>
                
                <div className='col-span-1' onClick={() => hidePopup()}></div>
            </div>
            {/*Pop-up on exit*/}
            <div id="popupOnExit" className='hidden opacity-0 bg-[#FFF8EA] shadow-xl rounded-md fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 p-4'>
                <span class="font-sans-900 font-bold">Leaving would not save any changes.</span>
              <div>&nbsp;</div>
              <div className="flex justify-between">
                <button id="home" className="bg-[#3655F4] hover:bg-[#2B44C1] text-white font-bold py-2 px-4"
                        onClick={() => {window.location.href="/journal"}}>Okay, I'll leave</button>
                <button id="return" className="bg-[#3655F4] hover:bg-[#2B44C1] text-white font-bold py-2 px-4"
                        onClick={() => hidePopup()}>Aight, I'll continue journalling</button>
              </div>
            </div>
        </div>
    </div>)
    

}
