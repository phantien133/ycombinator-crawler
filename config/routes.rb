Rails.application.routes.draw do
  get "*path", to: 'y_combinator#index', constraints: { path: /((?!rails|pack).)*/ }
end
