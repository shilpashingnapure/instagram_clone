import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";

export const ShareImage = ({ image, imageFilter, caption, setCaption }) => {
    const { user } = useSelector((store) => store.user);
    return (
      <div className="flex w-[100%] h-[100%]">
        <div className="w-[65%] border-r-2">
          <img
            src={image}
            alt=""
            className="w-[100%] h-[100%] object-cover"
            style={{ filter: imageFilter }}
          />
        </div>
        <div className="flex-1 flex flex-col gap-4 py-3">
          <div className="px-3 flex items-center gap-3">
            <Avatar
              alt="Remy Sharp"
              src={user?.profilePhoto}
              sx={{ width: 30, height: 30 }}
            >
              {!user?.profilePhoto && user?.fullname && user?.fullname[0]}
            </Avatar>
            <h4 className="font-bold">{user?.username}</h4>
          </div>
          <div className="border-b-2 h-[25vh] px-3">
            <textarea
              type="text"
              placeholder="Write a caption..."
              className="w-[100%] h-[100%] "
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            ></textarea>
          </div>
        </div>
      </div>
    );
  };
  