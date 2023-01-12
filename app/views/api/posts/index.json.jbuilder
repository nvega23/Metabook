@posts.each do |post|
    json.posts do
        json.set! post.id do
            json.extract! post, :id, :body, :users_id, :created_at, :updated_at
            json.photo_url post.photo.url
            # json.photoUrl url_for(post.photo)
        end
    end
    json.comments do
            post.comments.each do |comment|
                json.set! comment.id do
                json.extract! comment, :id, :body, :users_id, :post_id, :created_at, :updated_at
            end
        end
    end
    json.likes do
            post.likes.each do |like|
                json.set! like.id do
                json.extract! like, :id, :user_id, :post_id, :created_at, :updated_at
            end
        end
    end
end
