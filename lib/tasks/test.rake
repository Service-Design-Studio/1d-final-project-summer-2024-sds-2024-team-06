namespace :test do
    desc "Run all tests"
    task all: [:environment] do
      Rake::Task['test:rspec'].invoke
      Rake::Task['test:cucumber'].invoke
    end
  
    desc "Run RSpec tests"
    task rspec: [:environment] do
      system 'bundle exec rspec'
    end
  
    desc "Run Cucumber tests"
    task cucumber: [:environment] do
      system 'bundle exec cucumber'
    end
  end