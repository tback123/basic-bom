class AddPartType < ActiveRecord::Migration[6.1]
  def change
    add_column :parts, :bom_type, :string
  end
end
