require 'rails_helper'

RSpec.describe Api::EchoesJournalsController, type: :controller do
  let!(:user) { User.create(email: "rspec@example.com", password: "password", password_confirmation: "password", dateLastLoggedIn: Date.today) }
  let!(:echoes_journal) { EchoesJournal.create(journal_title: "My Echoes Journal", journal_entry: "A beautiful sunset.", tip_title: "yes", tip_body: "no", imageURL: "test_image.png", user: user) }
  let(:file) { fixture_file_upload(Rails.root.join('spec', 'fixtures', 'files', 'test_image.png'), 'image/png') }
  let(:valid_attributes) {
    { echoes_journal:  {journal_title: "New Journal", journal_entry: "New entry", tip_title: "yes", tip_body: "no", date_created: Time.now}}
  }
  let(:invalid_attributes) {
    { echoes_journal: {journal_title: "", journal_entry: "", tip_title: "", tip_body: "", date_created: nil} }
  }

  before do
    sign_in user
    allow(GoogleCloudStorageService).to receive(:upload_file).and_return(true)
    allow(GoogleCloudStorageService).to receive(:file_url).and_return("http://example.com/test_image.png")
  end

  describe "GET #index" do
    it "returns a success response and modifies imageURL" do
      get :index
      expect(response).to be_successful
      json_response = JSON.parse(response.body)
      expect(json_response.first['imageURL']).to eq("http://example.com/test_image.png")
    end
  end

  describe "GET #show" do
    it "returns a success response" do
      get :show, params: { id: echoes_journal.id }
      expect(response).to be_successful
    end

    it "returns not found for invalid id" do
      get :show, params: { id: -1 }
      expect(response).to have_http_status(:not_found)
    end
  end

  describe "POST #create" do
    context "with valid attributes" do
      it "creates a new EchoesJournal and uploads the file" do
        expect {
          post :create, params: valid_attributes.merge(image: file)
        }.to change(EchoesJournal, :count).by(1)

        expect(response).to have_http_status(:created)
        expect(GoogleCloudStorageService).to have_received(:upload_file)
      end

      it "creates a new EchoesJournal with imageURL" do
        expect {
          post :create, params: valid_attributes.merge(image: file)
        }.to change(EchoesJournal, :count).by(1)

        expect(response).to have_http_status(:created)
      end
    end

    it "creates a new GalleryJournal" do
      expect {
        post :create, params: valid_attributes.merge(image: file)
      }.to change(EchoesJournal, :count).by(1)
    end

    context "with missing required attributes" do
      it "does not create a new EchoesJournal and returns unprocessable_entity status" do
        expect {
          post :create, params: invalid_attributes
        }.to_not change(EchoesJournal, :count)

        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end
end
