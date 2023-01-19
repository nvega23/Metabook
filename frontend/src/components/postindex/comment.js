import { createComment, deleteComment, fetchComments, updateComment } from "../../store/comments";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import LikeButton from "./like";
import './comment.css'

const CommentButton = ({post, body}) => {
    // const likes = useSelector((store) => Object.values(store.likes))
    // const likedComments = likes.map((ele)=> ele.commentId)
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    const postId = post.id
    const comments = useSelector((state) =>{
        if (user){
          return Object.values(state.comments).filter((comment)=>comment.postId === post.id)
        }
    });

    const [commentBody, setCommentBody] = useState("");
    const [commentBool, setCommentBool] = useState(false)

    const handleCommentPost = async e => {
      e.preventDefault()
      dispatch(createComment( post.id, commentBody ))
      commentBool(false)
    }

    // useEffect(()=>{
    //     dispatch(fetchComments());
    // }, [dispatch])

    // const handleFetchComment = async e => {
    //     e.preventDefault()
    //     dispatch(fetchComment(post.id, commentBody))
    // }

    const handleEditComment = (e, commentId) => {
        e.preventDefault()
        const newComment = { ...commentBool, body: commentBody };
        dispatch(updateComment(postId, newComment, commentId))
    }

    const handleDeleteComment = (e, commentId) => {
        e.preventDefault()
        dispatch(deleteComment(postId, commentId))
    }

    return (
        <>
                {/* const [commentBool, setCommentBool] = useState(false) */}
                {/* const [commentBody, setCommentBody] = useState(""); */}
            <button className="commentButton" onClick={() => {setCommentBool(prev => !prev); setCommentBody(commentBool.body);}}>
                <img src="./images/comments.png" alt="trash icon"/>
            </button>
            <br/>
            {comments.map(comment => (
                <>
                    <h3 className="username">
                        <br/>
                        {user.username}
                    </h3>
                    <form onSubmit={handleDeleteComment}>
                        <button className="editComment" onClick={(e)=>handleEditComment(e, comment.id)}>
                            Edit comment
                        </button>
                        <br/>
                        <button className="removeComment" onClick={(e)=>handleDeleteComment(e, comment.id, comment.body)}>
                            Remove
                        </button>
                    </form>
                    <h5 className="commentBody">
                        {comment.body}
                    </h5>
                    {/* <LikeButton post = {post} isLiked = {likedComments.includes(comment.id)} comment = {comment}/> */}
                </>
            ))}
            { commentBool && <form>
            <textarea className="commentText" value={commentBody} onChange={e => setCommentBody(e.target.value)} />
            <br/>
            <button className="writeCommentButton" onClick={handleCommentPost}>
                Write a comment...
            </button>
            </form>}
        </>
    )
};

export default CommentButton;
