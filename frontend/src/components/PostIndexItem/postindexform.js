// import { useSelector, useDispatch } from "react-redux";
// import { useEffect } from "react";
// import { fetchAllPosts } from "../../store/posts";
// import './posts.css'
// import { Redirect } from "react-router";

// const PostIndex = () => {
//   const user = useSelector(state => state.session.user)
//   const dispatch = useDispatch()
//   const posts = useSelector((state) =>{
//     if (user){
//       return Object.values(state.posts).filter((post)=>post.id === user.id)
//     }
//   });

//   useEffect(()=>{
//     dispatch(fetchAllPosts());
//   }, [])

//   console.log(user)
//   if (user){
//     console.log(user)
//     return(
//       <div className="posts">
//         {posts.map(post => (
//           <div>
//               <h3>{user.username}</h3>
//               <h3>user id:{user.id}</h3>
//               <h4>post id:{post.id}</h4>
//               <h4>{post.body}</h4>
//           </div>
//         ))}
//       </div>
//     )
//   } else {
//     return <Redirect to="/"/>
//   }
// };

// export default PostIndex;
