import csrfFetch from "./csrf"
import { RECIEVEPOSTS } from "./posts"
import { RECIEVEPOST } from "./posts"

const RECIEVE_LIKES = 'posts/recieve_likes'
const RECIEVE_LIKE = 'posts/recieve_like'
const REMOVE_LIKE = 'posts/remove_like'

export const recieve_likes = likes => ({
    type: RECIEVE_LIKES,
    likes
})

export const recieve_like = like => ({
    type: RECIEVE_LIKE,
    like
})

export const remove_like = likeId => ({
    type: REMOVE_LIKE,
    likeId
})

export const fetchAllLikes = () =>  async dispatch => {
    const res = await csrfFetch(`/api/posts/`)
    if (res.ok){
        const likes = await res.json()
        dispatch(recieve_likes(likes))
    }
}

export const createLike = (postId) => async dispatch => {
    const res = await csrfFetch(`/api/posts/${postId}/likes`, {
        method: 'POST',
        body: JSON.stringify({postId}),
        Headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
    })
    if (res.ok){
        const like = await res.json()
        dispatch(recieve_like(like))
    }
}

export const deleteLike = (postId, likeId) => async dispatch => {
    const res = await csrfFetch(`/api/posts/${postId}/likes/${likeId}`, {
        method: 'DELETE',
    })
    if (res.ok){
        // const like = await res.json()
        dispatch(remove_like(likeId))
    }
}

const likeReducer = (state = {}, action) => {
    const newState = {...state}
    switch(action.type){
        case RECIEVEPOSTS:
            return {...newState, ...action.posts}
        case RECIEVEPOST:
            return {...newState, [action.post.id]: action.post}
        case RECIEVE_LIKES:
            return {...newState, ...action.likes.likes}
        case RECIEVE_LIKE:
            return {...newState, [action.like.id]: action.like}
        case REMOVE_LIKE:
            delete newState[action.likeId]
            return newState
        default:
            return state
    }
};

export default likeReducer;
