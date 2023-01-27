@friends.each do |friend|
    json.set! friend.id do
        json.extract! friend, :id, :email, :username, :created_at, :updated_at
        json.friends friend.friend_ids
        json.in_pending friend.pending_incoming_ids
        json.out_pending friend.pending_outgoing_ids
    end
end
