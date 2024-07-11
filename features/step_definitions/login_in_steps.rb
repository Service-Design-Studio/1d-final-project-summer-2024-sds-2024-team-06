Given('I am on the root page') do
    visit root_path
    @user = User.create!(email: "user1@example.com", password: "password", password_confirmation: "password")
    fill_in 'Email', with: "bob@example.com"
    fill_in 'Password', with: "password"
    click_button 'Log in'
end

Then('the webpage should be displayed') do
    expect(page).to have_content('stART')
end
