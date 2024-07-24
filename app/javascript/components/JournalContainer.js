import React from 'react';
import ExpandableButton from './ExpandableButton';
import PinnedGoal from './PinnedGoal';
import JournalCardGrid from './JournalCardGrid';


export default function Journal({ entries }) {
  // Filter entries to include only those with source "goal"
  const goalEntries = entries.filter(entry => entry.source === 'goal');

  // Sort entries by date_created in descending order
  const sortedGoalEntries = goalEntries.sort((a, b) => new Date(b.date_created) - new Date(a.date_created));

  // Get the most recent goal entry
  const mostRecentGoalEntry = sortedGoalEntries[0];
  console.log(mostRecentGoalEntry)

  return (
    <>
      {/*Title & New journal button*/}
      <div className="flex justify-between">
         <span className="text-[#382C0D] text-2xl lg:text-4xl font-sriracha block text-left font-bold">The goal I am working towards...</span>
         <ExpandableButton />
      </div>
      <div>&nbsp;</div>

      {/*Most recent goal pinned on top given that there is a goal entry, else its an empty array => mostRecentGoalEntry is undefined*/}
      <PinnedGoal data={mostRecentGoalEntry} />
      <div>&nbsp;</div>
      <div>&nbsp;</div>

      {/*Past entries*/}
      <div className="flex">
         <span className="text-[#382C0D] text-2xl lg:text-4xl font-sriracha block text-left font-bold">My past journals</span>
      </div>
      <JournalCardGrid data={entries} />
    </>
  );
};

