class ApplicationController < ActionController::Base
    before_action :authenticate_user!
    before_action :set_gon_variables
    
    private

    def set_gon_variables
        gon.api_url = Rails.configuration.api_url
    end

end
