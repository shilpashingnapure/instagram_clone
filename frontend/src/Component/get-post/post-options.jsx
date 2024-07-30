import { Menu, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { methodDelete } from "../services/api_call";
import { updateStatusforReload } from "../../redux/postReducer";

export const UserPostOptions = ({ postId }) => {
  const dispatch = useDispatch();
  async function handleRemovePost() {
    const { res } = await methodDelete(`/post/${postId}`);
    if (res.ok) {
      dispatch(updateStatusforReload());
    }
  }
  return (
    <>
      <MenuItem onClick={handleRemovePost}>Delete</MenuItem>;
    </>
  );
};

export const OtherPostOptions = ({ user_id, username }) => {
  return (
    <>
      <MenuItem>
        <Link to={`/${username}`}>View Profile </Link>
      </MenuItem>
      {/* <MenuItem>Follow</MenuItem> */}
    </>
  );
};

export const Options = ({ userId, anchorEl, onClose, username, postId }) => {
  const { user } = useSelector((store) => store.user);
  const open = Boolean(anchorEl);
  const isUserPost = userId === user.id;

  return (
    <Menu
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      sx={{ fontSize: "5px" }}
    >
      {isUserPost ? (
        <UserPostOptions postId={postId} />
      ) : (
        <OtherPostOptions username={username} user_id={userId} />
      )}
    </Menu>
  );
};
