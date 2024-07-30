import { useState } from "react";
import { Comments } from "./comments";
import { Media } from "./media";
import { PostComment } from "./comment-post";
import { ProfileIcon } from "../home";
import { Options } from "./post-options";
import moment from "moment";
import { PostDetailsModal } from "../common-component/postDetails_Modal";
import { PostIcons } from "../common-component/post-icons";

export const Feed = ({ post }) => {

  const [showAllComment, setShowAllComments] = useState(false);
  // calculate the time ago from the current time
  const timeAgo = moment.utc(post?.created_at).local().fromNow();

  const [isOptionOpen, setOptionOpen] = useState(null);



  return (
    <div className="border-2">
      <div className="post w-[100%] flex flex-col">
        {/* username section */}
        <div className="border-b-2 flex justify-between items-center px-4 py-3 h-[8vh]">
          <div className="flex items-center gap-3">
            <ProfileIcon
              username={post?.user?.username}
              photo={post?.user?.profilePhoto}
              fullName={post?.user?.fullname}
              isFullnameShow={false}
            />
          </div>
          <div>
            <img
              src="./option.PNG"
              className="icons cursor-pointer"
              alt=""
              onClick={(e) => setOptionOpen(e.currentTarget)}
            />
            <Options
              userId={post?.user_id}
              anchorEl={isOptionOpen}
              onClose={() => setOptionOpen(null)}
              username={post?.user?.username}
              postId={post?.id}
            />
          </div>
        </div>

        {/* post */}
        <div className="h-[70vh]">
          <Media medias={post?.media} />
        </div>

        {/* icons  */}
        <PostIcons post={post}/>

        {/* caption */}
        <div className="px-3 mb-1 flex gap-2">
          <span className="font-bold">{post?.user?.username}</span>
          <p>{post?.caption}</p>
        </div>

        {/* comment */}
        <Comments
          postId={post?.id}
          comments={post?.comments}
          setShowAllComments={() => setShowAllComments(true)}
        />

        <span className="px-3 pt-3 text-xs text-[var(--mute-color)]">
          {timeAgo}
        </span>

        {/* add Comment  */}
        <PostComment postId={post?.id} />
      </div>

      {/*show the all comment in popup , with all post details  */}
      <PostDetailsModal
        open={showAllComment}
        post={post}
        onClose={() => setShowAllComments(false)}
      />
    </div>
  );
};

