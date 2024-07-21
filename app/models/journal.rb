class Journal < ApplicationRecord
  belongs_to :user

  validates :journal_title, presence: true
  validates :journalentry, presence: true
  # validates :tip_title, presence: true
  # validates :tip_body, presence: true

  before_create :set_date_created

  private

  def set_date_created
      self.date_created = self.created_at.to_date
  end
end
