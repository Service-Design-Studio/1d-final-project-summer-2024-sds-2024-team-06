class ApplicationController < ActionController::Base
    before_action :authenticate_user!

    def signed_in(resource)
        root_path
    end

    def signed_up(resource)
        root_path
    end
end
