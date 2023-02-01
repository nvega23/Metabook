import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllPosts, createPost, deletePost, updatePost, fetchPosts } from "../../store/posts";
import { Redirect, useParams } from "react-router";
import LikeButton from "../postindex/like";
import CommentButton from "../postindex/comment";
import { useHistory } from "react-router";
import { useRef } from "react";
import './style.css';

const NewsFeed = () => {
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch()
  const [body, setBody] = useState("");
  const [editBody, setEditBody] = useState("");
  const [edit, setEdit] = useState(false)
  const [photoFile, setPhotoFile] = useState(null)
  const [photoUrl, setPhotoUrl] = useState(null)
  const fileRef = useRef(null);
  const history = useHistory()
  const likes = useSelector((store) => Object.values(store.likes))
  const likedPosts = likes.map((ele)=> ele.postId)
  const posts = useSelector((state) =>{
      return Object.values(state.posts).reverse()
  });

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth"
    })
  }

  const profile = (userId) => (e) => {
    e.preventDefault()

    history.push(`/profilePage/${userId}`)
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    if (photoFile) {
      formData.append('post[photo]', photoFile);
    }
    formData.append('post[body]', body);
    dispatch(createPost(formData)).then(() => {
      setBody('');
      setPhotoFile(null);
      setPhotoUrl(null);
    });
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

  const handleFile = (e) => {
    const file = e.currentTarget.files[0];

    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        setPhotoFile(file);
        setPhotoUrl(fileReader.result);
      };
    }
  }

  const preview = photoUrl ? <img className="images" src={photoUrl} alt=""/> : null;

  if (user){
    return(
      <>
        <div>
        <form className="poster" onSubmit={handleSubmit}>
          <div>
            <input className="input" id="body" value={body} onChange={e => setBody(e.target.value)}/>
            <br/>
            <button className="postbutton">What's on your mind, {user.username}?</button>
            <input type="file" accept=".jpg, .jpeg, .png" multiple
            className="photoUpload" onChange={handleFile}/>
          </div>
        </form>
            {posts.map(post => (
              <div className="headers">
                  <h4 className="posts">
                    {/* <p className="username">{post.user.username}</p> */}
                    <button onClick={profile(post.usersId)} className="username">{post.user.username}
                    </button>
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
                    { post.photoUrl ? (
                      <img className="images" ref={fileRef} src={post.photoUrl} alt="photo"/>
                      ) : preview}
                    <br/>
                    <br/>
                    <hr/>
                      <LikeButton post = {post} isLiked = {likedPosts.includes(post.id)} likes = {likes}/>
                      <CommentButton className={"commentButton"} post = {post} body = {post.body}/>
                  </h4>
              </div>
            ))}
            <button className="scrollToTop" onClick={scrollToTop}>
              Scroll to top
            </button>
        </div>
      </>
    )
  } else {
    return <Redirect to="/"/>
  }
};

export default NewsFeed;
