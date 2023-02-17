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
            dispatch(createLike(postId))
        }
    }

    return (
        <>
            <form>
                {!isLiked ?
                        <button className="likes" onClick={(e)=>handleLike(e, post.id)}>
                            <img src="../images/like.png" alt="Like"/>
                            <div className="like">Like</div>
                        </button>
                    :
                    <button className="likes" onClick={(e)=>handleLike(e, post.id)}>
                            <img src="../images/bl3.png" alt="unlike"/>
                            <div className="unlike">Like</div>
                    </button>
                }
            </form>
        </>
    )
}

export default LikeButton;
