class CreatePartRelations < ActiveRecord::Migration[6.1]
  def change
    create_table :part_relations do |t|
      t.integer :parent_id, foreign_key: true
      t.integer :child_id, foreign_key: true
      t.timestamps
    end
  end
end
