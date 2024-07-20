require 'rails_helper'

RSpec.describe Api::MoodsController, type: :controller do
  let!(:user) { User.create(email: "rspec@example.com", password: "password", password_confirmation: "password", dateLastLoggedIn: Date.today) }
  let!(:mood_params) { {name: "happy", color: "yellow", hexcode: "#FFFF00"} }
  let!(:mood) { user.moods.create(mood_params) }

  before do
    sign_in user
  end

  after(:each) do
    user.destroy if user.persisted?
  end

  describe "GET #index" do
    it "assigns @moods" do
      get :index
      expect(assigns(:moods)).to eq(user.moods)
    end
  end

  describe 'GET #show' do
    it "assigns @mood" do
      get :show, params: { id: mood.name }
      expect(assigns(:mood)).to eq(mood)
    end

    it "calls the set_mood_by_name method" do
      expect(controller).to receive(:set_mood_by_name).and_call_original
      get :show, params: { id: mood.name }
    end

    it "calls the authorize_user! method" do
      expect(controller).to receive(:authorize_user!).and_call_original
      get :show, params: { id: mood.name }
    end
  end

  describe "POST #create" do
    let(:valid_attributes) { { name: "sad", color: "blue", hexcode: "#0000FF"} }
    it "calls the mood_params method" do
      expect(controller).to receive(:mood_params).and_call_original
      post :create, params: { mood: mood_params }
    end

    it "assigns @mood with valid attributes" do
      post :create, params: { mood: valid_attributes }
      expect(assigns(:mood)).to be_a(Mood)
      expect(assigns(:mood)).to be_persisted
    end
  end
end