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

export default function TestCheckInFlower() {

  const [isMoodDropDownVisible, setMoodDropDownVisible] = useState(false);
  const [isColorDropDownVisible, setColorDropDownVisible] = useState(false);
  const [moodDropDownWidth, setMoodDropDownWidth] = useState('auto');
  const [colorDropDownWidth, setColorDropDownWidth] = useState('auto');
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

  const moods = [
    {
      name: "Happy",
      color: "#FFD700",
    },
    {
      name: "Sad",
      color: "#FF0000",
    },
    {
      name: "Angry",
      color: "#FF4500",
    },
    {
      name: "Anxious",
      color: "#FF8C00",
    },
    {
      name: "Confused",
      color: "#FF69B4",
    },
    {
      name: "Excited",
      color: "#FF1493",
    },
    {
      name: "Grateful",
      color: "#FF69B4",
    },
    {
      name: "Hopeful",
      color: "#FFD700",
    }
  ]

  const colors = [
    {
      name: "Blue"
    }, 
    {
      name: "Dark Blue"
    }, 
    {
      name: "Grey"
    },
    {
      name: "Orange"
    },
    {
      name: "Pink"
    },
    {
      name: "Purple"
    },
    {
      name: "Red"
    },
    {
      name: "Yellow"
    }
  ]

  return (
    <div className='bg-[#77CDC0] w-screen h-screen items-center'>
        <h1 style={{
            fontSize: "3.75rem" ,
            paddingTop: '10vh',
        }} className='italic bold text-black text-center'>How are you feeling today?</h1>
        <div className='flex flex-row justify-between h-auto w-5/6 mx-auto items-center'  
        style={{ height: '75vh',
          paddingRight: '10vw',
          paddingLeft: '10vw',
         }}>
          <div className="flex flex-col" style={{ width: moodDropDownWidth }}>
            <button onClick={toggleMoodDropdown} type="button" style={{
              fontSize: "1.125rem",
              width: 'fit-content',
              alignSelf: 'start' 
            }} className="flex items-center text-black bg-white hover:bg-gray-200 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2">
              Mood
              <svg className="ml-6 flex-shrink-0" width="10" height="10" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.6401 2.7986e-05L7.50011 7.61603L0.360107 2.86102e-05L14.6401 2.7986e-05Z" fill="#222222"/>
              </svg>
            </button>
            <div ref={moodDropDownRef} 
              style={{ 
                display: isMoodDropDownVisible ? 'block' : 'none' 
              }}>
                <Card>
                  <CardHeader>
                    <CardDescription>What are you feeling?</CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2">
                    <div className="flex flex-col space-y-4 me-5">
                    {moods.filter((_, index) => index % 2 === 0).map((mood) => (
                      <p key={mood.name}>{mood.name}</p>
                    ))}
                    </div>
                    <div className="flex flex-col space-y-4">
                    {moods.filter((_, index) => index % 2 != 0).map((mood) => (
                      <p key={mood.name}>{mood.name}</p>
                    ))}
                    </div>
                  </CardContent>
              </Card>
            </div>
          </div>
            <div className='flex justify-center items-center w-1/2 h-3/4'>
                <img src="images/yellow_flower_6.svg" className="max-h-full max-w-full object-contain"></img>
            </div>
          <div className="flex flex-col" style={{ width: colorDropDownWidth }}>
            <button type="button" onClick={toggleColorDropdown} style={{
              fontSize: "1.125rem",
              width: 'fit-content',
              alignSelf: 'start' 
            }} className="inline-flex items-center text-black bg-yellow-300 hover:bg-yellow-400 hover:text-gray-200 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2">
              Color
              <svg className="ml-6 flex-shrink-0" width="10" height="10" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.6401 2.7986e-05L7.50011 7.61603L0.360107 2.86102e-05L14.6401 2.7986e-05Z" fill="#222222"/>
              </svg>
            </button>
           <div ref={ colorDropDownRef }
            style={{ 
              display: isMoodDropDownVisible ? 'block' : 'none' 
            }}>
                <Card>
                  <CardHeader>
                    <CardDescription>What are you feeling?</CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2">
                    <div className="flex flex-col space-y-4 me-5">
                    {colors.filter((_, index) => index % 2 === 0).map((color) => (
                      <p key={color.name}>{color.name}</p>
                    ))}
                    </div>
                    <div className="flex flex-col space-y-4">
                    {colors.filter((_, index) => index % 2 != 0).map((color) => (
                      <p key={color.name}>{color.name}</p>
                    ))}
                    </div>
                  </CardContent>
              </Card>
            </div>
          </div>
        </div>
    </div>
  )
}
