import { useDispatch, useSelector } from "react-redux";
import { deleteLike, createLike } from "../../store/likes";
import { useState, useEffect } from "react";
import { fetchAllLikes } from "../../store/likes";

const LikeButton = ({post, isLiked, likes}) => {
    console.log(isLiked)
    const user = useSelector(state => state.session.user)
    // const likes = useSelector((store) => Object.values(store.likes))
    const dispatch = useDispatch()

    // const [like, setLike] = useState(isLiked)

    const handleLike = (e, postId) => {
        e.preventDefault()
        if (isLiked){
            const likeId = likes.find(ele => ele.post_id === postId).id
            dispatch(deleteLike(postId, likeId))
            // setLike(true)
        } else {
            dispatch(createLike(postId, user.id))
            // setLike(false)
        }
    }

    // useEffect(()=>{
    //     dispatch(fetchAllLikes());
    // }, [dispatch, isLiked])

    return (
        <>
            <form className="likes">
                <button onClick={(e)=>handleLike(e, post.id)}>
                {!isLiked ?
                    <img src="./images/like.png" alt="Like"/>
                    :
                    <img src="./images/unlike.png" alt="unlike"/>
                }
                </button>
            </form>
        </>
    )
}

export default LikeButton;
