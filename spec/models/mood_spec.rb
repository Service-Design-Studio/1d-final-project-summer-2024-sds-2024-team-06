require 'rails_helper'

RSpec.describe Mood, type: :model do
  before(:all) do
    Mood.find_or_create_by(name: "happy", color: "yellow")
    Mood.find_or_create_by(name: "sad", color: "nil")
    Mood.find_or_create_by(name: "nil", color: "green")
  end

  it "is valid with valid attributes" do
    mood = Mood.new(name: 'happy', color: 'yellow')
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
      flower = Flower.create(color: mood.color)
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
