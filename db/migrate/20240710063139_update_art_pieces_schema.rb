class UpdateArtPiecesSchema < ActiveRecord::Migration[7.1]
  def change
    change_column :art_pieces, :artID, :string
    change_column :art_pieces, :captions, :string
    add_column :art_pieces, :artist, :string
    add_column :art_pieces, :dateYear, :string
    add_column :art_pieces, :imageURL, :string
    add_column :art_pieces, :audio, :string

    # To avoid potential conflicts, we can drop and re-add image_url if necessary
    remove_column :art_pieces, :image_url, :string
    add_column :art_pieces, :image_url, :string

    # If the artvoice column is already present, this line can be omitted
    add_column :art_pieces, :artvoice, :string unless column_exists?(:art_pieces, :artvoice)
  end
end
