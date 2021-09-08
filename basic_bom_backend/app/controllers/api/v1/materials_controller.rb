class Api::V1::MaterialsController < ApplicationController
    include Response
    include CRUD
        
    # GET /materials
    # If no parameters corresponding to a material attribute, return list of all materials
    # If there is one or more possible_material_params, return list all materials matching search criteria
    def index
        default_index(possible_material_params, Material)
    end

    # POST /materials
    def create
        default_create(create_material_params, Material)
    end

    # GET /materials/:id
    def show
        default_show(params[:id], Material)
    end

    # PATCH /materials/:id
    # PUT   /materials/:id
    # TODO: Deal with case where search parameter matches with multiple materials
    def update
        default_update(params[:id], possible_material_params, Material)
    end

    # DELETE /materials/:id
    def destroy
        default_destroy(params[:id], Material)
    end

    # GET /materials/:material_id/parts
    def parts
        begin
            @material = Material.find(params[:material_id])
            @parts = @material.parts
            json_response(@parts)
        rescue => e
            json_string_error_response(e)
        end
    end

    private
        def possible_material_params
            params.permit(:name,
                        :id, 
                        :created_at, 
                        :updated_at,
                        :properties)
        end

        def create_material_params
            params.permit(:name,
                        :properties)
        end
end
