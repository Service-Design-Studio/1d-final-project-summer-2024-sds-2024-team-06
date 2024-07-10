class Flower < ApplicationRecord
  belongs_to :user
  validates :mood, presence: true
  validates :color, presence: true
  validates :date_created, presence: true

  before_save :set_day

  private
  
  def set_day
    self.day = date_created.yday if date_created.present?
  end
end
