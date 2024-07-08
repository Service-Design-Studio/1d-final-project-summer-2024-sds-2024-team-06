class AddUserIdToMoods < ActiveRecord::Migration[7.1]
  def change
    add_column :moods, :user_id, :integer
  end
end
