import React from 'react';

const GoalCard = ({ title, text, imageUrl }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden" style={{ height: '45vh' }}>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-700">{text}</p>
      </div>
      <div className="w-full h-32 bg-gray-200">
        <img 
          src={imageUrl} 
          alt="card image" 
          className="w-full h-full object-cover" 
        />
      </div>
    </div>
  );
};

export default GoalCard;
