import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { methodGet } from "./services/api_call";
import { CreatePost } from "./create-post/post";
import { Feed } from "./get-post/feed";
import { LoadingIcon } from "./common-component/loading";
import { storePosts } from "../redux/postReducer";
export const FeedList = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // this is for reload , when post is uploaded
  const { reloadPosts , posts } = useSelector((store) => store.post);

  useEffect(() => {
    fetchFeedList();
  }, [reloadPosts]);

  async function fetchFeedList() {
    setLoading(true);
    const { res, data } = await methodGet("/feeds");

    if (res.ok) {
      dispatch(storePosts(data));

    }
    setLoading(false);
  }

  if (loading) {
    return <LoadingIcon />;
  }
  return (
    <div>
      {!posts.length ? (
        <EmptyFeed />
      ) : (
        <div className="flex flex-col gap-8">
          {posts.map((feed) => {
            return <Feed post={feed} key={feed.id} />;
          })}
        </div>
      )}
    </div>
  );
};

const EmptyFeed = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-2 m-auto w-[100%] flex flex-col justify-center items-center rounded-md px-3 py-5 flex flex-col gap-4">
      <h1 className="text-[50px]">Welcome To App</h1>
      <p className="text-[30px]">Make your first Post</p>
      <button
        onClick={() => setIsOpen(() => true)}
        className="border-2 px-3 py-4 bg-[#f0f0f0]"
      >
        Upload your first post
      </button>

      <CreatePost open={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};
