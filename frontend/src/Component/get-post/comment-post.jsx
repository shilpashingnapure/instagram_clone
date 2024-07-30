import { useState } from "react";
import { methodPost } from "../services/api_call";
import { useDispatch } from "react-redux";
import { addCommentToPost } from "../../redux/postReducer";

export const PostComment = ({ postId }) => {
    const [ comment , setComment ] = useState('');
    const dispatch = useDispatch();

    async function handleComment(){ 

        const { res , data } = await methodPost('/comment' , { postId , comment}) 
       if(res.ok){
        dispatch(addCommentToPost( { postId , newComment : data } ));
         setComment('');
       }
  
    }
    return (
      <div className="px-3 py-2 mt-2 flex justify-between gap-5 border-t-2">
        <div className="flex-1 flex items-center gap-3 ">
          <img src="./smile.PNG" className="w-5 h-5" alt=""/>
          {/* add profile photo instead of smile */}
          <input type="text" placeholder="Add a Comment.." value={comment} className="flex-1" onChange={ (e) => setComment(e.target.value)}/>
        </div>
  
        <button onClick={handleComment}  className={`${comment ?  'bg-blue-500 text-[#fff]'  : 'bg-gray-300' } px-5 py-2 rounded`} disabled={!comment}>Post</button>
      </div>
    );
  };
  