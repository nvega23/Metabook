// import { createComment, fetchComment } from "../../store/comments";
// import { useState } from "react";
// import { useDispatch } from "react-redux";

// const commentButton = ({post}) => {
//     const dispatch = useDispatch()
//     const [commentBody, setCommentBody] = useState("");
//     const [comment, setComment] = useState(false)

//     // const handleCommentPost = (e) => {
//     //   e.preventDefault();
//     //   // const newComment = { ...comment, body: commentBody };
//     //   dispatch(createComment())
//     // }

//     const handleCommentPost = async e => {
//       e.preventDefault()
//       dispatch(fetchComment())
//     }

//     return (
//         <>
//             <button onClick={() => {setComment(prev => !prev); setCommentBody(comment.body);}}>
//             comment
//             </button>

//             { comment && <form>
//             <textarea value={commentBody} onChange={e => setCommentBody(e.target.value)} />
//             <button onClick={(e)=>handleCommentPost(e, post)}>
//                 comment on post
//             </button>
//             </form>}
//         </>
//     )
// };

// export default commentButton;
