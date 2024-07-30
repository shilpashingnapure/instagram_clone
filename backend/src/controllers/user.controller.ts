import { Request, Response } from "express";
import {
  createUser,
  editUser,
  getUserDetails,
  isUserValid,
  searchUsers,
} from "../services/userService";
import { CustomRequest } from "../middleware/authentication";

// **************** user register *********************
export const userRegister = async (req: Request, res: Response) => {
  const { username, fullname, email, password } = req.body;
  try {
    const { isExisting, message, token } = await createUser(
      username,
      fullname,
      email,
      password
    );

    if (isExisting) {
      return res.status(400).json({ message });
    }
    
    return res.status(201).json({ message, token });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ****************** user login **********************
export const userLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const { isValid, message, token } = await isUserValid(email, password);

    if (!isValid) {
      return res.status(401).json({ message });
    }
    return res.status(200).json({ message, token });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ****************** user logout ************************
export const userLogout = async (req: Request, res: Response) => {
  res.clearCookie("token");
  res.json({ res: true, message: "logged out successfully" });
};

// ************** login user profile after login *************
export const loginUserProfile = async (req: CustomRequest, res: Response) => {
  const userId = req.user.userId;
  if (!userId) {
    return res
      .status(400)
      .json({ success: false, message: "User ID is required" });
  }
  try {
    const user = await getUserDetails({ id: userId });

    if (!user) {
      return res.status(500).json({ message: "Error fetching user details" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ******************* login user edit profile ****************
export const loginUserEditProfile = async (
  req: CustomRequest,
  res: Response
) => {
  const userId = req.user.userId;
  if (!userId) {
    return res
      .status(400)
      .json({ success: false, message: "User ID is required" });
  }
  try {
    const user = await editUser(userId, req.body);

    if (!user) {
      return res.status(500).json({ message: "Error updating user details" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ************************* get full profile of user **************
export const userFullProfile = async (req: CustomRequest, res: Response) => {
  const { username } = req.params;
  try {
    const user = await getUserDetails({ username });

    if (!user) {
      return res.status(500).json({ message: "No user exists" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ********************  search of user with (username , firstname , lastname or fullname )*****************************
export const searchForUsers = async (req: CustomRequest, res: Response) => {
  const { user } = req.query;
  if (typeof user != "string") {
    return res.status(400).json({ message: "invalid user parameter !" });
  }
  try {
    const users = await searchUsers(user);
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
