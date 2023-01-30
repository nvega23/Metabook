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
              <h4 class="text-uppercase mb-4">Around the Web</h4>
              <a href="https://twitter.com/nvega24">twitter<i class="fab fa-fw fa-twitter"></i></a>
              <br/>
              <a href="https://angel.co/u/nestorvega23">wellfound<i class="fab fa-angellist"></i></a>
              <br/>
              <a href="https://www.linkedin.com/in/nestor-vega-233b43238/">linkedin<i class="fab fa-fw fa-linkedin-in"></i></a>
              <br/>
              <a href="https://github.com/nvega23">Github<i class="fab fa-fw fa-github"></i></a>
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
