class MessagesController < ApplicationController
    before_action :move_to_index, except: :index
   
    def index
      @message = Message.new
      @messages = Message.includes(:user).page(params[:page]).per(1).order("id DESC")
    end
  
    def new
      @message = Message.new
    end
  
    def create
      @message = Message.create(text: message_params[:text], image: message_params[:image], user_id: current_user.id)
      respond_to do |format|
        format.html { redirect_to root_path }
        format.json
      end
    end
  
    def destroy
      message = Message.find(params[:id])
      if message.user_id == current_user.id
        message.destroy
      end
      redirect_to root_path
    end
    
    def edit
      @message = Message.find(params[:id])
    end
  
    def update
      message = Message.find(params[:id])
      message.update(message_params)
      redirect_to root_path
    end
    
  
    private
    def message_params
      params.require(:message).permit(:text, :image)
    end
  
    def move_to_index
      redirect_to action: :index unless user_signed_in?
    end
    
    
  end