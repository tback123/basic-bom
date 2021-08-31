class CreateMaterials < ActiveRecord::Migration[6.1]
  def change
    create_table :materials do |t|
      t.string :name
      t.text :properties
      t.timestamps
    end

    add_reference :parts, :material, index: true, foreign_key: true

  end
end
