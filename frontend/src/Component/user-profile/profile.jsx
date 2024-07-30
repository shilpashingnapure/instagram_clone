import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { methodGetById } from "../services/api_call";
import { UserAvtar } from "../common-component/avatar";
import { LogOut } from "../auth-components/logout";
import { UserPosts } from "./user-post";
import { LoadingIcon } from "../common-component/loading";

export const Profile = () => {
  const { username } = useParams();
  const { user, post } = useSelector((store) => store.user);
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    //fetch profile of search user
    async function getUserDetials() {
      setLoading(true);
      const { res, data } = await methodGetById(`/user/${username}`);
      if (res.ok) {
        setDetails(() => data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    }

    if(user?.username !== username){
      getUserDetials();
    }else{
      setDetails(user);
    }
      
    
  }, [username, user, post]);

  const [currentTab, setCurrentTab] = useState("0");

  if (loading) {
    return <LoadingIcon />;
  }

  return (
    <div>
      <div className="flex gap-[8%] mb-[8%] ml-[10%] items-center">
        {/* profile pic */}
        <UserAvtar
          photo={details?.profilePhoto}
          fullname={details?.fullname}
          width={130}
          height={130}
          size={60}
        />
        {/*  profile setting */}

        <div className="flex flex-col gap-5">
          <div className="flex gap-2 items-center font-[600]">
            <span className="text-[18px]">{details?.username}</span>
            {user?.username !== username ? (
              <button className="px-4 py-1 bg-gray-100 rounded-md ml-3">
                Follow
              </button>
            ) : (
              <div className="flex gap-3">
                <Link to="/edit">
                  <button className="px-4 py-1 bg-gray-100 rounded-md ml-3">
                    Edit profile
                  </button>
                </Link>
                <LogOut />
              </div>
            )}
          </div>
          {/* profile followers */}
          <div className="flex gap-5 items-center">
            <div className="flex gap-1 items-center font-medium">
              <span>{details?.posts.length}</span>
              <span>posts</span>
            </div>
            <div className="flex gap-1 items-center font-medium">
              <span>25</span>
              <span>follewers</span>
            </div>
            <div className="flex gap-1 items-center font-medium">
              <span>2</span>
              <span>following</span>
            </div>
          </div>
          {/* user full name */}
          <div>
            <h3 className="font-semibold">{details?.fullname}</h3>
          </div>
        </div>
      </div>

      {/* user contents */}
      <div>
        <TabContext value={currentTab}>
          <Box sx={{ borderTop: 1, borderColor: "divider" }}>
            <TabList
              aria-label="lab API tabs example"
              className="custom-tabs"
              centered
              onChange={(e, newValue) => setCurrentTab(newValue)}
            >
              <Tab label="posts" value={"0"} className="custom-tab" />
              <Tab label="reels" value={"1"} className="custom-tab" />
              <Tab label="saved" value={"2"} className="custom-tab" />
            </TabList>
          </Box>
          <TabPanel value={"0"}>
            <UserPosts posts={details?.posts} />
          </TabPanel>
          {/* <TabPanel value={"1"}>Item Two</TabPanel> */}
          {/* <TabPanel value={"2"}>Item Three</TabPanel> */}
        </TabContext>
      </div>
    </div>
  );
};
