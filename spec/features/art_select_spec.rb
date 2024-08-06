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
end
