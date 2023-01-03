Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'string_revert/index'
      post 'string_revert/create'
      get 'string_revert/show'
      get 'string_revert/destroy'
      get 'recipes/index'
      post 'recipes/create'
      get '/show/:id', to: 'recipes#show'
      delete '/destroy/:id', to: 'recipes#destroy'
    end
  end
  root 'homepage#index'
  get '/*path' => 'homepage#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end