import React from 'react'
import { useState } from "react";


export default function HorizontalScroll({ slides }) {
  let [current, setCurrent] = useState(0);

  let previousSlide = () => {
    if (current === 0) setCurrent(slides.length - 1);
    else setCurrent(current - 1);
  };

  let nextSlide = () => {
    if (current === slides.length - 1) setCurrent(0);
    else setCurrent(current + 1);
  };

  return (
    <div className="overflow-hidden relative">
      <div
        className= "flex transition ease-out duration-40"
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {slides.map((s, i) => {
            return <div key={"image" + i} className="h-relative w-screen flex-shrink-0 flex flex-col justify-center items-center">
                      
                      <img id="Picture" src={s.imageURL} alt={`Art piece ${i}`} style={{ height: `calc(100vh - 200px)`}} className='block object-contain cursor-pointer'
                      onClick={() => {window.location.href=`/gallery-walk/${s.id}`, console.log('clocked')}}/>
                      <h1 className="text-white text-xs md:text-base font-sans block text-left">{s.artTitle}</h1>
                      <h1 className="text-white text-xs md:text-base font-sans block text-left">By: {s.artist}, {s.dateYear}</h1>
                      <h1 className="text-white text-xs font-sans block text-left">Click on the image to experience slow art</h1>
                      <div>&nbsp;</div>
                  </div>
        })}
      </div>

      <div className="absolute top-1/2 px-10">
        {/* Back button icon */}
        <button onClick={previousSlide}>
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="15" y2="4" />
            <line x1="5" y1="12" x2="15" y2="20" />
          </svg>
        </button>
      </div>
        
      <div className="absolute top-1/2 right-0 px-10">
        {/* Next button icon */}
        <button onClick={nextSlide}>
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="9" y1="4" x2="19" y2="12" />
            <line x1="9" y1="20" x2="19" y2="12" />
          </svg>
        </button>
      </div>

      {/* Dots below */}
      <div className="absolute bottom-0 py-1  w-full">
        <div className='flex justify-center gap-3'>
          {slides.map((s, i) => {
            return (
              <div
                onClick={() => {
                  setCurrent(i);
                }}
                key={"circle" + i}
                className={`rounded-full w-3 h-3 cursor-pointer  ${
                  i == current ? "bg-white" : "bg-gray-500"
                }`}
              ></div>
            );
          })}
        </div>
        
      </div>
    </div>
  );
}