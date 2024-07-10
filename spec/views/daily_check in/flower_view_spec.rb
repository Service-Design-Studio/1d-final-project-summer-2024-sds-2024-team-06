require 'rails_helper'

RSpec.describe "home/index.html.erb", type: :view do
  before(:all) do
    Mood.find_or_create_by(name: "happy", color: "yellow")
    Mood.find_or_create_by(name: "sad", color: "nil")
    Mood.find_or_create_by(name: "nil", color: "green")
  end

  before do
    mood = Mood.find_by(name: 'happy')
    Flower.create(mood: mood)
    assign(:flowers, Flower.all)
    render
  end

  it "displays the flower with the corresponding mood color" do
    expect(rendered).to have_selector('.flower', style: 'background-color: yellow;')
  end
end
