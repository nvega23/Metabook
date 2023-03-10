import csrfFetch from "./csrf";

export const RECEIVE_FRIEND = 'friend/RECEIVE_FRIEND';
export const RECEIVE_FRIENDS = 'friend/RECEIVE_FRIENDS';
export const REMOVE_FRIEND = 'friend/REMOVE_FRIEND';

const receiveFriend = (friend) => ({
    type: RECEIVE_FRIEND,
    friend
});

const receiveFriends = (friends) => ({
    type: RECEIVE_FRIENDS,
    friends
});

const removeFriend = (friendId) => ({
    type: REMOVE_FRIEND,
    friendId
});

export const getFriend = (friendId) => (state) => {
    return state?.friends ? state.friends[friendId] : null;
}

export const getFriends = (state) => {
    return state?.friends ? Object.values(state.friends) : [];
}

export const fetchFriends = () => async (dispatch) => {
    const res = await csrfFetch ('/api/friends');

    if (res.ok) {
        const friends = await res.json();
        dispatch(receiveFriends(friends));
    }
}

export const fetchFriend = (friendId) => async (dispatch) => {
    const res = await csrfFetch(`/api/friends/${friendId}`);

    if (res.ok) {
        const friend = await res.json();
        dispatch(receiveFriend(friend));
    }
}

export const createFriend = (requesteeId) => async (dispatch) => {
    const friend = {
            requesteeId
    }
    const res = await csrfFetch('/api/friends', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({friend})
    });
    if (res.ok) {
        const friend = await res.json();
        dispatch(receiveFriend(friend));
    }
}

export const deleteFriend = (requestee_id) => async (dispatch) => {
    const res = await csrfFetch(`/api/friends/${requestee_id}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        dispatch(removeFriend(requestee_id));
    }
}

const friendReducer = (state = {}, action) => {
    const newState = {...state};
    switch (action.type) {
        case RECEIVE_FRIENDS:
            return {...state, ...action.friends}
        case RECEIVE_FRIEND:
            return {...state, [action.friend.id]: action.friend}
        case REMOVE_FRIEND:
            delete newState[action.friendId];
            return newState;
        default:
            return state;
    }
}

export default friendReducer;
