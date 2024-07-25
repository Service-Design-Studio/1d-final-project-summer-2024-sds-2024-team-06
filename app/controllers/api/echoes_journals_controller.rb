module Api
  class EchoesJournalsController < ApplicationController

    before_action :authenticate_user!  # Ensure users are authenticated
    skip_before_action :verify_authenticity_token, only: [:create]
    before_action :set_echoes_journal, only: [:show]
    before_action :authorize_user!, only: [:show]

    def index
      @echoes_journals = current_user.echoes_journals
      render json: @echoes_journals, status: :ok
    end

    def show
      render json: @echoes_journal, status: :ok
    end

    def create
      @echoes_journal = current_user.echoes_journals.build(echoes_journal_params)

      if @echoes_journal.save
        render json: @echoes_journal, status: :created
      else
        render json: @echoes_journal.errors, status: :unprocessable_entity
      end
    end

    private

    def set_echoes_journal
      @echoes_journal = EchoesJournal.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      render json: { error: 'Echoes Journal not found' }, status: :not_found
    end

    def authorize_user!
      render json: { error: 'Not authorized' }, status: :forbidden unless @echoes_journal.user == current_user
    end

    def echoes_journal_params
      params.require(:echoes_journal).permit(:journal_title, :journal_entry, :tip_title, :tip_body, :imageurl, :date)
    end
  end
end
