import React from 'react';

//function to add newline to the prompt for proper formatting
function formatPrompt(lines){
  lines = lines.replace(/([.!?])/g, '$1\n')
  return lines.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
      <br />
    </React.Fragment>
))}

// only rendered when tips exist from db records
export default function TipCard({ tipTitle, tipBody }) {

    return (
      // change background at journal details page
      <div>
        <h1 className="text-lg lg:text-2xl font-sriracha font-bold">{tipTitle}</h1>
        <div>&nbsp;</div>
        <p id="tip-body" className="text-xs lg:text-base">{formatPrompt(tipBody)}</p>
      </div>
    );
};