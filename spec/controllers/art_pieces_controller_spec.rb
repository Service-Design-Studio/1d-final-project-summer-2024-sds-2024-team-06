# require 'rails_helper'

# RSpec.describe Api::ArtPiecesController, type: :controller do
#     let!(:user) { User.guest }
#     let!(:art_piece) {  ArtPiece.create(
#     artID: 0,
#     artTitle: "rspec image",
#     artist: "rpsec",
#     dateYear: Random.rand(1900..2021),
#     imageURL: "rspec image url",
#     audio:"rspec audio url",
#     captions: "") }

#     before do
#         sign_in user
#     end

#     after(:each) do
#         user.destroy if user.persisted?
#     end

#     describe "GET #index" do
#         it "returns a success response" do
#             get :index
#             expect(response).to have_http_status(:ok)
#         end

#         it "returns the correct list of art pieces" do
#             get :index
#             json_response = JSON.parse(response.body)
#             expect(json_response.size).to eq(ArtPiece.count)
#             expect(json_response.map { |art_piece| art_piece['id'] }).to include(art_piece.id)
#         end
#     end

#     describe "GET #show" do
#         it "returns a success response" do
#             get :show, params: { id: art_piece.id }
#             expect(response).to have_http_status(:ok)
#         end

#         it "returns the correct art piece" do
#             get :show, params: { id: art_piece.id }
#             json_response = JSON.parse(response.body)
#             expect(json_response['id']).to eq(art_piece.id)
#         end

#         it "returns a not found response for an invalid id" do
#             get :show, params: { id: 'invalid_id' }
#             expect(response).to have_http_status(:not_found)
#         end
#     end
# end