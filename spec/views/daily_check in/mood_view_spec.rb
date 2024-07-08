require 'rails_helper'

RSpec.describe "moods/index.html.erb", type: :view do
    before (:all) do
        if Mood.where(:name => "happy").empty?
            Mood.create(:name => "happy", :color => "yellow")
        end

        if Mood.where(:name => "sad").empty?
        Mood.create(:name => "sad", :color => "nil")
        end

        if Mood.where(:color => "green").empty?
            Mood.create(:name => "nil", :color => "green")
        end
    end

  it "should display the moods with corresponding colors" do
    visit daily_checkin_path
    expect(page).to have_selector('.mood', text: 'happy')
    expect(page).to have_selector('.mood', style: 'color: yellow;')
  end

  it "should display the moods_names" do
    visit daily_checkin_path
    expect(page).to have_content("happy")
  end

  it "has a link to select the mood" do
    expect(rendered).to have_link('Select', href: select_mood_path(mood))
  end
end
