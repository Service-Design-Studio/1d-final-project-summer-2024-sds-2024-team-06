require 'rails_helper'

RSpec.feature "ArtSelect", type: :feature do
    include Devise::Test::IntegrationHelpers
    let!(:user) { User.create(email: 'rspec@test.com', password: 'password', password_confirmation: 'password', dateLastLoggedIn: Date.today) }

    before do
        sign_in user
    end

    after(:each) do
        user.destroy if user.persisted?
    end

    scenario "User visits gallery walk page" do
        visit "/gallery-walk"
        ArtPiece.all.each do |art_piece|
            expect(page).to have_selector("img[src='#{art_piece.imageURL}']")
            expect(page).to have_selector("img[alt='#{art_piece.artTitle}']")
        end
    end

    scenario "User selects an art piece" do
        visit "/gallery-walk"
        find('img[alt="The Face of Mediation"]').click
        expect(page).to have_current_path("/gallery-walk/1")
        expect(page).to have_content("The Face of Mediation")
        
        expect(page).to have_selector('#audio-player')
        expect(page).to have_selector('#text-box')
    end

    scenario "User listens to voiceover" do
        visit "/gallery-walk/1"
        click_on 'play'
        click_on 'audio-playing'
        click_on 'play'
        
        expect(page).to have_selector('#audio-playing')
    end

    scenario "User writes text" do
        visit "/gallery-walk/1"
        fill_in 'Write down your thoughts...', with: 'I feel excited'

        expect(page).to have_field('Write down your thoughts...', with: 'I feel excited')
    end

    scenario "User ends activity" do
        visit "/gallery-walk/1"
        fill_in 'Write down your thoughts...', with: 'I feel excited'
        click_on 'end-activity'

        expect(page).to have_current_path("/gallery-walk")
        expect(page).to have_content("Journal saved!")
    end

    scenario "User completes gallery walk activity" do
        # Step 1: User listens to voiceover
        visit "/gallery-walk/1"
        click_on 'play'
        expect(page).to have_selector('#audio-playing')
    
        # Step 2: User writes text
        fill_in 'Write down your thoughts...', with: 'I feel excited'
        expect(page).to have_field('Write down your thoughts...', with: 'I feel excited')
    
        # Step 3: User ends activity
        click_on 'end-activity'
        expect(page).to have_current_path("/gallery-walk")
        expect(page).to have_content("Journal saved!")
    end     
end
