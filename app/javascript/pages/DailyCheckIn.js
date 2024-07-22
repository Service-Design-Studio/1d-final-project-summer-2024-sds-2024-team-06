import React from 'react'
import { useState, useEffect } from "react";

import useFetch from '../api/useFetch'
//import mockUseFetch from '../components/mockUseFetch' // data to show flowers rendering
import CarouselSwipe from '../components/CarouselSwipe'
import HorizontalScroll from '../components/HorizontalScroll'
import CalendarGrid from '../components/CalendarGrid'



// To use dotted paper background: <div style={dottedPaper}></div>
const greenLand = {
  height: '100vh',
  width: '100vw',
  background: 'url("https://t3.ftcdn.net/jpg/01/89/65/62/360_F_189656244_Z8CvqnmXU50rO0vwTLSPF5y3aUn1Pszp.jpg") no-repeat center center fixed',
  backgroundSize: 'cover',
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
          <div style={greenLand} className="grid grid-rows-8 no-scrollbar"> 
            <div className="row-span-1" id="instructions">
            {/*Instructions layer*/}
              <h1 className='text-4xl font-bold'>Daily Check-in</h1>
              <h1 className='text-lg font-sans-800 text-grey'>How would you describe your mood?</h1>
            </div>
            <div className="row-span-6">
            {/*Flower field layer*/}
              <CalendarGrid checkinData={currData} />
            </div>
            <div className="row-span-1">
            {/*Mood carousel layer*/}
              {/*<HorizontalScroll  CarouselSwipe/>*/}
              <HorizontalScroll checkedIn={checkedIn} onAddFlower={addedFlower} />
            </div>
          </div>
        )}
    </>

    
  );
};