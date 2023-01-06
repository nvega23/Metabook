import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllPosts, createPost, removePost, fetchPost, getPost } from "../../store/posts";
import './posts.css'
import { Redirect, useParams } from "react-router";

const PostIndex = () => {
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch()
  const [body, setBody] = useState("")
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

  console.log(user)
  console.log(postId)
  const handleDeletePost = e => {
    e.preventDefault();
    dispatch(removePost(postId));
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
          <br/>
            {posts.map(post => (
              <div className="posts">
                  <h4>{post.body}</h4>
                  <button onClick={handleDeletePost}>remove post</button>
              </div>
            ))}
        </div>
      </>
    )
  } else {
    return <Redirect to="/"/>
  }
};

export default PostIndex;
