class Journal < ApplicationRecord
  belongs_to :user
  validates :journalentry, presence: true
end
