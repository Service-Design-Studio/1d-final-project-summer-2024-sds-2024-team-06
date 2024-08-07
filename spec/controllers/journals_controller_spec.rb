require 'rails_helper'

RSpec.describe Api::JournalsController, type: :controller do
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

  describe "GET #index" do
    it "assigns @journals" do
      get :index
      expect(assigns(:journals)).to eq(user.journals)
    end
  end

  describe "GET #show" do
    it "assigns @journal" do
      get :show, params: { id: journal.id }
      expect(assigns(:journal)).to eq(journal)
    end

    it "calls the set_journal method" do
      expect(controller).to receive(:set_journal).and_call_original
      get :show, params: { id: journal.id }
    end

    it "calls the authorize_user! method" do
      expect(controller).to receive(:authorize_user!).and_call_original
      get :show, params: { id: journal.id }
    end
  end

  describe "POST #create" do
    let(:valid_attributes) { { journalentry: "New journal entry", journal_title: "New journal title", tip_title: "New tip title", tip_body: "New tip body"} }
    
    it "assigns @journal with valid attributes" do
      post :create, params: { journal: valid_attributes }
      expect(assigns(:journal)).to be_a(Journal)
      expect(assigns(:journal)).to be_persisted
    end

    it "calls the journal_params method" do
      expect(controller).to receive(:journal_params).and_call_original
      post :create, params: { journal: valid_attributes }
    end

    it "handles random valid and invalid data gracefully" do
      10.times do
        random_valid_attributes = {
          journalentry: FFaker::Lorem.sentence,
          journal_title: FFaker::Lorem.sentence,
          tip_title: FFaker::Lorem.sentence,
          tip_body: FFaker::Lorem.paragraph
        }

        post :create, params: { journal: random_valid_attributes }
        expect(response).to have_http_status(:created)
        expect(assigns(:journal)).to be_a(Journal)
        expect(assigns(:journal)).to be_persisted

        10.times do
          random_invalid_attributes = {
            journalentry: [FFaker::Lorem.characters(256), nil].sample,
            journal_title: [FFaker::Lorem.characters(256), nil].sample,
            tip_title: [FFaker::Lorem.characters(256), nil].sample,
            tip_body: [FFaker::Lorem.characters(1024), nil].sample
          }
  
          post :create, params: { journal: random_invalid_attributes }
          expect(response).to have_http_status(:unprocessable_entity).or have_http_status(:created)
        end
      end
    end
  end
end