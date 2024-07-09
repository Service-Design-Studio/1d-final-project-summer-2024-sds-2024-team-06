class GuestSessionsController < ApplicationController
  skip_before_action :authenticate_user!

  def create
    session[:guest_user_id] = guest_user.id
    redirect_to root_path
  end
end
