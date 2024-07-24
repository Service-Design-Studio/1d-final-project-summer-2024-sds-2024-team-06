import { useState } from "react";
import React from 'react'

export default function TestCheckInFlower() {

  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <div className='bg-[#77CDC0] w-screen h-screen items-center'>
        <h1 style={{
            fontSize: "3.75rem" ,
            paddingTop: '10vh',
        }} className='italic bold text-black text-center'>How are you feeling today?</h1>
        <div className='flex flex-col justify-between w-5/6 h-full'>
            <button 
            onClick={toggleDropdown} 
            style={{
                marginBottom: isDropdownVisible ? '10px' : '0',
                transition: 'margin-bottom 0.3s ease'
            }} 
            className='bg-blue-500 text-white py-2 px-4 rounded'>
            Click me
            </button>
            {isDropdownVisible && (
            <div className='bg-white shadow-md rounded mt-2 p-4'>
                <ul>
                <li className='py-1'>Option 1</li>
                <li className='py-1'>Option 2</li>
                <li className='py-1'>Option 3</li>
                </ul>
            </div>
            )}
        </div>
    </div>
  )
}
