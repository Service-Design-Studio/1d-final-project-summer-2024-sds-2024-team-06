class Flower < ApplicationRecord
  belongs_to :user
  validates :mood, presence: true
  validates :color, presence: true
  validates :date_created, presence: true

  def year_created
    flower&.date_created&.year
  end
end
