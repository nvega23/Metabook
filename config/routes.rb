Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  resources :posts, only: [:show]
  namespace :api, defaults: { format: :json } do
    resource :session, only: [:show, :create, :destroy]
    resources :users, only: [:create, :show]
    resources :posts, only: [:index, :create, :destroy, :update] do
      resources :likes, only: [:create, :destroy]
      resources :comments, only: [:index, :create, :update, :destroy]
    end
    resources :likes, only: [:index]
    resources :friendships, only: [:create, :destroy]
  end

  # get '*path', to: "static_pages#frontend_index"
  get '*path', to: 'static_pages#frontend'
end
