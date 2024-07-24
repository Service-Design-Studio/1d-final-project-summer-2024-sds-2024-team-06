import React from 'react';
import GoalCard from 'components/GoalCard'


export default function PinnedGoal({data}) {
  // functions from JournalContainer return undefined if data doesnt exist grid sm:grid-cols-5
  if (typeof data === "undefined"){
    return(
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4"> 
      <GoalCard 
            title="I will start" 
            text={""} 
            imageUrl="/images/journal-seed.svg"
          />
        <GoalCard 
            title="I will end" 
            text={""} 
            imageUrl="/images/journal-cut.svg"
          />
          <GoalCard 
            title="I will continue" 
            text={""} 
            imageUrl="/images/journal-water.svg"
          />
    </div>)
  }
  else{
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <GoalCard 
            title="I will start" 
            text={data.journal_start + data.journal_start + data.journal_start + data.journal_start} 
            imageUrl="/images/journal-seed.svg"
          />
        <GoalCard 
            title="I will end" 
            text={data.journal_end} 
            imageUrl="/images/journal-cut.svg"
          />
          <GoalCard 
            title="I will continue" 
            text={data.journal_third} 
            imageUrl="/images/journal-water.svg"
          />
      </div>
      );}
};