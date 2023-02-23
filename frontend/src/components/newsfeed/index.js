import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllPosts, createPost, deletePost, updatePost } from "../../store/posts";
import { Redirect } from "react-router";
import LikeButton from "../postindex/like";
import CommentButton from "../postindex/comment";
import { useHistory } from "react-router";
import { useRef } from "react";
import './style.css';
import moment from 'moment'
import { fetchComment } from "../../store/comments";
import { fetchAllLikes } from "../../store/likes";
import PersonalLinks from "../postindex/links";

const NewsFeed = () => {
  const user = useSelector(state => state.session.user)
  const fileRef = useRef(null);
  const dispatch = useDispatch()
  const [body, setBody] = useState("");
  const [editBody, setEditBody] = useState("");
  const [edit, setEdit] = useState(false)
  const [photoFile, setPhotoFile] = useState(null)
  const [photoUrl, setPhotoUrl] = useState(null)
  const history = useHistory()
  const likes = useSelector((store) => Object.values(store.likes))
  const posts = useSelector((state) =>{
    return Object.values(state.posts).reverse()
  });
  const likedPosts = likes.map((like)=> like.postId)

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
    dispatch(fetchComment())
    dispatch(fetchAllLikes())
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
      <div className="newsFeedLinks">
        <PersonalLinks/>
      </div>
        <div>
        <form className="poster" onSubmit={handleSubmit}>
          <div>
            <input className="textInput" id="body" value={body} onChange={e => setBody(e.target.value)}/>
            <br/>
            <button className="postbutton">What's on your mind, {user.username.charAt(0).toUpperCase() + user?.username.slice(1)}?</button>
            <input type="file" accept=".jpg, .jpeg, .png" multiple
            className="photoUpload" onChange={handleFile}/>
            <br/>
            <br/>
            <br/>
            <br/>
          </div>
        </form>
            {posts.map(post => (
              <div className="headers">
                  <h4 className="posts">
                    <button onClick={profile(post.usersId)} className="newsFeedUserName">
                      {post.user.username.charAt(0).toUpperCase() + post.user?.username.slice(1)}
                    </button>
                    <p className="postTime">
                          <time title={new Date(post.createdAt).toLocaleDateString('en-us',
                              { weekday:"long", year:"numeric", month:"short", day:"numeric"}) }>
                                  {moment(post.createdAt).fromNow()}
                          </time>
                      </p>
                      <button className="editPost" onClick={() => {setEdit(post.id); setEditBody(post.body);}}>
                        <img src="./images/pencil.png" alt="pencil icon"/><p className="spacingEdit">=</p>
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
                    {/* { post.photoUrl ? (
                      <img className="images" ref={fileRef} src={post.photoUrl} alt="photo"/>
                      ) : preview} */}
                    <br/>
                    <br/>
                      <p className="lineBreakerTop"></p>
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
