import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import PostIndex from '../PostIndexItem';
import { useParams } from 'react-router-dom';
import { getUser } from '../../store/user';
import { useEffect } from 'react';
import "./profilePage.css"
import FriendButton from '../friending/friends';
import { fetchUser } from '../../store/user';
import { fetchFriend, fetchFriends } from '../../store/friends';

const ProfilePage = () => {
  const dispatch = useDispatch()
  let {userId} = useParams();
  let user = useSelector(getUser(userId));
  const currentUser = useSelector(state => state.session.user)
  let posts = useSelector(state=>state.posts)
  posts = Object.values(posts).reverse()

  useEffect(() => {
    dispatch(fetchUser(userId))
    dispatch(fetchFriends(userId))
  }, [dispatch]);

  if (currentUser){
    return (
      <>
          <div className='header'>
            <div className='profilePicture'>
              <img src='../images/bpfp.png'/>
              <div className='profileName'>
                    {user?.username.charAt(0).toUpperCase() + user?.username.slice(1)}
              </div>
            </div>
          <hr className='hrprofilePage'/>
          </div>
          <div className='links'>
              <a target="_blank" href="https://twitter.com/nvega24"><img className='twitter' src="../images/twitter1.png" alt='twitter'/></a>
              <a target="_blank" href="https://angel.co/u/nestorvega23"><img className='twitter' src="../images/angellist.png" alt='angel list'/></a>
              <a target="_blank" href="https://www.linkedin.com/in/nestor-vega-233b43238/"><img className='twitter' src="../images/linkedin.png" alt='linkedin'/></a>
              <a target="_blank" href="https://github.com/nvega23"><img className='twitter' src="../images/github.png" alt='github'/></a>
              {currentUser.id !== user.id ? <FriendButton className='twitter' user={user} /> : <></>}
          </div>
          <div className='headers'>
            <div className='aboutMe'>
              <p className='aboutMeTitle'>
                <b>
                  Bio:
                </b>
              <div className='aboutMeText'>
                Hi, i'm {user?.username.charAt(0).toUpperCase() + user?.username.slice(1)} nice to meet you.
              </div>
              </p>
            </div>
            {/* <div className='aboutMeText'>
              <p className='aboutMe'>
                <>
                  my friends
                  {user && user.requesteeIds.map(friend=>{
                    <>
                      friend.username
                    </>
                  })}
                </>
              </p>
            </div> */}
            <PostIndex user = {user}/>
          </div>
      </>
    )
  } else {
    return <Redirect to="/"/>
  }
}

export default ProfilePage
