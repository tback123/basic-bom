require 'swagger_helper'

RSpec.describe 'api/v1/parts', type: :request do
  
  path '/api/v1/parts' do
  
    get('list parts') do

      response '200', 'Parts listed' do
        let(:parts) { { title: 'foo', content: 'bar' } }
      
        before do |example|
          submit_request(example.metadata)
        end
      
        it 'returns a valid 201 response' do |example|
          assert_response_matches_metadata(example.metadata)
        end
      end

    end
  
    post('create part') do
    end
     
  end

  path '/api/v1/parts/{id}' do
    # You'll want to customize the parameter types...
    parameter name: 'id', in: :path, type: :string, description: 'id'

    get('show part') do
    end

    patch('update part') do
    end

    put('update part') do
    end

    delete('delete part') do
    end
      
  end

  path '/api/v1/parts/{part_id}/children' do
    # You'll want to customize the parameter types...
    parameter name: 'part_id', in: :path, type: :integer, description: 'part_id'
    
    get('children part') do
    end

    put('children_add part') do
    end

    delete('children_delete part') do
    end
    
  end

  path '/api/v1/parts/{part_id}/parents' do
    # You'll want to customize the parameter types...
    parameter name: 'part_id', in: :path, type: :string, description: 'part_id'

    get('parents part') do
    end

    put('parents_add part') do
    end

    delete('parents_delete part') do
    end
     
  end

end
