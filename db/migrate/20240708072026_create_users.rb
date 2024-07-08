class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      t.string :username
      t.integer :user_id
      t.date :dateLastLoggedIn

      t.timestamps
    end
  end
end
