Rails.application.routes.draw do
  # La porte d'entrée (Accueil)
  root "pages#index"
  
  # Les autres pièces de la maison
  get "questions", to: "pages#questions"
  get "paiement", to: "pages#paiement"
  get "parrainage", to: "pages#parrainage"
  
  # Le moteur pour les invitations
  post "invitations", to: "invitations#create"
end
