import React from 'react';

const FilterChip = ({ label, onClick, isActive }) => {
  return (
    <button
      className={`px-4 py-2 m-1 rounded-full text-sm font-semibold ${
        isActive
          ? 'border-2 border-[#382C0D] bg-white text-[#382C0D]'
          : 'border-2 border-transparent bg-transparent text-[#9E9E9E]'
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default FilterChip;
