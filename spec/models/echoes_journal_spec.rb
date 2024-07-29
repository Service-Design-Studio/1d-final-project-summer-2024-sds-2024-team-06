require 'rails_helper'
require 'spec_helper'

RSpec.describe EchoesJournal, type: :model do
  let!(:user) { User.create(email: "rspec@example.com", password: "password", password_confirmation: "password", dateLastLoggedIn: Date.today) }

  it "is valid with valid attributes" do
      echoes_journal = EchoesJournal.new(journal_title: "My Gallery Journal", journal_entry: "A beautiful sunset.", tip_title:"yes", tip_body: "no", user: user)
      echoes_journal.save
      expect(echoes_journal).to be_valid
  end

  it "sets the correct date when created" do
    echoes_journal = EchoesJournal.new(journal_title: "My Gallery Journal", journal_entry: "A beautiful sunset.", tip_title:"yes", tip_body: "no", user: user)
      echoes_journal.save
      expect(echoes_journal.date_created).to eq(echoes_journal.created_at.to_date)
  end


end
