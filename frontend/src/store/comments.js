import csrfFetch from "./csrf"
import { RECIEVEPOST, RECIEVEPOSTS } from "./posts"

export const RECIEVECOMMENTS = 'posts/comments/RECIEVECOMMENTS'
export const RECIEVECOMMENT = 'posts/comments/RECIEVECOMMENT'
export const REMOVECOMMENT = 'posts/comments/REMOVECOMMENT'

export const recieveComments = comments => ({
    type: RECIEVECOMMENTS,
    comments
})

export const recieveComment = comment => ({
    type: RECIEVECOMMENT,
    comment
})

export const removeComment = commentId => ({
    type: REMOVECOMMENT,
    commentId
})

export const fetchComments = () => async dispatch => {
    const res = await csrfFetch(`/api/posts/`)
    if (res.ok){
        const comment = await res.json()
        dispatch(recieveComments(comment))
    }
}

export const fetchComment = (commentId) => async dispatch => {
    const res = await csrfFetch(`/api/posts/${commentId}`)
    if (res.ok){
        const comment = await res.json()
        dispatch(recieveComment(comment))
    }
}

export const createComment = (postId, body) => async dispatch => {
    const res = await csrfFetch(`/api/posts/${postId}/comments`, {
        method: "POST",
        body: JSON.stringify({body, postId})
    })
    if (res.ok){
        const comment = await res.json()
        dispatch(recieveComment(comment))
        return comment
        // dispatch(fetchComment(postId))
    }
}

export const updateComment = ( postId, comment, commentId ) => async dispatch => {
    const res = await csrfFetch(`/api/posts/${postId}/comments/${commentId}`, {
        method: "PATCH",
        body: JSON.stringify(comment),
        Headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    })
    if (res.ok){
        const newComment = await res.json()
        dispatch(recieveComment(newComment))
    }
}

export const deleteComment = (postId ,commentId) => async dispatch => {
    const res = await csrfFetch(`api/posts/${postId}/comments/${commentId}`, {
        method: 'DELETE',
    })
    if (res.ok){
        dispatch(removeComment(commentId))
    }
}

const commentReducer = (state = {}, action) => {
    const newState = {...state}
    switch(action.type){
        case RECIEVEPOSTS:
            return {...newState, ...action.payload.comments}
        case RECIEVEPOST:
            if (action.payload.post.comment) {
                return {...newState, [action.payload.post.comment.id]: action.payload.post.comment}
            } else {
                return {...newState};
            }
        case RECIEVECOMMENTS:
            return {...newState, ...action.comments}
        case RECIEVECOMMENT:
            return {...newState, [action.comment.comment.id]: action.comment.comment}
        case REMOVECOMMENT:
            delete newState[action.commentId]
            return newState
        default:
            return state
    }
};

export default commentReducer;
