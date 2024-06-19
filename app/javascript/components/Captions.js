import React from 'react'

export default function Captions({captions}) {
  
  
  return (
    <div className='bg-gray-800 text-white h-full w-full rounded-lg flex items-center justify-center p-10'>
        <span>Captions: {captions}</span>
    </div>
  )
}
