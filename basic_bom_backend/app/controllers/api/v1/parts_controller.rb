module Api::V1
    class PartsController < ApplicationController
        include Response
        
        # GET /parts
        # If no parameters corresponding to a part attribute, return list of all parts
        # If there is one or more part_parameters, return list all parts matching search criteria
        def index
            begin
                if possible_part_params.empty?
                    @parts = Part.all
                    json_response(@parts)
                else
                    @parts = Part.where(possible_part_params)
                    json_response(@parts)
                end
            rescue => e
                json_response(e, :bad_request)
            end
            
        end

        # POST /parts
        def create

            begin
                # Get a new part with given part params
                @part = Part.new(create_part_params)

                # Find and add the material to part 
                @part.material = Material.find(params[:material])

                # Find and add the location to part
                @part.location = Location.find(params[:location])

                # Find and add supplier to part
                @part.supplier = Supplier.find(params[:supplier])

                # Save the part to the db
                @part.save

                if @part.valid?
                    json_response(@part)
                else
                    json_response(@part.errors, 400)
                end
            rescue => e
                json_response(e, :bad_request)
            end

        end

        # GET /parts/:id
        def show
            begin
                @part = Part.find(params[:id])
                json_response(@part)
            rescue => e
                json_response(e, :bad_request)
            end
        end

        # PATCH /parts/:id
        # PUT   /parts/:id
        def update
            begin
                @part = Part.find(params[:id])

                # Update regular fields of the part
                @part.update(possible_part_params)

                # Update relational fields
                params.has_key?(:material) ? @part.material = Material.find(params[:material]) :
                params.has_key?(:location) ? @part.location = Location.find(params[:location]) :
                params.has_key?(:supplier) ? @part.supplier = Supplier.find(params[:supplier]) :

                @part.save()
                json_response(@part)
            rescue => e
                json_response(e, :bad_request)
            end
        end

        # DELETE /parts/:id
        def destroy
            begin
                @part = Part.find(params[:id])
                @part.destroy
                json_response("status"=>"success")
            rescue => e
                json_response(e, :bad_request)
            end 
            
        end

        private
            def possible_part_params
                params.permit(:description, 
                            :drawing, 
                            :id, 
                            :created_at, 
                            :updated_at,
                            :part_num,
                            :revision,
                            :qty_per,
                            :order_qty,
                            :design_eng_comments,
                            :stock_qty,
                            :bom_type,
                            :location,
                            :material,
                            :supplier,
                            :source)
            end

            def create_part_params
                params.permit(:description, 
                    :drawing, 
                    :part_num,
                    :revision,
                    :qty_per,
                    :order_qty,
                    :design_eng_comments,
                    :stock_qty,
                    :bom_type,
                    :source)
            end

    end
end