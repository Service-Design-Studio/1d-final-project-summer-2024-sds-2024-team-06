require 'rails_helper'

RSpec.feature "ArtJournal", type: :feature do
    include Devise::Test::IntegrationHelpers
    let!(:user) { User.create(email: 'rspec@test.com', password: 'password', password_confirmation: 'password', dateLastLoggedIn: Date.today) }
    let!(:art_piece) do
        ArtPiece.create(
          id: 100,
          artID: 100,
          artTitle: "rspec image",
          artist: "rspec",
          dateYear: Random.rand(1900..2021),
          imageURL: "rspec image url",
          audio: "rspec audio url",
          captions: "",
        )
    end

    before do
        sign_in user
    end

    after(:each) do
        user.destroy if user.persisted?
        art_piece.destroy if art_piece.persisted?
    end

    scenario "User visits gallery walk page" do
        visit "/gallery-walk/100"
        sleep 2
        expect(page).to have_content(art_piece.artTitle)
        expect(page).to have_selector("img[src='#{art_piece.imageURL}']")
        expect(page).to have_selector('#audio-player')
        expect(page).to have_selector('#text-box')
    end

    scenario "User listens to voiceover" do
        visit "/gallery-walk/100"
        click_on 'play'
        click_on 'audio-playing'
        click_on 'play'
        expect(page).to have_selector('#audio-playing')

        click_on 'forward'
        click_on 'rewind'

        find("svg#volume").click
        expect(page).to have_selector('#volume-slider')
        find('#volume-slider').set(0.5)
    end

    scenario "User writes text" do
        visit "/gallery-walk/100"
        fill_in 'Write down your thoughts...', with: 'I feel excited'

        expect(page).to have_field('Write down your thoughts...', with: 'I feel excited')
    end

    scenario "User ends activity" do
        visit "/gallery-walk/100"
        fill_in 'Write down your thoughts...', with: 'I feel excited'
        click_on 'end-activity'

        expect(page).to have_current_path("/gallery-walk")
        expect(page).to have_content("Journal saved!")
    end

    scenario "User completes gallery walk activity" do
        visit "/gallery-walk/100"
        click_on 'play'
        expect(page).to have_selector('#audio-playing')
    
        fill_in 'Write down your thoughts...', with: 'I feel excited'
        expect(page).to have_field('Write down your thoughts...', with: 'I feel excited')
    
        click_on 'end-activity'
        expect(page).to have_current_path("/gallery-walk")
        expect(page).to have_content("Journal saved!")
    end     
end
