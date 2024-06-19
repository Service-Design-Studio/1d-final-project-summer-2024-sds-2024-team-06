import React from 'react'
import { useParams } from 'react-router-dom'
import AudioPlayer from '../components/AudioPlayer';

export default function GalleryWalkSession() {
  const{id} = useParams();
  const imageUrl = "https://www.nationalgallery.sg/sites/default/files/blog/San%20Minn-Age%20of%20Full%20Bloom_o4.jpg"

  return (
    <div className='h-full'>
    <AudioPlayer imageUrl={imageUrl} id={id} />
    </div>
  )
}
