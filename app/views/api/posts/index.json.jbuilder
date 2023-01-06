@posts.each do |post|
    json.set! post.id do
        json.extract! post, :id, :body, :users_id, :created_at, :updated_at
        json.comments post.comments
        # json.likes post.likes
    end
end
