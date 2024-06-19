class ArtPiece < ApplicationRecord
  validates :image_url, presence: true
  # ^ above adds validation to ensure image_url is present in a row in the database (I think?)
end
