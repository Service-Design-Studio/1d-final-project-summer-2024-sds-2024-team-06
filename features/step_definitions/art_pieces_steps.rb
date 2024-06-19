##Scenario 1: Participant begins Gallery Walk activity

Given('participant chosen to partake in the Gallery Walk') do
  visit '/gallery-walk' ##visit is a method that instructs the testing framework to
  #simulate a browser visit to that location
end

When('I choose a picture from the carousel') do
  click_on 'Picture' #If "Picture" is a link or button in your application's UI
  # (e.g., a thumbnail of a picture in a carousel), Capybara will simulate clicking on that link or button.
end

Then('a mp3 audio player and text box will be displayed alongside picture') do
  expect(page).to have_selector('.audio-player') # Assuming there's a CSS selector for the audio player
  expect(page).to have_selector('.text-box') # Assuming there's a CSS selector for the text box
  expect(page).not_to have_selector('.picture') # Assuming the other pictures are hidden
  #expect() set up expectation that something should be true
  #page is a special object provided by capybara, current page being tested
  #.to is an rspec matcher
  #have_XXX is a method
end

##Scenario 2: During the Activity, play voiceover to start

Given('I want to begin listening to voiceover') do
  visit '/gallery-walk'
end

When('I click the play button') do
  click_on 'Play' # Assuming 'Play' is the text or identifier for the play button
end

Then('audio will play') do
  expect(page).to have_selector('.audio-player') # Assuming there's an audio player element
  expect(page).to have_selector('.audio-playing') # Assuming the audio player indicates that it's playing
end

##Scenario 3: During the Activity, write text

Given('I am listening to the voice-over') do
  visit '/gallery-walk'
end

When('I want to express my emotions in writing') do
  fill_in 'Emotion', with: 'I feel excited' # Assuming 'Emotion' is the name or placeholder of the text input field
end

Then('text will be shown in the text box as accordance to user input') do
  expect(page).to have_field('Emotion', with: 'I feel excited') # Assuming 'Emotion' is the name or placeholder of the text input field
end

##Scenario 4: User has completed the Gallery Walk Activity

Given('User is done with the gallery walk') do
  visit '/gallery-walk'
end

When('they click the end activity button') do
  click_on 'End Activity' # Assuming 'End Activity' is the text or identifier for the end activity button
end

Then('the journal entry is automatically saved to their journal tab, browser redirect to journal') do
  expect(page).to have_text('Journal entry saved') # Assuming there's a confirmation message indicating successful saving
  expect(page).to have_current_path('/journal') # Assuming `/journal` is the path to the journal page
end

##Scenario 5: Viewing the list of art gallery

Given('there are art pieces in the database') do
  @art_pieces = ArtPiece.create([
    { artID: 123, artvoice: 'voice.com', captions: 'this is the one la sia', artTitle: 'mona lisa', image_url: 'mona.com' },
    { artID: 124, artvoice: 'yes.com', captions: 'eh nice', artTitle: 'van gogh', image_url: 'gogh.com' }
  ])
end

When('I visit the gallery walk page') do
  visit '/gallery-walk'
end

Then('I should see a list of art pieces') do
  @art_pieces.each do |art_piece|
    expect(page).to have_content(art_piece.title)
    expect(page).to have_content(art_piece.artist)
  end
end
