class FixColumnName < ActiveRecord::Migration[6.1]
  def change
    rename_column "parts", "descrition", "description"
  end
end
