# Project Overview

Codebase for the stART web-app, in collaboration with the National Gallery of Singapore. It is designed to promote mental-hygiene practices in adolescents. 

This project uses **Ruby on Rails 3.3.3** with **Rails 7.1** for the backend, and **React** for the frontend. It is deployed using various Google Cloud Platform services.

## Prerequisites

To run this project locally, ensure you have the following installed:

- **Ruby 3.3.3**
- **Node Package Manager (npm)**
- **PostgreSQL 15**

## Setup Instructions

1. Create a file `master.key` in `app/config`, and save it with the following input: ea7fbffcb7eec24f23d9a5500b76cbea

2. In the application directory, run the following command in your terminal: ./setup.ps1
This serves to install bundler, gems, front-end packages with npm, setup, migrate & seed the local database. You may open the file in a code editor to view the commands & run them manually if you wish.

* Deployment has been fully automated and will re-deploy on any push to the branch proddockerpls. All credentials have been securely hosted inside credentials.yml (which can be decoded with master.key in config, and by running rails credentials:edit). For convenience, the front-end React application and backend Rails API are deloyed together, but they are functionally completely independent entities. The Rails RESTful API backend serves as a microservice. 

* The test suite can be run by running rake test:all. Alternatively, run ```bundle exec cucumber``` AND ```bundle exec rspec```. The testing files can be found under app/features/ and app/spec/
* API Endpoint testing for the deployed website has been automated via POSTman, as documented in the team site listed below.

* To run the web-app locally, run rails s in your terminal

* The deployment webpage can be accessed via the following link: https://ngswebapp-67fxypa3ea-as.a.run.app/

* The Team site detailing design iterations, code architecture, features & a short video can be viewed at: https://sites.google.com/view/byte-hero-6/our-project
* Please refer to the website for more detailed documentation of the design process, team members, overarching architecture or testing outcomes. 

