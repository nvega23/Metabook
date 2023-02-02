json.extract! @comments, :id, :body, :users_id, :post_id, :created_at, :updated_at

# json.user do
#     json.username post.user.username
# end
# puts @comment
# json.extract! user, :id, :username, :created_at, :updated_at
# @comment.each do |comment|
#     json.set! comment.id do
#         json.extract! comment, :id, :body, :users_id, :post_id, :created_at, :updated_at
#         json.user do
#             json.username comment.user.username
#         end
#     end
# end

# json.comments do
#     json.user do
#         json.extract! @comments, :id, :body, :users_id, :post_id, :created_at, :updated_at
#         json.username comments.user.username
#     end
# end
