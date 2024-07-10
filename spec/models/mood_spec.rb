require 'rails_helper'

RSpec.describe Mood, type: :model do
  before do
    Mood.destroy_all
    @user = User.create(email: "a@example.com" , password: "password")
    mood = Mood.create!(name: "happy", color: "yellow", hexcode: "#0000", user: @user)
    
    if mood.persisted?
      Rails.logger.debug "Mood created successfully: #{mood.name}, #{mood.color}"
    else
      Rails.logger.debug "Mood creation failed: #{mood.errors.full_messages.join(', ')}"
    end
  
    # Optionally log all moods after creation to ensure they exist
    Rails.logger.debug "All moods: #{Mood.pluck(:name, :color)}"
  end

  it "is valid with valid attributes" do
    mood = Mood.new(name: 'angry', color: 'red', hexcode: "#0001", user: @user)
    expect(mood).to be_valid
  end

  it "is not valid without a name" do
    mood = Mood.new(name: nil, color: 'yellow')
    expect(mood).to_not be_valid
  end

  it "is not valid without a color" do
    mood = Mood.new(name: 'happy', color: nil)
    expect(mood).to_not be_valid
  end
end
