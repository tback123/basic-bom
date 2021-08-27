class RenameStock < ActiveRecord::Migration[6.1]
  def change
    rename_column "parts", "stock", "stock_qty"
  end
end
