#others
Given /not done check-in/ do
  #not sure how to check for this yet
end


#Scenario 1:redirected to daily check-in page upon log in

Given /I am on the landing page/ do
  visit '/'
end

When /I want to log in as Bob/ do   #Assumes that Bob has not logged in yet
  visit '/users/sign_in'
  fill in "user[email]" with "bob@example.com"
  fill in "user[password]" with "password"
  click_button("commit")
end

Then /I should be redirected to the mood selection page/ do
  current_path = URI.parse(current_url).path
  assert_equal(current_path,'/daily-check-in')
end


#Scenario 2 : Mood Selection Availability on mood selection Page

When /I am on mood selection page/ do
    visit '/daily-check-in'
end

Then /I should see a selection of moodblocks/ do
  expect(page).to have_content(moodcarousel)
  expect(page).to have_selector("[value='moodblocks']", count:12)

end

#Scenario 3 : Choosing a moodblock

Given /I am on the mood selection page/ do
  visit '/daily-check-in'
end

When /I click on the "(.*)" mood block/ do |tmood|
  moodblock = find("[name='moodblock_#{tmood}']")
  moodblock.click
end

Then /I will be redirected to the flower field page/ do
  current_path = URI.parse(current_url).path
  assert_equal(current_path,'/check-in')
end

And /I should see a "(.*)" flower of the correct color/ do |tmood| 
  mood = StandardMood.where(name: tmood).first
  flower_hexcode=mood.hexcode
  expect(page).to have_content("moodblock_#{tmood}") 
end







# #Then data should exist in daily_checkin
# Then I should see a new flower with 'sad color'


# Then /redirect to daily check-in page/ do
#     visit daily_checkin_path
# end

# Then /I should see a selection of 'moods'/ do
#     expect(page).to have_content('mood_blocks')
# end

# Given /I am on the daily check-in page/ do
#     visit daily_checkin_path
# end

# When /I click on the "(.*)" mood block/ do |tmood|
#     current_date = Date.today
#     tmood_color = MoodColor.find_by(mood: tmood)
#     daily_checkin.create(user_id: "777", date: current_date, mood: tmood, color: tmood_color)
# end

# #Then /(.*) seed moods should exist/ do | n_seeds |
# #end



# When /I am on the homepage/ do
#     visit homepage_path
# end

# Then /I should see correct number of total flowers/ do
#     total_checkin = daiy_checkin.find_by(user_id: "123").count
#     expect(page.all('.flower').count).to eq to total_checkin
# end
# #flower

# Given /I am on the hompage/ do
#     visit homepage_path
# end

# When /I click on the "([^"]*)"$/ do |museum|
#     click_button(museum)
# end

# Then /should visit activities page/ do
#     visit activities_path
# end

# Given /I am not logged in/ do
#     #check log in
# end

# When /I visit homepage/ do
#     visit homepage_path
# end

# Then /I get redirected to activities page/ do
#     visit activities_path
# end

# Given /I have done check in before/ do
#     #check if done check in before
# end

# Then /I should not see the selection of (.*)/ do ||mood_blocks|
#     if page.respond_to? :should
#     page.should have_no_content(mood_blocks)
#   else
#     assert page.has_no_content?(mood_blocks)
#   end
# end












