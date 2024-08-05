import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function JournalEntryCard({ id, tag, title, body, pic, date, tipTitle, tipBody }) {

  // Define background images

  // Determine the header text and style based on the tag
  const headerCase = {
    open: { text: "Open Journal", style: { fontSize: 'small', color: 'green' },text_sizing:'text-xl',tiphide: ""},
    goal: { text: "Goal Journal", style: { fontSize: 'small', color: 'blue' },text_sizing:'text-xl' ,tiphide: ""},
    echo: { text: "Echoes Within", style: { fontSize: 'small', color: '#FF0000' },text_sizing:'text-l',tiphide:"hidden" },
    gallery: { text: "Gallery Walk", style: { fontSize: 'small', color: '#FFBF00' },text_sizing:'text-l',tiphide:"hidden"},
    default: { text: "Journal Entry", style: { fontSize: 'small', color: 'gray' },text_sizing:'text-xl' ,tiphide: ""},
  };

  const { text: headerText, style: headerStyle,text_sizing,tiphide } = headerCase[tag] || headerCase.default;

  return (
    <Link id={`${tag}-${id}`} to={`/journal/${id}?type=${tag}`}>
      <div
        className={"relative border border-gray-200 bg-white rounded-lg overflow-hidden shadow-md flex flex-col p-4"}
        style={{
          height: '30vh',
        }}
      >
        {/* Header */}
        <div style={headerStyle}>
          {headerText}
        </div>

        {/* Tag with Random Color for Text */}
        {tipTitle && (
          <div className={`text-xs font-semibold rounded-br-lg truncate ${tiphide}`} style={{ color: '#ffa6c1'}}>
            {tipTitle}
          </div>
        )}

        {/* Title */}
        {title && (
          <h2 className={` font-semibold mb-2 truncate ${text_sizing}`} >
            {title}
          </h2>
        )}

        {/* Body */}
        <div className="flex-grow p-1 " style={{ position: 'relative', overflow: 'hidden' }}>
          {tag === 'echo' || tag === 'gallery' ? (
            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
              <img
                src={pic}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
                alt="Journal"
              />
            </div>
          ) : tag === 'goal' ? (
            <div >
              <p className="text-black-500 text-base truncate overflow-hidden overflow-ellipsis mb-2">
                <span className="font-semibold" style={{ color: 'green' }}>Start:</span> {body[0]}
              </p>
              <p className="text-black-500 text-base truncate overflow-hidden overflow-ellipsis mb-2">
                <span className="font-semibold" style={{ color: 'red' }}>Stop:</span> <span className="text-black">{body[1]}</span>
              </p>
              <p className="text-black-500 text-base truncate overflow-hidden overflow-ellipsis mb-2">
                <span className="font-semibold" style={{ color: '#3b82f6' }}>Continue:</span> <span className="text-black">{body[2]}</span>
              </p>


            </div>
          ) : (
            body ? (
              <p className="text-gray-700 text-base overflow-hidden overflow-ellipsis whitespace-normal "style={{ position: 'relative',height:'15vh' }}> 
                {body}
              </p>
            ) : (
              <p className="text-gray-700 text-base">
                No content available.
              </p>
            )
          )}
        </div>

        {/* Date */}
        {date && (
          <div className=" bottom-0 absolute right-0 mr-3 text-gray-500 text-sm ">
            {date}
          </div>
        )}
      </div>
    </Link>
  );
}
