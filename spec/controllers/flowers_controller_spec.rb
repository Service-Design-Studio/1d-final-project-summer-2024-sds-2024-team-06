# spec/controllers/flower_controller_spec.rb
require 'rails_helper'

RSpec.describe Api::FlowersController, type: :controller do
  let!(:user) { User.create(email: "rspec@example.com", password: "password", password_confirmation: "password", dateLastLoggedIn: Date.today) }
  let!(:flower_params) { {color: "blue", mood: "sad", date_created: Date.new(2022, 7, 10) }}
  let!(:flower) { user.flowers.create(flower_params) }

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

    it "returns flowers belonging to the current user" do
      get :index
      expect(response).to have_http_status(:ok)
      expect(assigns(:flowers)).to include(flower)
    end
  end

  describe 'GET #show' do
    context 'when the flower exists' do
      it 'returns the flower' do
        get :show, params: { id: flower.id }

        expect(response).to have_http_status(:ok)
        expect(JSON.parse(response.body)['id']).to eq(flower.id)
      end
    end

    context 'when the flower does not exist' do
      it 'returns a not found error' do
        get :show, params: { id: 'nonexistent_id' }

        expect(response).to have_http_status(:not_found)
        expect(JSON.parse(response.body)['error']).to eq('Flower not found')
      end
    end

    context 'when the user is not authorized' do
      let(:other_user) { User.create(email: "rspec2@example.com", password: "password", password_confirmation: "password", dateLastLoggedIn: Date.today) }
      let(:other_flower) { other_user.flowers.create(flower_params) }

      it 'returns a forbidden error' do
        get :show, params: { id: other_flower.id }

        expect(response).to have_http_status(:forbidden)
        expect(JSON.parse(response.body)['error']).to eq('Not authorized')
      end

    after do
      other_user.destroy if other_user.persisted?
    end
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
