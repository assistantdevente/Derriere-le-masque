ENV['BUNDLE_GEMFILE'] ||= File.expand_path('../Gemfile', __dir__)

require "bundler/setup" # Configure les paquets listés dans le Gemfile.
require "bootsnap/setup" # Accélère le démarrage en gardant des choses en mémoire.
