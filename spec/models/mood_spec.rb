require 'rails_helper'

RSpec.describe Mood, type: :model do
  before do
    @user = User.create(username:"guest", email: "guest@example.com" , password: "password")
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

  describe "#same_mood_color" do
    it "returns a new flower with the same color as the mood selected" do
      mood = Mood.find_by(name: "happy")
      flower = Flower.create(id: "1", color: mood.color, mood: mood.name, date_created: "10/07/2024", user: @user, created_at: "10/07/2024", updated_at: "10/07/2024")
      expect(Flower.where(color: mood.color)).to include(flower)
    end

    it "does not return flowers with other colors" do
      mood = Mood.find_by(name: 'sad')
      other_mood = Mood.find_by(name: 'happy')
      flower = Flower.create(mood: other_mood)
      expect(mood.same_mood_color).to_not include(flower)
    end
  end
end
