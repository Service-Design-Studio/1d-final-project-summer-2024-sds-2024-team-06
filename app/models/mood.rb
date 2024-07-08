class Mood < ApplicationRecord
    belongs_to :user
    validates :name, presence: true, uniqueness: { scope: :user_id }
    validates :color, presence: true, uniqueness: { scope: :user_id }
    validates :hexcode, presence: true, uniqueness: { scope: :user_id }
end
