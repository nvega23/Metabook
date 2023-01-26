import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllPosts, createPost, deletePost, updatePost } from "../../store/posts";
import './posts.css'
import { Redirect } from "react-router";
import LikeButton from "../postindex/like";
import CommentButton from "../postindex/comment";

const PostIndex = () => {
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch()
  const [body, setBody] = useState("");
  const [editBody, setEditBody] = useState("");
  const [edit, setEdit] = useState(false)
  // const [showModal, setShowModal] = useState(false);
  const likes = useSelector((store) => Object.values(store.likes))
  const likedPosts = likes.map((ele)=> ele.postId)
  const posts = useSelector((state) =>{
    if (user){
      return Object.values(state.posts).filter((post)=>post.usersId === user.id).reverse()
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

  const [photoFile, setPhotoFile] = useState(null)
  const [photoUrl, setPhotoUrl] = useState(null)

  const handleFile = (e) => {
    const file = e.currentTarget.files[0]
    setPhotoFile(file)
  }

  const preview = photoUrl ? <img src={photoUrl} alt="" height="200" /> : null;

  if (user){
    console.log(photoFile)
    return(
      <>
        <div>
        <form onSubmit={handleSubmit}>
            <br/>
            <br/>
          <div >
            <input className="input" id="body" value={body} onChange={e => setBody(e.target.value)}/>
            <br/>
            <br/>
            <button className="postbutton">What's on your mind, {user.username}?</button>
            {/* <input type="file" onChange={handleFile} /> */}
            <input type="file" accept=".jpg, .jpeg, .png" multiple
            className="photoUpload" onChange={handleFile}/>
            {preview}
          </div>
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
                    <h3 className="username">{user.username}</h3>
                    <br/>
                      <button className="editButton" onClick={() => {setEdit(post.id); setEditBody(post.body);}}>
                        <img src="./images/pencil.png" alt="pencil icon"/>Edit
                      </button>
                      <br/>
                      <button className="removeEdit" onClick={(e)=>handleDeletePost(e, post.id)}>
                        <img src="./images/trashpic.png" alt="trash icon"/>
                      </button>
                      <br/>
                    <p className="postBody">
                      {post.body}
                    { edit === post.id  && <form>
                        <textarea className="editTextArea" value={editBody} onChange={e => setEditBody(e.target.value, post.id)}/>
                        <button className="updatePost" onClick={(e)=>handleEditPost(e, post, post.id)}>
                          Save
                        </button>
                      </form>}
                    </p>
                    <br/>
                    <br/>
                    { post.photoUrl && (
                      <img className="images" src={post.photoUrl[0]} alt="photo"/>
                    )}
                    <br/>
                    <br/>
                      <LikeButton post = {post} isLiked = {likedPosts.includes(post.id)} likes = {likes}/>
                      <CommentButton className={"commentButton"} post = {post} body = {post.body}/>
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
