import React from 'react'

import useFetch from '../components/useFetch'
import mockUseFetch from '../components/mockUseFetch' // data to show flowers rendering
import HorizontalScroll from '../components/HorizontalScroll'
import CalendarGrid from '../components/CalendarGrid'



// To use dotted paper background: <div style={dottedPaper}></div>
const greenLand = {
  height: '100vh',
  width: '100vw',
  background: 'url("https://t3.ftcdn.net/jpg/01/89/65/62/360_F_189656244_Z8CvqnmXU50rO0vwTLSPF5y3aUn1Pszp.jpg") no-repeat center center fixed',
  backgroundSize: 'cover',
};

//standard colors and emotions everyone starts off with
  //users cannot add/remove/change the mood name, but they can change the color and hexcode
  const standard_moods = [
    { name: 'Excited', color: 'Neon green', hexcode: '#39FF14' },
    { name: 'Very happy', color: 'Yellow', hexcode: '#FFFF00' },
    { name: 'Meh', color: 'Bright blue', hexcode: '#007FFF' },
    { name: 'Tired', color: 'Black', hexcode: '#000000' },
    { name: 'Content', color: 'Brown', hexcode: '#964B00' },
    { name: 'Angry', color: 'Red', hexcode: '#FF0000' },
    { name: 'Happy', color: 'Lime green', hexcode: '#32CD32' },
    { name: 'In love', color: 'Pink', hexcode: '#FFC0CB' },
    { name: 'Unhappy', color: 'Navy blue', hexcode: '#000080' },
    { name: 'Teary', color: 'Light purple', hexcode: '#E6E6FA' },
    { name: 'Upset', color: 'Dark blue', hexcode: '#00008B' },
    { name: 'Confused', color: 'Gray', hexcode: '#808080' },
  ]

export default function Checkin() {

  const {data: checkinData, error, isPending} = useFetch('http://127.0.0.1:3000/api/flowers')

  {/*console.log("Checkin component rendered");
  console.log(checkinData)
  const backgroundImageUrl = 'https://t3.ftcdn.net/jpg/01/89/65/62/360_F_189656244_Z8CvqnmXU50rO0vwTLSPF5y3aUn1Pszp.jpg';*/}


  return (
    <>
    {isPending && 
    <div className="h-full w-full flex justify-center items-center">
        <h1 className='h-full w-full'>Loading...</h1>
    </div>}
    {error && <div>{error}</div>}
    {checkinData && (
          <div style={greenLand} className="flex justify-center items-center no-scrollbar">
            <HorizontalScroll />
            <CalendarGrid checkinData={checkinData} />
          </div>
        )}
    </>

    
  );
};