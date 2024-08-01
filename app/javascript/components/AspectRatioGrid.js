import React, { useEffect, useRef, useState } from 'react';
import CalendarGrid from './CalendarGrid';

const AspectRatioGrid = ({ currData }) => {
  const containerRef = useRef(null);
  const [width, setWidth] = useState('0px');

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const height = containerRef.current.offsetHeight;
        const newWidth = `${height * 3.33}px`;
        setWidth(newWidth);
      }
    };

    updateDimensions(); // Initial calculation
    window.addEventListener('resize', updateDimensions); // Update on resize

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div
        ref={containerRef}
        style={{ position: 'absolute', bottom: 0, height: '80%', width: '100%' }}
      >
        <div
          style={{
            position: 'absolute',
            height: '100%',
            width,
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <div style={{ width: '100%', height: '100%' }}>
            <CalendarGrid checkinData={currData} width={width}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AspectRatioGrid;
