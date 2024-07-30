import React from 'react';
import ExpandableButton from './ExpandableButton';
import PinnedGoal from './PinnedGoal';
import JournalCardGrid from './JournalCardGrid';
import FilterChip from './filterChips';
import { useState } from 'react';


export default function Journal({
    entries,
    openIsPending,
    goalIsPending,
    openError,
    goalError
  }) {
  const [activeFilter, setActiveFilter] = useState('all');  // Add state for activeFilter

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    console.log('Filter clicked:', filter);
      
  };

// Determine which entries to display based on the active filter
let displayEntries = [];
let displayError = null;
let displayIsPending = false;

switch (activeFilter) {
    case 'all':
        displayEntries = entries;
        displayError = openError || goalError;
        displayIsPending = openIsPending || goalIsPending;
        break;
    case 'open':
        displayEntries = entries.filter(entry => entry.source === 'open');
        displayError = openError;
        displayIsPending = openIsPending;
        break;
    case 'goal':
        displayEntries = entries.filter(entry => entry.source === 'goal');
        displayError = goalError;
        displayIsPending = goalIsPending;
        break;

        //update this part when ready.
    // case 'gallery':
    //     displayEntries = entries;
    //     displayError = openError || goalError;
    //     displayIsPending = openIsPending || goalIsPending;
    //     break;
    // case 'echo':
    //     displayEntries = entries.filter(entry => entry.source === 'open');
    //     displayError = openError;
    //     displayIsPending = openIsPending;
    //     break;
        
    default:
        displayEntries = entries;
        displayError = openError || goalError;
        displayIsPending = openIsPending || goalIsPending;
        break;
}



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
      <div>&nbsp;</div>

        {/* Filter chips */}
        <div className="flex flex-wrap mb-4">
            <FilterChip label="All" onClick={() => handleFilterClick('all')} isActive={activeFilter === 'all'} />
            <FilterChip label="Open" onClick={() => handleFilterClick('open')} isActive={activeFilter === 'open'} />
            <FilterChip label="Goal" onClick={() => handleFilterClick('goal')} isActive={activeFilter === 'goal'} />
            {/* <FilterChip label="Gallery Walk" onClick={() => handleFilterClick('gallery')} isActive={activeFilter === 'gallery'} />
            <FilterChip label="Echos Within" onClick={() => handleFilterClick('echo')} isActive={activeFilter === 'echo'} /> */}
            
      </div>


      <JournalCardGrid data={displayEntries} />

    </>
  );
};

