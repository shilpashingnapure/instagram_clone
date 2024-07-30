import { Avatar } from "@mui/material";
import { FeedList } from "./FeedList";
import { useSelector } from "react-redux";

export const Home = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="flex">
      {/* feeds list */}
      <div className="flex flex-col gap-8 w-[60%]">
        <FeedList />
      </div>

      {/* suggestion */}
      <div className="flex flex-col gap-8 w-[25%] py-5 px-4 fixed left-[60%]">
        <ProfileIcon
          photo={user?.profilePhoto}
          username={user?.username}
          fullName={user?.fullname}
          text="switch"
          width={50}
          height={50}
          isFullnameShow={true}
        />
        <div className="sugesstion">
          <div className="flex justify-between mb-4">
            <span>Suggestions For You</span>
            <span className="font-bold">See All</span>
          </div>

          <div className="flex flex-col gap-5">
            <ProfileIcon
              username="shilpa17"
              fullName="shilpa shingnapure"
              text="follow"
              width={50}
              height={50}
              isFullnameShow={true}
            />
            <ProfileIcon
              username="shilpa17"
              fullName="shilpa shingnapure"
              text="follow"
              width={50}
              height={50}
              isFullnameShow={true}
            />
            <ProfileIcon
              username="shilpa17"
              fullName="shilpa shingnapure"
              text="follow"
              width={50}
              height={50}
              isFullnameShow={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// compoent for profile image with username and fullname
export const ProfileIcon = ({
  photo,
  username,
  fullName,
  text,
  width,
  height,
  isFullnameShow,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-2 items-center ">
        <Avatar
          alt="Remy Sharp"
          src={photo}
          sx={{ width: width, height: height }}
        >
          {!photo && fullName && fullName[0]}
        </Avatar>
        <div>
          <h4 className="font-bold">{username}</h4>
          {isFullnameShow && (
            <span className="text-[var(--mute-color)]">{fullName}</span>
          )}
        </div>
      </div>
      <span className="capitalize text-blue-500 font-bold">{text}</span>
    </div>
  );
};
