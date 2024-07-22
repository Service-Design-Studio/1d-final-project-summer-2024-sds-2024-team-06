require 'rails_helper'

RSpec.describe "Flowers", type: :request do
    include Devise::Test::IntegrationHelpers
    let!(:user) { User.create(email: 'rspec@test.com', password: 'password', password_confirmation: 'password', dateLastLoggedIn: Date.today) }
    let!(:flower_params) { {color: "blue", mood: "sad" }}
    let!(:flower) { user.flowers.create(flower_params) }

    before do
        sign_in user
    end

    after(:each) do
        user.destroy if user.persisted?
    end

    describe "GET /api/flowers" do
        it "returns a success response" do 
            get api_flowers_path
            expect(response).to have_http_status(:ok) 
        end

        it "returns the correct list of flowers" do
            get api_flowers_path
            json_response = JSON.parse(response.body)
            expect(json_response.size).to eq(user.flowers.count)
            expect(json_response.map { |flower| flower['id'] }).to include(flower.id)
        end
    end

    describe "GET /api/flowers/:id" do
        it "returns a success response" do
            get api_flower_path(flower)
            expect(response).to have_http_status(:ok)
        end

        it "returns the correct flower" do
            get api_flower_path(flower)
            json_response = JSON.parse(response.body)
            expect(json_response['id']).to eq(flower.id)
        end

        it "returns a not found response for an invalid id" do
            get api_flower_path(id: "invalid id")
            expect(response).to have_http_status(:not_found)
            expect(JSON.parse(response.body)['error']).to eq('Flower not found')
        end
    end

    describe "POST /api/flowers" do
        let(:valid_attributes) { { color: "red", mood: "happy"} }
        let(:invalid_attributes) { { color: "", mood: "" } }

        it "creates a new flower with valid attributes" do
            post api_flowers_path, params: { flower: valid_attributes }
            expect(response).to have_http_status(:created)
        end

        it "returns a unprocessable entity response for invalid attributes" do
            post api_flowers_path, params: { flower: invalid_attributes }
            expect(response).to have_http_status(:unprocessable_entity)
        end
    end
end
