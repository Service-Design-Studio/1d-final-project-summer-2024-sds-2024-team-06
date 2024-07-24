import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ExpandableButton() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Hook for programmatic navigation

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (path) => {
    navigate(path); // Navigate to the specified path
    setIsOpen(false); // Optionally close the menu after navigation
  };

  return (
    <div className="relative inline-block text-left">
      {/* Main button */}
      <button
        type="button"
        className="inline-flex justify-center w-full rounded-md shadow-sm text-xs md:text-lg flex-1 bg-[#3655F4] hover:bg-[#2B44C1] text-white font-bold py-2 px-4"
        onClick={toggleMenu}
        onMouseEnter={toggleMenu} onMouseLeave={toggleMenu}
      >
        Create New Entry
          <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
      </button>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              onClick={() => handleNavigation('/journal/open-ended')}
            >
              Open-ended
            </button>
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              onClick={() => handleNavigation('/journal/goal-setting')}
            >
              Goal-setting
            </button>
            {/* Add more options as needed */}
          </div>
        </div>
      )}
    </div>
  );
};


