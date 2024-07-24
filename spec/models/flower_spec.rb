require 'rails_helper'

RSpec.describe Flower, type: :model do
  before do
    # Mood.destroy_all
    @user = User.create(email: "rspec@example.com" , password: "password", password_confirmation: "password", dateLastLoggedIn: Date.today)
    mood = Mood.create!(name: "happy", color: "yellow", hexcode: "#0000", user: @user)
    flower = Flower.create!(color: mood.color, mood: mood.name, user: @user)
    if flower.persisted?
      Rails.logger.debug "Flower created successfully: #{flower.color}, #{flower.date_created}"
    else
      Rails.logger.debug "Flower creation failed: #{flower.errors.full_messages.join(', ')}"
    end
  end

  it "is valid with valid attributes" do
    flower = Flower.new(color: "red", mood: "angry", user: @user)
    flower.save
    expect(flower).to be_valid
  end

  it "sets the correct date and day when created" do
    flower = Flower.new(color: "blue", mood: "sad", user: @user)
    flower.save
    expect(flower.date_created).to eq(flower.created_at.to_date)
    expect(flower.day).to eq(flower.date_created.yday)
  end

  it "is not valid without a color" do
    flower = Flower.new(mood: "excited", user: @user)
    expect(flower).to_not be_valid
  end

  it "is not valid without a mood" do
    flower = Flower.new(color: "green", user: @user)
    expect(flower).to_not be_valid
  end
end