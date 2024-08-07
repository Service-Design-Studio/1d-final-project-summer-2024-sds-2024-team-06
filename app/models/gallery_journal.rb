class GalleryJournal < ApplicationRecord
  belongs_to :user
  validates :imageURL, presence: true
  validate :imageURL_not_blank
  after_create :set_date_created
  private

    def set_date_created
        update_columns(date_created: created_at.to_date) if created_at.present?
    end

    def imageURL_not_blank
        if imageURL.blank?
            errors.add(:imageURL, "can't be blank")
        end
    end
end
