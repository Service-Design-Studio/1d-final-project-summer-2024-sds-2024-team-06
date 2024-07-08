class RenameEmotionToMood < ActiveRecord::Migration[7.1]
  def change
    rename_column :flowers, :emotion, :mood
  end
end
