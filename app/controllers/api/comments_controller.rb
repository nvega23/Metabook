class Api::CommentsController < ApplicationController
    wrap_parameters include: Comment.attribute_names + ['usersId', 'postId']
    before_action :find_post
    before_action :find_comment, only: [:destroy]

    def index
        @comments = Comment.all
        render 'api/posts/show'
    end

    def create
        @comments = @post.comments.create(comment_params)
        @comments.users_id = current_user.id
        if @comments.save!
            render 'api/posts/show'
        else
            render json: { errors: @comment.errors.full_messages }
        end
    end

    def update
        if @comments.update(comment_params)
            render 'api/posts/show'
        else
            render json: { errors: @comment.errors.full_messages }
        end
    end

    def destroy
        if @comments
            @comments.destroy
            render 'api/posts/show'
        else
            render json: { errors: @comment.errors.full_messages }
        end
    end

    private

    def comment_params
        params.require(:comment).permit(:body, :users_id, :post_id)
    end

    def find_post
        @post = Post.find(params[:post_id])
    end

    def find_comment
        @comments = @post.comments.find(params[:id])
    end

end
