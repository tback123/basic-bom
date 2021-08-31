class CreateLocations < ActiveRecord::Migration[6.1]
  def change
    create_table :locations do |t|
      t.string :name
      t.string :building
      t.string :room
      t.string :area
      t.string :specifics
      t.text   :comments
      t.timestamps
    end

    add_reference :parts, :location, index: true, foreign_key: true

  end
end
