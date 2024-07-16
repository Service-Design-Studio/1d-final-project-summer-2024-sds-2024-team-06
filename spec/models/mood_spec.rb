require 'rails_helper'

RSpec.describe Mood, type: :model do
  before do
    Mood.destroy_all
    @user = User.create(email: "a@example.com" , password: "password")
    @mood = Mood.create!(name: "happy", color: "yellow", hexcode: "#0000", user: @user)
    
    if @mood.persisted?
      Rails.logger.debug "Mood created successfully: #{@mood.name}, #{@mood.color}"
    else
      Rails.logger.debug "Mood creation failed: #{@mood.errors.full_messages.join(', ')}"
    end
  
    # Optionally log all moods after creation to ensure they exist
    Rails.logger.debug "All moods: #{Mood.pluck(:name, :color)}"
  end

  it "is valid with valid attributes" do
    new_mood = @user.moods.build(name: 'angry', color: 'red', hexcode: "#0001", user: @user)
    expect(new_mood).to be_valid
  end

  it "is not valid without a name" do
    new_mood = @user.moods.build(name: nil, color: 'yellow')
    expect(new_mood).to_not be_valid
  end

  it "is not valid without a color" do
    new_mood = @user.moods.build(name: 'happy', color: nil)
    expect(new_mood).to_not be_valid
  end

  it "is not valid without a hexcode" do
    new_mood = @user.moods.build(name: 'happy', color: 'yellow', hexcode: nil)
    expect(new_mood).to_not be_valid
  end

  it "is not valid with a duplicate name for the same user" do
    new_mood = @user.moods.build(name: 'happy', color: 'blue', hexcode: "#1234")
    expect(new_mood).to_not be_valid
  end

  it "is not valid with a duplicate color for the same user" do
    new_mood = @user.moods.build(name: 'sad', color: 'yellow', hexcode: "#1234")
    expect(new_mood).to_not be_valid
  end

  it "is not valid with a duplicate hexcode for the same user" do
    new_mood = @user.moods.build(name: 'happy', color: 'yellow', hexcode: "#0000")
    expect(new_mood).to_not be_valid
  end

  it "prevents name chage after creation" do
    # mood = Mood.find_by(name: "happy")
    @mood.name = "excited"
    expect(@mood.save).to be_falsey
    expect(@mood.errors[:name]).to include("cannot be changed!")
  end

  it "returns flower with the same color" do
    flower = Flower.create!(color: @mood.color, mood: @mood.name, user: @user, date_created: Date.today)
    expect(@mood.same_mood_color).to include(flower)
  end

end
