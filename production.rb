require "active_support/core_ext/integer/time"

Rails.application.configure do
  # Dit à Rails de rester allumé même s'il y a des petites erreurs
  config.cache_classes = true
  config.eager_load = true
  config.consider_all_requests_local = false
  
  # Indispensable pour voir ton design Gris & Or
  config.public_file_server.enabled = true

  # Pour que les emails Mailjet partent bien
  config.active_storage.service = :local
  config.log_level = :info
  config.i18n.fallbacks = true
  config.active_support.deprecation = :notify
end
