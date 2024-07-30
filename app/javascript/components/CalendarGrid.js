import React from 'react';
import FlowerImage from './FlowerImage';

const CalendarGrid = ({ checkinData }) => {

  const getCheckinForDay = (day) => {
    return checkinData.find((checkin) => checkin.day === day + 1);
  };

  const gridContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(37, 1fr)', // Adjust the number of columns as needed
    //gap: '5px', // Adjust gap between grid items
    height: 'inherit', // Fixed height of 100% inherited from parent div
    width: 'w-full', // 100% of viewport width remains
    overflow: 'hidden', // Prevent overflow and disable scrolling
  };

  const gridItemStyle = {
    height: '52px',
    width: '39px',
    padding: '5px', // Adjust padding as needed
    border: 'none', // No border
    background: 'transparent', // Transparent background
    textAlign: 'center', // Center text horizontally
  };

  

  return (
    
    <div style={gridContainerStyle}>

        {Array.from({ length: 365 }, (_, index) => {
          const checkin = getCheckinForDay(index);
          return (
            <div key={index} style={gridItemStyle}>
          {checkin && (
                <div className="flex flex-col justify-between mt-2 text-sm" style={{ height: '50px' }}>
                    <FlowerImage colorName={checkin.color} />
                    <p style={{ fontSize: '10px' }}>{checkin.mood} </p>
                </div>
              )}
        </div>
          );
        })}

    </div>
  );
  

};

export default CalendarGrid;
