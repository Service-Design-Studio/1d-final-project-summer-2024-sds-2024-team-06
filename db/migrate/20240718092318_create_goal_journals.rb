class CreateGoalJournals < ActiveRecord::Migration[7.1]
  def change
    create_table :goal_journals do |t|
      t.string :journal_title
      t.text :journal_start
      t.text :journal_end
      t.text :journal_third
      t.date :date_created

      t.timestamps
    end
  end
end
