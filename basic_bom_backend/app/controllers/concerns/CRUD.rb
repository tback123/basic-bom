module CRUD
    include Response
  
    # Gets and HTTP retuns a list of all items matching the possible_params
    # If no params are given, returns a list of all instances of the model
    def default_index(possible_parms, model)
        begin
            if possible_parms.empty?
                @items = model.all
                json_response(@items)
            else
                @items = model.where(possible_parms)
                json_response(@items)
            end
        rescue => e
            json_string_error_responsee(e)
        end
    end

    # Creates an instance of the model and saves it to the DB. 
    def default_create(required_params, model)
        begin
            # Create and save a new item with the model paramaters
            @item = model.create(required_params)

            if @item.valid?
                json_response(@item)
            else
                json_response(@item.errors, :bad_request)
            end
        rescue => e
            json_string_error_responsee(e)
        end
    end

    # Gets and return the item matching the id
    def default_show(id, model)
        begin
            @item = model.find(id)
            json_response(@item)
        rescue => e
            json_string_error_responsee(e)
        end
    end

    # Given an id, gets and updates that model with the parameters given in the possible_params field
    # Note this will not be able to upate any associates, that must be done seperatly
    def default_update(id, possible_params, model)
        begin
            @item = model.find(id)

            # Update regular fields of the item
            @item.update(possible_params)

            @item.save()

            json_response(@item)
        rescue => e
            json_string_error_responsee(e)
        end
    end

    def default_destroy(id, model)
        begin
            @item = model.find(id)
            @item.destroy
            json_response("status"=>"success")
        rescue => e
            json_string_error_responsee(e)
        end 
    end
  end