import React from 'react';
import GoalCard from 'components/GoalCard'

const PinnedGoal = ({data}) => {
    return (
        <div className="flex space-x-4" style={{ height: '20vh' }}>
          <GoalCard 
            title="One thing I will start" 
            text={data.journal_start} 
            imageUrl="https://via.placeholder.com/150"
          />
          <GoalCard 
            title="One thing I will end" 
            text={data.journal_end} 
            imageUrl="https://via.placeholder.com/150"
          />
          <GoalCard 
            title="One thing I will continue" 
            text={data.journal_third} 
            imageUrl="https://via.placeholder.com/150"
          />
        </div>
      );
};

export default PinnedGoal;