json.extract! @comments, :id, :body, :users_id, :post_id, :created_at, :updated_at

# json.user do
#     json.username post.user.username
# end
# puts @comment
# @comment.each do |comment|
#     json.set! comment.id do
#         json.extract! comment, :id, :body, :users_id, :post_id, :created_at, :updated_at
#         json.user do
#             json.username comment.user.username
#         end
#     end
# end
# json.comment do
#     json.extract! @comment, :id, :body, :users_id, :post_id, :created_at, :updated_at
#     json.user do
#         json.username comment.user.username
#     end
# end
