require 'rails_helper'

RSpec.describe Api::GalleryJournalsController, type: :controller do
  let!(:user) { User.create(email: "rspec@example.com", password: "password", password_confirmation: "password", dateLastLoggedIn: Date.today) }
  let!(:gallery_journal) { GalleryJournal.create(journal_title: "My Gallery Journal", journal_entry: "A beautiful sunset.", tip_title: "yes", tip_body: "no", imageURL: "https://storage.googleapis.com/art_storage/gallery_walk/Age%20of%20Full%20Bloom.svg",user: user) }

  before do
    sign_in user
  end

  describe "GET #index" do
    it "returns a success response" do
      get :index
      expect(response).to be_successful
    end
  end

  describe "GET #show" do
    it "returns a success response" do
      get :show, params: { id: gallery_journal.id }
      expect(response).to be_successful
    end
    it "returns not found for invalid id" do
      get :show, params: { id: -1 }
      expect(response).to have_http_status(:not_found)
    end
  end

  describe "POST #create" do
    it "creates a new GalleryJournal" do
      expect {
        post :create, params: { gallery_journal: { journal_title: "New Journal", journal_entry: "New entry", tip_title: "yes", tip_body: "no", imageURL: "https://storage.googleapis.com/art_storage/gallery_walk/Age%20of%20Full%20Bloom.svg", user_id: user.id } }
      }.to change(GalleryJournal, :count).by(1)
    end

    it "returns unprocessable entity for invalid data" do
      expect {
        post :create, params: { gallery_journal: { journal_title: "", journal_entry: "", tip_title: "", tip_body: "", imageURL: "", user_id: user.id } }
      }.not_to change(GalleryJournal, :count)
      expect(response).to have_http_status(:unprocessable_entity)
    end
  end

  describe "Robustness tests with fuzzing" do
    it "handles random data for create action" do
      10.times do
        random_title = FFaker::Lorem.sentence
        random_entry = FFaker::Lorem.paragraph
        random_tip_title = FFaker::Lorem.word
        random_tip_body = FFaker::Lorem.sentence
        random_image_url = FFaker::Internet.http_url

        post :create, params: { gallery_journal: { journal_title: random_title, journal_entry: random_entry, tip_title: random_tip_title, tip_body: random_tip_body, imageURL: random_image_url, user_id: user.id } }
        expect(response).to have_http_status(:created).or have_http_status(:unprocessable_entity)
      end
    end
  end
end
