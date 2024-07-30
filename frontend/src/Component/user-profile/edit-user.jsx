import { Link, useNavigate } from "react-router-dom";
import { UserAvtar } from "../common-component/avatar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { methodGetById, methodPatch } from "../services/api_call";
import { storeUserDetail } from "../../redux/userReducer";
import { InputField } from "../auth-components/input-field";
import { uplodadToColudinary } from "../services/cloudinary-upload";
import { CircularProgress } from "@mui/material";

export const EditUser = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);

  const [userDetails, setUserDetails] = useState({});

  const [loading, setloading] = useState(false);

  const [isImageChange, setIsImageChange] = useState(false);

  const naviage = useNavigate();

  //when refresh , we are calling api for the users valus to store into redux
  useEffect(() => {
    async function getProfileDetails() {
      const { res, data } = await methodGetById("/profile");
      if (res.ok) {
        dispatch(storeUserDetail(data));
      }
    }

    if (!Object.keys(user).length) {
      getProfileDetails();
    }

    if (!Object.keys(userDetails).length) {
      setUserDetails(user);
    }
  }, [dispatch, user , userDetails]);


  //to handle input in object
  function handleInput(key, value) {
    setUserDetails({ ...userDetails, [key]: value });
  }


 // if image is change we will take url from coludinary then updated into db   
  async function handleUpdatedUser() {
    setloading(true);

    if (isImageChange) {
      const cloudinaryUrl = await uplodadToColudinary(
        userDetails?.profilePhoto ,
        process.env.REACT_APP_COLUDINARY_UPLOAD_PRESET_POST
      );
      if (cloudinaryUrl) {
        updateUserToDb(cloudinaryUrl);
      }
    }else{
        updateUserToDb();
    }
  }

 // send requrest to backend   
  async function updateUserToDb(imgUrl) {
    let updatedUser = userDetails;
    if(imgUrl){
        updatedUser = { ...updatedUser , profilePhoto : imgUrl}
    }
    const { res } = await methodPatch("/user-edit", updatedUser);
    if (res.ok) {
      naviage(`/${userDetails?.username}`);
    }
    setloading(false);

  }

  // store change image into user details   
  async function profileImage(event) {
    setIsImageChange(true);
    const file = event.target.files[0];
    if (file) {
      const img = URL.createObjectURL(file);
      setUserDetails({ ...userDetails, profilePhoto: img });
    }
  }

  if (!Object.keys(userDetails).length) {
    return <div>
      <CircularProgress />
    </div>;
  }
  return (
    <div className="flex gap-8 ">
      {/* update profile pic */}
      <div className="flex-1 flex items-center flex-col gap-5">
        <UserAvtar
          photo={userDetails?.profilePhoto}
          fullname={userDetails?.fullname}
          width={200}
          height={200}
          size={90}
        />
        <div className="relative overflow-hidden cursor-pointer">
          <input
            type="file"
            accept="image/*"
            className="absolute let-0 top-0 opacity-0 cursor-pointer"
            onChange={profileImage}
          />
          <button className="px-6 py-2 rounded-md bg-gray-400 text-white">
            Change Profile Photo
          </button>
        </div>
      </div>

      {/* updated user */}
      <div className="flex flex-col gap-4 p-5 flex-1 border-2">
        <div className="text-center">
          <h2>Updated User</h2>
        </div>
        <InputField
          label={"email"}
          type="text"
          value={userDetails?.email}
          readOnly={true}
          className="border-2 p-2 bg-gray-200 rounded-md cursor-not-allowed w-[100%]"
        />
        <InputField
          label={"username"}
          needKey={true}
          type="text"
          value={userDetails?.username}
          className="border-2 p-2 rounded-md"
          onChange={(key, value) => handleInput(key, value)}
        />
        <InputField
          label="fullname"
          type="text"
          needKey={true}
          value={userDetails?.fullname}
          className="border-2 p-2 rounded-md"
          onChange={(key, value) => handleInput(key, value)}
        />
        <div className="flex gap-3 justify-center mt-6">
          <button className="px-5 py-2 rounded-md border-2">
            <Link to={`/${userDetails?.username}`}>Cancel</Link>
          </button>
          <button
            className="px-8 py-1 rounded-md bg-[var(--primary-background)] text-white"
            onClick={handleUpdatedUser}
          >
            {loading ? "updating...." : "save"}
          </button>
        </div>
      </div>
    </div>
  );
};
