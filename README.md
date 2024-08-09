# Project Overview

This project uses **Ruby on Rails 3.3.3** with **Rails 7.1** for the backend, and **React** for the frontend.

## Prerequisites

To run this project locally, ensure you have the following installed:

- **Ruby 3.3.3**
- **Node Package Manager (npm)**

## Setup Instructions

1. Create a file `master.key` in `app/config`, and save it with the following input: ea7fbffcb7eec24f23d9a5500b76cbea

2. In the application directory, run the following command in your terminal: ./setup.ps1
This serves to install bundler, gems, front-end packages, and setup the database.

* Deployment
Deployment has been fully automated and will re-deploy on any push to the branch proddockerpls.

* The test suite can be run by running rake test:all. Alternatively, run bundle exec cucumber AND bundle exec rspec.

* To run it locally, run rails s in your terminal

* The deployment webpage can be accessed via the following link: https://ngswebapp-67fxypa3ea-as.a.run.app/

