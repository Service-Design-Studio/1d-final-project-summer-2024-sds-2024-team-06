##Scenario 1: Participant begins Gallery Walk activity

Given('participant chosen to partake in the Gallery walk') do

end

When('I choose a picture from the carousel') do

end

Then('the other pictures should disappear, a mp3 audio player and text box will be displayed') do

end

##Scenario 2: During the Activity

Given('I am listening to the voice-over') do

end

When('I want to express my emotions in writing') do
  visit art_pieces_path
end

Then('text will be shown in the text box as accordance to user input') do

end

##Scenario 3: User has completed the Gallery Walk Activity

Given('User is done with the gallery walk') do

end

When('they click the end activity button') do
  visit art_pieces_path
end

Then('the journal entry is automatically saved to their journal tab, browser redirect to journal') do

end

##Scenario 4: Viewing the list of art gallery

Given('there are art pieces in the database') do
  @art_pieces = ArtPiece.create([
    { artID: 123, artvoice: 'voice.com', captions: 'this is the one la sia', artTitle: 'mona lisa', image_url: 'mona.com' },
    { artID: 124, artvoice: 'yes.com', captions: 'eh nice', artTitle: 'van gogh', image_url: 'gogh.com' }
  ])
end

When('I visit the art pieces page') do
  visit art_pieces_path
end

Then('I should see a list of art pieces') do
  @art_pieces.each do |art_piece|
    expect(page).to have_content(art_piece.title)
    expect(page).to have_content(art_piece.artist)
  end
end
