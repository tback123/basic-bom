# app/controllers/concerns/response.rb
module Response
  def json_response(object, status = :ok)
    render json: object, status: status
  end

  def json_string_error_response(string)
    json_response({"error": [string]}, :bad_request)
  end

  def not_implemented()
    json_response("Not implemented", :not_implemented)
  end
end