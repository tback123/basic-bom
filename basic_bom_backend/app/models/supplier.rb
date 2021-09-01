class Supplier < ApplicationRecord
    has_many :parts, inverse_of: :supplier
end
