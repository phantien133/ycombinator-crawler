Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :news, only: %i[index show]
    end
  end

  get "*path", to: 'y_combinator#index', constraints: { path: /((?!rails|pack).)*/ }
end
