class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :flowers, dependent: :destroy
  has_many :moods, dependent: :destroy
  has_many :journals, dependent: :destroy

  validates :username, presence: true
  validates :user_id, presence: true, uniqueness: true
  validate :validate_mood_limit, on: :create

  MAX_MOODS_PER_USER = 12

  def getDate
    self.dateLastLoggedIn
  end

  def setDate(date)
    self.dateLastLoggedIn = date
  end

  private
  def validate_mood_limit
      if moods.count >= MAX_MOODS_PER_USER
        errors.add(:base, "You cannot have more than #{MAX_MOODS_PER_USER} moods.")
      end
  end
end
