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

  def self.guest
    password = SecureRandom.urlsafe_base64
    #create(guest: true, username:"guest", email: "guest_#{Time.now.to_i}#{rand(1000)}@example.com", password: password, password_confirmation: password, user_id:1)
    user = find_or_create_by(email: "guest@example.com") do |user|
      user.username = "guest"
      user.password = password
      user.password_confirmation = password
      user.user_id = SecureRandom.uuid
      user.guest = true
    end
    user.update(password: password, password_confirmation: password, user_id: SecureRandom.uuid) unless user.guest
    user
  end

  private
  def validate_mood_limit
      if moods.count >= MAX_MOODS_PER_USER
        errors.add(:base, "You cannot have more than #{MAX_MOODS_PER_USER} moods.")
      end
  end
end
