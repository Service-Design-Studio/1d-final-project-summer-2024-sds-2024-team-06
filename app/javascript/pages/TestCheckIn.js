import React from 'react'
import { useState, useEffect } from 'react';

export default function TestCheckIn() {

  const [firstLineStyle, setFirstLineStyle] = useState({
    opacity: 0,
    transform: "translateX(-100%)",
    transition: "opacity 0.5s, transform 0.6s",
  });

  const [secondLineStyle, setSecondLineStyle] = useState({
    opacity: 0,
    transform: "translateX(-100%)",
    transition: "opacity 0.5s, transform 0.6s",
  });

  const [imagesStyle, setImagesStyle] = useState({
    opacity: 0,
    transform: "translateX(100%)",
    transition: "opacity 0.5s, transform 0.6s",
  });

  useEffect(() => {
    setTimeout(() => {
      setFirstLineStyle({
        opacity: 1,
        transform: "translateX(0)",
        transition: "opacity 0.5s, transform 0.6s",
      });
    }, 100);

    setTimeout(() => {
      setSecondLineStyle({
        opacity: 1,
        transform: "translateX(0)",
        transition: "opacity 0.5s, transform 0.6s",
      });
    }, 200);

    setTimeout(() => {
      setImagesStyle({
        opacity: 1,
        transform: "translateX(0)",
        transition: "opacity 0.5s, transform 0.6s",
      });
    }, 300);
  }, []);

  return (
    <div className='bg-[#77CDC0] w-screen h-screen flex justify-center items-center' onClick={() => {window.location.href="/check-in"}}>
      <div className='flex flex-row justify-between w-5/6'>
        <div className='w-3/4 flex flex-col justify-center'>
          <h1 
            style={{ ...firstLineStyle, fontSize: '3.75vw', fontWeight: 800, marginLeft: '3.5vw' }} 
            className='italic text-black text-left'>
            First of all...
          </h1>
          <h1 
            style={{ ...secondLineStyle, fontSize: '3.75vw', marginTop: '5px', fontWeight: 800, marginLeft: '5vw' }} 
            className='italic text-[#F2FEDC] text-center'>
            Breathe
          </h1>
        </div>
        <img 
          src="images/cloud.png" 
          alt="Cloud" 
          style={{ ...imagesStyle, marginRight: '13vw' }} 
        />
      </div>
      <button id="continue" className="text-sm md:text-base fixed bottom-2 rounded-full bg-white hover:bg-gray-200 text-black py-2 px-4">Click anywhere to continue</button>
    </div>
  )
}
