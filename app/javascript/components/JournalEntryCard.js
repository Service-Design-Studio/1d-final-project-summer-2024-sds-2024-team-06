import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function JournalEntryCard({ id, tag, title, body, pic, date, tipTitle, tipBody }) {

  // Define background images

  // Determine the header text and style based on the tag
  const headerCase = {
    open: { text: "Open Journal", style: { fontSize: 'small', color: 'green' },text_sizing:'text-xl'},
    goal: { text: "Goal Journal", style: { fontSize: 'small', color: 'blue' },text_sizing:'text-xl' },
    echo: { text: "Echoes Within", style: { fontSize: 'small', color: '#FF0000' },text_sizing:'text-l' },
    gallery: {
      text: "Gallery Walk",
      style: { fontSize: 'small', color: '#FFBF00' },
      text_sizing:'text-l'},
    default: { text: "Journal Entry", style: { fontSize: 'small', color: 'gray' },text_sizing:'text-xl' },
  };

  const { text: headerText, style: headerStyle,text_sizing } = headerCase[tag] || headerCase.default;

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
          <div className="text-xs font-semibold rounded-br-lg truncate" style={{ color: '#ffa6c1'}}>
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
        <div className="flex-grow" style={{ position: 'relative', overflow: 'hidden' }}>
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
          ) : (
            body ? (
              <p className="text-gray-700 text-base overflow-hidden overflow-ellipsis whitespace-nowrap">
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
          <div className="absolute bottom-0 right-0 p-4 text-gray-500 text-sm truncate" >
            {date}
          </div>
        )}
      </div>
    </Link>
  );
}
