import { useState } from "react";
import { PostDetailsModal } from "../common-component/postDetails_Modal";

export const UserPosts = ({ posts }) => {
  if (posts?.length === 0) {
    return (
      <div className="text-center mt-[10%] text-[var(--mute-color)]">
        <h2 className="text-[20px]">No Post</h2>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-3 gap-5 ">
      {posts?.map((post) => {
        return <div key={post?.id}>
        <UserPost post={post} />
        </div>
      })}
    </div>
  );
};

const UserPost = ({ post }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="h-[45vh] cursor-pointer border-2" >
      <img
        src={post?.media[0]?.url}
        className=" w-[100%] h-[100%] object-cover"
        alt=""
        onClick={() => setOpen(true)}
      />

      <PostDetailsModal
        open={open}
        onClose={() => setOpen(false)}
        post={post}
      />
    </div>
  );
};
