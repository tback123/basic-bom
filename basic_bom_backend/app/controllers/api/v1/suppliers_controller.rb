class Api::V1::SuppliersController < ApplicationController
    include Response
    include CRUD
        
    # GET /suppliers
    # If no parameters corresponding to a supplier attribute, return list of all suppliers
    # If there is one or more possible_supplier_params, return list all suppliers matching search criteria
    def index
        default_index(possible_supplier_params, Supplier)
    end

    # POST /suppliers
    def create
        default_create(create_supplier_params, Supplier)
    end

    # GET /suppliers/:id
    def show
        default_show(params[:id], Supplier)
    end

    # PATCH /suppliers/:id
    # PUT   /suppliers/:id
    def update
        default_update(params[:id], possible_supplier_params, Supplier)
    end

    # DELETE /suppliers/:id
    def destroy
        default_destroy(params[:id], Supplier)
        
    end

    def parts
        begin
            @supplier = Supplier.find(params[:supplier_id])
            @parts = @supplier.parts
            json_response(@parts)
        rescue => e
            json_response(e, :bad_request)
        end
    end

    private
        def possible_supplier_params
            params.permit(:name,
                        :building,
                        :room,
                        :area,
                        :specifics,
                        :comments,
                        :id, 
                        :created_at, 
                        :updated_at)
        end

        def create_supplier_params
            params.permit(:name, :building, :room,
                :area,
                :specifics,
                :comments,)
        end
end
