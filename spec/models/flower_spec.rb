require 'rails_helper'

RSpec.describe Flower, type: :model do
  before do
    Mood.destroy_all
    @user = User.create(email: "guest1234@example.com" , password: "password", id: 1234)
    mood = Mood.create!(name: "happy", color: "yellow", hexcode: "#0000", user: @user)
    flower = Flower.create!(color: mood.color, mood: mood.name, date_created: Date.new(2022, 7, 10), user: @user, created_at: "12/07/2024", updated_at: "12/07/2024", user_id: "1")
    if flower.persisted?
      Rails.logger.debug "Flower created successfully: #{flower.color}, #{flower.date_created}"
    else
      Rails.logger.debug "Flower creation failed: #{flower.errors.full_messages.join(', ')}"
    end
  end

  it "is valid with valid attributes" do
    flower = Flower.new(color: "red", mood: "angry", date_created: Date.new(2022, 7, 10), user: @user, created_at: "12/07/2024", updated_at: "12/07/2024", user_id: "1")
    expect(flower).to be_valid
  end

  it "is not valid without a color" do
    flower = Flower.new(mood: "excited", date_created: Date.new(2022, 7, 10), user: @user, created_at: "12/07/2024", updated_at: "12/07/2024", user_id: "1")
    expect(flower).to_not be_valid
  end

  it "is not valid without a mood" do
    flower = Flower.new(color: "green", date_created: Date.new(2022, 7, 10), user: @user, created_at: "12/07/2024", updated_at: "12/07/2024", user_id: "1")
    expect(flower).to_not be_valid
  end

  it "returns flower color corresponding to user's mood" do
    flower = Flower.create(mood: "happy", color: "yellow", user_id: 1234)
    expect(flower.mood).to eq @user.find_mood_by_name(flower.mood).name
  end

end
