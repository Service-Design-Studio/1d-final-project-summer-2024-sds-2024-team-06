# Install bundler
gem install bundler

# Run bundle install
bundle install

# Install yarn
npm install --global yarn

# Run yarn install
yarn install

# Set the RAILS_ENV environment variable to "test"
$env:RAILS_ENV = "development"

# Run database migrations
rails db:migrate

# Seed the database
rails db:seed

# Precompile assets
rails assets:precompile