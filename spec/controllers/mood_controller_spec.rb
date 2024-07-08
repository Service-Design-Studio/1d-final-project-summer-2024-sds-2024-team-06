require 'rails_helper'

RSpec.describe MoodsController, type: :controller do
  describe "GET #index" do
    it "renders the daily check-in page" do
      get :index
      expect(response).to render_template :index
    end
  end

  describe "POST #select_mood" do
    context "when a valid mood is selected" do
      let!(:mood) { Mood.create(name: 'happy', color: 'yellow') }

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