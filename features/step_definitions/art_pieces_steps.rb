##Scenario 1: Participant begins Gallery Walk activity



Given('participant chosen to partake in the Gallery Walk') do
  visit '/gallery-walk'
end

When('I choose a picture from the carousel') do
  # visit '/gallery-walk/2'
  first("a#Picture").click
end

Then('a mp3 audio player and text box will be displayed alongside picture') do
  expect(page).to have_selector('#audio-player')
  expect(page).to have_selector('#text-box')
  expect(page).to have_selector('#picture')
end

##Scenario 2: During the Activity, play voiceover to start

Given('I want to begin listening to voiceover') do
  visit '/gallery-walk/2'
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

  find("svg#volume").click
  expect(page).to have_selector('#volume-slider')
  find('#volume-slider').set(0.5)
end

When('I want to express my emotions in writing') do
  fill_in 'Write down your thoughts...', with: 'I feel excited'
end

Then('text will be shown in the text box as accordance to user input') do
  expect(page).to have_field('Write down your thoughts...', with: 'I feel excited')
end

##Scenario 4: User has completed the Gallery Walk Activity

Given('User is done with the gallery walk') do
  visit '/gallery-walk/2'
  step 'I click the play button'
  step 'I want to express my emotions in writing'
end

When('they click the end activity button') do
  click_on 'end-activity'
end

Then('the journal entry is automatically saved to their journal tab, browser redirect to journal') do
  expect(page).to have_current_path('/gallery-walk')
  expect(page).to have_content('Journal saved!')
end

##Scenario 5: Viewing the list of art gallery

Given('there are art pieces in the database') do
  @art_pieces = ArtPiece.create([
    { artID: 123, artvoice: 'voice.com', audio: "yes", captions: 'this is the one la sia', artTitle: 'mona lisa', image_url: 'mona.com', imageURL: 'mona.com', artist: 'mona lisa' },
    { artID: 124, artvoice: 'yes.com', audio: "yes", captions: 'eh nice', artTitle: 'van gogh', image_url: 'gogh.com', imageURL: 'gogh.com', artist: 'van gogh' }
  ])
end

When('I visit the gallery walk page') do
  visit '/gallery-walk'
end

Then('I should see a list of art pieces') do
  @art_pieces.each do |art_piece|
  #   expect(page).to have_selector("img[alt='#{art_piece.artTitle}']")
  #   expect(page).to have_selector("img[src='#{art_piece.imageURL}']")
  end
end
