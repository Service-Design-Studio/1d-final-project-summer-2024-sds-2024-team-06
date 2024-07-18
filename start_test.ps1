# Navigate to the project directory if needed
# cd path\to\your\project

# Run bundle install
bundle install

# Run yarn install
yarn install

# Precompile assets
rails assets:precompile

# Set the RAILS_ENV environment variable to "test"
$env:RAILS_ENV = "test"

# Run database migrations
rails db:migrate

# Seed the database
rails db:seed