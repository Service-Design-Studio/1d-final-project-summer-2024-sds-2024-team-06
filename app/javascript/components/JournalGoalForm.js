import React from 'react'
import Navigation from "../components/Navigation";

 //function to create a flower for a user
 function createFlowerForUser(flowerData) {
  // flowerData.user_id = userId;
  fetch(`/api/flowers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ flower: flowerData })
  })
  .then(response => response.json())
  .then(data => {
    console.log('Flower created:', data);
    onAddFlower(data);
  })
  .catch((error) => {
    console.error('Error creating flower:', error);
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


export default function JournalGoalForm() {

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
                            <span class="font-sans-900 font-bold">Goal-setting Journal Entry</span>
                            <button id="close" class="text-5xl text-[#2F4858] border-none bg-transparent hover:text-[#1F2F3A] focus:outline-none"
                                    onClick={()=> showPopup()}>&times;</button>
                        </div>
                    <div>&nbsp;</div>
                    {/*Main journal entry space*/}
                    <div style={dottedPaper} className="flex-grow rounded-md p-10">
                        <div className="flex justify-between">
                            <span className="text-left font-bold">Title</span>
                            <span className="text-sm text-right text-grey">Write in short summary of what this entry is about</span>
                        </div>
                        <div>&nbsp;</div>
                        <input id="goalsetting-title" className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" type="text"></input>
                        <div>&nbsp;</div>
                        <label for="goalsetting-start" className="font-bold">One thing I will start...</label>
                        <div>&nbsp;</div>
                        <textarea id="goalsetting-start" rows="5" className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"></textarea>
                        <div>&nbsp;</div>
                        <label for="goalsetting-stop" className="font-bold">One thing I will stop...</label>
                        <div>&nbsp;</div>
                        <textarea id="goalsetting-stop" rows="5" className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"></textarea>
                        <div>&nbsp;</div>
                        <label for="goalsetting-continue" className="font-bold">One thing I will continue...</label>
                        <div>&nbsp;</div>
                        <textarea id="goalsetting-continue" rows="5" className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"></textarea>
                        <div>&nbsp;</div>
                        <div className="flex justify-center">
                            <button id="submit" className="flex-1 bg-[#3655F4] hover:bg-[#2B44C1] text-white font-bold py-2 px-4">Submit</button>
                        </div>
                    </div>
                </div>
                <div className='col-span-1' onClick={()=> hidePopup()}></div>
            </div>
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
    </div>)
    

}

