class AddUserIdToGalleryJournals < ActiveRecord::Migration[7.1]
  def change
    add_column :gallery_journals, :user_id, :integer
    rename_column :gallery_journals, :date, :date_created
  end
end
