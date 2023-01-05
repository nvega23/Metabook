@posts.each do |post|
    json.set! post.id do
        json.extract! post, :id, :body, :users_id, :created_at, :updated_at
        # json.likes post.likes
        # json.comments post.comments
    end
end
