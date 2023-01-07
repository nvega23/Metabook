const RECIEVECOMMENTS = 'posts/comments/RECIEVECOMMENTS'
const REMOVECOMMENT = 'posts/comments/REMOVECOMMENT'

export const recieveComments = comments => ({
    type: RECIEVECOMMENTS,
    comments
})

export const removeComments = commentId => ({
    type: REMOVECOMMENT,
    commentId
})

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

