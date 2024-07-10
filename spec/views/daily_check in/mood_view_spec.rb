require 'rails_helper'

RSpec.describe "moods/index.html.erb", type: :view do
  before(:all) do
    Mood.find_or_create_by(name: "happy", color: "yellow")
    Mood.find_or_create_by(name: "sad", color: "nil")
    Mood.find_or_create_by(name: "nil", color: "green")
  end

  it "displays the moods with corresponding colors" do
    expect(rendered).to have_selector('.mood', text: 'happy')
    expect(rendered).to have_selector('.mood', style: 'background-color: yellow;')
  end

  it "displays the mood names" do
    expect(rendered).to have_content("happy")
  end

  it "has a link to select the mood" do
    mood = Mood.find_by(name: 'happy')
    expect(rendered).to have_link('Select', href: select_mood_path(mood))
  end
end
