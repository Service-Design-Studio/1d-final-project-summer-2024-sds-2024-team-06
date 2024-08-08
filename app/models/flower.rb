class Flower < ApplicationRecord
  belongs_to :user
  validates :mood, presence: true
  validates :color, presence: true
  validates :day, uniqueness: { scope: :user_id }

  after_create :set_day_date_created

  private

  def set_day_date_created
    update_columns(
      date_created: created_at.to_date,
      day: created_at.to_date.yday) if created_at.present?
  end
end
