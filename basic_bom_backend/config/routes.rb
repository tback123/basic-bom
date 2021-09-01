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
      resources :locations

    end
  end

end
