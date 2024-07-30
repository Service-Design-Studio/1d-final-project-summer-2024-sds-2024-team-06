import React from 'react'
import { useState, useEffect } from "react";

import useFetch from '../api/useFetch'
//import mockUseFetch from '../components/mockUseFetch' // data to show flowers rendering
import CarouselSwipe from '../components/CarouselSwipe'
import HorizontalScroll from '../components/HorizontalScroll'
import CalendarGrid from '../components/CalendarGrid'
import LoadingScreen from './Loading';



// To use dotted paper background: <div style={dottedPaper}></div>
const checkinbg = {
  height: '100vh',
  width: '100vw',
  background: 'url(/images/Landing1cropped.svg) center center',
  backgroundSize: 'cover',
  backgroundPosition: 'cover',
  overflow: 'hidden', // Prevent scrolling
};



export default function Checkin() {
  const apiUrl = gon.api_url;
  const {data: checkinData, error, isPending, loadingProgress} = useFetch(`${apiUrl}/api/flowers`)
  const [isLoaded, setIsLoaded] = useState(false);
  const [currData, setCurrData] = useState(null);

  useEffect(() => {
    if (checkinData) {
      setCurrData(checkinData);
    }
  }, [checkinData]);

  const addedFlower = (flowerData) => {
    setCurrData([...currData, flowerData]);
  };

  useEffect(() => {
    if (!isPending && !error) {
      setIsLoaded(true);
    }
  }, [isPending, error]);

  if (!isLoaded) {
    return <LoadingScreen loadingProgress={loadingProgress} />;
  }


  return (
    <>
    {/* {isPending && 
    <div className="h-full w-full flex justify-center items-center">
        <h1 className='h-full w-full'>Loading...</h1>
    </div>} */}
    {error && <div>{error}</div>} 
    {currData && isLoaded && (
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

// import React from 'react'
// import { useState } from "react";

// import useFetch from '../api/useFetch'
// import mockUseFetch from '../components/mockUseFetch' // data to show flowers rendering
// import CalendarGrid from '../components/CalendarGrid'
// import useFetch from '../api/useFetch'



// // To use dotted paper background: <div style={dottedPaper}></div>
// const moodbg = {
//   height: '100vh',
//   width: '100vw',
//   background: 'url(/images/Landing1.svg) no-repeat center center fixed',
//   backgroundSize: 'cover',
// };



// export default function Moodtracker() {
//   const apiUrl = gon.api_url;
//   // const {data: checkinData, error, isPending} = useFetch('https://ngswebapp-67fxypa3ea-as.a.run.app/api/flowers')
//   const {data: checkinData, error, isPending} = useFetch(`${apiUrl}/api/flowers`)

//   return (
//     <>
//     {isPending && 
//     <div className="h-full w-full flex justify-center items-center">
//         <h1 className='h-full w-full'>Loading...</h1>
//     </div>}
//     {error && <div>{error}</div>} 
//     {checkinData && (
//           <div style={moodbg} className="grid grid-rows-8 no-scrollbar"> 
//             <div className="row-span-1" id="instructions">
//             {/*Instructions layer*/}
//               <h1 className='text-4xl font-bold'>Mood tracker</h1>
//               <h1 className='text-lg font-sans-800 text-grey'>Your mood over the days:</h1>
//             </div>
//             <div className="row-span-6">
//             {/*Flower field layer*/}
//               <CalendarGrid checkinData={checkinData} />
//             </div>
//           </div>
//         )}
//     </>
//   );
// };