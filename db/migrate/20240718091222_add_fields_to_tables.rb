class AddFieldsToTables < ActiveRecord::Migration[7.1]
  def change
    # Add fields to the journals table
    add_column :journals, :tip_title, :string
    add_column :journals, :tip_body, :text
    add_column :journals, :journal_title, :string
  end
end
