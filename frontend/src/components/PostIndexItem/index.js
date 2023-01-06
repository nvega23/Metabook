import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllPosts, createPost, removePost } from "../../store/posts";
import './posts.css'
import { Redirect } from "react-router";

const PostIndex = () => {
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch()
  const [body, setBody] = useState("")
  // const [posts, setPosts] = useState([])
  const posts = useSelector((state) =>{
    if (user){
      return Object.values(state.posts).filter((post)=>post.users_id === user.id)
    }
  });

  const handleSubmit = e => {
    e.preventDefault()
    const posts = {
      body: body
    }
    dispatch(createPost(posts))
    dispatch(removePost(posts))
    setBody('')
  }

  useEffect((postId)=>{
    dispatch(removePost(postId))
  }, [])

  useEffect(()=>{
    dispatch(fetchAllPosts());
  }, [])


  const handleDeletePost = e => {
    e.preventDefault();
    return dispatch(removePost(posts));
  }

  console.log(posts)
  if (user){
    return(
      <>
        <div>
          <h3>{user.username}</h3>
          <br/>
            {posts.map(post => (
              <div className="posts">
                  <h4>{post.body}</h4>
                  <button onClick={handleDeletePost}>remove post</button>
              </div>
            ))}
        </div>
        <form onSubmit={handleSubmit}>
          <input id="body" value={body} onChange={e => setBody(e.target.value)}/>
          <br/>
          <button>post</button>
        </form>
      </>
    )
  } else {
    return <Redirect to="/"/>
  }
};

export default PostIndex;
