class Flower < ApplicationRecord
  belongs_to :user
  validates :mood, presence: true
  validates :color, presence: true
  validates :date_created, presence: true

<<<<<<< HEAD
  def year_created
    flower&.date_created&.year
=======
  before_save :set_day

  private
  
  def set_day
    self.day = date_created.yday if date_created.present?
>>>>>>> e0de73e1333a2cbeaeddf3a29ebde2960e076887
  end
end
