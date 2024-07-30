import React from 'react';


const FlowerImage = ({ checkinMood, checkinColor }) => {
  const baseImageUrl = `/images/flowers/${checkinMood}/${checkinColor}.svg`;


  const flowerImageStyle = {
    width: '1vw', // Adjust the width as needed
    height: 'auto', // Maintain aspect ratio
  };


  const containerStyle = {
    position: 'relative',
    display: 'inline-block',
  };

  return (
    <div>
      <div style={containerStyle}>
        <img
          className='flower-image'
          src={baseImageUrl}
          alt="Flower"
          style={flowerImageStyle}
        />
      </div>
    </div>
  );
};

export default FlowerImage;
