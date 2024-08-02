require 'rails_helper'

RSpec.feature "ColorImage", type: :feature do
    include Devise::Test::IntegrationHelpers
    let!(:user) { User.create(email: 'rspec@test.com', password: 'password', password_confirmation: 'password', dateLastLoggedIn: Date.today) }
    presetColors = [
        "#FF4747", "#F7C100", "#D172C1", "#3FC6C6", "#1BC77F", "#302D2D", "#FFFFFF"
    ]

    before do
        sign_in user
    end

    after(:each) do
        user.destroy if user.persisted?
    end

    scenario "User visits echoes within page" do
        visit "/echoes-within"
        # is_speaking = page.evaluate_script('window.speechSynthesis.speaking')
        # expect(is_speaking).to be true

        expect(page).to have_selector('#react-sketch-canvas')
        expect(page).to have_selector('#brush')
        expect(page).to have_selector('#eraser')
        expect(page).to have_selector('#eraser-size')
        expect(page).to have_selector('#brush-size')
        expect(page).to have_selector('#eraser-plus-button')
        expect(page).to have_selector('#eraser-minus-button')
        expect(page).to have_selector('#brush-plus-button')
        expect(page).to have_selector('#brush-minus-button')
        expect(page).to have_selector('#colorPicker')
        presetColors.each do |color|
            expect(page).to have_selector("##{color[1..-1]}")
        end
    end

    scenario "User draws on canvas" do
        visit "/echoes-within"
        find('#brush').click
        # find('#brush-size').set(5)
        # find('#colorPicker').set("#FF4747")
        # find('#FF4747').click
        find('#react-sketch-canvas').hover
        find('#react-sketch-canvas').click
        find('#react-sketch-canvas').hover
        find('#react-sketch-canvas').click
        find('#react-sketch-canvas').hover
        find('#react-sketch-canvas').click
        find('#react-sketch-canvas').hover
        find('#react-sketch-canvas').click
        find('#react-sketch-canvas').hover
        find('#react-sketch-canvas').click
        find('#react-sketch-canvas').hover
        find('#react-sketch-canvas').click
        find('#react-sketch-canvas').hover
        find('#react-sketch-canvas').click
        find('#react-sketch-canvas').hover
        find('#react-sketch-canvas').click
        find('#react-sketch-canvas').hover
        find('#react-sketch-canvas').click
        find('#react-sketch-canvas').hover
        find('#react-sketch-canvas').click
        find('#react-sketch-canvas').hover
        find('#react-sketch-canvas').click
    end    
end
