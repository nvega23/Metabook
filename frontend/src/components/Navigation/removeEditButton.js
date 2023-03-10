// import React, { useState, useEffect } from "react";
// import { useDispatch } from 'react-redux';
// import { Redirect } from "react-router-dom";
// import * as sessionActions from '../../store/session';
// import profilePage from "../profilePage";

// function removeEditButton({ user }) {
//   const dispatch = useDispatch();
//   const [showMenu, setShowMenu] = useState(false);

//   const openMenu = () => {
//     if (showMenu) return;
//     setShowMenu(true);
//   };

//   useEffect(() => {
//     if (!showMenu) return;

//     const closeMenu = () => {
//       setShowMenu(false);
//     };

//     document.addEventListener('click', closeMenu);

//     return () => document.removeEventListener("click", closeMenu);
//   }, [showMenu]);

//   const logout = (e) => {
//     e.preventDefault();
//     dispatch(sessionActions.logout());
//   };



//   return (
//     <>
//       <button onClick={openMenu}>
//         <i className="fa-solid fa-user-circle" />
//         <link/>
//       </button>
//       {showMenu && (
//         <ul className="profile-dropdown">
//           {user.username}
//           <br/>
//           {user.email}
//           <br/>
//           <button onClick={logout}>Log Out</button>
//         </ul>
//       )}
//     </>
//   );
// }

// export default removeEditButton;
