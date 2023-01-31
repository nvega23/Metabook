json.user do
    json.extract! @user, :id, :email, :username, :requestee_ids, :requester_ids, :created_at, :updated_at
end
