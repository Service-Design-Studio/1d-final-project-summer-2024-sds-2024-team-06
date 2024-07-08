class User < ApplicationRecord
    has_many :flowers, dependent: :destroy
    has_many :moods, dependent: :destroy

    validates :username, presence: true
    validates :user_id, presence: true, uniqueness: true
  
    def getDate
      self.dateLastLoggedIn
    end
  
    def setDate(date)
      self.dateLastLoggedIn = date
    end
end
