import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import useFetch from '../api/useFetch';
import LoadingScreen from './Loading';

import Navigation from "../components/Navigation";
import JournalDetailOpen from '../components/JournalDetailOpen';
import JournalDetailGoal from '../components/JournalDetailGoal';
import JournalDetailArtwork from '../components/JournalDetailArtwork';


const brownPaper = {
  height: 'relative',
  background: 'url(/images/background-brown.svg) no-repeat center center fixed',
  backgroundSize: 'cover',
};


export default function JournalDetail() {
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  // Get the type from the query params
  const type = queryParams.get('type'); 
  const apiUrl = gon.api_url;
  const [isLoaded, setIsLoaded] = useState(false);

  // Determine which endpoint to use based on type
  const endpoint = type === 'open' ? `/api/journals/${id}` : `/api/goal_journals/${id}`;

  // Fetch data
  const { data: journalEntry, error, isPending, loadingProgress } = useFetch(`${apiUrl}${endpoint}`);

  // console.log(journalEntry);

  useEffect(() => {
    if (!isPending && !error) {
      setIsLoaded(true);
    }
  }, [isPending, error]);

  // if (!isLoaded) {
  //   return <LoadingScreen loadingProgress={loadingProgress} />;
  // }
  if (isPending){
    return <div className="h-full w-full flex justify-center items-center"><h1 className='text-4xl text-center font-bold'>Loading journal...</h1></div>;
  }

  if (error) return <div>Error: {error}</div>;


  return (
    <div className="flex flex-col h-screen">
      <Navigation />
      <div style={brownPaper} className="flex-1 grow p-4">
      <div>&nbsp;</div>
      <div>&nbsp;</div>

        {type === 'open' ? (
          // Render the open-journal layout
            <JournalDetailOpen journalEntry={journalEntry}/>
        ) : type === 'goal' ? (
          // Else render the goal-journal layout
          <JournalDetailGoal journalEntry={journalEntry}/>
        ) : type === 'gallery' ? (
          // Else render the gallery-journal layout
          <JournalDetailArtwork journalEntry={journalEntry}/>
        ) : (
          // Else render the echo-journal layout
          <JournalDetailArtwork journalEntry={journalEntry}/>
        )}
      </div>
    </div>
  );
};