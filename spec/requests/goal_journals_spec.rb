require 'rails_helper'

RSpec.describe "GoalJournals", type: :request do
  include Devise::Test::IntegrationHelpers

  let!(:user) { User.create(email: 'rspec@test.com', password: 'password', password_confirmation: 'password', dateLastLoggedIn: Date.today) }
  let!(:goal_journal) do
    user.goal_journals.create(
      journal_title: "Test goal journal",
      journal_start: "Test start",
      journal_end: "Test end",
      journal_third: "Test third"
    )
  end

  before do
    sign_in user
  end

  after(:each) do
    user.destroy if user.persisted?
  end

  describe "GET /api/goal_journals" do
    it "returns a success response" do
      get api_goal_journals_path
      expect(response).to have_http_status(:ok)
    end

    it "returns the correct list of goal journals" do
      get api_goal_journals_path
      json_response = JSON.parse(response.body)
      expect(json_response.size).to eq(user.goal_journals.count)
      expect(json_response.map { |goal_journal| goal_journal['id'] }).to include(goal_journal.id)
    end
  end

  describe "GET /api/goal_journals/:id" do
    it "returns a success response" do
      get api_goal_journal_path(goal_journal)
      expect(response).to have_http_status(:ok)
    end

    it "returns the correct goal journal" do
      get api_goal_journal_path(goal_journal)
      json_response = JSON.parse(response.body)
      expect(json_response['id']).to eq(goal_journal.id)
    end

    it "returns a not found response for an invalid id" do
      get api_goal_journal_path(id: "invalid id")
      expect(response).to have_http_status(:not_found)
    end
  end

  describe "POST /api/goal_journals" do
    let(:valid_attributes) { { journal_title: "New goal journal", journal_start: "New start", journal_end: "New end", journal_third: "New third" } }
    let(:invalid_attributes) { { journal_title: "", journal_start: "", journal_end: "", journal_third: "" } }

    it "creates a new goal journal with valid attributes" do
      expect {
        post api_goal_journals_path, params: { goal_journal: valid_attributes }
      }.to change(user.goal_journals, :count).by(1)
      expect(response).to have_http_status(:created)
    end

    it "does not create a new goal journal with invalid attributes" do
      expect {
        post api_goal_journals_path, params: { goal_journal: invalid_attributes }
      }.to_not change(user.goal_journals, :count)
      expect(response).to have_http_status(:unprocessable_entity)
    end
  end
end