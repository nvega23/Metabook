import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { getUsers } from "../../store/user";
import { useState, useEffect } from "react";
import { fetchUser } from "../../store/user";

const SearchBar = () => {
    // const users = useSelector(state=>state.session.user)
    // let {userId} = useParams();
    // let user = useSelector(getUsers());
    // const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(fetchUser(userId))
    // }, [dispatch]);
    // grab users
    // make a border where its height is altered by how many users are in it
    return (
        <>
            <div>
                <ul>
                    <li>
                        {/* {user?.id} */}
                        <input placeholder="search"/>
                        {/* {users.map(user => {
                            <>
                               {user?.username}
                            </>
                        })} */}
                    </li>
                </ul>
            </div>
        </>
    )
}

export default SearchBar
