import React from 'react'
import { useState, useEffect } from 'react';
import FlowerSelect from './FlowerSelect';

export default function CheckIn() {

  const [chooseFlower, setChooseFlower] = useState(false);
  const [exit, setExit] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("#77CDC0");

  useEffect(() => {
    const handleBackgroundColorChange = (event) => {
      if (event.detail.backgroundColor) {
        setBackgroundStyle({
          backgroundColor, transition: 'background-color 1s'});
        setBackgroundColor(event.detail.backgroundColor);
      }
    };

    window.addEventListener('backgroundColorChange', handleBackgroundColorChange);

    return () => {
      window.removeEventListener('backgroundColorChange', handleBackgroundColorChange);
    };
  }, []);

  const [backgroundStyle, setBackgroundStyle] = useState({
    opacity: 0,
    transition: "opacity 0.9s ease-in",
  });

  const [firstLineStyle, setFirstLineStyle] = useState({
    opacity: 0,
    transform: "translateX(-100%)",
    transition: "opacity 0.5s, transform 0.8s",
  });

  const [secondLineStyle, setSecondLineStyle] = useState({
    opacity: 0,
    transform: "translateX(-100%)",
    transition: "opacity 0.5s, transform 0.8s",
  });

  const [imagesStyle, setImagesStyle] = useState({
    opacity: 0,
    transform: "translateX(100%)",
    transition: "opacity 0.5s, transform 0.8s",
  });

  const [submitButtonStyle, setSubmitButtonStyle] = useState({
    opacity: 0,
    transition: "opacity 0.5s ease-in",
  });

  useEffect(() => {
    setTimeout(() => {
      setBackgroundStyle({
        opacity: 1,
        transition: "opacity 0.8s ease-in",
      });
    }, 100);

    setTimeout(() => {
      setFirstLineStyle({
        opacity: 1,
        transform: "translateX(0)",
        transition: "opacity 0.5s, transform 0.9s",
      });
    }, 1000);

    setTimeout(() => {
      setSecondLineStyle({
        opacity: 1,
        transform: "translateX(0)",
        transition: "opacity 0.5s, transform 0.9s",
      });
    }, 1100);

    setTimeout(() => {
      setImagesStyle({
        opacity: 1,
        transform: "translateX(0)",
        transition: "opacity 0.5s, transform 0.9s",
      });
    }, 1200);

    setTimeout(() => {
      setSubmitButtonStyle({
        opacity: 1,
        transition: "opacity 0.5s ease-in",
      });
    }, 1800);
  }, []);

  const handleExit = () => {
    setExit(true);
    setTimeout(() => {
      setChooseFlower(true);
    }, 800);
  };

  useEffect(() => {
    if (exit) {
      setFirstLineStyle({
        opacity: 0,
        transform: "translateX(-100%)",
        transition: "opacity 0.5s, transform 0.8s",
      });
      setSecondLineStyle({
        opacity: 0,
        transform: "translateX(-100%)",
        transition: "opacity 0.5s, transform 0.8s",
      });
      setImagesStyle({
        opacity: 0,
        transform: "translateX(100%)",
        transition: "opacity 0.5s, transform 0.8s",
      });
      setSubmitButtonStyle({
        opacity: 0,
        transition: "opacity 0.4s ease-in",
      });
    }
  }, [exit]);


  return (
    <div style={{
      ...backgroundStyle,
      backgroundColor: backgroundColor
    }} className="w-screen h-screen">
    {chooseFlower ? <FlowerSelect /> : <div className='w-screen h-screen flex justify-center items-center' onClick={handleExit}>
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
      <button style={{
        ...submitButtonStyle
      }} id="continue" className="text-sm md:text-base fixed bottom-2 rounded-full bg-white hover:bg-gray-200 text-black py-2 px-4">Click anywhere to continue</button>
    </div>}
    </div>
  )
}
