class PagesController < ApplicationController
  # Ces lignes disent à Rails : "Affiche la page correspondante dans app/views/pages"
  def index
  end

  def questions
  end

  def paiement
  end

  def parrainage
    # On récupère les infos de l'utilisateur pour la cagnotte
    @user = User.first # Temporaire pour le test
  end
end
