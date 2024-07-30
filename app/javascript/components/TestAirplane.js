import React from 'react';
const airplaneStyle = {
    width: '100px',
    position: 'absolute',
    top: '150px', // adjust to satisfactory position
    right: '-200px',
    animation: 'plane 20s linear infinite',
    transformOrigin: '100% 50%',
    zIndex: 10,
    opacity: 0.7,
  };
  
  export default function TestAirplane() {
    return (
      <div>
      <style>
        {`
          @keyframes plane {
            0% {
              transform: translateX(0px) translateY(0px) rotate(0deg);
            }
            100% {
              transform: translateX(-1500px) translateY(0px) rotate(0deg);
            }
          }
        `}
      </style>
      <img
        style={airplaneStyle}
        src="images/Aeroplane.svg"
        alt="Airplane"
        className="airplane"
      />
    </div>
    )
  }