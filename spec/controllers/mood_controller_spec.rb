# spec/controllers/mood_controller_spec.rb
require 'rails_helper'

RSpec.describe Api::MoodsController, type: :controller do
  let!(:user) { User.create(email: "rspec@example.com", password: "password", password_confirmation: "password", dateLastLoggedIn: Date.today) }
  let!(:mood) { Mood.create(name: "happy", color: "yellow", hexcode: "#0000", user: user) }
  before do
    if mood.persisted?
      Rails.logger.debug "Mood created successfully: #{mood.name}, #{mood.color}"
    else
      Rails.logger.debug "Mood creation failed: #{mood.errors.full_messages.join(', ')}"
    end
  
    sign_in user
    # Optionally log all moods after creation to ensure they exist
    Rails.logger.debug "All moods: #{Mood.pluck(:name, :color)}"
  end

  after(:each) do
    user.destroy if user.persisted?
  end

  describe "POST #select_mood" do
    context "when a valid mood is selected" do
      it "redirects to homepage with a success message" do
        post :select_mood, params: { name: "happy" }
        expect(response).to redirect_to(homepage_path)
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
