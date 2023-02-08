import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const sessionUserId = useSelector(state=>state.session.user.id)
  const dispatch = useDispatch();
  const history = useHistory()
  const [showMenu, setShowMenu] = useState(false);
  const posts = useSelector((state) =>{
    if (user){
      return Object.values(state.posts).filter((post)=>post.usersId === user.id).reverse()
    }
  });
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

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const profile = (e) => {
    e.preventDefault()
    history.push(`/profilePage/${sessionUserId}`)
  }

  return (
    <>
      <button className="pfp" onClick={openMenu}>
        <img src="../images/maleicon.png"/>
        <i className="fa-solid fa-user-circle" />
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <div className="borderDropdown">
              <>
                <button className="dropdown" onClick={profile}>{posts[0].user.username}</button>
              </>
              <button className="dropdown" onClick={logout}>Log Out</button>
          </div>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
