import React, { useState, useEffect } from 'react';
import useFetch from '../api/useFetch'
import Navigation from '../components/Navigation'
import Journal from '../components/JournalContainer'
import LoadingScreen from './Loading';

// to use brown paper paper background: <div style={dottedPaper}></div>
const brownPaper = {
  height: 'relative',
  background: 'url(/images/background-brown.svg) no-repeat center center fixed',
  backgroundSize: 'cover',
};


export default function JournalEntryHistory() {

  const apiUrl = gon.api_url;

   // Fetch data from two endpoints
   const { data: openJournals, error: openError, isPending: openIsPending, loadingProgress: openLoadingProgress } = useFetch(`${apiUrl}api/journals`);
   const { data: goalJournals, error: goalError, isPending: goalIsPending, loadingProgress: goalLoadingProgress } = useFetch(`${apiUrl}api/goal_journals`);

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
        const combinedEntries = [...openJournalsWithSource, ...goalJournalsWithSource];
        combinedEntries.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setEntries(combinedEntries);
      }
    }
  }, [openIsPending, goalIsPending, openError, goalError, openJournals, goalJournals]);

  // console.log("my open journals: ", openJournals)
  // console.log("my goal journals: ", goalJournals)
  // console.log("all journals: ", entries)

  if (loading) {
    return <LoadingScreen loadingProgress={goalLoadingProgress} />;
  }

  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col h-screen">
      <Navigation />
      <div style={brownPaper} className="flex-1 flex-grow p-4 lg:p-10">
      <Journal
          entries={entries}
          openIsPending={openIsPending}
          goalIsPending={goalIsPending}
          openError={openError}
          goalError={goalError}
        />
      </div>
    </div>
  );
};