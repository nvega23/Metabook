class Api::PostsController < ApplicationController
    # wrap_parameters include: Post.attribute_names + [:photo]

    def index
        @user = User.find_by(id: params[:user_id])
        if @user
            @posts = @user.posts
            render :index
        elsif
            @posts = Post.all.includes(:comments, :likes)
            render :index
        else
            render json: { errors: @post.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def create
        @post = Post.new(post_params)
        @post.users_id = current_user.id
        if @post.save!
            @posts = Post.all
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

end
