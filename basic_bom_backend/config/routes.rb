Rails.application.routes.draw do

  root "parts#index"

  namespace :api do
    namespace :v1 do
      resources :parts
    end
  end

end
