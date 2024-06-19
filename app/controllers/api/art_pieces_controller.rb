module Api
  class ArtPiecesController < ApplicationController
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

    # Other actions like create, update, destroy, etc. could be defined here if needed.
  end
end



# class ArtPiecesController < ApplicationController
#   def new
#     @art_piece = ArtPiece.new
#   end

#   def create
#     @art_piece = ArtPiece.new(art_piece_params)
#     if @art_piece.save
#       redirect_to @art_piece
#     else
#       render 'new'
#     end
#   end

#   def show
#     @art_piece = ArtPiece.find(params[:id])
#   end

#   private

#   def art_piece_params
#     params.require(:art_piece).permit(:artID, :captions, :artTitle, :image_url)
#   end


# end
