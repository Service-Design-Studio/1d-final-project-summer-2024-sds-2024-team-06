require 'simplecov'
SimpleCov.start 'rails' do
  add_filter '/spec/'
  add_filter '/features/'
  add_filter '/config/'     # Exclude the config directory
  add_filter '/vendor/'     # Exclude the vendor directory
  add_filter '/helpers/'    # Exclude the helpers directory
  add_filter '/mailers/'    # Exclude the mailers directory
  add_filter '/jobs/'       # Exclude the jobs directory
  add_filter '/channels/'   # Exclude the channels directory

  add_group 'Controllers', 'app/controllers'
  add_group 'Models', 'app/models'
end