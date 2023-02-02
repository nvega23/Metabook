# json.extract! @comments, :id, :body, :users_id, :post_id, :created_at, :updated_at

# json.user do
# json.extract! @comments.user, :id, :username
# end

json.comment do
    json.extract! @comments, :id, :body, :users_id, :post_id, :created_at, :updated_at
    json.user do
        json.username @comments.user.username
    end
end
