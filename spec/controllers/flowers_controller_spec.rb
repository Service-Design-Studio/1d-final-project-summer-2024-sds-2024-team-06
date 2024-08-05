# spec/controllers/flower_controller_spec.rb
require 'rails_helper'


RSpec.describe Api::FlowersController, type: :controller do
  let!(:user) { User.create(email: "rspec@example.com", password: "password", password_confirmation: "password", dateLastLoggedIn: Date.today) }
  let!(:flower_params) { {color: "blue", mood: "sad" }}
  let!(:flower) { user.flowers.create(flower_params) }

  before do
    sign_in user
  end

  after(:each) do
    user.destroy if user.persisted?
  end

  describe "GET #index" do
    it "assigns @flowers" do
      get :index
      expect(assigns(:flowers)).to eq(user.flowers)
    end
  end

  describe 'GET #show' do
    it "assigns @flower" do
      get :show, params: { id: flower.id }
      expect(assigns(:flower)).to eq(flower)
    end

    it "calls the set_flower method" do
      expect(controller).to receive(:set_flower).and_call_original
      get :show, params: { id: flower.id }
    end

    it "calls the authorize_user! method" do
      expect(controller).to receive(:authorize_user!).and_call_original
      get :show, params: { id: flower.id }
    end
  end

  describe "POST #create" do
    let(:valid_attributes) { { color: "red", mood: "happy"} }
    it "calls the flower_params method" do
      expect(controller).to receive(:flower_params).and_call_original
      post :create, params: { flower: flower_params }
    end

    it "assigns @flower with valid attributes" do
      post :create, params: { flower: valid_attributes }
      expect(assigns(:flower)).to be_a(Flower)
      expect(assigns(:flower)).to be_persisted
    end
  end
end
