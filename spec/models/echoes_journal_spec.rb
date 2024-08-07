require 'rails_helper'
require 'spec_helper'

RSpec.describe EchoesJournal, type: :model do
  let!(:user) { User.create(email: "rspec@example.com", password: "password", password_confirmation: "password", dateLastLoggedIn: Date.today) }
  let(:file_url) { "http://example.com/test_image.png" }

  it "is valid with valid attributes" do
      echoes_journal = EchoesJournal.create(imageURL: file_url, journal_title: "My Gallery Journal", journal_entry: "A beautiful sunset.", tip_title:"yes", tip_body: "no", date_created: Time.now, user: user)
      echoes_journal.save
      expect(echoes_journal).to be_valid
  end

  it "sets the correct date when created" do
    echoes_journal = EchoesJournal.create(imageURL: file_url, journal_title: "My Gallery Journal", journal_entry: "A beautiful sunset.", tip_title:"yes", tip_body: "no", date_created: Time.now, user: user)
    echoes_journal.save
    expect(echoes_journal.date_created).to eq(echoes_journal.created_at.to_date)
  end


end
