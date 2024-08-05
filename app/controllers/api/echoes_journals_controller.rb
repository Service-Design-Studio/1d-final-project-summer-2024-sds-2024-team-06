module Api
  class EchoesJournalsController < ApplicationController

    before_action :authenticate_user!  # Ensure users are authenticated
    skip_before_action :verify_authenticity_token, only: [:create]
    before_action :set_echoes_journal, only: [:show]
    before_action :authorize_user!, only: [:show]


    # def index
    #   @echoes_journals = current_user.echoes_journals
    #   render json: @echoes_journals, status: :ok
    # end

    def index
      @echoes_journals = current_user.echoes_journals

      # Modify the imageURL attribute for each journal entry
      @modified_journals = @echoes_journals.map do |journal|
        journal.attributes.merge('imageURL' => GoogleCloudStorageService.file_url(journal.imageURL))
      end

      render json: @modified_journals, status: :ok
    end

    def show
      render json: @echoes_journal, status: :ok
    end


    def create
      file = params[:image]
      filename = "user_#{current_user.id}/#{Time.now.to_i}_drawing.png"

      GoogleCloudStorageService.upload_file(file, filename)

      @echoes_journal = current_user.echoes_journals.create(imageURL: filename, journal_title: params[:journal_title], journal_entry: params[:journal_entry], tip_title: params[:tip_title], tip_body: params[:tip_body], date_created: params[:date_created])

      if @echoes_journal.save
        render json: @echoes_journal, status: :created
      else
        render json: @echoes_journal.errors, status: :unprocessable_entity
      end
    end
    # def create
    #   @echoes_journal = current_user.echoes_journals.build(echoes_journal_params)

    #   if @echoes_journal.save
    #     file = params[:image]
    #     filename = "user_#{current_user.id}/#{Time.now.to_i}_drawing.png"
    #     if GoogleCloudStorageService.upload_file(file, filename)
    #       image_url = GoogleCloudStorageService.file_url(filename)
    #       @echoes_journal.update(imageURL: image_url)
    #     end
    #     # GoogleCloudStorageService.upload_file(params[:image])
    #     render json: @echoes_journal, status: :created
    #   # else
    #   #   render json: { errors: @echoes_journal.errors.full_messages }, status: :unprocessable_entity
    #   end
    # end

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
      params.permit(:journal_title, :journal_entry, :tip_title, :tip_body, :imageURL, :date)
    end
  end
end
