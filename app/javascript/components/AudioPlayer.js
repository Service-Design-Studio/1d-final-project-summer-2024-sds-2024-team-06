import React from 'react'
import DisplayTrack from './DisplayTrack'
import Controls from './Controls'
import ProgressBar from './ProgressBar'
import { useParams } from 'react-router-dom'

export default function AudioPlayer({imageUrl, id}) {

  const [currentTrack, setCurrentTrack] = React.useState(null)
  
  console.log(imageUrl);

  return (

    <div className='h-full w-full flex flex-col'>
        <div className='w-full flex justify-center items-center p-7'>
            <h1 className='text-4xl font-bold'>Gallery Walk Session</h1>
        </div>
        <div className='w-full flex flex-row justify-start'> 
            <div className="flex flex-col h-full items-center justify-center mt-10">
                <img src={imageUrl} alt={id} className="border-4 border-black w-400 max-h-full object-contain"/>
            </div>
            <div className='h-full w-full mt-20 mr-9 flex flex-col gap-5 ml-9'> 
                <div className='w-full'>
                    <ProgressBar />
                </div>
                <div className='w-full'>
                    <Controls />
                </div>
                <div className='w-full h-full'>
                    <DisplayTrack />
                </div>
            </div>
        </div>   
    </div>
    
  )
}
