import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function JournalEntryCard({ id, tag, title, body, pic, date, tipTitle, tipBody }) {

  // Define background images

  // Determine the header text and style based on the tag
  const headerCase = {
    open: { text: "Open Journal", style: { fontSize: 'small', color: 'green' }, cardClassName: 'bg-white' },
    goal: { text: "Goal Journal", style: { fontSize: 'small', color: 'blue' }, cardClassName: 'bg-white' },
    gallery: {
      text: "Gallery Walk",
      style: { fontSize: 'small', color: '#FFBF00' },
      cardClassName: 'bg-white',
      bodyStyle: { display: 'none' }},
    default: { text: "Journal Entry", style: { fontSize: 'small', color: 'gray' }, cardClassName: 'bg-white' },
  };

  const { text: headerText, style: headerStyle, cardClassName, bodyStyle,fadetext } = headerCase[tag] || headerCase.default;

  return (
    <Link id={`${tag}-${id}`} to={`/journal/${id}?type=${tag}`}>
      <div
        className={"relative border border-gray-200 bg-white rounded-lg overflow-hidden shadow-md flex flex-col p-4"}
        style={{
          height: '20vh',
          backgroundImage: tag === 'gallery' ? `url(${pic})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Header */}
        <div style={headerStyle}>
          {headerText}
        </div>

        {/* Tag with Random Color for Text */}
        {tipTitle && (
          <div className="text-xs font-semibold rounded-br-lg truncate" style={{ color: '#ffa6c1', fadetext }}>
            {tipTitle}
          </div>
        )}

        {/* Title */}
        {title && (
          <h2 className="text-xl font-semibold mb-2 truncate" style={{fadetext}}>
            {title}
          </h2>
        )}

        {/* Body */}
        <div className="flex-grow" style={bodyStyle}>
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
          <div className="absolute bottom-0 right-0 p-4 text-gray-500 text-sm truncate" style={{fadetext}}>
            {date}
          </div>
        )}
      </div>
    </Link>
  );
}
