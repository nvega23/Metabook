class Api::FriendsController < ApplicationController
    wrap_parameters include: Friend.attribute_names + ['requestee_id', 'requester_id']
    before_action :require_logged_in


    def create
        @friend = Friend.new(friend_params)

        @friend.requester_id = current_user.id
        if @friend.save!
            render :show
        else
            render json: { errors: @friend.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        @friend = Friend.find_by(requester_id: current_user.id, requestee: params[:id])

        if @friend&.destroy
            render json: { friend: nil }
        else
            render json: { errors: @friend.errors.full_messages }, status: :unprocessable_entity
        end

    end

    private

    def friend_params
        params.require(:friend).permit(:requester_id, :requestee_id)
    end
end
