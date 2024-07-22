import React from 'react';
import { Link } from "react-router-dom";
import './styles.css'; // Make sure to import your CSS file

const JournalEntryCard = ({ id, tag, title, body, date, tipTitle, tipBody }) => {

  return (
    <Link id="Picture" to={`/journal/${id}?type=${tag}`}>
      <div className="relative bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md flex flex-col p-4" style={{ height: '20vh' }}>
        {/* Tag */}
        {tipTitle && (
          <div className="text-black text-xs font-semibold rounded-br-lg truncate">
            {tipTitle}
          </div>
        )}
        
        {/* Title */}
        {title && (
          <h2 className="text-xl font-semibold mb-2 truncate">
            {title}
          </h2>
        )}
        
        {/* Body */}
        <div className="flex-grow">
          {body ? (
            <p className="text-gray-700 text-base overflow-hidden overflow-ellipsis whitespace-nowrap">
              {body}
            </p>
          ) : (
            <p className="text-gray-700 text-base">
              No content available.
            </p>
          )}
        </div>
        
        {/* Date */}
        {date && (
          <div className="absolute bottom-0 right-0 p-4 text-gray-500 text-sm truncate">
            {date}
          </div>
        )}
      </div>
    </Link>
  );
};

export default JournalEntryCard;
