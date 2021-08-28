class Part < ApplicationRecord

    validates   :description,  presence: true
    validates   :drawing,   :inclusion => { :in => [true, false] }
    validates   :part_num,  presence: true
    validates   :revision,  presence: true
    validates   :qty_per,   presence: true
    validates   :order_qty, presence: true
    validates   :design_eng_comments, presence: true
    validates   :stock_qty, presence: true
    validates   :bom_type,  :inclusion => { :in => ["component", "int_assembly", "ext_assembly", "installation"]}
    
end
