class Location < ApplicationRecord
    has_many :parts, inverse_of: :material
end
