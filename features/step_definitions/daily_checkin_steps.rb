

Given("I am on a new browser") do
  logout(:user) # Ensure any user session is ended
  Capybara.reset_sessions! # Reset browser session
end

When("I visit the landing page") do
  visit root_path #brings to base url home#index in routes.rb
end

Then("I should be redirected to the log in page") do
  expect(page).to have_current_path('/users/sign_in')
end

Given("I am logged in") do
  # Directly create a user in the database
  @user = User.create!(email: "user@example.com", password: "password", password_confirmation: "password")
  login_as(@user, scope: :user) #login_as is warden function for devise inherited from env.rb
end

Then("the webpage should be displayed") do
  expect(page).to have_content('stART')
end

Given("I am logged in as guest") do
  # use the guest thing jonas made
  @guest_user = User.guest
  login_as(@guest_user, scope: :user)
end

Given("I am logged in on the check-in page") do
  step "I am logged in" #uses the given step above
  visit '/check-in'
end

When("I click on 'sad' mood block") do
  click_on('sad')
end

Then("I should see a flower with sad colour") do
  expect(page).to have_css('img[src*="sad"]')
end

Given("I am logged into an account with flowers") do
  @user = User.create!(email: "activeuser@example.com", password: "password", password_confirmation: "password")
  login_as(@user, scope: :user)
  Flower.create!(
    color: "Red", # Example value, adjust as needed
    mood: "happy",
    date_created: Date.today,
    user: @user
  )
end

When("I visit the check-in page") do
  visit '/check-in'
end

Then("I should see the correct number of flowers shown in the grids") do
  expect(page).to have_css('img[src*="Red"]', count: 1)
end

Given("I have already submitted the mood for today") do
  step "I am logged into an account with flowers"
end

When("I return to the check-in page") do
  visit '/check-in'
end

Then("I should not see selection of moodblocks") do
  expect(page).to have_no_css('img[src*="happy"]')
end

Given("I am not logged in") do
  logout(:user)
end

Given("there are two users with flowers in database") do
  @user1 = User.create!(email: "activeuser1@example.com", password: "password", password_confirmation: "password")
  login_as(@user1, scope: :user)
  Flower.create!(
    color: "Red", # Example value, adjust as needed
    mood: "happy",
    date_created: Date.today,
    user: @user1
  )
  @user2 = User.create!(email: "activeuser2@example.com", password: "password", password_confirmation: "password")
  login_as(@user2, scope: :user)
  Flower.create!(
    color: "Blue", # Example value, adjust as needed
    mood: "sad",
    date_created: Date.today,
    user: @user2
  )
end

When("user 1 visit api endpoint for flowers") do
  visit '/api/flowers'
end

Then("he will only see his own flowers") do
  expect(page).to have_css('img[src*="Red"]', count: 1)
end




After do
  # Clean up any created users to avoid test pollution
  User.delete_all
end










# require 'date'




# Given /that I am a user who has been using the app and I am logging in for the first time today/ do

# end


# #Scenario 1 : redirected to check-in page upon log in
# Given /I am on the landing page/ do
#   visit '/'
#   click_on("continue")
# end

# When /I click on continue/ do
# end

# Then /I should be redirected to the check-in page/ do
#   current_path = URI.parse(current_url).path
#   assert_equal(current_path,'/check-in')
# end

# #Scenario 2a : Mood Selection Availability on check-in Page
# When /I am on the check-in page/ do
#   visit '/check-in'
# end

# Then /I should see a selection of moodblocks/ do
#   expect(page).to have_content(moodcarousel)
#   expect(page).to have_selector("[value='moodblocks']", count:12)

# end

# #Scenario 2b : Correct number of flowers displayed

# Then /I should see the correct number of flowers shown in the grids/ do
#   expect(page).to have_content(flower_grid)
#   #loop in grid and database to check correspondence
# end

# And /the slot for today should be empty/ do
#   date = Date.strftime('%d/%m/%Y')
#   ordinal_day = date.yday

#   within(flower_grid.ordinal_day) do   #probably not gonna work
#     expect(page).has_no_content
#   end
# end

# # Scenario 3a : Choosing a Moodblock
# When /I click on the "(.*)" mood block/ do |tmood|
#   moodblock = find("[name='moodblock_#{tmood}']")
#   moodblock.click
# end

# Then /The "(.*)" moodblock should be selected/ do |tmood|
#   expect(page).to have_selector("[name='moodblock_#{tmood}'][selected='true']")
# end

# # Scenario 3b : Submitting the Mood Selection
# Given /^I have selected the "(.*)" moodblock/ do |tmood|
#   step "I click on the \"angry\" moodblock"  # Reusing the existing step definition from scenario 3a
#   step "The \"angry\" moodblock should be selected"
# end

# When /I click on the submit button/ do
#   click_on("submit")
# end

# Then /I should see a "(.*)" flower of the correct color added to today's grid/ do |tmood|
#   date = Date.strftime('%d/%m/%Y')
#   ordinal_day = date.yday

#   within(flower_grid.ordinal_day) do   #probably not gonna work
#       expect(page).to have_content(tmood.flower)
#   end
# end

# # Scenario 3c : Redirecting to Activities Page
# Given /I have submitted my mood selection/ do
#   step "I have selected the \"angry\" moodblock"
#   step "I click on the submit button"
# end

# Then /I will be redirected to the activities page/ do    #does the activities page even exsit?
#   current_path = URI.parse(current_url).path
#   assert_equal(current_path,'/activities')
# end


# # Scenario 4 : Returning to check-in page again
# Given /I have already submited the mood for today/ do
#   step "I have submitted my mood selection"
# end

# When /I return to the check-in page/ do
#   visit '/check-in'
# end

# Then /I should not see selection of moodblocks/ do
#   expect(page).to have_no_content(moodcarousel)
#   expect(page).to have_no_selector("[value='moodblocks']", count:12)
# end
