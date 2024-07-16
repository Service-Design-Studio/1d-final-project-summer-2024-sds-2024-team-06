require 'rails_helper'

RSpec.describe Api::JournalsController, type: :controller do
  let!(:user) { User.create(email: 'rspec@example.com', password: 'password', password_confirmation: 'password', dateLastLoggedIn: Date.today) }
  let!(:journal) do
    user.journals.create(
      journalentry: "Test journal entry",
      date: Date.today,
      user: user
    )
  end

  before do
    sign_in user
  end

  after(:each) do
    user.destroy if user.persisted?
  end

  describe "GET #index" do
    it "returns a success response" do
      get :index
      expect(response).to have_http_status(:ok)
    end

    it "returns the correct list of journals" do
      get :index
      json_response = JSON.parse(response.body)
      expect(json_response.size).to eq(user.journals.count)
      expect(json_response.map { |journal| journal['id'] }).to include(journal.id)
    end
  end

  describe "GET #show" do
    it "returns a success response" do
      get :show, params: { id: journal.id }
      expect(response).to have_http_status(:ok)
    end

    it "returns the correct journal" do
      get :show, params: { id: journal.id }
      json_response = JSON.parse(response.body)
      expect(json_response['id']).to eq(journal.id)
    end

    it "returns a not found response for an invalid id" do
      get :show, params: { id: 'invalid_id' }
      expect(response).to have_http_status(:not_found)
    end
  end

  describe "POST #create" do
    let(:valid_attributes) { { journalentry: "New journal entry", date: Date.today } }
    let(:invalid_attributes) { { journalentry: "", date: "" } }

    it "creates a new journal with valid attributes" do
      expect {
        post :create, params: { journal: valid_attributes }
      }.to change(Journal, :count).by(1)
      expect(response).to have_http_status(:created)
    end

    it "does not create a new journal with invalid attributes" do
      expect {
        post :create, params: { journal: invalid_attributes }
      }.not_to change(Journal, :count)
      expect(response).to have_http_status(:unprocessable_entity)
    end
  end
end