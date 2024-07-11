# spec/controllers/mood_controller_spec.rb
require 'rails_helper'

RSpec.describe Api::MoodsController, type: :controller do
  before do
    @user = User.create(email: "guest@example.com" , password: "password")
    sign_in @user
    mood = Mood.create(name: "happy", color: "yellow", hexcode: "#0000", user: @user)
    
    if mood.persisted?
      Rails.logger.debug "Mood created successfully: #{mood.name}, #{mood.color}"
    else
      Rails.logger.debug "Mood creation failed: #{mood.errors.full_messages.join(', ')}"
    end
  
    # Optionally log all moods after creation to ensure they exist
    Rails.logger.debug "All moods: #{Mood.pluck(:name, :color)}"
  end

  # before(:each) do
  #   sign_in @user # Assuming Devise is used for authentication
  # end

  # describe "POST #select_mood" do
  #   context "when a valid mood is selected" do
  #     it "redirects to homepage with a success message" do
  #       post :select_mood, params: { name: "happy" }
        
  #       expect(flash[:notice]).to eq('Mood selected successfully.')
  #     end
  #   end
  # end

  # context "when an invalid mood is selected" do
  #   it "redirects to moods index page with an error message" do
  #     post :select_mood, params: { name: "angry" }
      
  #     expect(flash[:alert]).to eq('Invalid mood selected.')
  #   end
  # end
  
end
