class CreateMoods < ActiveRecord::Migration[7.1]
  def change
    create_table :moods do |t|
      t.string :name
      t.string :color
      t.string :hexcode
      t.integer :user_id

      t.timestamps
    end
  end
end
