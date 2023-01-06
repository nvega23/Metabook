import React from 'react';
import PostIndex from '../PostIndexItem';
import PostIndexForm from '../PostIndexItem/postindexform';
import './homepage.css'
// import * as user from '../Navigation/ProfileButton';

function HomePage(){
  // const sessionUser = useSelector(state => state.session.user);
  return (
    <>
      <label>
        <h1 className='headers'> <u>Posts</u></h1>
      </label>
      <PostIndex/>
      {/* <PostIndexForm /> */}
    </>
  )
}

export default HomePage
