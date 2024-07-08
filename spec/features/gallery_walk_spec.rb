# spec/features/gallery_walk_spec.rb
require 'rails_helper'

RSpec.describe 'Gallery Walk', type: :feature do
  before(:each) do
    # Setup any necessary data or state before each test
  end

  describe 'participant chosen to partake in the Gallery Walk' do
    it 'visits the gallery walk page' do
      visit gallery_walk_path
      expect(page).to have_current_path(gallery_walk_path)
    end
  end

  describe 'choosing a picture from the carousel' do
    it 'displays an audio player and text box alongside the picture' do
      visit gallery_walk_path
      click_on 'Picture'
      expect(page).to have_selector('.audio-player')
      expect(page).to have_selector('.text-box')
      expect(page).not_to have_selector('.picture')
    end
  end

  describe 'listening to the voiceover' do
    it 'plays audio and displays captions' do
      visit gallery_walk_path
      click_on 'Play'
      expect(page).to have_selector('.audio-player')
      expect(page).to have_selector('.audio-playing')
    end
  end

  describe 'expressing emotions in writing' do
    it 'shows text in the text box according to user input' do
      visit gallery_walk_path
      fill_in 'Emotion', with: 'I feel excited'
      expect(page).to have_field('Emotion', with: 'I feel excited')
    end
  end

  describe 'completing the gallery walk' do
    it 'saves the journal entry and redirects to the journal page' do
      visit gallery_walk_path
      click_on 'End Activity'
      expect(page).to have_text('Journal entry saved')
      expect(page).to have_current_path(journal_path)
    end
  end

  describe 'viewing the list of art gallery' do
    it 'displays a list of art pieces from the database' do
      art_pieces = ArtPiece.create([
        { artID: 123, artvoice: 'voice.com', captions: 'this is the one la sia', artTitle: 'mona lisa', image_url: 'mona.com' },
        { artID: 124, artvoice: 'yes.com', captions: 'eh nice', artTitle: 'van gogh', image_url: 'gogh.com' }
      ])
      visit gallery_walk_path
      art_pieces.each do |art_piece|
        expect(page).to have_content(art_piece.artTitle)
        expect(page).to have_content(art_piece.captions)
      end
    end
  end
end

