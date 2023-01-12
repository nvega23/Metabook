class Api::LikesController < ApplicationController
    wrap_parameters include: Like.attribute_names + ['postId']

    def create
        @like = Like.new(like_params)
        @like.user_id = current_user.id
        if !@like.save!
            render json: { errors: @like.errors.full_messages }
        else
            render :show
        end
    end

    def index
        @likes = Like.where(user_id: current_user.id)
        render :index
    end

    def destroy
        @like = current_user.likes.find(params[:id])
        post = @like.post
        @like.destroy
        render :show
    end

    private
    def like_params
        params.require(:like).permit(:post_id, :user_id)
    end
end
