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
    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', position: 'relative', overflowY: 'auto', height: '100vh' }}>
      {/* Container for the ExpandableButton */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
        <span className="text-3xl text-left font-bold mb-10">The goal I am committed to practicing...</span>
        <ExpandableButton />
      </div>
      {/* Content below the button */}
      <div className="flex flex-col items-center">
        {mostRecentGoalEntry && (
          <>
            <div style={{ marginBottom: '16px', width: '100%' }}>
              <PinnedGoal data={mostRecentGoalEntry} className="h-32" />
            </div>
            <span className="text-3xl text-left font-bold mb-10" style={{ display: 'flex', justifyContent: 'flex-start'}}>My past journals</span>
            <div style={{ width: '100%' }}>
              <JournalCardGrid data={entries} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Journal;

