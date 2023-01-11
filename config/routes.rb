Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  namespace :api, defaults: { format: :json } do
    resources :users, only: :create
    resource :session, only: [:show, :create, :destroy]
    resources :posts, only: [:index, :create, :destroy, :update] do
      resources :likes, only: [:create, :destroy]
      resources :comments, only: [:create, :destroy]
    end
    resources :likes, only: [:index]
  end

  # get '*path', to: "static_pages#frontend_index"
  get '*path', to: 'static_pages#frontend'
end
