class GalleryJournal < ApplicationRecord
  belongs_to :user


  after_create :set_date_created
  private

    def set_date_created
        update_columns(date_created: created_at.to_date) if created_at.present?
    end
end
