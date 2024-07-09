class JournalsController < ApplicationController
  # skip_before_action :verify_authenticity_token
  before_action :authenticate_user!  # Ensure users are authenticated
  skip_before_action :verify_authenticity_token, only: [:create]
  before_action :set_journal, only: [:show]
  before_action :authorize_user!, only: [:show]

  def index
    @journals = current_user.journals
    render json: @journals, status: :ok
  end

  # def show
  #   @journal = Journal.find(params[:id])
  #   render json: @journal, status: :ok
  # rescue ActiveRecord::RecordNotFound
  #   render json: { error: 'Journal not found' }, status: :not_found
  # end

  def show
    render json: @journal, status: :ok
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Journal not found' }, status: :not_found
  end

  # def create
  #   @journal = Journal.new(journal_params)

  #   if @journal.save
  #     render json: @journal, status: :created
  #   else
  #     render json: @journal.errors, status: :unprocessable_entity
  #   end
  # end

  def create
    @journal = current_user.journals.build(journal_params)

    if @journal.save
      render json: @journal, status: :created
    else
      render json: @journal.errors, status: :unprocessable_entity
    end
  end

  private

  def set_journal
    @journal = Journal.find(params[:id])
  end

  def authorize_user!
    render json: { error: 'Not authorized' }, status: :forbidden unless @journal.user == current_user
  end

  def journal_params
    params.require(:journal).permit(:journalentry, :date)
  end
end
