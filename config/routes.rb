# Rails.application.routes.draw do
#   # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

#   # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
#   # Can be used by load balancers and uptime monitors to verify that the app is live.
#   get '*path', to: 'homepage#index', constraints: ->(request) { request.format.html? }
#   root 'homepage#index'
#   namespace :api do
#     resources :art_pieces, only: [:index, :show] #model name is ArtPiece, rails conventionally pluralizes model names when defining routes,
#     # so art_pieces would generate RESTful routes for CRUD operations related to the ArtPiece Model
#     # endonly:[:index, :show] restricts the routes generated by resources to only the index and show actions
#   end
# end

Rails.application.routes.draw do

  post 'select_mood', to: 'moods#select_mood', as: 'select_mood'
  post 'generate_flower', to: 'moods#generate_flower', as: 'generate_flower'

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  devise_scope :user do
    post 'guest_login', to: 'users/sessions#guest_login'
  end

  namespace :api do
    get 'current_user', to: 'users#current'
    resources :art_pieces, only: [:index, :show] do #api/art_pieces/
    end

    resources :flowers
    resources :moods
    resources :goal_journals

    resources :flowers do
      collection do
        post :generate_flower
      end
    end

    resources :users, only: [:index, :show, :create] do
      collection do
        get :guest_login
        get :current
      end
    end

    resources :moods do
      collection do
        post 'select_mood'
      end
    end


    resources :journals, only: [:create, :index, :show]
  end

  get 'homepage', to: 'homepage#index'



  root 'pages#home'

  # root 'home#index', as: 'homepage'  # This sets the root path and names it `homepage_path`

  # Catch-all route for React Router
  get '*path', to: 'homepage#index', constraints: ->(request) { request.format.html? }
end
