# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
    has_secure_password

    validates :username, uniqueness: true, length: { in: 3..30 }, uniqueness: {case_sensitive: true},
    format: { without: URI::MailTo::EMAIL_REGEXP, message:  "can't be an email" }

    validates :email, uniqueness: true, length: { in: 5..100 },
    format: { with: URI::MailTo::EMAIL_REGEXP }

    validates :session_token, presence: true, uniqueness: true
    validates :password, length: { in: 6..225 }, allow_nil: true

    before_validation :ensure_session_token

    has_many :posts,
    foreign_key: :users_id,
    class_name: :Post

    has_many :comments,
    foreign_key: :users_id,
    class_name: :Comment

    has_many :likes

    has_many :friends,
    class_name: :Friend,
    foreign_key: :requester_id,
    dependent: :destroy

    has_many :friended,
        class_name: :Friend,
        foreign_key: :requestee_id,
        dependent: :destroy

    has_many :requesters,
        through: :friended,
        source: :user

    has_many :requestees,
        through: :friends,
        source: :requestee

    # spire

    def self.find_by_credentials(credential, password)
        field = credential =~ URI::MailTo::EMAIL_REGEXP ? :email : :username
        user = User.find_by(field => credential)
        user&.authenticate(password)
    end

    def reset_session_token!
        self.session_token = generate_unique_session_token
        self.save!
        self.session_token
    end

    def generate_unique_session_token
        output = SecureRandom.base64
        while User.exists?(session_token: output)
            output = SecureRandom.base64
        end
        output
    end

    def ensure_session_token
        self.session_token ||= generate_unique_session_token
    end

end
