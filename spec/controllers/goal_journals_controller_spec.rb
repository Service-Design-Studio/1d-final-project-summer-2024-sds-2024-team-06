require 'rails_helper'

RSpec.describe Api::GoalJournalsController, type: :controller do
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

  describe "GET #index" do
    it "assigns @goal_journals" do
      get :index
      expect(assigns(:goal_journals)).to eq(user.goal_journals)
    end
  end

  describe "GET #show" do
    it "assigns @goal_journal" do
      get :show, params: { id: goal_journal.id }
      expect(assigns(:goal_journal)).to eq(goal_journal)
    end

    it "calls the set_goal_journal method" do
      expect(controller).to receive(:set_goal_journal).and_call_original
      get :show, params: { id: goal_journal.id }
    end

    it "calls the authorize_user! method" do
      expect(controller).to receive(:authorize_user!).and_call_original
      get :show, params: { id: goal_journal.id }
    end
  end

  describe "POST #create" do
    let(:valid_attributes) { { journal_title: "New goal journal", journal_start: "New start", journal_end: "New end", journal_third: "New third" } }
    let(:invalid_attributes) { { journal_title: "", journal_start: "", journal_end: "", journal_third: "" } }

    it "assigns @goal_journal with valid attributes" do
      post :create, params: { goal_journal: valid_attributes }
      expect(assigns(:goal_journal)).to be_a(GoalJournal)
      expect(assigns(:goal_journal)).to be_persisted
    end

    it "assigns @goal_journal with invalid attributes" do
      post :create, params: { goal_journal: invalid_attributes }
      expect(assigns(:goal_journal)).to be_a_new(GoalJournal)
    end

    it "calls the goal_journal_params method" do
      expect(controller).to receive(:goal_journal_params).and_call_original
      post :create, params: { goal_journal: valid_attributes }
    end
  end
end