class CreateFlowers < ActiveRecord::Migration[7.1]
  def change
    create_table :flowers do |t|
      t.string :color
      t.string :mood
      t.date :date_created
      t.integer :user_id, null: false
      t.datetime :created_at, null: false
      t.datetime :updated_at, null: false
      t.index :user_id, name: "index_flowers_on_user_id"
    end
  end
end


# class CreateFlowers < ActiveRecord::Migration[7.1]
#   def change
#     create_table :flowers do |t|
#       t.string :color
#       t.string :mood
#       t.date :date_created
#       t.references :user, null: false, foreign_key: true

#       t.timestamps
#     end
#   end
# end
