require_relative "boot"
require "rails/all"

# Nécessaire pour que les "Gems" (ingrédients) soient chargés
Bundler.require(*Rails.groups)

module MasqueApp
  class Application < Rails::Application
    # On utilise la version 7.0 du moteur
    config.load_defaults 7.0
    
    # Indispensable sur Railway pour que le site s'affiche
    config.hosts.clear
  end
end
