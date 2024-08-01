namespace :db do
    desc "Truncate all tables"
    task truncate_all: :environment do
      require 'database_cleaner-active_record'
      
      DatabaseCleaner.strategy = :truncation
      DatabaseCleaner.clean_with(:truncation)
      
      puts "All tables truncated"
    end
  end