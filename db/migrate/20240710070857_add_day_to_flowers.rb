class AddDayToFlowers < ActiveRecord::Migration[7.1]
  def change
    add_column :flowers, :day, :integer
  end
end
