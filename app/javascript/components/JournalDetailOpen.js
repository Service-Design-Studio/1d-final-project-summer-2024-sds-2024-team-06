import React from 'react';

import TipCard from "../components/TipCard";


// To use dotted paper background: <div style={dottedPaper}></div>
const dottedPaper = {
  height: 'relative',
  background: 'url(/images/background-dottedpaper.svg) no-repeat center center fixed',
  backgroundSize: 'cover',
};



//function to add newline to the prompt for proper formatting
function formatPrompt(lines){
  lines = lines?.replace(/([.!?])/g, '$1\n')
  return lines?.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
      <br />
    </React.Fragment>
))}


export default function JournalDetailOpen({journalEntry}) {
    return(
          // Render the open-journal layout
            <div className="grid grid-cols-1 sm:grid-cols-7">
                <div className='col-span-1'></div>
                <div className='col-span-1 sm:col-span-5'>
                        {/*Title & date*/}
                        <div className="flex justify-between">
                              <div>
                                <title className="text-[#382C0D] text-2xl lg:text-4xl font-sriracha block text-left font-bold">Open-ended Entry</title>
                                <h1 className="text-[#382C0D] text-bold text-sm lg:text-base block text-left">{journalEntry.date_created}</h1>
                              </div>
                              {/*Exit button*/}
                              <button id="close" className="text-3xl lg:text-5xl text-[#382C0D] border-none bg-transparent hover:text-[#1F2F3A] focus:outline-none"
                                    onClick={()=> {window.location.href="/journal"}}>&times;</button>
                        </div>
                        <div>&nbsp;</div>
                        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                            {/*Main journal entry space*/}
                            <div style={dottedPaper} className="flex-grow sm:col-span-2 rounded-md p-4 lg:p-10">
                              <h1 className="text-lg lg:text-2xl font-sriracha font-bold" style={{ overflowWrap: 'break-word', wordBreak: 'break-all' }}>{journalEntry.journal_title}</h1>
                              <div>&nbsp;</div>
                              <p className="text-xs lg:text-base" style={{ overflowWrap: 'break-word', wordBreak: 'break-all' }}>{journalEntry.journalentry}</p>
                            </div>
                            {/*Tip space if it exists*/}
                            {journalEntry.tip_title !== null && (
                              // To change background dynamically later on
                              <div className='sm:col-span-1 rounded-md p-4 lg:p-10 bg-[#ADD8E6]'>
                                <TipCard tipTitle={journalEntry.tip_title} tipBody={journalEntry.tip_body} />
                              </div>
                            )}
                        </div>

                </div>
                
                <div className='col-span-1'></div>
            </div>
    )}