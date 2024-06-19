class CreateArtPieces < ActiveRecord::Migration[7.1]
  def change
    create_table :art_pieces do |t|
      t.integer :artID
      t.text :captions
      t.string :artTitle

      t.timestamps
    end
  end
end
