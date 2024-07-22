require 'rails_helper'

RSpec.describe Api::JournalsController, type: :request do
  include Devise::Test::IntegrationHelpers
  let!(:user) { User.create(email: 'rspec@example.com', password: 'password', password_confirmation: 'password', dateLastLoggedIn: Date.today) }
  let!(:journal) do
    user.journals.create(
      journalentry: "Test journal entry",
      journal_title: "Test journal title",
      tip_title: "Test tip title",
      tip_body: "Test tip body"
    )
  end

  before do
    sign_in user
  end

  after(:each) do
    user.destroy if user.persisted?
  end

  describe "GET /api/journals" do
    it "returns a success response" do
      get api_journals_path
      expect(response).to have_http_status(:ok)
    end

    it "returns the correct list of journals" do
      get api_journals_path
      json_response = JSON.parse(response.body)
      expect(json_response.size).to eq(user.journals.count)
      expect(json_response.map { |journal| journal['id'] }).to include(journal.id)
    end
  end

  describe "GET /api/journals/:id" do
    it "returns a success response" do
      get api_journal_path(journal)
      expect(response).to have_http_status(:ok)
    end

    it "returns the correct journal" do
      get api_journal_path(journal)
      json_response = JSON.parse(response.body)
      expect(json_response['id']).to eq(journal.id)
    end

    it "returns a not found response for an invalid id" do
      get api_journal_path(id: "inbalid_id")
      expect(response).to have_http_status(:not_found)
    end
  end

  describe "POST /api/journals" do
    let(:valid_attributes) { { journalentry: "New journal entry", journal_title: "New journal title", tip_title: "New tip title", tip_body: "New tip body"} }
    let(:invalid_attributes) { { journalentry: "", journal_title: "", tip_title: "", tip_body: "" } }

    it "creates a new journal with valid attributes" do
      expect {
        post api_journals_path, params: { journal: valid_attributes }
      }.to change(Journal, :count).by(1)
      expect(response).to have_http_status(:created)
    end

    it "does not create a new journal with invalid attributes" do
      expect {
        post api_journals_path, params: { journal: invalid_attributes }
      }.not_to change(Journal, :count)
      expect(response).to have_http_status(:unprocessable_entity)
    end
  end
end