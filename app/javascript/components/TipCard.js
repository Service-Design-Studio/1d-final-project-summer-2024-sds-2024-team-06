import React from 'react';


const TipCard = ({  tipTitle, tipBody }) => {
    return (
        <div className="relative border border-gray-200 rounded-lg overflow-hidden shadow-md flex flex-col flex-1 p-10 mt-4" style={{ height: '20vh', backgroundColor: '#ADD8E6' }}>
          <div className="flex flex-col space-y-4 mt-4">
            {tipTitle && (
              <span className="text-4xl font-bold mb-10">{tipTitle}</span>
            )}
            {tipBody ? (
              <p className="text-m text-gray-700 truncate mt-10">
                {tipBody}
              </p>
            ) : (
              <p className="text-gray-700">
                No content available.
              </p>
            )}
          </div>
        </div>
      );
};

export default TipCard;

