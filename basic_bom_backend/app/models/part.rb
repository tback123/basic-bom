class Part < ApplicationRecord

    enum bom_type: [:component, :assembly, :installation]
    enum source: [:internal, :external]

    validates   :description,  presence: true
    validates   :drawing,   :inclusion => { :in => [true, false] }
    validates   :part_num,  presence: true#, uniqueness: true
    validates   :revision,  presence: true
    validates   :qty_per,   presence: true
    validates   :order_qty, presence: true
    validates   :design_eng_comments, presence: true
    validates   :stock_qty, presence: true
    validates   :bom_type,  presence: true
    validates   :source,    presence: true

    belongs_to :material, inverse_of: :parts
    belongs_to :location, inverse_of: :parts
    belongs_to :supplier, inverse_of: :parts

    # TODO: Ask someone why the foreign keys being in this order make it work in the expected way
    has_many :child_relations, foreign_key: :parent_id, class_name: "PartRelation"
    has_many :children, through: :child_relations

    has_many :parent_relations, foreign_key: :child_id, class_name: "PartRelation"
    has_many :parents, through: :parent_relations
    
end
