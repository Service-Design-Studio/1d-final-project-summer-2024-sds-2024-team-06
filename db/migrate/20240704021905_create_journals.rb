class CreateJournals < ActiveRecord::Migration[7.1]
  def change
    create_table :journals do |t|
      t.text :journalentry
      t.integer :userid
      t.date :date

      t.timestamps
    end
  end
end
