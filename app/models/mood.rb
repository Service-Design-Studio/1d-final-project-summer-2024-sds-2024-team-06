class Mood < ApplicationRecord
  belongs_to :user
  has_one :flower
  validates :name, presence: true, uniqueness: { scope: :user_id }
  validates :color, presence: true, uniqueness: { scope: :user_id }
  validates :hexcode, presence: true, uniqueness: { scope: :user_id }
  validate :validate_mood_limit, on: :create
  before_update :prevent_name_change
  

  def prevent_name_change
    if name_changed? && persisted?
      errors.add(:name, "cannot be changed!")
      throw(:abort)
    end
  end

  has_many :flowers

  def same_mood_color
    Flower.where(color: self.color)
  end

  private

  def validate_mood_limit
    if user.moods.count >= User::MAX_MOODS_PER_USER
      errors.add(:base, "You cannot have more than #{User::MAX_MOODS_PER_USER} moods.")
    end
  end

end
