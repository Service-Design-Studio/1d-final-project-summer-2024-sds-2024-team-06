module Api
  class FlowersController < ApplicationController
    before_action :authenticate_user!  # Ensure users are authenticated
    skip_before_action :verify_authenticity_token, only: [:create]
    before_action :set_flower, only: [:show]
    before_action :authorize_user!, only: [:show]

    def index
        @flowers = current_user.flowers
        render json: @flowers, status: :ok
      end

    def show
      # @flower = Flower.find_by(id: params[:id])
      render json: @flower, status: :ok
    end

    def create
      @flower = current_user.flowers.build(flower_params)

      if @flower.save
        render json: @flower, status: :created
      else
        render json: @flower.errors, status: :unprocessable_entity
      end

      @flower
    end

    private

    def set_flower
      @flower = Flower.find_by(id: params[:id])
      render json: { error: 'Flower not found' }, status: :not_found unless @flower
    end

    def authorize_user!
      render json: { error: 'Not authorized' }, status: :forbidden unless @flower.user == current_user
    end

    def flower_params
      params.require(:flower).permit(:mood, :color, :date_created, :user_id, :day)
    end
  end
end
