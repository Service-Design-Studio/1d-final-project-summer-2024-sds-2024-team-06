require 'rails_helper'

RSpec.feature "UserAuthentication", type: :feature do
    after(:each) do
        User.find_by(email: 'rspec@test.com')&.destroy
    end

    scenario "User signs up" do
        visit '/'
        find('a#continue').click
        expect(page).to have_current_path('/users/sign_in')
        click_link 'Sign up'
        fill_in 'Email', with: 'user@example.com'
        fill_in 'Password', with: 'password'
        fill_in 'Password confirmation', with: 'password'
        click_button 'Sign up'

        expect(page).to have_current_path('/landing')
        expect(page).to have_selector('button#continue')
    end

    scenario "User logs in" do
        User.create(email: 'rspec@test.com', password: 'password', password_confirmation: 'password', dateLastLoggedIn: Date.today)

        visit '/users/sign_in'
        fill_in 'Email', with: 'rspec@test.com'
        fill_in 'Password', with: 'password'
        click_button 'Log in'

        expect(page).to have_current_path('/landing')
        expect(page).to have_selector('button#continue')
    end

    scenario "User logs in as guest" do
        visit '/'
        find('a#continue').click
        expect(page).to have_current_path('/users/sign_in')  
        click_button 'Continue as Guest'

        expect(page).to have_current_path('/landing')
        expect(page).to have_selector('button#continue')
    end
end
