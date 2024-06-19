import React from 'react'
import DisplayTrack from './DisplayTrack'
import Controls from './Controls'
import ProgressBar from './ProgressBar'
import { useParams } from 'react-router-dom'

export default function AudioPlayer({imageUrl, id}) {

  const [currentTrack, setCurrentTrack] = React.useState(null)
  
  console.log(imageUrl);

  return (
  <div className='ml-20 h-full grid grid-cols-7 grid-rows-12 gap-10'>
        <div className='col-span-3 row-span-12 flex flex-col items-center justify-center'>
            <h1 className='text-4xl'>Artwork</h1>
            <img src={imageUrl} alt={id} className='border-4 border-black max-w-3/4 max-h-3/4 object-contain'/>
        </div>
        <div className='h-full col-span-4 row-span-2'> </div>
        <div className='h-full col-span-4 row-span-3 grid grid-row-2'> 
            <div className="row-span-1">
                <ProgressBar />
            </div>
            <div className='row-span-1'>
                <Controls />
            </div>
        </div>
        <div>
            <DisplayTrack />
        </div>
    </div>
    
  )
}
