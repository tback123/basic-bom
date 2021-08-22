class PartsController < ApplicationController

    include Response
    
    # GET /parts
    def index
        @parts = Part.all
        json_response(@parts)
    end

    # POST /parts
    def create
        not_implemented()
    end

    # GET /parts/:id
    def show
        not_implemented()
    end

    # PATCH /parts/:id
    # PUT   /parts/:id
    def update
        not_implemented()
    end

    # DELETE /parts/:id
    def destroy
        not_implemented()
    end

end
