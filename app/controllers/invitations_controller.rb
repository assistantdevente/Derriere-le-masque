class InvitationsController < ApplicationController
  def create
    @user = current_user # On identifie qui veut inviter
    
    # RÈGLE : Si le compteur est à 50 ou plus, on bloque
    if @user.invitations_count >= 50
      redirect_to paiement_path, alert: "Limite de 50 amis atteinte. Repassez le test pour débloquer 10 invitations."
    else
      # On envoie les mails et on augmente le compteur de +1 pour chaque ami
      emails = params[:emails].split(',')
      emails.each do |email|
        UserMailer.invite_friend(email, @user).deliver_later
        @user.increment!(:invitations_count)
      end
      redirect_to parrainage_path, notice: "Invitations envoyées ! Cagnotte en attente."
    end
  end
end
