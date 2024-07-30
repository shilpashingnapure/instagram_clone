import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storeUserDetail } from "../redux/userReducer";
import { Link } from "react-router-dom";
import { CreatePost } from "./create-post/post";
import { methodGetById } from "./services/api_call";
import { SearchInput } from "./search";
import { UserAvtar } from "./common-component/avatar";

export const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { reloadPosts  } = useSelector((store) => store.post);

  const [isUploadDialogOpen, setUploadDialogOpen] = useState(false);

  useEffect(() => {
    // To get login user details
    async function getProfileDetails() {
      const { res, data } = await methodGetById("/profile");
      if (res.ok) {
        dispatch(storeUserDetail(data));
      }
    }
    getProfileDetails();
  }, [reloadPosts]);

  // to show pop for create post
  function handleCreatePostDialog() {
    setUploadDialogOpen(() => true);
  }
  return (
    <nav className="flex items-center justify-center px-5 border-2  fixed top-0 z-40 w-[100%] h-[60px] m-auto bg-[#fff]">
      <div className="flex items-center justify-between w-[70%]">
        <div className="w-[15%]">
          <Link to="/">
            <img src="/logo.png" alt="" width="100%" />
          </Link>
        </div>
        <div className="search-input border-2">
          <SearchInput />
        </div>
        <div>
          <ul className="flex gap-5 items-center nav-item">
            <li>
              <Link to="/">
                <img src="./home.PNG" className="icons" alt="" />
              </Link>
            </li>

            <li onClick={handleCreatePostDialog}>
              <img src="./add.PNG" className="icons" alt="" />
            </li>
            <li>
              <img src="./explore.PNG" className="icons" alt="" />
            </li>
            <li>
              <img src="./like.PNG" className="icons" alt="" />
            </li>
            <li>
              <Link to={`/${user?.username}`}>
                <UserAvtar
                  photo={user?.profilePhoto}
                  fullname={user?.fullname}
                  width={35}
                  height={35}
                />
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* dialog to render create post dialog */}
      {isUploadDialogOpen && (
        <CreatePost
          open={isUploadDialogOpen}
          onClose={() => setUploadDialogOpen(false)}
        />
      )}
    </nav>
  );
};


