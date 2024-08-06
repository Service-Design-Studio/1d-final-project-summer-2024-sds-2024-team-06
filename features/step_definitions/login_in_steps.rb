Given('I have logged in') do
    # @user = User.create!(email: "user1@example.com", password: "password", password_confirmation: "password")
    visit '/users/sign_in'
    fill_in 'Email', with: "bob@example.com"
    fill_in 'Password', with: "password"
    click_button 'Log in'
end

Then('the webpage should be displayed') do
    sleep 1
    expect(page).to have_content('Click anywhere to continue')
end
