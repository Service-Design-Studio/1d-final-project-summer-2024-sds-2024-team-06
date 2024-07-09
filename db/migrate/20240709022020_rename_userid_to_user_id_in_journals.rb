class RenameUseridToUserIdInJournals < ActiveRecord::Migration[7.1]
  def change
    rename_column :journals, :userid, :user_id
  end
end
