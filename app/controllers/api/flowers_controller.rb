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
        render json: @flower, status: :ok
      rescue ActiveRecord::RecordNotFound
        render json: { error: 'Flower not found' }, status: :not_found
      end

      def create
        @flower = current_user.flowers.build(flower_params)

        if @flower.save
          render json: @flower, status: :created
        else
          render json: @flower.errors, status: :unprocessable_entity
        end
      end

      def same_mood_color
        mood = Mood.find_by(name: params[:name])
        if mood.present?
          @user = User.create(email: "a@example.com" , password: "password")
          flower = Flower.create(color: mood.color, mood: mood.name, date_created: "12/07/2024", user: @user, created_at: "12/07/2024", updated_at: "12/07/2024", user_id: "1")
          if flower.persisted?
            Rails.logger.debug "Flower created successfully: #{flower.color}, #{flower.color}"
          else
            Rails.logger.debug "Flower creation failed: #{flower.errors.full_messages.join(', ')}"
          end
          if flower.present?
            Rails.logger.debug "flower found: #{flower.color}"
            redirect_to homepage_path(flower), notice: 'Flower created with the same color as the mood.'
          else
            Rails.logger.debug "flower not found for name: #{params[:name]}"
            redirect_to api_moods_path, alert: 'Failed to create flower.'
          end
        else
          redirect_to api_moods_path, alert: 'Invalid mood selected.'
        end
      end

      



      private

      def set_flower
      @flower = Flower.find(params[:id])
    end

    def authorize_user!
      render json: { error: 'Not authorized' }, status: :forbidden unless @flower.user == current_user
    end

      def flower_params
        params.require(:flower).permit(:mood, :color, :date_created, :user_id, :day)
      end
  end
  end
