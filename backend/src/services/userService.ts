import { AppDataSource } from "../../ormconfig";
import { User } from "../entity/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Like } from "../entity/like";
import { errorCodes } from "./error-codes";
import { config } from "dotenv";
config();

interface UserQueryOptions {
  username?: string;
  id?: string;
}

const userRepository = AppDataSource.getRepository(User);
const likeRepository = AppDataSource.getRepository(Like);


/**
 * Generates a JSON Web Token (JWT) for the specified user ID.
 * @param userId - The ID of the user for whom to generate the token.
 * @returns A JWT token string.
 */
const generateToken = (userId: string) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY);
  return token;
};

/**
 * Create new  user , saves it to the database , and return a JWT token.
 * Checks if the email or username already exists.
  * @param username - The username of the new user.
 * @param fullname - The full name of the new user.
 * @param email - The email of the new user.
 * @param password - The password for the new user (will be hashed).
 * @returns An Object containing the status of the creation and JWT token if successful.
 * @throws Error if email or username already exists.
 */
export async function createUser(
  username: string,
  fullname: string,
  email: string,
  password: string
) {
  const existingUser = await userRepository.findOne({
    where: [{ email }, { username }],
  });

  if (existingUser) {
    if (existingUser.email === email) {
      return { isExisting: true, message: errorCodes.EMAIL_ALREADY_EXISTS };
    } else if (existingUser.username === username) {
      return { isExisting: true, message: errorCodes.USERNAME_ALREADY_EXISTS };
    }
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const [firstname, lastname] = fullname.split(" ");
  const user = new User(
    username,
    email,
    firstname,
    lastname,
    fullname,
    hashedPassword
  );

  await userRepository.save(user);
  const token = generateToken(user?.id);

  return { isExisting: false, message: "sign up scessfully !!", token };
}

/** 
 * Validates a user by checking the email and password
 * @param email - The email of the user attempting to log in
 * @param password - The password provided by the user.
 * @returns An Object indicating whether the login is successful , with message and JWT token if valid.
 * @throws Error if email does not exist or password does not match.
*/
export async function isUserValid(email: string, password: string) {
  const user = await userRepository.findOne({ where: { email } });

  if (!user) {
    return { isValid: false, message: errorCodes.EMAIL_DOES_NOT_EXIST };
  }

  // check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return { isValid: false, message: errorCodes.PASSWORD_DOES_NOT_MATCH };
  }

  // generate token
  const token = generateToken(user?.id);

  return { isValid: true, message: "login in scessfully!!", token };
}


/**
 * Updates user details with the provided data.
 * @param userId - The ID of the user to be updated.
 * @param updatedData - An object containing the updated user details.
 * @returns The updated user entity.
 */
export async function editUser(userId: string, updatedData: User) {
  const user = await userRepository.findOne({ where: { id: userId } });
  Object.assign(user, updatedData);
  await userRepository.save(user);

  return user;
}


/**
 * Retrieves user details along with their posts and like status.
 * @param options - An object containing optional query parameters (username or id) to find the user.
 * @returns An object containing user details and posts with like status, or false if user not found.
 */
export async function getUserDetails({ username, id }: UserQueryOptions) {
  const query: UserQueryOptions = {};
  if (username) {
    query.username = username;
  }
  if (id) {
    query.id = id;
  }
  const user = await userRepository.findOne({
    where: query,
    relations: [
      "posts",
      "posts.media",
      "posts.comments",
      "posts.likes",
      "posts.user",
      "posts.comments.user",
    ],
  });

  if (!user) {
    return false;
  }

  const loginUserLikes = await likeRepository.find({
    where: { liked_user_id: id },
  });

  const likedPostIds = new Set(loginUserLikes.map((like) => like.post_id));

  const postsWithLikeStatus = user?.posts.map((post) => ({
    ...post,
    totalLikes: post?.likes?.length,
    isLikedByUser: likedPostIds.has(post.id),
  }));

  return { ...user, posts: postsWithLikeStatus };
}

/**
 * Searches for users based on a keyword.
 * @param keyword - The keyword to search for in username, firstname, lastname, or fullname.
 * @returns An array of users matching the search keyword.
 */
export async function searchUsers(keyword: string) {
  const users = await userRepository
    .createQueryBuilder("user")
    .where("user.username ILIKE :keyword", { keyword: `%${keyword}%` })
    .orWhere("user.firstname ILIKE :keyword", { keyword: `%${keyword}%` })
    .orWhere("user.lastname ILIKE :keyword", { keyword: `%${keyword}%` })
    .orWhere("user.fullname ILIKE :keyword", { keyword: `%${keyword}%` })
    .getMany();

  return users;
}
