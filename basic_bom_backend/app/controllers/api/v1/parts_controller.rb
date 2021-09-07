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
                json_string_error_response(e)
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
                
                # Every part except installations must have at least one parent at creation
                unless @part.installation?
                    @parent = Part.find(params[:parent])
                    @relation = PartRelation.create(parent: @parent, child: @part)
                end

                if @part.valid?
                    # Save the part to the db
                    @part.save
                    json_response(@part)
                else
                    json_response(@part.errors, :bad_request)
                end
            rescue => e
                json_string_error_response(e)
            end

        end

        # GET /parts/:id
        def show
            begin
                @part = Part.find(params[:id])
                json_response(@part)
            rescue => e
                json_string_error_response(e)
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
                json_string_error_response(e)
            end
        end

        # DELETE /parts/:id
        def destroy
            begin
                @part = Part.find(params[:id])
                @part.destroy
                json_response("status"=>"success")
            rescue => e
                json_string_error_response(e)
            end 
            
        end

        # GET /parts/:part_id/children
        def children
            begin
                @children = Part.find(params[:part_id]).children
                json_response(@children)
            rescue => e
                json_string_error_response(e)
            end
        end

        # PUT /parts/:part_id/children
        # Requires 1 param :child_id to add
        def children_add
            begin
                @parent = Part.find(params[:part_id])
                @child = Part.find(params[:child_id])
                PartRelation.create(parent: @parent, child: @child)

                # Once added the new child, return all children of the part
                @children = Part.find(params[:part_id]).children
                json_response(@children)
            rescue => e
                json_string_error_response(e)
            end
        end

        # DELETE /parts/:part_id/children
        # Requires 1 param :child_id to add
        def children_delete
            begin
                @relation = PartRelation.where(parent_id: params[:part_id], child: params[:child_id]).first
                
                # If the relation exists, destroy it
                unless @relation.nil? 
                    @relation.destroy
                end

                # Once delete the child, return all children of the part
                @children = Part.find(params[:part_id]).children
                json_response(@children)

            rescue => e
                json_string_error_response(e)
            end
        end

        # GET /parts/:part_id/parents
        def parents
            begin
                @parents = Part.find(params[:part_id]).parents
                json_response(@parents)
            rescue => e
                json_string_error_response(e)
            end
        end

        # PUT /parts/:part_id/parents
        # Requires 1 param :parent_id to add
        def parents_add
            begin
                @parent = Part.find(params[:parent_id])
                @child = Part.find(params[:part_id])
                PartRelation.create(parent: @parent, child: @child)

                # Once added the new parent, return all parents of the part
                @parents = Part.find(params[:part_id]).parents
                json_response(@parents)
            rescue => e
                json_string_error_response(e)
            end
        end

        # DELETE /parts/:part_id/parents
        # Requires 1 param :parent_id to add
        def parents_delete
            begin
                @relation = PartRelation.where(parent_id: params[:parent_id], child: params[:part_id]).first
                
                # If the relation exists, destroy it
                unless @relation.nil? 
                    @relation.destroy
                end

                # Once delete the child, return all children of the part
                @parents = Part.find(params[:part_id]).parents
                json_response(@parents)

            rescue => e
                json_string_error_response(e)
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
                            :parent,
                            :child,
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