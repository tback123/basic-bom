class PartRelation < ApplicationRecord

    belongs_to :parent, class_name: "Part"
    validates_associated :parent
    validates_presence_of :parent

    belongs_to :child, class_name: "Part"
    validates_associated :child
    validates_presence_of :child

end
