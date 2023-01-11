import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Redirect } from "react-router-dom";
import * as sessionActions from '../../store/session';
import profilePage from "../profilePage";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
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

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const profile = () => {
    if (!logout){
      return <Redirect to={profilePage} />
    }
  }

  return (
    <>
      <button onClick={openMenu}>
        <i className="fa-solid fa-user-circle" />
        <link/>
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          {/* <link to="profilePage"><profilePage/></link> */}
          {/* <button onClick={<Redirect to="/profilePage"/>}>profile</button> */}
          <button onClick={profile}>{user.username}</button>
          <br/>
          {user.email}
          <br/>
          <button onClick={logout}>Log Out</button>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
