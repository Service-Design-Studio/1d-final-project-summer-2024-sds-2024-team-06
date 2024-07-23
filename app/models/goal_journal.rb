class GoalJournal < ApplicationRecord
    belongs_to :user

    # react handles data presence
    validates :journal_title, presence: true
    #validates :journal_start, presence: true
    #validates :journal_end, presence: true
    #validates :journal_third, presence: true

    after_create :set_date_created

    private

    def set_date_created
        update_columns(date_created: created_at.to_date) if created_at.present?
    end
end
