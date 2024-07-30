import React from 'react';
import FlowerImage from './FlowerImage';

const CalendarGrid = ({ checkinData }) => {
  const getCheckinForDay = (day) => {
    return checkinData.find((checkin) => checkin.day === day + 1);
  };

  const parentGridContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    columnGap: '7vw', // Horizontal gap between month grids
    rowGap: '5vh', // Vertical gap between rows of month grids
    height: 'inherit',
    width: 'w-full',
    overflow: 'hidden',
  };

  const monthGridContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(8, 1fr)',
    gridTemplateRows: 'repeat(4, 1fr)',
    gap: '5px', // Adjust gap between days
    height: 'inherit',
    width: 'inherit',
  };

  const gridItemStyle = {
    height: '31px',
    width: 'auto',
    padding: '0px',
    border: 'none',
    background: 'transparent',
    textAlign: 'center',
  };

  const getZIndexForRow = (rowIndex) => {
    return rowIndex; // Higher z-index for lower rows
  };

  return (
    <div style={parentGridContainerStyle}>
      {Array.from({ length: 12 }, (_, monthIndex) => (
        <div key={monthIndex} style={monthGridContainerStyle}>
          {Array.from({ length: 32 }, (_, dayIndex) => {
            const dayOfYear = monthIndex * 32 + dayIndex;
            const checkin = getCheckinForDay(dayOfYear);
            const rowIndex = Math.floor(dayIndex / 8); // Calculate row index within month grid
            return (
              <div key={dayIndex} style={{ ...gridItemStyle, marginTop: rowIndex > 0 ? '-20px' : '0', zIndex: getZIndexForRow(rowIndex) }}>
                {checkin && (
                  <div className="flex flex-col justify-between">
                    <FlowerImage checkinMood={checkin.mood} checkinColor={checkin.color}/>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default CalendarGrid;