require 'rails_helper'

RSpec.feature "ViewingJournals", type: :feature do
    include Devise::Test::IntegrationHelpers
    let!(:user) { User.create(email: 'rspec@test.com', password: 'password', password_confirmation: 'password', dateLastLoggedIn: Date.today) }
    
    before do
        Journal.create!(
            id: 100,
            user_id: user.id,
            journal_title: "Today my dog died",
            journalentry: "I am so depressed.",
            tip_title: "Process your emotions",
            tip_body: "Take the time to grieve the passing of your dog. It can be beneficial to process together with your loved ones that share good memories with your dog."
        )

        Journal.create!(
            id: 101,
            user_id: user.id,
            journal_title: "Today I got fired!",
            journalentry: "I am so angry.",
            tip_title: "Sometimes things are out of our control!",
            tip_body: "Remember that you are more than just your job! Spend time with loved ones and friends, before resuming your job hunt."
        )

        GoalJournal.create!(
            id: 100,
            user_id: user.id,
            journal_title: "Get better at guitar",
            journal_start: "I will start getting better at guitar by practicing 30 minutes a day.",
            journal_end: "I will stop doomscrolling tiktok",
            journal_third: "I will continue prioritising my tasks."
        )
        
        GalleryJournal.create!(
            id: 100,
            user_id: user.id,
            journal_title: "This artwork makes me realise i feel sad",
            journal_entry: "I am so depressed.",
            tip_title: "Process your emotions",
            tip_body: "It is okay to feel sad sometimes.",
            imageURL: "https://www.nationalgallery.sg/sites/default/files/blog/San%20Minn-Age%20of%20Full%20Bloom_o4.jpg"
        )

        EchoesJournal.create!(
            id: 100,
            user_id: user.id,
            journal_title: "Today I am really sad i am so blue",
            journal_entry: "I am so depressed.",
            tip_title: "Process your emotions",
            tip_body: "It is okay to feel sad sometimes.",
            imageURL: "user_4/1722671592_drawing.png"
        )
        sign_in user
    end

    after(:each) do
        user.destroy if user.persisted?
    end

    scenario "User visits journal page" do
        visit "/activities"
        click_on 'Journal'
        expect(page).to have_current_path("/journal-quote")
        find('body').click
        expect(page).to have_content("Loading Journals")
        expect(page).to have_current_path("/journal")
        sleep 3
        expect(page).to have_content("Today my dog died")
        expect(page).to have_content("Today I got fired!")
        expect(page).to have_content("Get better at guitar")
        expect(page).to have_content("I will start getting better at guitar by practicing 30 minutes a day.")
        expect(page).to have_content("I will stop doomscrolling tiktok")
        expect(page).to have_content("This artwork makes me realise i feel sad")
        expect(page).to have_content("Today I am really sad i am so blue")
    end

    scenario "User filters the journals by category" do
        visit "/journal"
        sleep 3
        click_on 'Open'
        expect(page).to have_content("Today my dog died")
        expect(page).to have_content("Today I got fired!")
        expect(page).not_to have_content("This artwork makes me realise i feel sad")
        expect(page).not_to have_content("Today I am really sad i am so blue")

        click_on 'Goal'
        expect(page).to have_content("Get better at guitar")
        expect(page).not_to have_content("Today my dog died")
        expect(page).not_to have_content("Today I got fired!")
        expect(page).not_to have_content("This artwork makes me realise i feel sad")
        expect(page).not_to have_content("Today I am really sad i am so blue")

        click_on 'Gallery'
        expect(page).to have_content("This artwork makes me realise i feel sad")
        expect(page).not_to have_content("Today my dog died")
        expect(page).not_to have_content("Today I got fired!")
        expect(page).not_to have_content("Today I am really sad i am so blue")

        click_on 'Echoes'
        expect(page).to have_content("Today I am really sad i am so blue")
        expect(page).not_to have_content("Today my dog died")
        expect(page).not_to have_content("Today I got fired!")
        expect(page).not_to have_content("This artwork makes me realise i feel sad")

        click_on 'All'
        expect(page).to have_content("Today my dog died")
        expect(page).to have_content("Today I got fired!")
        expect(page).to have_content("Get better at guitar")
        expect(page).to have_content("This artwork makes me realise i feel sad")
        expect(page).to have_content("Today I am really sad i am so blue")
    end

    scenario "User clicks on an open journal entry" do
        visit "/journal"
        sleep 3
        click_on 'Open'
        find("a#open-100").click
        sleep 2
        expect(page).to have_current_path("/journal/100?type=open")
        expect(page).to have_content("Today my dog died")
        expect(page).to have_content("I am so depressed.")
        expect(page).to have_content("Process your emotions")
        expect(page).to have_selector('p#tip-body')
    end

    scenario "User clicks on a goal journal entry" do
        visit "/journal"
        sleep 3
        click_on 'Goal'
        find("a#goal-100").click
        sleep 2
        expect(page).to have_current_path("/journal/100?type=goal")
        expect(page).to have_content("I will start getting better at guitar by practicing 30 minutes a day.")
        expect(page).to have_content("I will stop doomscrolling tiktok")
        expect(page).to have_content("I will continue prioritising my tasks.")
    end

    scenario "User clicks on a gallery journal entry" do
        visit "/journal"
        sleep 3
        click_on 'Gallery Walk'
        find("a#gallery-100").click
        sleep 2
        expect(page).to have_current_path("/journal/100?type=gallery")
        # expect(page).to have_content("This artwork makes me realise i feel sad")
        # expect(page).to have_content("I am so depressed.")
        # expect(page).to have_content("Process your emotions")
        # expect(page).to have_selector('p#tip-body')
    end

    scenario "User clicks on an echoes journal entry" do
        visit "/journal"
        sleep 3
        click_on 'Echoes Within'
        find("a#echo-100").click
        sleep 2
        expect(page).to have_current_path("/journal/100?type=echo")
        # expect(page).to have_content("Today I am really sad i am so blue")
        # expect(page).to have_content("I am so depressed.")
        # expect(page).to have_content("Process your emotions")
        # expect(page).to have_selector('p#tip-body')
    end
end
