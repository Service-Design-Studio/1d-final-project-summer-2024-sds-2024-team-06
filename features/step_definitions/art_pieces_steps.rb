Given('there are art pieces in the database') do
  @art_pieces = ArtPiece.create([
    { title: 'Mona Lisa', artist: 'Leonardo da Vinci' },
    { title: 'Starry Night', artist: 'Vincent van Gogh' }
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
