import {useDispatch, useSelector} from "react-redux"
import { createFriend, deleteFriend } from "../../store/friends";
import { useState } from "react";
import { useEffect } from "react";
import "./friends.css"

const FriendButton = ({user}) => {
    const currentUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const [friend, setFriend] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        if (friend) {
            dispatch(deleteFriend(user.id));
            setFriend(false)
        } else {
            dispatch(createFriend(user.id));
            setFriend(true)
        }
    }

    useEffect(() => {
        if (user.requesteeIds.includes(currentUser.id)) {
            setFriend(true)
        }
    }, [dispatch, currentUser.id, user.requesteeIds])


    // return (
    //     <>
    //         <form>
    //             <button className="friendButton" onClick={handleClick}>
    //                 {friend ?
    //                     <img src="../images/friend.png"/>
    //                         :
    //                     <img src="../images/addFriend.png"/>
    //                 }
    //             </button>
    //         </form>
    //     </>
    // )
    if (friend) {
        return (
            <div className="friends">
                <button className="friendButton" onClick={handleClick}>
                    <img src="../images/friend.png"/>
                    <div>Friends</div>
                </button>
            </div>
        )
    } else {
        return (
            <div>
                <button className="unfriendButton" onClick={handleClick}>
                    <img src="../images/addFriend.png"/>
                    <div>Add Friend</div>
                </button>
            </div>
        )
    }
}

export default FriendButton
