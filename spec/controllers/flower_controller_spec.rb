# spec/controllers/flower_controller_spec.rb
require 'rails_helper'

RSpec.describe Api::FlowersController, type: :controller do
  let!(:user) { create(:user, email: "jonas@example.com", password: "password") }
  let!(:flower_params) { attributes_for(:flower, color: "blue", mood: "sad", date_created: Date.new(2022, 7, 10), user: @user, created_at: "12/07/2024", updated_at: "12/07/2024", user_id: "1")}

  before do
    sign_in user
  end

  describe "GET #index" do
    it "returns a success response" do
      get :index
      expect(response).to have_http_status(:ok)
    end

    it "returns flowers belonging to the current user" do
      flower = create(:flower, user: user)
      get :index
      expect(response).to have_http_status(:ok)
      expect(assigns(:flowers)).to include(flower)
    end
  end

  describe "GET #show" do
    let(:flower) { create(:flower, user: user) }

    it "returns a success response" do
      get :show, params: { id: flower.id }
      expect(response).to have_http_status(:ok)
    end

    it "returns the correct flower" do
      get :show, params: { id: flower.id }
      expect(response).to have_http_status(:ok)
      expect(assigns(:flower)).to eq(flower)
    end

    it "returns 'Flower not found' error with status :not_found if flower does not exist" do
      get :show, params: { id: 'invalid_id' }
      expect(response).to have_http_status(:not_found)
      expect(JSON.parse(response.body)['error']).to eq('Flower not found')
    end
  end

  describe "POST #create" do
    context "with valid params" do
      it "creates a new flower" do
        expect {
          post :create, params: { flower: flower_params }
        }.to change(Flower, :count).by(1)
        expect(response).to have_http_status(:created)
      end
    end

    context "with invalid params" do
      let(:invalid_params) { { flower: { mood: '', color: '', user_id: user.id } } }

      it "does not create a new flower" do
        expect {
          post :create, params: invalid_params
        }.to_not change(Flower, :count)
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end
end
