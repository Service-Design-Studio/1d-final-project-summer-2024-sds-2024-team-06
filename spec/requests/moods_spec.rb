# require 'rails_helper'

# RSpec.describe "Moods API", type: :request do
#   include Devise::Test::IntegrationHelpers
#   let!(:user) { User.create(email: "rspec@example.com", password: "password", password_confirmation: "password", dateLastLoggedIn: Date.today) }
#   let!(:mood) { user.moods.create(name: "happy", color: "yellow", hexcode: "#FFFF00") }

#   before do
#     sign_in user
#   end

#   after(:each) do
#     user.destroy if user.persisted?
#   end

#   describe "GET /api/moods" do
#     it "returns the correct list of moods" do
#       get api_moods_path
#       expect(response).to have_http_status(:ok)
#       expect(JSON.parse(response.body).size).to eq(user.moods.count)
#       expect(JSON.parse(response.body).map { |m| m['name'] }).to include(mood.name)
#     end
#   end

#   describe "GET /api/moods/:name" do
#     it "returns a success response" do
#       get api_moods_path(mood.name)
#       expect(response).to have_http_status(:ok)
#       response_body = JSON.parse(response.body)
#       expect(response_body.first['name']).to eq(mood.name)
#     end

#     context "when the mood does not exist" do
#       it "returns a not found response" do
#         get api_moods_path(name: 'invalid-mood')
#         expect(response).to have_http_status(:not_found)
#         expect(JSON.parse(response.body)['error']).to eq('Mood not found')
#       end
#     end
#   end

#   describe "POST /api/moods" do
#     let(:valid_attributes) { { name: 'Excited', color: 'Green', hexcode: '#00FF00' } }

#     context "with valid parameters" do
#       it "creates a new mood" do
#         expect {
#           post api_moods_path, params: { mood: valid_attributes }
#         }.to change(Mood, :count).by(1)
#         expect(response).to have_http_status(:created)
#         expect(JSON.parse(response.body)['name']).to eq('Excited')
#       end
#     end

#     context "with invalid parameters" do
#       it "returns an unprocessable entity response" do
#         post api_moods_path, params: { mood: { name: '' } }
#         expect(response).to have_http_status(:unprocessable_entity)
#       end
#     end
#   end

#   describe "PATCH/PUT /api/moods/:name" do
#     let(:valid_attributes) { { color: "orange", hexcode: "#123456" } }
#     let(:invalid_attributes) { { name: "" } }

#     context "with valid parameters" do
#       it "updates the requested mood" do
#         patch api_moods_path(mood.name), params: { mood: valid_attributes }
#         mood.reload
#         expect(response).to have_http_status(:ok)
#         expect(mood.color).to eq("orange")
#         expect(mood.hexcode).to eq("#123456")
#       end
#     end

#     context "with invalid parameters" do
#       it "returns an unprocessable entity response" do
#         patch api_moods_path(mood.name), params: { mood: invalid_attributes }
#         expect(response).to have_http_status(:unprocessable_entity)
#       end
#     end
#   end

#   describe "DELETE /api/moods/:id" do
#     it "destroys the requested mood" do
#       expect {
#         delete api_moods_path(mood.name)
#       }.to change(Mood, :count).by(-1)
#       expect(response).to have_http_status(:no_content)
#     end
#   end
# end

# MOODS_SPEC.RB CONTEXT
require 'rails_helper'

RSpec.describe "Moods API", type: :request do
  include Devise::Test::IntegrationHelpers
  let!(:user) { User.create(email: "rspec@example.com", password: "password", password_confirmation: "password", dateLastLoggedIn: Date.today) }
  let!(:mood) { user.moods.create(name: "happy", color: "yellow", hexcode: "#FFFF00") }

  before do
    sign_in user
  end

  after(:each) do
    user.destroy if user.persisted?
  end

  describe "GET /api/moods" do
    it "returns a success response" do
      get api_moods_path
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body).first['name']).to eq('happy')
    end
  end

  describe "GET /api/moods/:id" do
    context "when the mood exists" do
      it "returns the mood" do
        get api_moods_path(mood.name)
        expect(response).to have_http_status(:ok)
        expect(JSON.parse(response.body).first['name']).to eq('happy')
      end
    end

    context "when the mood does not exist" do
      it "returns a not found response" do
        get api_mood_path(id: "invalid id")
        expect(response).to have_http_status(:not_found)
        expect(JSON.parse(response.body)['error']).to eq('Mood not found')
      end
    end
  end

  describe "POST /api/moods" do
    context "with valid parameters" do
      it "creates a new mood" do
        expect {
          post api_moods_path, params: { mood: { name: "excited", color: "red", hexcode: "#FF0000" } }
        }.to change(Mood, :count).by(1)
        expect(response).to have_http_status(:created)
      end
    end

    context "with invalid parameters" do
      it "returns an unprocessable entity response" do
        post api_moods_path, params: { mood: { name: "", color: "red", hexcode: "#FF0000" } }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe "PATCH/PUT /api/moods/:id" do
    context "with valid parameters" do
      it "updates the requested mood" do
        patch api_mood_path(mood.name), params: { mood: { color: "orange", hexcode: "#123456" } }
        mood.save
        mood.reload
        expect(mood.color).to eq("orange")
        expect(mood.hexcode).to eq("#123456")
        expect(mood.name).to eq("happy")
        expect(response).to have_http_status(:ok)
      end
    end

    context "with invalid parameters" do
      it "returns an unprocessable entity response" do
        patch api_mood_path(mood.name), params: { mood: { hexcode: "" } }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe "DELETE /api/moods/:id" do
    it "destroys the requested mood" do
      expect {
        delete api_mood_path(mood.name)
      }.to change(Mood, :count).by(-1)
      expect(response).to have_http_status(:no_content)
    end
  end
end