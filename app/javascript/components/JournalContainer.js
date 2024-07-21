import React from 'react';
import ExpandableButton from './ExpandableButton';
import PinnedGoal from './PinnedGoal';
import JournalCardGrid from './JournalCardGrid';

const Journal = ({ entries }) => {
  // Filter entries to include only those with source "goal"
  const goalEntries = entries.filter(entry => entry.source === 'goal');

  // Sort entries by date_created in descending order
  const sortedGoalEntries = goalEntries.sort((a, b) => new Date(b.date_created) - new Date(a.date_created));

  // Get the most recent goal entry
  const mostRecentGoalEntry = sortedGoalEntries[0];
  
  return (
    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Container for the ExpandableButton */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
        <ExpandableButton />
      </div>
      {/* Content below the button */}
      <div className="flex flex-col items-center">
        {mostRecentGoalEntry && (
          <>
            <PinnedGoal data={mostRecentGoalEntry} className="h-32" />
            <JournalCardGrid data={entries} />
          </>
        )}
      </div>
    </div>
  );
};

export default Journal;
