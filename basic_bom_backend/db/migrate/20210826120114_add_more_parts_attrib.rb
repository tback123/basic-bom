class AddMorePartsAttrib < ActiveRecord::Migration[6.1]
  def change
    add_column :parts, :part_num, :string
    add_column :parts, :revision, :int
    add_column :parts, :qty_per, :int
    add_column :parts, :order_qty, :int
    add_column :parts, :design_eng_comments, :string
    add_column :parts, :stock, :int
  end
end
