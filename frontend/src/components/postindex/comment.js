import { createComment, deleteComment, updateComment } from "../../store/comments";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './comment.css'

const CommentButton = ({post}) => {
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    const postId = post.id
    let posts = useSelector(state=>state.posts)
    posts = Object.values(posts).reverse()
    const comments = useSelector((state) =>{
        if (user){
          return Object.values(state.comments).filter((comment)=>comment.postId === post.id)
        }
    });

    const [commentBody, setCommentBody] = useState("");
    const [commentBool, setCommentBool] = useState(false)
    const [editBool, setEditBool] = useState(false)

    const handleCommentPost = async e => {
      e.preventDefault()
      dispatch(createComment( post.id, commentBody ))
    }

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
        <button className="commentButton" onClick={() => {setCommentBool(prev => !prev); setCommentBody(commentBool.body);}}>
            <img src="../images/comments.png" alt="trash icon"/>
            <rect className="PostIndexCommentText">
                Comment
            </rect>
        </button>
        <p className="lineBreaker"></p>
        <br/>
        {comments?.map(comment => (
            <>
                <form onSubmit={handleDeleteComment}>
                    <button className="editComment" onClick={(e)=>handleEditComment(e, comment.id, setEditBool(prev => !prev))}>
                        Edit comment
                    </button>
                    <br/>
                    <button className="removeComment" onClick={(e)=>handleDeleteComment(e, comment.id, comment.body)}>
                    <img src="../images/trashpic.png" alt="trash icon"/> comment
                    </button>
                </form>
                    <>
                        <p className="commentBody">
                            {comment?.user?.username.charAt(0).toUpperCase() + comment?.user?.username.slice(1)}: {comment.body}
                        </p>
                    </>
            </>
        ))}
        { commentBool && <form>
            <textarea className="commentText" value={commentBody} onChange={e => setCommentBody(e.target.value)} />
            <br/>
            <br/>
            <button className="writeCommentButton" onClick={handleCommentPost}>
                Write a comment...
            </button>
            </form>}
            { editBool && <form>
                <textarea className="commentText" value={commentBody} onChange={e => setCommentBody(e.target.value)} />
                <br/>
                <br/>
                {comments.map(comment=> (
                    <button className="writeCommentButton" onClick={(e)=>handleEditComment(e, comment.id, setEditBool(prev => !prev))}>
                        update comment...
                    </button>
                ))}
            </form>}
        </>
    )
};

export default CommentButton;

// <>
// <form onSubmit={handleDeleteComment}>
//     <button className="editComment" onClick={(e)=>handleEditComment(e, comment.id, setEditBool(prev => !prev))}>
//         Edit comment
//     </button>
//     <br/>
//     <button className="removeComment" onClick={(e)=>handleDeleteComment(e, comment.id, comment.body)}>
//     <img src="../images/trashpic.png" alt="trash icon"/> comment
//     </button>
// </form>
//     <>
//         <p className="commentBody">
//             {comment?.user?.username.charAt(0).toUpperCase() + comment?.user?.username.slice(1)}: {comment.body}
//         </p>
//     </>
// </>
// ))}
// { commentBool && <form>
// <textarea className="commentText" value={commentBody} onChange={e => setCommentBody(e.target.value)} />
// <br/>
// <br/>
// <button className="writeCommentButton" onClick={handleCommentPost}>
// Write a comment...
// </button>
// </form>}
// {  editBool && <form>
// <textarea className="commentText" value={commentBody} onChange={e => setCommentBody(e.target.value)} />
// <br/>
// <br/>
// <button className="writeCommentButton" onClick={handleEditComment}>
// edit comment...
// </button>
// </form>}
