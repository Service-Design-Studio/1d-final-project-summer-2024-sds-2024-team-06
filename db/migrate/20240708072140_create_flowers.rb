class CreateFlowers < ActiveRecord::Migration[7.1]
  def change
    create_table :flowers do |t|
      t.string :color
      t.string :emotion
      t.integer :user_id
      t.date :date_created

      t.timestamps
    end
  end
end
