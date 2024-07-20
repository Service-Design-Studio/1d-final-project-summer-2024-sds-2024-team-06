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


export default function JournalOpenForm() {

    return (
    <div class="flex flex-col h-screen">
        <Navigation />
        <div className="flex-1 bg-orange grow pb-4">
        <div>&nbsp;</div>
        <div>&nbsp;</div>
            <div className="grid grid-cols-7">
                <div className='col-span-1'></div>
                <div className='col-span-5'>
                        {/*Title*/}
                        <div className="flex justify-between">
                                <span class="text-left font-bold">Open-ended Journal Entry</span>
                                <span class="text-right">{get_date()}</span>
                        </div>
                        <div>&nbsp;</div>
                        <div className='grid grid-cols-3 gap-4'>
                        {/*Main journal entry space*/}
                            <div className="flex-grow col-span-2 rounded-md bg-white p-10">
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
                            <div className='col-span-1 rounded-md bg-white p-10'>
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
                
                <div className='col-span-1'></div>
            </div>
        </div>
    </div>)
    

}
