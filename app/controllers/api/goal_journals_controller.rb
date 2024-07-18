module Api
    class GoalJournalsController < ApplicationController
  
      before_action :authenticate_user!  # Ensure users are authenticated
      skip_before_action :verify_authenticity_token, only: [:create]
      before_action :set_goal_journal, only: [:show]
      before_action :authorize_user!, only: [:show]
  
      def index
        @goal_journals = current_user.goal_journals
        render json: @goal_journals, status: :ok
      end
  
      def show
        render json: @goal_journal, status: :ok
      end
  
      def create
        @goal_journal = current_user.goal_journals.build(goal_journal_params)
  
        if @goal_journal.save
          render json: @goal_journal, status: :created
        else
          render json: @goal_journal.errors, status: :unprocessable_entity
        end
      end
  
      private
  
      def set_goal_journal
        @goal_journal = GoalJournal.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        render json: { error: 'Goal Journal not found' }, status: :not_found
      end
  
      def authorize_user!
        render json: { error: 'Not authorized' }, status: :forbidden unless @goal_journal.user == current_user
      end
  
      def goal_journal_params
        params.require(:goal_journal).permit(:journal_title, :journal_start, :journal_end, :journal_third, :date_created)
      end
    end
  end