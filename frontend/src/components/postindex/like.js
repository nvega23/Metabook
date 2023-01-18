import { useDispatch, useSelector } from "react-redux";
import { deleteLike, createLike } from "../../store/likes";
import "./likes.css"

const LikeButton = ({post, isLiked, likes}) => {
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()

    const handleLike = (e, postId) => {
        e.preventDefault()
        if (isLiked){
            const likeId = likes.find(ele => ele.postId === postId).id
            dispatch(deleteLike(postId, likeId))
        } else {
            dispatch(createLike(postId, user.id))
        }
    }

    return (
        <>
            <form>
                <button className="likes" onClick={(e)=>handleLike(e, post.id)}>
                {!isLiked ?
                    <img src="./images/like.png" alt="Like"/>
                    :
                    <img src="./images/bl3.png" alt="unlike"/>
                }
                </button>
            </form>
        </>
    )
}

export default LikeButton;
