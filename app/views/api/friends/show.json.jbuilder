json.friends do
    json.extract! @friend, :id, :requester_id, :requestee_id
end
