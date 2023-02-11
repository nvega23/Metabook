import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllPosts, createPost, deletePost, updatePost } from "../../store/posts";
import { fetchPosts } from "../../store/posts";
import { useParams } from "react-router";
import './posts.css'
import { Redirect } from "react-router";
import LikeButton from "../postindex/like";
import CommentButton from "../postindex/comment";
import { useRef } from "react";
import { fetchComments } from "../../store/comments";

const PostIndex = () => {
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch()
  const [body, setBody] = useState("");
  const [editBody, setEditBody] = useState("");
  const [edit, setEdit] = useState(false)
  const [photoFile, setPhotoFile] = useState(null)
  const [photoUrl, setPhotoUrl] = useState(null)
  const fileRef = useRef(null);
  const likes = useSelector((store) => Object.values(store.likes))
  const likedPosts = likes.map((ele)=> ele.postId)
  const {userId} = useParams()
  let posts = useSelector(state=>state.posts)
  posts = Object.values(posts).reverse()

  useEffect(() => {
    dispatch(fetchPosts(userId))
    dispatch(fetchComments())
  }, [dispatch]);

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth"
    })
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
        <form onSubmit={handleSubmit}>
            <br/>
            <br/>
          <div >
            <input className="profilePageInput" id="body" value={body} onChange={e => setBody(e.target.value)}/>
            <br/>
            <br/>
            <button className="postbutton">What's on your mind, {user.username.charAt(0).toUpperCase() + user?.username.slice(1)}?</button>
              <input className="postImage" type="file" accept=".jpg, .jpeg, .png .gif"
              multiple onChange={handleFile}/>
          </div>
        </form>
          <br/>
            {posts.map(post => (
              <>
                  <h4 className="posts">
                    <button className="profilePageUsername">{post?.user?.username}
                    </button>
                    <br/>
                      <button className="editButton" onClick={() => {setEdit(post.id); setEditBody(post.body);}}>
                        <img src="../images/pencil.png" alt="pencil icon"/>
                      </button>
                      <br/>
                      <button className="removeEdit" onClick={(e)=>handleDeletePost(e, post.id)}>
                        <img src="../images/trashpic.png" alt="trash icon"/>
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
                    {/* { post.photoUrl ? (
                      <img className="images" ref={fileRef} src={post.photoUrl} alt="photo"/>
                      ) : preview} */}
                    <br/>
                    <br/>
                      <p className="PostIndexProfilelineBreaker"></p>
                        <LikeButton post = {post} isLiked = {likedPosts.includes(post.id)} likes = {likes}/>
                        <CommentButton className={"commentButton"} post = {post} body = {post.body}/>
                      <p className="PostIndexProfilelineBreakerTop"></p>
                      <br/>
                  </h4>
              </>
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

export default PostIndex;
