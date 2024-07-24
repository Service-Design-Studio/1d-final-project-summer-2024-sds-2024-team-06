import React, { useState, useEffect } from 'react';
import useFetch from '../api/useFetch'
import Navigation from '../components/Navigation'
import Journal from '../components/JournalContainer'
import ExpandableButton from '../components/ExpandableButton'

// to use dotted paper background: <div style={dottedPaper}></div>
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


export default function JournalEntryHistory() {

  const apiUrl = gon.api_url;

   // Fetch data from two endpoints
   const { data: openJournals, error: openError, isPending: openIsPending } = useFetch(`${apiUrl}api/journals`);
   const { data: goalJournals, error: goalError, isPending: goalIsPending } = useFetch(`${apiUrl}api/goal_journals`);

  // Combined state for loading, error, and data
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!openIsPending && !goalIsPending) {
      setLoading(false);

      if (openError) {
        setError(openError);
      } else if (goalError) {
        setError(goalError);
      } else {
        // Add source information and combine data
        const openJournalsWithSource = openJournals.map(entry => ({
          ...entry,
          source: 'open'
        }));
        const goalJournalsWithSource = goalJournals.map(entry => ({
          ...entry,
          source: 'goal'
        }));
        setEntries([...openJournalsWithSource, ...goalJournalsWithSource]);
      }
    }
  }, [openIsPending, goalIsPending, openError, goalError, openJournals, goalJournals]);

  // console.log("my open journals: ", openJournals)
  // console.log("my goal journals: ", goalJournals)
  // console.log("all journals: ", entries)


  if (loading) return <div className="h-full w-full flex justify-center items-center"><h1 className='text-4xl font-bold'>Loading journals...</h1></div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col h-screen">
      <Navigation />
      <div style={brownPaper} className="grid grid-rows-8 no-scrollbar">
        <div className="w-4/5 mx-auto px-4">
          <Journal entries={entries}></Journal>
        </div>
      </div>
    </div>
  );
};