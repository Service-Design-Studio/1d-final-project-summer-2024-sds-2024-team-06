import React from 'react';

export default function GoalCard({ title, text, imageUrl }) {
  return (
    <div className="flex flex-col flex-grow bg-white shadow-lg rounded-lg p-4">
      <h1 className="text-lg md:text-2xl font-bold mb-2">{title}</h1>
      <div>&nbsp;</div>
      <img src={imageUrl} alt="card image" className="w-relative object-cover" />
      <div>&nbsp;</div>
      <p className="text-xs md:text-base">{text}</p>
    </div>
  );
};
