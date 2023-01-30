import React from 'react';
import { useSelector } from "react-redux";
import { NavLink, Redirect } from 'react-router-dom';
import PostIndex from '../PostIndexItem';
import './profilePage.css'

const ProfilePage = () => {
  const user = useSelector(state => state.session.user)

  if (user){
    return (
      <>
          <div className='header'>
            <div className='profilePicture'>
              <img src="images/bpfp.png"/>
              <div className='profileName'>
                {user.username}
              </div>
            </div>
          <hr/>
          </div>
          <div className='links'>
              <h4 class="contacts">Get in touch</h4>
              <a href="https://twitter.com/nvega24"><img className='twitter' src="./images/twitter1.png"/></a>
              <a href="https://angel.co/u/nestorvega23"><img className='twitter' src="./images/angellist.png"/></a>
              <a href="https://www.linkedin.com/in/nestor-vega-233b43238/"><img className='twitter' src="./images/linkedin.png"/></a>
              <a href="https://github.com/nvega23"><img className='twitter' src="./images/github.png"/></a>
          </div>
          <div className='headers'>
            <PostIndex/>
          </div>
      </>
    )
  } else {
    return <Redirect to="/"/>
  }
}

export default ProfilePage
