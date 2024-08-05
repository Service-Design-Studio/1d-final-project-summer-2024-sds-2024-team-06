import React from 'react';


// To use dotted paper background: <div style={dottedPaper}></div>
const dottedPaper = {
  height: 'relative',
  background: 'url(/images/background-dottedpaper.svg) no-repeat center center fixed',
  backgroundSize: 'cover',
};




//function to add newline to the prompt for proper formatting
function formatPrompt(lines){
  lines = lines.replace(/([.!?])/g, '$1\n')
  return lines.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
      <br />
    </React.Fragment>
))}


export default function JournalDetailArtwork({journalEntry}) {

  return (
          // Else render the goal-journal layout
          
          <div className="grid sm:grid-cols-5">
            <div className='col-span-1'></div>
                {/*Title & date*/}
                <div className='col-span-3'>
                        <div className="flex justify-between">
                              <div>
                                <title className="text-[#382C0D] text-2xl lg:text-4xl font-sriracha block text-left font-bold" style={{ overflowWrap: 'break-word', wordBreak: 'break-all' }}>Goal: {journalEntry.journal_title}</title>
                                <h1 className="text-[#382C0D] text-bold text-sm lg:text-base block text-left">{journalEntry.date_created}</h1>
                              </div>
                              {/*Exit button*/}
                            <button id="close" className="text-3xl md:text-5xl text-[#382C0D] border-none bg-transparent hover:text-[#1F2F3A] focus:outline-none"
                                    onClick={()=> {window.location.href="/journal"}}>&times;</button>
                        </div>
                    <div>&nbsp;</div>
                    {/*Main gallery-journal entry space*/}
                    <div style={dottedPaper} className="flex-grow rounded-md p-4 lg:p-10">
                        <div className="flex justify-between">
                            <div>
                            <img src={journalEntry.imageURL} alt="art-piece" className="w-relative object-cover" />
                            <div>&nbsp;</div>
                            <p id = "journal-start" className="block text-xs lg:text-base" style={{ overflowWrap: 'break-word', wordBreak: 'break-all' }}>{journalEntry.journal_entry}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-span-1'></div>
            </div>
  );
};