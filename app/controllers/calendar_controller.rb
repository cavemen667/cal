class CalendarController < ApplicationController
  def index
   @post = Event.new
  end

end
