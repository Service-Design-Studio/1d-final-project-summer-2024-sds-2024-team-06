class JournalsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @journals = Journal.all
    render json: @journals, status: :ok
  end

  def show
    @journal = Journal.find(params[:id])
    render json: @journal, status: :ok
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Journal not found' }, status: :not_found
  end

  def create
    @journal = Journal.new(journal_params)

    if @journal.save
      render json: @journal, status: :created
    else
      render json: @journal.errors, status: :unprocessable_entity
    end
  end

  private

  def journal_params
    params.require(:journal).permit(:journalentry, :userid, :date)
  end
end
