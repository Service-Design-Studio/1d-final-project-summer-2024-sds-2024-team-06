import { useState, useRef, useEffect, useLayoutEffect } from "react";
import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle, 
} from "../components/Card";

const moods = [
  {
    name: "Happy",
    color: "#FFD700",
  },{
    name: "Sad",
    color: "#FF0000",
  },{
    name: "Angry",
    color: "#FF4500",
  },{
    name: "Anxious",
    color: "#FF8C00",
  },{
    name: "Confused",
    color: "#FF69B4",
  },{
    name: "Excited",
    color: "#FF1493",
  },{
    name: "Grateful",
    color: "#FF69B4",
  },{
    name: "Hopeful",
    color: "#FFD700",
  }
]

const colors = [
  {
    name: "Blue"
  }, {
    name: "Dark Blue"
  }, {
    name: "Grey"
  },{
    name: "Orange"
  },{
    name: "Pink"
  },{
    name: "Purple"
  },{
    name: "Red"
  },{
    name: "Yellow"
  }
]

export default function TestCheckInFlower() {

  const [isMoodDropDownVisible, setMoodDropDownVisible] = useState(false);
  const [isColorDropDownVisible, setColorDropDownVisible] = useState(false);
  const [currMood, setCurrMood] = useState(moods[0]);
  const [currColor, setCurrColor] = useState(colors[0]);
  const [currFlower, setCurrFlower] = useState(`images/flowers/${currColor.name.replace(/\s+/g, '').toLowerCase()}/${currColor.name.replace(/\s+/g, '').toLowerCase()}_flower_6.svg`);
  const moodDropDownRef = useRef(null);
  const colorDropDownRef = useRef(null);

  const toggleMoodDropdown = () => {
    setMoodDropDownVisible(!isMoodDropDownVisible);
  };

  const toggleColorDropdown = () => {
    setColorDropDownVisible(!isColorDropDownVisible);
  };

  useEffect(() => {
    if (moodDropDownRef.current) {
      setMoodDropDownWidth(`${moodDropDownRef.current.offsetWidth}px`);
      console.log(moodDropDownRef.current.offsetWidth);
    }
    if (colorDropDownRef.current) {
      setColorDropDownWidth(`${colorDropDownRef.current.offsetWidth}px`);
      console.log(colorDropDownRef.current.offsetWidth);
    }
  }, []);

  const changeMood = (newMood) => {
    console.log(newMood);
    setCurrMood(newMood);
    setMoodDropDownVisible(false);
  }

  const changeColor = (newColor) => {
    console.log(newColor);
    setCurrColor(newColor);
    const flowerColor = newColor.name.replace(/\s+/g, '').toLowerCase();
    const flowerNumber = Math.floor(Math.random() * 6) + 1;
    const flowerName = `images/flowers/${flowerColor}/${flowerColor}_flower_${flowerNumber}.svg`;
    setCurrFlower(flowerName);
    setColorDropDownVisible(false);
  }


  const submitFlower = (flowerData) => {
    fetch(`/api/flowers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ flower: flowerData })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Flower created:', data);
      onAddFlower(data);
    })
    .catch((error) => {
      console.error('Error creating flower:', error);
    });
  }


  return (
    <div className='bg-[#77CDC0] w-screen h-screen flex flex-col items-center'>
        <h1 style={{
            fontSize: "3.75rem" ,
            paddingTop: '10vh',
        }} className='italic bold text-black text-center'>How are you feeling today?</h1>
        <div className='grid grid-cols-3 w-5/6 mx-auto items-center'  
        style={{ height: '75vh',
          paddingRight: '10vw',
          paddingLeft: '10vw',
          paddingBottom: '5vh',
         }}>
          <div className="flex flex-col justify-center items-end">
            <div className="flex flex-col w-1/2 h-full max-auto">
            <button onClick={toggleMoodDropdown} type="button" style={{
              fontSize: "1.125rem",
              width: 'fit-content'
            }} className="flex items-center text-black bg-white hover:bg-gray-200 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 focus:ring-4 focus:ring-gray-300 focus:font-bold">
              {currMood.name}
              <svg className="ml-6 flex-shrink-0" width="10" height="10" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.6401 2.7986e-05L7.50011 7.61603L0.360107 2.86102e-05L14.6401 2.7986e-05Z" fill="#222222"/>
              </svg>
            </button>
            {isMoodDropDownVisible && <div ref={moodDropDownRef}>
                <Card>
                  <CardHeader>
                    <CardDescription>What are you feeling?</CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2">
                    <div className="flex flex-col space-y-4 me-5">
                    {moods.filter((_, index) => index % 2 === 0).map((mood) => (
                      <p className="hover:cursor-pointer hover:font-bold" onClick={() => changeMood(mood)} key={mood.name}>{mood.name}</p>
                    ))}
                    </div>
                    <div className="flex flex-col space-y-4">
                    {moods.filter((_, index) => index % 2 != 0).map((mood) => (
                      <p className="hover:cursor-pointer hover:font-bold" onClick={() => changeMood(mood)} key={mood.name}>{mood.name}</p>
                    ))}
                    </div>
                  </CardContent>
              </Card>
            </div>}
            </div>
          </div>
          <div className='flex flex-col justify-center items-center h-3/4'>
            <div className="h-full w-full flex justify-center items-center overflow-hidden">
              <img src={currFlower} className="object-contain max-h-full max-w-full h-auto"></img>
            </div>
          </div>
          <div className="flex flex-col justify-center items-start">
            <div className="flex flex-col w-1/2 h-full mx-auto">
            <button type="button" onClick={toggleColorDropdown} style={{
              fontSize: "1.125rem",
              width: 'fit-content' 
            }} className="inline-flex items-center text-black bg-yellow-300 hover:bg-yellow-400 hover:text-gray-200 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 focus:ring-4 focus:ring-yellow-500 focus:font-bold focus:text-gray-200">
              {currColor.name}
              <svg className="ml-6 flex-shrink-0" width="10" height="10" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.6401 2.7986e-05L7.50011 7.61603L0.360107 2.86102e-05L14.6401 2.7986e-05Z" fill="#222222"/>
              </svg>
            </button>
           {isColorDropDownVisible && <div ref={ colorDropDownRef }>
                <Card>
                  <CardHeader>
                    <CardDescription>Which color represents your emotions?</CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2">
                    <div className="flex flex-col space-y-4 me-5">
                    {colors.filter((_, index) => index % 2 === 0).map((color) => (
                      <p className="hover:cursor-pointer hover:font-bold" onClick={() => changeColor(color)} key={color.name}>{color.name}</p>
                    ))}
                    </div>
                    <div className="flex flex-col space-y-4">
                    {colors.filter((_, index) => index % 2 != 0).map((color) => (
                      <p className="hover:cursor-pointer hover:font-bold" onClick={() => changeColor(color)} key={color.name}>{color.name}</p>
                    ))}
                    </div>
                  </CardContent>
              </Card>
            </div>}
            </div>
          </div>
        </div>
        <button onClick={
                () => {
                  submitFlower({
                    mood: currMood.name,
                    color: currColor.name
                  });
                }
              } id="submit" className="text-sm md:text-base fixed bottom-2 rounded-full bg-white hover:bg-gray-200 text-black py-2 px-4">Submit</button>
    </div>
  )
}
