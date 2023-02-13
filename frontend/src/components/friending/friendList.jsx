import { useDispatch, useSelector } from "react-redux";
import { fetchusers } from "../../store/user";
import { useEffect } from "react";
import { getUsers } from "../../store/user";
import { useParams } from "react-router-dom";

const FriendList = () => {
    const dispatch = useDispatch()
    let user = useSelector(state => state.session.user)

    useEffect((e) => {
        dispatch(fetchusers())
    }, [dispatch]);

    return (
        <>
            <form>
                <div className='allUsers'>
                    {user?.username}
                </div>
            </form>
        </>
    )
};

export default FriendList;
