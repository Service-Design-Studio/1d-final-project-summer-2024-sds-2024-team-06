class AddUserIdToEchoesJournals < ActiveRecord::Migration[7.1]
  def change
    add_column :echoes_journals, :user_id, :integer
    rename_column :echoes_journals, :date, :date_created
  end
end
