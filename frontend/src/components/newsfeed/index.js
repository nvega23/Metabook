import { useDispatch, useSelector } from "react-redux";
import { fetchAllPosts, getPosts } from "../../store/posts";
import { useEffect } from "react";
// import PostIndex from "../PostIndexItem";
import LikeButton from "../postindex/like";
import "./style.css"

const NewsFeed = () => {
    const dispatch = useDispatch()
    // const posts = useSelector(getPosts)
    const user = useSelector(state => state.session.user)
    // const userId = user ? user.id : null
    const allPosts = useSelector(getPosts)

    // const postIndexItems = allPosts.map((post, idx) =>
    // <PostIndex key={idx} post={post}
    // user={user} pkey={idx}
    // className="posts"/>).reverse();
    // const posts = useSelector((state) =>{
    //     if (user){
    //       return Object.values(state.posts).reverse()
    //     }
    // });

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(fetchAllPosts())
    }

    useEffect(()=>{
        dispatch(fetchAllPosts());
    }, [dispatch])

    return (
        <>
            <h1>hi im the newsFeed</h1>
            <form className="postsform" onSubmit={handleSubmit}>
                {allPosts.map(post => (
                    <>
                        <h2 className="newsfeed" >
                            <div className="username">
                                {user.username}
                                <LikeButton/>
                            </div>
                            {post.body}
                        </h2>
                    </>
                ))}
            </form>
        </>
    )
};

export default NewsFeed;
