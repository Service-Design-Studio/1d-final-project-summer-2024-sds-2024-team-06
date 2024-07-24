import React from 'react';
import JournalEntryCard from './JournalEntryCard';

const JournalCardGrid = ({ data }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {data.map((item) => (
        console.log(item),

        <JournalEntryCard
          id={item.id}
          tag={item.source || 'open'}  // Default tag value if source is not provided
          title={item.journal_title}
          body={item.journal_start || item.journalentry}  // Adjust as needed
          date={item.date_created}
          tipTitle={item.tip_title}
          tipBody={item.tip_body}
        />
      ))}
    </div>
  );
};

export default JournalCardGrid;
