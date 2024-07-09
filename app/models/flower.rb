class Flower < ApplicationRecord
  belongs_to :user
  validates :mood, presence: true
  validates :color, presence: true
  validates :date_created, presence: true
end
