require 'rails_helper'
require 'spec_helper'

# RSpec.describe "GalleryJournals", type: :request do
#   # Assuming you have a factory for gallery_journals
#   let!(:user) { User.create(email: "rspec@example.com", password: "password", password_confirmation: "password", dateLastLoggedIn: Date.today) }
#   let!(:gallery_journals) { create_list(:gallery_journal, 10, user: user) }
#   let(:gallery_journal_id) { gallery_journals.first.id }

#   # Authenticate before tests
#   before do
#     sign_in user
#   end

#   describe "GET api/gallery_journals" do
#     it "returns all gallery journals for the current user" do
#       get "api/gallery_journals"
#       expect(response).to have_http_status(200)
#       expect(JSON.parse(response.body).size).to eq(10)
#     end
#   end

#   describe "GET api/gallery_journals/:id" do
#     it "returns the gallery journal for the given id" do
#       get "api/gallery_journals/#{gallery_journal_id}"
#       expect(response).to have_http_status(200)
#       expect(JSON.parse(response.body)["id"]).to eq(gallery_journal_id)
#     end
#   end

#   describe "POST api/gallery_journals" do
#     let(:valid_attributes) { { journal_title: "Test Title", journal_entry: "Test Entry", tip_title: "Test Tip", tip_body: "Test Body", imageURL: "http://example.com/image.png", date: "2023-01-01" } }

#     it "creates a new gallery journal" do
#       expect {
#         post "api/gallery_journals", params: { gallery_journal: valid_attributes }
#       }.to change(GalleryJournal, :count).by(1)
#       expect(response).to have_http_status(201)
#     end
#   end
# end


RSpec.describe GalleryJournal, type: :model do
    let!(:user) { User.create(email: "rspec@example.com", password: "password", password_confirmation: "password", dateLastLoggedIn: Date.today) }

    it "is valid with valid attributes" do
        gallery_journal = GalleryJournal.new(journal_title: "My Gallery Journal", journal_entry: "A beautiful sunset.", tip_title:"yes", tip_body: "no", user: user)
        gallery_journal.save
        expect(gallery_journal).to be_valid
    end

    it "sets the correct date when created" do
      gallery_journal = GalleryJournal.new(journal_title: "My Gallery Journal", journal_entry: "A beautiful sunset.", tip_title:"yes", tip_body: "no", user: user)
        gallery_journal.save
        expect(gallery_journal.date_created).to eq(gallery_journal.created_at.to_date)
    end


end
