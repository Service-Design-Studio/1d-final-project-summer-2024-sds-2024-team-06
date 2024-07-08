class RenamedateCreatedTodateCreated < ActiveRecord::Migration[7.1]
  def change
    rename_column :flowers, :dateCreated, :date_created
  end
end
