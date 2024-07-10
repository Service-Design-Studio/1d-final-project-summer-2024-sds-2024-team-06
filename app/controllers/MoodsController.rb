class MoodsController < ApplicationController
  # GET /moods
  def index
    @moods = Mood.all
  end

  # GET /moods/1
  def show
  end

  # GET /moods/new
  def new
    @mood = Mood.new
  end

  # GET /moods/1/edit
  def edit
  end

  # POST /moods
  def create
    @mood = Mood.new(mood_params)
    if @mood.save
      redirect_to @mood, notice: 'Mood was successfully created.'
    else
      render :new
    end
    @flower = Flower.new(flower_params)
    if @flower.save
      redirect_to @flower, notice: 'Flower was successfully created.'
    else
      render :new
    end
  end

  # PATCH/PUT /moods/1
  def update
    if @mood.update(mood_params)
      redirect_to @mood, notice: 'Mood was successfully updated.'
    else
      render :edit
    end
  end

  # DELETE /moods/1
  def destroy
    @mood.destroy
    redirect_to moods_url, notice: 'Mood was successfully destroyed.'
  end

  # POST /select_mood
  def select_mood
    mood = Mood.find_by(name: params[:name])
    if mood.present?
      Rails.logger.debug "Mood found: #{mood.name}"
      redirect_to homepage_path, notice: 'Mood selected successfully.'
    else
      Rails.logger.debug "Mood not found for name: #{params[:name]}"
      redirect_to moods_path, alert: 'Invalid mood selected.'
    end
  end

  # POST /same_mood_color
  def same_mood_color
    mood = Mood.find_by(name: params[:name])
    if mood.present?
      flower = Flower.create(color: mood.color, mood: mood.name, date_created: "12/07/2024", user: mood.user, created_at: "12/07/2024", updated_at: "12/07/2024")
      if flower.persisted?
        Rails.logger.debug "Flower created successfully: #{flower.name}, #{flower.color}"
      else
        Rails.logger.debug "Flower creation failed: #{flower.errors.full_messages.join(', ')}"
      end
      if flower.present?
        Rails.logger.debug "flower found: #{flower.color}"
        redirect_to homepage_path(flower), notice: 'Flower created with the same color as the mood.'
      else
        Rails.logger.debug "flower not found for name: #{params[:name]}"
        redirect_to moods_path, alert: 'Failed to create flower.'
      end
    else
      redirect_to moods_path, alert: 'Invalid mood selected.'
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_mood
    @mood = Mood.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def mood_params
    params.require(:mood).permit(:name, :color, :hexcode, :user_id)
  end

  def flower_params
    params.require(:flower).permit(:id, :color, :hexcode, :user_id)
  end
end
