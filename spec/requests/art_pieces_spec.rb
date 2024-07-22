require 'rails_helper'

RSpec.describe "ArtPieces", type: :request do
  include Devise::Test::IntegrationHelpers

  let!(:user) { User.create(email: 'rspec@test.com', password: 'password', password_confirmation: 'password', dateLastLoggedIn: Date.today) }
  let!(:art_piece) do
    ArtPiece.create(
      artID: 0,
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
  end

  describe "GET /api/art_pieces" do
    it "returns a success response" do
      get api_art_pieces_path
      expect(response).to have_http_status(:ok)
    end

    it "returns the correct list of art pieces" do
      get api_art_pieces_path
      json_response = JSON.parse(response.body)
      expect(json_response.size).to eq(ArtPiece.count)
      expect(json_response.map { |art_piece| art_piece['id'] }).to include(art_piece.id)
    end
  end

  describe "GET /api/art_pieces/:id" do
    it "returns a success response" do
      get api_art_piece_path(art_piece)
      expect(response).to have_http_status(:ok)
    end

    it "returns the correct art piece" do
      get api_art_piece_path(art_piece)
      json_response = JSON.parse(response.body)
      expect(json_response['id']).to eq(art_piece.id)
    end

    it "returns a not found response for an invalid id" do
      get api_art_piece_path(id: "invalid id")
      expect(response).to have_http_status(:not_found)
    end
  end
end