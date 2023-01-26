import { useSelector, useDispatch, useParams } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllPosts, createPost, deletePost, updatePost } from "../../store/posts";
import { Redirect } from "react-router";
import LikeButton from "../postindex/like";
import CommentButton from "../postindex/comment";
import { fetchUser } from "../../store/user";
import { getUser } from "../../store/user";
import './style.css'

const NewsFeed = () => {
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch()
  const [body, setBody] = useState("");
  const [editBody, setEditBody] = useState("");
  const [edit, setEdit] = useState(false)
  const likes = useSelector((store) => Object.values(store.likes))
  const likedPosts = likes.map((ele)=> ele.postId)
  const posts = useSelector((state) =>{
      return Object.values(state.posts).reverse()
  });

  // const handleUser = e => {
  //   e.preventDefault()
  //   dispatch(fetchUser(userId))
  // }

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
    const newPost = { ...post, body: editBody };
    dispatch(updatePost(newPost));
    setEdit(false);
  }

  if (user){
    return(
      <>
        <div>
        <form className="poster" onSubmit={handleSubmit}>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
          <div>
            <input className="input" id="body" value={body} onChange={e => setBody(e.target.value)}/>
            <br/>
            <br/>
            <button className="postbutton">What's on your mind, {user.username}?</button>
          </div>
        </form>
            {posts.map(post => (
              <div className="headers">
                  <h4 className="posts">
                    <h3 className="username">{post.user.username}</h3>
                    <br/>
                      <button className="editButton" onClick={() => {setEdit(post.id); setEditBody(post.body);}}>
                        <img src="./images/pencil.png" alt="pencil icon"/>Edit
                      </button>
                      <br/>
                      <button className="removeEdit" onClick={(e)=>handleDeletePost(e, post.id)}>
                        <img src="./images/trashpic.png" alt="trash icon"/>
                      </button>
                      <br/>
                    <h4 className="postBody">
                      {post.body}
                    { edit === post.id  && <form>
                        <textarea className="editTextArea" value={editBody} onChange={e => setEditBody(e.target.value, post.id)}/>
                        <button className="updatePost" onClick={(e)=>handleEditPost(e, post, post.id)}>
                          Save
                        </button>
                      </form>}
                    </h4>
                    <br/>
                    <br/>
                    { post.photoUrl && (
                      <img className="images" src={post.photoUrl} alt="photo"/>
                    )}
                    <br/>
                    <br/>
                      <LikeButton post = {post} isLiked = {likedPosts.includes(post.id)} likes = {likes}/>
                      <CommentButton className={"commentButton"} post = {post} body = {post.body}/>
                    <br/>
                  </h4>
              </div>
            ))}
        </div>
      </>
    )
  } else {
    return <Redirect to="/"/>
  }
};

export default NewsFeed;
