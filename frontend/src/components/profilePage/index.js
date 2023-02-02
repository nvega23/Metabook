import React from 'react';
import { useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import PostIndex from '../PostIndexItem';
import "./profilePage.css"
import FriendButton from '../friending/friends';

const ProfilePage = () => {
  const user = useSelector(state => state.session.user)
  let posts = useSelector(state=>state.posts)
  posts = Object.values(posts).reverse()

  if (user){
    return (
      <>
          <div className='header'>
            <div className='profilePicture'>
              <img src='../images/bpfp.png'/>
              <div className='profileName'>
                    {posts[0]?.user.username}
              </div>
            </div>
          <hr/>
          </div>
          <div className='links'>
              <a target="_blank" href="https://twitter.com/nvega24"><img className='twitter' src="../images/twitter1.png" alt='twitter'/></a>
              <a target="_blank" href="https://angel.co/u/nestorvega23"><img className='twitter' src="../images/angellist.png" alt='angel list'/></a>
              <a target="_blank" href="https://www.linkedin.com/in/nestor-vega-233b43238/"><img className='twitter' src="../images/linkedin.png" alt='linkedin'/></a>
              <a target="_blank" href="https://github.com/nvega23"><img className='twitter' src="../images/github.png" alt='github'/></a>
          </div>
              <FriendButton user = {user}/>
          <div className='headers'>
            <PostIndex user = {user}/>
          </div>
      </>
    )
  } else {
    return <Redirect to="/"/>
  }
}

export default ProfilePage
