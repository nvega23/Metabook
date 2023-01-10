class Api::PostsController < ApplicationController
    wrap_parameters include: Post.attribute_names + [:photo]

    def index
        @posts = Post.all
        # @posts = @posts.where(users_id: return_users_id) if return_users_id

        if @posts
            render :index
        else
            render json: { errors: @post.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def create
        @post = Post.new(post_params)
        # debugger
        @post.users_id = current_user.id
        if @post.save
            @posts = Post.all
            # @posts = @posts.where(users_id: return_users_id) if return_users_id
            render :show
        else
            render json: { errors: @post.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def update
        @post = Post.find(params[:id])

        if @post.update(post_params)
            render :show
        else
            render json: { errors: @post.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        @post = Post.find(params[:id])

        if @post
            @post.destroy
            render json: {}
        end
    end

    private

    def post_params
        params.require(:post).permit(:body, :photo ,:users_id)
    end

    def return_users_id
        return nil unless params[:users_id]
        params[:users_id]
    end
end
