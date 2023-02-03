class Api::CommentsController < ApplicationController
    wrap_parameters include: Comment.attribute_names + ['usersId', 'postId']
    before_action :find_post
    before_action :find_comment, only: [:destroy, :update]

    def index
        @comments = Comment.all
        render :show
    end

    def create
        # debugger
        @comments = @post.comments.create(comment_params)
        @comments.users_id = current_user.id
        if @comments.save!
            render :show
        else
            render json: { errors: @comment.errors.full_messages }
        end
    end

    def update
        @comment = Comment.find(params[:id])
        if @comments.update!(comment_params)
            render :show
        else
            render json: { errors: @comment.errors.full_messages }
        end
    end

    def destroy
        if @comments
            @comments.destroy
            render :show
        else
            render json: { errors: @comment.errors.full_messages }
        end
    end

    private

    def comment_params
        params.require(:comment).permit(:body, :users_id, :post_id)
    end

    def find_post
        @post = Post.find_by(id: params[:post_id])
    end

    def find_comment
        @comments = @post.comments.find_by(id: params[:id])
    end

end
