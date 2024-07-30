import { Delete } from "@mui/icons-material";
import { UserAvtar } from "./avatar";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { methodDelete } from "../services/api_call";
import { removeCommentToPost } from "../../redux/postReducer";

// this compoent is used in feed for all post and pop post details where we show all comments
export const Comment = ({ showTime  , showAvtar, commentUser , comment }) => {
  const timeAgo = formatShortRelativeTime(comment?.created_at);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  async function handleCommentRemove(){
    const { res } = await methodDelete(`/comment/${comment?.id}`);
    if(res.ok){
      dispatch(removeCommentToPost({ postId : comment?.post_id , commentId : comment?.id}))
    }
  }
  return (
    <div className="flex gap-3 w-full items-center">
      {showAvtar && (
        <UserAvtar photo={commentUser?.profilePhoto} fullname={commentUser?.fullname} />
      )}
      <div className="flex flex-col">
        <div>
          <span className="font-bold pr-2">{commentUser?.username}</span>
          <span>{comment?.comment}</span>
        </div>
        { showTime && <span className="mt-[-1px] text-[11px] text-[var(--mute-color)]">{timeAgo}</span>}
        
      </div>
      { commentUser?.id === user?.id &&  <div className="flex-1 flex justify-end">
        <Delete sx={{ fontSize : '18px' , color : 'gray' , cursor : "pointer"}} onClick={handleCommentRemove}/>
      </div>}
    </div>
  );
};


const formatShortRelativeTime = (time) => {
  const fromNow = moment.utc(time).local().fromNow(true);
  return fromNow.length <= 3 ? fromNow : fromNow.slice(0, 3).split(' ').join('');
};