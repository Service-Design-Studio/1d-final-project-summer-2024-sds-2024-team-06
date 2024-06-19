class AddArtImageToArtPieces < ActiveRecord::Migration[7.1]
  def change
    add_column :art_pieces, :image_url, :string
  end
end
