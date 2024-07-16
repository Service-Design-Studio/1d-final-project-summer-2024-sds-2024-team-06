# journal_steps.rb

##
When('I click the navbar journal button') do
  find('.navbar-journal-button').click
end

Then('I should be redirected to journal splashscreen') do
  expect(page).to have_current_path('/journal/splashscreen')
end

##
Given('I am on journal splashscreen') do
  visit '/journal/splashscreen'
end

When('I click anywhere') do
  find('body').click
end

Then('I should be redirected to journal entries history') do
  expect(page).to have_current_path('/journal/entries')
end

##
Given('I am on journal entries history') do
  visit '/journal/entries'
end

When('I click the new entry button') do
  find('.new-entry-button').click
end

Then('button expands into menu with two items') do
  expect(page).to have_selector('.menu-item', count: 2)
end

##
Given('I am on journal entries history and user has completed a goal-setting journal') do
  visit '/journal/entries'
  # Ensure there is at least one goal-setting journal entry, adjust as necessary
  # ky to create a profile with a goal-setting journal entry
end

When('I click on the first entry') do
  first('.journal-entry').click
end

Then('I will be redirected to my most recent goal-setting journal') do
  # Assuming the most recent goal-setting journal has a specific path or identifier
  expect(page).to have_current_path('/journal/entries/goal-setting/latest')
end

##
Given('I opened create journal menu') do
  visit '/journal/entries'
  find('.new-entry-button').click
end

When('I click on open ended journal item') do
  find('.open-ended-journal-item').click
end

Then('I will be redirected to a open-ended journal page') do
  expect(page).to have_current_path('/journal/new/open-ended')
end

When('I click on goal-setting journal item') do
  find('.goal-setting-journal-item').click
end

Then('I will be redirected to a goal-setting journal page') do
  expect(page).to have_current_path('/journal/new/goal-setting')
end

##
Given('I am on open-ended journal page') do
  visit '/journal/new/open-ended'
end

When('I click on "Guide Me" button') do
  find('.guide-me-button').click
end

Then('a sidebar should open with a prompt') do
  expect(page).to have_selector('.sidebar-prompt')
end

##
Given('I am on goal-setting journal page') do
  visit '/journal/new/goal-setting'
end

When('I click on "Generate Tip" button') do
  find('.generate-tip-button').click
end

Then('a sidebar should open with a tip') do
  expect(page).to have_selector('.sidebar-tip')
end

##
Given('I have completed writing my open-ended journal entry') do
  visit '/journal/new/open-ended'
  fill_in 'Journal Entry', with: 'Today was a good day.'
end

When('I click submit') do
  click_button 'Submit'
end

Then('a pop-up self-care tip will be displayed') do
  expect(page).to have_selector('.self-care-tip-popup')
end



##
Given('I have completed writing my goal-setting journal entry') do
  visit '/journal/new/goal-setting'
  fill_in 'Goal', with: 'Run a marathon.'
end

Then("I will be redirected to journal entries history") do
  expect(page).to have_current_path('/journal/entries')
end

And('it should be the first entry') do
  # Assuming the first entry has a specific class or identifier
  expect(first('.journal-entry')).to have_content('Goal: Run a marathon.')
end

##
When('I click on a goal-setting journal entry item') do
  find('.goal-setting-journal-entry-item').click
end

Then('I will be redirected to the goal-setting journal past entry page') do
  # Assuming the past entry page has a specific path or identifier
  expect(page).to have_current_path('/journal/entries/goal-setting/past')
end

And('I will see three template fields') do
  expect(page).to have_selector('.template-field', count: 3)
end

##
When('I click on a open-ended journal entry item') do
  find('.open-ended-journal-entry-item').click
end

Then('I will be redirected to the open-ended journal past entry page') do
  # Assuming the past entry page has a specific path or identifier
  expect(page).to have_current_path('/journal/entries/open-ended/past')
end

And('I will see my journal entry and final tip generated') do
  expect(page).to have_content('Today was a good day.') #fill in with smth else
  expect(page).to have_selector('.final-tip')
end
