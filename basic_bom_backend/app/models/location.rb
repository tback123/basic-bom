class Location < ApplicationRecord
    has_many :parts, inverse_of: :location

    validates   :name,  presence: true
end
