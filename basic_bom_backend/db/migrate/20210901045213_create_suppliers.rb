class CreateSuppliers < ActiveRecord::Migration[6.1]
  def change
    create_table :suppliers do |t|
      t.string :name
      t.text :contact_info
      t.text :address
      t.text :comments
      t.timestamps
    end

    add_reference :parts, :supplier, index: true, foreign_key: true
  end
end
