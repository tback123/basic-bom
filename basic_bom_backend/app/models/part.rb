class Part < ApplicationRecord

    validates :description, presence: true
    validates :drawing, :inclusion => { :in => [true, false] }
    
end
