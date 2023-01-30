# == Schema Information
#
# Table name: friends
#
#  id           :bigint           not null, primary key
#  requester_id :bigint           not null
#  requestee_id :bigint           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
class Friend < ApplicationRecord
    validates :requester_id, presence: true, uniqueness: { scope: :requestee_id }
    validates :requestee_id, presence: true

    belongs_to :user,
        foreign_key: :requester_id,
        class_name: :User

    belongs_to :requestee_id,
        foreign_key: :requestee_id,
        class_name: :User

end
