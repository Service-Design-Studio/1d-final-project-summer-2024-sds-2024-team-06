module Api
    class MoodsController < ApplicationController
      before_action :authenticate_user!
      skip_before_action :verify_authenticity_token
      before_action :set_mood_by_name, only: [:update, :show, :destroy]
      # before_action :set_mood, only: [:show, :destroy]
      before_action :authorize_user!, only: [:show]

      def index
        @moods = current_user.moods
        render json: @moods, status: :ok
      end

      def show
        render json: @mood, status: :ok
      end

      def create
        @mood = current_user.moods.build(mood_params)

        if @mood.save
          render json: @mood, status: :created
        else
          render json: @mood.errors, status: :unprocessable_entity
        end
        @mood
      end


      def update
        if @mood.update(mood_params)
          render json: @mood
        else
          render json: @mood.errors, status: :unprocessable_entity
        end
      end


      def destroy
        @mood.destroy
        head :no_content
      end

      private
        # def set_mood
        #   @mood = Mood.find_by(name: params[:id])
        #   render json: { error: 'Mood not found' }, status: :not_found unless @mood
        # end

        def authorize_user!
          render json: { error: 'Not authorized' }, status: :forbidden unless @mood.user == current_user
        end

        def set_mood_by_name
            @mood = current_user.moods.find_by(name: params[:id])
            render json: { error: "Mood not found" }, status: :not_found unless @mood
        end

        def mood_params
          params.require(:mood).permit(:name, :color, :hexcode)
        end
    end
end
