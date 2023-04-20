import csrfFetch from "./csrf"
import { RECIEVEPOSTS } from "./posts"
import { RECIEVEPOST } from "./posts"

const RECIEVE_LIKES = 'posts/recieve_likes'
const RECIEVE_LIKE = 'posts/recieve_like'
const REMOVELIKE = 'posts/likes/REMOVELIKE'

export const recieve_likes = likes => ({
    type: RECIEVE_LIKES,
    likes
})

export const recieve_like = like => ({
    type: RECIEVE_LIKE,
    like
})

export const removeLike = likeId => ({
    type: REMOVELIKE,
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
    let newBody = {like: {postId: postId}}
    const res = await csrfFetch(`/api/posts/${postId}/likes`, {
        method: 'POST',
        body: JSON.stringify(newBody),
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
        dispatch(removeLike(likeId))
    }
}

const likeReducer = (state = {}, action) => {
    const newState = {...state}
    switch(action.type){
        case RECIEVEPOSTS:
            return {...newState, ...action.posts}
        case RECIEVE_LIKES:
            return {...newState, ...action.likes.likes}
        case RECIEVE_LIKE:
            return {...newState, [action.like.id]: action.like}
        case REMOVELIKE:
            delete newState[action.likeId]
            return newState
        default:
            return state
    }
};

export default likeReducer;
