import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllPosts, createPost, removePost, deletePost, updatePost, fetchPost } from "../../store/posts";
import './posts.css'
import { Redirect } from "react-router";

const PostIndex = () => {
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch()
  const [body, setBody] = useState("");
  const [editBody, setEditBody] = useState("");
  const [edit, setEdit] = useState(false)
  const posts = useSelector((state) =>{
    if (user){
      return Object.values(state.posts).filter((post)=>post.users_id === user.id).reverse()
    }
  });

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(createPost({ body }));
    setBody('');
  }

  useEffect(()=>{
    dispatch(fetchAllPosts());
  }, [dispatch])

  const handleDeletePost = (e, postId) => {
    e.preventDefault();
    return dispatch(deletePost(postId));
  }

  const handleEditPost = (e, post) => {
    e.preventDefault();
    // const newPost = { ...post };
    // newPost[body] = editBody;
    const newPost = { ...post, body: editBody };
    dispatch(updatePost(newPost));
    setEdit(false);
  }

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
            {posts.map(post => (
              <>
                  <h4 className="posts">
                    {user.username}
                    <br/>
                    <br/>
                    {post.body}
                  </h4>
                  <button className="remove" onClick={(e)=>handleDeletePost(e, post.id)}>
                    <img src="./images/trashpic.png" alt="trash icon"/>
                       Move to trash
                  </button>
                  <button onClick={() => {
                    setEdit(prev => !prev);
                    setEditBody(post.body);
                  }}>
                    Edit Post
                  </button>
                  { edit && <form>
                    <textarea value={editBody} onChange={e => setEditBody(e.target.value)} />
                    <button onClick={(e)=>handleEditPost(e, post)}>
                      Update Post
                    </button>
                  </form>}
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
