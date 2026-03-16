class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :email           # L'email du client
      t.string :referral_code   # Son code promo unique (ex: JEAN123)
      t.decimal :balance, default: 0.0  # Sa cagnotte (commence à 0.00)
      t.integer :invitations_count, default: 0 # Compteur bloqué à 50
      t.boolean :has_paid, default: false # A-t-il payé les 15€ ?

      t.timestamps
    end
  end
end
