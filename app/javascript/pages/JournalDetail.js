import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Navigation from "../components/Navigation";
import TipCard from "../components/TipCard"
import useFetch from '../api/useFetch';


const bg = {
    height: '100vh',
    width: '100vw',
    background: 'url(/images/paperbg.jpg) no-repeat center center fixed',
    backgroundSize: 'cover',
  };


const JournalDetail = () => {

    const { id } = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get('type'); // Get the type from the query params
    const apiUrl = gon.api_url;
  
    // Determine which endpoint to use based on type
    const endpoint = type === 'open' ? `/api/journals/${id}` : `/api/goal_journals/${id}`;
  
    // Fetch data
    const { data: journalEntry, error, isPending } = useFetch(`${apiUrl}${endpoint}`);

    console.log(journalEntry)
    
    if (isPending) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div style={bg} className="flex flex-col h-screen">
          <Navigation />
          <div className="mx-auto p-4 flex space-y-4" style={{ width: '80%' }}>
            {type === 'open' ? (
              <>
                <div className="mx-auto flex space-x-4" style={{ width: '100%', height: '80vh' }}>
  <div className="flex-1 flex flex-col">
    <div className="bg-white rounded-md p-10 mt-4 flex-1">
      <div className="flex justify-between mt-4">
        <span className="text-4xl text-left font-bold mb-10">{journalEntry.journal_title}</span>
        <span className="text-m text-right text-gray-500 mt-10">{journalEntry.date_created}</span>
      </div>
      <p>{journalEntry.journalentry}</p>
    </div>
  </div>
  <div className="w-1/4 flex flex-col ">
      <TipCard
        tipTitle={journalEntry.tip_title}
        tipBody={journalEntry.tip_body}
      />
  </div>
</div>


              </>
            ) : (
              <>
              <span className="text-4xl text-left font-bold mb-10">{journalEntry.journal_title}</span>
              {/* start */}
                <div className="bg-white rounded-md p-10 mt-4">
                  <div className="flex justify-between mt-4">
                    <span className="text-4xl text-left font-bold mb-10">One thing I will start...</span>
                    <span className="text-m text-right text-gray-500 mt-10">{journalEntry.date_created}</span>
                  </div>
                  <p>{journalEntry.journal_start}</p>
                </div>
                {/* end */}
                <div className="bg-white rounded-md p-10 mt-4">
                  <div className="flex justify-between mt-4">
                    <span className="text-4xl text-left font-bold mb-10">One thing I will end...</span>
                    <span className="text-m text-right text-gray-500 mt-10">{journalEntry.date_created}</span>
                  </div>
                  <p>{journalEntry.journal_end}</p>
                </div>
                {/* continue */}
                <div className="bg-white rounded-md p-10 mt-4">
                  <div className="flex justify-between mt-4">
                    <span className="text-4xl text-left font-bold mb-10">One thing I will continue...</span>
                    <span className="text-m text-right text-gray-500 mt-10">{journalEntry.date_created}</span>
                  </div>
                  <p>{journalEntry.journal_third}</p>
                </div>
              </>
            )}
          </div>
        </div>
      );
    };
    
    export default JournalDetail;


// export default function JournalGoalForm() {
//     return (
//     <div class="flex flex-col h-screen">
//         <Navigation />
//         <div className="flex-1 bg-orange grow">
//         <div>&nbsp;</div>
//         <div>&nbsp;</div>
//             <div className="grid grid-cols-5">
//                 <div className='col-span-1'></div>
//                 {/*Title*/}
//                 <div className='col-span-3'>
//                     <h1 className='font-sans-900 font-bold'>Goal-setting Journal Entry</h1>
//                     <div>&nbsp;</div>
//                     {/*Main journal entry space*/}
//                     <div className="flex-grow rounded-md bg-white p-10">
//                         <div className="flex justify-between">
//                             <span class="text-left font-bold">Title</span>
//                             <span class="text-sm text-right text-grey">Write in short summary of what this entry is about</span>
//                         </div>
//                         <div>&nbsp;</div>
//                         <input id="goalsetting-title" class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" type="text"></input>
//                         <div>&nbsp;</div>
//                         <label for="goalsetting-start" class="font-bold">One thing I will start...</label>
//                         <div>&nbsp;</div>
//                         <textarea id="goalsetting-start" rows="5" class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"></textarea>
//                         <div>&nbsp;</div>
//                         <label for="goalsetting-stop" class="font-bold">One thing I will stop...</label>
//                         <div>&nbsp;</div>
//                         <textarea id="goalsetting-stop" rows="5" class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"></textarea>
//                         <div>&nbsp;</div>
//                         <label for="goalsetting-continue" class="font-bold">One thing I will continue...</label>
//                         <div>&nbsp;</div>
//                         <textarea id="goalsetting-continue" rows="5" class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"></textarea>
//                         <div>&nbsp;</div>
//                         <div class="flex justify-center">
//                             <button class="flex-1 bg-[#3655F4] hover:bg-[#2B44C1] text-white font-bold py-2 px-4">Submit</button>
//                         </div>
//                     </div>
//                 </div>
//                 <div className='col-span-1'></div>
//             </div>
//         </div>
//     </div>)
    

// }
