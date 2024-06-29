# Use the official Ruby image from Docker Hub
FROM ruby:3.3.3

# Set the working directory in the container
WORKDIR /app


# Install dependencies
RUN apt-get update -qq && \
    apt-get install -y build-essential bash-completion libffi-dev tzdata git libvips libpq-dev nodejs npm && \
    npm install -g yarn

# # Install Cloud SQL Proxy
# RUN wget https://dl.google.com/cloudsql/cloud_sql_proxy.linux.amd64 -O cloud_sql_proxy && \
#     chmod +x cloud_sql_proxy

# # Copy the setup script and make it executable
# COPY scripts/setupdb.sh /usr/local/bin/setupdb.sh
# RUN chmod +x /usr/local/bin/setupdb.sh



# Copy Gemfile and Gemfile.lock and install gems
COPY Gemfile Gemfile.lock ./


RUN gem install bundler

RUN bundle config set --local deployment 'true' && \
    bundle config set --local without 'development test'

RUN bundle install
# RUN bundle install

# Copy the application code into the container
COPY . /app


# Set production environment variables
ENV RAILS_ENV=production
ENV RAILS_LOG_TO_STDOUT=true
ENV RAILS_SERVE_STATIC_FILES=true
ENV SECRET_KEY_BASE=316d1b20f08892246a54a8d5b676f08cfe5c660ccb773d235424fa53e9a57fe2b8ab81a6cc28568c5ef36a44ce076bfbe939caaba88a33f63c8caf07b4645ead
# ENV DB_HOST=
# ENV DB_NAME=natgallery_production
# ENV DB_USERNAME=artviewer
# ENV DB_PASSWORD=iloveart123

# RUN mkdir /cloudsql && \
#     touch /cloudsql/team6sds:asia-southeast1:natgallerysql

RUN yarn install --silent && \
    yarn add tailwindcss-animate flowbite 
    # webpack webpack-cli shakapacker webpack-assets-manifest
    

# Precompile assets, create and migrate the database, and seed if necessary
RUN bundle exec rake assets:precompile --trace


# ENTRYPOINT ["scripts/setupdb.sh"]
# Expose port 8080 to the Docker host, so we can access Rails server
EXPOSE 8080

# Start Cloud SQL Proxy in the background and then start the Rails server
# CMD ["sh", "-c", "./cloud_sql_proxy -dir=/cloudsql -instances=team6sds:asia-southeast1:natgallerysql=tcp:5432 & bundle exec rails server -b 0.0.0.0 -p 8080"]
# Start the Rails server
CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0", "-p", "8080"]
