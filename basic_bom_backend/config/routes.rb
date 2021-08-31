Rails.application.routes.draw do

  root "parts#index"

  namespace :api do
    namespace :v1 do
      
      # Parts route
      resources :parts

      # Material routes
      resources :materials do
        get '/parts', to: 'materials#parts'
      end

    end
  end

end
