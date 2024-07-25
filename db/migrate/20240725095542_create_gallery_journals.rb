class CreateGalleryJournals < ActiveRecord::Migration[7.1]
  def change
    create_table :gallery_journals do |t|
      t.string :journal_title
      t.text :journal_entry
      t.string :tip_title
      t.text :tip_body
      t.string :imageURL
      t.date :date

      t.timestamps
    end
  end
end
