# == Schema Information
#
# Table name: posts
#
#  id         :bigint           not null, primary key
#  body       :text             not null
#  users_id   :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Post < ApplicationRecord
    validates :body, presence: true


    belongs_to :user,
    class_name: :User,
    foreign_key: :users_id

    has_many :comments,
    class_name: :Comment,
    dependent: :destroy

    has_many :likes

    #will either be one picture on post or many pictures on post
    has_one_attached :photo
    # has_many_attached :photos

    # validate :ensure_photo

    # def ensure_photo
    #     unless self.photo.attached?
    #         errors.add(:photo, "must be attached")
    #     end
    # end
end
