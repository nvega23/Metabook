import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllPosts, createPost, deletePost, updatePost, createLike, deleteLike, getPosts } from "../../store/posts";
import './posts.css'
import { Redirect } from "react-router";
import { fetchComment } from "../../store/comments";

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

  const [commentBody, setCommentBody] = useState("");
  const [comment, setComment] = useState(false)

  // const handleCommentSubmit = (e) => {
  //     e.preventDefault()
  //     dispatch(fetchComment(comment.id))
  // }

  const handleCommentPost = (e, post) => {
    e.preventDefault();
    const newPost = { ...post, body: commentBody };
    dispatch(updatePost(newPost));
    setEdit(false);
  }

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

  const [like, setLike] = useState(false)

  const handleLike = (e, postId) => {
    e.preventDefault()
    if (!like){
      dispatch(createLike(postId))
      setLike(true)
    } else {
      dispatch(deleteLike(postId))
      setLike(false)
    }
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
        </form>
          <br/>
            {posts.map(post => (
              <>
                  <h4 className="posts">
                    {user.username}
                    <br/>
                    <br/>
                    {post.body}
                    <form className="likes">
                      <button value={post.id} onClick={handleLike}>
                        {!like ?
                          // <video src="./images/likegif.mp4" ></video>
                          <img src="./images/like.png" alt="trash icon"/>
                          :
                          <img src="./images/thumb-down.png" alt="trash icon"/>
                        }
                        {user.username}
                      </button>
                    </form>
                  </h4>
                  <button className="remove" onClick={(e)=>handleDeletePost(e, post.id)}>
                    <img src="./images/trashpic.png" alt="trash icon"/>
                       Move to trash
                  </button>
                  <button onClick={() => {setEdit(prev => !prev); setEditBody(post.body);}}>
                    Edit Post
                  </button>
                  { edit && <form>
                    <textarea value={editBody} onChange={e => setEditBody(e.target.value)} />
                    <button onClick={(e)=>handleEditPost(e, post)}>
                      Update Post
                    </button>
                  </form>}

                  <button onClick={() => {setComment(prev => !prev); setCommentBody(post.body);}}>
                    comment
                  </button>
                  { comment && <form>
                    <textarea value={commentBody} onChange={e => setCommentBody(e.target.value)} />
                    <button onClick={(e)=>handleCommentPost(e, post)}>
                      comment on post
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
