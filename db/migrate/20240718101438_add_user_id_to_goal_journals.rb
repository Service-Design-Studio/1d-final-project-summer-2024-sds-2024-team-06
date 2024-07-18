class AddUserIdToGoalJournals < ActiveRecord::Migration[7.1]
  def change
    add_column :goal_journals, :user_id, :integer
  end
end
