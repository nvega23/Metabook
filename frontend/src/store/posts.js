import csrfFetch from "./csrf"

const RECIEVEPOST = 'posts/recievePost'
const RECIEVEPOSTS = 'posts/recievePosts'
const REMOVEPOST = 'posts/removePost'
const RECIEVECOMMENTS = 'posts/comments/RECIEVECOMMENTS'
const REMOVECOMMENT = 'posts/comments/REMOVECOMMENT'

export const recievePosts = posts => {
    return {
        type: RECIEVEPOSTS,
        posts
    }
}

export const recievePost = post => ({
    type: RECIEVEPOST,
    post
})

export const removePost = postId => ({
    type: REMOVEPOST,
    postId
})

export const recieveComments = comments => ({
    type: RECIEVECOMMENTS,
    comments
})

export const removeComments = commentId => ({
    type: REMOVECOMMENT,
    commentId
})

export const getPost = (reportId) => (store) => {
    if (store.posts && store.posts[reportId]) return store.posts[reportId]
    return null
}

export const getPosts = (store) => {
    if (store.posts) return Object.values(store.posts)
    return []
}

export const fetchPost = (postId) => async dispatch => {
    const res = await csrfFetch(`api/posts/${postId}`)
    if (res.ok){
        const post = await res.json()
        dispatch(recievePost(post))
    }
}

export const fetchAllPosts = () => async dispatch => {
    const res = await csrfFetch('api/posts')
    if (res.ok){
        const post = await res.json()
        dispatch(recievePosts(post))
    }
}

export const createPost = (post) => async dispatch => {
    const res = await csrfFetch(`api/posts`, {
        method: "POST",
        body: JSON.stringify(post),
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
    })
    if (res.ok){
        const newPost = await res.json()
        dispatch(recievePost(newPost))
    }
}

export const updatePost = (post) => async dispatch => {
    const res = await csrfFetch(`api/posts/${post.id}`, {
        method: 'PATCH',
        body: JSON.stringify(post),
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
    })
    if (res.ok){
        const newPost = await res.json()
        dispatch(recievePost(newPost))
    }
}

export const deletePost = (postId) => async dispatch => {
    const res = await csrfFetch(`api/posts/${postId}`, {
        method: "DELETE"
    })
    if (res.ok){
        dispatch(removePost(postId))
    }
}

export const createComment = (comment) => async dispatch => {
    const res = await csrfFetch(`api/posts/${comment.post_id}/comments`, {
        method: "POST",
        body: JSON.stringify(comment)
    })
    if (res.ok){
        const comment = await res.json()
        dispatch(recieveComments(comment))
    }
}

export const deleteComment = (postId ,commentId) => async dispatch => {
    const res = await csrfFetch(`api/posts/${postId}/comments/${commentId}`, {
        method: 'DELETE',
    })
    if (res.ok){
        dispatch(removeComments(commentId))
    }
}

const postReducer = (state = {}, action) => {
    const newState = {...state}
    switch(action.type){
        case RECIEVEPOSTS:
            return {...newState, ...action.posts}
        case RECIEVEPOST:
            return {...newState, [action.post.id]: action.post}
        case REMOVEPOST:
            delete createPost[action.postId]
            return createPost
        default:
            return state
    }
};

export default postReducer;
