Rails.application.routes.draw do

  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'

  root "parts#index"

  namespace :api do
    namespace :v1 do
      
      # Parts routes
      resources :parts do
        get '/children', to: 'parts#children'
        put '/children', to: 'parts#children_add'
        delete '/children', to: 'parts#children_delete'

        get '/parents', to: 'parts#parents'
        put '/parents', to: 'parts#parents_add'
        delete '/parents', to: 'parts#parents_delete'

      end

      # Material routes
      resources :materials do
        get '/parts', to: 'materials#parts'
      end

      # Location routes
      resources :locations do
        get '/parts', to: 'locations#parts'
      end

      # Supplier routes
      resources :suppliers do
        get '/parts', to: 'suppliers#parts'
      end

    end
  end

end
