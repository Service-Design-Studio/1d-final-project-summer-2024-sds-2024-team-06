import React from 'react';

import { Link } from "react-router-dom";

const JournalEntryCard = ({ key, tag, title, body, date, tipTitle }) => {
  return (
    <Link id="journalDetail" to={`/journal/${key}}`}>
        <div className="relative bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md flex flex-col p-4" style={{ height: '15vh' }}>
      {/* Tag */}
      {tipTitle && (
        <div className="text-black text-xs font-semibold rounded-br-lg">
          {tipTitle}
        </div>
      )}
      
      {/* Title */}
      {title && (
        <h2 className="text-xl font-semibold mb-2">
          {title}
        </h2>
      )}
      
      {/* Body */}
      <div className="flex-grow">
        {body ? (
          <p className="text-gray-700 text-base truncate">
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
        <div className="absolute bottom-0 right-0 p-4 text-gray-500 text-sm">
          {date}
        </div>
      )}
    </div>
    </Link>
  );
};

export default JournalEntryCard;

