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
    const [editCommentId, setEditCommentId] = useState(-1)
    const [commentEditBool, setCommentEditBool] = useState("")

    const handleCommentPost = async e => {
      e.preventDefault()
      dispatch(createComment( post.id, commentBody ))
    }

    const handleComment = (e) => {
        e.preventDefault()
        if (commentEditBool === "comment"){
            setCommentEditBool("")
        } else {
            setCommentEditBool("comment")
        }
    }

    const handleEditComment = (e) => {
        e.preventDefault()
        console.log(e.target.value)
        const newComment = { body: commentBody };
        dispatch(updateComment(postId, newComment, editCommentId))
    }

    const editComment = (e, commentId) => {
        e.preventDefault()
        if (commentEditBool === "edit"){
            setCommentEditBool("")
        } else {
            setCommentEditBool("edit")
        }
        setEditCommentId(commentId)
    }

    const handleDeleteComment = (e, commentId) => {
        e.preventDefault()
        dispatch(deleteComment(postId, commentId))
    }

    // only useful on onChange
    // useEffect(() => {
    //     console.log(commentBody)
    // }, [commentBody]);

    return (
        <>
        <button className="commentButton" onClick={handleComment}>
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
                    <button className="editComment" onClick={(e)=>editComment(e, comment.id)}>
                        Edit comment
                    </button>
                    <br/>
                    <button className="removeComment" onClick={(e)=>handleDeleteComment(e, comment.id, comment.body)}>
                        Remove comment
                    </button>
                </form>
                    <>
                        <div className="commentName">
                            {comment?.user?.username.charAt(0).toUpperCase() + comment?.user?.username.slice(1)}
                            <p className="commentBody">
                            <br/>
                            {comment.body}
                            </p>
                        </div>
                    </>
            </>
        ))}
            { commentEditBool === "comment" && <form>
                <textarea className="commentText" value={commentBody} onChange={e => setCommentBody(e.target.value)} />
                <br/>
                <br/>
                <button className="writeCommentButton" onClick={handleCommentPost}>
                    <img className="right64" src="../images/right64.png" alt="trash icon"/>
                </button>
                </form>
            }
            { commentEditBool === "edit" && <form>
                <textarea className="commentText" value={commentBody} onChange={e => setCommentBody(e.target.value)}/>
                <br/>
                <br/>
                    <button className="writeCommentButton" onClick={handleEditComment}>
                        update comment...
                    </button>
                </form>
            }
        </>
    )
};

export default CommentButton;
