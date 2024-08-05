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
            expect(page).to have_selector("##{"color-" + color[1..-1]}")
        end

        find("#brush-size").click
        expect(page).to have_selector('#strokeWidth')

        find("#eraser-size").click
        expect(page).to have_selector('#eraserWidth')
    end

    scenario "User draws on canvas" do
        visit "/echoes-within"
        canvas = find('#react-sketch-canvas')
        canvas_width = page.evaluate_script("document.getElementById('react-sketch-canvas').offsetWidth").to_i
        canvas_height = page.evaluate_script("document.getElementById('react-sketch-canvas').offsetHeight").to_i
        find('#brush').click
        
        canvas.hover
        canvas.click

        find("#eraser").click
        canvas.hover
        canvas.click

        find("#brush").click
        5.times do
            find('#brush-plus-button').click
        end
        page.driver.browser.action.move_to(canvas.native, 50, 50).perform
        canvas.click

        5.times do
            find('#brush-minus-button').click
        end
        page.driver.browser.action.move_to(canvas.native, 47, 47).perform
        canvas.click

        find("#brush-size").click
        stroke_width_input = find('#strokeWidth', visible: true)
    
        page.driver.browser.action.click_and_hold(stroke_width_input.native).move_by(100, 0).release.perform

        value = page.evaluate_script("document.getElementById('strokeWidth').value")
        raise "Value not set correctly" unless value == "100"
        find("#brush-size").click
        sleep 1
        page.driver.browser.action.move_to(canvas.native, 0, 0).click.perform
        sleep 1

        find("#eraser").click
        find("#eraser-size").click
        
        sleep 1
        eraser_width_input = find('#eraserWidth', visible: true)
        sleep 1
        page.driver.browser.action.click_and_hold(eraser_width_input.native).move_by(100, 0).release.perform
        value = page.evaluate_script("document.getElementById('eraserWidth').value")
        raise "Value not set correctly" unless value == "100"

        page.driver.browser.action.move_to(canvas.native, 0, 0).click.perform
    end    

    scenario "User changes color" do
        visit "/echoes-within"
        canvas = find('#react-sketch-canvas')

        find("#brush").click
        find("#brush-size").click
        sleep 1
        stroke_width_input = find('#strokeWidth', visible: true)
        sleep 1

        page.driver.browser.action.click_and_hold(stroke_width_input.native).move_by(100, 0).release.perform
        value = page.evaluate_script("document.getElementById('strokeWidth').value")
        raise "Value not set correctly" unless value == "100"

        presetColors.each do |color|
            find("#color-#{color[1..-1]}").click
            canvas.hover
            canvas.click
        end
    end

    scenario "User clicks publish to journal" do
        visit "/echoes-within"
        canvas = find('#react-sketch-canvas')
        find("#brush").click
        canvas.hover
        canvas.click
        find("#publish").click
        expect(page).to have_css('div[role="alertdialog"]')
        expect(page).to have_content("Write a caption for your drawing")
    end

    scenario "User saves drawing" do
        visit "/echoes-within"
        canvas = find('#react-sketch-canvas')
        find("#brush").click
        canvas.hover
        canvas.click
        find("#publish").click
        
        fill_in 'Time you enjoy wasting is not wasted time...', with: "Excited for what's to come"
        find('#continue').click
        sleep 1
        expect(page).to have_current_path("/activities")
        expect(page).to have_content("Drawing saved!")
    end

    scenario "User saves drawing without writing a caption" do
        visit "/echoes-within"
        canvas = find('#react-sketch-canvas')
        find("#brush").click
        canvas.hover
        canvas.click
        find("#publish").click
        find('#continue').click
        expect(page).to have_content("Please enter a caption for your drawing.")
        expect(page).to have_current_path("/echoes-within")
    end

    scenario "User cancels saving drawing" do
        visit "/echoes-within"
        canvas = find('#react-sketch-canvas')
        find("#brush").click
        canvas.hover
        canvas.click
        find("#publish").click
        find('#cancel').click
        expect(page).to have_current_path("/echoes-within")
    end

    scenario "User leaves without saving" do
        visit "/echoes-within"
        canvas = find('#react-sketch-canvas')
        find("#brush").click
        canvas.hover
        canvas.click
        find("#close").click
        expect(page).to have_css('div[role="alertdialog"]')
        expect(page).to have_content("Leaving would not save any changes to your journal.")

        click_on "Okay, I'll leave"
        expect(page).to have_current_path("/activities")
    end

    scenario "User resumes drawing after trying to leave without saving" do
        visit "/echoes-within"
        canvas = find('#react-sketch-canvas')
        find("#brush").click
        canvas.hover
        canvas.click
        find("#close").click
        expect(page).to have_css('div[role="alertdialog"]')
        expect(page).to have_content("Leaving would not save any changes to your journal.")

        click_on "No, I'll continue drawing"
        expect(page).to have_current_path("/echoes-within")
    end

end
