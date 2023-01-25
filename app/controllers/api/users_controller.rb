class Api::UsersController < ApplicationController
    wrap_parameters include: User.attribute_names + ['password']

    def create
      @user = User.new(user_params)

      if @user.save
        login!(@user)
        render :show
      else
        render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def show
      @user = User.find(params[:id])
      render 'api/users/user_post_show'
    end

    private

    def user_params
      params.require(:user).permit(:email, :username, :password)
    end
end
