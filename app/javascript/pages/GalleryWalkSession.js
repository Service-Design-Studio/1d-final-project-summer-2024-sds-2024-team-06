import React from 'react'
import { useParams } from 'react-router-dom'
import AudioPlayer from '../components/AudioPlayer';
import useFetch from '../components/useFetch';

export default function GalleryWalkSession() {
  const{id} = useParams();
  console.log(id);
  const imageUrl = "https://www.nationalgallery.sg/sites/default/files/blog/San%20Minn-Age%20of%20Full%20Bloom_o4.jpg"
  const {data: artPiece, error, isPending} = useFetch(`https://ngswebapp-67fxypa3ea-as.a.run.app/api/art_pieces/${id}`)
  console.log(artPiece);

  return (
    <div className='h-full'>
    {isPending && 
    <div className="h-full w-full flex justify-center items-center">
        <h1 className='h-full w-full'>Loading...</h1>
    </div>}
    {error && <div>{error}</div>}
    {artPiece && <AudioPlayer imageUrl={artPiece.image_url} id={artPiece.id} mp3={artPiece.artvoice} title={artPiece.artTitle} captions={artPiece.captions}/>}
    </div>
  )
}
