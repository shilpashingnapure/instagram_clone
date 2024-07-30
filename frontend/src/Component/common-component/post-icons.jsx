import { useCallback } from "react";
import { debounce } from "../services/debounce";
import { methodPost } from "../services/api_call";
import { HeartIcon } from "./heart-icon";
import { useDispatch } from "react-redux";
import { handleLikePost } from "../../redux/postReducer";

// used in both feeds and profile
// icons for post (like , comment , share )
export const PostIcons = ({ post }) => {
  const dispatch = useDispatch();
  // debocing for like
  const debouncedLikePost = useCallback(
    debounce(async (postId) => {
      try {
        await methodPost("/like", { postId });
      } catch (err) {
        console.error(err);
        // if api call fails;
        dispatch(handleLikePost({ postId: post?.id }));
      }
    }, 400),
    []
  );

  // if post is like or not (toggle)
  async function likePost() {
    dispatch(handleLikePost({ postId: post?.id }));
    debouncedLikePost(post?.id);
  }

  return (
    <div className="">
      <div className="p-3 border-t-2 flex justify-between items-center h-[6vh]">
        <ul className="flex gap-2 items-center ml-[-5px]">
          <li className="cursor-pointer" onClick={likePost}>
            {post?.isLikedByUser ? (
              <HeartIcon fillColor="red" stroke="none" />
            ) : (
              <HeartIcon fillColor="none" stroke="black" />
            )}
          </li>
          <li>
            <img src="./comment.PNG" className="icons" alt="" />
          </li>
          <li>
            <img src="./send.PNG" className="w-[30px] h-[30px] " alt="" />
          </li>
        </ul>
        <img src="./save.PNG" className="icons" alt="" />
      </div>
      {post?.totalLikes !== 0 && (
        <div className="px-3 mb-1 font-semibold">
          {post?.totalLikes > 0 && post?.totalLikes} likes
        </div>
      )}
    </div>
  );
};
