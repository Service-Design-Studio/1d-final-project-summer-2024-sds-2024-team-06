class Flower < ApplicationRecord
  belongs_to :user
  validates :emotion, presence: true
  validates :color, presence: true
  validates :date_created, presence: true
end
