import React, { useState, useEffect, useRef } from 'react';
import loadingUseFetch from '../api/loadingUseFetch';
import Navigation from '../components/Navigation'
import Journal from '../components/JournalContainer'
import LoadingScreen from './FlowerLoadScreen';
import JournalLoadScreen from './JournalLoadScreen';

// to use brown paper paper background: <div style={dottedPaper}></div>
const brownPaper = {
  height: 'relative',
  background: 'url(/images/background-brown.svg) no-repeat center center fixed',
  backgroundSize: 'cover',
};


export default function JournalEntryHistory() {

  const apiUrl = gon.api_url;

   // Fetch data from two endpoints
   const { data: openJournals, error: openError, isPending: openIsPending, loadingProgress: openLoadingProgress } = loadingUseFetch(`${apiUrl}api/journals`);
   const { data: goalJournals, error: goalError, isPending: goalIsPending, loadingProgress: goalLoadingProgress } = loadingUseFetch(`${apiUrl}api/goal_journals`);
   const { data: galleryJournals, error: galleryError, isPending: galleryIsPending, loadingProgress: galleryLoadingProgress } = loadingUseFetch(`${apiUrl}api/gallery_journals`);
   const { data: echoJournals, error: echoError, isPending: echoIsPending, loadingProgress: echoLoadingProgress } = loadingUseFetch(`${apiUrl}api/echoes_journals`);


  // Combined state for loading, error, and data
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!openIsPending && !goalIsPending && !galleryIsPending && !echoIsPending) {

      setLoading(false);
      if (openError) {
        setError(openError);
      } else if (goalError) {
        setError(goalError);
      } else if (galleryError) {
          setError(galleryError);
      } else if (echoError) {
        setError(echoError);
      }else {
        // Add source information and combine data
        const openJournalsWithSource = openJournals.map(entry => ({
          ...entry,
          source: 'open'
        }));
        const goalJournalsWithSource = goalJournals.map(entry => ({
          ...entry,
          source: 'goal'
        }));
        const galleryJournalsWithSource = galleryJournals.map(entry => ({
          ...entry,
          source: 'gallery'
        }));
        const echoJournalsWithSource = echoJournals.map(entry => ({
          ...entry,
          source: 'echo'
        }));

        const combinedEntries = [...openJournalsWithSource, ...goalJournalsWithSource,...galleryJournalsWithSource,...echoJournalsWithSource];
        combinedEntries.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setEntries(combinedEntries);
      }
    }
  }, [openIsPending, goalIsPending,galleryIsPending,echoIsPending, openError, goalError,galleryError,echoError, openJournals, goalJournals,galleryJournals,echoJournals]);


  // console.log("my open journals: ", openJournals)
  // console.log("my goal journals: ", goalJournals)
  //console.log("my gallery journals: ", galleryJournals)
  //console.log("Echo: ", echoJournals)
  // console.log("all journals: ", entries)

  if (loading) {
    const minLoadingProgress = Math.min(openLoadingProgress, goalLoadingProgress, galleryLoadingProgress, echoLoadingProgress);
    return <JournalLoadScreen loadingProgress={minLoadingProgress} />;
  }

  // if (loading) return <div className="h-full w-full flex justify-center items-center"><h1 className='text-4xl font-bold'>Loading journals...</h1></div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col h-screen">
      <Navigation />
      <div style={brownPaper} className="flex-1 flex-grow p-4 lg:p-10">
      <Journal
          entries={entries}
          openIsPending={openIsPending}
          goalIsPending={goalIsPending}
          galleryIsPending={galleryIsPending}
          echoIsPending={echoIsPending}
          openError={openError}
          goalError={goalError}
          galleryError={galleryError}
          echoError={echoError}
        />
      </div>
    </div>
  );
};