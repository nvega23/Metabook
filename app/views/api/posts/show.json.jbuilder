# json.extract! @post, :id, :body, :users_id, :created_at, :updated_at
# json.likes @post.likes
# json.comments @post.comments
# json.post do
#     json.extract! @post, :id, :body, :users_id, :created_at, :updated_at
# end

json.extract! @comments, :id, :body, :users_id, :post_id, :created_at, :updated_at

# json.likes do
#     @post.likes do |like|
#         json.set! like.id do
#         json.extract! like, :id, :user_id, :post_id, :created_at, :updated_at
#     end
# end
# end
