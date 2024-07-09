class MoodsController < ApplicationController
    def index
      @moods = Mood.all
    end
  
    def select_mood
        mood = Mood.find_by(id: params[:mood_id])
        if mood
            Flower.create(color: mood.color)
            redirect_to home_path, notice: 'Mood selected successfully'
        else
            redirect_to moods_path, alert: 'Invalid mood selection'
        end
    end
end