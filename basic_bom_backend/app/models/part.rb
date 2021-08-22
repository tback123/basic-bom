class Part < ApplicationRecord

    validates :description, presence: true
    validates :drawing, presence: true
end
