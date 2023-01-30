@users.each do |user|
    json.set! user.id do
        json.extract! user, :id, :email, :username, :created_at, :updated_at
        json.friends user.friend_ids
        json.in_pending user.pending_incoming_ids
        json.out_pending user.pending_outgoing_ids
    end
end
