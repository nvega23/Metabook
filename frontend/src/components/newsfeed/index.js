import { useDispatch, useSelector } from "react-redux";
import { fetchAllPosts, getPosts } from "../../store/posts";
import { useEffect } from "react";
import PostIndex from "../PostIndexItem";

const NewsFeed = () => {
    const dispatch = useDispatch()
    const posts = useSelector(getPosts)

    // const handleSubmit = (e) => {
    //     e.preventDefault()
    // }

    useEffect(()=>{
        dispatch(fetchAllPosts());
    }, [dispatch])

    return (
        <>
            <h1>hi im the newsFeed</h1>
            <form>
            {/* {posts.map(post => (
                {post.body}
            ))} */}
            </form>
        </>
    )
};

export default NewsFeed;
