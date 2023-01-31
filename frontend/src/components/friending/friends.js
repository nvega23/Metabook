import {useDispatch, useSelector} from "react-redux"
import { createFriend, deleteFriend } from "../../store/friends";
import { useState } from "react";
import { useEffect } from "react";

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
            <div>
                <button onClick={handleClick}>
                    <div>Friending</div>
                </button>
            </div>
        )
    } else {
        return (
            <div>
                <button onClick={handleClick}>
                    <div>Friend</div>
                </button>
            </div>
        )
    }
}

export default FriendButton
