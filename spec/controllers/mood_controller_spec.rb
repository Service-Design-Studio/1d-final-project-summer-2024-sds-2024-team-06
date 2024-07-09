require 'rails_helper'

RSpec.describe MoodsController, type: :controller do
  before(:all) do
    Mood.find_or_create_by(name: "happy", color: "yellow")
    Mood.find_or_create_by(name: "sad", color: "nil")
    Mood.find_or_create_by(name: "nil", color: "green")
  end

  describe "GET #index" do
    it "renders the daily check-in page" do
      get :index
      expect(response).to render_template :index
    end
  end

  describe "POST #select_mood" do
    let!(:mood) { Mood.find_by(name: "happy") }

    context "when a valid mood is selected" do
      it "redirects to home page with a success message" do
        post :select_mood, params: { mood_id: mood.id }
        expect(response).to redirect_to home_path
        expect(flash[:notice]).to match(/Mood selected successfully/)
      end

      it "adds a flower with the corresponding mood to the home page" do
        expect {
          post :select_mood, params: { mood_id: mood.id }
        }.to change(Flower, :count).by(1)
      end
    end

    context "when an invalid mood is selected" do
      it "redirects to daily check-in page with an error message" do
        post :select_mood, params: { mood_id: nil }
        expect(response).to redirect_to moods_path
        expect(flash[:alert]).to match(/Invalid mood selection/)
      end
    end
  end
end
