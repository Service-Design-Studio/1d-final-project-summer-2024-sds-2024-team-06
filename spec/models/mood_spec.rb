require 'rails_helper'

RSpec.describe Mood, type: :model do
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

  context "mood to flower method" do
    it "returns a flower with color same to mood" do
      mood = Mood.find_by_name("happy")
      flower = flower.same_mood_color
      expect(flower.length).to eq (flower.length + 1)
      
    end
  

    it "does not return flowers with other color" do
      mood = Mood.find_by_name('sad')
      other_flowers = flower.same_mood_color
      expect(other_flowers.length).to eq other_flowers.length
    end
  end
end