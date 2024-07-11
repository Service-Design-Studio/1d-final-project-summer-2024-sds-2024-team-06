import React, { useState, useEffect } from 'react';

// Color mapping
const colorMap = {
  'Neon green': { hueRotate: '120deg', saturate: '500%' },
  'yellow': { hueRotate: '60deg', saturate: '400%' },
  'Bright blue': { hueRotate: '200deg', saturate: '300%' },
  'Black': { grayscale: '100%' }, // Grayscale
  'Brown': { hueRotate: '30deg', saturate: '200%' },
  'Red': { hueRotate: '0deg', saturate: '400%' },
  'Lime green': { hueRotate: '90deg', saturate: '300%' },
  'Pink': { hueRotate: '330deg', saturate: '400%' },
  'Navy blue': { hueRotate: '240deg', saturate: '200%' },
  'Light purple': { hueRotate: '270deg', saturate: '250%' },
  'Dark blue': { hueRotate: '210deg', saturate: '300%' },
  'Gray': { grayscale: '100%' }, // Grayscale
};

const FlowerImage = ({ colorName }) => {
  const [baseImageUrl, setBaseImageUrl] = useState('https://example.com/path/to/greyscale-flower.png'); // Replace with your grayscale flower image URL
  const [filterStyle, setFilterStyle] = useState({ filter: 'grayscale(100%)' }); // Default to grayscale

  useEffect(() => {
    if (colorMap[colorName]) {
      const { hueRotate, saturate, grayscale } = colorMap[colorName];
      setBaseImageUrl('https://parspng.com/wp-content/uploads/2021/10/blue-flower-png.parspng.com_.png'); // Replace with your colored flower image URL
      setFilterStyle({
        filter: ` ${hueRotate ? `hue-rotate(${hueRotate})` : ''} ${saturate ? `saturate(${saturate})` : ''}`,
      });
    }
  }, [colorName]);

  const flowerImageStyle = {
    width: '150px', // Adjust the width as needed
    height: 'auto', // Maintain aspect ratio
    ...filterStyle,
  };

  const overlayStyle = {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent', // Background remains transparent
  };

  const containerStyle = {
    position: 'relative',
    display: 'inline-block',
  };

  return (
    <div>
      <div style={containerStyle}>
        <img
          src={baseImageUrl}
          alt="Flower"
          style={flowerImageStyle}
        />
        <div style={overlayStyle}></div>
      </div>
    </div>
  );
};

export default FlowerImage;
