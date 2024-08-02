import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'

// imports from components
import useFetch from '../api/useFetch';
import Navigation from '../components/Navigation';
import LoadingScreen from './Loading';

import AudioPlayer from '../components/GalleryAudioPlayer';

export default function GalleryWalkSession() {
  const{id} = useParams();
  const apiUrl = gon.api_url;
  console.log(id);

  const {data: artPiece, artPieceError, isPending, loadingProgress} = useFetch(`${apiUrl}/api/art_pieces/${id}`)
  // console.log(artPiece);

  // Combined state for loading, error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isPending) {
      setLoading(false);

      if (artPieceError) {
        setError(artPieceError);
      } 
    }
  });

  if (loading) {
    return <LoadingScreen loadingProgress={loadingProgress} />;
  }

  if (error) return <div>{error}</div>;


  return (
    <div className='flex flex-col h-screen no-scrollbar'>
    <Navigation />
    <AudioPlayer imageUrl={artPiece.imageURL} id={artPiece.artID} mp3={artPiece.audio} title={artPiece.artTitle} artist={artPiece.artist} captions={artPiece.captions}/>
    </div>
  )
}
