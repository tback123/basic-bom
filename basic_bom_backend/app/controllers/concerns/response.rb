# app/controllers/concerns/response.rb
module Response
    def json_response(object, status = :ok)
      render json: object, status: status
    end

    def not_implemented()
      json_response("Not implemented", 501)
    end
  end