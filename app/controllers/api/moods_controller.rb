module Api
    class MoodsController < ApplicationController
        skip_before_action :verify_authenticity_token
        before_action :set_user, only: [:update]
        before_action :set_mood_by_name, only: [:update]

      def index
        @user = User.find(params[:user_id])
        @moods = @user.moods
        render json: @moods
      end

      def show
        @mood = Mood.find(params[:id])
        render json: @mood
      end

      def create
        @user = User.find(params[:user_id])
        if @user.moods.exists?(name: mood_params[:name])
            render json: { error: "Mood with the same name already exists" }, status: :unprocessable_entity
          else
            @mood = @user.moods.build(mood_params)
          
            if @mood.save
              render json: @mood, status: :created
            else
              render json: @mood.errors, status: :unprocessable_entity
            end
          end
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
        def set_mood
            @mood = Mood.find(params[:id])
        end

        def set_user
            @user = User.find(params[:user_id])
        rescue ActiveRecord::RecordNotFound
            render json: { error: "User not found" }, status: :not_found
        end
      
        def set_mood_by_name
            @mood = @user.moods.find_by(name: params[:id])
            render json: { error: "Mood not found" }, status: :not_found if @mood.nil?
        end

        def mood_params
          params.require(:mood).permit(:name, :color, :hexcode)
        end
    end
  end