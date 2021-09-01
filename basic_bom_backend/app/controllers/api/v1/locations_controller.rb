class Api::V1::LocationsController < ApplicationController
    include Response
    include CRUD
        
    # GET /locations
    # If no parameters corresponding to a location attribute, return list of all locations
    # If there is one or more possible_location_params, return list all locations matching search criteria
    def index
        default_index(possible_location_params, Location)
    end

    # POST /locations
    def create
        default_create(create_location_params, Location)
    end

    # GET /locations/:id
    def show
        default_show(params[:id], Location)
    end

    # PATCH /locations/:id
    # PUT   /locations/:id
    def update
        default_update(params[:id], possible_location_params, Location)
    end

    # DELETE /locations/:id
    def destroy
        default_destroy(params[:id], Location)
        
    end

    def parts
        begin
            @location = Location.find(params[:location_id])
            @parts = @location.parts
            json_response(@parts)
        rescue => e
            json_response(e, :bad_request)
        end
    end

    private
        def possible_location_params
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

        def create_location_params
            params.permit(:name, :building, :room,
                :area,
                :specifics,
                :comments,)
        end

end
