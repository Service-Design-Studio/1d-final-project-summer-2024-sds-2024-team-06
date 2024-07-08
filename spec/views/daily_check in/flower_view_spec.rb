require 'rails_helper'

RSpec.describe "home/index.html.erb", type: :view do
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

  it "displays the flower with the corresponding mood color" do
    visit homepage_path
    expect(page).to have_selector(Mood.find_by_name("happy"))
  end
end