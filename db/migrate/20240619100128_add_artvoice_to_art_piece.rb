class AddArtvoiceToArtPiece < ActiveRecord::Migration[7.1]
  def change
    add_column :art_pieces, :artvoice, :string
  end
end
