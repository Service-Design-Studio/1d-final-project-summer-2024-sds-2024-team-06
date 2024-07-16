# spec/controllers/moods_controller_spec.rb
require 'rails_helper'

RSpec.describe Api::MoodsController, type: :controller do
  let!(:user) { User.create(email: "rspec@example.com", password: "password", password_confirmation: "password", dateLastLoggedIn: Date.today) }
  let!(:mood) { user.moods.create(name: "happy", color: "yellow", hexcode: "#FFFF00") }

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
      expect(JSON.parse(response.body).first['name']).to eq('happy')
    end
  end

  describe "GET #show" do
    context "when the mood exists" do
      it "returns the mood" do
        get :show, params: { id: mood.id }
        expect(response).to have_http_status(:ok)
        expect(JSON.parse(response.body)['name']).to eq('happy')
      end
    end

    context "when the mood does not exist" do
      it "returns a not found response" do
        get :show, params: { id: -1 }
        expect(response).to have_http_status(:not_found)
        expect(JSON.parse(response.body)['error']).to eq('Mood not found')
      end
    end
  end

  describe "POST #create" do
    context "with valid parameters" do
      it "creates a new mood" do
        expect {
          post :create, params: { mood: { name: "excited", color: "red", hexcode: "#FF0000" } }
        }.to change(Mood, :count).by(1)
        expect(response).to have_http_status(:created)
      end
    end

    context "with invalid parameters" do
      it "returns an unprocessable entity response" do
        post :create, params: { mood: { name: "", color: "red", hexcode: "#FF0000" } }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe "PATCH/PUT #update" do
    context "with valid parameters" do
      it "updates the requested mood" do
        patch :update, params: { id: mood.name, mood: { color: "orange", hexcode: "#123456" } }
        mood.reload
        expect(mood.color).to eq("orange")
        expect(mood.hexcode).to eq("#123456")
        expect(mood.name).to eq("happy")
        expect(response).to have_http_status(:ok)
      end
    end

    context "with invalid parameters" do
      it "returns an unprocessable entity response" do
        patch :update, params: { id: mood.name, mood: { hexcode: "" } }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe "DELETE #destroy" do
    it "destroys the requested mood" do
      expect {
        delete :destroy, params: { id: mood.id }
      }.to change(Mood, :count).by(-1)
      expect(response).to have_http_status(:no_content)
    end
  end

  describe "POST #select_mood" do
    context "when a valid mood is selected" do
      it "redirects to homepage with a success message" do
        post :select_mood, params: { name: "happy" }
        expect(response).to redirect_to(root_path)
        expect(flash[:notice]).to eq('Mood selected successfully.')
      end
    end

    context "when an invalid mood is selected" do
      it "redirects to moods index page with an error message" do
        post :select_mood, params: { name: "angry" }
        expect(response).to redirect_to(api_moods_path)
        expect(flash[:alert]).to eq('Invalid mood selected.')
      end
    end
  end
end