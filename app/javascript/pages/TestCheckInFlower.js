import { useState, useRef, useEffect } from "react";
import React from 'react'
import '../../assets/stylesheets/application.css';
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
  const [flowerNumber, setFlowerNumber] = useState(6);
  const [flowerColor, setFlowerColor] = useState(currColor.name.replace(/\s+/g, '').toLowerCase());
  const [currFlower, setCurrFlower] = useState(`images/flowers/${flowerColor}/${flowerColor}_flower_${flowerNumber}.svg`);
  const moodDropDownRef = useRef(null);
  const colorDropDownRef = useRef(null);

  const [moodMaxHeight, setMoodMaxHeight] = useState("0px");
  const [colorMaxHeight, setColorMaxHeight] = useState("0px");

  const [h1Style, setH1Style] = useState({
    opacity: 0,
    transform: "translateY(-100%)",
    transition: "opacity 0.5s, transform 0.7s",
  });
  const [moodButtonStyle, setmoodButtonStyle] = useState({
    opacity: 0,
    transform: "translateX(-100%)",
    transition: "opacity 0.5s, transform 0.8s",
  });
  const [colorButtonStyle, setcolorButtonStyle] = useState({
    opacity: 0,
    transform: "translateX(100%)",
    transition: "opacity 0.5s, transform 0.8s",
  });
  const [flowerStyle, setFlowerStyle] = useState({
    opacity: 0,
    transform: "translateY(100%)",
    transition: "opacity 0.5s, transform 0.8s",
  });
  const [submitButtonStyle, setSubmitButtonStyle] = useState({
    opacity: 0,
    transition: "opacity 0.5s ease-in",
  });

  useEffect(() => {
    setTimeout(() => {
      setH1Style({
        opacity: 1,
        transform: "translateY(0)",
        transition: "opacity 0.5s, transform 0.7s",
      });
      setmoodButtonStyle({
        opacity: 1,
        transform: "translateX(0)",
        transition: "opacity 0.5s, transform 0.8s",
      });
      setcolorButtonStyle({
        opacity: 1,
        transform: "translateX(0)",
        transition: "opacity 0.5s, transform 0.8s",
      });
      setFlowerStyle({
        opacity: 1,
        transform: "translateY(0)",
        transition: "opacity 0.5s, transform 0.8s",
      });
    }, 100);
    
    setTimeout(() => {
      setSubmitButtonStyle({
        opacity: 1,
        transition: "opacity 0.5s ease-in",
      });
    }, 1000); 
  }, []);


  const toggleMoodDropdown = () => {
    setMoodDropDownVisible(!isMoodDropDownVisible);
  };

  const toggleColorDropdown = () => {
    setColorDropDownVisible(!isColorDropDownVisible);
  };

  useEffect(() => {
    if (moodDropDownRef.current) {
      setMoodMaxHeight(`${moodDropDownRef.current.scrollHeight}px`);
    }
    if (colorDropDownRef.current) {
      setColorMaxHeight(`${colorDropDownRef.current.scrollHeight}px`);
    }
  }, [isMoodDropDownVisible, isColorDropDownVisible]);

  const changeMood = (newMood) => {
    console.log(newMood);
    const newFlowerNumber = moods.findIndex(mood => mood.name === newMood.name) + 1;
    setFlowerNumber(newFlowerNumber);
    setCurrMood(newMood);
    setCurrFlower(`images/flowers/${flowerColor}/${flowerColor}_flower_${newFlowerNumber}.svg`);
    
  }

  const changeColor = (newColor) => {
    console.log(newColor);
    const newFlowerColor = newColor.name.replace(/\s+/g, '').toLowerCase();
    setFlowerColor(newFlowerColor);
    setCurrColor(newColor);
    setCurrFlower(`images/flowers/${newFlowerColor}/${newFlowerColor}_flower_${flowerNumber}.svg`);
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
    <div className='w-full h-full flex flex-col items-center'>
        <h1
          style={{ ...h1Style, fontSize: "3.75rem", paddingTop: "10vh" }}
          className="italic bold text-black text-center"
        >
          How are you feeling today?
        </h1>
        <div className='grid grid-cols-3 w-5/6 md:w-11/12 mx-auto items-center'  
        style={{ height: '75vh',
          paddingRight: '10vw',
          paddingLeft: '10vw',
          paddingBottom: '5vh',
         }}>
          <div className="flex flex-col justify-center items-end"
          style={{
            ...moodButtonStyle
          }}>
            <div className="flex flex-col w-full h-full items-end">
            <button onClick={toggleMoodDropdown} type="button" style={{
              fontSize: "1.125rem",
              width: 'fit-content'
            }} className="flex items-center text-black bg-white hover:bg-gray-200 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 focus:ring-4 focus:ring-gray-300 focus:font-bold">
              {currMood.name}
              <svg className="ml-6 flex-shrink-0" width="10" height="10" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.6401 2.7986e-05L7.50011 7.61603L0.360107 2.86102e-05L14.6401 2.7986e-05Z" fill="#222222"/>
              </svg>
            </button>
            <div id="moodDropDown" ref={moodDropDownRef} 
              style={{
                transition: 'max-height 0.35s ease-in-out',
                overflow: 'hidden',
                maxHeight: isMoodDropDownVisible ? moodMaxHeight : '0',
              }}
              className="w-3/5">
                <Card>
                  <CardHeader>
                    <CardDescription>How are you feeling today?</CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-5">
                    <div className="flex flex-col space-y-4">
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
            </div>
            </div>
          </div>
          <div className='flex flex-col justify-center items-end'
          style={{
            ...flowerStyle,
            height: '56.25vh'
          }}>
            <img src={currFlower} className="object-contain h-full w-full"></img>
          </div>
          <div className="flex flex-col justify-center items-start"
          style={{
            ...colorButtonStyle
          }}>
            <div className="flex flex-col h-full w-full items-start">
            <button type="button" onClick={toggleColorDropdown} style={{
              fontSize: "1.125rem",
              width: 'fit-content' 
            }} className="inline-flex items-center text-black bg-yellow-300 hover:bg-yellow-400 hover:text-gray-200 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 focus:ring-4 focus:ring-yellow-500 focus:font-bold focus:text-gray-200">
              {currColor.name}
              <svg className="ml-6 flex-shrink-0" width="10" height="10" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.6401 2.7986e-05L7.50011 7.61603L0.360107 2.86102e-05L14.6401 2.7986e-05Z" fill="#222222"/>
              </svg>
            </button>
           <div ref={ colorDropDownRef } 
            style={{
                transition: 'max-height 0.35s ease-in-out',
                overflow: 'hidden',
                maxHeight: isColorDropDownVisible ? colorMaxHeight : '0',
              }}
              className="w-3/5">
                <Card>
                  <CardHeader>
                    <CardDescription>Which color represents your emotions?</CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-5">
                    <div className="flex flex-col space-y-4">
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
            </div>
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
              } id="submit" className="text-sm md:text-base fixed bottom-2 rounded-full bg-white hover:bg-gray-200 text-black py-2 px-5 mb-2"
              style={{
                ...submitButtonStyle
              }}>Submit</button>
    </div>
  )
}
