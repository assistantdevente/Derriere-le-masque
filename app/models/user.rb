class User < ApplicationRecord
  # Cette règle s'active dès qu'un nouvel ami finit son test
  def self.attribuer_bonus(code_parrain)
    parrain = User.find_by(referral_code: code_parrain)
    
    if parrain && parrain.invitations_count < 50
      # On ajoute 3 euros à sa balance
      parrain.update(balance: parrain.balance + 3.0)
      puts "Bravo ! 3€ ajoutés à la cagnotte de #{parrain.email}"
    end
  end
end
