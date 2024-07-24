import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import useFetch from '../api/useFetch';

import Navigation from "../components/Navigation";
import TipCard from "../components/TipCard";


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


export default function JournalDetail() {
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  // Get the type from the query params
  const type = queryParams.get('type'); 
  const apiUrl = gon.api_url;

  // Determine which endpoint to use based on type
  const endpoint = type === 'open' ? `/api/journals/${id}` : `/api/goal_journals/${id}`;

  // Fetch data
  const { data: journalEntry, error, isPending } = useFetch(`${apiUrl}${endpoint}`);

  console.log(journalEntry);

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;


  return (
    <div className="flex flex-col h-screen">
      <Navigation />
      <div style={brownPaper} className="flex-1 grow p-4">
      <div>&nbsp;</div>
      <div>&nbsp;</div>

        {type === 'open' ? (
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
                              <h1 className="text-lg lg:text-2xl font-sriracha font-bold">{journalEntry.journal_title}</h1>
                              <div>&nbsp;</div>
                              <p className="text-xs lg:text-base" style={{ overflowWrap: 'break-word' }}>{journalEntry.journalentry}</p>
                            </div>
                            {/*Tip space if it exists*/}
                            {journalEntry.tip_title !== undefined && (
                              // To change background dynamically later on
                              <div className='sm:col-span-1 rounded-md p-4 lg:p-10 bg-[#ADD8E6]'>
                                <TipCard tipTitle={journalEntry.tip_title} tipBody={journalEntry.tip_body} />
                              </div>
                            )}
                        </div>

                </div>
                
                <div className='col-span-1'></div>
            </div>
        ) : (
          // Else render the goal-journal layout
          <div className="grid sm:grid-cols-5">
            <div className='col-span-1'></div>
                {/*Title & date*/}
                <div className='col-span-3'>
                        <div className="flex justify-between">
                              <div>
                                <title className="text-[#382C0D] text-2xl lg:text-4xl font-sriracha block text-left font-bold">Goal: {journalEntry.journal_title}</title>
                                <h1 className="text-[#382C0D] text-bold text-sm lg:text-base block text-left">{journalEntry.date_created}</h1>
                              </div>
                              {/*Exit button*/}
                            <button id="close" className="text-3xl md:text-5xl text-[#382C0D] border-none bg-transparent hover:text-[#1F2F3A] focus:outline-none"
                                    onClick={()=> {window.location.href="/journal"}}>&times;</button>
                        </div>
                    <div>&nbsp;</div>
                    {/*Main goal-journal entry space*/}
                    <div style={dottedPaper} className="flex-grow rounded-md p-4 lg:p-10">
                        <div className="flex justify-between">
                            <div>
                            <h1 className="block text-lg md:text-2xl font-sriracha font-bold">One thing I will start...</h1>
                            <div>&nbsp;</div>
                            <p id = "journal-start" className="block text-xs lg:text-base" style={{ overflowWrap: 'break-word' }}>{journalEntry.journal_start}</p>
                            </div>
                        </div>
                    </div>
                    <div>&nbsp;</div>
                    <div style={dottedPaper} className="flex-grow rounded-md p-4 lg:p-10">
                        <div className="flex justify-between">
                            <div>
                            <h1 className="block text-lg md:text-2xl font-sriracha font-bold">One thing I will end...</h1>
                            <div>&nbsp;</div>
                            <p id = "journal-end" className="block text-xs lg:text-base" style={{ overflowWrap: 'break-word' }}>{journalEntry.journal_end}</p>
                            </div>
                        </div>
                    </div>
                    <div>&nbsp;</div>
                    <div style={dottedPaper} className="flex-grow rounded-md p-4 lg:p-10">
                        <div className="flex justify-between">
                            <div>
                            <h1 className="block text-lg md:text-2xl font-sriracha font-bold">One thing I will continue...</h1>
                            <div>&nbsp;</div>
                            <p id = "journal-continue" className="block text-xs lg:text-base" style={{ overflowWrap: 'break-word' }}>{journalEntry.journal_third}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-span-1'></div>
            </div>
        )}
      </div>
    </div>
  );
};

