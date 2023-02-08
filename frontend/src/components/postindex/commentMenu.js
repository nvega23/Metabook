import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import CommentButton from "./comment";
import "./comment.css"
import { useSelector } from "react-redux";

const CommentMenu = ({post}) => {
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    let posts = useSelector(state=>state.posts)
    posts = Object.values(posts).reverse()
    const comments = useSelector((state) =>{
        if (user){
          return Object.values(state.comments).filter((comment)=>comment.postId === post.id)
        }
    });
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
    if (!showMenu) return;
    const closeMenu = () => {
        setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    return (
        <>
            {/* <button className="dropDown" onClick={openMenu}>...</button> */}
            <button className="dropDown" onClick={openMenu}>
                ...
                <i className="fa-solid fa-user-circle" />
            </button>
            {showMenu && (
                <ul className="profile-dropdown">
                    <>
                        {/* <CommentButton/> */}
                        {/* <button className="dropdown" onClick={profile}>{posts[0].user.username}</button> */}
                    </>
                    {/* <button className="dropdown" onClick={logout}>Log Out</button> */}
                </ul>
            )}
        </>
    )
}

export default CommentMenu;
