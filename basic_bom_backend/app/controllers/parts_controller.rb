class PartsController < ApplicationController

    include Response
    
    # GET /parts
    def index
        @parts = Part.all
        json_response(@parts)
    end

    # POST /parts
    def create
        # Create and save a new part with the book paramaters
        @part = Part.create(part_params)

        puts part_params

        if @part.valid?
            # Send part back
            json_response(@part)
            
        else
            json_response(@part.errors, 400)
        end

        
    end

    # GET /parts/:id
    def show
        @part = Part.find(params[:id])
        json_response(@part)
    end

    # PATCH /parts/:id
    # PUT   /parts/:id
    def update
        puts part_params
        @part = Part.find(params[:id])
        @part.update(part_params)
        @part.save()
        json_response(@part)
    end

    # DELETE /parts/:id
    def destroy
        not_implemented()
    end

    private
        def part_params
            params.permit(:description, :drawing )
        end

end
