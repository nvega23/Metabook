import React from 'react';
import { useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import PostIndex from '../PostIndexItem';
import './profilePage.css'

const ProfilePage = () => {
  const user = useSelector(state => state.session.user)

  if (user){
    return (
      <>
          <div className='bio'>
            <div className='profilePicture'>
              <img src="images/bpfp.png"/>
              <div className='profileName'>
                {user.username}
              </div>
            </div>
          <hr/>
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
