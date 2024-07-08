class RenamedateCreatedTodateCreated < ActiveRecord::Migration[7.1]
  def change
    rename_column :flowers, :userId, :user_id
  end
end
