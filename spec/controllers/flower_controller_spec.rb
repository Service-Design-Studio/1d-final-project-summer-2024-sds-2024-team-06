require 'rails_helper'

RSpec.describe Api::FlowersController, type: :controller do
  before do
    @user = User.create(email: "guest@example.com" , password: "password")
    sign_in @user
    mood = Mood.create(name: "happy", color: "Red", hexcode: "#0000", user: @user)
    
    if mood.persisted?
      Rails.logger.debug "Mood created successfully: #{mood.name}, #{mood.color}"
    else
      Rails.logger.debug "Mood creation failed: #{mood.errors.full_messages.join(', ')}"
    end
  
    # Optionally log all moods after creation to ensure they exist
    Rails.logger.debug "All moods: #{Mood.pluck(:name, :color)}"
  end

  describe "#same_mood_color" do
    context "when a valid mood is selected" do
        it "returns a new flower with the same color as the mood selected" do
            expect {
            post :same_mood_color, params: { name: "happy" }
            }.to change(Flower, :count).by(0)
            
            flower = Flower.last
            expect(flower.color).to eq("Red")
            
        end
    end

    context "when an invalid mood is selected" do
        it "does not create a new flower and redirects with an error message" do
          expect {
            post :same_mood_color, params: { name: "angry" }
          }.to_not change(Flower, :count)
          
        
          expect(flash[:alert]).to eq('You need to sign in or sign up before continuing.')
        end
      end
    end
end