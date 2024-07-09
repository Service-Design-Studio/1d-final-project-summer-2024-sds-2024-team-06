class Users::RegistrationsController < Devise::RegistrationsController
    before_action :redirect_if_authenticated, only: [:new, :create]
  
    private
  
    def redirect_if_authenticated
      if user_signed_in? || current_user&.guest?
        redirect_to root_path
      end
    end
  end