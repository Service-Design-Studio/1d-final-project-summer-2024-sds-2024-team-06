require 'rails_helper'

RSpec.feature "FlowerSelect", type: :feature do
    include Devise::Test::IntegrationHelpers
    let!(:user) { User.create(email: 'rspec@test.com', password: 'password', password_confirmation: 'password', dateLastLoggedIn: Date.today) }

    before do
        sign_in user
    end

    after(:each) do
        user.destroy if user.persisted?
    end

    def select_flower(mood, color)
        find('button#mood-dropdown').click
        find('p', text: mood).click

        find('button#color-dropdown').click
        find('span#' + color).click
    end

    scenario "User visits check in page" do
        visit "/check-in"
        find('button#continue').click
        sleep 2
        expect(page).to have_content("How are you feeling today?")
    end

    scenario "User selects a flower" do
        visit "/check-in"
        find('button#continue').click
        sleep 2
        expect(page).to have_content("How are you feeling today?")
        select_flower('Meh', 'Orange')
        expect(page).to have_selector("img[src='images/flowers/orange/orange_flower_8.svg']")
    end

    scenario "User selects a flower and submits" do
        visit "/check-in"
        find('button#continue').click
        sleep 2
        select_flower('Angry', 'Red')
        find('button#submit').click
        expect(page).to have_current_path("/mood-tracker")
    end
end
