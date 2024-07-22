import React from 'react';
import GoalCard from 'components/GoalCard'


const PinnedGoal = ({data}) => {
    return (
        <div className="flex space-x-4" style={{ justifyContent:'space-around', height: '45vh' }}>
          <GoalCard 
            title="One thing I will start" 
            text={data.journal_start} 
            imageUrl="/images/Seed.svg"
          />
          <GoalCard 
            title="One thing I will end" 
            text={data.journal_end} 
            imageUrl="/images/Cut.svg"
          />
          <GoalCard 
            title="One thing I will continue" 
            text={data.journal_third} 
            imageUrl="/images/Water.svg"
          />
        </div>
      );
};

export default PinnedGoal;