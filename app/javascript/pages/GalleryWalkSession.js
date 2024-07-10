import React from 'react'
import { useParams } from 'react-router-dom'

// imports from components
import useFetch from '../components/useFetch';
import Navigation from '../components/Navigation';
import AudioPlayer from '../components/AudioPlayer';

export default function GalleryWalkSession() {
  const{id} = useParams();
  console.log(id);
  const imageUrl = "https://www.nationalgallery.sg/sites/default/files/blog/San%20Minn-Age%20of%20Full%20Bloom_o4.jpg"
  const {data: artPiece, error, isPending} = useFetch(`http://127.0.0.1:3000/api/art_pieces/${artID}`)
  console.log(artPiece);

  return (
    <>
    <Navigation />
    <div className='h-full'>
    {isPending && 
    <div className="h-full w-full flex justify-center items-center">
        <h1 className='h-full w-full'>Loading...</h1>
    </div>}
    {error && <div>{error}</div>}
    {artPiece && <AudioPlayer imageUrl={artPiece.imageURL} id={artPiece.artID} mp3={artPiece.audio} title={artPiece.artTitle} captions={artPiece.captions}/>}
    </div>
    </>
  )
}
