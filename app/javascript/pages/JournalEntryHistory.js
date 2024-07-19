import React, { useState, useEffect } from 'react';
import useFetch from '../api/useFetch'
import Navigation from '../components/Navigation'
import Journal from '../components/JournalEntryGrid'
import ExpandableButton from '../components/ExpandableButton'


export default function JournalEntryHistory() {

  const apiUrl = gon.api_url;

   // Fetch data from two endpoints
   const { data: openJournals, error: openError, isPending: openIsPending } = useFetch(`${apiUrl}api/journals`);
   const { data: goalJournals, error: goalError, isPending: goalIsPending } = useFetch(`${apiUrl}api/goal_journals`);
  //console.log(artPieces)
  // Combined state for loading, error, and data
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If both fetch requests are done (not pending)
    if (!openIsPending && !goalIsPending) {
      setLoading(false);

      if (openError) {
        setError(openError);
      } else if (goalError) {
        setError(goalError);
      } else {
        // Combine the data from both fetch requests
        setEntries([...openJournals, ...goalJournals]);
      }
    }
  }, [openIsPending, goalIsPending, openError, goalError, openJournals, goalJournals]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

  return (
    <div>
        <Navigation />
        {loading && 
      <div className="h-full w-full flex justify-center items-center">
        <h1 className='text-4xl font-bold'>Loading gallery...</h1>
      </div>}
      {error && <div>{error}</div>}
      {entries && 
      <>
      <h1 className='text-4xl font-bold'>Journals</h1>
      <Journal journals={entries}></Journal>
    
      </>}
    </div>
  );
};