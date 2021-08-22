class CreateParts < ActiveRecord::Migration[6.1]
  def change
    create_table :parts do |t|
      t.string :descrition
      t.boolean :drawing
      t.timestamps
    end
  end
end
