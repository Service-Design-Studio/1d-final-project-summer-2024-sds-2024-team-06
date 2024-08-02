import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'

// imports from components
import useFetch from '../api/useFetch';
import Navigation from '../components/Navigation';
import AudioPlayer from '../components/GalleryAudioPlayer';

export default function GalleryWalkSession() {
  const{id} = useParams();
  const apiUrl = gon.api_url;
  console.log(id);
  const imageUrl = "https://www.nationalgallery.sg/sites/default/files/blog/San%20Minn-Age%20of%20Full%20Bloom_o4.jpg"

  const {data: artPiece, error, isPending, loadingProgress} = useFetch(`${apiUrl}/api/art_pieces/${id}`)
  console.log(artPiece);

  return (
    <div className='flex flex-col h-screen no-scrollbar'>
    <Navigation />

    {isPending && 
    <div className="h-full w-full flex justify-center items-center">
        <h1 className='h-full w-full'>Loading...</h1>
    </div>}

    {error && <div>{error}</div>}

    {artPiece && <AudioPlayer imageUrl={artPiece.imageURL} id={artPiece.artID} mp3={artPiece.audio} title={artPiece.artTitle} artist={artPiece.artist} captions={artPiece.captions}/>}

    </div>
  )
}
