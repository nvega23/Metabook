import { createComment, deleteComment, updateComment } from "../../store/comments";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import dayjs from "dayjs";
import moment from 'moment'
import relativeTime from "dayjs/plugin/relativeTime"
import './comment.css'
import { useHistory } from "react-router";


const CommentButton = ({post}) => {
    const history = useHistory()
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
    const commentId = comments.id

    const [commentBody, setCommentBody] = useState("");
    const [editCommentId, setEditCommentId] = useState(-1)
    const [commentEditBool, setCommentEditBool] = useState("")
    // const [commentPlaceholder, setCommentPlaceholder] = useState("")
    const [commentIndex, setCommentIndex] = useState(0)

    useEffect(() => {
        if (editCommentId){
            setEditCommentId(commentId)
        }
    }, []);

    const handleCommentPost = async e => {
      e.preventDefault()
      dispatch(createComment( post.id, commentBody ))
      setCommentEditBool("")
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
        const newComment = { body: commentBody };
        dispatch(updateComment(postId, newComment, editCommentId))
        setCommentEditBool("")
    }

    const editComment = (e, commentId) => {
        e.preventDefault()
        if (commentEditBool === "edit"){
            setCommentEditBool("")
        } else {
            setCommentEditBool("edit")
        }
        setEditCommentId(commentId)
        setCommentIndex(commentId)
    }

    const handleDeleteComment = (e, commentId) => {
        e.preventDefault()
        if (window.confirm("are you sure?")){
            dispatch(deleteComment(postId, commentId))
        }
    }

    const profile = (userId) => (e) => {
        e.preventDefault()
        history.push(`/profilePage/${userId}`)
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
                    <button className="editComment" onClick={(e)=>{editComment(e, comment.id); setCommentBody(comment.body)}}>
                        Edit comment
                    </button>
                    <br/>
                    <button className="removeComment" onClick={(e)=>handleDeleteComment(e, comment.id, comment.body)}>
                        Remove comment
                    </button>
                </form>
                    <>
                        <div className="commentName">
                            <button onClick={profile(comment.usersId)} className="commentersName">
                                {comment?.user?.username.charAt(0).toUpperCase() + comment?.user?.username.slice(1)}
                            </button>
                            <p className="commentBody">
                                <br/>
                                {comment.body}
                            </p>
                            <div className="commentTime">
                                <p>
                                    <time title={new Date(comment.createdAt).toLocaleDateString('en-us',
                                        { weekday:"long", year:"numeric", month:"short", day:"numeric"}) }>{moment(comment.createdAt).fromNow()}
                                    </time>
                                </p>
                            </div>
                        </div>
                    </>
            </>
        ))}
            { commentEditBool === "comment" && <form>
            <textarea className="commentText" onChange={e => setCommentBody(e.target.value)} />
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
