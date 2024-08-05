require 'rails_helper'

RSpec.feature "CreateJournals", type: :feature do
    include Devise::Test::IntegrationHelpers
    let!(:user) { User.create(email: 'rspec@test.com', password: 'password', password_confirmation: 'password', dateLastLoggedIn: Date.today) }

    before do
        sign_in user
    end

    after(:each) do
        user.destroy if user.persisted?
    end

    scenario "User wishes to create a goal-setting journal entry" do
        visit '/journal'
        sleep 3

        find('#newJournalButton').click
        expect(page).to have_selector('.menu-item', count: 2)

        find('#goal-setting-journal-item').click
        expect(page).to have_current_path('/journal/goal-setting')
    end

    scenario "User writes a new goal-setting journal entry" do
        visit '/journal/goal-setting'
        fill_in 'goalsetting-title', with: 'journal title'
        fill_in 'goalsetting-start', with: 'journal start.'
        fill_in 'goalsetting-stop', with: 'journal stop'
        fill_in 'goalsetting-continue', with: 'journal continue'

        submit_button = find_button('Submit')
        page.scroll_to(submit_button)
        submit_button.click
        sleep 3
        expect(page).to have_current_path("/journal/#{user.goal_journals.last.id}?type=goal")
    end

    scenario "User submits a new goal-setting journal without filling in at least one of the fields" do
        visit '/journal/goal-setting'
        fill_in 'goalsetting-title', with: 'journal title'

        click_button 'Submit'
        expect(page).to have_content("Error, missing field(s)!")
        click_button 'Discard, let me leave'
        expect(page).to have_current_path('/journal')
    end

    scenario "User wishes to create a new open-ended journal entry" do
        visit '/journal'
        sleep 3

        find('#newJournalButton').click
        expect(page).to have_selector('.menu-item', count: 2)

        find('#open-ended-journal-item').click
        expect(page).to have_current_path('/journal/open-ended')
    end

    scenario "User writes a new open-ended journal" do
        visit '/journal/open-ended'
        fill_in 'openended-title', with: 'journal title'
        fill_in 'openended-entry', with: 'journal entry.'

        find('#guideMe').click
        sleep 6
        expect(page).to have_css('#prompt')
        expect(find('#prompt')).to have_text(/\S/)

        click_button 'Submit'
        sleep 5
        last_journal = user.journals.last
        puts last_journal
        expect(page).to have_current_path("/journal/#{last_journal.id}?type=open")
        expect(page).to have_content('journal title')
        expect(page).to have_content('journal entry.')
        expect(page).to have_content(last_journal.tip_title)
        expect(page).to have_selector('p#tip-body')
    end

    scenario "User submits a new open-ended journal with a missing input" do
        visit '/journal/open-ended'
        fill_in 'openended-title', with: 'journal title'

        click_button 'Submit'
        expect(page).to have_content("Error, missing field!")
        expect(page).to have_content('Main journal entry should be filled.')
        click_button 'Discard, let me leave'
        expect(page).to have_current_path('/journal')
    end
end
