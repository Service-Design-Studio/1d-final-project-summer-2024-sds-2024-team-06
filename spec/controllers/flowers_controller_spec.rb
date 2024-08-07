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

    context "when the flower does not exist" do
      it "returns a 404 status" do
        get :show, params: { id: -1 }
        expect(response).to have_http_status(:not_found)
      end
    end

    context "when the user is not authorized" do
      let!(:other_user) { User.create(email: "other@example.com", password: "password", password_confirmation: "password") }
      let!(:other_flower) { other_user.flowers.create(flower_params) }

      it "returns a 403 status" do
        get :show, params: { id: other_flower.id }
        expect(response).to have_http_status(:forbidden)
      end
    end
  end

  describe "POST #create" do
    let(:valid_attributes) { { color: "red", mood: "happy" } }
    let(:invalid_attributes) { { color: "", mood: "" } }

    it "calls the flower_params method" do
      expect(controller).to receive(:flower_params).and_call_original
      post :create, params: { flower: flower_params }
    end

    it "assigns @flower with valid attributes" do
      post :create, params: { flower: valid_attributes }
      expect(assigns(:flower)).to be_a(Flower)
      expect(assigns(:flower)).to be_persisted
    end

    context "with invalid attributes" do
      it "does not create a new flower" do
        expect {
          post :create, params: { flower: invalid_attributes }
        }.to_not change(Flower, :count)
      end

      it "returns a 422 status" do
        post :create, params: { flower: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end

    context "with fuzzed attributes" do
      it "handles random data gracefully" do
        10.times do
          fuzzed_attributes = {
            color: FFaker::Lorem.characters(10),
            mood: FFaker::Lorem.characters(10)
          }

          post :create, params: { flower: fuzzed_attributes }
          expect(response).to have_http_status(:unprocessable_entity).or have_http_status(:created)
        end
      end
    end
    
  end
end