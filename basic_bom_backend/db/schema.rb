# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_09_01_045213) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "locations", force: :cascade do |t|
    t.string "name"
    t.string "building"
    t.string "room"
    t.string "area"
    t.string "specifics"
    t.text "comments"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "materials", force: :cascade do |t|
    t.string "name"
    t.text "properties"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "parts", force: :cascade do |t|
    t.string "description"
    t.boolean "drawing"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "part_num"
    t.integer "revision"
    t.integer "qty_per"
    t.integer "order_qty"
    t.string "design_eng_comments"
    t.integer "stock_qty"
    t.integer "bom_type"
    t.integer "source"
    t.bigint "material_id"
    t.bigint "location_id"
    t.bigint "supplier_id"
    t.index ["location_id"], name: "index_parts_on_location_id"
    t.index ["material_id"], name: "index_parts_on_material_id"
    t.index ["supplier_id"], name: "index_parts_on_supplier_id"
  end

  create_table "suppliers", force: :cascade do |t|
    t.string "name"
    t.text "contact_info"
    t.text "address"
    t.text "comments"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "parts", "locations"
  add_foreign_key "parts", "materials"
  add_foreign_key "parts", "suppliers"
end
