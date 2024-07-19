class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :flowers, dependent: :destroy
  has_many :moods, dependent: :destroy
  has_many :journals, dependent: :destroy
  has_many :goal_journals, dependent: :destroy

  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, presence: true

  MAX_MOODS_PER_USER = 12

  def self.guest
    password = SecureRandom.urlsafe_base64
    user = find_or_create_by(email: "guest@example.com") do |user|
      user.password = password
      user.password_confirmation = password
      user.guest = true
    end
    user.update(password: password, password_confirmation: password, dateLastLoggedIn: Date.today)
    user
  end

  def find_mood_by_name(mood_name)
    moods.find_by(name: mood_name)
  end

end

