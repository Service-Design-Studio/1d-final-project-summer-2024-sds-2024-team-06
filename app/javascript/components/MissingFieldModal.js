import React from 'react';



export default function MissingFieldModal(description) {
    // function to hide pop-up
    function hidePopup() {
        const popup = document.getElementById('popupOnExit');
        popup.classList.add('hidden');
        popup.classList.remove('visible');
        popup.classList.add('opacity-0');
        popup.classList.remove('opacity-1');
    };

    return(
        <div className='flex flex-col flex-grow hidden opacity-0 bg-[#FFF8EA] shadow-xl rounded-md fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200px] lg:w-1/6 p-4'>
              <span className="block text-lg lg:text-xl font-bold text-[#C0564B]">Error, missing field!</span>
              <span className="block text-xs lg:text-base text-bold">{description}</span>
              <div>&nbsp;</div>
              <div className="block flex justify-between gap-4">
                    <button id="ok" className="text-xs lg:text-base bg-[#3655F4] hover:bg-[#2B44C1] text-white font-bold py-2 px-4"
                            onClick={() => hidePopup()}>Okay</button> 
              </div>
        </div>
)};