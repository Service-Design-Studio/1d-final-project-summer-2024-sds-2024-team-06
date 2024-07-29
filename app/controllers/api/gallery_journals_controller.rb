module Api
  class GalleryJournalsController < ApplicationController

    before_action :authenticate_user!  # Ensure users are authenticated
    skip_before_action :verify_authenticity_token, only: [:create]
    before_action :set_gallery_journal, only: [:show]
    before_action :authorize_user!, only: [:show]

    def index
      @gallery_journals = current_user.gallery_journals
      render json: @gallery_journals, status: :ok
    end

    def show
      render json: @gallery_journal, status: :ok
    end

    def create
      @gallery_journal = current_user.gallery_journals.build(gallery_journal_params)

      if @gallery_journal.save
        render json: @gallery_journal, status: :created
      else
        render json: @gallery_journal.errors, status: :unprocessable_entity
      end
    end

    private

    def set_gallery_journal
      @gallery_journal = GalleryJournal.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      render json: { error: 'Gallery Journal not found' }, status: :not_found
    end

    def authorize_user!
      render json: { error: 'Not authorized' }, status: :forbidden unless @gallery_journal.user == current_user
    end

    def gallery_journal_params
      params.require(:gallery_journal).permit(:journal_title, :journal_entry, :tip_title, :tip_body, :imageurl, :date)
    end
  end
end
