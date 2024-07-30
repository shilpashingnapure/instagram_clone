import { Media } from "../get-post/media";
import { PostIcons } from "./post-icons";
import { PostComment } from "../get-post/comment-post";
import moment from "moment";
import { Comment } from "./comment";
import { CustomModal } from "./customModal";
import { UserAvtar } from "./avatar";

// using in both feeds and user profile page
export const PostDetailsModal = ({ open, onClose, post }) => {
  const timeAgo = moment.utc(post?.created_at).local().fromNow();

  if (!open) return null;
  return (
    <div>
      <CustomModal open={open} onClose={onClose}>
        <div className="flex w-[850px] h-[70vh]">
          {/* post image */}
          <div className="flex-1">
            <Media medias={post?.media} />
          </div>

          {/* post details */}
          <div className="flex-1 flex flex-col">
            {/* caption */}
            <div className="px-4 py-3">
              <div className="flex gap-3 items-center">
                <UserAvtar
                  photo={post?.user?.profilePhoto}
                  fullname={post?.user?.fullname}
                />
                <div>
                  <span className="font-bold pr-2">{post?.user?.username}</span>
                  <span>{post?.caption}</span>
                </div>
              </div>
            </div>

            {/* show all comments */}
            <div className="flex-1 flex flex-col gap-5 px-4 py-4 border-t-[1px] overflow-y-auto">
              {post?.comments.map((comment) => {
                return (
                  <div key={comment?.id}>
                    <Comment
                      comment={comment}
                      commentUser={comment?.user}
                      showAvtar={true}
                      showTime={true}
                    />
                  </div>
                );
              })}
            </div>
            {/* show icons */}
            <PostIcons post={post} />
            <span className="px-3 mt-[-5px] text-[10px] text-[var(--mute-color)]">
              {timeAgo}
            </span>
            {/* add comment */}
            <PostComment postId={post?.id} />
          </div>
        </div>
      </CustomModal>
    </div>
  );
};
