import React from 'react';
import JournalEntryCard from './JournalEntryCard';

const JournalCardGrid = ({ data }) => {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {data.map((item) => (
        console.log(item),

        <JournalEntryCard
          key={item.id}
          tag={item.source || 'Goal'}  // Default tag value if source is not provided
          title={item.journal_title}
          body={item.journal_start}  // Adjust as needed
          date={item.date_created}
          tipTitle={item.tip_title}
          tipBody={item.tip_body}
        />
      ))}
    </div>
  );
};

export default JournalCardGrid;
