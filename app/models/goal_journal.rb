class GoalJournal < ApplicationRecord
    belongs_to :user

    validates :journal_title, presence: true
    validates :journal_start, presence: true
    validates :journal_end, presence: true
    validates :journal_third, presence: true

    before_create :set_date_created

    private

    def set_date_created
        self.date_created = self.created_at.to_date
    end
end
