require 'rails_helper'

RSpec.describe MoodsController, type: :controller do
  before(:each) do
    mood = Mood.create(name: "happy", color: "yellow", hexcode: "#000000")
    if mood.persisted?
      Rails.logger.debug "Mood created successfully: #{mood.name}, #{mood.color}"
    else
      Rails.logger.debug "Mood creation failed: #{mood.errors.full_messages.join(', ')}"
    end
  
    # Optionally log all moods after creation to ensure they exist
    Rails.logger.debug "All moods: #{Mood.pluck(:name, :color)}"
  end


  describe "POST #select_mood" do
    context "when a valid mood is selected" do
      it "redirects to homepage with a success message" do
        post :select_mood, params: { name: "happy" }
        expect(response).to redirect_to(homepage_path)
        expect(flash[:notice]).to eq('Mood selected successfully!')
      end
    end

    context "when an invalid mood is selected" do
      it "redirects to moods index page with an error message" do
        get :select_mood, params: { name: "invalid_mood" }
        expect(response).to redirect_to(moods_path)
        expect(flash[:alert]).to eq('Invalid mood selected.')
      end
    end
  end
end
