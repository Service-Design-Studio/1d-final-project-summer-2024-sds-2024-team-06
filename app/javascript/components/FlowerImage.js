import React from "react";

const FlowerImage = ({ checkinMood, checkinColor, height }) => {
  const baseImageUrl = `/images/flowers/${checkinMood}/${checkinColor}.svg`;

  const containerStyle = {
    position: 'relative',
    width: '100%', // Ensure the container takes up the full width
    height: `${height}px`, // Make the container fill its parent’s height
    display: 'flex', // Use flexbox to handle the image
    alignItems: 'flex-start', // Center the image vertically
    justifyContent: 'center', // Center the image horizontally
  };

  const flowerImageStyle = {
    maxWidth: '100%', // Prevent the image from exceeding the container’s width
    maxHeight: '100%', // Prevent the image from exceeding the container’s height
    objectFit: 'contain', // Maintain aspect ratio, fit within the container
    // Use 'cover' if you want the image to cover the container, potentially cropping it
  };

  return (
    <div style={containerStyle}>
      <img
        className='flower-image'
        src={baseImageUrl}
        alt="Flower"
        style={flowerImageStyle}
      />
    </div>
  );
};

export default FlowerImage;