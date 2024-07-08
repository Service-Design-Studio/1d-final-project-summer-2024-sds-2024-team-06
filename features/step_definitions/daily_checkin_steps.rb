Given /I am logged in/ do
end

Given /not done check-in/ do
end

When /I visit the homepage/ do
    visit homepage_path
end

Then /redirect to daily check-in page/ do
    visit daily_checkin_path
end

Then /I should see a selection of 'moods'/ do
    expect(page).to have_content('mood_blocks')
end

Given /I am on the daily check-in page/ do
    visit daily_checkin_path
end

When /I click on the "(.*)" mood block/ do |tmood|
    current_date = Date.today
    tmood_color = MoodColor.find_by(mood: tmood)
    daily_checkin.create(user_id: "777", date: current_date, mood: tmood, color: tmood_color)
end

#Then /(.*) seed moods should exist/ do | n_seeds |
#end

Then /I should see a new flower with "(.*)" color/ do |tmood| #today's mood
    tmood_color = MoodColor.find_by(mood: tmood)
    expect(page).to have_content(tmood_color) #pls adjust accordingly
end

When /I am on the homepage/ do
    visit homepage_path
end

Then /I should see correct number of total flowers/ do
    total_checkin = daiy_checkin.find_by(user_id: "123").count
    expect(page.all('.flower').count).to eq to total_checkin
end
#flower

Given /I am on the hompage/ do
    visit homepage_path
end

When /I click on the "([^"]*)"$/ do |museum|
    click_button(museum)
end

Then /should visit activities page/ do
    visit activities_path
end

Given /I am not logged in/ do
    #check log in
end

When /I visit homepage/ do
    visit homepage_path
end

Then /I get redirected to activities page/ do
    visit activities_path
end

Given /I have done check in before/ do
    #check if done check in before
end

Then /I should not see the selection of (.*)/ do ||mood_blocks|
    if page.respond_to? :should
    page.should have_no_content(mood_blocks)
  else
    assert page.has_no_content?(mood_blocks)
  end
end












