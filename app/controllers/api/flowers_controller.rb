module Api
  class FlowersController < ApplicationController
    skip_before_action :verify_authenticity_token
    def index
        @user = User.find(params[:user_id])
        @flowers = @user.flowers
        render json: @flowers
      end
    
      def show
        @flower = Flower.find(params[:id])
        render json: @flower
      end
    
      def create
        @user = User.find(params[:user_id])
        @flower = @user.flowers.build(flower_params)
        if @flower.save
          render json: @flower, status: :created
        else
          render json: @flower.errors, status: :unprocessable_entity
        end
      end
    
      private
    
      def flower_params
        params.require(:flower).permit(:mood, :color, :date_created, :user_id)
      end
  end
  end