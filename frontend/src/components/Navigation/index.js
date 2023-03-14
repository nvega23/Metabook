import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { Redirect } from 'react-router-dom';
import './Navigation.css';
import SearchBar from '../search/searchBar';

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
          <div>
            <SearchBar/>
          </div>
          {sessionLinks}
      </div>
    </>
  );
}

export default Navigation;
