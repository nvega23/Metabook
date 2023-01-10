@posts.each do |post|
    json.set! post.id do
        json.extract! post, :id, :body, :users_id, :created_at, :updated_at
        json.comments post.comments
        # json.photoUrl url_for(post.photo)
        # json.likes post.likes
        # debugger
        # json.photoUrl post.photo.url
    end
end
