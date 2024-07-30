import { Avatar } from "@mui/material";
export const UserAvtar = ({ photo, fullname, width, height , size }) => {
    return (
      <Avatar alt="" src={photo} sx={{ width: width, height: height  , fontSize : size }}>
        {!photo && fullname && fullname[0]}
      </Avatar>
    );
  };