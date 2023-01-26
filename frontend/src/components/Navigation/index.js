import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { Redirect } from 'react-router-dom';
import './Navigation.css';

function Navigation(){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  }
  if (!sessionUser) return <Redirect to="/" />

  return (
    <>
      <div className='link'>
          <h1 className='title'>
            <NavLink to={"/newsFeed"}>Metabook</NavLink>
          </h1>
          {sessionLinks}
      </div>
    </>
  );
}

export default Navigation;
// navlink to show only when logged in, return no html if not logged in
// redirect to (post) page when logged in
// demo user
