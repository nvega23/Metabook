import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAllPosts } from "../../store/posts";


const PostIndex = () => {
  const posts = useSelector(state => Object.values(state.posts));
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(fetchAllPosts());
  }, [])

  return(
    <div>
      {posts.map(post => (
        <div key={post.id}>
            <h4>{post.body}</h4>
        </div>
      ))}
    </div>
  )
};

export default PostIndex;
