class Users::SessionsController < Devise::SessionsController
    before_action :redirect_if_authenticated, only: [:new, :create]
    protect_from_forgery with: :exception

    def guest_login
      user = User.guest
      sign_in(user)
      # redirect_to root_path, notice: 'Signed in successfully as a guest.'
      # redirect_to homepage_path, notice: 'Signed in successfully as a guest.'
      redirect_to '/landing', notice: 'Signed in successfully as a guest.'
    end

    private

    def redirect_if_authenticated
      if user_signed_in? || current_user&.guest?
        # redirect_to root_path
        # redirect_to homepage_path
        redirect_to '/landing'
      end
    end
  end
