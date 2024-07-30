import React from 'react'
import { useState, useEffect } from "react";

import useFetch from '../api/useFetch'
//import mockUseFetch from '../components/mockUseFetch' // data to show flowers rendering
import CarouselSwipe from '../components/CarouselSwipe'
import HorizontalScroll from '../components/HorizontalScroll'
import CalendarGrid from '../components/CalendarGrid'



// To use dotted paper background: <div style={dottedPaper}></div>
const checkinbg = {
  height: '100vh',
  width: '100vw',
  background: 'url(/images/Landing1cropped.svg) center center',
  backgroundSize: 'contain',
  backgroundPosition: 'contain bottom',
  overflow: 'hidden', // Prevent scrolling
};



export default function Checkin() {
  const apiUrl = gon.api_url;
  const {data: checkinData, error, isPending} = useFetch(`${apiUrl}/api/flowers`)
  const checkedIn = false
  const [currData, setCurrData] = useState(null);

  useEffect(() => {
    if (checkinData) {
      setCurrData(checkinData);
    }
  }, [checkinData]);

  const addedFlower = (flowerData) => {
    setCurrData([...currData, flowerData]);
  };

  return (
    <>
    {isPending && 
    <div className="h-full w-full flex justify-center items-center">
        <h1 className='h-full w-full'>Loading...</h1>
    </div>}
    {error && <div>{error}</div>} 
    {currData && (
          <div style={checkinbg} className="flex flex-col flex-grow" > 
            <div className="row-span-1 flex flex-col justify-center items-center text-center" id="instructions" style={{height:"45vh"}}>
            {/*Instructions layer*/}
              <h1 className='text-4xl font-bold'>Your year in moods</h1>
              <h1 className='text-lg font-sans-800 text-grey'>Keep your garden flourishing by consistently checking in</h1>
            </div>
            <div style={{height:"55vh"}}>
            {/*Flower field layer*/}
              <div className= "grid grid-rows-6 gap-4">
              <CalendarGrid checkinData={currData} />
              </div>
            </div>
          </div>
        )}
    </>

    
  );
};