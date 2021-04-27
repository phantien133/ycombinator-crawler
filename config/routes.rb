Rails.application.routes.draw do
  get "*path", to: 'home#index', constraints: {
    path: /((?!rails|pack).)*/
  }
end
