import React from 'react'

export default function TestCheckIn() {
  return (
    <div className='bg-[#77CDC0] w-screen h-screen flex justify-center items-center' onClick={() => {window.location.href="/check-in"}}>
      <div className='flex flex-row justify-between w-3/4 text-center'>
        <div className='w-3/4'>
          <h1 
            style={{ fontSize: "3.75rem" , fontWeight: 800, marginRight: '7vw' }} 
            className='italic text-black text-right'>
            First of all...
          </h1>
          <h1 
            style={{ fontSize: "3.75rem", marginTop: '5px', fontWeight: 800, marginLeft: '5vw' }} 
            className='italic text-[#F2FEDC] text-right'>
            Breathe
          </h1>
        </div>
        <img 
          src="images/cloud.png" 
          alt="Cloud" 
          style={{ marginLeft: '15vw' }} 
        />
      </div>
      <button id="continue" className="text-sm md:text-base fixed bottom-2 rounded-full bg-white hover:bg-gray-200 text-black py-2 px-4">Click anywhere to continue</button>
    </div>
  )
}
