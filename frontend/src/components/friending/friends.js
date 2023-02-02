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
        } else {
            dispatch(createFriend(user.id));
        }
        setFriend(!friend);
    }

    useEffect(() => {
        if (user.requesteeIds.includes(currentUser.id)) {
            setFriend(true)
        }
    }, [])

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
                <button onClick={handleClick}>
                    <img src="../images/addFriend.png"/>
                    <div>Add Friend</div>
                </button>
            </div>
        )
    }
}

export default FriendButton
