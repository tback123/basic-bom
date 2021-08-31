class Api::V1::MaterialsController < ApplicationController
    include Response
        
    # GET /materials
    # If no parameters corresponding to a material attribute, return list of all materials
    # If there is one or more possible_material_params, return list all materials matching search criteria
    def index
        begin
            if possible_material_params.empty?
                @materials = Material.all
                json_response(@materials)
            else
                @materials = Material.where(possible_material_params)
                json_response(@materials)
            end
        rescue => e
            json_response(e, :bad_request)
        end
        
    end

    # POST /materials
    def create
        begin
            # Create and save a new part with the book paramaters
            @material = Material.create(create_material_params)

            if @material.valid?
                json_response(@material)
            else
                json_response(@material.errors, :bad_request)
            end
        rescue => e
            json_response(e, :bad_request)
        end

    end

    # GET /materials/:id
    def show
        begin
            @material = Material.find(params[:id])
            json_response(@material)
        rescue => e
            json_response(e, :bad_request)
        end
    end

    # PATCH /materials/:id
    # PUT   /materials/:id
    # TODO: Deal with case where search parameter matches with multiple materials
    def update
        begin
            @material = Material.first(possible_material_params)
            @material.update(possible_material_params)
            @material.save()
            json_response(@material)
        rescue => e
            json_response(e, :bad_request)
        end
    end

    # DELETE /materials/:id
    def destroy
        begin
            @material = Material.find(params[:id])
            @material.destroy
            json_response("status"=>"success")
        rescue => e
            json_response(e, :bad_request)
        end 
        
    end

    # GET /materials/:material_id/parts
    def parts
        begin
            @material = Material.find(params[:material_id])
            @parts = @material.parts
            json_response(@parts)
        rescue => e
            json_response(e, :bad_request)
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
