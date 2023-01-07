import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllPosts, createPost, removePost, deletePost, updatePost, fetchPost } from "../../store/posts";
import './posts.css'
import { Redirect } from "react-router";
import editPost from "./editpost";

const PostIndex = () => {
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch()
  const [body, setBody] = useState("")
  const [edit, setEdit] = useState(false)
  const posts = useSelector((state) =>{
    if (user){
      return Object.values(state.posts).filter((post)=>post.users_id === user.id)
    }
  });
  const postId = useParams(getPost(posts))
  // const postId = useParams()

  const handleSubmit = e => {
    e.preventDefault()
    const posts = {
      body: body
    }
    dispatch(createPost(posts))
    dispatch(removePost(posts))
    setBody('')
  }

  useEffect(()=>{
    dispatch(fetchAllPosts());
  }, [])

  useEffect((postId)=>{
    dispatch(fetchPost(postId))
    setEdit(true)
}, [dispatch])

  const handleDeletePost = (postId) => {
    return (e)=> {
      e.preventDefault();
      return dispatch(deletePost(postId));
    }
  }

  const handleEditPost = (postId) => {
    return (e)=> {
      e.preventDefault();
      return dispatch(updatePost(postId));
    }
  }

  useEffect((postId)=>{
    dispatch(removePost(postId))
  }, [])

  console.log(posts)
  if (user){
    return(
      <>
      <h3>{user.username}</h3>
        <form className="postsform" onSubmit={handleSubmit}>
          <input id="body" value={body} onChange={e => setBody(e.target.value)}/>
          <br/>
          <button className="post">whats on your mind, {user.username}?</button>
        </form>
        <div>
        <form className="postsform" onSubmit={handleSubmit}>
          <input id="body" value={body} onChange={e => setBody(e.target.value)}/>
          <br/>
          <button className="postbutton">What's on your mind, {user.username}?</button>
        </form>
          <br/>
            {posts.reverse().map(post => (
              <>
                  <h4 className="posts">
                    {user.username}
                    <br/>
                    <br/>
                    {post.body}
                  </h4>
                  <button className="remove" onClick={handleDeletePost(post.id)}>
                    <img src="./images/trashpic.png" alt="trash icon"/>
                       Move to trash
                  </button>
                  <button onClick={handleEditPost(post.id)}>
                    Edit
                  </button>
              </>
            ))}
        </div>
      </>
    )
  } else {
    return <Redirect to="/"/>
  }
};

export default PostIndex;
