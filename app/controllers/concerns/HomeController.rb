class HomeController < ApplicationController
    def index
      @flowers = Flower.all
    end
  end
  