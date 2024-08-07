require 'rails_helper'
require 'spec_helper'

RSpec.describe GalleryJournal, type: :model do
    let!(:user) { User.create(email: "rspec@example.com", password: "password", password_confirmation: "password", dateLastLoggedIn: Date.today) }

    it "is valid with valid attributes" do
        gallery_journal = GalleryJournal.new(journal_title: "My Gallery Journal", journal_entry: "A beautiful sunset.", tip_title:"yes", tip_body: "no", imageURL: "testURL.com", user: user)
        gallery_journal.save
        expect(gallery_journal).to be_valid
    end

    it "sets the correct date when created" do
      gallery_journal = GalleryJournal.new(journal_title: "My Gallery Journal", journal_entry: "A beautiful sunset.", tip_title:"yes", tip_body: "no", imageURL: "testURL.com", user: user)
        gallery_journal.save
        expect(gallery_journal.date_created).to eq(gallery_journal.created_at.to_date)
    end

end
