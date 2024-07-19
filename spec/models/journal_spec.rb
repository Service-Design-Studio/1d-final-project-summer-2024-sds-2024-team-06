require 'rails_helper'

RSpec.describe Journal, type: :model do

  let!(:user) { User.create(email: "rspec@example.com", password: "password", password_confirmation: "password", dateLastLoggedIn: Date.today) }

  it "is valid with valid attributes" do
    journal = Journal.new(journal_title: "Another Journal", journalentry: "Another entry.", tip_title: "Another Tip", tip_body: "Another Tip Body", user: user)
    expect(journal).to be_valid
  end

  it "is not valid without a journal_title" do
    journal = Journal.new(journalentry: "Entry without title.", tip_title: "Tip Title", tip_body: "Tip Body", user: user)
    expect(journal).to_not be_valid
  end

  it "is not valid without a journalentry" do
    journal = Journal.new(journal_title: "Title without entry", tip_title: "Tip Title", tip_body: "Tip Body", user: user)
    expect(journal).to_not be_valid
  end

  it "is not valid without a tip_title" do
    journal = Journal.new(journal_title: "Title without tip title", journalentry: "Entry", tip_body: "Tip Body", user: user)
    expect(journal).to_not be_valid
  end

  it "is not valid without a tip_body" do
    journal = Journal.new(journal_title: "Title without tip body", journalentry: "Entry", tip_title: "Tip Title", user: user)
    expect(journal).to_not be_valid
  end

    it "is not valid without a user" do
        journal = Journal.new(journal_title: "Title without user", journalentry: "Entry", tip_title: "Tip Title", tip_body: "Tip Body")
        expect(journal).to_not be_valid
    end
end