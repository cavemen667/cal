class EventsController < ApplicationController
  def new
    @post = Event.new
  end

  def index
    @posts = Event.all
  end
  
  def create
    @post = Event.new(params[:event].permit(:title, :text, :time, :date))

    if @post.save
      redirect_to @post
    else
      render 'new'
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
    if @post.update(params[:event].permit(:title, :text))
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
      params.require(:post).permit(:title, :text)
    end

end
