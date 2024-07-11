require 'rails_helper'

RSpec.describe "daily_checkin/index.html.erb", type: :view do

  before do
    Mood.destroy_all
    @user = User.create(email: "a@example.com" , password: "password")
    Mood.create!(name: "happy", color: "yellow", hexcode: "#0000", user: @user)
    Mood.create!(name: "sad", color: "blue", hexcode: "#0001", user: @user)
    Mood.create!(name: "relaxed", color: "green", hexcode: "#0002", user: @user)

    assign(:moods, Mood.all)
    render
  end

  it "displays the moods with corresponding colors" do
    expect(rendered).to have_selector('.mood', count: 3)

    expect(rendered).to have_selector('.mood', text: 'happy')
    expect(rendered).to have_selector('.mood', text: 'sad')
    expect(rendered).to have_selector('.mood', text: 'relaxed')

    expect(rendered).to have_selector('.mood[style="background-color: yellow;"]')
    expect(rendered).to have_selector('.mood[style="background-color: blue;"]')
    expect(rendered).to have_selector('.mood[style="background-color: green;"]')
  end

  it "displays the mood names" do
    expect(rendered).to have_selector('.mood', text: 'happy')
    expect(rendered).to have_selector('.mood', text: 'sad')
    expect(rendered).to have_selector('.mood', text: 'relaxed')
  end

  it "has a link to select the mood" do
    Mood.all.each do |mood|
      expect(rendered).to have_link("Select #{mood.name}", href: select_mood_path(mood))
    end
  end
end
