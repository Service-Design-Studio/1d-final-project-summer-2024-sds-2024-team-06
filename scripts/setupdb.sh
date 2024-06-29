#!/bin/bash

set -e

# Start the Cloud SQL Proxy in the background
# /cloud_sql_proxy -dir=/cloudsql -instances=team6sds:asia-southeast1:natgallerysql &

# sleep 10

echo "Setting up the database..."

# Ensure the database exists and create it if it doesn't
echo "Creating the database..."
bundle exec rails db:create

# Run database migrations
echo "Running migrations..."
bundle exec rails db:migrate

# Seed the database with initial data
echo "Seeding the database..."
bundle exec rails db:seed

echo "Database setup complete. Starting the Rails server..."

# Start the Rails server
exec "$@"
