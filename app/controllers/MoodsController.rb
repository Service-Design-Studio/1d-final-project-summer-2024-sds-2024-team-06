# class MoodsController < ApplicationController
#   # GET /moods
#   def index
#     @moods = Mood.all
#     @flowers = Flower.all
#   end

#   # GET /moods/1
#   def show
#   end

#   # GET /moods/new
#   def new
#     @mood = Mood.new
#   end

#   # GET /moods/1/edit
#   def edit
#   end

#   # POST /moods
#   def create
#     @mood = Mood.new(mood_params)
#     if @mood.save
#       redirect_to @mood, notice: 'Mood was successfully created.'
#     else
#       render :new
#     end
#     @flower = Flower.new(flower_params)
#     if @flower.save
#       redirect_to @flower, notice: 'Flower was successfully created.'
#     else
#       render :new
#     end
#   end

#   # PATCH/PUT /moods/1
#   def update
#     if @mood.update(mood_params)
#       redirect_to @mood, notice: 'Mood was successfully updated.'
#     else
#       render :edit
#     end
#   end

#   # DELETE /moods/1
#   def destroy
#     @mood.destroy
#     redirect_to moods_url, notice: 'Mood was successfully destroyed.'
#   end

#   # POST /select_mood
#   def select_mood
#     mood = Mood.find_by(name: params[:name])
#   end

#   private

#   # Use callbacks to share common setup or constraints between actions.
#   def set_mood
#     @mood = Mood.find(params[:id])
#   end

#   # Only allow a list of trusted parameters through.
#   def mood_params
#     params.require(:mood).permit(:name, :color, :hexcode, :user_id)
#   end

#   def flower_params
#     params.require(:flower).permit(:id, :color, :hexcode, :user_id)
#   end
# end
