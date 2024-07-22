require 'rails_helper'

RSpec.describe Api::ArtPiecesController, type: :controller do
  let!(:user) { User.create(email: "rspec@example.com", password: "password", password_confirmation: "password", dateLastLoggedIn: Date.today) }
  let!(:art_piece) do
    ArtPiece.create(
      artID: 1,
      artTitle: "Another rspec image",
      artist: "Another rspec",
      dateYear: Random.rand(1900..2021),
      imageURL: "Another rspec image url",
      audio: "Another rspec audio url",
      captions: ""
    )
  end

  before do
    sign_in user
  end

  after(:each) do
    user.destroy if user.persisted?
  end

  describe "GET #index without user signed in" do
    it "requires user to be signed in" do
      sign_out :user
      get :index
      expect(response).to have_http_status(:redirect)
    end
  end

  describe "GET #index with no art pieces" do
    before do
      ArtPiece.delete_all
    end

   it "returns an empty array" do
        get :index, format: :json
        json_response = JSON.parse(response.body)
        expect(json_response).to be_empty
    end
  end

  describe "GET #show with JSON response" do
    it "responds with JSON formatted output" do
      get :show, params: { id: art_piece.id }, format: :json
      expect(response.content_type).to eq("application/json; charset=utf-8")
    end
  end
end