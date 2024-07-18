class RenameDateToDateCreatedInJournals < ActiveRecord::Migration[7.1]
  def change
    rename_column :journals, :date, :date_created
  end
end
