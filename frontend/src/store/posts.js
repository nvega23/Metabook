import csrfFetch from "./csrf"
import axios from 'axios';

export const RECIEVEPOST = 'posts/recievePost'
export const RECIEVEPOSTS = 'posts/recievePosts'
export const REMOVEPOST = 'posts/removePost'

export const recievePosts = payload => {
    return {
        type: RECIEVEPOSTS,
        payload
    }
}

export const recievePost = payload => ({
    type: RECIEVEPOST,
    payload
})

export const removePost = postId => ({
    type: REMOVEPOST,
    postId
})

export const getPost = (reportId) => (store) => {
    if (store.posts && store.posts[reportId]) return store.posts[reportId]
    return null
}

export const getPosts = (store) => {
    if (!store.posts) return Object.values(store.posts)
    return []
}

export const fetchPost = (postId) => async dispatch => {
    const res = await csrfFetch(`api/posts/${postId}`)
    if (res.ok){
        const post = await res.json()
        dispatch(recievePost(post))
    }
}

export const fetchPosts = (userId) => async dispatch => {
    const res = await csrfFetch(`/api/posts?userId=${userId}`)
    if (res.ok){
        const posts = await res.json()
        dispatch(recievePosts(posts))
    }
}

export const fetchAllPosts = () => async dispatch => {
    const res = await csrfFetch('/api/posts')
    if (res.ok){
        const posts = await res.json()
        return dispatch(recievePosts(posts))
    }
}

export const createPost = (post) => async dispatch => {
    const res = await csrfFetch(`/api/posts`, {
        method: "POST",
        body: post
    })
    if (res.ok){
        const newPost = await res.json()
        dispatch(recievePost(newPost))
    }
}

export const updatePost = (post) => async dispatch => {
    const res = await csrfFetch(`/api/posts/${post.id}`, {
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
    const res = await csrfFetch(`/api/posts/${postId}`, {
        method: "DELETE"
    })
    if (res.ok){
        dispatch(removePost(postId))
        return postId
    }
}

const postReducer = (state = {}, action) => {
    const newState = {...state}
    switch(action.type){
        case RECIEVEPOSTS:
            return {...action.payload.posts}
        case RECIEVEPOST:
            return {...newState, [action.payload.post.id]: action.payload.post}
        case REMOVEPOST:
            delete newState[action.postId]
            return newState
        default:
            return state
    }
};

export default postReducer;
