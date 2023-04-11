import {useDispatch, useSelector} from "react-redux"
import { createFriend, deleteFriend, fetchFriend } from "../../store/friends";
import { useParams } from "react-router-dom";
import { getUser } from "../../store/user";
import { useState } from "react";
import { useEffect } from "react";
import "./friends.css"

const FriendButton = ({user}) => {
    // let {userId} = useParams();
    // let user = useSelector(getUser(userId));
    const currentUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const [friend, setFriend] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        if (friend) {
            if (window.confirm(`are you sure you want to remove ${user?.username.charAt(0).toUpperCase() + user?.username.slice(1)} as a friend?`)){
                dispatch(deleteFriend(user.id));
              }
        } else {
            if (window.confirm(`are you sure you want to add ${user?.username.charAt(0).toUpperCase() + user?.username.slice(1)} as a friend?`)){
                dispatch(createFriend(user.id));
                setTimeout(function(){
                    alert(`Congratulations you and ${user?.username.charAt(0).toUpperCase() + user?.username.slice(1)} are now friends!`);
               },1000);
            }
        }
        setFriend(!friend)
    }

    useEffect(() => {
        if (user?.requesterIds.includes(currentUser.id)) {
            setFriend(true)
        }
    }, [dispatch, user])

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
            <div className="friends">
                <button className="unfriendButton" onClick={handleClick}>
                    <img src="../images/addFriend.png"/>
                    <div>Add Friend</div>
                </button>
            </div>
        )
    }
}

export default FriendButton
