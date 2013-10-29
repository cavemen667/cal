class EventsController < ApplicationController
  def new
    @post = Event.new
  end

  def index
    @posts = Event.all.order(:date)
  end
  
  def create
    @post = Event.new(post_params)

    respond_to do |format|
      if @post.save
        format.html {redirect_to @post}
        format.js 
      else
        format.html {render 'calendar/index'}
        format.js  
      end
    end
   
  end

  def edit
    @post = Event.find(params[:id])
  end

  
  def show
    @post = Event.find(params[:id])
  end
  
  def update
    @post = Event.find(params[:id])
    if @post.update(post_params)
      redirect_to @post
    else
      render 'edit'
    end
  end
    
  def destroy
    @post = Event.find(params[:id])
    @post.destroy
    redirect_to events_path
  end
 
  private
    def post_params
      params.require(:event).permit(:title, :text, :time, :date)
    end

end
