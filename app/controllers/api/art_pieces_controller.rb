module Api
  class ArtPiecesController < ApplicationController
    before_action :set_art_piece, only: [:show]
    # GET /api/art_pieces
    def index
      @art_pieces = ArtPiece.all
      # @art_pieces = ArtPiece.find(1)
      render json: @art_pieces
    end

    # GET /api/art_pieces/:id
    def show
      @art_piece = ArtPiece.find(params[:id])
      render json: @art_piece
    end

    private

    def set_art_piece
      @art_piece = ArtPiece.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      render json: { error: 'ArtPiece not found' }, status: :not_found
    end
  end
end