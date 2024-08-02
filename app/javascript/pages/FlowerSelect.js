import { useState, useRef, useEffect } from "react";
import React from 'react'
import { useNavigate } from "react-router-dom";
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
    name: "Happy"
  },{
    name: "Upset"
  },{
    name: "Angry"
  },{
    name: "Anxious"
  },{
    name: "Confused"
  },{
    name: "In Love"
  },{
    name: "Tired"
  },{
    name: "Meh"
  }
]

const colors = [
  {
    name: "Blue",
    hexcode: "#85D4FF",
  }, {
    name: "Dark Blue",
    hexcode: "#11055C",
  }, {
    name: "Grey",
    hexcode: "#ADADAD",
  },{
    name: "Orange",
    hexcode: "#ED6D48",
  },{
    name: "Pink",
    hexcode: "#FFC7E7", 
  },{
    name: "Purple",
    hexcode: "#5309CD",
  },{
    name: "Red",
    hexcode: "#D0453B",
  },{
    name: "Yellow",
    hexcode: "#FDDF19",
  }
]

export default function FlowerSelect() {

  const navigate = useNavigate();
  const [isMoodDropDownVisible, setMoodDropDownVisible] = useState(false);
  const [isColorDropDownVisible, setColorDropDownVisible] = useState(false);
  const [currMood, setCurrMood] = useState(moods[0]);
  const [currColor, setCurrColor] = useState(colors[0]);
  const [flowerNumber, setFlowerNumber] = useState(1);
  const [flowerColor, setFlowerColor] = useState(currColor.name.replace(/\s+/g, '').toLowerCase());
  const [currFlower, setCurrFlower] = useState(`images/flowers/${flowerColor}/${flowerColor}_flower_${flowerNumber}.svg`);
  const moodDropDownRef = useRef(null);
  const colorDropDownRef = useRef(null);

  const [moodMaxHeight, setMoodMaxHeight] = useState("0px");
  const [colorMaxHeight, setColorMaxHeight] = useState("0px");

  const [isLoading, setIsLoading] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('#77CDC0');

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
    console.log(`images/flowers/${flowerColor}/${flowerColor}_flower_${newFlowerNumber}.svg`);
  }

  const changeColor = (newColor) => {
    console.log(newColor);
    const newFlowerColor = newColor.name.replace(/\s+/g, '').toLowerCase();
    setFlowerColor(newFlowerColor);
    setCurrColor(newColor);
    setCurrFlower(`images/flowers/${newFlowerColor}/${newFlowerColor}_flower_${flowerNumber}.svg`);
    console.log(`images/flowers/${newFlowerColor}/${newFlowerColor}_flower_${flowerNumber}.svg`);
  }

  const getLuminance = (hex) => {
    const rgb = parseInt(hex.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >>  8) & 0xff;
    const b = (rgb >>  0) & 0xff;
    const l = 0.2126 * r + 0.7152 * g + 0.0722 * b; 
    return l;
  };

  function darkenColor(hex, percent) {
    let num = parseInt(hex.slice(1), 16),
        amt = Math.round(2.55 * percent),
        R = (num >> 16) - amt,
        G = (num >> 8 & 0x00FF) - amt,
        B = (num & 0x0000FF) - amt;

    console.log("#" + (0x1000000 + (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 + (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 + (B < 255 ? (B < 1 ? 0 : B) : 255)).toString(16).slice(1).toUpperCase());
  
    return "#" + (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    ).toString(16).slice(1).toUpperCase();
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
      setIsLoading(false);
      setBackgroundColor('white');
      const event = new CustomEvent('backgroundColorChange', { detail: { backgroundColor: 'white' } });
      window.dispatchEvent(event);
      setH1Style({
        opacity: 0,
        transform: "translateY(-100%)",
        transition: "opacity 0.8s transform 0.8s ease-in",
      });
      setmoodButtonStyle({
        opacity: 0,
        transform: "translateX(-100%)",
        transition: "opacity 0.8s transform 0.8s ease-in",
      });
      setcolorButtonStyle({
        opacity: 0,
        transform: "translateX(100%)",
        transition: "opacity 0.8s transform 0.8s ease-in",
      });
      setFlowerStyle({
        opacity: 0,
        transform: "translateZ(250px)",
        transition: "opacity 1s transform 1s ease-in",
      });
      setSubmitButtonStyle({
        opacity: 0,
        transition: "opacity 0.5s ease-in",
      });
      setTimeout(() => {
        navigate('/mood-tracker');
      }, 1500);
      })
    .catch((error) => {
      console.error('Error creating flower:', error);
      setIsLoading(false);
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
            <button id="mood-dropdown" onClick={toggleMoodDropdown} type="button" style={{
              fontSize: "1.125rem",
              width: 'fit-content'
            }} className="flex items-center text-black bg-white hover:bg-gray-200 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 focus:ring-4 focus:ring-gray-300 focus:font-bold">
              {currMood.name}
              <svg className="ml-6 flex-shrink-0" width="10" height="10" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.6401 2.7986e-05L7.50011 7.61603L0.360107 2.86102e-05L14.6401 2.7986e-05Z" fill="#222222"/>
              </svg>
            </button>
            <div id="mood-dropdown" ref={moodDropDownRef} 
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
            <button id="color-dropdown" type="button" onClick={toggleColorDropdown} style={{
              fontSize: "1.125rem",
              width: 'fit-content',
              background: currColor.hexcode,
              color: getLuminance(currColor.hexcode) > 128 ? 'black' : 'white',
              outline: `3px solid ${darkenColor(currColor.hexcode, 20)}`
            }} className="inline-flex items-center font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 focus:font-bold">
              {currColor.name}
              <svg className="ml-6 flex-shrink-0" width="10" height="10" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.6401 2.7986e-05L7.50011 7.61603L0.360107 2.86102e-05L14.6401 2.7986e-05Z" fill={getLuminance(currColor.hexcode) > 128 ? '#222222' : '#FFFFFF'}/>
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
                  <CardContent className="grid grid-cols-2 gap-5 pb-0">
                    <div className="flex flex-col space-y-2">
                    {colors.filter((_, index) => index % 2 === 0).map((color) => (
                      // <p className="hover:cursor-pointer hover:font-bold" onClick={() => changeColor(color)} key={color.name}>{color.name}</p>
                      <Circle key={color.name} color={color} handlePresetColorChange={changeColor}/>
                    ))}
                    </div>
                    <div className="flex flex-col space-y-2">
                    {colors.filter((_, index) => index % 2 != 0).map((color) => (
                      // <p className="hover:cursor-pointer hover:font-bold" onClick={() => changeColor(color)} key={color.name}>{color.name}</p>
                      <Circle key={color.name} color={color} handlePresetColorChange={changeColor}/>
                    ))}
                    </div>
                  </CardContent>
              </Card>
            </div>
            </div>
          </div>
        </div>
       {isLoading ? <div role="status">
                        <svg aria-hidden="true" class="fixed bottom-2 mb-2 inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span class="sr-only">Loading...</span>
                    </div> 
                    : 
              <button onClick={
                () => {
                  setIsLoading(true);
                  submitFlower({
                    mood: currMood.name,
                    color: currColor.name
                  });
                }
              } id="submit" className="text-sm md:text-base fixed bottom-2 rounded-full bg-white hover:bg-gray-200 text-black py-2 px-5 mb-2"
              style={{
                ...submitButtonStyle
              }}>Submit</button>}
    </div>
  )
}


function Circle({color, handlePresetColorChange}) {
  return (
    <div>
      <span
      id={color.name}
      className="hover:bg-gray-300 hover:rounded-lg hover:cursor-pointer justify-center flex"  
      onClick={() => {
          handlePresetColorChange(color);
      }} 
      style={{
          width: "42%",
          paddingTop: "42%",
          background: color.hexcode,
          borderRadius: "50%",
          display: "inline-block",
          marginBottom: "15px",
          boxSizing: "border-box",
          position: "relative"
      }}>
      </span>
    </div>
  )
}