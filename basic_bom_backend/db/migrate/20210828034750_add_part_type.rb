class AddPartType < ActiveRecord::Migration[6.1]
  def change
    add_column :parts, :bom_type, :integer
    add_column :parts, :source, :integer
  end
end
