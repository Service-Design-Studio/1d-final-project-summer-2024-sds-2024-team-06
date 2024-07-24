# journal_steps.rb

##

def latest_journal_entry(user)
  all_journals = user.journals + user.goal_journals
  all_journals.max_by(&:created_at)
end

user = User.find_by(email: "bob@example.com")

Given("I am on the activities page") do
  visit '/activities'
end

When('I click the navbar journal button') do
  find('a[href="/journal-quote"]', text: 'Journal').click
end

Then('I should be redirected to journal splashscreen') do
  expect(page).to have_current_path('/journal-quote')
end

##
Given('I am on journal splashscreen') do
  visit '/journal-quote'
end

When('I click anywhere') do
  find('body').click
end

Then('I should be redirected to journal entries history') do
  expect(page).to have_current_path('/journal')
end

##
Given('I am on journal entries history') do
  visit '/journal-quote'
  step 'I click anywhere'
end

When('I click the new entry button') do
  find('#newJournalButton').click
end

Then('button expands into menu with two items') do
  expect(page).to have_selector('.menu-item', count: 2)
end

##
Given('I am on journal entries history and user has completed a goal-setting journal') do
  visit '/journal'
  # Ensure there is at least one goal-setting journal entry, adjust as necessary
  # ky to create a profile with a goal-setting journal entry
end

When('I click on the first entry') do
  first_link = first('#journal-grid a')
  first_link.click
  # first('#Picture').click
end

Then('I will be redirected to my most recent goal-setting journal') do
  # Assuming the most recent goal-setting journal has a specific path or identifier
  latest_entry = latest_journal_entry(user)
  if latest_entry.is_a?(GoalJournal)
    expect(page).to have_current_path("/journal/#{latest_entry.id}?type=goal")
  else
    expect(page).to have_current_path("/journal/#{latest_entry.id}?type=open")
  end
  # expect(page).to have_current_path(/\/journal\/\d+\?type=open/)
end



##
Given('I opened create journal menu') do
  visit '/journal'
  find('#newJournalButton').click
end

When('I click on open ended journal item') do
  find('#open-ended-journal-item').click
end

Then('I will be redirected to a open-ended journal page') do
  expect(page).to have_current_path('/journal/open-ended')
end

When('I click on goal-setting journal item') do
  find('#goal-setting-journal-item').click
end

Then('I will be redirected to a goal-setting journal page') do
  expect(page).to have_current_path('/journal/goal-setting')
end

##
Given('I am on open-ended journal page') do
  visit '/journal/open-ended'
end

When('I click on "Guide Me" button') do
  find('#guideMe').click
  sleep 8
end

Then('a sidebar should open with a prompt') do
  expect(page).to have_css('#prompt')
  # expect(find('#prompt')).to have_text(/\S/)
end

# ##
# Given('I am on goal-setting journal page') do
#   visit '/journal/goal-setting'
# end

# When('I click on "Generate Tip" button') do
#   find('.generate-tip-button').click
# end

# Then('a sidebar should open with a tip') do
#   expect(page).to have_selector('.sidebar-tip')
# end

#
Given('I have completed writing my open-ended journal entry') do
  visit '/journal/open-ended'
  fill_in 'openended-title', with: 'Today was a good day.'
  fill_in 'openended-entry', with: 'I had a lot of fun.'
end

When('I click submit') do
  find('#button-submit').click
  sleep 10
end

Then('I will be redirected to open submission page') do
  latest_journal_id = user.journals.last.id
  latest_journal_id += 1
  expect(page).to have_current_path("/journal/#{latest_journal_id}?type=open")
end

Then('I will be redirected to goal submission page') do
  latest_journal_id = user.journals.last.id
  latest_journal_id += 1
  expect(page).to have_current_path("/journal/#{latest_journal_id}?type=goal")
end

##
When('I click on a goal-setting journal entry item') do
  first_journal_id = user.goal_journals.first.id
  find("a#goal-#{first_journal_id}").click
end

Then('I will be redirected to the goal-setting journal past entry page') do
  first_journal_id = user.goal_journals.first.id
  expect(page).to have_current_path("/journal/#{first_journal_id}?type=goal")
end

And('I will see three template fields') do
  first_journal = user.goal_journals.first
  expect(page).to have_selector('p#journal-start', text: first_journal.journal_start)
  expect(page).to have_selector('p#journal-end', text: first_journal.journal_end)
  expect(page).to have_selector('p#journal-continue', text: first_journal.journal_third)
end

##
When('I click on a open-ended journal entry item') do
  first_journal_id = user.journals.first.id
  find("a#open-#{first_journal_id}").click
end

Then('I will be redirected to the open-ended journal past entry page') do
  # Assuming the past entry page has a specific path or identifier
  first_journal_id = user.journals.first.id
  expect(page).to have_current_path("/journal/#{first_journal_id}?type=open")
end

And('I will see my journal entry and final tip generated') do
  first_journal = user.journals.first
  expect(page).to have_content(first_journal.journal_title)
  expect(page).to have_content(first_journal.journalentry)
  expect(page).to have_content(first_journal.tip_title)
  expect(page).to have_selector('p#tip-body')
end



Given('I have completed writing my goal-setting journal entry') do
  visit '/journal/goal-setting'
  fill_in 'goalsetting-title', with: 'Run a marathon.'
  fill_in 'goalsetting-start', with: 'I will run everyday.'
  fill_in 'goalsetting-stop', with: 'I stop smoking now.'
  fill_in 'goalsetting-continue', with: 'Continue to eat well.'
end

Then("I will be redirected to journal entries history") do
  sleep 7
  user = User.find_by(email: "bob@example.com")
  latest_journal_id = user.goal_journals.last.id
  expect(page).to have_current_path("/journal/#{latest_journal_id}?type=goal", wait: 5)
end
