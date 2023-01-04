const RECIEVEPOST = 'posts/recievePost'
const RECIEVEPOSTS = 'posts/recievePosts'
const REMOVEPOST = 'posts/removePost'

export const recievePosts = posts = ({
    type: RECIEVEPOSTS,
    posts
})
export const recievePost = post = ({
    type: RECIEVEPOST,
    post
})
export const removePost = postId = ({
    type: REMOVEPOST,
    postId
})

export const getPost = (reportId) => (store) => {
    if (store.reports && store.reports[reportId]) return store.reports[reportId]
    return null
}
export const getPosts = (store) => {
    if (store.reports) return Object.values(store.reports)
    return []
}

export const fetchPost = (postId) => async dispatch => {
    const res = await fetch(`api/posts/${postId}`)
    if (res.ok){
        const post = await res.json()
        dispatch(recievePost(post))
    }
}

export const fetchAllPosts = () => async dispatch => {
    const res = await fetch('api/posts')
    if (res.ok){
        const post = await res.json()
        dispatch(recievePosts(post))
    }
}

export const newPost = (post) => async dispatch => {
    const res = await fetch(`api/posts`, {
        method: "POST",
        body: JSON.stringify(post),
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
    })
    if (res.ok){
        const newPost = await res.json()
        dispatch(recievePosts(newPost))
    }
}

export const updatePost = (post) => async dispatch => {
    const res = await fetch(`api/posts/${post.id}`, {
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
    const res = await fetch(`api/posts/${postId}`, {
        method: "DELETE"
    })
    if (res.ok){
        dispatch(removePost(postId))
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
            delete newPost[action.post]
            return newPost
        default:
            return state
    }
};

export default postReducer;
