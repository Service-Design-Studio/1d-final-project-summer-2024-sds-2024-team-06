import React from 'react';
import FlowerImage from './FlowerImage';

const CalendarGrid = ({ checkinData, width }) => {
  const getCheckinForDay = (day) => {
    return checkinData.find((checkin) => checkin.day === day + 1);
  };

  const parentGridContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    columnGap: `${parseFloat(width) * 0.07}px`, // Horizontal gap between month grids
    rowGap: `${parseFloat(width) * 0.025}px`,
    height: 'inherit',
    width: 'w-full',
    overflow: 'hidden',
  };

  const monthGridContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(8, 1fr)',
    gridTemplateRows: 'repeat(4, 1fr)',
    gap: '0px', // Adjust gap between days
    height: 'inherit',
    width: 'inherit',
  };

  const gridItemStyle = {
    height: `${parseFloat(width) * 0.020}px`,
    width: 'inherit',
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
                    <FlowerImage checkinMood={checkin.mood.replace(/\s+/g, '')} checkinColor={checkin.color} height={parseFloat(width) * 0.025}/>
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