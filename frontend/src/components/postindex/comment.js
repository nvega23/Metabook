import { createComment, deleteComment, fetchComment, updateComment } from "../../store/comments";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LikeButton from "./like";
import './comment.css'

const CommentButton = ({post, body}) => {
    const likes = useSelector((store) => Object.values(store.likes))
    const likedComments = likes.map((ele)=> ele.commentId)
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    const postId = post.id
    const comments = useSelector((state) =>{
        if (user){
          return Object.values(state.comments).filter((comment)=>comment.post_id === post.id)
        }
    });

    const [commentBody, setCommentBody] = useState("");
    const [comment, setComment] = useState(false)

    const handleCommentPost = async e => {
      e.preventDefault()
      dispatch(createComment( post.id, commentBody ))
    }

    const handleFetchComment = async e => {
        e.preventDefault()
        dispatch(fetchComment(post.id, comment.id))
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
            <br/>
            <br/>
            <br/>
            <br/>
            {comments.map(comment => (
                <>
                    <u>
                        <br/>
                        <br/>
                        {user.username}
                    </u>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    {post.id}
                    {comment.body}
                    {comment.id}
                    <br/>
                    <br/>
                    <form onSubmit={handleDeleteComment}>
                        <button className="removeComment" onClick={(e)=>handleDeleteComment(e, comment.id, comment.body)}>
                            Remove
                        </button>
                    <br/>
                        <button className="editComment" onClick={(e)=>handleEditComment(e, comment.id)}>
                            Edit comment
                        </button>
                    </form>
                    <LikeButton post = {post} isLiked = {likedComments.includes(comment.id)} comment = {comment}/>
                </>
            ))}
            { comment && <form>
                <br/>
                <br/>
                <br/>
            <textarea className="commentText" value={commentBody} onChange={e => setCommentBody(e.target.value)} />
            <button onClick={handleCommentPost}>
                Write a comment...
            </button>
            </form>}
        </>
    )
};

export default CommentButton;
