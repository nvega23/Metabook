import csrfFetch from "./csrf";

export const RECEIVEUSER = 'users/RECEIVEUSER'
export const RECEIVEUSERS = 'users/REIIEVEUSERS'
export const REMOVEUSER = 'users/REMOVEUSER'

const receiveUser = (user) => ({
    type: RECEIVEUSER,
    user
})

const receiveUsers = (users) => ({
    type: RECEIVEUSERS,
    users
})

const removeUser = (userId) => ({
    type: REMOVEUSER,
    userId
})

export const getUsers = (state) => {
    return state?.users ? Object.values(state.users) : [];
}

export const getUser = (userId) => (state) => {
    return state?.users ? state.users[userId] : null;
}

export const fetchusers = () => async dispatch => {
    const res = await csrfFetch(`/api/users`)
    if (res.ok){
        const user = await res.json()
        dispatch(receiveUsers(user))
    }
}

export const fetchUser = (userId) => async dispatch => {
    const res = await csrfFetch(`/api/users/${userId}`)
    if (res.ok){
        const user = await res.json()
        dispatch(receiveUser(user))
    }
}

export const createUser = (user) => async dispatch => {
    const res = await csrfFetch(`/api/users`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            "Content-Type": 'application/json',
            "Accept": 'application/json',
        }
    })
    if (res.ok){
        const newUser = res.json()
        dispatch(receiveUser(newUser))
    }
}

export const deleteUser = (userId) => async dispatch => {
    const res = await csrfFetch(`/api/users/${userId}`, {
        method: "DELETE"
    })
    if (res.ok){
        dispatch(removeUser(userId))
    }
}

const userReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = {...state};
    switch (action.type) {
        case RECEIVEUSER:
            return {...state, [action.user.user.id]: action.user.user}
        case RECEIVEUSERS:
            return {...state, ...action.users}
        case REMOVEUSER:
            delete newState[action.userId];
            return newState;
        default:
            return state;
    }
};

export default userReducer;
