class RemoveAttributeNameFromFlower < ActiveRecord::Migration[7.1]
  def change
    remove_column :flowers, :userId, :integer
  end
end
