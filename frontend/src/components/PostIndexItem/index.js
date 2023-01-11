import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllPosts, createPost, deletePost, updatePost } from "../../store/posts";
import './posts.css'
import { Modal } from '../../context/Modal';
import { Redirect } from "react-router";
import { createComment, fetchComment, fetchComments } from "../../store/comments";
import LikeButton from "../postindex/like";
import { fetchAllLikes } from "../../store/likes";
import CommentButton from "../postindex/comment";
import removeEditButton from "../Navigation/removeEditButton";


const PostIndex = () => {
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch()
  const [body, setBody] = useState("");
  const [editBody, setEditBody] = useState("");
  const [edit, setEdit] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const likes = useSelector((store) => Object.values(store.likes))
  const likedPosts = likes.map((ele)=> ele.post_id)
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
    const newPost = { ...post, body: editBody };
    dispatch(updatePost(newPost));
    setEdit(false);
  }

  // const [photoFile, setPhotoFile] = useState(null)
  // const [photoUrl, setPhotoUrl] = useState(null)

  // const handlePhoto = (e) => {
  //   const file = e.currentTarget.files[0]
  //   setPhotoFile(file)
  // }

  // const handlePhotoSubmit = () => async e => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append('post[body]', body);
  //   if (photoFile) {
  //     formData.append('post[photo]', photoFile);
  //   }
  //   const response = await fetch('/api/posts', {
  //     method: 'POST',
  //     body: formData
  //   });
  //   if (response.ok) {
  //     const message = await response.json();
  //     console.log(message.message);
  //     setBody("");
  //     setPhotoFile(null);
  //     setPhotoUrl(null);
  //   }
  // }

  // const preview = photoUrl ? <img src={photoUrl} alt="" height="200" /> : null;

  if (user){
    return(
      <>

      {/* //     <form onSubmit={handlePhotoSubmit}>
      //       <label htmlFor="post-title">Title of Post</label>
      //       <input type="text"
      //         id="post-title"
      //         value={body}
      //         onChange={handleSubmit}/>
      //       <input type="file" onChange={handlePhoto}/>
      //       <h3>Image preview</h3>
      //       {preview}
      //       <button>Make a new Post!</button>
      //     </form> */}
        <div>
        <form className="postsform" onSubmit={handleSubmit}>
          <input id="body" value={body} onChange={e => setBody(e.target.value)}/>
          <br/>
          <br/>
          <button className="postbutton">What's on your mind, {user.username}?</button>
          {/* onClick={()=>showModal(true)} */}
          {/* {showModal && (
            <Modal onClose={() => setShowModal(false)}>
            </Modal>
          )} */}
        </form>


          <br/>
            {posts.map(post => (
              <>
                  <h4 className="posts">
                    {post.id}
                    {post.body}
                    <br/>

                      <button className="removeEdit" onClick={(e)=>handleDeletePost(e, post.id)}>
                        <img src="./images/trashpic.png" alt="trash icon"/>
                      </button>
                      <br/>
                      <button className="removeEdit" onClick={() => {setEdit(prev => !prev); setEditBody(post.body);}}>
                        <img src="./images/pencil.png" alt="pencil icon"/>Edit
                      </button>
                      { edit && <form>
                        <textarea value={editBody} onChange={e => setEditBody(e.target.value)} />
                        <button onClick={(e)=>handleEditPost(e, post)}>
                          Update Post
                        </button>
                      </form>}
                    <LikeButton post = {post} isLiked = {likedPosts.includes(post.id)} likes = {likes}/>
                    <CommentButton post = {post} body = {post.body}/>
                    <br/>
                  </h4>
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
