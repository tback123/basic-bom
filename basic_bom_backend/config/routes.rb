Rails.application.routes.draw do

  root "parts#index"

  namespace :api do
    namespace :v1 do
      
      # Parts routes
      resources :parts

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
