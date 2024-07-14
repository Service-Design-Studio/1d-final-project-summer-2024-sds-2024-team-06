require 'rails_helper'

RSpec.describe "daily_checkin/home.html.erb", type: :view do
  before do
    @user = User.create(email: "a@example.com", password: "password")
    mood_happy = Mood.create!(name: "happy", color: "yellow", hexcode: "#0000", user: @user)
    mood_excited = Mood.create!(name: "excited", color: "blue", hexcode: "#0001", user: @user)
    
    Flower.create!(color: mood_happy.color, mood: mood_happy.name, date_created: Date.new(2022, 7, 10), user: @user, created_at: "12/07/2024", updated_at: "12/07/2024")
    Flower.create!(color: mood_excited.color, mood: mood_excited.name, date_created: Date.new(2022, 7, 11), user: @user, created_at: "13/07/2024", updated_at: "13/07/2024")

    assign(:flowers, @user.flowers.all)
    render
  end

  it "displays the flower with the corresponding mood color" do
    expect(rendered).to have_selector('.flower[style="background-color: yellow;"]')
    expect(rendered).to have_selector('.flower[style="background-color: blue;"]')
  end

  it "displays all the flowers in the homepage" do
    expect(rendered).to have_selector('.flower', count: 2)
  end

  
end

