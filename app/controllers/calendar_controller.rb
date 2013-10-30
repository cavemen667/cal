class CalendarController < ApplicationController
  respond_to :html, :js
  def index
    @post = Event.new
    respond_with(@post)
  end
  def show
  end

end
