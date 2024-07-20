import React from 'react'
import Navigation from "../components/Navigation";


export default function JournalGoalForm() {
    return (<div class="flex flex-col h-screen">
        <Navigation />
        <div className="flex-1 bg-orange grow">
        <div>&nbsp;</div>
        <div>&nbsp;</div>
            <div className="grid grid-cols-5">
                <div className='col-span-1'></div>
                {/*Title*/}
                <div className='col-span-3'>
                    <h1 className='font-sans-900 font-bold'>Goal-setting Journal Entry</h1>
                    <div>&nbsp;</div>
                    {/*Main journal entry space*/}
                    <div className="flex-grow rounded-md bg-white p-10">
                        <div className="flex justify-between">
                            <span class="text-left font-bold">Title</span>
                            <span class="text-sm text-right text-grey">Write in short summary of what this entry is about</span>
                        </div>
                        <div>&nbsp;</div>
                        <input id="goalsetting-title" class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" type="text"></input>
                        <div>&nbsp;</div>
                        <label for="goalsetting-start" class="font-bold">One thing I will start...</label>
                        <div>&nbsp;</div>
                        <textarea id="goalsetting-start" rows="5" class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"></textarea>
                        <div>&nbsp;</div>
                        <label for="goalsetting-stop" class="font-bold">One thing I will stop...</label>
                        <div>&nbsp;</div>
                        <textarea id="goalsetting-stop" rows="5" class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"></textarea>
                        <div>&nbsp;</div>
                        <label for="goalsetting-continue" class="font-bold">One thing I will continue...</label>
                        <div>&nbsp;</div>
                        <textarea id="goalsetting-continue" rows="5" class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"></textarea>
                        <div>&nbsp;</div>
                        <div class="flex justify-center">
                            <button class="flex-1 bg-[#3655F4] hover:bg-[#2B44C1] text-white font-bold py-2 px-4">Submit</button>
                        </div>
                    </div>
                </div>
                <div className='col-span-1'></div>
            </div>
        </div>
    </div>)
    

}
