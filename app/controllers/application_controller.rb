class ApplicationController < ActionController::Base
    before_action :authenticate_user!
    before_action :check_guest_user, unless: :devise_controller?
    helper_method :user_or_guest_signed_in?

    def signed_in(resource)
        root_path
    end

    def signed_up(resource)
        root_path
    end

    def check_guest_user
        authenticate_user! unless current_user&.guest?
    end

    def user_or_guest_signed_in?
        user_signed_in? || current_user&.guest?
    end
    
end
