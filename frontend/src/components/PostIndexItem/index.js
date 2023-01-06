import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllPosts, createPost, removePost, deletePost } from "../../store/posts";
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

  const handleDeletePost = (postId) => {
    return (e)=> {
      e.preventDefault();
      return dispatch(deletePost(postId));
    }
  }

  console.log(posts)
  if (user){
    return(
      <>
        <div>
        <form className="postsform" onSubmit={handleSubmit}>
          <input id="body" value={body} onChange={e => setBody(e.target.value)}/>
          <br/>
          <button className="postbutton">What's on your mind, {user.username}?</button>
        </form>
          <br/>
            {posts.reverse().map(post => (
              <>
                  <h4 className="posts">{post.body}</h4>
                  <button className="remove" onClick={handleDeletePost(post.id)}>
                    <img src="./images/trashpic.png" alt="trash icon"/>
                       Move to trash
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
