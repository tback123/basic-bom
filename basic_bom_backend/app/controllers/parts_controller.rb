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

        if @part.valid?
            json_response(@part)
        else
            json_response(@part.errors, 400)
        end
    end

    # GET /parts/:id
    def show
        begin
            @part = Part.find(params[:id])
            json_response(@part)
        rescue => e
            json_response(e, 400)
        end
    end

    # PATCH /parts/:id
    # PUT   /parts/:id
    def update
        begin
            @part = Part.find(params[:id])
            @part.update(part_params)
            @part.save()
            json_response(@part2)
        rescue => e
            json_response(e, 400)
        end
    end

    # DELETE /parts/:id
    def destroy
        begin
            @part = Part.find(params[:id])
            @part.destroy
            json_response("")
        rescue => e
            json_response(e, 400)
        end 
        
    end

    private
        def part_params
            params.permit(:description, :drawing, :id, :created_at, :updated_at )
        end

end
