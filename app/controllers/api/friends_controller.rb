class Api::FriendsController < ApplicationController
    wrap_parameters include: Friend.attribute_names + ['requestee_id', 'requester_id']
    before_action :require_logged_in


    def create
        @follow = Follow.new(follow_params)

        @follow.follower_id = current_user.id
        if @follow.save!
            render :show
        else
            render json: { errors: @follow.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        @follow = Follow.find_by(follower_id: current_user.id, requestee: params[:id])

        if @follow&.destroy
            render json: { follow: nil }
        else
            render json: { errors: @follow.errors.full_messages }, status: :unprocessable_entity
        end

    end

    private

    def friendship_params
        params.require(:friendship).permit(:requester_id, :requestee_id)
    end
end
