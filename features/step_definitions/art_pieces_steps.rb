##Scenario 1: Participant begins Gallery Walk activity



Given('participant chosen to partake in the Gallery Walk') do
  visit '/mood-tracker'
  sleep 5
end

When('I navigate to the activities page') do
  page.execute_script('document.elementFromPoint(0, 0).click();')
end

And('I should see a carousel of art pieces') do
  ArtPiece.all.each do |art_piece|

    Capybara.using_wait_time(1) do
      while !page.has_text?(art_piece.artTitle)
        find('button#next-button').click
      end
    end

    expect(page).to have_selector("img[src='#{art_piece.imageURL}']", visible: true)
    expect(page).to have_content(art_piece.dateYear)
    expect(page).to have_content(art_piece.artist)
  end
end

When('I navigate to the Gallery Walk') do
  visit '/gallery-walk'
  step 'I should see a flower loading screen'
end


And('I choose a picture from the carousel') do
  find('button#next-button').click
  find('button#back-button').click
  find('img#Picture').click
end

Then('a mp3 audio player and text box will be displayed alongside picture') do
  expect(page).to have_selector('#audio-player')
  expect(page).to have_selector('#text-box')
  expect(page).to have_selector('#picture')
end

##Scenario 2: During the Activity, play voiceover to start

Given('I am in a Gallery Walk session') do
  visit '/gallery-walk/3'
end

When('I click the play button') do
  click_on 'play'
end

Then('audio will play') do
  expect(page).to have_selector('#audio-player')
  expect(page).to have_selector('#audio-playing')
end

##Scenario 3: During the Activity, write text

Given('I am listening to the voice-over') do
  visit '/gallery-walk/2'
  step 'I click the play button'

  click_on 'forward'
  click_on 'rewind'

  find('img#volume').click
  expect(page).to have_selector('#volume-slider')
  find('#volume-slider').set(0.5)
end

When('I want to express my emotions in writing') do
  text_box = find("textarea[placeholder=\"Let's pen down some thoughts...\"]")
end

Then("I will type in the text box provided") do
  fill_in "Let's pen down some thoughts...", with: 'I feel excited'
end

And('the text box will show my input') do
  expect(page).to have_field("Let's pen down some thoughts...", with: 'I feel excited')
end

##Scenario 4: User has completed the Gallery Walk Activity

Given('I have finished writing my journal') do
  step 'I am listening to the voice-over'
  step 'I will type in the text box provided'
  step 'the text box will show my input'
end

When('I click on {string}') do |button_text|
  click_on button_text
end

Then('I should be redirected to my saved journal entry') do
  sleep 2
  user = User.find_by(email: 'bob@example.com')
  latest_gallery_journal = user.gallery_journals.last
  expect(page).to have_current_path("/journal/#{latest_gallery_journal.id}?type=gallery")
  expect(page).to have_content(latest_gallery_journal.journal_entry)
  expect(page).to have_content(latest_gallery_journal.journal_title)
  expect(page).to have_selector("img")
end
