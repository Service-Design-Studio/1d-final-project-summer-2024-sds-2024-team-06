module Api
class UsersController < ApplicationController
  skip_before_action :authenticate_user!, only: [:guest_login]
    def index
      @users = User.all
      render json: @users
    end
    
    def show
      @user = User.find(params[:id])
      render json: @user
    end
  
    def create
      @user = User.new(user_params)
      if @user.save
        render json: @user, status: :created
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    end

    def guest_login
      user = User.guest
      sign_in(user)
      redirect_to root_path, notice: 'Signed in successfully as a guest.'
    end

    def current
      render json: current_user.as_json(only: [:id, :username, :email, :guest])
    end
  
    private
  
    def user_params
      params.require(:user).permit(:username, :user_id)
    end
  end
end
