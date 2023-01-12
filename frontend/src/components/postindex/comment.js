import { createComment, deleteComment, fetchComment, updateComment } from "../../store/comments";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './comment.css'

const CommentButton = ({post, body}) => {
    const dispatch = useDispatch();
    const postId = post.id
    // const comments = useSelector((state)=> )
    const [commentBody, setCommentBody] = useState("");
    const [comment, setComment] = useState(false)

    const handleCommentPost = async e => {
      e.preventDefault()
      dispatch(createComment( post.id, commentBody ))
    }

    const handleFetchComment = async e => {
        e.preventDefault()
        dispatch(fetchComment(comment.id))
    }

    const handleEditComment = async e => {
        e.preventDefault()
        const newComment = { ...comment, body: commentBody };
        dispatch(updateComment(newComment))
    }

    const handleDeleteComment = (e, commentId) => {
        e.preventDefault()
        dispatch(deleteComment(postId, commentId))
    }

    return (
        <>
            <button className="commentButton" onClick={() => {setComment(prev => !prev); setCommentBody(comment.body);}}>
                <img src="./images/comments.png" alt="trash icon"/>
            </button>
            { comment && <form>
                <br/>
                <br/>
                <br/>
            <textarea className="commentText" value={commentBody} onChange={e => setCommentBody(e.target.value)} />
            <button onClick={handleCommentPost}>
                Write a comment...
            </button>
            <button onClick={(e)=>handleEditComment(e, comment.id)}>
                Edit comment
            </button>
            <button onClick={(e)=>handleDeleteComment(e, comment.id)}>
                Remove Comment
            </button>
            </form>}
        </>
    )
};

export default CommentButton;
