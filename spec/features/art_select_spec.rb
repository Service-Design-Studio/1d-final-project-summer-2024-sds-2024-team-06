require 'rails_helper'

RSpec.feature "ArtSelect", type: :feature do
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
        visit "/gallery-walk"
        sleep 2
        ArtPiece.all.each do |art_piece|
          expect(page).to have_selector("img[src='#{art_piece.imageURL}']", visible: true)
          expect(page).to have_content(art_piece.dateYear)
          expect(page).to have_content(art_piece.artist)
          find('button#next-button').click
        end
    end

    scenario "User selects an art piece" do
        visit "/gallery-walk"
        sleep 2
        while !page.has_text?(art_piece.artTitle)
          find('button#next-button').click
        end
        find("img[src='#{art_piece.imageURL}']").click
    end
end
