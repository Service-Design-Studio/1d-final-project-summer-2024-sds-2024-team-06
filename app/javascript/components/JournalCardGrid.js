import React from 'react';
import JournalEntryCard from './JournalEntryCard';

const JournalCardGrid = ({ data }) => {
  return (
    <div id="journal-grid" className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
      {data.map((item) => (
        // console.log(item),

        <JournalEntryCard
          id={item.id}
          tag={item.source || 'open'}  // Default tag value if source is not provided
          title={item.journal_title}
          body={item.journalentry || [item.journal_start,item.journal_end,item.journal_third] }  // Adjust as needed
          pic={item.imageURL||"none"}
          date={item.date_created}
          tipTitle={item.tip_title}
          tipBody={item.tip_body}
        />
      ))}
    </div>
  );
};

export default JournalCardGrid;
