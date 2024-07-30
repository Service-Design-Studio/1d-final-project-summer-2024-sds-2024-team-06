class AddDaymonthAndMonthToFlowers < ActiveRecord::Migration[7.1]
  def change
    add_column :flowers, :day_month, :integer
    add_column :flowers, :month, :integer
  end
end
