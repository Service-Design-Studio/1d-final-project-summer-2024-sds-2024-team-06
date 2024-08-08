MOOD_MAP = {
  "Happy" => 1,
  "Upset" => 2,
  "Angry" => 3,
  "Anxious" => 4,
  "Confused" => 5,
  "In Love" => 6,
  "Tired" => 7,
  "Meh" => 8
}

Given("I am on a new browser") do
  logout(:user)
  Capybara.reset_sessions!
end

When("I visit the landing page") do
  visit '/landing'
end

Then("I should be redirected to the log in page") do
  expect(page).to have_current_path('/users/sign_in')
end

Given("I am logged in as guest") do
  visit '/landing'
  click_on('Continue as Guest')
end

Given("I am logged in on the check-in page") do
  step "I have logged in" #uses the given step above
  visit '/check-in'
end

When("I have not checked in today") do
end

And("I click anywhere on the page") do
  sleep 1
  find('button#continue').click
end

Then("I should see a flower image") do
  expect(page).to have_css('img#flower-image')
end

And("I should see 2 dropdown menus") do
  expect(page).to have_css('button#mood-dropdown')
  expect(page).to have_css('button#color-dropdown')
end

When(/^I select "(.*)" from the mood dropdown$/) do |mood|
  find('button#mood-dropdown').click
  find('p', text: mood).click
end

And(/^I select "(.*)" from the color dropdown$/) do |color|
  find('button#color-dropdown').click
  find('span#' + color).click
end

Then(/^I should see a "(.*)" flower of "(.*)" color$/) do |mood, color|
  mood_value = MOOD_MAP[mood]
  expect(page).to have_selector("img[src='images/flowers/#{color.downcase}/#{color.downcase}_flower_#{mood_value}.svg']")
end

And("I click 'Submit'") do
  user = User.find_by(email: "bob@example.com")
  find('button#submit').click
end

Then("I should see a flower loading screen") do
  sleep 1
  expect(page).to have_content('Growing your flower')
  sleep 3
end

And("I should be redirected to the mood tracker page") do
  expect(page).to have_current_path('/mood-tracker')
end

And(/^a "(.*)" flower of "(.*)" of today's day should be created$/) do |mood, color|
  user = User.find_by(email: "bob@example.com")
  flower = user.flowers.last
  expect(flower.color).to eq(color)
  expect(flower.mood).to eq(mood)
  expect(flower.day).to eq(Date.today.yday)
end

Given("I am logged into an account with flowers") do
  step "I have logged in"
end

When("I visit the check-in page") do
  visit '/check-in'
end

When("I visit the mood-tracker page") do
  visit '/mood-tracker'
end

Then("I should see the correct number of flowers shown in the grids") do
  user = User.find_by(email: "bob@example.com")
  expected_flower_count = user.flowers.count
  puts expected_flower_count
  puts user.flowers.last.id
  sleep 5
  flower_id = "flower-#{user.flowers.last.id}"
  flower_element = find("img##{flower_id}")
  expect(flower_element).not_to be_nil
  expect(page).to have_selector('img.flower-image', count: expected_flower_count)
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
  step "I have logged in"
end

When("user 1 visit api endpoint for flowers") do
  visit '/api/flowers'
end

Then("he will only see his own flowers") do
  json_string = page.body.match(/<pre>(.*?)<\/pre>/m)[1]
  json_response = JSON.parse(json_string)

  user = User.find_by(email: "bob@example.com")
  user_flower_ids = user.flowers.pluck(:id)
  json_response_ids = json_response.map { |flower| flower['id'] }.sort
  expect(json_response_ids).to eq(user_flower_ids.sort)
end