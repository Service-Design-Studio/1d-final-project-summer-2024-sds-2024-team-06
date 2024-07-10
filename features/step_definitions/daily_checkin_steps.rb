
require 'date'



#Background:

Given /Given that I am a user who has been using the app and I am logging in for the first time today/ do
  visit '/users/sign_in'
  fill in "user[email]" with "bob@example.com"
  fill in "user[password]" with "password"
  click_button("commit")
  
  #create database for bob too
  
end


#Scenario 1 : redirected to check-in page upon log in
Given /I am on the landing page/ do
  visit '/'
  click_on("continue")
end
When /I click on continue/ do

Then /I should be redirected to the check-in page/ do
  current_path = URI.parse(current_url).path
  assert_equal(current_path,'/check-in')
end

#Scenario 2a : Mood Selection Availability on check-in Page
When /I am on the check-in page/ do
  visit '/check-in'
end

Then /I should see a selection of moodblocks/ do
  expect(page).to have_content(moodcarousel)
  expect(page).to have_selector("[value='moodblocks']", count:12)

end

#Scenario 2b : Correct number of flowers displayed

Then /I should see the correct number of flowers shown in the grids/do
  expect(page).to have_content(flower_grid)
  #loop in grid and database to check correspondence
end

And /the slot for today should be empty/ do
  date = Date.strftime('%d/%m/%Y')
  ordinal_day = date.yday
  
  within(flower_grid.ordinal_day) do   #probably not gonna work
    expect(page).has_no_content
  end

# Scenario 3a : Choosing a Moodblock
When /I click on the "(.*)" mood block/ do |tmood|
  moodblock = find("[name='moodblock_#{tmood}']")
  moodblock.click
end

Then /The "(.*)" moodblock should be selected/do |tmood|
  expect(page).to have_selector("[name='moodblock_#{tmood}'][selected='true']")
end

# Scenario 3b : Submitting the Mood Selection
Given /^I have selected the "(.*)" moodblock/ do |tmood|
  step "I click on the \"angry\" moodblock"  # Reusing the existing step definition from scenario 3a
  step "The \"angry\" moodblock should be selected"
end

When /I click on the submit button/ do
  click_on("submit")
end

Then /I should see a "(.*)" flower of the correct color added to today's grid/do |tmood|
  date = Date.strftime('%d/%m/%Y')
  ordinal_day = date.yday  

  within(flower_grid.ordinal_day) do   #probably not gonna work
      expect(page).to have_content(tmood.flower)
end

# Scenario 3c : Redirecting to Activities Page
Given /I have submitted my mood selection/ do
  step "I have selected the \"angry\" moodblock"
  step "I click on the submit button"
end

Then /I will be redirected to the activities page/do    #does the activities page even exsit?
  current_path = URI.parse(current_url).path
  assert_equal(current_path,'/activities')
end


# Scenario 4 : Returning to check-in page again
Given /I have already submited the mood for today/do
  step "I have submitted my mood selection"
end

when /I return to the check-in page/do
  visit '/check-in'
end

Then /I should not see selection of moodblocks/do
  expect(page).to have_no_content(moodcarousel)
  expect(page).to have_no_selector("[value='moodblocks']", count:12)
end




