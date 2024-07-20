require 'rails_helper'

RSpec.describe GoalJournal, type: :model do
    let!(:user) { User.create(email: "rspec@example.com", password: "password", password_confirmation: "password", dateLastLoggedIn: Date.today) }

    it "is valid with valid attributes" do
        goal_journal = GoalJournal.new(journal_title: "Another Goal Journal", journal_start: "Another start.", journal_end: "Another end.", journal_third: "Another third", user: user)
        goal_journal.save
        expect(goal_journal).to be_valid
    end

    it "sets the correct date when created" do
        goal_journal = GoalJournal.new(journal_title: "Another Goal Journal", journal_start: "Another start.", journal_end: "Another end.", journal_third: "Another third", user: user)
        goal_journal.save
        expect(goal_journal.date_created).to eq(goal_journal.created_at.to_date)
    end

    it "is not valid without a journal_title" do
        goal_journal = GoalJournal.new(journal_start: "Start without title.", journal_end: "End", journal_third: "Third", user: user)
        expect(goal_journal).to_not be_valid
    end

    it "is not valid without a journal_start" do
        goal_journal = GoalJournal.new(journal_title: "Title without start", journal_end: "End", journal_third: "Third", user: user)
        expect(goal_journal).to_not be_valid
    end

    it "is not valid without a journal_end" do
        goal_journal = GoalJournal.new(journal_title: "Title without end", journal_start: "Start", journal_third: "Third", user: user)
        expect(goal_journal).to_not be_valid
    end

    it "is not valid without a journal_third" do
        goal_journal = GoalJournal.new(journal_title: "Title without third", journal_start: "Start", journal_end: "End", user: user)
        expect(goal_journal).to_not be_valid
    end

    it "is not valid without a user" do
        goal_journal = GoalJournal.new(journal_title: "Title without user", journal_start: "Start", journal_end: "End", journal_third: "Third")
        expect(goal_journal).to_not be_valid
    end
end